# Refactor Checklist

<StatusBadge status="in_progress" /> **Last updated**: 2026-06-11

Quick overview of refactor phase completion. For detailed progress, see [Progress](/en/progress).

## Current Status

- [x] Established industrial refactor branch
- [x] Merged `deltawater` history preserving architecture
- [ ] `deltawater` features not yet fully ported to new architecture

## Completed Phases

### Foundation (P0-P5) ✅

- [x] **P0**: Architecture blueprint and root rot audit
- [x] **P1**: `game_domain` pure domain layer
- [x] **P2**: Content compilation pipeline (raw/normalize/validated/plan/lock/fingerprint)
- [x] **P3**: Protocol network contracts (removed `shared::*`)
- [x] **P4**: Server authoritative gameplay domains (split systems/state)
- [x] **P5**: `runtime_core` refactor (command lifecycle, network loop, frontend projection)

### Implementation (P6-P15) ✅

- [x] **P6**: gdextension dictionary boundary
- [x] **P7**: Godot frontend split (game.gd → services)
- [x] **P8**: Official prototype assets
- [x] **P9**: RulePlan contract (no raw HashMap exposure)
- [x] **P10-P12**: Structured command debug contracts
- [x] **P13**: Strong-typed action schema
- [x] **P14**: Data-driven map visual codes
- [x] **P15**: Official registry classification fix

## In Progress

- [ ] **P16**: Official asset/render contract refactor

## Pending

### Near-term (P17-P19)

- [ ] **P17**: Port deltawater movement model (acceleration, braking, drive models)
- [ ] **P18**: Port deltawater Godot controls (reverse commands, orientation offset)
- [ ] **P19**: Map logic layers (compile into pathing/placement/resource rules)

### Mid-term (P20-P25)

- [ ] **P20**: Official gameplay closure (production, construction, repair, reclaim, victory)
- [ ] **P21**: Frontend contract convergence
- [ ] **P22**: Bevy system granularity (one rule per system)
- [ ] **P23**: Lightyear contract review
- [ ] **P24**: Godot runtime verification
- [ ] **P25**: Fix known test failures

## deltawater Migration Checklist

- [x] History merged
- [x] Map tile source projection (completed in P14)
- [x] Official registry/validation base (completed in P15)
- [ ] Spritesheet metadata / render projection → P16
- [ ] Accelerated movement simulation → P17
- [ ] Reverse move command → P17/P18
- [ ] Godot launcher controls → P18

## Next Steps

1. Complete P16
2. Verify with `cargo fmt -p content -p runtime_core -p gdextension`
3. Test with `cargo check -p content --tests`, `cargo test -p content`
4. Continue P17/P18 to port deltawater movement and control

::: tip Track Details
See [Progress](/en/progress) for detailed task breakdowns and [Roadmap](/en/roadmap) for phase descriptions.
:::
