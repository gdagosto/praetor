import{s as us,q as Dn,i as fs,f as Ae,I as Rn,y as Qs,J as Zs,K as to,z as un,A as eo,B as no,e as Mn,c as $n,b as Fn,m as so,L as Nn,h as oo,C as co,D as ro,E as lo,M as Bn}from"./scheduler.Hj4Qi98n.js";import{S as io,i as ao,a as ds,t as ps}from"./index.UhkZy2tN.js";import{g as uo}from"./ButtonGroup.svelte_svelte_type_style_lang.SOLwJ6Wp.js";/*!
 * OverlayScrollbars
 * Version: 2.4.6
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */const wt=(t,e)=>{const{o:n,u:s,_:o}=t;let c=n,r;const a=(u,f)=>{const p=c,H=u,E=f||(s?!s(p,H):p!==H);return(E||o)&&(c=H,r=p),[c,E,r]};return[e?u=>a(e(c,r),u):a,u=>[c,!!u,r]]},Sn=typeof window<"u",ms=Sn&&Node.ELEMENT_NODE,{toString:fo,hasOwnProperty:en}=Object.prototype,po=/^\[object (.+)\]$/,Kt=t=>t===void 0,Be=t=>t===null,mo=t=>Kt(t)||Be(t)?`${t}`:fo.call(t).replace(po,"$1").toLowerCase(),xt=t=>typeof t=="number",he=t=>typeof t=="string",vs=t=>typeof t=="boolean",Et=t=>typeof t=="function",Ct=t=>Array.isArray(t),ve=t=>typeof t=="object"&&!Ct(t)&&!Be(t),Ve=t=>{const e=!!t&&t.length,n=xt(e)&&e>-1&&e%1==0;return Ct(t)||!Et(t)&&n?e>0&&ve(t)?e-1 in t:!0:!1},ze=t=>{if(!t||!ve(t)||mo(t)!=="object")return!1;let e;const n="constructor",s=t[n],o=s&&s.prototype,c=en.call(t,n),r=o&&en.call(o,"isPrototypeOf");if(s&&!c&&!r)return!1;for(e in t);return Kt(e)||en.call(t,e)},de=t=>{const e=HTMLElement;return t?e?t instanceof e:t.nodeType===ms:!1},je=t=>{const e=Element;return t?e?t instanceof e:t.nodeType===ms:!1};function J(t,e){if(Ve(t))for(let n=0;n<t.length&&e(t[n],n,t)!==!1;n++);else t&&J(Object.keys(t),n=>e(t[n],n,t));return t}const qe=(t,e)=>t.indexOf(e)>=0,Ht=(t,e)=>t.concat(e),nt=(t,e,n)=>(!n&&!he(e)&&Ve(e)?Array.prototype.push.apply(t,e):t.push(e),t),le=t=>{const e=Array.from,n=[];return e&&t?e(t):(t instanceof Set?t.forEach(s=>{nt(n,s)}):J(t,s=>{nt(n,s)}),n)},bs=t=>Ct(t)?t:[t],Te=t=>!!t&&!t.length,Vn=t=>le(new Set(t)),yt=(t,e,n)=>{J(t,o=>o&&o.apply(void 0,e||[])),!n&&(t.length=0)},Ue=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),Tt=t=>t?Object.keys(t):[],Z=(t,e,n,s,o,c,r)=>{const a=[e,n,s,o,c,r];return(typeof t!="object"||Be(t))&&!Et(t)&&(t={}),J(a,l=>{J(l,(i,u)=>{const f=l[u];if(t===f)return!0;const p=Ct(f);if(f&&ze(f)){const H=t[u];let E=H;p&&!Ct(H)?E=[]:!p&&!ze(H)&&(E={}),t[u]=Z(E,f)}else t[u]=p?f.slice():f})}),t},hs=(t,e)=>J(Z({},t),(n,s,o)=>{n===void 0?delete o[s]:e&&n&&ze(n)&&(o[s]=hs(n,e))}),On=t=>{for(const e in t)return!1;return!0},ut=(t,e,n)=>{if(Kt(n))return t?t.getAttribute(e):null;t&&t.setAttribute(e,n)},ys=(t,e)=>new Set((ut(t,e)||"").split(" ")),ft=(t,e)=>{t&&t.removeAttribute(e)},Xt=(t,e,n,s)=>{if(n){const o=ys(t,e);o[s?"add":"delete"](n);const c=le(o).join(" ").trim();ut(t,e,c)}},vo=(t,e,n)=>ys(t,e).has(n),fn=Sn&&Element.prototype,gs=(t,e)=>{const n=[],s=e?je(e)&&e:document;return s?nt(n,s.querySelectorAll(t)):n},bo=(t,e)=>{const n=e?je(e)&&e:document;return n?n.querySelector(t):null},ke=(t,e)=>je(t)?(fn.matches||fn.msMatchesSelector).call(t,e):!1,dn=t=>t?le(t.childNodes):[],It=t=>t&&t.parentElement,ee=(t,e)=>{if(je(t)){const n=fn.closest;if(n)return n.call(t,e);do{if(ke(t,e))return t;t=It(t)}while(t)}},ho=(t,e,n)=>{const s=ee(t,e),o=t&&bo(n,s),c=ee(o,e)===s;return s&&o?s===t||o===t||c&&ee(ee(t,n),e)!==s:!1},ht=()=>{},zt=t=>{if(Ve(t))J(le(t),e=>zt(e));else if(t){const e=It(t);e&&e.removeChild(t)}},xn=(t,e,n)=>{if(n&&t){let s=e,o;return Ve(n)?(o=document.createDocumentFragment(),J(n,c=>{c===s&&(s=c.previousSibling),o.appendChild(c)})):o=n,e&&(s?s!==e&&(s=s.nextSibling):s=t.firstChild),t.insertBefore(o,s||null),()=>zt(n)}return ht},bt=(t,e)=>xn(t,null,e),yo=(t,e)=>xn(It(t),t,e),jn=(t,e)=>xn(It(t),t&&t.nextSibling,e),Gt=t=>{const e=document.createElement("div");return ut(e,"class",t),e},ws=t=>{const e=Gt();return e.innerHTML=t.trim(),J(dn(e),n=>zt(n))},mt=Sn?window:{},He=Math.max,go=Math.min,be=Math.round,Ss=mt.cancelAnimationFrame,Os=mt.requestAnimationFrame,Pe=mt.setTimeout,pn=mt.clearTimeout,mn=t=>t.charAt(0).toUpperCase()+t.slice(1),wo=()=>Gt().style,So=["-webkit-","-moz-","-o-","-ms-"],Oo=["WebKit","Moz","O","MS","webkit","moz","o","ms"],nn={},sn={},xo=t=>{let e=sn[t];if(Ue(sn,t))return e;const n=mn(t),s=wo();return J(So,o=>{const c=o.replace(/-/g,"");return!(e=[t,o+t,c+n,mn(c)+n].find(a=>s[a]!==void 0))}),sn[t]=e||""},We=t=>{let e=nn[t]||mt[t];return Ue(nn,t)||(J(Oo,n=>(e=e||mt[n+mn(t)],!e)),nn[t]=e),e},Eo=We("MutationObserver"),qn=We("IntersectionObserver"),Le=We("ResizeObserver"),vn=We("ScrollTimeline"),R=(t,...e)=>t.bind(0,...e),Mt=t=>{let e;const n=t?Pe:Os,s=t?pn:Ss;return[o=>{s(e),e=n(o,Et(t)?t():t)},()=>s(e)]},xs=(t,e)=>{let n,s,o,c=ht;const{v:r,p:a,S:l}=e||{},i=function(E){c(),pn(n),n=s=void 0,c=ht,t.apply(this,E)},u=H=>l&&s?l(s,H):H,f=()=>{c!==ht&&i(u(o)||o)},p=function(){const E=le(arguments),h=Et(r)?r():r;if(xt(h)&&h>=0){const k=Et(a)?a():a,y=xt(k)&&k>=0,P=h>0?Pe:Os,I=h>0?pn:Ss,q=u(E)||E,M=i.bind(0,q);c();const X=P(M,h);c=()=>I(X),y&&!n&&(n=Pe(f,k)),s=o=q}else i(E)};return p.m=f,p},Co=/[^\x20\t\r\n\f]+/g,Es=(t,e,n)=>{const s=t&&t.classList;let o,c=0,r=!1;if(s&&e&&he(e)){const a=e.match(Co)||[];for(r=a.length>0;o=a[c++];)r=!!n(s,o)&&r}return r},En=(t,e)=>{Es(t,e,(n,s)=>n.remove(s))},Bt=(t,e)=>(Es(t,e,(n,s)=>n.add(s)),R(En,t,e)),_o=/^--/,Un=(t,e)=>t.getPropertyValue(e)||t[e]||"",Cn=t=>{const e=t||0;return isFinite(e)?e:0},Ee=t=>Cn(parseFloat(t||"")),Ce=t=>`${(Cn(t)*100).toFixed(3)}%`,ae=t=>`${Cn(t)}px`;function Ft(t,e){t&&J(e,(n,s)=>{try{const o=t.style,c=xt(n)?ae(n):n+"";_o.test(s)?o.setProperty(s,c):o[s]=c}catch{}})}function kt(t,e,n){const s=he(e);let o=s?"":{};if(t){const c=mt.getComputedStyle(t,n)||t.style;o=s?Un(c,e):e.reduce((r,a)=>(r[a]=Un(c,a),r),o)}return o}const ne=t=>kt(t,"direction")==="rtl",Wn=(t,e,n)=>{const s=e?`${e}-`:"",o=n?`-${n}`:"",c=`${s}top${o}`,r=`${s}right${o}`,a=`${s}bottom${o}`,l=`${s}left${o}`,i=kt(t,[c,r,a,l]);return{t:Ee(i[c]),r:Ee(i[r]),b:Ee(i[a]),l:Ee(i[l])}},te=(t,e)=>`translate${ve(t)?`(${t.x},${t.y})`:`${e?"X":"Y"}(${t})`}`,Cs="paddingTop",_n="paddingRight",An="paddingLeft",De="paddingBottom",Re="marginLeft",Me="marginRight",pe="marginBottom",ue="overflowX",fe="overflowY",Pt="width",Lt="height",ce="hidden",Ao={w:0,h:0},Xe=(t,e)=>e?{w:e[`${t}Width`],h:e[`${t}Height`]}:Ao,Ho=t=>Xe("inner",t||mt),me=R(Xe,"offset"),Ie=R(Xe,"client"),$e=R(Xe,"scroll"),Fe=t=>{const e=parseFloat(kt(t,Pt))||0,n=parseFloat(kt(t,Lt))||0;return{w:e-be(e),h:n-be(n)}},Ot=t=>t.getBoundingClientRect(),bn=t=>!!(t&&(t[Lt]||t[Pt])),_s=(t,e)=>{const n=bn(t);return!bn(e)&&n},Ge=(t,e,n,s)=>{if(t&&e){let o=!0;return J(n,c=>{const r=s?s(t[c]):t[c],a=s?s(e[c]):e[c];r!==a&&(o=!1)}),o}return!1},As=(t,e)=>Ge(t,e,["w","h"]),Hs=(t,e)=>Ge(t,e,["x","y"]),Io=(t,e)=>Ge(t,e,["t","r","b","l"]),Xn=(t,e,n)=>Ge(t,e,[Pt,Lt],n&&(s=>be(s)));let _e;const Gn="passive",zo=()=>{if(Kt(_e)){_e=!1;try{mt.addEventListener(Gn,ht,Object.defineProperty({},Gn,{get(){_e=!0}}))}catch{}}return _e},Is=t=>t.split(" "),Kn=(t,e,n,s)=>{J(Is(e),o=>{t.removeEventListener(o,n,s)})},ot=(t,e,n,s)=>{var o;const c=zo(),r=(o=c&&s&&s.$)!=null?o:c,a=s&&s.O||!1,l=s&&s.C||!1,i=c?{passive:r,capture:a}:a;return R(yt,Is(e).map(u=>{const f=l?p=>{Kn(t,u,f,a),n(p)}:n;return t.addEventListener(u,f,i),R(Kn,t,u,f,a)}))},zs=t=>t.stopPropagation(),Yn=t=>t.preventDefault(),To={x:0,y:0},on=t=>{const e=t&&Ot(t);return e?{x:e.left+mt.pageYOffset,y:e.top+mt.pageXOffset}:To},Ts=(t,e,n)=>n?n.n?-t:n.i?e-t:t:t,ko=(t,e)=>[e&&e.i?t:0,Ts(t,t,e)],Vt=(t,e)=>{const{x:n,y:s}=xt(e)?{x:e,y:e}:e||{};xt(n)&&(t.scrollLeft=n),xt(s)&&(t.scrollTop=s)},re=t=>({x:t.scrollLeft,y:t.scrollTop}),Jn=(t,e)=>{J(bs(e),t)},hn=t=>{const e=new Map,n=(c,r)=>{if(c){const a=e.get(c);Jn(l=>{a&&a[l?"delete":"clear"](l)},r)}else e.forEach(a=>{a.clear()}),e.clear()},s=(c,r)=>{if(he(c)){const i=e.get(c)||new Set;return e.set(c,i),Jn(u=>{Et(u)&&i.add(u)},r),R(n,c,r)}vs(r)&&r&&n();const a=Tt(c),l=[];return J(a,i=>{const u=c[i];u&&nt(l,s(i,u))}),R(yt,l)},o=(c,r)=>{J(le(e.get(c)),a=>{r&&!Te(r)?a.apply(0,r):a()})};return s(t||{}),[s,n,o]},Qn=t=>JSON.stringify(t,(e,n)=>{if(Et(n))throw 0;return n}),Zn=(t,e)=>t?`${e}`.split(".").reduce((n,s)=>n&&Ue(n,s)?n[s]:void 0,t):void 0,Po={paddingAbsolute:!1,showNativeOverlaidScrollbars:!1,update:{elementEvents:[["img","load"]],debounce:[0,33],attributes:null,ignoreMutation:null},overflow:{x:"scroll",y:"scroll"},scrollbars:{theme:"os-theme-dark",visibility:"auto",autoHide:"never",autoHideDelay:1300,autoHideSuspend:!1,dragScroll:!0,clickScroll:!1,pointers:["mouse","touch","pen"]}},ks=(t,e)=>{const n={},s=Ht(Tt(e),Tt(t));return J(s,o=>{const c=t[o],r=e[o];if(ve(c)&&ve(r))Z(n[o]={},ks(c,r)),On(n[o])&&delete n[o];else if(Ue(e,o)&&r!==c){let a=!0;if(Ct(c)||Ct(r))try{Qn(c)===Qn(r)&&(a=!1)}catch{}a&&(n[o]=r)}}),n},Lo=(t,e,n)=>s=>[Zn(t,s),n||Zn(e,s)!==void 0],ye="data-overlayscrollbars",Ps="os-environment",Ls=`${Ps}-flexbox-glue`,Do=`${Ls}-max`,Ds="os-scrollbar-hidden",cn=`${ye}-initialize`,St=ye,Rs=`${St}-overflow-x`,Ms=`${St}-overflow-y`,se="overflowVisible",Ro="scrollbarHidden",ts="scrollbarPressed",Ne="updating",$t=`${ye}-viewport`,rn="arrange",$s="scrollbarHidden",oe=se,yn=`${ye}-padding`,Mo=oe,es=`${ye}-content`,Hn="os-size-observer",$o=`${Hn}-appear`,Fo=`${Hn}-listener`,No="os-trinsic-observer",Bo="os-no-css-vars",Vo="os-theme-none",pt="os-scrollbar",jo=`${pt}-rtl`,qo=`${pt}-horizontal`,Uo=`${pt}-vertical`,Fs=`${pt}-track`,In=`${pt}-handle`,Wo=`${pt}-visible`,Xo=`${pt}-cornerless`,ns=`${pt}-transitionless`,ss=`${pt}-interaction`,os=`${pt}-unusable`,gn=`${pt}-auto-hide`,cs=`${gn}-hidden`,rs=`${pt}-wheel`,Go=`${Fs}-interactive`,Ko=`${In}-interactive`,Ns={},Bs={},Yo=t=>{J(t,e=>J(e,(n,s)=>{Ns[s]=e[s]}))},Vs=(t,e,n)=>Tt(t).map(s=>{const{static:o,instance:c}=t[s],[r,a,l]=n||[],i=n?c:o;if(i){const u=n?i(r,a,e):i(e);return(l||Bs)[s]=u}}),ie=t=>Bs[t],Jo="__osOptionsValidationPlugin",Qo="__osSizeObserverPlugin",zn="__osScrollbarsHidingPlugin",Zo="__osClickScrollPlugin";let ln;const ls=(t,e,n,s)=>{bt(t,e);const o=Ie(e),c=me(e),r=Fe(n);return s&&zt(e),{x:c.h-o.h+r.h,y:c.w-o.w+r.w}},tc=t=>{let e=!1;const n=Bt(t,Ds);try{e=kt(t,xo("scrollbar-width"))==="none"||kt(t,"display","::-webkit-scrollbar")==="none"}catch{}return n(),e},ec=(t,e)=>{Ft(t,{[ue]:ce,[fe]:ce,direction:"rtl"}),Vt(t,{x:0});const n=on(t),s=on(e);Vt(t,{x:-999});const o=on(e);return{i:n.x===s.x,n:s.x!==o.x}},nc=(t,e)=>{const n=Bt(t,Ls),s=Ot(t),o=Ot(e),c=Xn(o,s,!0),r=Bt(t,Do),a=Ot(t),l=Ot(e),i=Xn(l,a,!0);return n(),r(),c&&i},sc=()=>{const{body:t}=document,n=ws(`<div class="${Ps}"><div></div></div>`)[0],s=n.firstChild,[o,,c]=hn(),[r,a]=wt({o:ls(t,n,s),u:Hs},R(ls,t,n,s,!0)),[l]=a(),i=tc(n),u={x:l.x===0,y:l.y===0},f={elements:{host:null,padding:!i,viewport:L=>i&&L===L.ownerDocument.body&&L,content:!1},scrollbars:{slot:!0},cancel:{nativeScrollbarsOverlaid:!1,body:null}},p=Z({},Po),H=R(Z,{},p),E=R(Z,{},f),h={L:l,A:u,I:i,T:kt(n,"zIndex")==="-1",V:!!vn,U:ec(n,s),B:nc(n,s),j:R(o,"r"),N:E,G:L=>Z(f,L)&&E(),q:H,F:L=>Z(p,L)&&H(),W:Z({},f),X:Z({},p)};return ft(n,"style"),zt(n),mt.addEventListener("resize",()=>{let L;if(!i&&(!u.x||!u.y)){const k=ie(zn);L=!!(k?k.P():ht)(h,r)}c("r",[L])}),h},dt=()=>(ln||(ln=sc()),ln),Tn=(t,e)=>Et(e)?e.apply(0,t):e,oc=(t,e,n,s)=>{const o=Kt(s)?n:s;return Tn(t,o)||e.apply(0,t)},js=(t,e,n,s)=>{const o=Kt(s)?n:s,c=Tn(t,o);return!!c&&(de(c)?c:e.apply(0,t))},cc=(t,e)=>{const{nativeScrollbarsOverlaid:n,body:s}=e||{},{A:o,I:c,N:r}=dt(),{nativeScrollbarsOverlaid:a,body:l}=r().cancel,i=n??a,u=Kt(s)?l:s,f=(o.x||o.y)&&i,p=t&&(Be(u)?!c:u);return!!f||!!p},kn=new WeakMap,rc=(t,e)=>{kn.set(t,e)},lc=t=>{kn.delete(t)},qs=t=>kn.get(t),ic=(t,e,n)=>{let s=!1;const o=n?new WeakMap:!1,c=()=>{s=!0},r=a=>{if(o&&n){const l=n.map(i=>{const[u,f]=i||[];return[f&&u?(a||gs)(u,t):[],f]});J(l,i=>J(i[0],u=>{const f=i[1],p=o.get(u)||[];if(t.contains(u)&&f){const E=ot(u,f.trim(),h=>{s?(E(),o.delete(u)):e(h)});o.set(u,nt(p,E))}else yt(p),o.delete(u)}))}};return r(),[c,r]},is=(t,e,n,s)=>{let o=!1;const{Y:c,K:r,J:a,Z:l,tt:i,nt:u}=s||{},f=xs(()=>o&&n(!0),{v:33,p:99}),[p,H]=ic(t,f,a),E=c||[],h=r||[],L=Ht(E,h),k=(P,I)=>{if(!Te(I)){const W=i||ht,q=u||ht,M=[],X=[];let v=!1,C=!1;if(J(I,m=>{const{attributeName:z,target:D,type:T,oldValue:V,addedNodes:tt,removedNodes:U}=m,G=T==="attributes",et=T==="childList",st=t===D,N=G&&z,w=N?ut(D,z||""):null,d=N&&V!==w,_=qe(h,z)&&d;if(e&&(et||!st)){const g=G&&d,K=g&&l&&ke(D,l),S=(K?!W(D,z,V,w):!G||g)&&!q(m,!!K,t,s);J(tt,O=>nt(M,O)),J(U,O=>nt(M,O)),C=C||S}!e&&st&&d&&!W(D,z,V,w)&&(nt(X,z),v=v||_)}),H(m=>Vn(M).reduce((z,D)=>(nt(z,gs(m,D)),ke(D,m)?nt(z,D):z),[])),e)return!P&&C&&n(!1),[!1];if(!Te(X)||v){const m=[Vn(X),v];return!P&&n.apply(0,m),m}}},y=new Eo(R(k,!1));return[()=>(y.observe(t,{attributes:!0,attributeOldValue:!0,attributeFilter:L,subtree:e,childList:e,characterData:e}),o=!0,()=>{o&&(p(),y.disconnect(),o=!1)}),()=>{if(o)return f.m(),k(!0,y.takeRecords())}]},Us=(t,e,n)=>{const{ot:o,st:c}=n||{},r=ie(Qo),{U:a}=dt(),l=R(ne,t),[i]=wt({o:!1,_:!0});return()=>{const u=[],p=ws(`<div class="${Hn}"><div class="${Fo}"></div></div>`)[0],H=p.firstChild,E=h=>{const L=h instanceof ResizeObserverEntry,k=!L&&Ct(h);let y=!1,P=!1,I=!0;if(L){const[W,,q]=i(h.contentRect),M=bn(W),X=_s(W,q);P=!q||X,y=!P&&!M,I=!y}else k?[,I]=h:P=h===!0;if(o&&I){const W=k?h[0]:ne(p);Vt(p,{x:Ts(3333333,3333333,W&&a),y:3333333})}y||e({et:k?h:void 0,ct:!k,st:P})};if(Le){const h=new Le(L=>E(L.pop()));h.observe(H),nt(u,()=>{h.disconnect()})}else if(r){const[h,L]=r(H,E,c);nt(u,Ht([Bt(p,$o),ot(p,"animationstart",h)],L))}else return ht;if(o){const[h]=wt({o:void 0},l);nt(u,ot(p,"scroll",L=>{const k=h(),[y,P,I]=k;P&&(En(H,"ltr rtl"),Bt(H,y?"rtl":"ltr"),E([!!y,P,I])),zs(L)}))}return R(yt,nt(u,bt(t,p)))}},ac=(t,e)=>{let n;const s=l=>l.h===0||l.isIntersecting||l.intersectionRatio>0,o=Gt(No),[c]=wt({o:!1}),r=(l,i)=>{if(l){const u=c(s(l)),[,f]=u;return f&&!i&&e(u)&&[u]}},a=(l,i)=>r(i.pop(),l);return[()=>{const l=[];if(qn)n=new qn(R(a,!1),{root:t}),n.observe(o),nt(l,()=>{n.disconnect()});else{const i=()=>{const u=me(o);r(u)};nt(l,Us(o,i)()),i()}return R(yt,nt(l,bt(t,o)))},()=>n&&a(!0,n.takeRecords())]},uc=(t,e)=>{let n,s,o,c,r;const{I:a}=dt(),l=`[${St}]`,i=`[${$t}]`,u=["tabindex"],f=["wrap","cols","rows"],p=["id","class","style","open"],H={rt:!1,lt:ne(t.it)},{it:E,ut:h,ft:L,_t:k,dt:y,vt:P,ht:I}=t,{B:W,j:q}=dt(),[M]=wt({u:As,o:{w:0,h:0}},()=>{const N=P(oe,se),w=P(rn,""),d=w&&re(h);I(oe,se),I(rn,""),I("",Ne,!0);const _=$e(L),g=$e(h),K=Fe(h);return I(oe,se,N),I(rn,"",w),I("",Ne),Vt(h,d),{w:g.w+_.w+K.w,h:g.h+_.h+K.h}}),X=k?f:Ht(p,f),v=xs(e,{v:()=>n,p:()=>s,S(N,w){const[d]=N,[_]=w;return[Ht(Tt(d),Tt(_)).reduce((g,K)=>(g[K]=d[K]||_[K],g),{})]}}),C=N=>{J(N||u,w=>{if(qe(u,w)){const d=ut(E,w);he(d)?ut(h,w,d):ft(h,w)}})},m=(N,w)=>{const[d,_]=N,g={gt:_};return Z(H,{rt:d}),!w&&e(g),g},z=({ct:N,et:w,st:d})=>{const g=!(N&&!d&&!w)&&a?v:e,[K,b]=w||[];w&&Z(H,{lt:K}),g({ct:N||d,st:d,bt:b})},D=(N,w)=>{const[,d]=M(),_={wt:d};return d&&!w&&(N?e:v)(_),_},T=(N,w,d)=>{const _={yt:w};return w&&!d?v(_):y||C(N),_},[V,tt]=L||!W?ac(E,m):[],U=!y&&Us(E,z,{st:!0,ot:!0}),[G,et]=is(E,!1,T,{K:p,Y:Ht(p,u)}),st=y&&Le&&new Le(N=>{const w=N[N.length-1].contentRect;z({ct:!0,st:_s(w,r)}),r=w});return[()=>{C(),st&&st.observe(E);const N=U&&U(),w=V&&V(),d=G(),_=q(g=>{const[,K]=M();v({St:g,wt:K})});return()=>{st&&st.disconnect(),N&&N(),w&&w(),c&&c(),d(),_()}},({$t:N,xt:w,Ot:d})=>{const _={},[g]=N("update.ignoreMutation"),[K,b]=N("update.attributes"),[S,O]=N("update.elementEvents"),[x,A]=N("update.debounce"),B=O||b,$=w||d,j=F=>Et(g)&&g(F);if(B){o&&o(),c&&c();const[F,Y]=is(L||h,!0,D,{Y:Ht(X,K||[]),J:S,Z:l,nt:(Q,rt)=>{const{target:lt,attributeName:gt}=Q;return(!rt&&gt&&!y?ho(lt,l,i):!1)||!!ee(lt,`.${pt}`)||!!j(Q)}});c=F(),o=Y}if(A)if(v.m(),Ct(x)){const F=x[0],Y=x[1];n=xt(F)&&F,s=xt(Y)&&Y}else xt(x)?(n=x,s=!1):(n=!1,s=!1);if($){const F=et(),Y=tt&&tt(),Q=o&&o();F&&Z(_,T(F[0],F[1],$)),Y&&Z(_,m(Y[0],$)),Q&&Z(_,D(Q[0],$))}return _},H]},wn=(t,e,n)=>He(t,go(e,n)),fc=(t,e,n)=>{const s=be(e),[o,c]=ko(s,n),r=(c-t)/c,a=t/o,l=t/c,i=n?n.n?r:n.i?a:l:l;return wn(0,1,i)},Ws=(t,e,n)=>{if(n){const l=e?Pt:Lt,{Ct:i,Ht:u}=n,f=Ot(u)[l],p=Ot(i)[l];return wn(0,1,f/p)}const s=e?"x":"y",{zt:o,It:c}=t,r=c[s],a=o[s];return wn(0,1,r/(r+a))},as=(t,e,n,s)=>{const o=Ws(t,s,e);return 1/o*(1-o)*n},dc=(t,e,n,s)=>{const{N:o,T:c}=dt(),{scrollbars:r}=o(),{slot:a}=r,{At:l,it:i,ut:u,Et:f,Tt:p,Dt:H,dt:E}=e,{scrollbars:h}=f?{}:t,{slot:L}=h||{},k=new Map,y=b=>vn&&new vn({source:p,axis:b}),P=y("x"),I=y("y"),W=js([l,i,u],()=>E&&H?l:i,a,L),q=b=>E&&!H&&It(b)===u,M=(b,S,O)=>{const x=.5*(O?1:-1),A=S&&O?-1:1;return{transform:[te(ae(0+x),S),te(ae(b*A+x),S)]}},X=(b,S)=>Z(b,S?{clear:["left"]}:{}),v=b=>{k.forEach((S,O)=>{(b?qe(bs(b),O):!0)&&(J(S||[],A=>{A&&A.cancel()}),k.delete(O))})},C=(b,S,O,x)=>{const A=k.get(b)||[],B=A.find($=>$&&$.timeline===S);B?B.effect=new KeyframeEffect(b,O,{composite:x}):k.set(b,Ht(A,[b.animate(O,{timeline:S,composite:x})]))},m=(b,S,O)=>{const x=O?Bt:En;J(b,A=>{x(A.kt,S)})},z=(b,S)=>{J(b,O=>{const[x,A]=S(O);Ft(x,A)})},D=(b,S)=>{z(b,O=>{const{Ht:x}=O;return[x,{[S?Pt:Lt]:Ce(Ws(n,S))}]})},T=(b,S)=>{P&&I?J(b,O=>{const{kt:x,Ht:A}=O,B=R(as,n,O),$=S&&ne(x),j=B($?1:0,S),F=B($?0:1,S);C(A,S?P:I,X({transform:[te(Ce(j),S),te(Ce(F),S)]},$))}):z(b,O=>{const{Ht:x,kt:A}=O,{U:B}=dt(),$=S?"x":"y",{zt:j}=n,F=ne(A),Y=as(n,O,fc(re(p)[$],j[$],S&&F&&B),S);return[x,{transform:te(Ce(Y),S)}]})},V=b=>{const{kt:S}=b,O=q(S)&&S,{x,y:A}=re(p);return[O,{transform:O?te({x:ae(x),y:ae(A)}):""}]},tt=[],U=[],G=[],et=(b,S,O)=>{const x=vs(O),A=x?O:!0,B=x?!O:!0;A&&m(U,b,S),B&&m(G,b,S)},st=()=>{D(U,!0),D(G)},N=()=>{T(U,!0),T(G)},w=()=>{if(E)if(P&&I){const{zt:b}=n,S=!!U.find(({kt:x})=>ne(x)),O=(x,A,B,$,j)=>C(x,A,X(M(B,$,j),S),"add");J(Ht(G,U),({kt:x})=>{q(x)?(O(x,P,b.x,!0,S),O(x,I,b.y)):v(x)})}else z(U,V),z(G,V)},d=b=>{const S=b?qo:Uo,O=b?U:G,x=Te(O)?ns:"",A=Gt(`${pt} ${S} ${x}`),B=Gt(Fs),$=Gt(In),j={kt:A,Ct:B,Ht:$};return c||Bt(A,Bo),nt(O,j),nt(tt,[bt(A,B),bt(B,$),R(zt,A),v,s(j,et,T,b)]),j},_=R(d,!0),g=R(d,!1),K=()=>(bt(W,U[0].kt),bt(W,G[0].kt),Pe(()=>{et(ns)},300),R(yt,tt));return _(),g(),[{Mt:st,Rt:N,Pt:w,Lt:et,Vt:{V:P,Ut:U,Bt:_,jt:R(z,U)},Nt:{V:I,Ut:G,Bt:g,jt:R(z,G)}},K]},pc=(t,e,n)=>{const{it:s,Tt:o,Gt:c}=e;return(r,a,l,i)=>{const{kt:u,Ct:f,Ht:p}=r,[H,E]=Mt(333),[h,L]=Mt(),k=R(l,[r],i),y=!!o.scrollBy,P=`client${i?"X":"Y"}`,I=i?Pt:Lt,W=i?"left":"top",q=i?"w":"h",M=i?"x":"y",X=m=>m.propertyName.indexOf(I)>-1,v=()=>{const m="pointerup pointerleave pointercancel lostpointercapture",z=(D,T)=>V=>{const{zt:tt}=n,U=me(f)[q]-me(p)[q],et=T*V/U*tt[M];Vt(o,{[M]:D+et})};return ot(f,"pointerdown",D=>{const T=ee(D.target,`.${In}`)===p,V=T?p:f,tt=t.scrollbars,{button:U,isPrimary:G,pointerType:et}=D,{pointers:st}=tt;if(U===0&&G&&tt[T?"dragScroll":"clickScroll"]&&(st||[]).includes(et)){const w=!T&&D.shiftKey,d=R(Ot,p),_=R(Ot,f),g=(Q,rt)=>(Q||d())[W]-(rt||_())[W],K=be(Ot(o)[I])/me(o)[q]||1,b=z(re(o)[M]||0,1/K),S=D[P],O=d(),x=_(),A=O[I],B=g(O,x)+A/2,$=S-x[W],j=T?0:$-B,F=Q=>{yt(Y),V.releasePointerCapture(Q.pointerId)},Y=[R(Xt,s,St,ts),ot(c,m,F),ot(c,"selectstart",Q=>Yn(Q),{$:!1}),ot(f,m,F),ot(f,"pointermove",Q=>{const rt=Q[P]-S;(T||w)&&b(j+rt)})];if(Xt(s,St,ts,!0),V.setPointerCapture(D.pointerId),w)b(j);else if(!T){const Q=ie(Zo);Q&&nt(Y,Q(b,g,j,A,$))}}})};let C=!0;return R(yt,[ot(u,"pointerenter",()=>{a(ss,!0)}),ot(u,"pointerleave pointercancel",()=>{a(ss,!1)}),ot(u,"wheel",m=>{const{deltaX:z,deltaY:D,deltaMode:T}=m;y&&C&&T===0&&It(u)===s&&o.scrollBy({left:z,top:D,behavior:"smooth"}),C=!1,a(rs,!0),H(()=>{C=!0,a(rs)}),Yn(m)},{$:!1,O:!0}),ot(p,"transitionstart",m=>{if(X(m)){const z=()=>{k(),h(z)};z()}}),ot(p,"transitionend transitioncancel",m=>{X(m)&&(L(),k())}),ot(u,"mousedown",R(ot,c,"click",zs,{C:!0,O:!0}),{O:!0}),v(),E,L])}},mc=(t,e,n,s,o,c)=>{let r,a,l,i,u,f=ht,p=0;const[H,E]=Mt(),[h,L]=Mt(),[k,y]=Mt(100),[P,I]=Mt(100),[W,q]=Mt(100),[M,X]=Mt(()=>p),[v,C]=dc(t,o,s,pc(e,o,s)),{it:m,qt:z,Dt:D}=o,{Lt:T,Mt:V,Rt:tt,Pt:U}=v,G=d=>{T(gn,d,!0),T(gn,d,!1)},et=(d,_)=>{if(X(),d)T(cs);else{const g=R(T,cs,!0);p>0&&!_?M(g):g()}},st=d=>d.pointerType==="mouse",N=d=>{st(d)&&(i=a,i&&et(!0))},w=[y,X,I,q,L,E,()=>f(),ot(m,"pointerover",N,{C:!0}),ot(m,"pointerenter",N),ot(m,"pointerleave",d=>{st(d)&&(i=!1,a&&et(!1))}),ot(m,"pointermove",d=>{st(d)&&r&&H(()=>{y(),et(!0),P(()=>{r&&et(!1)})})}),ot(z,"scroll",d=>{h(()=>{tt(),l&&et(!0),k(()=>{l&&!i&&et(!1)})}),c(d),U()})];return[()=>R(yt,nt(w,C())),({$t:d,Ot:_,Ft:g,Wt:K})=>{const{Xt:b,Yt:S,Kt:O}=K||{},{bt:x,st:A}=g||{},{lt:B}=n,{A:$}=dt(),{zt:j,Jt:F,Zt:Y}=s,[Q,rt]=d("showNativeOverlaidScrollbars"),[lt,gt]=d("scrollbars.theme"),[_t,At]=d("scrollbars.visibility"),[Dt,it]=d("scrollbars.autoHide"),[at,ct]=d("scrollbars.autoHideSuspend"),[jt]=d("scrollbars.autoHideDelay"),[qt,Rt]=d("scrollbars.dragScroll"),[ge,we]=d("scrollbars.clickScroll"),Yt=A&&!_,Se=Y.x||Y.y,Ke=b||S||x||_,Ye=O||At,Je=Q&&$.x&&$.y,Oe=(vt,Jt)=>{const xe=_t==="visible"||_t==="auto"&&vt==="scroll";return T(Wo,xe,Jt),xe};if(p=jt,Yt&&(at&&Se?(G(!1),f(),W(()=>{f=ot(z,"scroll",R(G,!0),{C:!0})})):G(!0)),rt&&T(Vo,Je),gt&&(T(u),T(lt,!0),u=lt),ct&&!at&&G(!0),it&&(r=Dt==="move",a=Dt==="leave",l=Dt!=="never",et(!l,!0)),Rt&&T(Ko,qt),we&&T(Go,ge),Ye){const vt=Oe(F.x,!0),Jt=Oe(F.y,!1);T(Xo,!(vt&&Jt))}Ke&&(V(),tt(),U(),T(os,!j.x,!0),T(os,!j.y,!1),T(jo,B&&!D))},{},v]},vc=t=>{const e=dt(),{N:n,I:s}=e,o=ie(zn),c=o&&o.H,{elements:r}=n(),{host:a,padding:l,viewport:i,content:u}=r,f=de(t),p=f?{}:t,{elements:H}=p,{host:E,padding:h,viewport:L,content:k}=H||{},y=f?t:p.target,P=ke(y,"textarea"),I=y.ownerDocument,W=I.documentElement,q=y===I.body,M=I.defaultView,X=R(oc,[y]),v=R(js,[y]),C=R(Tn,[y]),m=R(Gt,""),z=R(X,m,i),D=R(v,m,u),T=z(L),V=T===y,tt=V&&q,U=!V&&D(k),G=!V&&de(T)&&T===U,et=G&&!!C(u),st=et?z():T,N=et?U:D(),d=tt?W:G?st:T,_=P?X(m,a,E):y,g=tt?d:_,K=G?N:U,b=I.activeElement,S=!V&&M.top===M&&b===y,O={At:y,it:g,ut:d,Qt:!V&&v(m,l,h),ft:K,tn:!V&&!s&&c&&c(e),Tt:tt?W:d,qt:tt?I:d,nn:M,Gt:I,_t:P,Dt:q,Et:f,dt:V,sn:G,vt:(it,at)=>vo(d,V?St:$t,V?at:it),ht:(it,at,ct)=>Xt(d,V?St:$t,V?at:it,ct)},x=Tt(O).reduce((it,at)=>{const ct=O[at];return nt(it,ct&&de(ct)&&!It(ct)?ct:!1)},[]),A=it=>it?qe(x,it):null,{At:B,it:$,Qt:j,ut:F,ft:Y,tn:Q}=O,rt=[()=>{ft($,St),ft($,cn),ft(B,cn),q&&(ft(W,St),ft(W,cn))}],lt=P&&A($);let gt=P?B:dn([Y,F,j,$,B].find(it=>A(it)===!1));const _t=tt?B:Y||F,At=R(yt,rt);return[O,()=>{ut($,St,V?"viewport":"host"),ut(j,yn,""),ut(Y,es,""),V||ut(F,$t,"");const it=q&&!V?Bt(It(y),Ds):ht,at=ct=>{bt(It(ct),dn(ct)),zt(ct)};if(lt&&(jn(B,$),nt(rt,()=>{jn($,B),zt($)})),bt(_t,gt),bt($,j),bt(j||$,!V&&F),bt(F,Y),nt(rt,()=>{it(),ft(j,yn),ft(Y,es),ft(F,Rs),ft(F,Ms),ft(F,$t),A(Y)&&at(Y),A(F)&&at(F),A(j)&&at(j)}),s&&!V&&(Xt(F,$t,$s,!0),nt(rt,R(ft,F,$t))),Q&&(yo(F,Q),nt(rt,R(zt,Q))),S){const ct="tabindex",jt=ut(F,ct);ut(F,ct,"-1"),F.focus();const qt=()=>jt?ut(F,ct,jt):ft(F,ct),Rt=ot(I,"pointerdown keydown",()=>{qt(),Rt()});nt(rt,[qt,Rt])}else b&&b.focus&&b.focus();return gt=0,At},At]},bc=({ft:t})=>({Ft:e,en:n,Ot:s})=>{const{B:o}=dt(),{gt:c}=e||{},{rt:r}=n;(t||!o)&&(c||s)&&Ft(t,{[Lt]:r?"":"100%"})},hc=({it:t,Qt:e,ut:n,dt:s},o)=>{const[c,r]=wt({u:Io,o:Wn()},R(Wn,t,"padding",""));return({$t:a,Ft:l,en:i,Ot:u})=>{let[f,p]=r(u);const{I:H,B:E}=dt(),{ct:h,wt:L,bt:k}=l||{},{lt:y}=i,[P,I]=a("paddingAbsolute");(h||p||(u||!E&&L))&&([f,p]=c(u));const q=!s&&(I||k||p);if(q){const M=!P||!e&&!H,X=f.r+f.l,v=f.t+f.b,C={[Me]:M&&!y?-X:0,[pe]:M?-v:0,[Re]:M&&y?-X:0,top:M?-f.t:0,right:M?y?-f.r:"auto":0,left:M?y?"auto":-f.l:0,[Pt]:M?`calc(100% + ${X}px)`:""},m={[Cs]:M?f.t:0,[_n]:M?f.r:0,[De]:M?f.b:0,[An]:M?f.l:0};Ft(e||n,C),Ft(n,m),Z(o,{Qt:f,cn:!M,k:e?m:Z({},C,m)})}return{rn:q}}},yc=({it:t,Qt:e,ut:n,tn:s,dt:o,ht:c,Dt:r,nn:a},l)=>{const i=R(He,0),u="visible",f=42,p={u:As,o:{w:0,h:0}},H={u:Hs,o:{x:ce,y:ce}},E=(w,d)=>{const _=mt.devicePixelRatio%1!==0?1:0,g={w:i(w.w-d.w),h:i(w.h-d.h)};return{w:g.w>_?g.w:0,h:g.h>_?g.h:0}},h=w=>w.indexOf(u)===0,{L,B:k,I:y,A:P}=dt(),I=ie(zn),W=!o&&!y&&(P.x||P.y),q=r&&o,[M,X]=wt(p,R(Fe,n)),[v,C]=wt(p,R($e,n)),[m,z]=wt(p),[D,T]=wt(p),[V]=wt(H),tt=(w,d)=>{if(Ft(n,{[Lt]:""}),d){const{cn:_,Qt:g}=l,{ln:K,M:b}=w,S=Fe(t),O=Ie(t),x=kt(n,"boxSizing")==="content-box",A=_||x?g.b+g.t:0,B=!(P.x&&x);Ft(n,{[Lt]:O.h+S.h+(K.x&&B?b.x:0)-A})}},U=(w,d)=>{const _=!y&&!w?f:0,g=(j,F,Y)=>{const Q=kt(n,j),lt=(d?d[j]:Q)==="scroll";return[Q,lt,lt&&!y?F?_:Y:0,F&&!!_]},[K,b,S,O]=g(ue,P.x,L.x),[x,A,B,$]=g(fe,P.y,L.y);return{Jt:{x:K,y:x},ln:{x:b,y:A},M:{x:S,y:B},R:{x:O,y:$}}},G=(w,d,_,g)=>{const K=(A,B)=>{const $=h(A),j=B&&$&&A.replace(`${u}-`,"")||"";return[B&&!$?A:"",h(j)?"hidden":j]},[b,S]=K(_.x,d.x),[O,x]=K(_.y,d.y);return g[ue]=S&&O?S:b,g[fe]=x&&b?x:O,U(w,g)},et=(w,d,_,g)=>{const{M:K,R:b}=w,{x:S,y:O}=b,{x,y:A}=K,{k:B}=l,$=d?Re:Me,j=d?An:_n,F=B[$],Y=B[pe],Q=B[j],rt=B[De];g[Pt]=`calc(100% + ${A+F*-1}px)`,g[$]=-A+F,g[pe]=-x+Y,_&&(g[j]=Q+(O?A:0),g[De]=rt+(S?x:0))},[st,N]=I?I.D(W,k,n,s,l,U,et):[()=>W,()=>[ht]];return({$t:w,Ft:d,en:_,Ot:g},{rn:K})=>{const{ct:b,yt:S,wt:O,gt:x,bt:A,St:B}=d||{},{rt:$,lt:j}=_,[F,Y]=w("showNativeOverlaidScrollbars"),[Q,rt]=w("overflow"),lt=F&&P.x&&P.y,gt=!o&&!k&&(b||O||S||Y||x),_t=b||K||O||A||B||Y,At=h(Q.x),Dt=h(Q.y),it=At||Dt;let at=X(g),ct=C(g),jt=z(g),qt=T(g),Rt;if(Y&&y&&c($s,Ro,!lt),gt&&(Rt=U(lt),tt(Rt,$)),_t){it&&c(oe,se,!1);const[Ut,Qt]=N(lt,j,Rt),[Wt,Ks]=at=M(g),[Zt,Ys]=ct=v(g),Qe=Ie(n);let Ze=Zt,tn=Qe;Ut(),(Ys||Ks||Y)&&Qt&&!lt&&st(Qt,Zt,Wt,j)&&(tn=Ie(n),Ze=$e(n));const Pn=Ho(a),Js={w:i(He(Zt.w,Ze.w)+Wt.w),h:i(He(Zt.h,Ze.h)+Wt.h)},Ln={w:i((q?Pn.w:tn.w+i(Qe.w-Zt.w))+Wt.w),h:i((q?Pn.h:tn.h+i(Qe.h-Zt.h))+Wt.h)};qt=D(Ln),jt=m(E(Js,Ln),g)}const[ge,we]=qt,[Yt,Se]=jt,[Ke,Ye]=ct,[Je,Oe]=at,vt={x:Yt.w>0,y:Yt.h>0},Jt=At&&Dt&&(vt.x||vt.y)||At&&vt.x&&!vt.y||Dt&&vt.y&&!vt.x;if(K||A||B||Oe||Ye||we||Se||rt||Y||gt||_t){const Ut={[Me]:0,[pe]:0,[Re]:0,[Pt]:"",[ue]:"",[fe]:""},Qt=G(lt,vt,Q,Ut),Wt=st(Qt,Ke,Je,j);o||et(Qt,j,Wt,Ut),gt&&tt(Qt,$),o?(ut(t,Rs,Ut[ue]),ut(t,Ms,Ut[fe])):Ft(n,Ut)}Xt(t,St,se,Jt),Xt(e,yn,Mo,Jt),o||Xt(n,$t,oe,it);const[Xs,Gs]=V(U(lt).Jt);return Z(l,{Jt:Xs,It:{x:ge.w,y:ge.h},zt:{x:Yt.w,y:Yt.h},Zt:vt}),{Kt:Gs,Xt:we,Yt:Se}}},gc=t=>{const[e,n,s]=vc(t),o={Qt:{t:0,r:0,b:0,l:0},cn:!1,k:{[Me]:0,[pe]:0,[Re]:0,[Cs]:0,[_n]:0,[De]:0,[An]:0},It:{x:0,y:0},zt:{x:0,y:0},Jt:{x:ce,y:ce},Zt:{x:!1,y:!1}},{At:c,ut:r,ht:a,dt:l}=e,{I:i,A:u,B:f}=dt(),p=!i&&(u.x||u.y),H=[bc(e),hc(e,o),yc(e,o)];return[n,E=>{const h={},k=(p||!f)&&re(r);return a("",Ne,!0),J(H,y=>{Z(h,y(E,h)||{})}),a("",Ne),Vt(r,k),!l&&Vt(c,0),h},o,e,s]},wc=(t,e,n,s)=>{const[o,c,r,a,l]=gc(t),[i,u,f]=uc(a,k=>{L({},k)}),[p,H,,E]=mc(t,e,f,r,a,s),h=k=>Tt(k).some(y=>!!k[y]),L=(k,y)=>{const{an:P,Ot:I,xt:W,un:q}=k,M=P||{},X=!!I,v={$t:Lo(e,M,X),an:M,Ot:X};if(q)return H(v),!1;const C=y||u(Z({},v,{xt:W})),m=c(Z({},v,{en:f,Ft:C}));H(Z({},v,{Ft:C,Wt:m}));const z=h(C),D=h(m),T=z||D||!On(M)||X;return T&&n(k,{Ft:C,Wt:m}),T};return[()=>{const{At:k,ut:y,Gt:P,Dt:I}=a,W=I?P.documentElement:k,q=re(W),M=[i(),o(),p()];return Vt(y,q),R(yt,M)},L,()=>({fn:f,_n:r}),{dn:a,vn:E},l]},Nt=(t,e,n)=>{const{q:s}=dt(),o=de(t),c=o?t:t.target,r=qs(c);if(e&&!r){let a=!1;const l=[],i={},u=C=>{const m=hs(C,!0),z=ie(Jo);return z?z(m,!0):m},f=Z({},s(),u(e)),[p,H,E]=hn(),[h,L,k]=hn(n),y=(C,m)=>{k(C,m),E(C,m)},[P,I,W,q,M]=wc(t,f,({an:C,Ot:m},{Ft:z,Wt:D})=>{const{ct:T,bt:V,gt:tt,wt:U,yt:G,st:et}=z,{Xt:st,Yt:N,Kt:w}=D;y("updated",[v,{updateHints:{sizeChanged:!!T,directionChanged:!!V,heightIntrinsicChanged:!!tt,overflowEdgeChanged:!!st,overflowAmountChanged:!!N,overflowStyleChanged:!!w,contentMutation:!!U,hostMutation:!!G,appear:!!et},changedOptions:C||{},force:!!m}])},C=>y("scroll",[v,C])),X=C=>{lc(c),yt(l),a=!0,y("destroyed",[v,C]),H(),L()},v={options(C,m){if(C){const z=m?s():{},D=ks(f,Z(z,u(C)));On(D)||(Z(f,D),I({an:D}))}return Z({},f)},on:h,off:(C,m)=>{C&&m&&L(C,m)},state(){const{fn:C,_n:m}=W(),{lt:z}=C,{It:D,zt:T,Jt:V,Zt:tt,Qt:U,cn:G}=m;return Z({},{overflowEdge:D,overflowAmount:T,overflowStyle:V,hasOverflow:tt,padding:U,paddingAbsolute:G,directionRTL:z,destroyed:a})},elements(){const{At:C,it:m,Qt:z,ut:D,ft:T,Tt:V,qt:tt}=q.dn,{Vt:U,Nt:G}=q.vn,et=N=>{const{Ht:w,Ct:d,kt:_}=N;return{scrollbar:_,track:d,handle:w}},st=N=>{const{Ut:w,Bt:d}=N,_=et(w[0]);return Z({},_,{clone:()=>{const g=et(d());return I({un:!0}),g}})};return Z({},{target:C,host:m,padding:z||D,viewport:D,content:T||D,scrollOffsetElement:V,scrollEventElement:tt,scrollbarHorizontal:st(U),scrollbarVertical:st(G)})},update:C=>I({Ot:C,xt:!0}),destroy:R(X,!1),plugin:C=>i[Tt(C)[0]]};return nt(l,[M]),rc(c,v),Vs(Ns,Nt,[v,p,i]),cc(q.dn.Dt,!o&&t.cancel)?(X(!0),v):(nt(l,P()),y("initialized",[v]),v.update(!0),v)}return r};Nt.plugin=t=>{const e=Ct(t),n=e?t:[t],s=n.map(o=>Vs(o,Nt)[0]);return Yo(n),e?s:s[0]};Nt.valid=t=>{const e=t&&t.elements,n=Et(e)&&e();return ze(n)&&!!qs(n.target)};Nt.env=()=>{const{L:t,A:e,I:n,U:s,B:o,T:c,V:r,W:a,X:l,N:i,G:u,q:f,F:p}=dt();return Z({},{scrollbarsSize:t,scrollbarsOverlaid:e,scrollbarsHiding:n,rtlScrollBehavior:s,flexboxGlue:o,cssCustomProperties:c,scrollTimeline:r,staticDefaultInitialization:a,staticDefaultOptions:l,getDefaultInitialization:i,setDefaultInitialization:u,getDefaultOptions:f,setDefaultOptions:p})};const Sc=()=>{if(typeof window>"u"){const i=()=>{};return[i,i]}let t,e;const n=window,s=typeof n.requestIdleCallback=="function",o=n.requestAnimationFrame,c=n.cancelAnimationFrame,r=s?n.requestIdleCallback:o,a=s?n.cancelIdleCallback:c,l=()=>{a(t),c(e)};return[(i,u)=>{l(),t=r(s?()=>{l(),e=o(i)}:i,typeof u=="object"?u:{timeout:2233})},l]};function an(t){let e,n,s;const o=t[12].default,c=no(o,t,t[11],null);let r=[{"data-overlayscrollbars-initialize":""},t[3]],a={};for(let l=0;l<r.length;l+=1)a=un(a,r[l]);return{c(){e=Mn(t[0]),n=Mn("div"),c&&c.c(),this.h()},l(l){e=$n(l,(t[0]||"null").toUpperCase(),{"data-overlayscrollbars-initialize":!0});var i=Fn(e);n=$n(i,"DIV",{"data-overlayscrollbars-contents":!0});var u=Fn(n);c&&c.l(u),u.forEach(Ae),i.forEach(Ae),this.h()},h(){so(n,"data-overlayscrollbars-contents",""),Nn(t[0])(e,a)},m(l,i){fs(l,e,i),oo(e,n),c&&c.m(n,null),t[13](n),t[14](e),s=!0},p(l,i){c&&c.p&&(!s||i&2048)&&co(c,o,l,l[11],s?lo(o,l[11],i,null):ro(l[11]),null),Nn(l[0])(e,a=uo(r,[{"data-overlayscrollbars-initialize":""},i&8&&l[3]]))},i(l){s||(ds(c,l),s=!0)},o(l){ps(c,l),s=!1},d(l){l&&Ae(e),c&&c.d(l),t[13](null),t[14](null)}}}function Oc(t){let e=t[0],n,s,o=t[0]&&an(t);return{c(){o&&o.c(),n=Dn()},l(c){o&&o.l(c),n=Dn()},m(c,r){o&&o.m(c,r),fs(c,n,r),s=!0},p(c,[r]){c[0]?e?us(e,c[0])?(o.d(1),o=an(c),e=c[0],o.c(),o.m(n.parentNode,n)):o.p(c,r):(o=an(c),e=c[0],o.c(),o.m(n.parentNode,n)):e&&(o.d(1),o=null,e=c[0])},i(c){s||(ds(o,c),s=!0)},o(c){ps(o,c),s=!1},d(c){c&&Ae(n),o&&o.d(c)}}}function xc(t,e,n){const s=["element","options","events","defer","osInstance","getElement"];let o=Rn(e,s),{$$slots:c={},$$scope:r}=e,{element:a="div"}=e,{options:l=void 0}=e,{events:i=void 0}=e,{defer:u=void 0}=e,f=null,p=null,H=null,E,h;const[L,k]=Sc(),y=()=>{const v=()=>{f==null||f.destroy(),n(9,f=Nt({target:p,elements:{viewport:H,content:H}},l||{},E||{}))};u?L(v,u):v(),h=a},P={initialized:"osInitialized",updated:"osUpdated",destroyed:"osDestroyed",scroll:"osScroll"},I=Qs(),W=()=>f,q=()=>p;Zs(()=>{k(),f==null||f.destroy()}),to(()=>{h!==a&&y()});function M(v){Bn[v?"unshift":"push"](()=>{H=v,n(2,H)})}function X(v){Bn[v?"unshift":"push"](()=>{p=v,n(1,p)})}return t.$$set=v=>{e=un(un({},e),eo(v)),n(3,o=Rn(e,s)),"element"in v&&n(0,a=v.element),"options"in v&&n(4,l=v.options),"events"in v&&n(5,i=v.events),"defer"in v&&n(6,u=v.defer),"$$scope"in v&&n(11,r=v.$$scope)},t.$$.update=()=>{if(t.$$.dirty&32){const v=i||{};n(10,E=Object.keys(P).reduce((C,m)=>{const z=v[m];return C[m]=[(...D)=>I(P[m],D),...(Array.isArray(z)?z:[z]).filter(Boolean)],C},{}))}t.$$.dirty&528&&Nt.valid(f)&&f.options(l||{},!0),t.$$.dirty&1536&&Nt.valid(f)&&f.on(E||{},!0)},[a,p,H,o,l,i,u,W,q,f,E,r,c,M,X]}class Ac extends io{constructor(e){super(),ao(this,e,xc,Oc,us,{element:0,options:4,events:5,defer:6,osInstance:7,getElement:8})}get osInstance(){return this.$$.ctx[7]}get getElement(){return this.$$.ctx[8]}}export{Ac as O};
