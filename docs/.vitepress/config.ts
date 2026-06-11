import { defineConfig } from 'vitepress'
import { en } from './locales/en'
import { zh } from './locales/zh'

export default defineConfig({
  title: 'Rusty Warfare Dev Tracker',
  description: 'Development progress tracking and documentation',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      ...en
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      ...zh
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/rusty_warfare' }
    ]
  }
})
