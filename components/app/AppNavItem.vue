<template>
  <NuxtLink
    class="w-12 h-12 flex items-center justify-center rounded-xl transition-all
  hover:bg-green-400 hover:text-white hover:drop-shadow-md"
  activeClass="bg-green-500 hover:bg-green-500 text-white drop-shadow-md"
  >
    <slot/>
  </NuxtLink>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
