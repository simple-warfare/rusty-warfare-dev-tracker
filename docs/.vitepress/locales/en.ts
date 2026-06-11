export const en = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Roadmap', link: '/en/roadmap' },
      { text: 'Progress', link: '/en/progress' },
      { text: 'Audit', link: '/en/audit' }
    ],

    sidebar: {
      '/en/': [
        {
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/en/' },
            { text: 'Architecture Blueprint', link: '/en/architecture' }
          ]
        },
        {
          text: 'Refactor',
          items: [
            { text: 'Roadmap', link: '/en/roadmap' },
            { text: 'Progress', link: '/en/progress' },
            { text: 'Checklist', link: '/en/checklist' }
          ]
        },
        {
          text: 'Analysis',
          items: [
            { text: 'Root Rot Audit', link: '/en/audit' },
            { text: 'Content Gap', link: '/en/content-gap' }
          ]
        }
      ]
    }
  }
}
