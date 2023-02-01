<template>
  <button
    class="bg-slate-300 text-slate-700 rounded-md"
    :class="btnClasses"
  >
    <slot v-if="!loading"/>
    <BaseSpinner v-else/>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  // Styles
  size?: 'sm' | 'md' | 'lg',
  loading?: boolean
}>(), {
  size: 'md',
  loading: false
})


// Styles
const btnClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-0.5',
    md: 'px-5 py-1',
    lg: 'px-7 py-3'
  }
  return [sizes[props.size]]
})
</script>
