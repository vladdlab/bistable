<template>
  <div class="flex flex-row items-center h-16 bg-white px-5">
    <BaseInput v-model="search" placeholder="Поиск" />
    <BaseButton type="button" class="ml-auto" @click="logout">Logout</BaseButton>
  </div>
</template>

<script setup>
const search = ref('')
const router = useRouter();
async function logout() {
  try {
    await useFetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>

</style>
