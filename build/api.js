var e={667:(e,n,r)=>{r.d(n,{Z:()=>s});var t=r(81),a=r.n(t),o=r(645),i=r.n(o)()(a());i.push([e.id,":root {\n  --key: #538cc6;\n  --value: #7a0;\n  --warning: chocolate;\n  --error: crimson;\n}\n.main--nkgWn {\n  display: grid;\n  gap: 7px;\n  font-family: 'Courier New';\n  font-size: 11pt;\n}\n.key--ePMDj {\n  color: var(--key);\n}\n.value--hsvoM {\n  color: var(--value);\n}\n.string--l71lZ {\n  font-style: italic;\n}\n.array--q1hA6,\n.object--snknK {\n  cursor: pointer;\n}\n.array--q1hA6 > .key--ePMDj::before,\n.object--snknK > .key--ePMDj::before {\n  display: inline-block;\n  content: '';\n  width: 0;\n  height: 0;\n  border-style: solid;\n  background-color: transparent;\n  border-width: 4.5px 0 4.5px 7px;\n  border-color: transparent transparent transparent #ccc;\n  margin-left: -17px;\n  margin-right: 7px;\n  transition: transform 0.1s ease-in-out;\n}\n.array--q1hA6 > .value--hsvoM,\n.object--snknK > .value--hsvoM {\n  display: grid;\n  gap: 7px;\n  visibility: hidden;\n  height: 0;\n}\n.array--q1hA6.opened--a6cpo > .key--ePMDj::before,\n.object--snknK.opened--a6cpo > .key--ePMDj::before {\n  transform: rotateZ(0.25turn);\n}\n.array--q1hA6.opened--a6cpo > .value--hsvoM,\n.object--snknK.opened--a6cpo > .value--hsvoM,\n.array--q1hA6.opened--a6cpo > table.arrayElements--DhXwh,\n.object--snknK.opened--a6cpo > table.arrayElements--DhXwh {\n  visibility: visible;\n  height: auto;\n  margin-top: 7px;\n}\n.array--q1hA6.opened--a6cpo table.arrayElements--DhXwh {\n  display: table;\n  visibility: visible;\n}\n.array--q1hA6 table.arrayElements--DhXwh {\n  display: none;\n  visibility: hidden;\n  height: 0;\n  color: #666;\n}\n.array--q1hA6 table.arrayElements--DhXwh thead {\n  color: #fff;\n}\n.array--q1hA6 table.arrayElements--DhXwh thead th {\n  background-color: #777;\n  text-align: center;\n  padding: 5px 10px;\n}\n.array--q1hA6 table.arrayElements--DhXwh td {\n  padding: 7px 10px;\n}\n.array--q1hA6 table.arrayElements--DhXwh tbody tr:nth-child(odd) {\n  background-color: #f6f6f6;\n}\n.array--q1hA6 table.arrayElements--DhXwh tbody tr:nth-child(even) {\n  background-color: #fcfcfc;\n}\n.field--RcmI_ {\n  margin-left: 20px;\n}\n.notifications--AXpji {\n  display: grid;\n  gap: 7px;\n  margin-bottom: 15px;\n}\n.notifications--AXpji .error--dokHT,\n.notifications--AXpji .warning--awULD {\n  padding: 10px 15px;\n  border-radius: 5px;\n  border: 1px solid #000;\n}\n.notifications--AXpji .error--dokHT {\n  border-color: var(--error);\n  color: var(--error);\n  background-color: mistyrose;\n}\n.notifications--AXpji .warning--awULD {\n  border-color: var(--warning);\n  color: var(--warning);\n  background-color: floralwhite;\n}\n",""]),i.locals={main:"main--nkgWn",key:"key--ePMDj",value:"value--hsvoM",string:"string--l71lZ",array:"array--q1hA6",object:"object--snknK",opened:"opened--a6cpo",arrayElements:"arrayElements--DhXwh",field:"field--RcmI_",notifications:"notifications--AXpji",error:"error--dokHT",warning:"warning--awULD"};const s=i},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var r="",t=void 0!==n[5];return n[4]&&(r+="@supports (".concat(n[4],") {")),n[2]&&(r+="@media ".concat(n[2]," {")),t&&(r+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),r+=e(n),t&&(r+="}"),n[2]&&(r+="}"),n[4]&&(r+="}"),r})).join("")},n.i=function(e,r,t,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(t)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(i[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);t&&i[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),n.push(d))}},n}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function r(e){for(var r=-1,t=0;t<n.length;t++)if(n[t].identifier===e){r=t;break}return r}function t(e,t){for(var o={},i=[],s=0;s<e.length;s++){var l=e[s],c=t.base?l[0]+t.base:l[0],d=o[c]||0,p="".concat(c," ").concat(d);o[c]=d+1;var y=r(p),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==y)n[y].references++,n[y].updater(h);else{var u=a(h,t);t.byIndex=s,n.splice(s,0,{identifier:p,updater:u,references:1})}i.push(p)}return i}function a(e,n){var r=n.domAPI(n);return r.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;r.update(e=n)}else r.remove()}}e.exports=function(e,a){var o=t(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var s=r(o[i]);n[s].references--}for(var l=t(e,a),c=0;c<o.length;c++){var d=r(o[c]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}o=l}}},569:e=>{var n={};e.exports=function(e,r){var t=function(e){if(void 0===n[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}n[e]=r}return n[e]}(e);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(r)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,r)=>{e.exports=function(e){var n=r.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(r){!function(e,n,r){var t="";r.supports&&(t+="@supports (".concat(r.supports,") {")),r.media&&(t+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(t+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),t+=r.css,a&&(t+="}"),r.media&&(t+="}"),r.supports&&(t+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(t,e,n.options)}(n,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function r(t){var a=n[t];if(void 0!==a)return a.exports;var o=n[t]={id:t,exports:{}};return e[t](o,o.exports,r),o.exports}r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.nc=void 0;var t={};(()=>{r.d(t,{O:()=>$,R:()=>H});const e=e=>"object"==typeof e&&!Array.isArray(e)&&null!==e,n=e=>!(!e||"object"!=typeof e||!(Array.isArray(e)&&0===e.length||0===Object.keys(e).length)),a=["warning","error"],o=[],i=(e,n)=>{e===a[0]?o.push({type:e,text:n}):o.unshift({type:e,text:n})},s={root:"",isFormatKeys:!1,hideArrayElements:!1,hideEmpty:!0,isSplitSingleFields:!1,showNotifications:!0,keysDict:{},keysOldToNew:{},arraysAsTable:[]};let l=s;const c=()=>({...l}),d=(e,n)=>{l.keysDict[n]&&l.keysDict[n]!==e&&i("warning",`There is more that one field with transformed key ${n} with different original keys`),l.keysDict[n]=e,l.keysOldToNew[e]&&l.keysOldToNew[e]!==n&&i("warning",`There is more that one field with original key ${e} with different transformed keys`),l.keysOldToNew[e]=n},p=e=>l.keysOldToNew[e]||e,y=e=>l.keysDict[e]||e,h=(r,t)=>{const a=c(),{hidePropertiesByValue:o,hidePropertiesByKey:i,hideEmpty:s}=a;return!((i||o||s)&&(!e(t)&&o&&o.includes(t)||r&&i&&i.includes(r)||n(t)&&s))},u=(e,{nullAppearence:n,boolAppearence:r})=>r&&"boolean"==typeof e?r[+e]:n&&null===e?n:e,f=e=>{if("string"!=typeof e)return null;const n=e.split(/[\s_\-]/).filter((e=>e)),r=/([A-Z]+$)|(\d+[a-z]+)|(\d+)|(((^[a-z])|[A-Z]+)[a-z]*)/g;let t=[];for(let e of n){const n=e.match(r)||[e];t=t.concat(n)}return t?t.map((e=>(e=>{const n=(e.match(/[A-Z]/g)||[]).length,r=/^[A-Z]+$/.test(e);return n>1&&!r?e.slice(0,n-1)+" "+e.slice(n-1):e})(e))).join(" "):e},m=(e,n,r={})=>{const t=/\{([\w\.\@\#\*])+?\}/g;return-1===n.search(t)?e[r[n]||n]||"-":n.replace(t,(n=>{const r=n.slice(1,-1).split(".");let t=e[p(r[0])];for(let e=1;e<r.length;e++){const n=p(r[e]);if(!t||!t[n]){t="-";break}t=t[n]}return t||"-"}))},v=e=>Array.isArray(e)&&1===e.length||1===Object.keys(e).length,b=(e,n)=>n&&"object"==typeof n&&v(n)?((e,n)=>{let r,t;Array.isArray(n)?(r=e,t=n[0]):(r=Object.keys(n)[0],t=n[r]);const{key:a,value:o}=b(r,t);return{key:Array.isArray(n)?a:`${e} > ${a}`,value:o}})(e,n):{key:e,value:n},g=e=>{const r=c();if(!r||!Object.keys(r).length)return e;const t=Array.isArray(e),{isFormatKeys:a,hideEmpty:o,isSplitSingleFields:i}=r,s=t?[]:{};for(const l in e){let c=a?f(l):l;if(l!==c&&d(l,c),h(l,e[l]))if(e[l]&&"object"==typeof e[l]){let r=g(e[l]);if(o&&n(r))continue;if(i&&!t&&v(r)){const n=b(c,r);c=n.key,r=n.value,d(Object.keys(e[l])[0],c)}s[c]=r}else{const{nullAppearence:n,boolAppearence:t}=r;s[c]=u(e[l],{nullAppearence:n,boolAppearence:t})}}return t&&1===s.length&&i?s[0]:s};var A=r(379),k=r.n(A),w=r(795),x=r.n(w),j=r(569),E=r.n(j),T=r(565),C=r.n(T),D=r(216),M=r.n(D),O=r(589),q=r.n(O),X=r(667),N={};N.styleTagTransform=q(),N.setAttributes=C(),N.insert=E().bind(null,"head"),N.domAPI=x(),N.insertStyleElement=M(),k()(X.Z,N);const F=X.Z&&X.Z.locals?X.Z.locals:void 0,S=e=>{const n=I("table",null,F.arrayElements);let r=[];e.forEach((e=>{r=[...new Set([...r,...Object.keys(e)])]}));const t=(e=>{const n=document.createDocumentFragment(),r=I("thead"),t=I("tr");return e.forEach((e=>{headerCellElement=I("th",e),t.appendChild(headerCellElement)})),r.appendChild(t),n.appendChild(r),n})(r),a=((e,n)=>{const r=document.createDocumentFragment(),t=I("tbody");return e.forEach((e=>{const r=I("tr");n.forEach((n=>{const t=((e,n)=>{const r=c(),t=Array.isArray(n)?"array":typeof n;if("object"!=typeof n)return I("td",n||"-");const{arraysAsTable:a}=r,o=y(e);let i;if("array"===t&&a&&a.includes(o))i=S(n);else{const r=P(e,t);i=Z(n,F.cell,r)}const s=I("td");return s.appendChild(i),s})(n,e[n]);r.appendChild(t)})),t.appendChild(r)})),r.appendChild(t),r})(e,r);return n.appendChild(t),n.appendChild(a),n},K=e=>{e.classList.toggle(F.opened),e.classList.contains(F.opened)||e.querySelectorAll(`.${F.opened}`).forEach((e=>{e.classList.remove(F.opened)}))},P=(e,n)=>{const r=c(),t=y(e),{keysForArrays:a}=r;return a&&a[t]&&"array"===n?a[t]:null},Z=(e,n=F.main,r)=>{const t=c(),a=I("div",null,n);for(const n in e){const o=e[n],i=Array.isArray(o)?"array":typeof o,s=I("div",null,[F.field,F[i]]),{arraysAsTable:l,keysOldToNew:c}=t,d=y(n),p=P(n,i),h=r?m(o,r,c):n,{keyElement:u,fragment:f}=L(h,o,{specialKeysForInnerArray:p,renderAsTable:"array"===i&&l&&l.includes(d)});s.appendChild(f),u.addEventListener("click",(()=>K(s))),a.appendChild(s)}return a},L=(e,n,{specialKeysForInnerArray:r,renderAsTable:t})=>{const a=document.createDocumentFragment(),o=I("span",e,F.key);if(a.appendChild(o),"object"==typeof n){const e=t?S(n):Z(n,F.value,r);a.appendChild(e)}else a.appendChild(I("span",": ",F.value)),a.appendChild(I("span",n,F.value));return{keyElement:o,fragment:a}},I=(n,r="",t)=>{const a=document.createElement(n);if(a.innerHTML=r,!t)return a;if(e(t))for(let e in t)a[e]=t[e];else{const e=Array.isArray(t)?t.join(" "):t;a.className=e}return a},$=e=>{try{const n=JSON.parse(e);return g(n)}catch(e){throw e}},H=(e,n,r)=>{let t;try{if(!n)throw new Error('The second parameter of the "generate" function should be a node element.');(e=>{l={...s,...e}})(r),(()=>{const{keysForArrays:e,arraysAsTable:n=[]}=l;Array.isArray(n)?e&&n.forEach((n=>{e[n]&&i("warning",'There is the same array in "keysForArrays" and "arraysAsTable" settings. These settings couldn\'t be setted both.')})):i("warning",'"arraysAsTable" should be an array')})(),t=$(e)}catch(e){i("error",e.message),console.error(e.message)}n&&((e,n)=>{const r=c(),{showNotifications:t}=r;t&&o.length&&n.appendChild((()=>{const e=I("div",null,F.notifications);return o.forEach((({type:n,text:r})=>{e.appendChild(I("div",r,F[n]))})),e})());const a=Z(e);n.appendChild(a)})(t,n)}})();var a=t.O,o=t.R;export{a as convert,o as generate};