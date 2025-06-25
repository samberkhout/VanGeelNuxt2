<script setup lang="ts">
const props = defineProps<{ type: string }>()
const { data: fotos } = await useFetch<string[]>(`/api/fotos?type=${props.type}`)
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="url in fotos" :key="url" class="overflow-hidden rounded">
      <img :src="url" loading="lazy" class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
    </div>
  </div>
</template>
