!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CoreLayout=e():t.CoreLayout=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i={origin:0,precision:!1};function a(t){return t!==Object(t)}var u=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!e||!(e instanceof Function||Array.isArray(e)||a(e)))throw new Error("Selector is not valid");var o=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}({},i,n);this.selector=a(e)?[e]:e,this.mode=Array.isArray(this.selector)?"array":"function",this.origin=o.origin,this.precision=o.precision}var e,u,c;return e=t,(u=[{key:"withPrecision",value:function(t){return"string"==typeof t?t:parseFloat(this.precision?t.toFixed(this.precision):t)}},{key:"get",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if("array"===this.mode){var e=this.selector[t+this.origin];return"object"===n(e)&&"value"in e?this.withPrecision(e.value):this.withPrecision(e)}return"function"===this.mode&&this.withPrecision(this.selector(t+this.origin))}}])&&o(e.prototype,u),c&&o(e,c),t}();t.exports=u},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=n(0),i=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),null===e)throw new Error("array of type Token required");if(this.tokens=e instanceof o?[e]:e.slice(0),this.id=t.createID(),!("name"in n))throw new Error("You must pass options with a name");this.name=n.name,this.wrapProperty="wrapProperty"in n?n.wrapProperty:function(t){return t},this.fluid="fluid"in n&&n.fluid,this.unit="unit"in n?n.unit:""}var e,n,i;return e=t,(n=[{key:"getNextValidIndex",value:function(t){for(var e=t+1,n=this.tokens.lastIndexOf(this.tokens.slice(-1)[0]);!(e in this.tokens)&&e<=n;)e+=1;return!(e>n)&&e}},{key:"write",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(t in this.tokens){var r=this.tokens[t];if(this.fluid&&!1!==n&&t!==this.coreLayout.breakpoints.length-1){var o=this.getNextValidIndex(t),i=this.tokens[o],a=this.coreLayout.breakpoints[o]-this.coreLayout.breakpoints[t];return this.wrapProperty("calc(".concat(r.get(e)).concat(this.unit," + ").concat(i.get(e)-r.get(e)," * ((100vw - ").concat(this.coreLayout.breakpoints[t],"px) / ").concat(a,"))"))}return this.wrapProperty("".concat(r.get(e)).concat(this.unit))}return null}}])&&r(e.prototype,n),i&&r(e,i),t}();i.createID=function(){return"_"+Math.random().toString(36).substr(2,9)},t.exports=i},function(t,e,n){var r=n(1),o=n(0),i=n(3);t.exports={CoreLayout:i,Delta:r,Token:o}},function(t,e,n){function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n(0),n(1);var i={breakpoints:[1e3]},a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}({},i,e);Object.assign(this,n),this.deltas=[]}var e,n,a;return e=t,(n=[{key:"set",value:function(t){this.deltas.push(t),t.coreLayout=this}},{key:"get",value:function(t){return this.deltas.filter(function(e){return e.name===t})[0]||!1}},{key:"debug",value:function(){var t=this;console.log("-----------------------------------------"),this.breakpoints.forEach(function(e,n){console.log("B: ".concat(e)),t.deltas.forEach(function(t){n in t.tokens&&console.log("\tTc — ".concat(t.name,": ").concat(t.tokens[n].get()))})}),console.log("-----------------------------------------")}},{key:"write",value:function(t,e){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return Object.keys(e).map(function(o){if(n.deltas.map(function(t){return t.name}).includes(o))return n.deltas.filter(function(t){return t.name===o})[0].write(t,e[o],r)})}}])&&o(e.prototype,n),a&&o(e,a),t}();t.exports=a}])});