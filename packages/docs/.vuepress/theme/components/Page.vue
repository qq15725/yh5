<template>
  <v-app>
    <ParentPage :sidebarItems="sidebarItems"></ParentPage>
  </v-app>
</template>

<script>
  import ParentPage from '@parent-theme/components/Page.vue'

  export default {
    components: {
      ParentPage,
    },
    props: ['sidebarItems']
  }
</script>

<style>
  .v-application {
    background: white !important;
  }

  .v-application code {
    box-shadow: none;
    white-space: inherit;
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