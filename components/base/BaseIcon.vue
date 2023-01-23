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
  const sizes = { 'sm': 4, 'md': 8, 'lg': 10 }
  return `w-${sizes[props.size]} h-${sizes[props.size]}`
})
</script>
