<template>
  <div class="w-100 h-screen grid grid-cols-12">
    <div class="flex flex-col col-span-full sm:col-span-5 p-4">
      <div class="flex-grow flex flex-col items-center justify-center">
        <BaseForm @submit="handler" :errors="loginErrors" class="flex sm:w-3/5">
          <h1 class="sr-only">Login Form</h1>
          <p class="text-4xl font-bold mb-3">Hey, hello! <span>👋</span></p>
          <p class="text-slate-500 text-sm mb-8">It's so good to see you again! Enter your credentials to access your account.</p>

          <BaseInput
            v-model="email"
            type="email"
            label="Email Address"
            autocomplete="email"
            placeholder="awesome@email.com"
            :error-message="errors.email"
            size="lg"
          />

          <BaseInput
            v-model="password"
            label="Password"
            placeholder="8+ characters required"
            type="password"
            autocomplete="current-password"
            :error-message="errors.password"
            size="lg"
          />

          <div class="flex justify-between text-sm mt-3">
            <BaseCheckbox v-model="rememberMe" label="Keep me signed in" class="text-slate-500" />
            <NuxtLink class="text-green-500">Forgot password?</NuxtLink>
          </div>

          <BaseButton class="mt-5" type="submit" size="lg" :loading="isSubmitting" :disabled="isSubmitting">Login</BaseButton>
        </BaseForm>

      </div>

      <p class="text-center">
        Don't have account yet?
        <NuxtLink to="register" class="text-green-500">Sign Up!</NuxtLink>
      </p>

    </div>
    <div class="hidden sm:block col-span-7 bg-monstera-image bg-center bg-local bg-contain bg-no-repeat">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { loginUserSchema } from '~~/schemas/user.schema';

definePageMeta({
  layout: "auth",
  title: 'Login'
});

// Form Schema
const validationSchema = toFormValidator(loginUserSchema.shape.body)
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
});

// Form fields
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: rememberMe } = useField<boolean>('rememberMe');

// Form's general error text
let loginErrors: Ref<string[]> = ref([])

// Form handler
const { login } = useAuth();
const handler = handleSubmit(async (values) => {
  const { error } = await login(values)
  if (error.value && error.value.statusMessage) {
    loginErrors.value = [error.value.statusMessage];
  } else {
    const router = useRouter();
    router.push('/dashboard');
  }
})
</script>
