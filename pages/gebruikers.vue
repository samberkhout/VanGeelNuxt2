<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin"] })
import { z } from 'zod'

const form = reactive({ email: '', password: '', name: '' })
const error = ref('')
const message = ref('')

async function submit() {
  error.value = ''
  message.value = ''
  const result = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().optional(),
    })
    .safeParse(form)
  if (!result.success) {
    error.value = 'Ongeldige invoer'
    return
  }
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: result.data,
    })
    Object.assign(form, { email: '', password: '', name: '' })
    message.value = 'Gebruiker aangemaakt'
  } catch (e) {
    error.value = 'Fout bij opslaan'
  }
}
</script>

<template>
  <form class="form-box" @submit.prevent="submit">
    <h2>Nieuwe gebruiker</h2>
    <input v-model="form.email" type="email" placeholder="email" required />
    <input v-model="form.password" type="password" placeholder="wachtwoord" required />
    <input v-model="form.name" placeholder="naam" />
    <p style="color:red" v-if="error">{{ error }}</p>
    <p style="color:green" v-if="message">{{ message }}</p>
    <button type="submit">Voeg toe</button>
  </form>
</template>
