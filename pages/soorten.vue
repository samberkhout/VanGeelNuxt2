<script setup lang="ts">
definePageMeta({ middleware: ["auth", "admin"] })
const { data: soorten, refresh } = await useFetch('/api/soorten')
const { data: leveranciers } = await useFetch('/api/leveranciers')

const search = ref('')
const showSuggestions = ref(false)
const filteredSoorten = computed(() =>
  (soorten.value || []).filter((s: any) =>
    s.naam.toLowerCase().includes(search.value.toLowerCase()) ||
    s.leverancier.naam.toLowerCase().includes(search.value.toLowerCase())
  )
)

const editingId = ref<number | null>(null)
const editForm = reactive({ naam: '', leverancierId: '' as number | '' })

function selectSuggestion(name: string) {
  search.value = name
  showSuggestions.value = false
}

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
    <div class="search-container">
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Zoek soort of leverancier"
        @focus="showSuggestions = true"
        @input="showSuggestions = true"
      />
      <ul v-if="search && showSuggestions" class="suggestions">
        <li
          v-for="soort in filteredSoorten.slice(0, 5)"
          :key="soort.id"
          @click="selectSuggestion(soort.naam)"
        >
          {{ soort.naam }} - {{ soort.leverancier.naam }}
        </li>
      </ul>
    </div>
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

