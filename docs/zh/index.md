---
layout: home

hero:
  name: Rusty Warfare
  text: 开发追踪
  tagline: 工业级架构重构进度追踪
  actions:
    - theme: brand
      text: 查看进度
      link: /zh/progress
    - theme: alt
      text: 路线图
      link: /zh/roadmap

features:
  - icon: 🏗️
    title: 架构重构
    details: 从原型向工业级 Rust + Bevy + Lightyear RTS 转型
  - icon: 📊
    title: 进度追踪
    details: 实时追踪已完成和进行中的重构阶段（已完成 P0-P15）
  - icon: 🔍
    title: 代码审计
    details: 全面分析架构问题和改进路线图
  - icon: 🌐
    title: 中英双语
    details: 完整的中英双语文档支持
---

## 项目状态

<ProgressBar :total="25" :completed="16" label="整体重构进度" />

### 最近完成

- ✅ **P15**: 修正 official registry 分类
- ✅ **P14**: 地图视觉码数据驱动化
- ✅ **P13**: Action schema 强类型化
- ✅ **P12**: 移除 legacy 命令字段

### 当前重点

- 🔨 **P16**: Official asset/render 契约重构
- 📋 **P17-P18**: 移植 deltawater 移动模型

### 关键成就

- ✅ 建立了 `game_domain` 纯领域层
- ✅ 拆分内容编译管线
- ✅ 重构 protocol 网络契约
- ✅ 拆分 server 权威玩法系统
- ✅ 重构 `runtime_core` 和 `gdextension`
- ✅ 拆分 Godot 巨脚本为独立服务
