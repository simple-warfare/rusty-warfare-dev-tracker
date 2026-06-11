# Root Rot Audit

<StatusBadge status="completed" /> **Created**: 2026-06-08 | **Branch**: `codex/industrial-refactor-roadmap`

This audit treats the current codebase as **structurally compromised** outside the `builder` crate. The goal is not to shame individual files but to make the refactor honest enough that future work does not keep stacking features on rotten boundaries.

## Summary

The project has crossed the prototype threshold where localized cleanup is no longer enough. The major failures are systemic:

- DTO and Snapshot types are multiplying without a designed view-model boundary
- `runtime_core` has become a mixed orchestration, projection, prediction, reconciliation, DTO, and frontend contract crate
- Crate-root exports and prelude modules hide ownership and encourage giant `use crate::{...}` imports
- Server gameplay, replication projection, and content adaptation are too tightly coupled
- Godot scripts mirror the same problem on the frontend side: one script owns too many jobs
- Tests are valuable but monolithic, making refactors expensive and noisy

## High-Risk Files

### `runtime_core/src/snapshot.rs` (459 lines)

**Observed**: 32 public DTO structs, 90 occurrences of `Snapshot`

**Problem**: A single file defines game view, debug view, network diagnostics, command state, replicated unit state, room, content, player slots, resources, map, objects, units, render source rectangles, animation, attachments, build options, and production queues.

`Frontend*Snapshot` has become a dumping ground for every cross-boundary need. It mixes runtime state, debug telemetry, UI view models, network replication echoes, and content catalog projections.

**Refactor direction**:
```text
runtime_core/src/frontend/
  frame.rs
  game_view.rs
  debug_view.rs
  room_view.rs
  command_view.rs
  network_view.rs
  map_view.rs
  resource_view.rs
  unit_view.rs
  object_view.rs
  content_view.rs
```

Longer-term, move pure view contracts into a dedicated crate: `frontend_contract`.

### `runtime_core/src/frontend_projection.rs` (853 lines)

**Problem**: One module has become a projection engine, command diagnostics builder, prediction applier, replicated-state reader, and UI model assembler. It has too much knowledge of client, server, protocol, content catalog, command lifecycle, and Godot needs.

**Refactor direction**: Split into builders by output view (`RoomViewBuilder`, `UnitViewBuilder`, `CommandViewBuilder`, `NetworkDiagnosticsBuilder`, `MapViewBuilder`). Introduce a `FrontendFrameBuilder` that orchestrates smaller builders.

### `runtime_core/src/network_apps.rs`

**Problem**: `NetworkApps` owns client app, server app, local content, frontend catalog, local player key, content handshake, update count, command sequence, pending commands, and reconciliation state. It is an orchestration god object.

**Refactor direction**:
```text
runtime_core/src/session/
  network_session.rs
  app_pair.rs
  mode.rs
  local_loop.rs
  command_session.rs
  content_handshake_session.rs
  replication_readers.rs
```

### `server/src/game/systems.rs` (834 lines)

**Problem**: Command application, movement, resources, production, combat, projectile simulation, cleanup, and victory evaluation live in one module. There is no domain boundary.

**Refactor direction**:
```text
server/src/game/
  command/
  movement/
  economy/
  production/
  combat/
  projectile/
  victory/
  spawn/
  schedules/
```

Each domain should expose a plugin or named system set.

### `server/src/game/state.rs` (270 lines)

**Problem**: 30 public structs. Map state, content state, player content states, combat registry, production registry, unit spawn registry, tile state, object state, command state, room state, and outcome live together. Like `snapshot.rs`, this is a type junk drawer.

**Refactor direction**: Move types beside domain systems (map state in `map/state.rs`, content handshake in `content_sync/state.rs`, combat registry in `combat/registry.rs`, production registry in `production/registry.rs`, room state in `room/state.rs`).

### `server/src/game/network.rs` (714 lines)

**Problem**: Replication singleton resources, network projection types, conversion functions, and sync systems are co-located. Large explicit import list from `protocol::prelude`.

**Refactor direction**:
```text
server/src/game/replication/
  mod.rs
  audience.rs
  singleton.rs
  unit_projection.rs
  object_projection.rs
  room_projection.rs
  command_projection.rs
  resource_projection.rs
  content_projection.rs
```

### `content/src/io.rs` (1008 lines)

**Problem**: Registry loading, file collection, domain loaders, template expansion, map directory loading, terrain normalization, localization loading, and generic TOML helpers live together. The content crate is still shaped like a loader script, not a package compiler.

**Refactor direction**:
```text
content/src/package_io/
content/src/raw/
content/src/expand/
content/src/normalize/
content/src/map_loader/
content/src/registry/
content/src/source_location/
```

### `launcher/godot/scripts/game/game.gd` (984 lines)

**Problem**: Snapshot extraction, map rendering, tile loading, object rendering, unit rendering, selection, input, camera, command buttons, command summaries, prediction summaries, and lifecycle live together. It is the Godot version of `frontend_projection.rs`.

