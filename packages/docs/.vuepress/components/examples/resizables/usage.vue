<template>
  <v-card flat tile>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="grid" label="grid" class="mx-2"></v-switch>
      <v-switch v-model="disabled" label="disabled" class="mx-2"></v-switch>
      <v-switch v-model="outlined" label="outlined" class="mx-2"></v-switch>
      <v-switch v-model="point" label="point" class="mx-2"></v-switch>
      <v-select v-model="handles" style="max-width: 250px;" label="handles" :items="['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']" outlined dense class="mt-4 mx-2" attach multiple></v-select>
    </v-row>

    <v-divider></v-divider>

    <v-card
      min-height="300"
      flat
      tile
      :style="{ background: grid ? 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px' : '' }"
    >
      <v-resizable
        v-model="data"
        :parent="parent"
        :grid="grid ? [20, 20] : undefined"
        :disabled="disabled"
        :outlined="outlined"
        :point="point"
        :handles="handles"
      >
        <template #default="{ style }">
          <v-card
            :style="style"
            dark
            tile
          >
          </v-card>
        </template>
      </v-resizable>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        data: {
          width: 100,
          height: 100,
        },
        parent: false,
        disabled: false,
        grid: false,
        outlined: false,
        point: false,
        handles: ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br'],
      }
    },
  }
</script>