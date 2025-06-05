<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { z } from 'zod'

const form = reactive({
  leverweek: '',
  rasId: '' as number | '',
  weggegooid: '',
  reden: 'te klein',
  extraReden: ''
})

const schema = z.object({
  leverweek: z.coerce.number().int().min(1),
  rasId: z.number().int(),
  weggegooid: z.coerce.number().int().min(0),
  reden: z.enum(['te klein', 'rot', 'anders']),
  extraReden: z.string().optional()
})

const error = ref('')
const message = ref('')

async function submit() {
  error.value = ''
  message.value = ''
  const result = schema.safeParse({
    ...form,
    rasId: Number(form.rasId)
  })
  if (!result.success) {
    error.value = 'Ongeldige invoer'
    return
  }
  try {
    await $fetch('/api/ziekzoeken', {
      method: 'POST',
      body: result.data
    })
    Object.assign(form, {
      leverweek: '',
      rasId: '',
      weggegooid: '',
      reden: 'te klein',
      extraReden: ''
    })
    message.value = 'Registratie opgeslagen'
  } catch (e) {
    error.value = 'Fout bij opslaan'
  }
}
</script>

<template>
  <form class="form-box" @submit.prevent="submit">
    <input v-model="form.leverweek" type="number" placeholder="leverweek" required />
    <RasSelect v-model="form.rasId" />
    <input v-model="form.weggegooid" type="number" placeholder="weggegooid" required />
    <select v-model="form.reden">
      <option>te klein</option>
      <option>rot</option>
      <option>anders</option>
    </select>
    <input v-if="form.reden === 'anders'" v-model="form.extraReden" placeholder="extra reden" />
    <p style="color:red" v-if="error">{{ error }}</p>
    <p style="color:green" v-if="message">{{ message }}</p>
    <button type="submit">Verstuur</button>
  </form>
</template>
