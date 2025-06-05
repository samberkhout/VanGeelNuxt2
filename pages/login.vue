<script setup lang="ts">
const form = reactive({ email: '', password: '' })
const error = ref('')
async function submit() {
  error.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: form })
    await navigateTo('/oppotten')
  } catch (e) {
    error.value = 'Inloggen mislukt'
  }
}
</script>

<template>
  <form class="form-box" @submit.prevent="submit">
    <h2>Inloggen</h2>
    <input v-model="form.email" type="email" placeholder="email" required />
    <input v-model="form.password" type="password" placeholder="wachtwoord" required />
    <p style="color:red" v-if="error">{{ error }}</p>
    <button type="submit">Login</button>
  </form>
</template>
