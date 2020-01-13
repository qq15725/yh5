<template>
  <v-draggable-resizable
    :value="{ width: 200, height: 100, left: 0, top: 0 }"
    parent
    absolute
    min-width="150"
    min-height="100"
  >
    <template #default="{ style, on }">
      <v-card :style="style" tile outlined>
        <v-system-bar style="cursor: move;" v-on="on" window dark>
          <v-icon v-text="'message'"></v-icon>
          <div class="text-truncate">10封未读邮件</div>
          <v-spacer></v-spacer>
          <v-icon v-text="'remove'"></v-icon>
          <v-icon v-text="'check_box_outline_blank'"></v-icon>
          <v-icon v-text="'close'"></v-icon>
        </v-system-bar>
      </v-card>
    </template>
  </v-draggable-resizable>
</template>