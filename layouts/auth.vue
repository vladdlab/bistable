<template>
  <div>
    <slot/>
  </div>
</template>

<script setup>
const route = useRoute()

useHead({
  titleTemplate: () => {
    return `BiStable - ${route.meta.title}`;
  }
})
</script>

<style lang="scss" scoped>

</style>
