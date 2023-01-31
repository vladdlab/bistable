<template>
  <div class="w-100 h-screen grid grid-cols-12">
    <div class="flex items-center justify-center col-span-4 p-4">
      <form @submit.prevent="register" class="flex flex-col items-center gap-3">
        <BaseInput v-model="name" placeholder="Имя" autocomplete="name" />
        <span class="text-xs text-red-500">{{ errors.name }}</span>

        <BaseInput v-model="email" placeholder="E-mail" type="email" autocomplete="email" />
        <span class="text-xs text-red-500">{{ errors.email }}</span>

        <BaseInput v-model="password" type="password" placeholder="Пароль" autocomplete="new-password" />
        <span class="text-xs text-red-500">{{ errors.password }}</span>

        <button class="bg-slate-300 text-slate-700 px-5 py-1 rounded-md">Зарегистрироваться</button>

        <p class="text-xs text-red-500">{{ errorMessage }}</p>

        <NuxtLink to="login" class="text-green-500">У меня уже есть аккаунт</NuxtLink>
      </form>
    </div>
    <div class="col-span-8 bg-gradient-to-r from-cyan-500 to-blue-500">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { registerUserSchema } from '~~/server/schemas/user.schema';
const router = useRouter()

definePageMeta({
  layout: "auth",
});


// Form Schema
const validationSchema = toFormValidator(registerUserSchema.shape.body)
const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    password: ''
  },
});

// Form fields
const { value: name } = useField<string>('name');
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

// Form's general error text
const errorMessage = ref('')

// Form handler
const register = handleSubmit(async (values) => {
  const { error } = await useFetch('/api/auth/register', { method: 'POST', body: values })
  if (error.value) {
    errorMessage.value = error.value.message || '';
  } else {
    const router = useRouter();
    router.push('/dashboard');
  }
})
</script>
