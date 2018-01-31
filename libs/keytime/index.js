!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.keytime=t()}}(function(){return function t(n,e,r){function o(u,s){if(!e[u]){if(!n[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var c=e[u]={exports:{}};n[u][0].call(c.exports,function(t){var e=n[u][1][t];return o(e?e:t)},c,c.exports,t,n,e,r)}return e[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(t,n,e){function r(t,n){for(var e=0;e<t.length;e++)if(t[e].name===n)return e;return-1}function o(t){return this instanceof o?(this.properties=[],void(t&&this.load(t))):new o(t)}var i=t("lerp-array"),u=t("./property");o.prototype.dispose=function(){this.properties.forEach(function(t){t.dispose()}),this.properties.length=0},o.prototype.addProperty=function(t){this.properties.push(new u(t))},o.prototype.duration=function(){for(var t=0,n=0;n<this.properties.length;n++)for(var e=this.properties[n],r=e.keyframes.frames,o=0;o<r.length;o++)t=Math.max(r[o].time,t);return t},o.prototype.property=function(t){var n="number"==typeof t?t:r(this.properties,t);return n<0?void 0:this.properties[n]},o.prototype.load=function(t){this.dispose(),t&&(this.properties=t.map(function(t){return new u(t)}))},o.prototype.export=function(){return this.properties.map(function(t){return t.export()})},o.prototype.ease=function(t,n){return n},

o.prototype.regexMultirangeParam=/([a-zA-Z]+)\(([0-9]{1,3})\)/g,

o.prototype.interpolate=function(t,n,e,r) {

  // @TODO: I guess this is not good for performance, because this is executed over and over?
  let value1 = this.regexMultirangeParam.exec(n.value)

  if (value1 === null) {
    // Custom interpolation for Strings
    if (typeof n.value === 'string') {
      return n.value
    }
  } else {
    // Reset the regex
    this.regexMultirangeParam.lastIndex = 0

    // Get the value for the second parameter
    let value2 = this.regexMultirangeParam.exec(e.value)

    // Reset the regex
    this.regexMultirangeParam.lastIndex = 0

    // Recreate the MultiRangeParam, for example 'clockwise(20)'
    return `${value1[1]}(${Math.round(i(parseInt(value1[2], 10), parseInt(value2[2], 10), r))})`
  }

  return i(n.value,e.value,r)
},

o.prototype.valueOf=function(t,n){var e=n.keyframes,r=e.interpolation(t),o=r[0],i=r[1],u=r[2];if(o===-1||i===-1)return n.value;var s=e.frames[o],a=e.frames[i];if(o===i)return s.value;var f=a.ease;return f&&(u=this.ease(f,u)),this.interpolate(n,s,a,u)},o.prototype.values=function(t,n){n||(n={});for(var e=0;e<this.properties.length;e++){var r=this.properties[e];n[r.name]=this.valueOf(t,r)}return n},n.exports=o},{"./property":42,"lerp-array":39}],2:[function(t,n,e){function r(t){return this instanceof r?void u.call(this,t):new r(t)}var o=t("eases"),i=t("inherits"),u=t("./base");i(r,u),r.prototype.ease=function(t,n){return o[t](n)},n.exports=r},{"./base":1,eases:21,inherits:35}],3:[function(t,n,e){function r(t){var n=2.5949095;return(t*=2)<1?.5*(t*t*((n+1)*t-n)):.5*((t-=2)*t*((n+1)*t+n)+2)}n.exports=r},{}],4:[function(t,n,e){function r(t){var n=1.70158;return t*t*((n+1)*t-n)}n.exports=r},{}],5:[function(t,n,e){function r(t){var n=1.70158;return--t*t*((n+1)*t+n)+1}n.exports=r},{}],6:[function(t,n,e){function r(t){return t<.5?.5*(1-o(1-2*t)):.5*o(2*t-1)+.5}var o=t("./bounce-out");n.exports=r},{"./bounce-out":8}],7:[function(t,n,e){function r(t){return 1-o(1-t)}var o=t("./bounce-out");n.exports=r},{"./bounce-out":8}],8:[function(t,n,e){function r(t){var n=4/11,e=8/11,r=.9,o=4356/361,i=35442/1805,u=16061/1805,s=t*t;return t<n?7.5625*s:t<e?9.075*s-9.9*t+3.4:t<r?o*s-i*t+u:10.8*t*t-20.52*t+10.72}n.exports=r},{}],9:[function(t,n,e){function r(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}n.exports=r},{}],10:[function(t,n,e){function r(t){return 1-Math.sqrt(1-t*t)}n.exports=r},{}],11:[function(t,n,e){function r(t){return Math.sqrt(1- --t*t)}n.exports=r},{}],12:[function(t,n,e){function r(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}n.exports=r},{}],13:[function(t,n,e){function r(t){return t*t*t}n.exports=r},{}],14:[function(t,n,e){function r(t){var n=t-1;return n*n*n+1}n.exports=r},{}],15:[function(t,n,e){function r(t){return t<.5?.5*Math.sin(13*Math.PI/2*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*Math.PI/2*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}n.exports=r},{}],16:[function(t,n,e){function r(t){return Math.sin(13*t*Math.PI/2)*Math.pow(2,10*(t-1))}n.exports=r},{}],17:[function(t,n,e){function r(t){return Math.sin(-13*(t+1)*Math.PI/2)*Math.pow(2,-10*t)+1}n.exports=r},{}],18:[function(t,n,e){function r(t){return 0===t||1===t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1}n.exports=r},{}],19:[function(t,n,e){function r(t){return 0===t?t:Math.pow(2,10*(t-1))}n.exports=r},{}],20:[function(t,n,e){function r(t){return 1===t?t:1-Math.pow(2,-10*t)}n.exports=r},{}],21:[function(t,n,e){n.exports={backInOut:t("./back-in-out"),backIn:t("./back-in"),backOut:t("./back-out"),bounceInOut:t("./bounce-in-out"),bounceIn:t("./bounce-in"),bounceOut:t("./bounce-out"),circInOut:t("./circ-in-out"),circIn:t("./circ-in"),circOut:t("./circ-out"),cubicInOut:t("./cubic-in-out"),cubicIn:t("./cubic-in"),cubicOut:t("./cubic-out"),elasticInOut:t("./elastic-in-out"),elasticIn:t("./elastic-in"),elasticOut:t("./elastic-out"),expoInOut:t("./expo-in-out"),expoIn:t("./expo-in"),expoOut:t("./expo-out"),linear:t("./linear"),quadInOut:t("./quad-in-out"),quadIn:t("./quad-in"),quadOut:t("./quad-out"),quartInOut:t("./quart-in-out"),quartIn:t("./quart-in"),quartOut:t("./quart-out"),quintInOut:t("./quint-in-out"),quintIn:t("./quint-in"),quintOut:t("./quint-out"),sineInOut:t("./sine-in-out"),sineIn:t("./sine-in"),sineOut:t("./sine-out")}},{"./back-in":4,"./back-in-out":3,"./back-out":5,"./bounce-in":7,"./bounce-in-out":6,"./bounce-out":8,"./circ-in":10,"./circ-in-out":9,"./circ-out":11,"./cubic-in":13,"./cubic-in-out":12,"./cubic-out":14,"./elastic-in":16,"./elastic-in-out":15,"./elastic-out":17,"./expo-in":19,"./expo-in-out":18,"./expo-out":20,"./linear":22,"./quad-in":24,"./quad-in-out":23,"./quad-out":25,"./quart-in":27,"./quart-in-out":26,"./quart-out":28,"./quint-in":30,"./quint-in-out":29,"./quint-out":31,"./sine-in":33,"./sine-in-out":32,"./sine-out":34}],22:[function(t,n,e){function r(t){return t}n.exports=r},{}],23:[function(t,n,e){function r(t){return t/=.5,t<1?.5*t*t:(t--,-.5*(t*(t-2)-1))}n.exports=r},{}],24:[function(t,n,e){function r(t){return t*t}n.exports=r},{}],25:[function(t,n,e){function r(t){return-t*(t-2)}n.exports=r},{}],26:[function(t,n,e){function r(t){return t<.5?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}n.exports=r},{}],27:[function(t,n,e){function r(t){return Math.pow(t,4)}n.exports=r},{}],28:[function(t,n,e){function r(t){return Math.pow(t-1,3)*(1-t)+1}n.exports=r},{}],29:[function(t,n,e){function r(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}n.exports=r},{}],30:[function(t,n,e){function r(t){return t*t*t*t*t}n.exports=r},{}],31:[function(t,n,e){function r(t){return--t*t*t*t*t+1}n.exports=r},{}],32:[function(t,n,e){function r(t){return-.5*(Math.cos(Math.PI*t)-1)}n.exports=r},{}],33:[function(t,n,e){function r(t){var n=Math.cos(t*Math.PI*.5);return Math.abs(n)<1e-14?1:1-n}n.exports=r},{}],34:[function(t,n,e){function r(t){return Math.sin(t*Math.PI/2)}n.exports=r},{}],35:[function(t,n,e){"function"==typeof Object.create?n.exports=function(t,n){t.super_=n,t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:n.exports=function(t,n){t.super_=n;var e=function(){};e.prototype=n.prototype,t.prototype=new e,t.prototype.constructor=t}},{}],36:[function(t,n,e){function r(t,n){return t.time-n.time}function o(t,n){return this instanceof o?(this.frames=t||[],void(n||this.sort())):new o(t,n)}var i=t("lerp-array"),u=t("unlerp"),s=t("gl-vec3/set"),a=[0,0,0];o.prototype.nearestIndex=function(t,n){n="number"==typeof n?n:Number.MAX_VALUE;for(var e=Number.MAX_VALUE,r=-1,o=0;o<this.frames.length;o++){var i=Math.abs(this.frames[o].time-t);i<e&&i<=n&&(e=i,r=o)}return r},o.prototype.nearest=function(t,n){var e=this.nearestIndex(t,n);return e===-1?null:this.frames[e]},o.prototype.get=function(t){return this.nearest(t,0)},o.prototype.getIndex=function(t){return this.nearestIndex(t,0)},o.prototype.value=function(t,n,e){var r=this.interpolation(t);if(r[0]===-1||r[1]===-1)return null;var o=this.frames[r[0]],u=this.frames[r[1]],s=r[2];return"function"==typeof n?n(o,u,s,e):i(o.value,u.value,s,e)},o.prototype.interpolation=function(t){if(0===this.frames.length)return s(a,-1,-1,0);for(var n=-1,e=this.frames.length-1;e>=0;e--)if(t>=this.frames[e].time){n=e;break}if(n===-1||n===this.frames.length-1)return n<0&&(n=0),s(a,n,n,0);var r=this.frames[n],o=this.frames[n+1];t=Math.max(r.time,Math.min(t,o.time));var i=u(r.time,o.time,t);return s(a,n,n+1,i)},o.prototype.next=function(t){if(this.frames.length<1)return null;for(var n=-1,e=0;e<this.frames.length;e++)if(t<this.frames[e].time){n=e;break}return n===-1?null:this.frames[n]},o.prototype.previous=function(t){if(this.frames.length<1)return null;for(var n=-1,e=this.frames.length-1;e>=0;e--)if(t>this.frames[e].time){n=e;break}return n===-1?null:this.frames[n]},o.prototype.add=function(t){this.frames.push(t),this.sort()},o.prototype.splice=function(t,n,e){this.frames.splice.apply(this.frames,arguments),arguments.length>2&&this.sort()},o.prototype.sort=function(){this.frames.sort(r)},o.prototype.clear=function(){this.frames.length=0},Object.defineProperty(o.prototype,"count",{get:function(){return this.frames.length}}),n.exports=o},{"gl-vec3/set":37,"lerp-array":39,unlerp:38}],37:[function(t,n,e){function r(t,n,e,r){return t[0]=n,t[1]=e,t[2]=r,t}n.exports=r},{}],38:[function(t,n,e){n.exports=function(t,n,e){return(e-t)/(n-t)}},{}],39:[function(t,n,e){var r=t("lerp");n.exports=function(t,n,e,o){if("number"==typeof t&&"number"==typeof n)return r(t,n,e);var i=Math.min(t.length,n.length);o=o||new Array(i);for(var u=0;u<i;u++)o[u]=r(t[u],n[u],e);return o}},{lerp:40}],40:[function(t,n,e){function r(t,n,e){return t*(1-e)+n*e}n.exports=r},{}],41:[function(t,n,e){function r(){for(var t={},n=0;n<arguments.length;n++){var e=arguments[n];for(var r in e)o.call(e,r)&&(t[r]=e[r])}return t}n.exports=r;var o=Object.prototype.hasOwnProperty},{}],42:[function(t,n,e){function r(t){return this instanceof r?(this.keyframes=o(),this.value=null,this.name="",void(t&&this.load(t))):new r(t)}var o=t("keyframes"),i=t("xtend");r.prototype.dispose=function(){this.keyframes.clear()},r.prototype.export=function(){return i(this,{keyframes:this.keyframes.frames})},r.prototype.load=function(t){if(this.dispose(),t)for(var n in t)t.hasOwnProperty(n)&&("keyframes"===n?this.keyframes.frames=t.keyframes:this[n]=t[n])},n.exports=r},{keyframes:36,xtend:41}]},{},[2])(2)});
