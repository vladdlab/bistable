<template>
  <div class="flex flex-row items-center h-16 bg-white px-5">
    <BaseInput v-model="search" placeholder="Поиск" />
    <BaseButton type="button" class="ml-auto" @click="logout">Logout</BaseButton>
  </div>
</template>

<script setup>
const { logout: logoutRequest } = useAuth();
const search = ref('');

async function logout() {
  const { error } = await logoutRequest('/api/auth/logout');
  if (!error.value) {
    const router = useRouter();
    router.push('/auth/login');
  }
}
</script>

<style lang="scss" scoped>

</style>
