export const zh = {
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '路线图', link: '/zh/roadmap' },
      { text: '进度', link: '/zh/progress' },
      { text: '审计', link: '/zh/audit' }
    ],

    sidebar: {
      '/zh/': [
        {
          text: '概览',
          items: [
            { text: '介绍', link: '/zh/' },
            { text: '架构蓝图', link: '/zh/architecture' }
          ]
        },
        {
          text: '重构',
          items: [
            { text: '路线图', link: '/zh/roadmap' },
            { text: '进度记录', link: '/zh/progress' },
            { text: '任务清单', link: '/zh/checklist' }
          ]
        },
        {
          text: '分析',
          items: [
            { text: '代码审计', link: '/zh/audit' },
            { text: '内容差距', link: '/zh/content-gap' }
          ]
        }
      ]
    }
  }
}
