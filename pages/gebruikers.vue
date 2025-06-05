<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin"] })
import { z } from 'zod'

const form = reactive({ email: '', password: '', name: '' })
const error = ref('')
const message = ref('')

const { data: users, refresh } = await useFetch('/api/users')
const editingId = ref<string | null>(null)
const editForm = reactive({ name: '', email: '', password: '', rol: 'USER' })

function startEdit(u: any) {
  editingId.value = u.id
  editForm.name = u.name || ''
  editForm.email = u.email
  editForm.password = ''
  editForm.rol = u.rol
}

async function saveEdit(id: string) {
  const body: any = {
    name: editForm.name,
    email: editForm.email,
    rol: editForm.rol,
  }
  if (editForm.password) {
    body.password = editForm.password
  }
  await $fetch(`/api/users/${id}`, {
    method: 'PATCH',
    body,
  })
  editingId.value = null
  await refresh()
}

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

  <div class="page-container">
    <ul class="item-list">
      <li v-for="u in users" :key="u.id">
        <div v-if="editingId === u.id" class="edit-row">
        <input v-model="editForm.email" type="email" placeholder="email" />
        <input v-model="editForm.name" placeholder="naam" />
        <input v-model="editForm.password" type="password" placeholder="nieuw wachtwoord" />
        <select v-model="editForm.rol">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button @click="saveEdit(u.id)">Opslaan</button>
        <button @click="editingId = null">Annuleer</button>
      </div>
      <div v-else class="view-row">
        {{ u.email }} - {{ u.name }} - {{ u.rol }}
        <span>
          <button @click="startEdit(u)">Bewerk</button>
        </span>
      </div>
    </li>
    </ul>
  </div>
</template>

