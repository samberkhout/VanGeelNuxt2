<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin"] })
const { data: leveranciers, refresh } = await useFetch('/api/leveranciers')

const search = ref('')
const showSuggestions = ref(false)
const filteredLeveranciers = computed(() =>
  (leveranciers.value || []).filter((l: any) =>
    l.naam.toLowerCase().includes(search.value.toLowerCase())
  )
)

const editingId = ref<number | null>(null)
const editName = ref('')

function selectSuggestion(name: string) {
  search.value = name
  showSuggestions.value = false
}

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
  <div class="search-container">
    <input
      v-model="search"
      class="search-input"
      type="text"
      placeholder="Zoek leverancier"
      @focus="showSuggestions = true"
      @input="showSuggestions = true"
    />
    <ul v-if="search && showSuggestions" class="suggestions">
      <li
        v-for="lev in filteredLeveranciers.slice(0, 5)"
        :key="lev.id"
        @click="selectSuggestion(lev.naam)"
      >
        {{ lev.naam }}
      </li>
    </ul>
  </div>
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

