(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{339:function(t,e,n){},422:function(t,e,n){"use strict";var a=n(339);n.n(a).a},437:function(t,e,n){"use strict";n.r(e);var a={directives:{Draggable:n(58).a},data:function(){return{value:{top:50,left:0},originalValue:null}},methods:{onStart:function(){this.originalValue=Object.assign({},this.value)},onMove:function(t){this.originalValue&&(this.value={left:this.originalValue.left+t.dragOffsetX,top:this.originalValue.top+t.dragOffsetY})},onEnd:function(){this.originalValue=null}}},i=(n(422),n(45)),l=Object(i.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{position:"relative","min-height":"300px"}},[n("div",{staticStyle:{height:"50px"}},[t._v(t._s(t.value))]),t._v(" "),n("div",{directives:[{name:"draggable",rawName:"v-draggable",value:{start:t.onStart,move:t.onMove,end:t.onEnd},expression:"{ start: onStart, move: onMove, end: onEnd }"}],staticClass:"drag-me",style:{top:t.value.top+"px",left:t.value.left+"px"}},[t._v("\n    拖拽我\n  ")])])}),[],!1,null,"06b90f4b",null);e.default=l.exports}}]);