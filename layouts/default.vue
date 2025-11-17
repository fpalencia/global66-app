<template>
  <div class="min-h-screen bg-white">
    <AppHeader />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/commons/AppHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader
  }
}
</script>

