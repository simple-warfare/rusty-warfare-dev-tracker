# Progress Tracking

<StatusBadge status="in_progress" /> **Last updated**: 2026-06-11

## Overall Progress

<ProgressBar :total="25" :completed="16" label="Total Refactor Phases" />

## Completed Phases

<TaskBoard :tasks="[
  {
    id: 'P0',
    title: 'Architecture Blueprint & Root Rot Audit',
    status: 'completed',
    description: 'Established refactor goals, identified architectural issues'
  },
  {
    id: 'P1',
    title: 'game_domain Layer',
    status: 'completed',
    description: 'Pure domain layer without Bevy/Lightyear/Godot/TOML dependencies'
  },
  {
    id: 'P2',
    title: 'Content Compilation Pipeline',
    status: 'completed',
    description: 'Split into raw, normalize, validated, plan, lock, fingerprint stages'
  },
  {
    id: 'P3',
    title: 'Protocol Network Contracts',
    status: 'completed',
    description: 'Removed shared::* layer, split by Lightyear semantics'
  },
  {
    id: 'P4',
    title: 'Server Authoritative Gameplay Domains',
    status: 'completed',
    description: 'Split systems.rs into command, map, movement, economy, production, combat, victory'
  },
  {
    id: 'P5',
    title: 'runtime_core Refactor',
    status: 'completed',
    description: 'Split command lifecycle, network loop, frontend projection'
  },
  {
    id: 'P6',
    title: 'gdextension Dictionary Boundary',
    status: 'completed',
    description: 'Adapted to new frontend contracts'
  },
  {
    id: 'P7',
    title: 'Godot Frontend Split',
    status: 'completed',
    description: 'Split game.gd mega-script into render, input, HUD, camera services'
  },
  {
    id: 'P15',
    title: 'Official Registry Classification',
    status: 'completed',
    description: 'Fixed faction_sets.toml classification, passes content-tool validate'
  }
]" />

## In Progress

<TaskBoard :tasks="[
  {
    id: 'P16',
    title: 'Official Asset/Render Contract',
    status: 'in_progress',
    description: 'Refactor sprite atlas, animation clips into asset catalog'
  }
]" />

## Pending

<TaskBoard :tasks="[
  {
    id: 'P17',
    title: 'Port deltawater Movement Model',
    status: 'pending',
    description: 'Acceleration, braking, tracked/omnidirectional drive models'
  },
  {
    id: 'P18',
    title: 'Port deltawater Godot Controls',
    status: 'pending',
    description: 'Reverse commands, orientation offset, movement state display'
  },
  {
    id: 'P19',
    title: 'Map Logic Layers',
    status: 'pending',
    description: 'Compile into pathing, placement, resource rules'
  }
]" />

::: details View full roadmap
See [Roadmap](/en/roadmap) for complete phase breakdown and future plans.
:::