**Refactor direction**:
```text
scripts/snapshot/
scripts/game/render/
scripts/game/input/
scripts/game/ui/
scripts/game/assets/
scripts/game/debug/
```

## Import And Export Rot

Example:
```rust
use crate::{
    FrontendCommandStateSnapshot, FrontendContentSnapshot, FrontendGameOutcomeSnapshot,
    FrontendMapSnapshot, FrontendMoveTargetSnapshot, FrontendNetworkDiagnosticsSnapshot,
    FrontendObjectSnapshot, FrontendPlayerSlotSnapshot, FrontendPredictionHistorySnapshot,
    FrontendReplicatedProductionQueueEntrySnapshot, FrontendReplicatedUnitSnapshot,
    FrontendResourceInventorySnapshot, FrontendRoomSnapshot, FrontendSnapshot,
    FrontendUnitProductionQueueEntrySnapshot, FrontendUnitSnapshot, PlayerCommand, RuntimeMode,
    RuntimeStatus,
};
```

This indicates the crate root exports too many unrelated concepts.

**Refactor policy**:
- No new broad `pub use *` from crate roots
- Internal modules should import from owner modules, not from crate root barrels
- External public API should be explicit and intentionally small
- Add a lint/check later for `use crate::{` lists above a threshold

## Snapshot / DTO Rot

The word `Snapshot` is not the problem. The problem is that snapshots are serving too many purposes:
- Stable Godot contract
- Debug telemetry
- Replicated network echo
- Client prediction history
- Content catalog view
- Command lifecycle state
- Server inspection test output
- Resource inventory view
- Map render model

**Refactor policy**: Rename by purpose, not by habit:
- `FrontendFrame`, `GameView`, `DebugView`, `CommandTimelineView`, `ReplicatedUnitState`, `ContentIdentity`, `ServerInspection`, `MapRenderModel`

## Test Rot

**Observed**:
- `runtime_core/src/test.rs`: 2676 lines
- `server/src/test.rs`: 1714 lines
- `content/src/test.rs`: 1027 lines
- `client/src/test.rs`: 748 lines

These tests are valuable, but their shape makes refactoring dangerous.

**Refactor direction**:
```text
runtime_core/tests/
  lifecycle.rs
  singleplayer_flow.rs
  host_client_flow.rs
  command_lifecycle.rs
  frontend_contract.rs
```

Create test fixtures and builders so tests describe behavior rather than manual world plumbing.

## Rebuild Strategy

The project should be rebuilt in shells around stable behavior, not by deleting everything at once.

### Phase A: Quarantine Public API ✅

- Stop adding root-level exports
- Create owner modules for runtime frontend contracts, protocol domains, server domains, and content phases
- Add compatibility re-exports only when necessary, marked as temporary

### Phase B: Extract Contract Crates Or Modules ✅

Candidate crates:
- `game_contract`: IDs, commands, room/resource/game concepts without Bevy/Godot
- `network_contract`: Protocol network DTOs and Lightyear registration helpers
- `frontend_contract`: Godot-facing frame/view DTOs
- `content_compiler`: Eventual replacement/split of current content shape

### Phase C: Split God Objects ✅

Split the worst modules without changing behavior:
- ✅ `runtime_core/src/snapshot.rs`
- ✅ `runtime_core/src/frontend_projection.rs`
- ✅ `runtime_core/src/network_apps.rs`
- ✅ `server/src/game/systems.rs`
- ✅ `server/src/game/state.rs`
- ✅ `server/src/game/network.rs`
- ✅ `content/src/io.rs`
- ✅ `launcher/godot/scripts/game/game.gd`

### Phase D: Replace Transitional Types 🔄

- Replace frontend snapshots used for validation with client replicated domain state
- Replace server state bags with domain resources
- Replace content direct templates with plans
- Replace Godot dictionaries with a documented frontend schema reader

### Phase E: Enforce Architecture 📋

- Add tests for public contracts
- Add import/export lint scripts or clippy configuration where practical
- Keep active docs clean and mark old docs as historical

## Immediate Work Order

1. ✅ Add architecture guardrails and import/export policy
2. ✅ Split `runtime_core/src/snapshot.rs` into frontend view modules
3. ✅ Split `runtime_core/src/frontend_projection.rs` into builders
4. ✅ Split Godot `game.gd` into snapshot reader, renderers, input, HUD, and assets
5. ✅ Split server systems and state by domain
6. ✅ Split content IO and validation by phase/domain
7. 🔄 Begin semantic rewrites: content merge, pathfinding, fog, richer combat, mod replacement

## Non-Negotiable Rule

No new feature work should deepen any of these patterns:
- ❌ New giant `Snapshot` struct in crate root
- ❌ New `pub use *` project prelude
- ❌ New 500+ line domain module
- ❌ New Godot script that owns more than one UI/runtime responsibility
- ❌ New server system that parses or guesses content
- ❌ New frontend DTO used as authoritative validation input

::: tip Current Status
As of P15, Phases A-C are complete. Phase D is in progress. See [Progress](/en/progress) for details.
:::
