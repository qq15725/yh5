<template>
  <v-card flat tile>
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="cursor" label="cursor" class="mx-2"></v-switch>
      <v-switch v-model="grid" label="grid" class="mx-2"></v-switch>
      <v-switch v-model="disabled" label="disabled" class="mx-2"></v-switch>
      <v-switch v-model="outlined" label="outlined" class="mx-2"></v-switch>
      <v-switch v-model="point" label="point" class="mx-2"></v-switch>
      <v-select v-model="position" style="max-width: 150px;" label="position" :items="['normal', 'absolute', 'fixed']" outlined dense class="mt-4 mx-2"></v-select>
      <v-select v-model="axis" style="max-width: 150px;" label="axis" :items="['both', 'x', 'y']" outlined dense class="mt-4 mx-2"></v-select>
      <v-select v-model="handles" style="max-width: 250px;" label="handles" :items="['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br']" outlined dense class="mt-4 mx-2" attach multiple></v-select>
      <v-switch v-model="draggable" label="draggable" class="mx-2"></v-switch>
      <v-switch v-model="resizable" label="resizable" class="mx-2"></v-switch>
    </v-row>

    <v-divider></v-divider>

    <v-card
      min-height="300"
      flat
      tile
      :style="{ background: grid ? 'linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px' : '' }"
    >
      <v-draggable-resizable
        v-model="data"
        :parent="parent"
        :[position]="true"
        :cursor="cursor"
        :grid="grid ? [20, 20] : undefined"
        :axis="axis"
        :disabled="disabled"
        :outlined="outlined"
        :point="point"
        :handles="handles"
        :draggable="draggable"
        :resizable="resizable"
        style="z-index: 10;"
      >
        <template #default="{ style, on }">
          <v-card
            v-on="on"
            :style="style"
            dark
            tile
          >
          </v-card>
        </template>
      </v-draggable-resizable>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        data: {
          left: 0,
          top: 0,
          width: 100,
          height: 100,
        },
        parent: false,
        cursor: false,
        disabled: false,
        outlined: false,
        point: false,
        grid: false,
        position: 'normal',
        axis: 'both',
        handles: ['t', 'tl', 'l', 'b', 'bl', 'tr', 'r', 'br'],
        draggable: true,
        resizable: true,
      }
    }
  }
</script>