(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{288:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return i}));n(11),n(35),n(5);function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px";return null==t||""===t?void 0:isNaN(+t)?String(t):"".concat(Number(t)).concat(e)}function r(t){return Object.keys(t)}function i(t){return"number"==typeof t&&!isNaN(t)}},309:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));n(11),n(17);var a=n(288);function r(t,e){"function"==typeof t&&(t={start:t,move:t,end:t});var n={state:"dragend",dragstartX:0,dragstartY:0,dragendX:0,dragendY:0,dragX:0,dragY:0,dragOffsetX:0,dragOffsetY:0,start:t.start,move:t.move,end:t.end};return{mousedown:function(t){!function(t,e){e.state="dragstart",e.dragstartX=t.clientX,e.dragstartY=t.clientY,e.start&&e.start(Object.assign(t,e))}(t,n);var a=function(t){return function(t,e){if("dragend"===e.state)return;e.state="dragging",e.dragX=t.clientX,e.dragY=t.clientY,e.dragOffsetX=e.dragX-e.dragstartX,e.dragOffsetY=e.dragY-e.dragstartY,e.move&&e.move(Object.assign(t,e))}(t,n)};e=e||!1;window.addEventListener("mousemove",a,e),window.addEventListener("mouseup",(function t(r){window.removeEventListener("mousemove",a,e),window.removeEventListener("mouseup",t,e),function(t,e){e.state="dragend",e.dragendX=t.clientX,e.dragendY=t.clientY,e.dragOffsetX=e.dragendX-e.dragstartX,e.dragOffsetY=e.dragendY-e.dragstartY,e.end&&e.end(Object.assign(t,e))}(r,n)}),e)}}}var i={inserted:function(t,e,n){var i=e.value||{},d=e.options||!1,o=i.parent?t.parentElement:t;if(o){var s=r(i,d);o._dragHandlers=Object(o._dragHandlers),o._dragHandlers[n.context._uid]=s,Object(a.c)(s).forEach((function(t){o.addEventListener(t,s[t],d)})),i.inserted&&i.inserted(t,e,n)}},unbind:function(t,e,n){var r=e.value||{},i=r.parent?t.parentElement:t;if(i&&i._dragHandlers){var d=i._dragHandlers[n.context._uid];delete i._dragHandlers[n.context._uid],Object(a.c)(d).forEach((function(t){i.removeEventListener(t,d[t])})),r.unbind&&r.unbind(t,e,n)}}}},310:function(t,e,n){},371:function(t,e,n){"use strict";var a=n(310);n.n(a).a},400:function(t,e,n){"use strict";n.r(e);var a={directives:{Draggable:n(309).a},data:function(){return{value:{top:50,left:0},originalValue:null}},methods:{onStart:function(){this.originalValue=Object.assign({},this.value)},onMove:function(t){this.originalValue&&(this.value={left:this.originalValue.left+t.dragOffsetX,top:this.originalValue.top+t.dragOffsetY})},onEnd:function(){this.originalValue=null}}},r=(n(371),n(34)),i=Object(r.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{position:"relative","min-height":"300px"}},[n("div",{staticStyle:{height:"50px"}},[t._v(t._s(t.value))]),t._v(" "),n("div",{directives:[{name:"draggable",rawName:"v-draggable",value:{start:t.onStart,move:t.onMove,end:t.onEnd},expression:"{ start: onStart, move: onMove, end: onEnd }"}],staticClass:"drag-me",style:{top:t.value.top+"px",left:t.value.left+"px"}},[t._v("\n    拖拽我\n  ")])])}),[],!1,null,"3f1a8994",null);e.default=i.exports}}]);