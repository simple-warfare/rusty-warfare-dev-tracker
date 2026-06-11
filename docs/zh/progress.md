# 进度追踪

<StatusBadge status="in_progress" /> **最后更新**: 2026-06-11

## 整体进度

<ProgressBar :total="25" :completed="16" label="重构阶段总数" />

## 已完成阶段

<TaskBoard :tasks="[
  {
    id: 'P0',
    title: '架构蓝图与代码审计',
    status: 'completed',
    description: '明确重构目标，识别架构问题'
  },
  {
    id: 'P1',
    title: 'game_domain 领域层',
    status: 'completed',
    description: '建立纯领域层，无 Bevy/Lightyear/Godot/TOML 依赖'
  },
  {
    id: 'P2',
    title: '内容编译管线',
    status: 'completed',
    description: '拆分为 raw、normalize、validated、plan、lock、fingerprint 阶段'
  },
  {
    id: 'P3',
    title: 'Protocol 网络契约',
    status: 'completed',
    description: '移除 shared::* 层，按 Lightyear 语义拆分'
  },
  {
    id: 'P4',
    title: 'Server 权威玩法域',
    status: 'completed',
    description: '将 systems.rs 拆分为 command、map、movement、economy、production、combat、victory'
  },
  {
    id: 'P5',
    title: 'runtime_core 重构',
    status: 'completed',
    description: '拆分命令生命周期、网络循环、前端投影'
  },
  {
    id: 'P6',
    title: 'gdextension 字典边界',
    status: 'completed',
    description: '适配新的 frontend contracts'
  },
  {
    id: 'P7',
    title: 'Godot 前端拆分',
    status: 'completed',
    description: '将 game.gd 巨脚本拆分为 render、input、HUD、camera 服务'
  },
  {
    id: 'P15',
    title: 'Official Registry 分类修正',
    status: 'completed',
    description: '修正 faction_sets.toml 分类，通过 content-tool validate'
  }
]" />

## 进行中

<TaskBoard :tasks="[
  {
    id: 'P16',
    title: 'Official Asset/Render 契约',
    status: 'in_progress',
    description: '将 sprite atlas、animation clips 重构到 asset catalog'
  }
]" />

## 待完成

<TaskBoard :tasks="[
  {
    id: 'P17',
    title: '移植 deltawater 移动模型',
    status: 'pending',
    description: '加速度、制动、履带/全向驱动模型'
  },
  {
    id: 'P18',
    title: '移植 deltawater Godot 控制',
    status: 'pending',
    description: '倒车命令、朝向偏移、移动状态显示'
  },
  {
    id: 'P19',
    title: '地图逻辑层',
    status: 'pending',
    description: '编译进 pathing、placement、resource 规则'
  }
]" />

::: details 查看完整路线图
参见 [路线图](/zh/roadmap) 了解完整阶段分解和未来计划。
:::
