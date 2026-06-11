---
layout: home

hero:
  name: Rusty Warfare
  text: Dev Tracker
  tagline: Industrial-grade architecture refactor progress tracking
  actions:
    - theme: brand
      text: View Progress
      link: /en/progress
    - theme: alt
      text: Roadmap
      link: /en/roadmap

features:
  - icon: 🏗️
    title: Architecture Refactor
    details: Transforming from prototype to industrial-grade Rust + Bevy + Lightyear RTS
  - icon: 📊
    title: Progress Tracking
    details: Real-time tracking of completed and ongoing refactor phases (P0-P15 completed)
  - icon: 🔍
    title: Code Audit
    details: Comprehensive analysis of architectural issues and improvement roadmap
  - icon: 🌐
    title: Bilingual Docs
    details: Full documentation in English and Chinese (中英双语)
---

## Project Status

<ProgressBar :total="25" :completed="16" label="Overall Refactor Progress" />

### Recently Completed

- ✅ **P15**: Official registry classification fix
- ✅ **P14**: Data-driven map visual codes
- ✅ **P13**: Strong-typed action schema
- ✅ **P12**: Removed legacy command fields

### Current Focus

- 🔨 **P16**: Official asset/render contract refactor
- 📋 **P17-P18**: Port deltawater movement model

### Key Achievements

- ✅ Established `game_domain` pure domain layer
- ✅ Split content compilation pipeline
- ✅ Refactored protocol network contracts
- ✅ Split server authoritative gameplay systems
- ✅ Refactored `runtime_core` and `gdextension`
- ✅ Split Godot mega-scripts into services
