<template>
  <v-app>
    <parent-layout/>
  </v-app>
</template>

<script>
  import ParentLayout from '@parent-theme/layouts/Layout.vue'

  export default {
    components: {
      ParentLayout
    }
  }
</script>

<style>
  .v-application code {
    box-shadow: none;
  }

  .v-application code:after, .v-application code:before, .v-application kbd:after, .v-application kbd:before {
    content: none;
  }
</style>