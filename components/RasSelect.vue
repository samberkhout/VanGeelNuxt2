<template>
  <div class="ras-select">
    <div class="search-container">
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Zoek ras"
        @focus="showSuggestions = true"
        @input="onType"
      />
      <ul v-if="search && showSuggestions" class="suggestions">
        <li
          v-for="soort in filteredSoorten.slice(0, 5)"
          :key="soort.id"
          @click="selectSuggestion(soort)"
        >
          {{ soort.naam }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number | '' }>();
const emit = defineEmits(['update:modelValue']);

const { data: soorten } = await useFetch('/api/soorten');

const search = ref('');
const showSuggestions = ref(false);
watchEffect(() => {
  if (props.modelValue && soorten.value) {
    const found = (soorten.value as any[]).find(
      (s: any) => s.id === props.modelValue
    );
    if (found) {
      search.value = found.naam;
    }
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (!val && !showSuggestions.value) {
      search.value = '';
    }
  }
);

const filteredSoorten = computed(() =>
  (soorten.value || []).filter((s: any) =>
    s.naam.toLowerCase().includes(search.value.toLowerCase())
  )
);

function onType() {
  showSuggestions.value = true;
  emit('update:modelValue', '');
}

function selectSuggestion(soort: any) {
  search.value = soort.naam;
  emit('update:modelValue', soort.id);
  showSuggestions.value = false;
}
</script>

<style scoped>
.ras-select {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
