"use strict";(globalThis["webpackChunkcanvas_lms"]=globalThis["webpackChunkcanvas_lms"]||[]).push([[74250],{54653:(e,r,a)=>{a.r(r)
var n=a(93264)
var i=a(75869)
var s=a.n(i)
s()((()=>{const{name:e,version:r}=(0,n.q)()
"Safari"===e&&parseFloat(r)>=13&&"serviceWorker"in navigator&&navigator.serviceWorker.register("/inst-fs-sw.js").then((()=>{console.log("Registration succeeded. Refresh page to proxy Inst-FS requests through ServiceWorker.")})).catch((function(e){console.log("Inst-FS ServiceWorker registration failed. :(",e)}))}))},93264:(e,r,a)=>{a.d(r,{q:()=>n})
function n(){const e=navigator.userAgent
let r
let a=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[]
if(/trident/i.test(a[1])){r=/\brv[ :]+(\d+)/g.exec(e)||[]
return{name:"IE",version:r[1]||""}}if("Chrome"===a[1]){r=e.match(/\bOPR|Edge\/(\d+)/)
if(null!=r)return{name:"Opera",version:r[1]}}a=a[2]?[a[1],a[2]]:[navigator.appName,navigator.appVersion,"-?"]
null!=(r=e.match(/version\/(\d+)/i))&&a.splice(1,1,r[1])
return{name:a[0],version:a[1]}}}}])

//# sourceMappingURL=inst_fs_service_worker-c-b523682f21.js.map
