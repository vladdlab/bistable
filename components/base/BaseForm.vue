<template>
  <form class="flex flex-col">
    <slot/>

    <slot name="erros-list">
      <div class="mt-2 p-2 text-center">
        <BaseInvalidFeedback v-for="error in errors" :error-message="error" />
      </div>
    </slot>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  errors?: string[]
}>()
</script>
