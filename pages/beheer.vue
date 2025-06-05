<script setup lang="ts">
import { z } from 'zod'

const { data: leveranciers, refresh: refreshLeveranciers } = await useFetch('/api/leveranciers')
const { data: soorten, refresh: refreshSoorten } = await useFetch('/api/soorten')

const leverancierForm = reactive({ naam: '' })
const soortForm = reactive({ naam: '', leverancierId: '' as number | '' })

const leverancierSchema = z.object({ naam: z.string().min(1) })
const soortSchema = z.object({ naam: z.string().min(1), leverancierId: z.number().int() })

const leverancierError = ref('')
const soortError = ref('')

async function submitLeverancier() {
  leverancierError.value = ''
  const res = leverancierSchema.safeParse(leverancierForm)
  if (!res.success) {
    leverancierError.value = 'Ongeldige invoer'
    return
  }
  await $fetch('/api/leveranciers', { method: 'POST', body: res.data })
  await refreshLeveranciers()
  leverancierForm.naam = ''
}

async function submitSoort() {
  soortError.value = ''
  const res = soortSchema.safeParse({ ...soortForm, leverancierId: Number(soortForm.leverancierId) })
  if (!res.success) {
    soortError.value = 'Ongeldige invoer'
    return
  }
  await $fetch('/api/soorten', { method: 'POST', body: res.data })
  await Promise.all([refreshSoorten(), refreshLeveranciers()])
  Object.assign(soortForm, { naam: '', leverancierId: '' })
}
</script>

<template>
  <div>
    <h2>Leveranciers</h2>
    <form class="form-box" @submit.prevent="submitLeverancier">
      <input v-model="leverancierForm.naam" placeholder="naam" required />
      <p style="color:red" v-if="leverancierError">{{ leverancierError }}</p>
      <button type="submit">Voeg leverancier toe</button>
    </form>
    <!-- Lijst van bestaande leveranciers verwijderd -->

    <h2>Soorten</h2>
    <form class="form-box" @submit.prevent="submitSoort">
      <input v-model="soortForm.naam" placeholder="naam" required />
      <select v-model="soortForm.leverancierId" required>
        <option disabled value="">Kies leverancier</option>
        <option v-for="lev in leveranciers" :key="lev.id" :value="lev.id">{{ lev.naam }}</option>
      </select>
      <p style="color:red" v-if="soortError">{{ soortError }}</p>
      <button type="submit">Voeg soort toe</button>
    </form>
    <!-- Lijst van bestaande soorten verwijderd -->
  </div>
</template>
