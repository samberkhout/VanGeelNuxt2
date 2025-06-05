<script setup lang="ts">
const { data: user, refresh } = await useFetch('/api/auth/me', {
  headers: useRequestHeaders(['cookie'])
})

const showNav = ref(false)

function toggleNav() {
  showNav.value = !showNav.value
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await refresh()
  await navigateTo('/login')
}
</script>

<template>
  <div>
    <header class="site-header">
      <h1>Plantenregistratie</h1>
      <button class="nav-toggle" @click="toggleNav">☰</button>
      <nav class="nav-links" :class="{ open: showNav }">
        <template v-if="user">
          <NuxtLink to="/oppotten">Oppotten</NuxtLink>
          <NuxtLink to="/potworm">Potworm</NuxtLink>
          <NuxtLink to="/trips">Trips</NuxtLink>
          <NuxtLink to="/ziekzoeken">Ziekzoeken</NuxtLink>
          <NuxtLink v-if="user.rol === 'ADMIN'" to="/leveranciers">Leveranciers</NuxtLink>
          <NuxtLink v-if="user.rol === 'ADMIN'" to="/soorten">Soorten</NuxtLink>
          <NuxtLink v-if="user.rol === 'ADMIN'" to="/gebruikers">Gebruikers</NuxtLink>
          <NuxtLink v-if="user.rol === 'ADMIN'" to="/beheer">Beheer</NuxtLink>
          <span class="user-info">
            {{ user.email }}
            <button @click="logout">Logout</button>
          </span>
        </template>
        <NuxtLink v-else to="/login">Login</NuxtLink>
      </nav>
    </header>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

