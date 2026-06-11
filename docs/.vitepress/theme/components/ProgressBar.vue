<script setup lang="ts">
const props = defineProps<{
  total: number
  completed: number
  label?: string
}>()

const percentage = Math.round((props.completed / props.total) * 100)
</script>

<template>
  <div class="progress-bar">
    <div v-if="label" class="progress-label">{{ label }}</div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${percentage}%` }"></div>
    </div>
    <div class="progress-text">{{ completed }} / {{ total }} ({{ percentage }}%)</div>
  </div>
</template>

<style scoped>
.progress-bar { margin: 1.5rem 0; }
.progress-label { margin-bottom: 0.5rem; font-weight: 500; color: var(--vp-c-text-1); }
.progress-track { height: 10px; background: var(--vp-c-bg-soft); border-radius: 5px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--vp-c-brand-1); transition: width 0.3s ease; }
.progress-text { margin-top: 0.5rem; font-size: 0.875rem; color: var(--vp-c-text-2); }
</style>
