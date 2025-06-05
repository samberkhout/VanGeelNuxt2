<script setup lang="ts">
const { data: soorten, refresh } = await useFetch('/api/soorten')
const { data: leveranciers } = await useFetch('/api/leveranciers')

const editingId = ref<number | null>(null)
const editForm = reactive({ naam: '', leverancierId: '' as number | '' })

function startEdit(s: any) {
  editingId.value = s.id
  editForm.naam = s.naam
  editForm.leverancierId = s.leverancierId
}

async function saveEdit(id: number) {
  await $fetch(`/api/soorten/${id}`, {
    method: 'PATCH',
    body: {
      naam: editForm.naam,
      leverancierId: editForm.leverancierId ? Number(editForm.leverancierId) : undefined
    }
  })
  editingId.value = null
  await refresh()
}

async function remove(id: number) {
  await $fetch(`/api/soorten/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <h2>Soorten</h2>
    <ul>
      <li v-for="soort in soorten" :key="soort.id">
        <div v-if="editingId === soort.id">
          <input v-model="editForm.naam" />
          <select v-model="editForm.leverancierId">
            <option v-for="lev in leveranciers" :key="lev.id" :value="lev.id">
              {{ lev.naam }}
            </option>
          </select>
          <button @click="saveEdit(soort.id)">Opslaan</button>
          <button @click="editingId = null">Annuleer</button>
        </div>
        <div v-else>
          {{ soort.naam }} - {{ soort.leverancier.naam }}
          <button @click="startEdit(soort)">Bewerk</button>
          <button @click="remove(soort.id)">Verwijder</button>
        </div>
      </li>
    </ul>
  </div>
</template>
