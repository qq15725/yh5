<template>
  <v-resizable :value="{ width: 100, height: 100 }">
    <template #default="{ style }">
      <v-card :style="style" dark tile></v-card>
    </template>
    <template #tl="{ on, style }">
      <div v-on="on" :style="style">😀</div>
    </template>
    <template #t="{ on, style }">
      <div v-on="on" :style="style">😂</div>
    </template>
    <template #tr="{ on, style }">
      <div v-on="on" :style="style">😆</div>
    </template>
    <template #r="{ on, style }">
      <div v-on="on" :style="style">😉</div>
    </template>
    <template #br="{ on, style }">
      <div v-on="on" :style="style">😎</div>
    </template>
    <template #b="{ on, style }">
      <div v-on="on" :style="style">😍</div>
    </template>
    <template #bl="{ on, style }">
      <div v-on="on" :style="style">😣</div>
    </template>
    <template #l="{ on, style }">
      <div v-on="on" :style="style">😕</div>
    </template>
  </v-resizable>
</template>