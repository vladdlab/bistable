<template>
  <div class="flex flex-row items-center h-16 bg-white px-5">
    <BaseInput v-model="search" placeholder="Поиск" />
    <button type="button" class="bg-slate-300 text-slate-700 px-2 py-1 rounded-md ml-auto" @click="logout">выйти</button>
    <!-- <BaseAvatar class="ml-auto">
      <BaseIcon name="mdi:user-circle" class="text-green-400" size="lg"/>
    </BaseAvatar> -->
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
