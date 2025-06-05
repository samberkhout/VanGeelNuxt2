<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { z } from 'zod'

const { data: leveranciers, refresh: refreshLeveranciers } = await useFetch('/api/leveranciers')
const { data: soorten, refresh: refreshSoorten } = await useFetch('/api/soorten')

const leverancierForm = reactive({ naam: '' })
const soortForm = reactive({ naam: '', leverancierId: '' as number | '' })

const leverancierSchema = z.object({ naam: z.string().min(1) })
const soortSchema = z.object({ naam: z.string().min(1), leverancierId: z.number().int() })

const leverancierError = ref('')
const soortError = ref('')
const leverancierMsg = ref('')
const soortMsg = ref('')

async function submitLeverancier() {
  leverancierError.value = ''
  leverancierMsg.value = ''
  const res = leverancierSchema.safeParse(leverancierForm)
  if (!res.success) {
    leverancierError.value = 'Ongeldige invoer'
    return
  }
  try {
    await $fetch('/api/leveranciers', { method: 'POST', body: res.data })
    await refreshLeveranciers()
    leverancierForm.naam = ''
    leverancierMsg.value = 'Toegevoegd'
  } catch (e) {
    leverancierError.value = 'Fout bij opslaan'
  }
}

async function submitSoort() {
  soortError.value = ''
  soortMsg.value = ''
  const res = soortSchema.safeParse({ ...soortForm, leverancierId: Number(soortForm.leverancierId) })
  if (!res.success) {
    soortError.value = 'Ongeldige invoer'
    return
  }
  try {
    await $fetch('/api/soorten', { method: 'POST', body: res.data })
    await Promise.all([refreshSoorten(), refreshLeveranciers()])
    Object.assign(soortForm, { naam: '', leverancierId: '' })
    soortMsg.value = 'Toegevoegd'
  } catch (e) {
    soortError.value = 'Fout bij opslaan'
  }
}
</script>

<template>
  <div>
    <h2>Leveranciers</h2>
    <form class="form-box" @submit.prevent="submitLeverancier">
      <input v-model="leverancierForm.naam" placeholder="naam" required />
      <p style="color:red" v-if="leverancierError">{{ leverancierError }}</p>
      <p style="color:green" v-if="leverancierMsg">{{ leverancierMsg }}</p>
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
      <p style="color:green" v-if="soortMsg">{{ soortMsg }}</p>
      <button type="submit">Voeg soort toe</button>
    </form>
    <!-- Lijst van bestaande soorten verwijderd -->
  </div>
</template>
