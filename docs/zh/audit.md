# 代码审计报告

<StatusBadge status="completed" /> **创建时间**: 2026-06-08 | **分支**: `codex/industrial-refactor-roadmap`

本审计将当前代码库视为在 `builder` crate 之外**结构性受损**。目标不是羞辱个别文件，而是让重构足够诚实，使未来的工作不会继续在腐烂的边界上堆砌功能。

## 摘要

项目已跨越原型阈值，局部清理不再足够。主要失败是系统性的：

- DTO 和 Snapshot 类型在没有设计视图模型边界的情况下不断增加
- `runtime_core` 已成为混合编排、投影、预测、调和、DTO 和前端契约的 crate
- Crate-root 导出和 prelude 模块隐藏所有权，鼓励巨型 `use crate::{...}` 导入
- 服务器玩法、复制投影和内容适配耦合过紧
- Godot 脚本在前端侧镜像相同问题：一个脚本拥有太多职责
- 测试很有价值但单体化，使重构代价高昂且嘈杂

## 高风险文件

### `runtime_core/src/snapshot.rs` (459 行)

**观察到**: 32 个公共 DTO 结构，90 处 `Snapshot` 出现

**问题**: 单个文件定义游戏视图、调试视图、网络诊断、命令状态、复制单位状态、房间、内容、玩家槽位、资源、地图、对象、单位、渲染源矩形、动画、附件、建造选项和生产队列。

`Frontend*Snapshot` 已成为每个跨边界需求的垃圾场。它混合了运行时状态、调试遥测、UI 视图模型、网络复制回显和内容目录投影。

**重构方向**:
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

长期来看，将纯视图契约移入专用 crate：`frontend_contract`。

### `runtime_core/src/frontend_projection.rs` (853 行)

**问题**: 一个模块已成为投影引擎、命令诊断构建器、预测应用器、复制状态读取器和 UI 模型组装器。它对客户端、服务器、协议、内容目录、命令生命周期和 Godot 需求了解过多。

**重构方向**: 按输出视图拆分为构建器（`RoomViewBuilder`、`UnitViewBuilder`、`CommandViewBuilder`、`NetworkDiagnosticsBuilder`、`MapViewBuilder`）。引入编排较小构建器的 `FrontendFrameBuilder`。

### `runtime_core/src/network_apps.rs`

**问题**: `NetworkApps` 拥有客户端 app、服务器 app、本地内容、前端目录、本地玩家密钥、内容握手、更新计数、命令序列、待处理命令和调和状态。它是一个编排上帝对象。

**重构方向**:
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

### `server/src/game/systems.rs` (834 行)

**问题**: 命令应用、移动、资源、生产、战斗、弹道模拟、清理和胜利评估位于一个模块中。没有领域边界。

**重构方向**:
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

每个领域应暴露插件或命名系统集。

### `server/src/game/state.rs` (270 行)

**问题**: 30 个公共结构。地图状态、内容状态、玩家内容状态、战斗注册表、生产注册表、单位生成注册表、瓦片状态、对象状态、命令状态、房间状态和结果聚在一起。像 `snapshot.rs` 一样，这是一个类型垃圾抽屉。

**重构方向**: 将类型移至领域系统旁边（地图状态在 `map/state.rs`，内容握手在 `content_sync/state.rs`，战斗注册表在 `combat/registry.rs`，生产注册表在 `production/registry.rs`，房间状态在 `room/state.rs`）。

### `server/src/game/network.rs` (714 行)

**问题**: 复制单例资源、网络投影类型、转换函数和同步系统共处一地。来自 `protocol::prelude` 的大型显式导入列表。

**重构方向**:
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

### `content/src/io.rs` (1008 行)

**问题**: 注册表加载、文件收集、领域加载器、模板展开、地图目录加载、地形归一化、本地化加载和通用 TOML 助手聚在一起。内容 crate 仍像加载器脚本，而非包编译器。

**重构方向**:
```text
content/src/package_io/
content/src/raw/
content/src/expand/
content/src/normalize/
content/src/map_loader/
content/src/registry/
content/src/source_location/
```

### `launcher/godot/scripts/game/game.gd` (984 行)

**问题**: Snapshot 提取、地图渲染、瓦片加载、对象渲染、单位渲染、选择、输入、相机、命令按钮、命令摘要、预测摘要和生命周期聚在一起。这是 `frontend_projection.rs` 的 Godot 版本。

**重构方向**:
```text
scripts/snapshot/
scripts/game/render/
scripts/game/input/
scripts/game/ui/
scripts/game/assets/
scripts/game/debug/
```

