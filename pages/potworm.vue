<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { z } from 'zod'

const currentYear = new Date().getFullYear()
const form = reactive({
  jaar: currentYear,
  week: '',
  afdeling1: '',
  afdeling16: ''
})

const schema = z.object({
  jaar: z.number().int(),
  week: z.coerce.number().int().min(1).max(52),
  afdeling1: z.coerce.number().int(),
  afdeling16: z.coerce.number().int()
})

const error = ref('')
const message = ref('')

async function submit() {
  error.value = ''
  message.value = ''
  const result = schema.safeParse(form)
  if (!result.success) {
    error.value = 'Ongeldige invoer'
    return
  }
  try {
    await $fetch('/api/potworm', { method: 'POST', body: result.data })
    Object.assign(form, {
      jaar: currentYear,
      week: '',
      afdeling1: '',
      afdeling16: ''
    })
    message.value = 'Registratie opgeslagen'
  } catch (e) {
    error.value = 'Fout bij opslaan'
  }
}
</script>

<template>
  <form class="form-box" @submit.prevent="submit">
    <input v-model="form.jaar" type="number" />
    <input v-model="form.week" type="number" placeholder="week" required />
    <input v-model="form.afdeling1" type="number" placeholder="afdeling1" required />
    <input v-model="form.afdeling16" type="number" placeholder="afdeling16" required />
    <p style="color:red" v-if="error">{{ error }}</p>
    <p style="color:green" v-if="message">{{ message }}</p>
    <button type="submit">Verstuur</button>
  </form>
</template>
