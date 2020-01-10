### 使用

`v-draggable-resizable-panel`

<v-code-card>

<examples-draggable-resizable-panel-usage></examples-draggable-resizable-panel-usage>

<div slot="template">

```html
<template>
  <v-card
    min-height="300"
  >
    <v-row no-gutters>
      <v-switch v-model="parent" label="parent" class="mx-2"></v-switch>
      <v-switch v-model="resizable" label="resizable" class="mx-2"></v-switch>
      <v-switch v-model="draggable" label="draggable" class="mx-2"></v-switch>
    </v-row>

    <v-draggable-resizable-panel
      :parent="parent"
      :resizable="resizable"
      :draggable="draggable"
    >
      <v-card class="fill-height" dark>
        <v-toolbar flat>面板</v-toolbar>
        <v-card-text>拖拽、调整大小</v-card-text>
      </v-card>
    </v-draggable-resizable-panel>
  </v-card>
</template>
```  
  
</div>

<div slot="script">

```html
<script>
  export default {
    data () {
      return {
        parent: true,
        resizable: true,
        draggable: true,
      }
    },
  }
</script>
```  

</div>

</v-code-card>