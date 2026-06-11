# 部署指南 | Deployment Guide

## 创建 GitHub 仓库 | Create GitHub Repository

1. 在 GitHub 创建新仓库：`rusty-warfare-dev-tracker`

2. 推送项目：

```bash
cd rusty-warfare-dev-tracker
git init -b main
git add .
git commit -m "Initial commit: VitePress dev tracker with i18n"
git remote add origin git@github.com:your-org/rusty-warfare-dev-tracker.git
git push -u origin main
```

## 配置 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 推送代码后会自动触发部署

## 添加为 Submodule

在 `rusty_warfare` 主仓库：

```bash
cd /path/to/rusty_warfare
git submodule add git@github.com:your-org/rusty-warfare-dev-tracker.git dev-tracker
git commit -m "Add dev-tracker as submodule"
```

## 更新配置

编辑 `docs/.vitepress/config.ts`，更新仓库链接：

```typescript
export default defineConfig({
  base: '/rusty-warfare-dev-tracker/',  // 修改为你的仓库名
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/rusty_warfare' }
    ]
  }
})
```

## 本地测试

```bash
npm install
npm run docs:dev
# 访问 http://localhost:5173
```

## 故障排查

### VitePress 构建失败

- 确保 Node.js 版本 >= 18
- 删除 `node_modules` 和 `package-lock.json`，重新安装

### GitHub Actions 失败

- 检查 `.github/workflows/deploy.yml`
- 确保仓库启用了 Pages 和 Actions 权限

### 组件不显示

- 检查浏览器控制台错误
- 确认所有 Vue 组件在 `theme/index.ts` 中注册

## 同步主仓库文档

定期从 `rusty_warfare/docs/architecture/` 同步内容：

```bash
# 从主仓库复制最新文档
cp ../rusty_warfare/docs/architecture/industrial-*.md docs/zh/
# 手工调整格式，添加组件
# 提交更新
git add . && git commit -m "Sync latest progress" && git push
```
