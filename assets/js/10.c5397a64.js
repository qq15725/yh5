(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{425:function(t,e,n){"use strict";n(62),n(63),n(64),n(19),n(32),n(16),n(25);var a=n(5),s=n(365),i=(n(60),n(61),n(9),n(3)),r=n(309).a,o=n(358),c=n(54);function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}var u=Object(i.a)(c.a);e.a=u.extend({inheritAttrs:!1,name:"v-swiper",props:{value:Array,options:Object,referenceWidth:{type:Number,default:375},referenceHeight:{type:Number,default:667},loadedSlideIndexes:{type:Array,default:function(){return[0]}},disableSlideReload:Boolean,lazy:Boolean},data:function(){return{touchStartY:0,touchMoveY:0,lazyIndexes:this.loadedSlideIndexes}},watch:{loadedSlideIndexes:function(t){this.lazyIndexes=t}},computed:{internalIndexes:{get:function(){return this.lazyIndexes},set:function(t){this.lazyIndexes=t,this.$emit("update:active-indexes",t)}},swiper:function(){return this.$refs.VSwiper.swiper}},methods:{touchStart:function(t){this.touchStartY=t.clientY},touchMove:function(t){var e;this.touchMoveY=t.clientY,(e=this.touchMoveY-this.touchStartY>0?this.swiper.activeIndex-1:this.swiper.activeIndex+1)>=0&&e<this.value.length&&-1===this.internalIndexes.indexOf(e)&&(this.disableSlideReload?this.internalIndexes.push(e):this.internalIndexes=[this.swiper.activeIndex,e])},slideChangeTransitionEnd:function(){this.disableSlideReload||(this.internalIndexes=[this.swiper.activeIndex])},genContent:function(){var t=this;return this.value.map((function(e,n){var a=e.background,i=e.on,c=e.style,l=e.class,u=Object(s.a)(e,["background","on","style","class"]);return t.$createElement(o.swiperSlide,{staticClass:"v-swiper__slide"},[t.$createElement(r,{class:l,style:c,attrs:u,props:{appear:!0,absolute:!0,referenceWidth:t.referenceWidth,referenceHeight:t.referenceHeight,background:a,lazy:t.lazy,hideElements:!t.lazy&&-1===t.internalIndexes.indexOf(n)},on:i})])}))}},render:function(t){var e=this.options||{};return e.on=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){Object(a.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({touchStart:this.touchStart,touchMove:this.touchMove,slideChangeTransitionEnd:this.slideChangeTransitionEnd},e.on||{}),t(o.swiper,{ref:"VSwiper",staticClass:"v-swiper",style:this.measurableStyles,props:{options:e},on:this.$listeners,scopedSlots:{pagination:this.$scopedSlots.pagination}},[this.genContent(),this.$slots.default])}})},435:function(t,e,n){"use strict";n.r(e);n(350);var a,s=n(351),i=(n(356),n(357),{components:{VSwiper:n(425).a},data:function(){return{panel:{left:0,top:0},data:[{background:"https://picsum.photos/id/1/375/667",value:[]},{value:[]}],selectedPageIndex:0,selectedIndex:null,images:[],showCanvas:!0,animations:["bounce","flash","pulse","rubberBand","shake","headShake","swing","tada","wobble","jello","bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","flipInX","flipInY","flipOutX","flipOutY","lightSpeedIn","lightSpeedOut","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRight","hinge","jackInTheBox","rollIn","rollOut","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp","slideInDown","slideInLeft","slideInRight","slideInUp","slideOutDown","slideOutLeft","slideOutRight","slideOutUp","heartBeat"],aspectRatioList:[1,.75,9/16],options:{direction:"vertical",effect:"coverflow"}}},created:function(){this.images=this.genImages()},watch:{selectedPageIndex:(a=Object(s.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.showCanvas=!1,t.next=3,this.$nextTick();case 3:this.showCanvas=!0;case 4:case"end":return t.stop()}}),t,this)}))),function(){return a.apply(this,arguments)})},computed:{selectedPage:{get:function(){return this.data[this.selectedPageIndex].value||[]},set:function(t){this.$set(this.data[this.selectedPageIndex],"value",t)}},selected:{get:function(){return this.selectedPage[this.selectedIndex]},set:function(t){this.$set(this.selectedPage,this.selectedIndex,t)}}},methods:{genAnimation:function(){return this.animations[~~(Math.random()*this.animations.length)]},genAspectRatio:function(){return this.aspectRatioList[~~(Math.random()*this.aspectRatioList.length)]},genImage:function(){var t=~~(100*Math.random()),e=this.genAspectRatio();return{tag:"img",src:"https://picsum.photos/id/".concat(t,"/").concat(~~(375*e),"/").concat(~~(1/e*375)),lazySrc:"https://picsum.photos/id/".concat(t,"/").concat(~~(6*e),"/").concat(~~(1/e*6)),aspectRatio:e,width:200,height:200}},genImages:function(){for(var t=[],e=40;e--;)t.push(this.genImage());return t}}}),r=n(45),o=Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{flat:"",tile:""}},[n("v-row",{staticClass:"pa-2",attrs:{"no-gutters":""}},[n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"mx-2",attrs:{color:"primary",small:""},on:{click:function(e){return t.data.push({value:[]})}}},[t._v("新增页面")]),t._v(" "),n("v-dialog",{attrs:{width:300,height:539.2},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-btn",t._g({staticClass:"mx-2",attrs:{color:"primary",small:""}},a),[t._v("预览")])]}}])},[t._v(" "),n("v-swiper",{ref:"VSwiper",staticClass:"white",attrs:{options:t.options,value:t.data,width:300,height:539.2,"reference-width":375,"reference-height":674}})],1)],1),t._v(" "),n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"4"}},[n("v-tabs",{attrs:{vertical:"","icons-and-text":"",dark:""}},[n("v-tab",[n("span",[t._v("页面")]),t._v(" "),n("v-icon",{domProps:{textContent:t._s("pages")}})],1),t._v(" "),n("v-tab",[n("span",[t._v("照片")]),t._v(" "),n("v-icon",{domProps:{textContent:t._s("image")}})],1),t._v(" "),n("v-tab-item",[n("div",{staticClass:"overflow-y-auto",staticStyle:{height:"700px"}},t._l(t.data,(function(e,a){return n("v-card",{key:a,staticClass:"ma-3",class:t.selectedPageIndex===a?"elevation-10":"",attrs:{outlined:t.selectedPageIndex!==a,tile:"",ripple:!1},on:{click:function(e){t.selectedPageIndex=a}}},[n("v-responsive",{attrs:{"aspect-ratio":375/674}},[n("v-canvas",{attrs:{value:e.value,background:e.background,absolute:"","reference-width":375,"reference-height":674,appear:""}})],1)],1)})),1)]),t._v(" "),n("v-tab-item",[n("div",{staticClass:"overflow-y-auto px-2",staticStyle:{height:"700px"}},[n("v-row",{attrs:{dense:""}},[n("v-col",[n("v-row",{attrs:{dense:""}},t._l(t.images.filter((function(t,e){return e%2==0})),(function(e,a){return n("v-col",{key:a,attrs:{cols:"12"}},[n("v-card",{attrs:{tile:"",flat:"",outlined:"",ripple:!1},on:{click:function(n){return t.selectedPage.push(Object.assign({},e))}}},["img"===e.tag?n("v-img",{staticClass:"grey lighten-2",attrs:{src:e.src,"lazy-src":e.lazySrc,"aspect-ratio":e.aspectRatio}}):t._e()],1)],1)})),1)],1),t._v(" "),n("v-col",[n("v-row",{attrs:{dense:""}},t._l(t.images.filter((function(t,e){return e%2!=0})),(function(e,a){return n("v-col",{key:a,attrs:{cols:"12"}},[n("v-card",{attrs:{tile:"",flat:"",outlined:"",ripple:!1},on:{click:function(n){return t.selectedPage.push(Object.assign({},e))}}},["img"===e.tag?n("v-img",{staticClass:"grey lighten-2",attrs:{src:e.src,"lazy-src":e.lazySrc,"aspect-ratio":e.aspectRatio}}):t._e()],1)],1)})),1)],1)],1)],1)])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"8"}},[n("v-card",{staticClass:"d-flex justify-center align-center fill-height",attrs:{color:"grey",flat:"",tile:""}},[t.showCanvas?n("v-canvas",{staticClass:"white",attrs:{background:(t.data[t.selectedPageIndex]||{}).background,appear:"",absolute:"",editable:"",width:"375",height:"667"},on:{selected:function(e){return t.selectedIndex=e}},model:{value:t.selectedPage,callback:function(e){t.selectedPage=e},expression:"selectedPage"}}):t._e(),t._v(" "),t.selected?n("v-draggable-resizable",{staticStyle:{"z-index":"100"},attrs:{absolute:"",parent:"",resizable:!1},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.on;return[n("v-card",{staticClass:"fill-height",attrs:{tile:"",flat:"",outlined:""}},[n("v-system-bar",t._g({staticStyle:{cursor:"move"},attrs:{window:"",dark:""}},a),[n("div",{staticClass:"text-truncate"},[t._v(t._s(t.selected.tag))]),t._v(" "),n("v-spacer")],1),t._v(" "),n("v-card-text",[t._v("\n                TODO\n              ")])],1)]}}],null,!1,1235516418),model:{value:t.panel,callback:function(e){t.panel=e},expression:"panel"}}):t._e()],1)],1)],1)],1)}),[],!1,null,null,null);e.default=o.exports}}]);