import"./index.UhkZy2tN.js";import{b as o}from"./entry.8wDMig00.js";import{p as y}from"./stores.0o7Z3W11.js";import{a8 as D}from"./scheduler.Hj4Qi98n.js";import{r as _}from"./runtime._WdKkLCr.js";function d(e){return"/"+e.split("/").filter(Boolean).join("/")}const j=(...e)=>e.map(d).filter(a=>a!=="/").reduce((a,t)=>a+t,"")||"/",R="$paraglide-adapter-sveltekit:context",m="__data.json",L=".html__data.json";function x(e){const a=[];return a.push(e.base),e.includeLanguage&&(!(e.lang===e.defaultLanguageTag)||e.prefixDefaultLanguage==="always")&&a.push(e.lang),a.push(e.path),e.dataSuffix&&a.push(m),j(...a)}const O=/\[(.*?)\]/g;function b(e){const a=e.match(O);if(!a)return[{type:"static",value:e}];const t=[];let n=0;for(const r of a){const u=e.indexOf(r,n),c=e.slice(n,u);c&&t.push({type:"static",value:c});const l=r.slice(1,-1);t.push({type:"param",name:l}),n=u+r.length}const s=e.slice(n);return s&&t.push({type:"static",value:s}),t}function T(e,a){let t;e:for(const n of a){const s=b(n),r={};let u=0;for(const g of s)if(g.type==="static"){if(g.value!==e.slice(u,u+g.value.length))continue e;u+=g.value.length}else if(g.type==="param"){let f=e.indexOf("/",u);f===-1&&(f=e.length),r[g.name]=e.slice(u,f),u=f}if(u!==e.length)continue;const c={id:n,params:r};if(!t){t=c;continue}const l=Object.keys(t.params).length,i=Object.keys(r).length;l<i||(l===i?t.id.length>n.length&&(t=c):t=c)}return t}function v(e,a){const t=b(e);let n="";for(const s of t)if(s.type==="static")n+=s.value;else{const r=a[s.name];if(!r)throw new Error(`Missing param ${s.name}`);n+=r}return n}function B(e,a,t){const n=T(e,Object.keys(t));if(!n)return e;const s=t[n.id];if(!s)return e;const r=s[a];return r?v(r,n.params):e}function p(e,a){e=d(e);const t=d(a.base),{availableLanguageTags:n,defaultLanguageTag:s}=a;let r=e.replace(t,"/");const u=r.endsWith(L)?L:r.endsWith(m)?m:void 0;u&&(r=r.replace(u,""));const[c,...l]=r.split("/").filter(Boolean);if(!c)return{base:t,lang:s,path:"/",dataSuffix:u};const i=n.includes(c)?c:s,g=n.includes(c)?d(l.join("/")):d(r);return{base:t,lang:i,path:g,dataSuffix:u}}function P(e,a,t){for(const[n,s]of Object.entries(t)){if(!(a in s))continue;const r=s[a];if(!r)continue;const u=T(e,[r]);if(u)return v(n,u.params)}return e}const I=({runtime:e,defaultLanguageTag:a},t)=>({resolve:n,event:s})=>{const{lang:r}=p(s.url.pathname,{availableLanguageTags:e.availableLanguageTags,defaultLanguageTag:a,base:o});return n(s,{transformPageChunk({html:u,done:c}){return c?u.replace(t.langPlaceholder,r):u}})},S=({defaultLanguageTag:e,runtime:a,translations:t})=>({url:n})=>{try{const{lang:s,path:r,dataSuffix:u}=p(n.pathname,{base:o,availableLanguageTags:a.availableLanguageTags,defaultLanguageTag:e}),c=P(r,s,t);return x({path:c,base:o,dataSuffix:u,includeLanguage:!1})}catch(s){return console.error(s),n.pathname}};function z(e,a){const t=(a==null?void 0:a.pathnames)??{},n=(a==null?void 0:a.exclude)??[],s=n.filter(l=>typeof l=="string"),r=n.filter(l=>l instanceof RegExp),u=(a==null?void 0:a.defaultLanguageTag)??e.sourceLanguageTag,c={runtime:e,translations:t,exclude:l=>!!(s.some(i=>l.startsWith(i))||r.some(i=>i.test(l))),defaultLanguageTag:u,prefixDefaultLanguage:(a==null?void 0:a.prefixDefaultLanguage)??"never"};return Object.freeze(t),Object.freeze(c),{config:c,reroute:()=>S(c),handle:l=>I(c,l),getLanguageFromUrl(l){const g=l.pathname.slice(h(o).length).split("/").filter(Boolean).at(0);return e.isAvailableLanguageTag(g)?g:u},route(l,i=void 0){if(c.exclude(l))return l;i=i??e.languageTag();const g=l.slice(h(o).length),f=B(g,i,t);return x({path:f,lang:i,base:h(o),dataSuffix:void 0,includeLanguage:!0,defaultLanguageTag:u,prefixDefaultLanguage:c.prefixDefaultLanguage})},getCanonicalPath(l){const{path:i,lang:g}=p(l,{base:h(o),availableLanguageTags:c.runtime.availableLanguageTags,defaultLanguageTag:c.defaultLanguageTag}),f=P(i,g,t);return h(o)+f}}}function h(e){return e==""||e.startsWith("/")?e:new URL(e,D(y).url).pathname}const w=z(_);export{R as P,P as a,B as b,p as g,w as i,d as n,x as s};
