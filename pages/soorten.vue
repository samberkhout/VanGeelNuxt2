<script setup lang="ts">
const { data: soorten, refresh } = await useFetch('/api/soorten')
const { data: leveranciers } = await useFetch('/api/leveranciers')

const search = ref('')
const filteredSoorten = computed(() =>
  (soorten.value || []).filter((s: any) =>
    s.naam.toLowerCase().includes(search.value.toLowerCase()) ||
    s.leverancier.naam.toLowerCase().includes(search.value.toLowerCase())
  )
)

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
  <div class="page-container">
    <h2>Soorten</h2>
    <input
      v-model="search"
      class="search-input"
      type="text"
      placeholder="Zoek soort of leverancier"
    />
    <ul class="item-list">
      <li v-for="soort in filteredSoorten" :key="soort.id">
        <div v-if="editingId === soort.id" class="edit-row">
          <input v-model="editForm.naam" />
          <select v-model="editForm.leverancierId">
            <option v-for="lev in leveranciers" :key="lev.id" :value="lev.id">
              {{ lev.naam }}
            </option>
          </select>
          <button @click="saveEdit(soort.id)">Opslaan</button>
          <button @click="editingId = null">Annuleer</button>
        </div>
        <div v-else class="view-row">
          {{ soort.naam }} - {{ soort.leverancier.naam }}
          <span>
            <button @click="startEdit(soort)">Bewerk</button>
            <button @click="remove(soort.id)">Verwijder</button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 1rem auto;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;
  margin: 0 0 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
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
