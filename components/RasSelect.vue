<template>
  <div class="ras-select">
    <div class="search-container">
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Zoek ras"
      />
      <ul v-if="search" class="suggestions">
        <li
          v-for="soort in filteredSoorten.slice(0, 5)"
          :key="soort.id"
          @click="search = soort.naam"
        >
          {{ soort.naam }}
        </li>
      </ul>
    </div>
    <select :value="modelValue" @change="update($event.target.value)">
      <option disabled value="">Kies ras</option>
      <option
        v-for="soort in filteredSoorten"
        :key="soort.id"
        :value="soort.id"
      >
        {{ soort.naam }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number | '' }>();
const emit = defineEmits(['update:modelValue']);

const { data: soorten } = await useFetch('/api/soorten');

const search = ref('');
const filteredSoorten = computed(() =>
  (soorten.value || []).filter((s: any) =>
    s.naam.toLowerCase().includes(search.value.toLowerCase())
  )
);

function update(value: string) {
  emit('update:modelValue', Number(value));
}
</script>

<style scoped>
.ras-select {
  display: flex;
  flex-direction: column;
}

.search-input {
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container {
  position: relative;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1;
}

.suggestions li {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.suggestions li:hover {
  background: #eee;
}
</style>
