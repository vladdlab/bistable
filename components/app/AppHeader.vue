<template>
  <div class="flex flex-row items-center h-16 bg-white px-5">
    <BaseInput v-model="search" placeholder="Поиск" />
    <BaseAvatar class="ml-auto">
      <BaseIcon name="mdi:user-circle" class="text-green-400" size="lg"/>
    </BaseAvatar>
  </div>
</template>

<script setup>
const search = ref('')
</script>

<style lang="scss" scoped>

</style>
