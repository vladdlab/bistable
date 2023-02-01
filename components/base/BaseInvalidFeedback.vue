<template>
  <p class="text-xs text-red-500 mb-2">
    <slot>
      {{ errorMessage }}
    </slot>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  errorMessage?: string
}>()
</script>
