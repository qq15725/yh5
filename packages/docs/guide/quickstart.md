1. 安装:

```bash
npm install --save yh5
```

2. 添加至你的vue应用:

```javascript
import Vue from 'vue'
import Yh5 from 'yh5/lib'
import * as components from 'yh5/lib/components'

Vue.use(Yh5, {
  components
})
```