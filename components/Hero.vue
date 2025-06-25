<template>
  <section class="hero relative text-white">
    <img :src="background" alt="Hero" class="absolute inset-0 w-full h-full object-cover" />
    <div class="relative container mx-auto py-24 text-center">
      <h1 class="text-5xl md:text-7xl font-vintage mb-4 drop-shadow">BBQ Garage</h1>
      <p class="text-xl mb-6">Stoere catering en verhuur van licht &amp; geluid</p>
      <NuxtLink to="#offerte" class="mt-4 inline-block bg-copper px-6 py-3 rounded hover:bg-copper-dark transition">Vraag offerte aan</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  background: { type: String, default: '/hero.jpg' }
})
</script>

<style scoped>
.hero { min-height: 80vh; }
</style>
