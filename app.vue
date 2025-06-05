<template>
  <div>
    <header style="padding: 1rem; background: #eee;">
      <h1>Plantenregistratie</h1>
      <nav style="display:flex; gap:1rem;">
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
