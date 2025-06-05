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
  font-family: sans-serif;
}

.site-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-family: inherit;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  .nav-toggle {
    display: block;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
  }
  .nav-links.open {
    display: flex;
  }
  .nav-links a {
    padding: 0.5rem 0;
  }
  .form-box {
    width: 90%;
    max-width: none;
    padding: 0.5rem;
  }
  .form-box input,
  .form-box select,
  .form-box button {
    width: 100%;
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
