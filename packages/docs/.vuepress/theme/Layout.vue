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

  .v-application p {
    margin-bottom: 0;
  }

  .home .feature h2 {
    line-height: inherit;
  }

  .page p {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .theme-default-content:not(.custom) img {
    max-width: inherit;
  }
</style>