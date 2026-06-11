<script setup lang="ts">
defineProps<{
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  text?: string
}>()

const config = {
  pending: { color: '#f59e0b', bg: '#fef3c7', label: 'Pending' },
  in_progress: { color: '#3b82f6', bg: '#dbeafe', label: 'In Progress' },
  completed: { color: '#10b981', bg: '#d1fae5', label: 'Completed' },
  blocked: { color: '#ef4444', bg: '#fee2e2', label: 'Blocked' }
}
</script>

<template>
  <span
    class="status-badge"
    :style="{
      color: config[status].color,
      background: config[status].bg
    }"
  >
    {{ text || config[status].label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
