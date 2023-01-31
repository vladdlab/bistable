<template>
  <div class="w-100 h-screen grid grid-cols-12">
    <div class="flex items-center justify-center col-span-4 p-4">
      <form @submit="login" class="flex flex-col items-center gap-3">
        <BaseInput v-model="email" placeholder="E-mail" type="email" autocomplete="username" />
        <span class="text-xs text-red-500">{{ errors.email }}</span>

        <BaseInput v-model="password" placeholder="Пароль" type="password" autocomplete="current-password" />
        <span class="text-xs text-red-500">{{ errors.password }}</span>

        <button class="bg-slate-300 text-slate-700 px-5 py-1 rounded-md">Войти</button>

        <p class="text-xs text-red-500">{{ errorMessage }}</p>

        <NuxtLink to="register" class="text-green-500">Ещё нет аккаунта?</NuxtLink>
      </form>
    </div>
    <div class="col-span-8 bg-gradient-to-r from-green-500 to-emerald-400">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginUserSchema } from '~~/server/schemas/user.schema';

definePageMeta({
layout: "auth",
});

// Form Schema
const validationSchema = toFormValidator(loginUserSchema.shape.body)
const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: ''
  },
});

// Form fields
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

// Form's general error text
const errorMessage = ref('')

// Form handler
const login = handleSubmit(async (values) => {
  const { error } = await useFetch('/api/auth/login', { method: 'POST', body: values})
  if (error.value) {
    errorMessage.value = error.value.statusMessage || '';
  } else {
    const router = useRouter();
    router.push('/dashboard');
  }
})
</script>
