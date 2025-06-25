<template>
  <form class="space-y-4 max-w-xl mx-auto bg-dark text-white p-6 rounded" @submit.prevent="submit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="form.naam" type="text" placeholder="Naam" class="input" required />
      <input v-model="form.email" type="email" placeholder="E-mail" class="input" required />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="form.datum" type="date" class="input" required />
      <input v-model.number="form.personen" type="number" placeholder="Aantal personen" class="input" required />
    </div>
    <select v-model="form.typeFeest" class="input" required>
      <option disabled value="">Type feest</option>
      <option>Bedrijfsfeest</option>
      <option>Verjaardag</option>
      <option>Bruiloft</option>
      <option>Overig</option>
    </select>
    <select v-model="form.pakket" class="input" required>
      <option disabled value="">Verhuurpakket</option>
      <option>Basis</option>
      <option>Uitgebreid</option>
      <option>Pro</option>
    </select>
    <textarea v-model="form.opmerkingen" rows="4" placeholder="Opmerkingen" class="input"></textarea>
    <button type="submit" class="bg-copper hover:bg-copper-dark transition px-6 py-3 rounded">Verstuur</button>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  naam: '',
  email: '',
  datum: '',
  personen: 0,
  typeFeest: '',
  pakket: '',
  opmerkingen: ''
})

async function submit() {
  try {
    await $fetch('/api/offerte', { method: 'POST', body: form })
    alert('Offerte verstuurd!')
  } catch (err) {
    alert('Er ging iets mis. Probeer opnieuw.')
  }
}
</script>

<style scoped>
.input {
  @apply bg-steel-light text-white px-4 py-2 rounded w-full;
}
</style>
