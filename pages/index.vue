<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  name: 'HomePage',

  asyncData({ redirect }: Context) {
    return redirect(301, '/precio/peso-chileno')
  }
}
</script>

<template>
  <div></div>
</template>

