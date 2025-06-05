<script setup lang="ts">
const { data: user, refresh } = await useFetch('/api/auth/me', {
  headers: useRequestHeaders(['cookie'])
})
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
      <nav class="nav-links">
        <template v-if="user">
          <NuxtLink to="/oppotten">Oppotten</NuxtLink>
          <NuxtLink to="/potworm">Potworm</NuxtLink>
          <NuxtLink to="/trips">Trips</NuxtLink>
          <NuxtLink to="/ziekzoeken">Ziekzoeken</NuxtLink>
          <NuxtLink to="/leveranciers">Leveranciers</NuxtLink>
          <NuxtLink to="/soorten">Soorten</NuxtLink>
          <NuxtLink to="/beheer">Beheer</NuxtLink>
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

<style>
body {
  background: linear-gradient(#e6ffe6, #f0fff0); /* lichtgroene achtergrond */
  margin: 0;
  font-family: sans-serif;
}

.site-header {
  padding: 1rem 2rem;
  background-color: #006400; /* donkergroen */
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  .nav-links a {
    padding: 0.5rem 0;
  }
}

.form-box {
  background-color: #f5f5f5; /* wit/grijs vlak */
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #004d00;
}
</style>
