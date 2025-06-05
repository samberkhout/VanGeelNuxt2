<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin"] })
import { z } from 'zod'

const form = reactive({ email: '', password: '', name: '' })
const error = ref('')
const message = ref('')

const { data: users, refresh } = await useFetch('/api/users')
const editingId = ref<string | null>(null)
const editForm = reactive({ name: '', rol: 'USER' })

function startEdit(u: any) {
  editingId.value = u.id
  editForm.name = u.name || ''
  editForm.rol = u.rol
}

async function saveEdit(id: string) {
  await $fetch(`/api/users/${id}`, {
    method: 'PATCH',
    body: { name: editForm.name, rol: editForm.rol },
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

  <ul class="item-list">
    <li v-for="u in users" :key="u.id">
      <div v-if="editingId === u.id" class="edit-row">
        <input v-model="editForm.name" placeholder="naam" />
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
</template>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
  margin: 1rem auto;
  max-width: 600px;
}

.item-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.item-list li:last-child {
  border-bottom: none;
}

.item-list button {
  margin-left: 0.5rem;
}
</style>
