<template>
  <v-card
    outlined
    tile
    class="my-3"
  >
    <v-toolbar flat dense color="grey lighten-3">
      <v-spacer></v-spacer>

      <v-tooltip v-if="url" bottom>
        <template #activator="{ on }">
          <v-btn icon v-on="on" :href="url" target="_blank">
            <v-icon v-text="'open_in_new'"></v-icon>
          </v-btn>
        </template>
        <div>在github上查看</div>
      </v-tooltip>

      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn icon v-on="on" @click="showCode = !showCode">
            <v-icon v-text="'code'"></v-icon>
          </v-btn>
        </template>
        <div>查看代码</div>
      </v-tooltip>
    </v-toolbar>

    <v-expand-transition>
      <v-card v-if="showCode" dark tile>
        <v-item-group v-model="window" class="pa-2">
          <v-item #default="{ active, toggle }">
            <v-btn @click="toggle" depressed rounded :color="active ? 'grey darken-2' : 'transparent'">template</v-btn>
          </v-item>
          <v-item v-if="$scopedSlots.script" #default="{ active, toggle }">
            <v-btn @click="toggle" depressed rounded :color="active ? 'grey darken-2' : 'transparent'">script</v-btn>
          </v-item>
        </v-item-group>
        <v-divider></v-divider>

        <v-window
          v-model="window"
        >
          <v-window-item>
            <div class="v-example__container">
              <v-card color="#282c34" outlined>
                <slot name="template"></slot>
              </v-card>
            </div>
          </v-window-item>
          <v-window-item>
            <div class="v-example__container">
              <v-card color="#282c34" outlined>
                <slot name="script"></slot>
              </v-card>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-expand-transition>

    <ClientOnly>
      <slot></slot>
    </ClientOnly>
  </v-card>
</template>

<script>
  export default {
    props: {
      url: String,
    },
    data () {
      return {
        showCode: false,
        window: 0,
      }
    }
  }
</script>

<style scoped>
  .v-example__container {
    height: 100%;
    max-height: calc(100vh - 275px);
    overflow-y: auto;
  }
</style>

<style>
  .v-example__container pre {
    margin: 0 !important;
  }
</style>