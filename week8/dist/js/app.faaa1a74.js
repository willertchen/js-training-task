(function(e){function n(n){for(var r,c,u=n[0],i=n[1],d=n[2],f=0,l=[];f<u.length;f++)c=u[f],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&l.push(o[c][0]),o[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);s&&s(n);while(l.length)l.shift()();return a.push.apply(a,d||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,c=1;c<t.length;c++){var u=t[c];0!==o[u]&&(r=!1)}r&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},c={app:0},o={app:0},a=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-02427787":"83534cf1","chunk-2d21e30b":"ce0c71c3","chunk-2d2302fe":"a56d1093","chunk-3e231bdc":"99a5a552","chunk-6c5a29c4":"e94afd55","chunk-78330c75":"3357d521","chunk-8b7bffd2":"0fecb599","chunk-ad34d5f2":"bbae7a50"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-78330c75":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-02427787":"31d6cfe0","chunk-2d21e30b":"31d6cfe0","chunk-2d2302fe":"31d6cfe0","chunk-3e231bdc":"31d6cfe0","chunk-6c5a29c4":"31d6cfe0","chunk-78330c75":"ff416a9d","chunk-8b7bffd2":"31d6cfe0","chunk-ad34d5f2":"31d6cfe0"}[e]+".css",o=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var d=a[u],f=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(f===r||f===o))return n()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){d=l[u],f=d.getAttribute("data-href");if(f===r||f===o)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var r=n&&n.target&&n.target.src||o,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete c[e],s.parentNode.removeChild(s),t(a)},s.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(s)})).then((function(){c[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=a);var d,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var l=new Error;d=function(n){f.onerror=f.onload=null,clearTimeout(s);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",l.name="ChunkLoadError",l.type=r,l.request=c,t[1](l)}o[e]=void 0}};var s=setTimeout((function(){d({type:"timeout",target:f})}),12e4);f.onerror=f.onload=d,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],f=d.push.bind(d);d.push=n,d=d.slice();for(var l=0;l<d.length;l++)n(d[l]);var s=f;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("4160"),t("b64b"),t("159b"),t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),c=t("bc3a"),o=t.n(c),a=t("a7fe"),u=t.n(a),i=t("1157"),d=t.n(i),f=(t("4989"),t("9062")),l=t.n(f),s=(t("e40d"),t("7bb1")),h=t("4c93"),p=t("60d4"),b=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},m=[],v={name:"App",data:function(){return{}}},g=v,k=(t("5c0b"),t("2877")),y=Object(k["a"])(g,b,m,!1,null,null,null),w=y.exports,O=(t("d3b7"),t("8c4f"));r["a"].use(O["a"]);var j=[{path:"/",name:"index",component:function(){return t.e("chunk-2d21e30b").then(t.bind(null,"d504"))},redirect:"/home",children:[{path:"/login",name:"Login",component:function(){return t.e("chunk-78330c75").then(t.bind(null,"aa92"))}},{path:"/products",name:"Products",component:function(){return t.e("chunk-8b7bffd2").then(t.bind(null,"81b1"))}},{path:"/cart",name:"Carts",component:function(){return t.e("chunk-6c5a29c4").then(t.bind(null,"2355"))}},{path:"/home",name:"Home",component:function(){return t.e("chunk-2d2302fe").then(t.bind(null,"eae1"))}}]},{path:"/admin",name:"Admin 頁面",component:function(){return t.e("chunk-02427787").then(t.bind(null,"7277"))},redirect:"admin/products",children:[{path:"products",name:"產品頁面",component:function(){return t.e("chunk-ad34d5f2").then(t.bind(null,"61bc"))},meta:{requiresAuth:!0}},{path:"orders",name:"訂單列表",component:function(){return t.e("chunk-3e231bdc").then(t.bind(null,"efd9"))},meta:{requiresAuth:!0}}]}],P=new O["a"]({routes:j}),E=P;window.$=d.a,r["a"].use(u.a,o.a),r["a"].component("Loading",l.a),r["a"].config.productionTip=!1,Object.keys(h).forEach((function(e){Object(s["d"])(e,h[e])})),Object(s["c"])({classes:{valid:"is-valid",invalid:"is-invalid"}}),Object(s["e"])("tw",p),r["a"].component("ValidationObserver",s["a"]),r["a"].component("ValidationProvider",s["b"]),new r["a"]({router:E,render:function(e){return e(w)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("9c0c"),c=t.n(r);c.a},"9c0c":function(e,n,t){}});
//# sourceMappingURL=app.faaa1a74.js.map