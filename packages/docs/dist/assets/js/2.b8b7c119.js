(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{110:function(t,e,i){"use strict";var n=i(51),r=i(0),s=i.n(r);var a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return s.a.extend({name:"proxyable",model:{prop:t,event:e},props:Object(n.a)({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:Object(n.a)({},t,(function(t){this.internalLazyValue=t}))})}();e.a=a},114:function(t,e,i){"use strict";i(84),i(82);var n=i(52),r=(i(45),i(81),i(23),i(85),i(86),i(21),i(131),i(96)),s=i(76),a=i(31),o=i(25),l=Object(a.a)(r.a),h=["t","tl","l","b","bl","tr","r","br"];e.a=l.extend({name:"v-resizable",props:{value:{type:Object,default:function(){return{width:0,height:0}}},absolute:Boolean,cursor:Boolean,minWidth:[String,Number],maxWidth:[String,Number],minHeight:[String,Number],maxHeight:[String,Number],hideGripBreakpoint:{type:[String,Number],default:50},points:{type:Array,default:function(){return h},validator:function(t){return new Set(t.filter((function(t){return new Set(h).has(t)}))).size===t.length}},aspectRatio:[String,Number]},data:function(){return{point:null}},computed:{classes:function(){return{"v-resizable--disabled":this.disabled,"v-resizable--activated":null!==this.originalValue}},styles:function(){var t={},e=Object(o.a)(this.internalValue.width),i=Object(o.a)(this.internalValue.height);return this.absolute&&(t.position="absolute"),this.fixed&&(t.position="fixed"),!this.disabled&&this.cursor&&(t.cursor=this.cursor),e&&(t.width=e),i&&(t.height=i),t},defaultSlotStyles:function(){var t={},e=Object(o.a)(this.internalValue.width),i=Object(o.a)(this.internalValue.height);return e&&(t.width=e),i&&(t.height=i),t},computedAspectRatio:function(){return Number(this.aspectRatio)},computedHideGripBreakpoint:function(){return Number(this.hideGripBreakpoint)}},methods:{handleEdge:function(t){var e=[parseInt(this.minHeight)||0,t.height,0],i=[parseInt(this.minWidth)||0,t.width,0],n=[],r=[];return parseInt(this.maxHeight)&&n.push(parseInt(this.maxHeight)),this.parentHeight&&n.push(this.parentHeight),parseInt(this.maxWidth)&&r.push(parseInt(this.maxWidth)),this.parentWidth&&r.push(this.parentWidth),t.height=Math.min.apply(Math,[Math.max.apply(Math,e)].concat(n)),t.width=Math.min.apply(Math,[Math.max.apply(Math,i)].concat(r)),t},snapToGrid:function(t){if(!this.computedGrid)return t;var e=Object(n.a)(this.computedGrid,2),i=e[0],r=e[1];return i&&(t.width=Math.round(t.width/i)*i),r&&(t.height=Math.round(t.height/r)*r),t},convertToAspectRatio:function(t){return this.computedAspectRatio&&this.point?(this.point.indexOf("l")>-1||this.point.indexOf("r")>-1?t.height=t.width*this.computedAspectRatio:t.width=t.height/this.computedAspectRatio,t):t},handleMove:function(t){var e={width:this.internalValue.width,height:this.internalValue.height};return this.point&&(this.point.indexOf("l")>-1?e.width=this.originalValue.width-t.dragOffsetX:this.point.indexOf("r")>-1&&(e.width=this.originalValue.width+t.dragOffsetX),this.point.indexOf("t")>-1?e.height=this.originalValue.height-t.dragOffsetY:this.point.indexOf("b")>-1&&(e.height=this.originalValue.height+t.dragOffsetY),e=this.convertToAspectRatio(e)),e},emitMoveEvent:function(){this.$emit("resizing",this.internalValue)},emitEndEvent:function(){this.$emit("resizestop",this.internalValue)},genPoint:function(t){var e=this,i=this.internalValue.width<=this.computedHideGripBreakpoint||this.internalValue.height<=this.computedHideGripBreakpoint;return this.$createElement("div",{staticClass:"v-resizable__point v-resizable__point--".concat(t),style:{padding:i?0:""},class:{"v-resizable__point--resizing":this.point&&this.point===t,"v-resizable__point--hide":this.point&&this.point!==t||i&&-1===["br","b","r"].indexOf(t)},on:Object(s.b)({start:function(i){e.point=t,e.onStart(i)},move:this.onMove,end:function(t){e.onEnd(t),e.point=null}})},[this.$slots[t]||this.$createElement("div",{staticClass:"v-resizable__point--grip"})])},genPoints:function(){return this.points.map(this.genPoint)}},render:function(t){return t("div",{staticClass:"v-resizable",class:this.classes,style:this.styles},[!this.disabled&&this.genPoints(),t("div",{staticClass:"v-resizable__wrapper"},[this.$scopedSlots.default&&this.$scopedSlots.default({value:this.internalValue,style:this.defaultSlotStyles,active:null!==this.originalValue})])])}})},131:function(t,e,i){},174:function(t,e,i){"use strict";i(21);var n=i(0),r=i.n(n),s=i(25);e.a=r.a.extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],minHeight:[Number,String],width:[Number,String],maxWidth:[Number,String],minWidth:[Number,String]},computed:{measurableStyles:function(){var t={},e=Object(s.a)(this.height),i=Object(s.a)(this.maxHeight),n=Object(s.a)(this.minHeight),r=Object(s.a)(this.width),a=Object(s.a)(this.maxWidth),o=Object(s.a)(this.minWidth);return e&&(t.height=e),i&&(t.maxHeight=i),n&&(t.minHeight=n),r&&(t.width=r),a&&(t.maxWidth=a),o&&(t.minWidth=o),t}}})},184:function(t,e,i){"use strict";i(82);var n=i(52),r=i(31),s=i(96),a=i(114).a,o=Object(r.a)(a);e.a=o.extend({name:"v-draggable-resizable",props:{value:{type:Object,default:function(){return{top:0,left:0,width:0,height:0}}},absolute:{type:Boolean,default:!0},cursor:{type:[Boolean,String],default:"move"}},computed:{resizableDefaultSlotStyles:function(){return a.options.computed.defaultSlotStyles.call(this)},styles:function(){return Object.assign(a.options.computed.styles.call(this),s.a.options.computed.styles.call(this))}},methods:{handleEdge:function(t){return Object.assign(a.options.methods.handleEdge.call(this,t),s.a.options.methods.handleEdge.call(this,t))},snapToGrid:function(t){if(!this.computedGrid)return t;var e=Object(n.a)(this.computedGrid,2),i=e[0],r=e[1];return i&&(t.width=Math.round(t.width/i)*i,t.left=Math.round(t.left/i)*i),r&&(t.height=Math.round(t.height/r)*r,t.top=Math.round(t.top/r)*r),t},handleMove:function(t){var e=Object.assign({},this.internalValue);return this.point?(this.point.indexOf("t")>-1&&(e.top=this.originalValue.top+t.dragOffsetY),this.point.indexOf("l")>-1&&(e.left=this.originalValue.left+t.dragOffsetX),Object.assign({},e,a.options.methods.handleMove.call(this,t))):Object.assign({},e,s.a.options.methods.handleMove.call(this,t))},emitMoveEvent:function(){this.point?a.options.methods.emitMoveEvent.call(this):s.a.options.methods.emitMoveEvent.call(this)},emitEndEvent:function(){this.point?a.options.methods.emitEndEvent.call(this):s.a.options.methods.emitEndEvent.call(this)},genPoint:function(t){var e=a.options.methods.genPoint.call(this,t);return e&&!this.point&&null!==this.originalValue&&(e.data.staticClass+=" v-resizable__point--hide"),e}},render:function(t){var e=this.$listeners;return this.disabled||(e=e||{},e=Object.assign(e,this.genListeners())),t("div",{staticClass:"v-draggable-resizable v-resizable",class:this.classes,style:this.styles,on:e},[!this.disabled&&this.genPoints(),t("div",{staticClass:"v-resizable__wrapper"},[this.$scopedSlots.default&&this.$scopedSlots.default({style:this.resizableDefaultSlotStyles,value:this.internalValue,active:null!==this.originalValue})])])}})},211:function(t,e,i){"use strict";i(173),i(84),i(101),i(121),i(48),i(23),i(30),i(21),i(267);var n=i(31),r=i(25),s=(i(111),i(112),i(113),i(81),i(51)),a=(i(270),i(45),i(0)),o=i.n(a),l=o.a.extend({name:"positionable",props:{absolute:Boolean,fixed:Boolean,top:[Number,String],left:[Number,String],right:[Number,String],bottom:[Number,String]},computed:{positionableStyles:function(){var t={},e=Object(r.a)(this.top),i=Object(r.a)(this.left),n=Object(r.a)(this.right),s=Object(r.a)(this.bottom);return e&&(t.top=e),i&&(t.left=i),n&&(t.right=n),s&&(t.bottom=s),t},positionableClasses:function(){return{"v-position--absolute":this.absolute,"v-position--fixed":this.fixed}}}}),h=i(174),c=o.a.extend({name:"transitionable",props:{appear:Boolean,css:{type:Boolean,default:!0},transition:{type:[String,Boolean],default:!1},type:String,mode:String,duration:[Number,Object],enterClass:String,leaveClass:String,appearClass:String,enterToClass:String,leaveToClass:String,appearToClass:String,enterActiveClass:String,leaveActiveClass:String,appearActiveClass:String},methods:{genTransition:function(t){if(this.transition){var e={name:this.transition,appear:this.appear,css:this.css,type:this.type,mode:this.mode,duration:this.duration};this.enterClass&&(e.enterClass=this.enterClass),this.leaveClass&&(e.leaveClass=this.leaveClass),this.appearClass&&(e.appearClass=this.appearClass),this.enterToClass&&(e.enterToClass=this.enterToClass),this.leaveToClass&&(e.leaveToClass=this.leaveToClass),this.appearToClass&&(e.appearToClass=this.appearToClass),this.enterActiveClass&&(e.enterActiveClass=this.enterActiveClass),this.leaveActiveClass&&(e.leaveActiveClass=this.leaveActiveClass),this.appearActiveClass&&(e.appearActiveClass=this.appearActiveClass),t=this.$createElement("transition",{props:e},[t])}return t}}}),u=o.a.extend({name:"size-bootable",methods:{sizeBoot:function(){var t=this;this.$nextTick((function(){t.$emit("size-booted",{width:t.$el.offsetWidth,height:t.$el.offsetHeight})}))}}}),d=o.a.extend({name:"position-bootable",methods:{positionBoot:function(){var t=this;this.$nextTick((function(){t.$emit("position-booted",{top:t.$el.offsetTop,left:t.$el.offsetLeft})}))}}});function p(t,e){return function(){return console.warn("The ".concat(t," component must be used inside a ").concat(e))}}function f(t,e,i){var n=e&&i?{register:p(e,i),unregister:p(e,i)}:null;return o.a.extend({name:"registrable-inject",inject:Object(s.a)({},t,{default:n})})}function g(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function v(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?g(Object(i),!0).forEach((function(e){Object(s.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):g(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var m=Object(n.a)(l,h.a,c,u,d,f("canvas")).extend({inheritAttrs:!1,name:"v-canvas-element",props:{tag:{required:!0},index:Number},created:function(){this.canvas&&this.canvas.register(this)},beforeDestroy:function(){this.canvas&&this.canvas.unregister(this)},mounted:function(){this.height&&this.width||this.sizeBoot(),this.top&&this.left||this.positionBoot()},computed:{classes:function(){return v({"v-canvas-element":!0},this.positionableClasses)},styles:function(){return v({},this.animationableStyles,{},this.measurableStyles,{},this.positionableStyles)},refPoints:function(){return{vt:Number(this.top),vm:Number(this.top)+Number(this.height)/2,vb:Number(this.top)+Number(this.height),hl:Number(this.left),hm:Number(this.left)+Number(this.width)/2,hr:Number(this.left)+Number(this.width)}}},render:function(t){return this.genTransition(t(this.tag,{attrs:this.$attrs,class:this.classes,style:this.styles,on:this.$listeners},this.$slots.default))}}),b=i(184).a,O=Object(n.a)(b,f("canvas")).extend({name:"v-canvas-element-controller",methods:{handleAdsorption:function(t){return this.canvas.adsorptionLines.length&&this.canvas.adsorptionLines.forEach((function(e){switch(e.direction){case"hl":t.left=e.left;break;case"hm":t.left=e.left-t.width/2;break;case"hr":t.left=e.left-t.width;break;case"vt":t.top=e.top;break;case"vm":t.top=e.top-t.height/2;break;case"vb":t.top=e.top-t.height}})),t},emitMoveEvent:function(t){this.point?this.$emit("resizing",t):this.$emit("dragging",t)},onMove:function(t){if(this.originalValue){var e=this.handleMove(t);this.emitMoveEvent(e),e=this.handleAdsorption(e),e=this.snapToGrid(e),e=this.handleEdge(e),this.internalValue=e,t.preventDefault(),t.stopPropagation()}}},render:function(t){var e=b.options.render.call(this,t);return e.data.staticClass+=" v-canvas__element-controller",e}});i(175),i(176),i(126),i(82),i(85),i(86),i(268),i(122);function y(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function j(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?y(Object(i),!0).forEach((function(e){Object(s.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):y(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}
/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */function S(){for(var t,e,i={},n=arguments.length;n--;)for(var r=0,s=Object.keys(arguments[n]);r<s.length;r++)switch(t=s[r]){case"class":case"style":case"directives":Array.isArray(i[t])||(i[t]=[]),i[t]=i[t].concat(arguments[n][t]);break;case"staticClass":if(!arguments[n][t])break;void 0===i[t]&&(i[t]=""),i[t]&&(i[t]+=" "),i[t]+=arguments[n][t].trim();break;case"on":case"nativeOn":i[t]||(i[t]={});for(var a=i[t],o=0,l=Object.keys(arguments[n][t]||{});o<l.length;o++)a[e=l[o]]?a[e]=[].concat(a[e],arguments[n][t][e]):a[e]=arguments[n][t][e];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":i[t]||(i[t]={}),i[t]=j({},arguments[n][t],{},i[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:i[t]||(i[t]=arguments[n][t])}return i}var x={name:"v-sketch-adsorption-line",functional:!0,props:{tag:{type:String,default:"hr"},absolute:{type:Boolean,default:!0},fixed:Boolean,top:[Number,String],left:[Number,String],length:[Number,String],vertical:Boolean,color:{type:String,default:"#FF00CC"}},render:function(t,e){var i=e.props,n=e.data,s=e.children,a={borderColor:i.color},o=Object(r.a)(i.top),l=Object(r.a)(i.left),h=Object(r.a)(i.length);o&&(a.top=o),l&&(a.left=l),h&&(a[i.vertical?"height":"width"]=h);var c={"v-sketch-adsorption-line":!0,"v-sketch-adsorption-line--absolute":i.absolute,"v-sketch-adsorption-line--fixed":i.fixed,"v-sketch-adsorption-line--vertical":i.vertical};return t(i.tag,S(n,{class:c,style:a}),s)}},w=(i(269),{name:"v-sketch-distance-line",functional:!0,props:{tag:{type:String,default:"hr"},absolute:{type:Boolean,default:!0},fixed:Boolean,top:[Number,String],left:[Number,String],length:[Number,String],vertical:Boolean,color:{type:String,default:"#0084ff"}},render:function(t,e){var i=e.props,n=e.data;if(i.length<=0)return null;var s={borderColor:i.color},a=Object(r.a)(i.top),o=Object(r.a)(i.left),l=Object(r.a)(i.length);a&&(s.top=a),o&&(s.left=o),l&&(s[i.vertical?"height":"width"]=l);var h={"v-sketch-distance-line":!0,"v-sketch-distance-line--absolute":i.absolute,"v-sketch-distance-line--fixed":i.fixed,"v-sketch-distance-line--vertical":i.vertical};return t(i.tag,S(n,{class:h,style:s}),[t("div",{staticClass:"v-sketch-distance-line--chip"},[t("div",{staticClass:"v-sketch-distance-line--chip__content",style:{backgroundColor:i.color}},[i.length])])])}});function E(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function k(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?E(Object(i),!0).forEach((function(e){Object(s.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):E(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var C=["vt","vm","vb","hl","hm","hr"],V=Object(n.a)(function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return o.a.extend({name:"registrable-provide",methods:e?{}:{register:null,unregister:null},provide:function(){return Object(s.a)({},t,e?this:{register:this.register,unregister:this.unregister})}})}("sketch")).extend({name:"v-sketch",provide:function(){return{sketch:this}},props:{selectedIndex:{type:Number,default:null},sketchThreshold:{type:Number,default:5},adsorptionLineDirections:{type:Array,default:function(){return C},validator:function(t){return new Set(t.filter((function(t){return new Set(C).has(t)}))).size===t.length}}},watch:{selectedIndex:function(t){this.lazySelectedIndex=t}},data:function(){return{items:[],lazySelectedIndex:this.selectedIndex,adsorptionLines:[],distanceLines:[],spacingBlocks:[]}},computed:{internalSelectedIndex:{get:function(){return this.lazySelectedIndex},set:function(t){this.lazySelectedIndex=t,this.$emit("update:selected-index",t)}},adsorptionLinesAllDirections:function(){return[this.adsorptionLineDirections.filter((function(t){return t.indexOf("h")>-1})),this.adsorptionLineDirections.filter((function(t){return-1===t.indexOf("h")}))]}},methods:{register:function(t){this.items.push(t)},unregister:function(t){var e=this.items.find((function(e){return e._uid===t._uid}));e&&(this.items=this.items.filter((function(t){return t._uid!==e._uid})))},getAdsorptionPointsByValue:function(t){var e={vt:function(){return t.top},vm:function(){return t.top+t.height/2},vb:function(){return t.top+t.height},hl:function(){return t.left},hm:function(){return t.left+t.width/2},hr:function(){return t.left+t.width}};return this.adsorptionLineDirections.reduce((function(t,i){return t[i]=e[i](),t}),{})},clearRefData:function(){this.adsorptionLines=[],this.distanceLines=[]},calculateRefData:function(t){for(var e=this,i=this.sketchThreshold+1,n=this.getAdsorptionPointsByValue(t),r=this.items.filter((function(t){return t.index!==e.internalSelectedIndex})).reduce((function(r,s){var a=Math.min(t.top,s.top),o=Math.min(t.left,s.left),l=Math.max(t.left+t.width,s.left+s.width),h=Math.max(t.top+t.height,s.top+s.height);return e.adsorptionLinesAllDirections.forEach((function(t,e){t.forEach((function(c){var u=s.refPoints[c];t.forEach((function(t){var d=Math.abs(n[t]-u);if(d<i){var p={offsetAmount:d,direction:t,compareDirection:c};p=0===e?Object.assign(p,{left:u,top:a,length:h-a,vertical:!0,compareHeight:s.height}):Object.assign(p,{left:o,top:u,length:l-o,compareWidth:s.width}),r.push(p)}}))}))})),r}),[]).sort((function(t,e){return Math.abs(e.offsetAmount-t.offsetAmount)})),s=[],a=r.length;a--&&(s[0]&&s[0].vertical===r[a].vertical||s.push(r[a]),!(s.length>=2)););this.adsorptionLines=s,this.distanceLines=s.map((function(e){return e.vertical?k({},e,{top:e.top+(t.top===e.top?t.height:e.compareHeight),length:e.length-t.height-e.compareHeight}):k({},e,{left:e.left+(t.left===e.left?t.width:e.compareWidth),length:e.length-t.width-e.compareWidth})}))},genAdsorptionLines:function(){var t=this;return this.adsorptionLines.map((function(e){return t.$createElement(x,{props:e})}))},genDistanceLines:function(){var t=this;return this.distanceLines.map((function(e){return t.$createElement(w,{props:e})}))}}}),z=i(110);var A={inserted:function(t,e){var i=e.value,n=e.options||{passive:!0};window.addEventListener("resize",i,n),t._onResize={callback:i,options:n},e.modifiers&&e.modifiers.quiet||i()},unbind:function(t){if(t._onResize){var e=t._onResize,i=e.callback,n=e.options;window.removeEventListener("resize",i,n),delete t._onResize}}},N=Object(n.a)(z.a,h.a,V);e.a=N.extend({inheritAttrs:!1,name:"v-canvas",provide:function(){return{canvas:this}},directives:{resize:A},props:{value:{type:Array,default:function(){return[]}},editable:Boolean,appear:{type:Boolean,default:!0},absolute:{type:Boolean,default:!0},referenceWidth:Number,referenceHeight:Number,background:String,hideElements:Boolean},data:function(){return{hoverIndex:null,resizeWrapper:{offsetWidth:null,offsetHeight:null},xFields:["left","right","width","maxWidth","minWidth"],yFields:["top","bottom","height","maxHeight","minHeight"]}},computed:{selected:function(){return this.internalValue[this.internalSelectedIndex]},hovered:function(){return this.internalValue[this.hoverIndex]}},methods:{convertToAspectRatio:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null!==e&&t&&Object(r.b)(t)&&(e&&this.resizeWrapper.offsetWidth&&this.referenceWidth&&(t*=this.resizeWrapper.offsetWidth/this.referenceWidth),!e&&this.resizeWrapper.offsetHeight&&this.referenceHeight&&(t*=this.resizeWrapper.offsetHeight/this.referenceHeight)),t},genBackground:function(){return this.$createElement("div",{staticClass:"v-canvas__background",style:{backgroundImage:"url(".concat(this.background,")")}})},genElement:function(t,e){var i=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=["class","style","directives","staticClass","on","nativeOn","attrs","props","domProps","scopedSlots","staticStyle","hook","transition","slot","key","ref","show","keepAlive"],s=["tag","children"],a={attrs:{},props:{tag:t.tag,index:e,appear:this.appear,absolute:this.absolute}};Object.keys(t).forEach((function(e){r.includes(e)?a[e]=t[e]:s.includes(e)||(a.attrs[e]=t[e])})),this.xFields.forEach((function(t){void 0!==a.attrs[t]&&(a.attrs[t]=i.convertToAspectRatio(a.attrs[t],!0))})),this.yFields.forEach((function(t){void 0!==a.attrs[t]&&(a.attrs[t]=i.convertToAspectRatio(a.attrs[t],!1))}));var o=t.children;return Array.isArray(o)&&(o=o.map((function(t,e){return i.genElement(t,e,!0)}))),this.editable&&!n&&(a.on=a.on||{},a.on["size-booted"]=function(t){return Object.keys(t).forEach((function(n){i.$set(i.internalValue[e],n,t[n])}))},a.on["position-booted"]=function(t){return Object.keys(t).forEach((function(n){i.$set(i.internalValue[e],n,t[n])}))},a.on.click=function(t){i.internalSelectedIndex=e,t.preventDefault(),t.stopPropagation()},a.on.mouseenter=function(){return i.hoverIndex=e},a.on.mouseleave=function(){return i.hoverIndex=null}),this.$createElement(m,a,o)},genElements:function(){var t=this;return this.value.map((function(e,i){return t.genElement(e,i,!1)}))},genHover:function(){return this.$createElement("div",{staticClass:"v-canvas__hovered",style:{top:Object(r.a)(this.hovered.top||0),left:Object(r.a)(this.hovered.left||0),width:Object(r.a)(this.hovered.width||0),height:Object(r.a)(this.hovered.height||0)}})},updateSelected:function(t,e){this.$set(this.internalValue[this.internalSelectedIndex],t,e)},genElementController:function(){var t=this;return this.$createElement(O,{props:{value:{top:this.selected.top||0,left:this.selected.left||0,width:this.selected.width||10,height:this.selected.height||10},minWidth:30,minHeight:30},on:{click:function(t){t.preventDefault(),t.stopPropagation()},dragging:this.calculateRefData,dragstop:this.clearRefData,change:function(e){return Object.keys(e).forEach((function(i){return t.updateSelected(i,e[i])}))}}})}},render:function(t){var e=this;return t("div",{staticClass:"v-canvas",style:this.measurableStyles,directives:[{name:"resize",value:function(){e.resizeWrapper.offsetWidth=e.$el.offsetWidth,e.resizeWrapper.offsetHeight=e.$el.offsetHeight}}]},[this.background&&this.genBackground(),t("div",{staticClass:"v-canvas__wrapper"},[!this.hideElements&&this.value&&this.genElements(),this.$slots.default]),null!==this.internalSelectedIndex&&this.genElementController(),null!==this.hoverIndex&&this.internalSelectedIndex!==this.hoverIndex&&this.genHover(),this.genAdsorptionLines(),this.genDistanceLines()])}})},25:function(t,e,i){"use strict";i.d(e,"a",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"b",(function(){return s}));i(23),i(48),i(21);function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px";return null==t||""===t?void 0:isNaN(+t)?String(t):"".concat(Number(t)).concat(e)}function r(t){return Object.keys(t)}function s(t){return"number"==typeof t&&!isNaN(t)}},267:function(t,e,i){},268:function(t,e,i){},269:function(t,e,i){},270:function(t,e,i){},31:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var n=i(0),r=i.n(n);function s(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return r.a.extend({mixins:e})}},76:function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"a",(function(){return s}));i(23),i(30);var n=i(25);function r(t,e){"function"==typeof t&&(t={start:t,move:t,end:t});var i={state:"dragend",dragstartX:0,dragstartY:0,dragendX:0,dragendY:0,dragX:0,dragY:0,dragOffsetX:0,dragOffsetY:0,start:t.start,move:t.move,end:t.end};return{mousedown:function(t){!function(t,e){e.state="dragstart",e.dragstartX=t.clientX,e.dragstartY=t.clientY,e.start&&e.start(Object.assign(t,e))}(t,i);var n=function(t){return function(t,e){if("dragend"===e.state)return;e.state="dragging",e.dragX=t.clientX,e.dragY=t.clientY,e.dragOffsetX=e.dragX-e.dragstartX,e.dragOffsetY=e.dragY-e.dragstartY,e.move&&e.move(Object.assign(t,e))}(t,i)};e=e||!1;window.addEventListener("mousemove",n,e),window.addEventListener("mouseup",(function t(r){window.removeEventListener("mousemove",n,e),window.removeEventListener("mouseup",t,e),function(t,e){e.state="dragend",e.dragendX=t.clientX,e.dragendY=t.clientY,e.dragOffsetX=e.dragendX-e.dragstartX,e.dragOffsetY=e.dragendY-e.dragstartY,e.end&&e.end(Object.assign(t,e))}(r,i)}),e)}}}var s={inserted:function(t,e,i){var s=e.value||{},a=e.options||!1,o=s.parent?t.parentElement:t;if(o){var l=r(s,a);o._dragHandlers=Object(o._dragHandlers),o._dragHandlers[i.context._uid]=l,Object(n.c)(l).forEach((function(t){o.addEventListener(t,l[t],a)})),s.inserted&&s.inserted(t,e,i)}},unbind:function(t,e,i){var r=e.value||{},s=r.parent?t.parentElement:t;if(s&&s._dragHandlers){var a=s._dragHandlers[i.context._uid];delete s._dragHandlers[i.context._uid],Object(n.c)(a).forEach((function(t){s.removeEventListener(t,a[t])})),r.unbind&&r.unbind(t,e,i)}}}},87:function(t,e,i){"use strict";i(101),i(45);var n=i(52),r=(i(21),i(121),i(134),i(31)),s=i(25),a=i(76),o=i(110),l=Object(r.a)(o.a);e.a=l.extend({name:"v-draggable",props:{value:{type:Object,default:function(){return{top:0,left:0}}},absolute:{type:Boolean,default:!0},fixed:Boolean,cursor:{type:[Boolean,String],default:"move"},disabled:Boolean,axis:{type:String,default:"both",validator:function(t){return["x","y","both"].includes(t)}},grid:[String,Number,Array],parent:{type:[Boolean,String],default:!1}},data:function(){return{originalValue:null,parentWidth:null,parentHeight:null}},mounted:function(){var t=this.getParentSize(),e=Object(n.a)(t,2);this.parentWidth=e[0],this.parentHeight=e[1]},computed:{styles:function(){var t={},e=Object(s.a)(this.internalValue.left),i=Object(s.a)(this.internalValue.top);return this.absolute&&(t.position="absolute"),this.fixed&&(t.position="fixed"),!this.disabled&&this.cursor&&(t.cursor=this.cursor),e&&(t.left=e),i&&(t.top=i),t},computedGrid:function(){return"string"==typeof this.grid?[Number(this.grid),Number(this.grid)]:"number"==typeof this.grid?[this.grid,this.grid]:this.grid}},methods:{getParentSize:function(){if(!this.parent)return[null,null];var t="string"==typeof this.parent?this.parent:this.$el.parentNode,e=window.getComputedStyle(t,null);return[parseInt(e.getPropertyValue("width"),10),parseInt(e.getPropertyValue("height"),10)]},handleEdge:function(t){return this.parentHeight&&(t.top=Math.max(t.top,0),t.top=Math.min(t.top,this.parentHeight-this.$el.offsetHeight)),this.parentWidth&&(t.left=Math.max(t.left,0),t.left=Math.min(t.left,this.parentWidth-this.$el.offsetWidth)),t},snapToGrid:function(t){if(!this.computedGrid)return t;var e=Object(n.a)(this.computedGrid,2),i=e[0],r=e[1];return i&&(t.left=Math.round(t.left/i)*i),r&&(t.top=Math.round(t.top/r)*r),t},handleMove:function(t){return{left:"y"===this.axis?this.originalValue.left:this.originalValue.left+t.dragOffsetX,top:"x"===this.axis?this.originalValue.top:this.originalValue.top+t.dragOffsetY}},emitMoveEvent:function(){this.$emit("dragging",this.internalValue)},emitEndEvent:function(){this.$emit("dragstop",this.internalValue)},onStart:function(t){this.originalValue=Object.assign({},this.internalValue),t.preventDefault(),t.stopPropagation()},onMove:function(t){if(this.originalValue){var e=this.handleMove(t);e=this.snapToGrid(e),e=this.handleEdge(e),this.internalValue=e,this.emitMoveEvent&&this.emitMoveEvent(),t.preventDefault(),t.stopPropagation()}},onEnd:function(t){this.originalValue=null,this.emitEndEvent&&this.emitEndEvent(),t.preventDefault(),t.stopPropagation()},genListeners:function(){return Object(a.b)({start:this.onStart,move:this.onMove,end:this.onEnd})}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({value:this.internalValue,style:this.styles,active:null!==this.originalValue})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(this.disabled||(t.data=t.data||{},t.data.on=t.data.on||{},this._g(t.data,this.genListeners())),t):t):null;var t}})},96:function(t,e,i){"use strict";var n=i(87);e.a=n.a}}]);