<script setup lang="ts">
interface Task {
  id: string
  title: string
  status: 'pending' | 'in_progress' | 'completed'
  description?: string
}

defineProps<{
  tasks: Task[]
}>()

const statusConfig = {
  pending: { color: '#f59e0b', label: 'Pending' },
  in_progress: { color: '#3b82f6', label: 'In Progress' },
  completed: { color: '#10b981', label: 'Completed' }
}
</script>

<template>
  <div class="task-board">
    <div v-for="task in tasks" :key="task.id" class="task-card">
      <div class="task-header">
        <span
          class="task-status"
          :style="{ background: statusConfig[task.status].color }"
          :title="statusConfig[task.status].label"
        ></span>
        <h3 class="task-title">{{ task.title }}</h3>
        <span class="task-id">{{ task.id }}</span>
      </div>
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.task-board { display: grid; gap: 1rem; margin: 1.5rem 0; }
.task-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.3s;
}
.task-card:hover { border-color: var(--vp-c-brand-1); }
.task-header { display: flex; align-items: center; gap: 0.75rem; }
.task-status {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}
.task-title {
  margin: 0;
  font-size: 1rem;
  flex: 1;
  color: var(--vp-c-text-1);
}
.task-id {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: monospace;
  background: var(--vp-c-default-soft);
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
}
.task-description {
  margin: 0.75rem 0 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
