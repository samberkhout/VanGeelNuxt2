<script setup lang="ts">
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
  await $fetch('/api/ziekzoeken', {
    method: 'POST',
    body: result.data
  })
  Object.assign(form, { leverweek: '', rasId: '', weggegooid: '', reden: 'te klein', extraReden: '' })
}
</script>

<template>
  <form class="form-box" @submit.prevent="submit">
    <div>
      <label>Leverweek</label>
      <input v-model="form.leverweek" type="number" required />
    </div>
    <RasSelect v-model="form.rasId" />
    <div>
      <label>Weggegooid</label>
      <input v-model="form.weggegooid" type="number" required />
    </div>
    <div>
      <label>Reden</label>
      <select v-model="form.reden">
        <option>te klein</option>
        <option>rot</option>
        <option>anders</option>
      </select>
    </div>
    <div v-if="form.reden === 'anders'">
      <label>Extra reden</label>
      <input v-model="form.extraReden" />
    </div>
    <p style="color:red" v-if="error">{{ error }}</p>
    <button type="submit">Verstuur</button>
  </form>
</template>
