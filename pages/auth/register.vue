<template>
  <div class="w-100 h-screen grid grid-cols-12">
    <div class="flex flex-col col-span-5 p-4">
      <div class="flex-grow flex flex-col items-center justify-center">
        <BaseForm @submit="register" :errors="registerErrors" class="w-3/5">
          <h1 class="sr-only">Sign Up Form</h1>
          <p class="text-4xl font-bold mb-3">Get Started <span>🤝</span></p>
          <p class="text-slate-500 text-sm mb-8">Let's create your account. We'd love for you to join. Keep in mind, this application is completely free!</p>

          <BaseInput
            v-model="name"
            type="text"
            label="Name"
            autocomplete="name"
            placeholder="What shall we call you?"
            :error-message="errors.name"
            size="lg"
          />

          <BaseInput
            v-model="email"
            type="email"
            label="Email Address"
            autocomplete="email"
            placeholder="awesome@email.com"
            :errorMessage="errors.email"
            size="lg"
          />

          <BaseInput
            v-model="password"
            label="Password"
            placeholder="8+ characters required"
            type="password"
            autocomplete="new-password"
            :errorMessage="errors.password"
            size="lg"
          />

          <BaseButton class="bg-green-500 text-white mt-5" type="submit" size="lg" :loading="isSubmitting" :disabled="isSubmitting">Sign Up</BaseButton>
        </BaseForm>
      </div>

      <p class="text-center">
        Already have an account?
        <NuxtLink to="login" class="text-green-500">Log in!</NuxtLink>
      </p>
    </div>
    <div class="col-span-7 bg-rainbow-image bg-center bg-local bg-contain bg-no-repeat"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { registerUserSchema } from '~~/server/schemas/user.schema'

definePageMeta({
  layout: 'auth',
  title: 'Sign Up'
})

// Form Schema
const validationSchema = toFormValidator(registerUserSchema.shape.body)
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    password: '',
  },
})

// Form fields
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

// Form's general error text
const registerErrors: Ref<string[]> = ref([])

// Form handler
const register = handleSubmit(async (values) => {
  const { error } = await useFetch('/api/auth/register', { method: 'POST', body: values })
  if (error.value) {
    registerErrors.value = [error.value.data.message]
  } else {
    const router = useRouter()
    router.push('/dashboard')
  }
})
</script>
