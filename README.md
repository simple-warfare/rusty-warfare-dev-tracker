# Rusty Warfare Dev Tracker

开发进度追踪与文档站点 | Development Progress Tracking and Documentation

[![Deploy](https://github.com/simple-warfare/rusty-warfare-dev-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/simple-warfare/rusty-warfare-dev-tracker/actions/workflows/deploy.yml)

## 🌐 在线访问 | Online Access

- **中文**: https://simple-warfare.github.io/rusty-warfare-dev-tracker/zh/
- **English**: https://simple-warfare.github.io/rusty-warfare-dev-tracker/en/

## 🚀 本地开发 | Local Development

```bash
# 安装依赖 | Install dependencies
npm install

# 启动开发服务器 | Start dev server
npm run docs:dev

# 构建 | Build
npm run docs:build

# 预览构建结果 | Preview build
npm run docs:preview
```

## 📂 项目结构 | Project Structure

```
rusty-warfare-dev-tracker/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress 配置
│   │   ├── theme/              # 自定义主题
│   │   │   ├── components/     # Vue 组件
│   │   │   │   ├── ProgressBar.vue
│   │   │   │   ├── TaskBoard.vue
│   │   │   │   └── StatusBadge.vue
│   │   │   ├── index.ts
│   │   │   └── custom.css
│   │   └── locales/            # i18n 配置
│   │       ├── en.ts
│   │       └── zh.ts
│   ├── en/                     # 英文文档
│   │   ├── index.md
│   │   ├── progress.md
│   │   ├── roadmap.md
│   │   └── audit.md
│   └── zh/                     # 中文文档
│       ├── index.md
│       ├── progress.md
│       ├── roadmap.md
│       └── audit.md
├── .github/workflows/          # GitHub Actions
│   └── deploy.yml
├── package.json
└── README.md
```

## ✨ 特性 | Features

- ✅ 中英双语支持 | Bilingual (Chinese/English)
- ✅ 交互式进度条 | Interactive progress bars
- ✅ 任务看板 | Task boards
- ✅ 自动部署到 GitHub Pages | Auto-deploy to GitHub Pages
- ✅ 响应式设计 | Responsive design
- ✅ 暗色模式支持 | Dark mode support

## 🔄 更新文档 | Update Documentation

1. 编辑 `docs/zh/` 或 `docs/en/` 下的 Markdown 文件
2. 提交到 `main` 分支
3. GitHub Actions 自动构建并部署

## 📊 组件使用 | Component Usage

### 进度条 | Progress Bar

```markdown
<ProgressBar :total="25" :completed="16" label="Overall Progress" />
```

### 任务看板 | Task Board

```markdown
<TaskBoard :tasks="[
  { id: 'P1', title: 'Task 1', status: 'completed', description: '...' },
  { id: 'P2', title: 'Task 2', status: 'in_progress' }
]" />
```

### 状态徽章 | Status Badge

```markdown
<StatusBadge status="in_progress" />
<StatusBadge status="completed" text="Done" />
```

## 🛠️ 技术栈 | Tech Stack

- [VitePress](https://vitepress.dev/) - 文档框架
- [Vue 3](https://vuejs.org/) - 组件开发
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## 📝 License

MIT
