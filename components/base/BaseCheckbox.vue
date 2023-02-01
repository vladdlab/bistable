<template>
  <div class="flex gap-2">
    <input type="checkbox" :id="inputId" :checked="modelValue" @change="handleChange" class="cursor-pointer" />
    <label :for="inputId" v-if="label" class="cursor-pointer">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  // Behavior
  id?: string,
  // Model
  modelValue: boolean,
  // Content
  label?: string
}>()

// Behavior
const randomId = useRandomId()
const inputId = computed(() => props.id ?? randomId);

function handleChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>
