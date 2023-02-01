<template>
  <div class="flex flex-col">
    <label :for="inputId" class="mb-2">{{ label }}</label>

    <input
      :id="inputId"
      type="text"
      v-bind="$attrs"
      :value="modelValue"
      @input="handleInput"
      class="outline-green-500 outline-offset-2 border-gray-200 bg-slate-100 rounded-lg mb-2"
      :class="inputClasses"
    />

    <BaseInvalidFeedback>{{ errorMessage }}</BaseInvalidFeedback>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<{
  // Behavior
  id?: string,
  // Model
  modelValue: string,
  // Content
  label?: string,
  errorMessage?: string,
  // Styles
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})


// Behavior
const randomId = useRandomId()
const inputId = computed(() => props.id ?? randomId);

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

// Styles
const inputClasses = computed(() => {
  const sizes = {
    sm: 'py-1 px-2',
    md: 'py-1.5 px-3',
    lg: 'py-3 px-6'
  }
  return [sizes[props.size]]
})
</script>
