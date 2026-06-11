# Architecture Blueprint

<StatusBadge status="in_progress" /> **Created**: 2026-06-09

## Vision

Rusty Warfare should be a **Rust-authoritative, content-compiled, Lightyear-synchronized RTS with Godot presentation**.

The core rule:
> Data is compiled once, rules run once, network state is replicated once, frontend views are projected once.

No layer should rebuild the same gameplay truth under a different name.

## Target Crate Graph

```mermaid
graph TB
    builder[builder<br/>Protected]
    
    game_domain[game_domain<br/>Pure domain types]
    content[content<br/>Package compiler]
    protocol[protocol<br/>Network contracts]
    server[server<br/>Authoritative ECS]
    client[client<br/>Replication client]
    frontend[frontend_contract<br/>View DTOs]
    runtime[runtime_core<br/>Lifecycle orchestration]
    gdext[gdextension<br/>Dictionary boundary]
    godot[launcher/godot<br/>Presentation]
    
    game_domain --> content
    game_domain --> protocol
    game_domain --> server
    game_domain --> client
    game_domain --> frontend
    
    content --> server
    content --> runtime
    
    protocol --> server
    protocol --> client
    protocol --> runtime
    
    server --> runtime
    client --> runtime
    frontend --> runtime
    frontend --> gdext
    
    runtime --> gdext
    gdext --> godot
    
    style builder fill:#90EE90
    style game_domain fill:#87CEEB
    style godot fill:#FFB6C1
```

## Data Flow

```mermaid
graph LR
    A[Package Selection] --> B[Manifest Graph]
    B --> C[Raw Content Bundle]
    C --> D[Merged Content]
    D --> E[Normalized Content]
    E --> F[ContentDatabase]
    F --> G[Plans]
    G --> H[Server ECS]
    H --> I[Lightyear Replication]
    I --> J[Client State]
    J --> K[Frontend Views]
    K --> L[Godot Dictionary]
    L --> M[Godot Rendering]
    
    G -->|RulePlan| H
    G -->|SpawnPlan| H
    G -->|FrontendCatalog| K
    G -->|NavGridPlan| H
```

## Hard Boundaries

| Layer | Responsibility | Must NOT |
|-------|---------------|----------|
| `content` | Pure Rust data compilation | Touch Bevy/Lightyear/Godot/files at runtime |
| `server` | Consume plans, not raw TOML | Parse content files |
| `client` | Consume protocol state | Own authoritative rules |
| `runtime_core` | Lifecycle and frontend projection | Become second gameplay engine |
| `gdextension` | Convert typed Rust → Godot values | Own gameplay API |
| `godot` | Render, input, feedback | Own authoritative state |

## Key Principles

### 1. Ownership Visibility

Rust types must enforce architecture through ownership, not carry bags of fields.

**Anti-pattern**: Giant DTOs crossing all layers
```rust
// ❌ Bad: One struct serves too many masters
struct FrontendSnapshot {
    game_state: ...,
    debug_telemetry: ...,
    network_echo: ...,
    content_catalog: ...,
}
```

**Pattern**: Purpose-specific types
```rust
// ✅ Good: Each type has one clear purpose
struct GameView { ... }
struct DebugView { ... }
struct NetworkDiagnostics { ... }
struct ContentCatalog { ... }
```

### 2. Domain Boundaries

Each crate/module owns one domain.

**Anti-pattern**: God modules
```rust
// ❌ Bad: One file owns everything
// server/src/game/systems.rs (834 lines)
fn apply_commands() { ... }
fn update_movement() { ... }
fn process_economy() { ... }
fn handle_combat() { ... }
```

**Pattern**: Domain plugins
```rust
// ✅ Good: Each domain is independent
// server/src/game/movement/mod.rs
pub struct MovementPlugin;

// server/src/game/economy/mod.rs
pub struct EconomyPlugin;
```

### 3. No Premature Abstraction

**Anti-pattern**: Generic containers
```rust
// ❌ Bad: Bag of maps
struct ContentDatabase {
    units: HashMap<ContentId, UnitTemplate>,
    weapons: HashMap<ContentId, WeaponTemplate>,
    // ...30 more fields
}
```

**Pattern**: Designed domain model
```rust
// ✅ Good: Intentional structure
struct ContentDatabase {
    rules: RulePlan,
    spawn: SpawnPlan,
    catalog: FrontendCatalog,
}
```

### 4. Import Discipline

**Anti-pattern**: Crate-root dumps
```rust
// ❌ Bad: Everything exported from root
pub use snapshot::*;
pub use diagnostics::*;
pub use command_feedback::*;
```

**Pattern**: Explicit public API
```rust
// ✅ Good: Intentional exports
pub use frontend::{FrontendFrame, GameView};
pub use session::NetworkSession;
```

## Architecture Evolution

### Phase A: Quarantine ✅
Stop the bleeding - freeze broad exports, create owner modules

### Phase B: Extract Contracts ✅  
`game_domain`, `frontend_contract` establish boundaries

### Phase C: Split God Objects ✅
Break monoliths into focused modules

### Phase D: Replace Transitional Types 🔄
Move from bags to designed domain models

### Phase E: Enforce 📋
Tests, lints, and documentation lock in the new shape

## Current Status (P15)

✅ **Phases A-C complete**  
🔄 **Phase D in progress**  
📋 **Phase E planned**

::: tip Next Steps
See [Roadmap](/en/roadmap) for detailed phase breakdown and [Progress](/en/progress) for current work.
:::
