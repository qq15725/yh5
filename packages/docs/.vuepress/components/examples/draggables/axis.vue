<template>
  <v-draggable axis="x" :value="{ left: 150 }">
    <template #default="{ on, value: { left } }">
      <v-navigation-drawer
        dark
        :width="Math.max(150, left)"
        style="transition: none;"
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/71.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon v-text="'image'"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Photos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider
          v-on="on"
          style="position: absolute; top: 0; right: -5px; width: 10px; max-width: 10px; cursor: ew-resize;"
          vertical
          color="primary"
        >
        </v-divider>
      </v-navigation-drawer>
    </template>
  </v-draggable>
</template>