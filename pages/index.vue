<template>
  <div>
    <header class="bg-dark text-white fixed top-0 w-full z-50 shadow">
      <nav class="container mx-auto flex justify-between items-center py-4">
        <NuxtLink to="/" class="font-vintage text-2xl">BBQ Garage</NuxtLink>
        <ul class="flex space-x-4">
          <li><a href="#catering" class="hover:text-copper">BBQ Catering</a></li>
          <li><a href="#verhuur" class="hover:text-copper">Licht &amp; Geluid</a></li>
          <li><a href="#offerte" class="bg-copper text-dark px-3 py-1 rounded hover:bg-copper-dark">Offerte</a></li>
        </ul>
      </nav>
    </header>

    <main class="pt-20">
      <Hero background="/hero.jpg" />
      <section id="catering" class="py-16 bg-dark text-white">
        <div class="container mx-auto text-center mb-8">
          <h2 class="text-4xl font-vintage mb-4">BBQ Catering</h2>
          <p class="mb-8">Van klassiek tot fine dining, alles in industriële sfeer.</p>
          <Gallery type="catering" />
        </div>
      </section>
      <section id="verhuur" class="py-16 bg-steel text-white">
        <div class="container mx-auto text-center mb-8">
          <h2 class="text-4xl font-vintage mb-4">Licht &amp; Geluid Verhuur</h2>
          <p class="mb-8">Complete setup voor elk feest, van DJ-booth tot lichtshow.</p>
          <Gallery type="verhuur" />
        </div>
      </section>
      <section id="offerte" class="py-16 bg-dark text-white">
        <div class="container mx-auto text-center mb-8">
          <h2 class="text-4xl font-vintage mb-4">Offerte aanvragen</h2>
        </div>
        <OfferForm />
      </section>
    </main>

    <footer class="bg-steel text-white text-center py-4">
      <p class="text-sm">&copy; {{ new Date().getFullYear() }} BBQ Garage - Alle rechten voorbehouden</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// no logic needed
</script>
