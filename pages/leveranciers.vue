<script setup lang="ts">
const { data: leveranciers, refresh } = await useFetch('/api/leveranciers')

const search = ref('')
const filteredLeveranciers = computed(() =>
  (leveranciers.value || []).filter((l: any) =>
    l.naam.toLowerCase().includes(search.value.toLowerCase())
  )
)

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
  <div class="page-container">
    <h2>Leveranciers</h2>
    <input
      v-model="search"
      list="leveranciers-suggesties"
      class="search-input"
      type="text"
      placeholder="Zoek leverancier"
    />
    <datalist id="leveranciers-suggesties">
      <option
        v-for="lev in filteredLeveranciers.slice(0, 5)"
        :key="lev.id"
        :value="lev.naam"
      />
    </datalist>
    <ul class="item-list">
      <li v-for="lev in filteredLeveranciers" :key="lev.id">
        <div v-if="editingId === lev.id" class="edit-row">
          <input v-model="editName" />
          <button @click="saveEdit(lev.id)">Opslaan</button>
          <button @click="editingId = null">Annuleer</button>
        </div>
        <div v-else class="view-row">
          {{ lev.naam }}
          <span>
            <button @click="startEdit(lev)">Bewerk</button>
            <button @click="remove(lev.id)">Verwijder</button>
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
