import DefaultTheme from 'vitepress/theme'
import ProgressBar from './components/ProgressBar.vue'
import TaskBoard from './components/TaskBoard.vue'
import StatusBadge from './components/StatusBadge.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProgressBar', ProgressBar)
    app.component('TaskBoard', TaskBoard)
    app.component('StatusBadge', StatusBadge)
  }
}
