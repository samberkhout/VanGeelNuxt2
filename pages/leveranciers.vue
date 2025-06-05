<script setup lang="ts">
const { data: leveranciers, refresh } = await useFetch('/api/leveranciers')

const editingId = ref<number | null>(null)
const editName = ref('')

function startEdit(lev: { id: number; naam: string }) {
  editingId.value = lev.id
  editName.value = lev.naam
}

async function saveEdit(id: number) {
  await $fetch(`/api/leveranciers/${id}`, {
    method: 'PATCH',
    body: { naam: editName.value }
  })
  editingId.value = null
  await refresh()
}

async function remove(id: number) {
  await $fetch(`/api/leveranciers/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <h2>Leveranciers</h2>
    <ul>
      <li v-for="lev in leveranciers" :key="lev.id">
        <div v-if="editingId === lev.id">
          <input v-model="editName" />
          <button @click="saveEdit(lev.id)">Opslaan</button>
          <button @click="editingId = null">Annuleer</button>
        </div>
        <div v-else>
          {{ lev.naam }}
          <button @click="startEdit(lev)">Bewerk</button>
          <button @click="remove(lev.id)">Verwijder</button>
        </div>
      </li>
    </ul>
  </div>
</template>
