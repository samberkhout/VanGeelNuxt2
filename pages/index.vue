<script setup lang="ts">
const { data: user } = await useFetch('/api/auth/me', {
  headers: useRequestHeaders(['cookie'])
})
</script>

<template>
  <div class="page-container">
    <h2>Welkom bij de plantenregistratie-app</h2>
    <p>Gebruik deze applicatie om oppottingen en ziekzoeken vast te leggen.</p>
    <NuxtLink v-if="user" to="/oppotten">Ga naar dashboard</NuxtLink>
    <NuxtLink v-else to="/login">Login</NuxtLink>
  </div>
</template>
