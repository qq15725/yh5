### draggable 指令

试试拖动下方小方块

<v-code-card height="300" url="/components/examples/draggables/directive.vue">

<examples-draggables-directive></examples-draggables-directive>

<div slot="template">

```html
<template>
  <v-card
    tile
    dark
    width="100"
    height="100"
    style="position: absolute; cursor: move;"
    :style="{ top: `${value.top}px`, left: `${value.left}px` }"
    v-draggable="{ start: onStart, move: onMove, end: onEnd }"
  >
  </v-card>
</template>
```  
  
</div>

<div slot="script">

```html
<script>
  import { Draggable } from 'yh5/lib/directives'

  export default {
    directives: {
      Draggable
    },
    data () {
      return {
        value: {
          top: 0,
          left: 0,
        },
        originalValue: null
      }
    },
    methods: {
      onStart () {
        this.originalValue = Object.assign({}, this.value)
      },
      onMove (event) {
        if (!this.originalValue) return

        this.value = {
          left: this.originalValue.left + event.dragOffsetX,
          top: this.originalValue.top + event.dragOffsetY,
        }
      },
      onEnd () {
        this.originalValue = null
      },
    }
  }
</script>
```  

</div>
</v-code-card>