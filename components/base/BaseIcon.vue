<template>
  <Icon :name="name" :class="size" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{
  name: string,
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const size = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  }
  return sizes[props.size]
})
</script>
