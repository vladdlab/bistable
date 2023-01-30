<template>
  <div>
    <input
    type="text"
    v-bind="$attrs"
    :value="modelValue"
    @input="handleInput"
    class="py-1.5 px-3 outline-green-500 outline-offset-2 border-gray-200 bg-slate-100 rounded-lg"
    >
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props =  defineProps<{
  modelValue: string
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
