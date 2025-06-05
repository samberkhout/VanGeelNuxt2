<template>
  <div>
    <header class="site-header">
      <h1>Plantenregistratie</h1>
      <nav class="nav-links">
        <NuxtLink to="/oppotten">Oppotten</NuxtLink>
        <NuxtLink to="/potworm">Potworm</NuxtLink>
        <NuxtLink to="/trips">Trips</NuxtLink>
        <NuxtLink to="/ziekzoeken">Ziekzoeken</NuxtLink>
      </nav>
    </header>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
body {
  background-color: #e6ffe6; /* lichtgroene achtergrond */
  margin: 0;
  font-family: sans-serif;
}

.site-header {
  padding: 1rem;
  background-color: #006400; /* donkergroen */
  color: white;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

form {
  background-color: #f5f5f5; /* wit/grijs vlak */
  padding: 1rem;
  border-radius: 4px;
  max-width: 600px;
  margin: 1rem auto;
}
</style>
