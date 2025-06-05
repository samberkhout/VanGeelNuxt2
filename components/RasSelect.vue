<template>
  <div class="ras-select">
    <input
      v-model="search"
      list="soorten-suggesties"
      class="search-input"
      type="text"
      placeholder="Zoek ras"
    />
    <datalist id="soorten-suggesties">
      <option
        v-for="soort in filteredSoorten.slice(0, 5)"
        :key="soort.id"
        :value="soort.naam"
      />
    </datalist>
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
</style>