## 导入和导出腐烂

示例：
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

这表明 crate root 导出了太多不相关的概念。

**重构策略**:
- 不再从 crate root 进行新的广泛 `pub use *`
- 内部模块应从所有者模块导入，而非从 crate root barrels
- 外部公共 API 应显式且有意地小
- 稍后为超过阈值的 `use crate::{` 列表添加 lint/检查

## Snapshot / DTO 腐烂

`Snapshot` 这个词不是问题。问题是 snapshot 服务于太多目的：
- 稳定的 Godot 契约
- 调试遥测
- 复制网络回显
- 客户端预测历史
- 内容目录视图
- 命令生命周期状态
- 服务器检查测试输出
- 资源库存视图
- 地图渲染模型

**重构策略**: 按目的而非习惯重命名：
- `FrontendFrame`、`GameView`、`DebugView`、`CommandTimelineView`、`ReplicatedUnitState`、`ContentIdentity`、`ServerInspection`、`MapRenderModel`

## 测试腐烂

**观察到**:
- `runtime_core/src/test.rs`: 2676 行
- `server/src/test.rs`: 1714 行
- `content/src/test.rs`: 1027 行
- `client/src/test.rs`: 748 行

这些测试很有价值，但它们的形态使重构变得危险。

**重构方向**:
```text
runtime_core/tests/
  lifecycle.rs
  singleplayer_flow.rs
  host_client_flow.rs
  command_lifecycle.rs
  frontend_contract.rs
```

创建测试夹具和构建器，使测试描述行为而非手动世界管道。

## 重建策略

项目应在稳定行为周围以壳层方式重建，而非一次删除所有内容。

### 阶段 A: 隔离公共 API ✅

- 停止添加 root-level 导出
- 为运行时前端契约、协议领域、服务器领域和内容阶段创建所有者模块
- 仅在必要时添加兼容性重导出，标记为临时

### 阶段 B: 提取契约 Crate 或模块 ✅

候选 crate：
- `game_contract`: ID、命令、房间/资源/游戏概念，无 Bevy/Godot
- `network_contract`: 协议网络 DTO 和 Lightyear 注册助手
- `frontend_contract`: 面向 Godot 的 frame/view DTO
- `content_compiler`: 当前内容形态的最终替代/拆分

### 阶段 C: 拆分上帝对象 ✅

在不改变行为的情况下拆分最糟糕的模块：
- ✅ `runtime_core/src/snapshot.rs`
- ✅ `runtime_core/src/frontend_projection.rs`
- ✅ `runtime_core/src/network_apps.rs`
- ✅ `server/src/game/systems.rs`
- ✅ `server/src/game/state.rs`
- ✅ `server/src/game/network.rs`
- ✅ `content/src/io.rs`
- ✅ `launcher/godot/scripts/game/game.gd`

### 阶段 D: 替换过渡类型 🔄

- 用客户端复制领域状态替换用于验证的前端 snapshot
- 用领域资源替换服务器状态袋
- 用计划替换内容直接模板
- 用文档化的前端模式读取器替换 Godot 字典

### 阶段 E: 强制架构 📋

- 为公共契约添加测试
- 在实际可行的情况下添加导入/导出 lint 脚本或 clippy 配置
- 保持活动文档清洁，将旧文档标记为历史

## 当前工作顺序

1. ✅ 添加架构护栏和导入/导出策略
2. ✅ 将 `runtime_core/src/snapshot.rs` 拆分为前端视图模块
3. ✅ 将 `runtime_core/src/frontend_projection.rs` 拆分为构建器
4. ✅ 将 Godot `game.gd` 拆分为 snapshot 读取器、渲染器、输入、HUD 和资产
5. ✅ 按领域拆分服务器系统和状态
6. ✅ 按阶段/领域拆分内容 IO 和验证
7. 🔄 开始语义重写：内容合并、寻路、迷雾、更丰富的战斗、mod 替换

## 不可协商的规则

新功能工作不应加深以下任何模式：
- ❌ crate root 中的新巨型 `Snapshot` 结构
- ❌ 新的 `pub use *` 项目 prelude
- ❌ 新的 500+ 行领域模块
- ❌ 拥有多个 UI/运行时职责的新 Godot 脚本
- ❌ 解析或猜测内容的新服务器系统
- ❌ 用作权威验证输入的新前端 DTO

::: tip 当前状态
截至 P15，阶段 A-C 已完成。阶段 D 正在进行中。详见[进度记录](/zh/progress)。
:::
