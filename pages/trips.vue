<script setup lang="ts">
import { z } from 'zod'

const form = reactive({
  leverweek: '',
  oppotweek: '',
  rasId: '' as number | '',
  aantal: '',
  locatieX: '',
  locatieY: ''
})

const schema = z.object({
  leverweek: z.coerce.number().int(),
  oppotweek: z.coerce.number().int(),
  rasId: z.number().int(),
  aantal: z.coerce.number().int(),
  locatieX: z.coerce.number().int().min(0).max(20),
  locatieY: z.coerce.number().int().min(0).max(20)
})

const error = ref('')

async function submit() {
  error.value = ''
  const result = schema.safeParse({
    ...form,
    rasId: Number(form.rasId)
  })
  if (!result.success) {
    error.value = 'Ongeldige invoer'
    return
  }
  await $fetch('/api/trips', { method: 'POST', body: result.data })
  Object.assign(form, { leverweek: '', oppotweek: '', rasId: '', aantal: '', locatieX: '', locatieY: '' })
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.leverweek" placeholder="leverweek" type="number" required />
    <input v-model="form.oppotweek" placeholder="oppotweek" type="number" required />
    <RasSelect v-model="form.rasId" />
    <input v-model="form.aantal" placeholder="aantal" type="number" required />
    <input v-model="form.locatieX" placeholder="locatieX" type="number" required />
    <input v-model="form.locatieY" placeholder="locatieY" type="number" required />
    <p style="color:red" v-if="error">{{ error }}</p>
    <button type="submit">Verstuur</button>
  </form>
</template>
