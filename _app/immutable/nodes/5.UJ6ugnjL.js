import{s as F,e as D,t as Q,a as C,c as I,b as N,d as x,f as h,g as B,l as k,i as S,h as M,j as ee,A as me,q as A,r as O,u as te,v as le,w as ne,x as se,y as re,B as Se,ae as Re,k as oe,aa as qe,o as pe,N as ae,ad as ie,n as Ce,ab as Oe}from"../chunks/scheduler.1g6hPacP.js";import{S as R,i as q,a as g,g as X,c as Z,t as w,b as T,d as P,m as y,e as H,h as fe}from"../chunks/index.26QDYMlJ.js";import{b as J,s as je,T as Ge,a as Ke}from"../chunks/SettingsItem.svelte_svelte_type_style_lang.0Jx-B-y0.js";import{e as j,g as ce,a as ue}from"../chunks/ButtonGroup.svelte_svelte_type_style_lang.SOLwJ6Wp.js";import{X as We,Y as Xe,Z as Ze,_ as Ye,$ as Je,a0 as Qe,a1 as xe,a2 as et,S as tt,T as lt,s as nt,a3 as st,a4 as rt,a5 as ot,a6 as at,a7 as it,a8 as ft,a9 as ct}from"../chunks/messages.dr2u_S2Y.js";import{B as he}from"../chunks/Button.H_i0UhvZ.js";import{I as de}from"../chunks/Icon.FzLWOJh8.js";import{w as ut}from"../chunks/entry.cC3cbjP8.js";import{O as dt}from"../chunks/OverlayScrollbarsComponent.dYEusQdv.js";import{M as Be,F as Ae}from"../chunks/Modal.FhQRYRJg.js";import{T as ge}from"../chunks/TextInput.w2nVcPaA.js";import{p as ht}from"../chunks/index.WU7GKHzp.js";const ve=(r,e,s=null)=>{if(Array.isArray(e))return e.reduce((n,l)=>n?n[l]:s,r);if(typeof e=="string")return r[e]};function be(r,e,s){const n=r.slice();return n[6]=e[s],n}function we(r){let e,s;return{c(){e=D("div"),s=Q(r[2]),this.h()},l(n){e=I(n,"DIV",{class:!0});var l=N(e);s=x(l,r[2]),l.forEach(h),this.h()},h(){k(e,"class","badge svelte-gh55de")},m(n,l){S(n,e,l),M(e,s)},p(n,l){l&4&&ee(s,n[2])},d(n){n&&h(e)}}}function Ee(r){let e,s;return{c(){e=D("div"),s=Q(r[1]),this.h()},l(n){e=I(n,"DIV",{class:!0});var l=N(e);s=x(l,r[1]),l.forEach(h),this.h()},h(){k(e,"class","description svelte-gh55de")},m(n,l){S(n,e,l),M(e,s)},p(n,l){l&2&&ee(s,n[1])},d(n){n&&h(e)}}}function Me(r){let e,s;function n(){return r[5](r[6])}return e=new he({props:{hierarchy:r[6].hierarchy,iconLeft:r[6].icon,text:r[6].text}}),e.$on("click",n),{c(){T(e.$$.fragment)},l(l){P(e.$$.fragment,l)},m(l,t){y(e,l,t),s=!0},p(l,t){r=l;const a={};t&8&&(a.hierarchy=r[6].hierarchy),t&8&&(a.iconLeft=r[6].icon),t&8&&(a.text=r[6].text),e.$set(a)},i(l){s||(g(e.$$.fragment,l),s=!0)},o(l){w(e.$$.fragment,l),s=!1},d(l){H(e,l)}}}function mt(r){let e,s,n,l,t,a,c,i,o,f,u,b,p,d=r[2]&&we(r),$=r[1]&&Ee(r),z=j(r[3]),v=[];for(let E=0;E<z.length;E+=1)v[E]=Me(be(r,z,E));const L=E=>w(v[E],1,1,()=>{v[E]=null});return{c(){e=D("div"),s=D("div"),n=D("div"),l=D("div"),t=D("div"),a=Q(r[0]),c=C(),d&&d.c(),i=C(),$&&$.c(),o=C(),f=D("div");for(let E=0;E<v.length;E+=1)v[E].c();u=C(),b=D("div"),this.h()},l(E){e=I(E,"DIV",{class:!0});var V=N(e);s=I(V,"DIV",{class:!0});var m=N(s);n=I(m,"DIV",{class:!0});var _=N(n);l=I(_,"DIV",{class:!0});var U=N(l);t=I(U,"DIV",{class:!0});var K=N(t);a=x(K,r[0]),K.forEach(h),c=B(U),d&&d.l(U),U.forEach(h),i=B(_),$&&$.l(_),_.forEach(h),o=B(m),f=I(m,"DIV",{class:!0});var W=N(f);for(let G=0;G<v.length;G+=1)v[G].l(W);W.forEach(h),m.forEach(h),u=B(V),b=I(V,"DIV",{class:!0}),N(b).forEach(h),V.forEach(h),this.h()},h(){k(t,"class","title svelte-gh55de"),k(l,"class","textAndBadge svelte-gh55de"),k(n,"class","allText svelte-gh55de"),k(f,"class","actions svelte-gh55de"),k(s,"class","content svelte-gh55de"),k(b,"class","divider svelte-gh55de"),k(e,"class","cardHeader svelte-gh55de")},m(E,V){S(E,e,V),M(e,s),M(s,n),M(n,l),M(l,t),M(t,a),M(l,c),d&&d.m(l,null),M(n,i),$&&$.m(n,null),M(s,o),M(s,f);for(let m=0;m<v.length;m+=1)v[m]&&v[m].m(f,null);M(e,u),M(e,b),p=!0},p(E,[V]){if((!p||V&1)&&ee(a,E[0]),E[2]?d?d.p(E,V):(d=we(E),d.c(),d.m(l,null)):d&&(d.d(1),d=null),E[1]?$?$.p(E,V):($=Ee(E),$.c(),$.m(n,null)):$&&($.d(1),$=null),V&24){z=j(E[3]);let m;for(m=0;m<z.length;m+=1){const _=be(E,z,m);v[m]?(v[m].p(_,V),g(v[m],1)):(v[m]=Me(_),v[m].c(),g(v[m],1),v[m].m(f,null))}for(X(),m=z.length;m<v.length;m+=1)L(m);Z()}},i(E){if(!p){for(let V=0;V<z.length;V+=1)g(v[V]);p=!0}},o(E){v=v.filter(Boolean);for(let V=0;V<v.length;V+=1)w(v[V]);p=!1},d(E){E&&h(e),d&&d.d(),$&&$.d(),me(v,E)}}}function gt(r,e,s){let{title:n="MISSING_MAIN_TEXT"}=e,{description:l=""}=e,{badge:t=""}=e,{controls:a=[]}=e,{rows:c}=e;const i=o=>o.onClick(c);return r.$$set=o=>{"title"in o&&s(0,n=o.title),"description"in o&&s(1,l=o.description),"badge"in o&&s(2,t=o.badge),"controls"in o&&s(3,a=o.controls),"rows"in o&&s(4,c=o.rows)},[n,l,t,a,c,i]}class _t extends R{constructor(e){super(),q(this,e,gt,mt,F,{title:0,description:1,badge:2,controls:3,rows:4})}}function $t(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function pt(r){let e,s;const n=[{name:"arrow-down"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[$t]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function vt(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["path",{d:"M12 5v14"}],["path",{d:"m19 12-7 7-7-7"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class bt extends R{constructor(e){super(),q(this,e,vt,pt,F,{})}}function ke(r){let e,s,n;return s=new bt({props:{size:16}}),{c(){e=D("div"),T(s.$$.fragment),this.h()},l(l){e=I(l,"DIV",{class:!0});var t=N(e);P(s.$$.fragment,t),t.forEach(h),this.h()},h(){k(e,"class","sortIcon svelte-abw24f"),re(e,"show",r[1].id===r[0].id&&r[1].direction!==0),re(e,"down",r[1].direction===-1)},m(l,t){S(l,e,t),y(s,e,null),n=!0},p(l,t){(!n||t&3)&&re(e,"show",l[1].id===l[0].id&&l[1].direction!==0),(!n||t&2)&&re(e,"down",l[1].direction===-1)},i(l){n||(g(s.$$.fragment,l),n=!0)},o(l){w(s.$$.fragment,l),n=!1},d(l){l&&h(e),H(s)}}}function wt(r){let e,s,n=r[0].text+"",l,t,a,c,i,o=r[0].sortable&&ke(r);return{c(){e=D("button"),s=D("div"),l=Q(n),t=C(),o&&o.c(),this.h()},l(f){e=I(f,"BUTTON",{class:!0});var u=N(e);s=I(u,"DIV",{class:!0});var b=N(s);l=x(b,n),b.forEach(h),t=B(u),o&&o.l(u),u.forEach(h),this.h()},h(){k(s,"class","th svelte-abw24f"),k(e,"class","thCell svelte-abw24f"),re(e,"sortable",r[0].sortable)},m(f,u){S(f,e,u),M(e,s),M(s,l),M(e,t),o&&o.m(e,null),a=!0,c||(i=Se(e,"click",r[3]),c=!0)},p(f,[u]){(!a||u&1)&&n!==(n=f[0].text+"")&&ee(l,n),f[0].sortable?o?(o.p(f,u),u&1&&g(o,1)):(o=ke(f),o.c(),g(o,1),o.m(e,null)):o&&(X(),w(o,1,1,()=>{o=null}),Z()),(!a||u&1)&&re(e,"sortable",f[0].sortable)},i(f){a||(g(o),a=!0)},o(f){w(o),a=!1},d(f){f&&h(e),o&&o.d(),c=!1,i()}}}function Et(r,e,s){let n,l,{data:t={}}=e;const a={id:"",text:"",sortable:!0},{sortHeader:c}=Re("dataTable");oe(r,c,o=>s(1,l=o));function i(){n.sortable&&c.change(n.id)}return r.$$set=o=>{"data"in o&&s(4,t=o.data)},r.$$.update=()=>{r.$$.dirty&16&&s(0,n={...a,...t})},[n,l,c,i,t]}class Le extends R{constructor(e){super(),q(this,e,Et,wt,F,{data:4})}}function Mt(r){let e,s;const n=r[1].default,l=te(n,r,r[0],null);return{c(){e=D("div"),l&&l.c(),this.h()},l(t){e=I(t,"DIV",{class:!0});var a=N(e);l&&l.l(a),a.forEach(h),this.h()},h(){k(e,"class","tableCell svelte-1y85d5")},m(t,a){S(t,e,a),l&&l.m(e,null),s=!0},p(t,[a]){l&&l.p&&(!s||a&1)&&le(l,n,t,t[0],s?se(n,t[0],a,null):ne(t[0]),null)},i(t){s||(g(l,t),s=!0)},o(t){w(l,t),s=!1},d(t){t&&h(e),l&&l.d(t)}}}function kt(r,e,s){let{$$slots:n={},$$scope:l}=e;return r.$$set=t=>{"$$scope"in t&&s(0,l=t.$$scope)},[l,n]}class Ue extends R{constructor(e){super(),q(this,e,kt,Mt,F,{})}}function Dt(){const{subscribe:r,set:e,update:s}=ut({id:"",direction:0});return{subscribe:r,set:e,update:s,change:n=>s(l=>l.id!==n?{id:n,direction:1}:(l.direction===1?l.direction=-1:l.direction+=1,l))}}function De(r,e,s){const n=r.slice();return n[8]=e[s],n[10]=s,n}function Ie(r,e,s){const n=r.slice();return n[11]=e[s],n}function Ne(r,e,s){const n=r.slice();return n[14]=e[s],n}function Ve(r,e,s){const n=r.slice();return n[8]=e[s],n}function It(r){let e=(r[8][r[14].id]??"")+"",s;return{c(){s=Q(e)},l(n){s=x(n,e)},m(n,l){S(n,s,l)},p(n,l){l&5&&e!==(e=(n[8][n[14].id]??"")+"")&&ee(s,e)},d(n){n&&h(s)}}}function Te(r){let e,s;return e=new Ue({props:{$$slots:{default:[It]},$$scope:{ctx:r}}}),{c(){T(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,l){y(e,n,l),s=!0},p(n,l){const t={};l&524293&&(t.$$scope={dirty:l,ctx:n}),e.$set(t)},i(n){s||(g(e.$$.fragment,n),s=!0)},o(n){w(e.$$.fragment,n),s=!1},d(n){H(e,n)}}}function ye(r){let e,s,n,l;s=new Le({props:{data:r[14]}});let t=j(r[2]),a=[];for(let i=0;i<t.length;i+=1)a[i]=Te(Ve(r,t,i));const c=i=>w(a[i],1,1,()=>{a[i]=null});return{c(){e=D("div"),T(s.$$.fragment),n=C();for(let i=0;i<a.length;i+=1)a[i].c();this.h()},l(i){e=I(i,"DIV",{class:!0});var o=N(e);P(s.$$.fragment,o),n=B(o);for(let f=0;f<a.length;f+=1)a[f].l(o);o.forEach(h),this.h()},h(){k(e,"class","column svelte-ey5zta")},m(i,o){S(i,e,o),y(s,e,null),M(e,n);for(let f=0;f<a.length;f+=1)a[f]&&a[f].m(e,null);l=!0},p(i,o){const f={};if(o&1&&(f.data=i[14]),s.$set(f),o&5){t=j(i[2]);let u;for(u=0;u<t.length;u+=1){const b=Ve(i,t,u);a[u]?(a[u].p(b,o),g(a[u],1)):(a[u]=Te(b),a[u].c(),g(a[u],1),a[u].m(e,null))}for(X(),u=t.length;u<a.length;u+=1)c(u);Z()}},i(i){if(!l){g(s.$$.fragment,i);for(let o=0;o<t.length;o+=1)g(a[o]);l=!0}},o(i){w(s.$$.fragment,i),a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)w(a[o]);l=!1},d(i){i&&h(e),H(s),me(a,i)}}}function He(r){let e,s,n,l;s=new Le({props:{data:{sortable:!1}}});let t=j(r[2]),a=[];for(let i=0;i<t.length;i+=1)a[i]=ze(De(r,t,i));const c=i=>w(a[i],1,1,()=>{a[i]=null});return{c(){e=D("div"),T(s.$$.fragment),n=C();for(let i=0;i<a.length;i+=1)a[i].c();this.h()},l(i){e=I(i,"DIV",{class:!0});var o=N(e);P(s.$$.fragment,o),n=B(o);for(let f=0;f<a.length;f+=1)a[f].l(o);o.forEach(h),this.h()},h(){k(e,"class","column svelte-ey5zta")},m(i,o){S(i,e,o),y(s,e,null),M(e,n);for(let f=0;f<a.length;f+=1)a[f]&&a[f].m(e,null);l=!0},p(i,o){if(o&6){t=j(i[2]);let f;for(f=0;f<t.length;f+=1){const u=De(i,t,f);a[f]?(a[f].p(u,o),g(a[f],1)):(a[f]=ze(u),a[f].c(),g(a[f],1),a[f].m(e,null))}for(X(),f=t.length;f<a.length;f+=1)c(f);Z()}},i(i){if(!l){g(s.$$.fragment,i);for(let o=0;o<t.length;o+=1)g(a[o]);l=!0}},o(i){w(s.$$.fragment,i),a=a.filter(Boolean);for(let o=0;o<a.length;o+=1)w(a[o]);l=!1},d(i){i&&h(e),H(s),me(a,i)}}}function Pe(r){let e,s,n,l,t,a;var c=r[11].icon;function i(f,u){return{props:{size:20}}}c&&(s=pe(c,i()));function o(){return r[6](r[11],r[8],r[10])}return{c(){e=D("button"),s&&T(s.$$.fragment),n=C(),this.h()},l(f){e=I(f,"BUTTON",{class:!0});var u=N(e);s&&P(s.$$.fragment,u),n=B(u),u.forEach(h),this.h()},h(){k(e,"class","action svelte-ey5zta")},m(f,u){S(f,e,u),s&&y(s,e,null),M(e,n),l=!0,t||(a=Se(e,"click",o),t=!0)},p(f,u){if(r=f,u&2&&c!==(c=r[11].icon)){if(s){X();const b=s;w(b.$$.fragment,1,0,()=>{H(b,1)}),Z()}c?(s=pe(c,i()),T(s.$$.fragment),g(s.$$.fragment,1),y(s,e,n)):s=null}},i(f){l||(s&&g(s.$$.fragment,f),l=!0)},o(f){s&&w(s.$$.fragment,f),l=!1},d(f){f&&h(e),s&&H(s),t=!1,a()}}}function Nt(r){let e,s,n,l=j(r[1].controls),t=[];for(let c=0;c<l.length;c+=1)t[c]=Pe(Ie(r,l,c));const a=c=>w(t[c],1,1,()=>{t[c]=null});return{c(){e=D("div");for(let c=0;c<t.length;c+=1)t[c].c();s=C(),this.h()},l(c){e=I(c,"DIV",{class:!0});var i=N(e);for(let o=0;o<t.length;o+=1)t[o].l(i);i.forEach(h),s=B(c),this.h()},h(){k(e,"class","actions svelte-ey5zta")},m(c,i){S(c,e,i);for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(e,null);S(c,s,i),n=!0},p(c,i){if(i&6){l=j(c[1].controls);let o;for(o=0;o<l.length;o+=1){const f=Ie(c,l,o);t[o]?(t[o].p(f,i),g(t[o],1)):(t[o]=Pe(f),t[o].c(),g(t[o],1),t[o].m(e,null))}for(X(),o=l.length;o<t.length;o+=1)a(o);Z()}},i(c){if(!n){for(let i=0;i<l.length;i+=1)g(t[i]);n=!0}},o(c){t=t.filter(Boolean);for(let i=0;i<t.length;i+=1)w(t[i]);n=!1},d(c){c&&(h(e),h(s)),me(t,c)}}}function ze(r){let e,s;return e=new Ue({props:{$$slots:{default:[Nt]},$$scope:{ctx:r}}}),{c(){T(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,l){y(e,n,l),s=!0},p(n,l){const t={};l&524294&&(t.$$scope={dirty:l,ctx:n}),e.$set(t)},i(n){s||(g(e.$$.fragment,n),s=!0)},o(n){w(e.$$.fragment,n),s=!1},d(n){H(e,n)}}}function Vt(r){let e,s,n,l=j(r[0]),t=[];for(let i=0;i<l.length;i+=1)t[i]=ye(Ne(r,l,i));const a=i=>w(t[i],1,1,()=>{t[i]=null});let c=r[1].controls&&He(r);return{c(){e=D("div");for(let i=0;i<t.length;i+=1)t[i].c();s=C(),c&&c.c(),this.h()},l(i){e=I(i,"DIV",{class:!0});var o=N(e);for(let f=0;f<t.length;f+=1)t[f].l(o);s=B(o),c&&c.l(o),o.forEach(h),this.h()},h(){k(e,"class","content svelte-ey5zta")},m(i,o){S(i,e,o);for(let f=0;f<t.length;f+=1)t[f]&&t[f].m(e,null);M(e,s),c&&c.m(e,null),n=!0},p(i,o){if(o&5){l=j(i[0]);let f;for(f=0;f<l.length;f+=1){const u=Ne(i,l,f);t[f]?(t[f].p(u,o),g(t[f],1)):(t[f]=ye(u),t[f].c(),g(t[f],1),t[f].m(e,s))}for(X(),f=l.length;f<t.length;f+=1)a(f);Z()}i[1].controls?c?(c.p(i,o),o&2&&g(c,1)):(c=He(i),c.c(),g(c,1),c.m(e,null)):c&&(X(),w(c,1,1,()=>{c=null}),Z())},i(i){if(!n){for(let o=0;o<l.length;o+=1)g(t[o]);g(c),n=!0}},o(i){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)w(t[o]);w(c),n=!1},d(i){i&&h(e),me(t,i),c&&c.d()}}}function Tt(r){var a,c,i;let e,s,n,l,t;return s=new _t({props:{title:(a=r[1].title)==null?void 0:a.text,badge:((c=r[1].title)==null?void 0:c.badge)??"",description:((i=r[1].title)==null?void 0:i.description)??"",controls:r[1].title.controls??[],rows:r[2]}}),l=new dt({props:{style:"width: 100%;",$$slots:{default:[Vt]},$$scope:{ctx:r}}}),{c(){e=D("div"),T(s.$$.fragment),n=C(),T(l.$$.fragment),this.h()},l(o){e=I(o,"DIV",{class:!0});var f=N(e);P(s.$$.fragment,f),n=B(f),P(l.$$.fragment,f),f.forEach(h),this.h()},h(){k(e,"class","tableWrapper svelte-ey5zta")},m(o,f){S(o,e,f),y(s,e,null),M(e,n),y(l,e,null),t=!0},p(o,[f]){var p,d,$;const u={};f&2&&(u.title=(p=o[1].title)==null?void 0:p.text),f&2&&(u.badge=((d=o[1].title)==null?void 0:d.badge)??""),f&2&&(u.description=(($=o[1].title)==null?void 0:$.description)??""),f&2&&(u.controls=o[1].title.controls??[]),f&4&&(u.rows=o[2]),s.$set(u);const b={};f&524295&&(b.$$scope={dirty:f,ctx:o}),l.$set(b)},i(o){t||(g(s.$$.fragment,o),g(l.$$.fragment,o),t=!0)},o(o){w(s.$$.fragment,o),w(l.$$.fragment,o),t=!1},d(o){o&&h(e),H(s),H(l)}}}function yt(r,e,s){let n,l,{headers:t}=e,{rows:a}=e,{options:c}=e;const i=Dt();oe(r,i,u=>s(5,l=u));function o(u,{id:b,direction:p}){return p===0?u:[...u].sort((d,$)=>{const z=ve(d,b,""),v=ve($,b,"");return typeof z=="number"&&typeof v=="number"?(z-v)*p:z.toString().localeCompare(v.toString(),"en",{numeric:!0})*p})}qe("dataTable",{sortHeader:i});const f=(u,b,p)=>u.onClick(b,p);return r.$$set=u=>{"headers"in u&&s(0,t=u.headers),"rows"in u&&s(4,a=u.rows),"options"in u&&s(1,c=u.options)},r.$$.update=()=>{r.$$.dirty&48&&s(2,n=o(a,l))},[t,c,n,i,a,l,f]}class Ht extends R{constructor(e){super(),q(this,e,yt,Tt,F,{headers:0,rows:4,options:1})}}function Pt(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function zt(r){let e,s;const n=[{name:"file-pen-line"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[Pt]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function St(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["path",{d:"M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L18 5.5"}],["path",{d:"M8 18h1"}],["path",{d:"M18.4 9.6a2 2 0 0 1 3 3L17 17l-4 1 1-4Z"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class Ct extends R{constructor(e){super(),q(this,e,St,zt,F,{})}}const Bt=Ct;function At(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function Lt(r){let e,s;const n=[{name:"user-round-plus"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[At]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function Ut(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["path",{d:"M2 21a8 8 0 0 1 13.292-6"}],["circle",{cx:"10",cy:"8",r:"5"}],["path",{d:"M19 16v6"}],["path",{d:"M22 19h-6"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class Ft extends R{constructor(e){super(),q(this,e,Ut,Lt,F,{})}}const Rt=Ft;function qt(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function Ot(r){let e,s;const n=[{name:"trash-2"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[qt]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function jt(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class Gt extends R{constructor(e){super(),q(this,e,jt,Ot,F,{})}}const Kt=Gt;function Wt(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function Xt(r){let e,s;const n=[{name:"user"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[Wt]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function Zt(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class Yt extends R{constructor(e){super(),q(this,e,Zt,Xt,F,{})}}const Fe=Yt;function Jt(r){let e;const s=r[2].default,n=te(s,r,r[3],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,t){n&&n.m(l,t),e=!0},p(l,t){n&&n.p&&(!e||t&8)&&le(n,s,l,l[3],e?se(s,l[3],t,null):ne(l[3]),null)},i(l){e||(g(n,l),e=!0)},o(l){w(n,l),e=!1},d(l){n&&n.d(l)}}}function Qt(r){let e,s;const n=[{name:"search"},r[1],{iconNode:r[0]}];let l={$$slots:{default:[Jt]},$$scope:{ctx:r}};for(let t=0;t<n.length;t+=1)l=A(l,n[t]);return e=new de({props:l}),{c(){T(e.$$.fragment)},l(t){P(e.$$.fragment,t)},m(t,a){y(e,t,a),s=!0},p(t,[a]){const c=a&3?ce(n,[n[0],a&2&&ue(t[1]),a&1&&{iconNode:t[0]}]):{};a&8&&(c.$$scope={dirty:a,ctx:t}),e.$set(c)},i(t){s||(g(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){H(e,t)}}}function xt(r,e,s){let{$$slots:n={},$$scope:l}=e;const t=[["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]];return r.$$set=a=>{s(1,e=A(A({},e),O(a))),"$$scope"in a&&s(3,l=a.$$scope)},e=O(e),[t,e,n,l]}class el extends R{constructor(e){super(),q(this,e,xt,Qt,F,{})}}const tl=el;function ll(r){var v,L,E,V;let e,s,n,l,t,a,c,i,o,f,u,b,p,d,$,z;return n=new ge({props:{label:"Vekn ID",hint:Je(),type:"trailing-button",addonText:Qe(),icon:tl,value:((L=(v=r[4])==null?void 0:v.id)==null?void 0:L.toString())??""}}),n.$on("change",r[10]),n.$on("click-button",r[6]),a=new ge({props:{label:xe(),type:"default",value:((E=r[4])==null?void 0:E.firstName)??""}}),a.$on("change",r[11]),o=new ge({props:{label:et(),type:"default",value:((V=r[4])==null?void 0:V.lastName)??""}}),o.$on("change",r[12]),p=new he({props:{hierarchy:"secondary-gray",text:tt()}}),p.$on("click",r[13]),$=new he({props:{hierarchy:"primary",text:lt()}}),$.$on("click",r[14]),{c(){e=D("div"),s=D("div"),T(n.$$.fragment),l=C(),t=D("div"),T(a.$$.fragment),c=C(),i=D("div"),T(o.$$.fragment),f=C(),u=D("div"),b=D("div"),T(p.$$.fragment),d=C(),T($.$$.fragment),this.h()},l(m){e=I(m,"DIV",{class:!0});var _=N(e);s=I(_,"DIV",{class:!0});var U=N(s);P(n.$$.fragment,U),U.forEach(h),l=B(_),t=I(_,"DIV",{class:!0});var K=N(t);P(a.$$.fragment,K),K.forEach(h),c=B(_),i=I(_,"DIV",{class:!0});var W=N(i);P(o.$$.fragment,W),W.forEach(h),_.forEach(h),f=B(m),u=I(m,"DIV",{class:!0});var G=N(u);b=I(G,"DIV",{class:!0});var Y=N(b);P(p.$$.fragment,Y),d=B(Y),P($.$$.fragment,Y),Y.forEach(h),G.forEach(h),this.h()},h(){k(s,"class","row svelte-888zc3"),k(t,"class","row svelte-888zc3"),k(i,"class","row svelte-888zc3"),k(e,"class","modalContent svelte-888zc3"),k(b,"class","content svelte-888zc3"),k(u,"class","modalActions svelte-888zc3")},m(m,_){S(m,e,_),M(e,s),y(n,s,null),M(e,l),M(e,t),y(a,t,null),M(e,c),M(e,i),y(o,i,null),S(m,f,_),S(m,u,_),M(u,b),y(p,b,null),M(b,d),y($,b,null),z=!0},p(m,_){var G,Y,_e,$e;const U={};_&16&&(U.value=((Y=(G=m[4])==null?void 0:G.id)==null?void 0:Y.toString())??""),n.$set(U);const K={};_&16&&(K.value=((_e=m[4])==null?void 0:_e.firstName)??""),a.$set(K);const W={};_&16&&(W.value=(($e=m[4])==null?void 0:$e.lastName)??""),o.$set(W)},i(m){z||(g(n.$$.fragment,m),g(a.$$.fragment,m),g(o.$$.fragment,m),g(p.$$.fragment,m),g($.$$.fragment,m),z=!0)},o(m){w(n.$$.fragment,m),w(a.$$.fragment,m),w(o.$$.fragment,m),w(p.$$.fragment,m),w($.$$.fragment,m),z=!1},d(m){m&&(h(e),h(f),h(u)),H(n),H(a),H(o),H(p),H($)}}}function nl(r){let e,s,n,l,t,a,c,i,o,f,u;return n=new Ae({props:{type:"modern",size:"md",icon:Fe}}),{c(){e=D("div"),s=D("div"),T(n.$$.fragment),l=C(),t=D("div"),a=D("h2"),c=Q(r[1]),i=C(),o=D("h4"),f=Q(r[2]),this.h()},l(b){e=I(b,"DIV",{class:!0,slot:!0});var p=N(e);s=I(p,"DIV",{class:!0});var d=N(s);P(n.$$.fragment,d),l=B(d),t=I(d,"DIV",{class:!0});var $=N(t);a=I($,"H2",{class:!0});var z=N(a);c=x(z,r[1]),z.forEach(h),i=B($),o=I($,"H4",{class:!0});var v=N(o);f=x(v,r[2]),v.forEach(h),$.forEach(h),d.forEach(h),p.forEach(h),this.h()},h(){k(a,"class","svelte-888zc3"),k(o,"class","svelte-888zc3"),k(t,"class","allText svelte-888zc3"),k(s,"class","content svelte-888zc3"),k(e,"class","modalHeader svelte-888zc3"),k(e,"slot","header")},m(b,p){S(b,e,p),M(e,s),y(n,s,null),M(s,l),M(s,t),M(t,a),M(a,c),M(t,i),M(t,o),M(o,f),u=!0},p(b,p){(!u||p&2)&&ee(c,b[1]),(!u||p&4)&&ee(f,b[2])},i(b){u||(g(n.$$.fragment,b),u=!0)},o(b){w(n.$$.fragment,b),u=!1},d(b){b&&h(e),H(n)}}}function sl(r){let e,s,n,l;function t(i){r[15](i)}function a(i){r[16](i)}let c={$$slots:{header:[nl],default:[ll]},$$scope:{ctx:r}};return r[0]!==void 0&&(c.showModal=r[0]),r[3]!==void 0&&(c.dialog=r[3]),e=new Be({props:c}),ae.push(()=>fe(e,"showModal",t)),ae.push(()=>fe(e,"dialog",a)),e.$on("keypress",r[8]),{c(){T(e.$$.fragment)},l(i){P(e.$$.fragment,i)},m(i,o){y(e,i,o),l=!0},p(i,[o]){const f={};o&524318&&(f.$$scope={dirty:o,ctx:i}),!s&&o&1&&(s=!0,f.showModal=i[0],ie(()=>s=!1)),!n&&o&8&&(n=!0,f.dialog=i[3],ie(()=>n=!1)),e.$set(f)},i(i){l||(g(e.$$.fragment,i),l=!0)},o(i){w(e.$$.fragment,i),l=!1},d(i){H(e,i)}}}function rl(r,e,s){let n;oe(r,J,_=>s(17,n=_));let{showModal:l}=e,{id:t=-1}=e,a,c,i,o={};function f(_){if(_===-1){s(1,a=We()),s(2,c=Xe()),s(4,o={});return}s(1,a=Ze()),s(2,c=Ye()),s(4,o=n[_])}function u(_,U){U==="id"||U==="ratingConstructed"||U==="ratingLimited"?s(4,o[U]=parseInt(_.detail),o):s(4,o[U]=_.detail,o)}async function b(){const _=await ht.getPlayerDataByID(o.id??0);_&&s(4,o=_)}function p(){if(!o.id)throw new Error("Player id is missing");if(!o.firstName)throw new Error("Player first name is missing");if(!o.lastName)throw new Error("Player last name is missing");t===-1?J.add(o.id,o.firstName,o.lastName):J.updatePlayer(t,{id:o.id,firstName:o.firstName,lastName:o.lastName}),i.close()}function d(_){_.key==="Enter"&&p()}const $=_=>u(_,"id"),z=_=>u(_,"firstName"),v=_=>u(_,"lastName"),L=()=>i.close(),E=()=>p();function V(_){l=_,s(0,l)}function m(_){i=_,s(3,i)}return r.$$set=_=>{"showModal"in _&&s(0,l=_.showModal),"id"in _&&s(9,t=_.id)},r.$$.update=()=>{r.$$.dirty&512&&f(t)},[l,a,c,i,o,u,b,p,d,t,$,z,v,L,E,V,m]}class ol extends R{constructor(e){super(),q(this,e,rl,sl,F,{showModal:0,id:9})}}function al(r){let e,s,n,l,t,a,c,i;return t=new he({props:{hierarchy:"secondary-gray",text:"Cancel"}}),t.$on("click",r[5]),c=new he({props:{hierarchy:"primary-destructive",text:"Delete"}}),c.$on("click",r[6]),{c(){e=D("div"),s=C(),n=D("div"),l=D("div"),T(t.$$.fragment),a=C(),T(c.$$.fragment),this.h()},l(o){e=I(o,"DIV",{class:!0}),N(e).forEach(h),s=B(o),n=I(o,"DIV",{class:!0});var f=N(n);l=I(f,"DIV",{class:!0});var u=N(l);P(t.$$.fragment,u),a=B(u),P(c.$$.fragment,u),u.forEach(h),f.forEach(h),this.h()},h(){k(e,"class","modalContent svelte-1d8ewbo"),k(l,"class","content svelte-1d8ewbo"),k(n,"class","modalActions svelte-1d8ewbo")},m(o,f){S(o,e,f),S(o,s,f),S(o,n,f),M(n,l),y(t,l,null),M(l,a),y(c,l,null),i=!0},p:Ce,i(o){i||(g(t.$$.fragment,o),g(c.$$.fragment,o),i=!0)},o(o){w(t.$$.fragment,o),w(c.$$.fragment,o),i=!1},d(o){o&&(h(e),h(s),h(n)),H(t),H(c)}}}function il(r){let e,s,n,l,t,a=`<h2 class="svelte-1d8ewbo">Deletar usuário</h2> <h4 class="svelte-1d8ewbo">Você tem certeza que deseja remover o usuário? Você poderá inseri-lo novamente caso mude
					de ideia.</h4>`,c;return n=new Ae({props:{type:"modern",size:"md",icon:Fe}}),{c(){e=D("div"),s=D("div"),T(n.$$.fragment),l=C(),t=D("div"),t.innerHTML=a,this.h()},l(i){e=I(i,"DIV",{class:!0,slot:!0});var o=N(e);s=I(o,"DIV",{class:!0});var f=N(s);P(n.$$.fragment,f),l=B(f),t=I(f,"DIV",{class:!0,"data-svelte-h":!0}),Oe(t)!=="svelte-32yz32"&&(t.innerHTML=a),f.forEach(h),o.forEach(h),this.h()},h(){k(t,"class","allText svelte-1d8ewbo"),k(s,"class","content svelte-1d8ewbo"),k(e,"class","modalHeader svelte-1d8ewbo"),k(e,"slot","header")},m(i,o){S(i,e,o),M(e,s),y(n,s,null),M(s,l),M(s,t),c=!0},p:Ce,i(i){c||(g(n.$$.fragment,i),c=!0)},o(i){w(n.$$.fragment,i),c=!1},d(i){i&&h(e),H(n)}}}function fl(r){let e,s,n,l;function t(i){r[7](i)}function a(i){r[8](i)}let c={size:"md",$$slots:{header:[il],default:[al]},$$scope:{ctx:r}};return r[0]!==void 0&&(c.showModal=r[0]),r[1]!==void 0&&(c.dialog=r[1]),e=new Be({props:c}),ae.push(()=>fe(e,"showModal",t)),ae.push(()=>fe(e,"dialog",a)),e.$on("keypress",r[3]),{c(){T(e.$$.fragment)},l(i){P(e.$$.fragment,i)},m(i,o){y(e,i,o),l=!0},p(i,[o]){const f={};o&1026&&(f.$$scope={dirty:o,ctx:i}),!s&&o&1&&(s=!0,f.showModal=i[0],ie(()=>s=!1)),!n&&o&2&&(n=!0,f.dialog=i[1],ie(()=>n=!1)),e.$set(f)},i(i){l||(g(e.$$.fragment,i),l=!0)},o(i){w(e.$$.fragment,i),l=!1},d(i){H(e,i)}}}function cl(r,e,s){let n;oe(r,je,p=>s(9,n=p));let{showModal:l}=e,{id:t=-1}=e,a;function c(){t!==-1&&(n.state===Ge.Starting?J.remove(t):J.updatePlayer(t,{dq:!0})),a.close()}function i(p){p.key==="Enter"&&c()}const o=()=>a.close(),f=()=>c();function u(p){l=p,s(0,l)}function b(p){a=p,s(1,a)}return r.$$set=p=>{"showModal"in p&&s(0,l=p.showModal),"id"in p&&s(4,t=p.id)},[l,a,c,i,t,o,f,u,b]}class ul extends R{constructor(e){super(),q(this,e,cl,fl,F,{showModal:0,id:4})}}function dl(r){let e,s,n,l,t,a,c,i,o;s=new Ht({props:{headers:r[5],rows:r[4],options:r[3]}});function f(d){r[7](d)}let u={id:r[2]};r[0]!==void 0&&(u.showModal=r[0]),l=new ol({props:u}),ae.push(()=>fe(l,"showModal",f));function b(d){r[8](d)}let p={id:r[2]};return r[1]!==void 0&&(p.showModal=r[1]),c=new ul({props:p}),ae.push(()=>fe(c,"showModal",b)),{c(){e=D("div"),T(s.$$.fragment),n=C(),T(l.$$.fragment),a=C(),T(c.$$.fragment),this.h()},l(d){e=I(d,"DIV",{class:!0});var $=N(e);P(s.$$.fragment,$),$.forEach(h),n=B(d),P(l.$$.fragment,d),a=B(d),P(c.$$.fragment,d),this.h()},h(){k(e,"class","wrapper svelte-1twokoo")},m(d,$){S(d,e,$),y(s,e,null),S(d,n,$),y(l,d,$),S(d,a,$),y(c,d,$),o=!0},p(d,[$]){const z={};$&16&&(z.rows=d[4]),$&8&&(z.options=d[3]),s.$set(z);const v={};$&4&&(v.id=d[2]),!t&&$&1&&(t=!0,v.showModal=d[0],ie(()=>t=!1)),l.$set(v);const L={};$&4&&(L.id=d[2]),!i&&$&2&&(i=!0,L.showModal=d[1],ie(()=>i=!1)),c.$set(L)},i(d){o||(g(s.$$.fragment,d),g(l.$$.fragment,d),g(c.$$.fragment,d),o=!0)},o(d){w(s.$$.fragment,d),w(l.$$.fragment,d),w(c.$$.fragment,d),o=!1},d(d){d&&(h(e),h(n),h(a)),H(s),H(l,d),H(c,d)}}}function hl(r){return r.map((e,s)=>({id:e.id,name:`${e.firstName} ${e.lastName}`,vp:e.vp,gw:e.gw,tp:e.tp,idx:s})).sort((e,s)=>e.gw!==s.gw?s.gw-e.gw:e.vp!==s.vp?s.vp-e.vp:s.tp-e.tp)}function ml(r,e,s){let n,l,t;oe(r,J,v=>s(6,l=v)),oe(r,Ke,v=>s(9,t=v)),nt.set("summary");let a,c,i=-1;function o(v){s(2,i=v.idx),a()}function f(v){s(2,i=v.idx),c()}function u(){s(2,i=-1),a()}function b(){const v=t,L=l,E={};L.forEach(V=>{E[V.id]={vp:0,gw:0,tp:0}}),v.forEach(V=>{V.tables.forEach(m=>{m.players.forEach(_=>{E[_.id].vp+=_.vp,E[_.id].gw+=_.gw,E[_.id].tp+=_.tp})})}),L.forEach((V,m)=>{L[m].vp=E[V.id].vp,L[m].gw=E[V.id].gw,L[m].tp=E[V.id].tp}),J.set(L)}b();let p;const d=[{id:"name",text:ct()},{id:"id",text:"Vekn ID"},{id:"gw",text:"GWs"},{id:"vp",text:"VPs"},{id:"tp",text:"TPs"}];function $(v){a=v,s(0,a)}function z(v){c=v,s(1,c)}return r.$$.update=()=>{r.$$.dirty&64&&s(3,p={title:{text:st(),badge:rt({count:l.length}),description:ot(),controls:[{hierarchy:"primary",onClick:u,text:at(),icon:Rt}]},controls:[{tooltip:it(),icon:Kt,onClick:f},{tooltip:ft(),icon:Bt,onClick:o}]}),r.$$.dirty&64&&s(4,n=hl(l))},[a,c,i,p,n,d,l,$,z]}class Nl extends R{constructor(e){super(),q(this,e,ml,dl,F,{})}}export{Nl as component};
