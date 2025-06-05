<template>
  <div>
    <header class="site-header">
      <h1>Plantenregistratie</h1>
      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle navigation">
        &#9776;
      </button>
      <nav :class="['nav-links', { open: menuOpen }]">
        <NuxtLink to="/oppotten">Oppotten</NuxtLink>
        <NuxtLink to="/potworm">Potworm</NuxtLink>
        <NuxtLink to="/trips">Trips</NuxtLink>
        <NuxtLink to="/ziekzoeken">Ziekzoeken</NuxtLink>
        <NuxtLink to="/leveranciers">Leveranciers</NuxtLink>
        <NuxtLink to="/soorten">Soorten</NuxtLink>
        <NuxtLink to="/beheer">Beheer</NuxtLink>
      </nav>
    </header>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

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

.menu-toggle {
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
  .menu-toggle {
    display: block;
  }
  .nav-links {
    flex-direction: column;
    width: 100%;
    display: none;
  }
  .nav-links.open {
    display: flex;
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
