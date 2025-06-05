<template>
  <select :value="modelValue" @change="update($event.target.value)">
    <option disabled value="">Kies ras</option>
    <option v-for="soort in soorten" :key="soort.id" :value="soort.id">
      {{ soort.naam }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number | '' }>();
const emit = defineEmits(['update:modelValue']);

const { data: soorten } = await useFetch('/api/soorten');

function update(value: string) {
  emit('update:modelValue', Number(value));
}
</script>
