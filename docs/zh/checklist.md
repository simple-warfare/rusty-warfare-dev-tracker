# 重构清单

<StatusBadge status="in_progress" /> **最后更新**: 2026-06-11

重构阶段完成情况快速概览。详细进度见[进度记录](/zh/progress)。

## 当前状态

- [x] 已建立工业级重构分支
- [x] 已合并 `deltawater` 历史并保护架构
- [ ] `deltawater` 功能尚未完全移植到新架构

## 已完成阶段

### 基础阶段 (P0-P5) ✅

- [x] **P0**: 架构蓝图与代码审计
- [x] **P1**: `game_domain` 纯领域层
- [x] **P2**: 内容编译管线 (raw/normalize/validated/plan/lock/fingerprint)
- [x] **P3**: Protocol 网络契约（移除 `shared::*`）
- [x] **P4**: Server 权威玩法域（拆分 systems/state）
- [x] **P5**: `runtime_core` 重构（命令生命周期、网络循环、前端投影）

### 实施阶段 (P6-P15) ✅

- [x] **P6**: gdextension 字典边界
- [x] **P7**: Godot 前端拆分 (game.gd → 服务)
- [x] **P8**: Official 原型素材
- [x] **P9**: RulePlan 契约（不暴露原始 HashMap）
- [x] **P10-P12**: 结构化命令调试契约
- [x] **P13**: 强类型 action schema
- [x] **P14**: 数据驱动地图视觉码
- [x] **P15**: Official registry 分类修正

## 进行中

- [ ] **P16**: Official asset/render 契约重构

## 待完成

### 近期 (P17-P19)

- [ ] **P17**: 移植 deltawater 移动模型（加速度、制动、驱动模型）
- [ ] **P18**: 移植 deltawater Godot 控制（倒车命令、朝向偏移）
- [ ] **P19**: 地图逻辑层（编译进 pathing/placement/resource 规则）

### 中期 (P20-P25)

- [ ] **P20**: Official 玩法闭环（生产、建造、修理、回收、胜利）
- [ ] **P21**: 前端契约收敛
- [ ] **P22**: Bevy 系统粒度化（一条规则一个系统）
- [ ] **P23**: Lightyear 契约复查
- [ ] **P24**: Godot 运行时验证
- [ ] **P25**: 修复已知测试失败

## deltawater 迁移清单

- [x] 历史已合并
- [x] 地图 tile source 投影（P14 完成）
- [x] Official registry/validation 基础（P15 完成）
- [ ] Spritesheet 元数据 / 渲染投影 → P16
- [ ] 加速移动模拟 → P17
- [ ] 倒车移动命令 → P17/P18
- [ ] Godot 启动器控制 → P18

## 下一步

1. 完成 P16
2. 验证 `cargo fmt -p content -p runtime_core -p gdextension`
3. 测试 `cargo check -p content --tests`, `cargo test -p content`
4. 继续 P17/P18 移植 deltawater 移动和控制

::: tip 追踪详情
见[进度记录](/zh/progress)了解详细任务分解，见[路线图](/zh/roadmap)了解阶段描述。
:::
