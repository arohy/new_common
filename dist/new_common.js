/**
 * @license
 * lodash lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 */
;(function(){function t(t,n){return t.set(n[0],n[1]),t}function n(t,n){return t.add(n),t}function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}function e(t,n,r,e){for(var u=-1,o=t?t.length:0;++u<o;){var i=t[u];n(e,i,r(i),t)}return e}function u(t,n){for(var r=-1,e=t?t.length:0;++r<e&&false!==n(t[r],r,t););return t}function o(t,n){for(var r=t?t.length:0;r--&&false!==n(t[r],r,t););
return t}function i(t,n){for(var r=-1,e=t?t.length:0;++r<e;)if(!n(t[r],r,t))return false;return true}function f(t,n){for(var r=-1,e=t?t.length:0,u=0,o=[];++r<e;){var i=t[r];n(i,r,t)&&(o[u++]=i)}return o}function c(t,n){return!(!t||!t.length)&&-1<d(t,n,0)}function a(t,n,r){for(var e=-1,u=t?t.length:0;++e<u;)if(r(n,t[e]))return true;return false}function l(t,n){for(var r=-1,e=t?t.length:0,u=Array(e);++r<e;)u[r]=n(t[r],r,t);return u}function s(t,n){for(var r=-1,e=n.length,u=t.length;++r<e;)t[u+r]=n[r];return t}function h(t,n,r,e){
var u=-1,o=t?t.length:0;for(e&&o&&(r=t[++u]);++u<o;)r=n(r,t[u],u,t);return r}function p(t,n,r,e){var u=t?t.length:0;for(e&&u&&(r=t[--u]);u--;)r=n(r,t[u],u,t);return r}function _(t,n){for(var r=-1,e=t?t.length:0;++r<e;)if(n(t[r],r,t))return true;return false}function v(t,n,r){var e;return r(t,function(t,r,u){return n(t,r,u)?(e=r,false):void 0}),e}function g(t,n,r,e){var u=t.length;for(r+=e?1:-1;e?r--:++r<u;)if(n(t[r],r,t))return r;return-1}function d(t,n,r){if(n!==n)return M(t,r);--r;for(var e=t.length;++r<e;)if(t[r]===n)return r;
return-1}function y(t,n,r,e){--r;for(var u=t.length;++r<u;)if(e(t[r],n))return r;return-1}function b(t,n){var r=t?t.length:0;return r?w(t,n)/r:V}function x(t,n,r,e,u){return u(t,function(t,u,o){r=e?(e=false,t):n(r,t,u,o)}),r}function j(t,n){var r=t.length;for(t.sort(n);r--;)t[r]=t[r].c;return t}function w(t,n){for(var r,e=-1,u=t.length;++e<u;){var o=n(t[e]);o!==T&&(r=r===T?o:r+o)}return r}function m(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}function A(t,n){return l(n,function(n){return[n,t[n]];
})}function O(t){return function(n){return t(n)}}function k(t,n){return l(n,function(n){return t[n]})}function E(t,n){return t.has(n)}function S(t,n){for(var r=-1,e=t.length;++r<e&&-1<d(n,t[r],0););return r}function I(t,n){for(var r=t.length;r--&&-1<d(n,t[r],0););return r}function R(t){return t&&t.Object===Object?t:null}function W(t){return zt[t]}function B(t){return Ut[t]}function L(t){return"\\"+Dt[t]}function M(t,n,r){var e=t.length;for(n+=r?1:-1;r?n--:++n<e;){var u=t[n];if(u!==u)return n}return-1;
}function C(t){var n=false;if(null!=t&&typeof t.toString!="function")try{n=!!(t+"")}catch(r){}return n}function z(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r}function U(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}function $(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r];i!==n&&"__lodash_placeholder__"!==i||(t[r]="__lodash_placeholder__",o[u++]=r)}return o}function D(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}function F(t){
var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=[t,t]}),r}function N(t){if(!t||!Wt.test(t))return t.length;for(var n=It.lastIndex=0;It.test(t);)n++;return n}function P(t){return $t[t]}function Z(R){function At(t,n){return R.setTimeout.call(Kt,t,n)}function Ot(t){if(Te(t)&&!yi(t)&&!(t instanceof Ut)){if(t instanceof zt)return t;if(Wu.call(t,"__wrapped__"))return ae(t)}return new zt(t)}function kt(){}function zt(t,n){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!n,this.__index__=0,
this.__values__=T}function Ut(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=false,this.__iteratees__=[],this.__takeCount__=4294967295,this.__views__=[]}function $t(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Dt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Pt(t){var n=-1,r=t?t.length:0;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}function Zt(t){var n=-1,r=t?t.length:0;
for(this.__data__=new Pt;++n<r;)this.add(t[n])}function qt(t){this.__data__=new Dt(t)}function Vt(t,n,r,e){return t===T||Ce(t,ku[r])&&!Wu.call(e,r)?n:t}function Jt(t,n,r){(r===T||Ce(t[n],r))&&(typeof n!="number"||r!==T||n in t)||(t[n]=r)}function Yt(t,n,r){var e=t[n];Wu.call(t,n)&&Ce(e,r)&&(r!==T||n in t)||(t[n]=r)}function Ht(t,n){for(var r=t.length;r--;)if(Ce(t[r][0],n))return r;return-1}function Qt(t,n,r,e){return Ao(t,function(t,u,o){n(e,t,r(t),o)}),e}function Xt(t,n){return t&&sr(n,iu(n),t)}
function tn(t,n){for(var r=-1,e=null==t,u=n.length,o=Array(u);++r<u;)o[r]=e?T:uu(t,n[r]);return o}function nn(t,n,r){return t===t&&(r!==T&&(t=r>=t?t:r),n!==T&&(t=t>=n?t:n)),t}function rn(t,n,r,e,o,i,f){var c;if(e&&(c=i?e(t,o,i,f):e(t)),c!==T)return c;if(!Ze(t))return t;if(o=yi(t)){if(c=Kr(t),!n)return lr(t,c)}else{var a=qr(t),l="[object Function]"==a||"[object GeneratorFunction]"==a;if(bi(t))return or(t,n);if("[object Object]"==a||"[object Arguments]"==a||l&&!i){if(C(t))return i?t:{};if(c=Gr(l?{}:t),
!n)return hr(t,Xt(c,t))}else{if(!Ct[a])return i?t:{};c=Jr(t,a,rn,n)}}if(f||(f=new qt),i=f.get(t))return i;if(f.set(t,c),!o)var s=r?gn(t,iu,Tr):iu(t);return u(s||t,function(u,o){s&&(o=u,u=t[o]),Yt(c,o,rn(u,n,r,e,o,t,f))}),c}function en(t){var n=iu(t),r=n.length;return function(e){if(null==e)return!r;for(var u=r;u--;){var o=n[u],i=t[o],f=e[o];if(f===T&&!(o in Object(e))||!i(f))return false}return true}}function un(t){return Ze(t)?Tu(t):{}}function on(t,n,r){if(typeof t!="function")throw new Au("Expected a function");
return At(function(){t.apply(T,r)},n)}function fn(t,n,r,e){var u=-1,o=c,i=true,f=t.length,s=[],h=n.length;if(!f)return s;r&&(n=l(n,O(r))),e?(o=a,i=false):n.length>=200&&(o=E,i=false,n=new Zt(n));t:for(;++u<f;){var p=t[u],_=r?r(p):p,p=e||0!==p?p:0;if(i&&_===_){for(var v=h;v--;)if(n[v]===_)continue t;s.push(p)}else o(n,_,e)||s.push(p)}return s}function cn(t,n){var r=true;return Ao(t,function(t,e,u){return r=!!n(t,e,u)}),r}function an(t,n,r){for(var e=-1,u=t.length;++e<u;){var o=t[e],i=n(o);if(null!=i&&(f===T?i===i&&!Je(i):r(i,f)))var f=i,c=o;
}return c}function ln(t,n){var r=[];return Ao(t,function(t,e,u){n(t,e,u)&&r.push(t)}),r}function sn(t,n,r,e,u){var o=-1,i=t.length;for(r||(r=Hr),u||(u=[]);++o<i;){var f=t[o];n>0&&r(f)?n>1?sn(f,n-1,r,e,u):s(u,f):e||(u[u.length]=f)}return u}function hn(t,n){return t&&ko(t,n,iu)}function pn(t,n){return t&&Eo(t,n,iu)}function _n(t,n){return f(n,function(n){return Fe(t[n])})}function vn(t,n){n=ne(n,t)?[n]:er(n);for(var r=0,e=n.length;null!=t&&e>r;)t=t[fe(n[r++])];return r&&r==e?t:T}function gn(t,n,r){
return n=n(t),yi(t)?n:s(n,r(t))}function dn(t,n){return t>n}function yn(t,n){return null!=t&&(Wu.call(t,n)||typeof t=="object"&&n in t&&null===Ju(Object(t)))}function bn(t,n){return null!=t&&n in Object(t)}function xn(t,n,r){for(var e=r?a:c,u=t[0].length,o=t.length,i=o,f=Array(o),s=1/0,h=[];i--;){var p=t[i];i&&n&&(p=l(p,O(n))),s=to(p.length,s),f[i]=!r&&(n||u>=120&&p.length>=120)?new Zt(i&&p):T}var p=t[0],_=-1,v=f[0];t:for(;++_<u&&s>h.length;){var g=p[_],d=n?n(g):g,g=r||0!==g?g:0;if(v?!E(v,d):!e(h,d,r)){
for(i=o;--i;){var y=f[i];if(y?!E(y,d):!e(t[i],d,r))continue t}v&&v.push(d),h.push(g)}}return h}function jn(t,n,r){var e={};return hn(t,function(t,u,o){n(e,r(t),u,o)}),e}function wn(t,n,e){return ne(n,t)||(n=er(n),t=ie(t,n),n=ve(n)),n=null==t?t:t[fe(n)],null==n?T:r(n,t,e)}function mn(t,n,r,e,u){if(t===n)n=true;else if(null==t||null==n||!Ze(t)&&!Te(n))n=t!==t&&n!==n;else t:{var o=yi(t),i=yi(n),f="[object Array]",c="[object Array]";o||(f=qr(t),f="[object Arguments]"==f?"[object Object]":f),i||(c=qr(n),
c="[object Arguments]"==c?"[object Object]":c);var a="[object Object]"==f&&!C(t),i="[object Object]"==c&&!C(n);if((c=f==c)&&!a)u||(u=new qt),n=o||Ye(t)?zr(t,n,mn,r,e,u):Ur(t,n,f,mn,r,e,u);else{if(!(2&e)&&(o=a&&Wu.call(t,"__wrapped__"),f=i&&Wu.call(n,"__wrapped__"),o||f)){t=o?t.value():t,n=f?n.value():n,u||(u=new qt),n=mn(t,n,r,e,u);break t}if(c)n:if(u||(u=new qt),o=2&e,f=iu(t),i=f.length,c=iu(n).length,i==c||o){for(a=i;a--;){var l=f[a];if(!(o?l in n:yn(n,l))){n=false;break n}}if(c=u.get(t))n=c==n;else{
c=true,u.set(t,n);for(var s=o;++a<i;){var l=f[a],h=t[l],p=n[l];if(r)var _=o?r(p,h,l,n,t,u):r(h,p,l,t,n,u);if(_===T?h!==p&&!mn(h,p,r,e,u):!_){c=false;break}s||(s="constructor"==l)}c&&!s&&(r=t.constructor,e=n.constructor,r!=e&&"constructor"in t&&"constructor"in n&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(c=false)),u["delete"](t),n=c}}else n=false;else n=false}}return n}function An(t,n,r,e){var u=r.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var f=r[u];if(i&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return false;
}for(;++u<o;){var f=r[u],c=f[0],a=t[c],l=f[1];if(i&&f[2]){if(a===T&&!(c in t))return false}else{if(f=new qt,e)var s=e(a,l,c,t,n,f);if(s===T?!mn(l,a,e,3,f):!s)return false}}return true}function On(t){return!Ze(t)||Iu&&Iu in t?false:(Fe(t)||C(t)?zu:yt).test(ce(t))}function kn(t){return typeof t=="function"?t:null==t?pu:typeof t=="object"?yi(t)?Wn(t[0],t[1]):Rn(t):du(t)}function En(t){t=null==t?t:Object(t);var n,r=[];for(n in t)r.push(n);return r}function Sn(t,n){return n>t}function In(t,n){var r=-1,e=Ue(t)?Array(t.length):[];
return Ao(t,function(t,u,o){e[++r]=n(t,u,o)}),e}function Rn(t){var n=Pr(t);return 1==n.length&&n[0][2]?ue(n[0][0],n[0][1]):function(r){return r===t||An(r,t,n)}}function Wn(t,n){return ne(t)&&n===n&&!Ze(n)?ue(fe(t),n):function(r){var e=uu(r,t);return e===T&&e===n?ou(r,t):mn(n,e,T,3)}}function Bn(t,n,r,e,o){if(t!==n){if(!yi(n)&&!Ye(n))var i=fu(n);u(i||n,function(u,f){if(i&&(f=u,u=n[f]),Ze(u)){o||(o=new qt);var c=f,a=o,l=t[c],s=n[c],h=a.get(s);if(h)Jt(t,c,h);else{var h=e?e(l,s,c+"",t,n,a):T,p=h===T;p&&(h=s,
yi(s)||Ye(s)?yi(l)?h=l:$e(l)?h=lr(l):(p=false,h=rn(s,true)):Ve(s)||ze(s)?ze(l)?h=ru(l):!Ze(l)||r&&Fe(l)?(p=false,h=rn(s,true)):h=l:p=false),a.set(s,h),p&&Bn(h,s,r,e,a),a["delete"](s),Jt(t,c,h)}}else c=e?e(t[f],u,f+"",t,n,o):T,c===T&&(c=u),Jt(t,f,c)})}}function Ln(t,n){var r=t.length;return r?(n+=0>n?r:0,Xr(n,r)?t[n]:T):void 0}function Mn(t,n,r){var e=-1;return n=l(n.length?n:[pu],O(Fr())),t=In(t,function(t){return{a:l(n,function(n){return n(t)}),b:++e,c:t}}),j(t,function(t,n){var e;t:{e=-1;for(var u=t.a,o=n.a,i=u.length,f=r.length;++e<i;){
var c=fr(u[e],o[e]);if(c){e=e>=f?c:c*("desc"==r[e]?-1:1);break t}}e=t.b-n.b}return e})}function Cn(t,n){return t=Object(t),h(n,function(n,r){return r in t&&(n[r]=t[r]),n},{})}function zn(t,n){for(var r=-1,e=gn(t,fu,Bo),u=e.length,o={};++r<u;){var i=e[r],f=t[i];n(f,i)&&(o[i]=f)}return o}function Un(t){return function(n){return null==n?T:n[t]}}function $n(t){return function(n){return vn(n,t)}}function Dn(t,n,r,e){var u=e?y:d,o=-1,i=n.length,f=t;for(t===n&&(n=lr(n)),r&&(f=l(t,O(r)));++o<i;)for(var c=0,a=n[o],a=r?r(a):a;-1<(c=u(f,a,c,e));)f!==t&&Vu.call(f,c,1),
Vu.call(t,c,1);return t}function Fn(t,n){for(var r=t?n.length:0,e=r-1;r--;){var u=n[r];if(r==e||u!==o){var o=u;if(Xr(u))Vu.call(t,u,1);else if(ne(u,t))delete t[fe(u)];else{var u=er(u),i=ie(t,u);null!=i&&delete i[fe(ve(u))]}}}}function Nn(t,n){return t+Gu(ro()*(n-t+1))}function Pn(t,n){var r="";if(!t||1>n||n>9007199254740991)return r;do n%2&&(r+=t),(n=Gu(n/2))&&(t+=t);while(n);return r}function Zn(t,n,r,e){n=ne(n,t)?[n]:er(n);for(var u=-1,o=n.length,i=o-1,f=t;null!=f&&++u<o;){var c=fe(n[u]);if(Ze(f)){
var a=r;if(u!=i){var l=f[c],a=e?e(l,c,f):T;a===T&&(a=null==l?Xr(n[u+1])?[]:{}:l)}Yt(f,c,a)}f=f[c]}return t}function Tn(t,n,r){var e=-1,u=t.length;for(0>n&&(n=-n>u?0:u+n),r=r>u?u:r,0>r&&(r+=u),u=n>r?0:r-n>>>0,n>>>=0,r=Array(u);++e<u;)r[e]=t[e+n];return r}function qn(t,n){var r;return Ao(t,function(t,e,u){return r=n(t,e,u),!r}),!!r}function Vn(t,n,r){var e=0,u=t?t.length:e;if(typeof n=="number"&&n===n&&2147483647>=u){for(;u>e;){var o=e+u>>>1,i=t[o];null!==i&&!Je(i)&&(r?n>=i:n>i)?e=o+1:u=o}return u}
return Kn(t,n,pu,r)}function Kn(t,n,r,e){n=r(n);for(var u=0,o=t?t.length:0,i=n!==n,f=null===n,c=Je(n),a=n===T;o>u;){var l=Gu((u+o)/2),s=r(t[l]),h=s!==T,p=null===s,_=s===s,v=Je(s);(i?e||_:a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):p||v?0:e?n>=s:n>s)?u=l+1:o=l}return to(o,4294967294)}function Gn(t,n){for(var r=-1,e=t.length,u=0,o=[];++r<e;){var i=t[r],f=n?n(i):i;if(!r||!Ce(f,c)){var c=f;o[u++]=0===i?0:i}}return o}function Jn(t){return typeof t=="number"?t:Je(t)?V:+t}function Yn(t){if(typeof t=="string")return t;
if(Je(t))return mo?mo.call(t):"";var n=t+"";return"0"==n&&1/t==-q?"-0":n}function Hn(t,n,r){var e=-1,u=c,o=t.length,i=true,f=[],l=f;if(r)i=false,u=a;else if(o>=200){if(u=n?null:Io(t))return D(u);i=false,u=E,l=new Zt}else l=n?[]:f;t:for(;++e<o;){var s=t[e],h=n?n(s):s,s=r||0!==s?s:0;if(i&&h===h){for(var p=l.length;p--;)if(l[p]===h)continue t;n&&l.push(h),f.push(s)}else u(l,h,r)||(l!==f&&l.push(h),f.push(s))}return f}function Qn(t,n,r,e){for(var u=t.length,o=e?u:-1;(e?o--:++o<u)&&n(t[o],o,t););return r?Tn(t,e?0:o,e?o+1:u):Tn(t,e?o+1:0,e?u:o);
}function Xn(t,n){var r=t;return r instanceof Ut&&(r=r.value()),h(n,function(t,n){return n.func.apply(n.thisArg,s([t],n.args))},r)}function tr(t,n,r){for(var e=-1,u=t.length;++e<u;)var o=o?s(fn(o,t[e],n,r),fn(t[e],o,n,r)):t[e];return o&&o.length?Hn(o,n,r):[]}function nr(t,n,r){for(var e=-1,u=t.length,o=n.length,i={};++e<u;)r(i,t[e],o>e?n[e]:T);return i}function rr(t){return $e(t)?t:[]}function er(t){return yi(t)?t:Co(t)}function ur(t,n,r){var e=t.length;return r=r===T?e:r,!n&&r>=e?t:Tn(t,n,r)}function or(t,n){
if(n)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}function ir(t){var n=new t.constructor(t.byteLength);return new Fu(n).set(new Fu(t)),n}function fr(t,n){if(t!==n){var r=t!==T,e=null===t,u=t===t,o=Je(t),i=n!==T,f=null===n,c=n===n,a=Je(n);if(!f&&!a&&!o&&t>n||o&&i&&c&&!f&&!a||e&&i&&c||!r&&c||!u)return 1;if(!e&&!o&&!a&&n>t||a&&r&&u&&!e&&!o||f&&r&&u||!i&&u||!c)return-1}return 0}function cr(t,n,r,e){var u=-1,o=t.length,i=r.length,f=-1,c=n.length,a=Xu(o-i,0),l=Array(c+a);for(e=!e;++f<c;)l[f]=n[f];
for(;++u<i;)(e||o>u)&&(l[r[u]]=t[u]);for(;a--;)l[f++]=t[u++];return l}function ar(t,n,r,e){var u=-1,o=t.length,i=-1,f=r.length,c=-1,a=n.length,l=Xu(o-f,0),s=Array(l+a);for(e=!e;++u<l;)s[u]=t[u];for(l=u;++c<a;)s[l+c]=n[c];for(;++i<f;)(e||o>u)&&(s[l+r[i]]=t[u++]);return s}function lr(t,n){var r=-1,e=t.length;for(n||(n=Array(e));++r<e;)n[r]=t[r];return n}function sr(t,n,r,e){r||(r={});for(var u=-1,o=n.length;++u<o;){var i=n[u],f=e?e(r[i],t[i],i,r,t):t[i];Yt(r,i,f)}return r}function hr(t,n){return sr(t,Tr(t),n);
}function pr(t,n){return function(r,u){var o=yi(r)?e:Qt,i=n?n():{};return o(r,t,Fr(u),i)}}function _r(t){return Me(function(n,r){var e=-1,u=r.length,o=u>1?r[u-1]:T,i=u>2?r[2]:T,o=t.length>3&&typeof o=="function"?(u--,o):T;for(i&&te(r[0],r[1],i)&&(o=3>u?T:o,u=1),n=Object(n);++e<u;)(i=r[e])&&t(n,i,e,o);return n})}function vr(t,n){return function(r,e){if(null==r)return r;if(!Ue(r))return t(r,e);for(var u=r.length,o=n?u:-1,i=Object(r);(n?o--:++o<u)&&false!==e(i[o],o,i););return r}}function gr(t){return function(n,r,e){
var u=-1,o=Object(n);e=e(n);for(var i=e.length;i--;){var f=e[t?i:++u];if(false===r(o[f],f,o))break}return n}}function dr(t,n,r){function e(){return(this&&this!==Kt&&this instanceof e?o:t).apply(u?r:this,arguments)}var u=1&n,o=xr(t);return e}function yr(t){return function(n){n=eu(n);var r=Wt.test(n)?n.match(It):T,e=r?r[0]:n.charAt(0);return n=r?ur(r,1).join(""):n.slice(1),e[t]()+n}}function br(t){return function(n){return h(su(lu(n).replace(Et,"")),t,"")}}function xr(t){return function(){var n=arguments;
switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3]);case 5:return new t(n[0],n[1],n[2],n[3],n[4]);case 6:return new t(n[0],n[1],n[2],n[3],n[4],n[5]);case 7:return new t(n[0],n[1],n[2],n[3],n[4],n[5],n[6])}var r=un(t.prototype),n=t.apply(r,n);return Ze(n)?n:r}}function jr(t,n,e){function u(){for(var i=arguments.length,f=Array(i),c=i,a=Dr(u);c--;)f[c]=arguments[c];return c=3>i&&f[0]!==a&&f[i-1]!==a?[]:$(f,a),
i-=c.length,e>i?Br(t,n,Ar,u.placeholder,T,f,c,T,T,e-i):r(this&&this!==Kt&&this instanceof u?o:t,this,f)}var o=xr(t);return u}function wr(t){return function(n,r,e){var u=Object(n);if(r=Fr(r,3),!Ue(n))var o=iu(n);return e=t(o||n,function(t,n){return o&&(n=t,t=u[n]),r(t,n,u)},e),e>-1?n[o?o[e]:e]:T}}function mr(t){return Me(function(n){n=sn(n,1);var r=n.length,e=r,u=zt.prototype.thru;for(t&&n.reverse();e--;){var o=n[e];if(typeof o!="function")throw new Au("Expected a function");if(u&&!i&&"wrapper"==$r(o))var i=new zt([],true);
}for(e=i?e:r;++e<r;)var o=n[e],u=$r(o),f="wrapper"==u?Ro(o):T,i=f&&re(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?i[$r(f[0])].apply(i,f[3]):1==o.length&&re(o)?i[u]():i.thru(o);return function(){var t=arguments,e=t[0];if(i&&1==t.length&&yi(e)&&e.length>=200)return i.plant(e).value();for(var u=0,t=r?n[u].apply(this,t):e;++u<r;)t=n[u].call(this,t);return t}})}function Ar(t,n,r,e,u,o,i,f,c,a){function l(){for(var d=arguments.length,y=Array(d),b=d;b--;)y[b]=arguments[b];if(_){var x,j=Dr(l),b=y.length;for(x=0;b--;)y[b]===j&&x++;
}if(e&&(y=cr(y,e,u,_)),o&&(y=ar(y,o,i,_)),d-=x,_&&a>d)return j=$(y,j),Br(t,n,Ar,l.placeholder,r,y,j,f,c,a-d);if(j=h?r:this,b=p?j[t]:t,d=y.length,f){x=y.length;for(var w=to(f.length,x),m=lr(y);w--;){var A=f[w];y[w]=Xr(A,x)?m[A]:T}}else v&&d>1&&y.reverse();return s&&d>c&&(y.length=c),this&&this!==Kt&&this instanceof l&&(b=g||xr(b)),b.apply(j,y)}var s=128&n,h=1&n,p=2&n,_=24&n,v=512&n,g=p?T:xr(t);return l}function Or(t,n){return function(r,e){return jn(r,t,n(e))}}function kr(t){return function(n,r){var e;
if(n===T&&r===T)return 0;if(n!==T&&(e=n),r!==T){if(e===T)return r;typeof n=="string"||typeof r=="string"?(n=Yn(n),r=Yn(r)):(n=Jn(n),r=Jn(r)),e=t(n,r)}return e}}function Er(t){return Me(function(n){return n=1==n.length&&yi(n[0])?l(n[0],O(Fr())):l(sn(n,1,Qr),O(Fr())),Me(function(e){var u=this;return t(n,function(t){return r(t,u,e)})})})}function Sr(t,n){n=n===T?" ":Yn(n);var r=n.length;return 2>r?r?Pn(n,t):n:(r=Pn(n,Ku(t/N(n))),Wt.test(n)?ur(r.match(It),0,t).join(""):r.slice(0,t))}function Ir(t,n,e,u){
function o(){for(var n=-1,c=arguments.length,a=-1,l=u.length,s=Array(l+c),h=this&&this!==Kt&&this instanceof o?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++n];return r(h,i?e:this,s)}var i=1&n,f=xr(t);return o}function Rr(t){return function(n,r,e){e&&typeof e!="number"&&te(n,r,e)&&(r=e=T),n=nu(n),n=n===n?n:0,r===T?(r=n,n=0):r=nu(r)||0,e=e===T?r>n?1:-1:nu(e)||0;var u=-1;r=Xu(Ku((r-n)/(e||1)),0);for(var o=Array(r);r--;)o[t?r:++u]=n,n+=e;return o}}function Wr(t){return function(n,r){return typeof n=="string"&&typeof r=="string"||(n=nu(n),
r=nu(r)),t(n,r)}}function Br(t,n,r,e,u,o,i,f,c,a){var l=8&n,s=l?i:T;i=l?T:i;var h=l?o:T;return o=l?T:o,n=(n|(l?32:64))&~(l?64:32),4&n||(n&=-4),n=[t,n,u,h,s,o,i,f,c,a],r=r.apply(T,n),re(t)&&Mo(r,n),r.placeholder=e,r}function Lr(t){var n=wu[t];return function(t,r){if(t=nu(t),r=to(Xe(r),292)){var e=(eu(t)+"e").split("e"),e=n(e[0]+"e"+(+e[1]+r)),e=(eu(e)+"e").split("e");return+(e[0]+"e"+(+e[1]-r))}return n(t)}}function Mr(t){return function(n){var r=qr(n);return"[object Map]"==r?U(n):"[object Set]"==r?F(n):A(n,t(n));
}}function Cr(t,n,r,e,u,o,i,f){var c=2&n;if(!c&&typeof t!="function")throw new Au("Expected a function");var a=e?e.length:0;if(a||(n&=-97,e=u=T),i=i===T?i:Xu(Xe(i),0),f=f===T?f:Xe(f),a-=u?u.length:0,64&n){var l=e,s=u;e=u=T}var h=c?T:Ro(t);return o=[t,n,r,e,u,l,s,o,i,f],h&&(r=o[1],t=h[1],n=r|t,e=128==t&&8==r||128==t&&256==r&&h[8]>=o[7].length||384==t&&h[8]>=h[7].length&&8==r,131>n||e)&&(1&t&&(o[2]=h[2],n|=1&r?0:4),(r=h[3])&&(e=o[3],o[3]=e?cr(e,r,h[4]):r,o[4]=e?$(o[3],"__lodash_placeholder__"):h[4]),
(r=h[5])&&(e=o[5],o[5]=e?ar(e,r,h[6]):r,o[6]=e?$(o[5],"__lodash_placeholder__"):h[6]),(r=h[7])&&(o[7]=r),128&t&&(o[8]=null==o[8]?h[8]:to(o[8],h[8])),null==o[9]&&(o[9]=h[9]),o[0]=h[0],o[1]=n),t=o[0],n=o[1],r=o[2],e=o[3],u=o[4],f=o[9]=null==o[9]?c?0:t.length:Xu(o[9]-a,0),!f&&24&n&&(n&=-25),(h?So:Mo)(n&&1!=n?8==n||16==n?jr(t,n,f):32!=n&&33!=n||u.length?Ar.apply(T,o):Ir(t,n,r,e):dr(t,n,r),o)}function zr(t,n,r,e,u,o){var i=2&u,f=t.length,c=n.length;if(f!=c&&!(i&&c>f))return false;if(c=o.get(t))return c==n;
var c=-1,a=true,l=1&u?new Zt:T;for(o.set(t,n);++c<f;){var s=t[c],h=n[c];if(e)var p=i?e(h,s,c,n,t,o):e(s,h,c,t,n,o);if(p!==T){if(p)continue;a=false;break}if(l){if(!_(n,function(t,n){return l.has(n)||s!==t&&!r(s,t,e,u,o)?void 0:l.add(n)})){a=false;break}}else if(s!==h&&!r(s,h,e,u,o)){a=false;break}}return o["delete"](t),a}function Ur(t,n,r,e,u,o,i){switch(r){case"[object DataView]":if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)break;t=t.buffer,n=n.buffer;case"[object ArrayBuffer]":if(t.byteLength!=n.byteLength||!e(new Fu(t),new Fu(n)))break;
return true;case"[object Boolean]":case"[object Date]":return+t==+n;case"[object Error]":return t.name==n.name&&t.message==n.message;case"[object Number]":return t!=+t?n!=+n:t==+n;case"[object RegExp]":case"[object String]":return t==n+"";case"[object Map]":var f=U;case"[object Set]":if(f||(f=D),t.size!=n.size&&!(2&o))break;return(r=i.get(t))?r==n:(o|=1,i.set(t,n),zr(f(t),f(n),e,u,o,i));case"[object Symbol]":if(wo)return wo.call(t)==wo.call(n)}return false}function $r(t){for(var n=t.name+"",r=_o[n],e=Wu.call(_o,n)?r.length:0;e--;){
var u=r[e],o=u.func;if(null==o||o==t)return u.name}return n}function Dr(t){return(Wu.call(Ot,"placeholder")?Ot:t).placeholder}function Fr(){var t=Ot.iteratee||_u,t=t===_u?kn:t;return arguments.length?t(arguments[0],arguments[1]):t}function Nr(t,n){var r=t.__data__,e=typeof n;return("string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==n:null===n)?r[typeof n=="string"?"string":"hash"]:r.map}function Pr(t){for(var n=iu(t),r=n.length;r--;){var e=n[r],u=t[e];n[r]=[e,u,u===u&&!Ze(u)]}return n;
}function Zr(t,n){var r=null==t?T:t[n];return On(r)?r:T}function Tr(t){return Pu(Object(t))}function qr(t){return Mu.call(t)}function Vr(t,n,r){n=ne(n,t)?[n]:er(n);for(var e,u=-1,o=n.length;++u<o;){var i=fe(n[u]);if(!(e=null!=t&&r(t,i)))break;t=t[i]}return e?e:(o=t?t.length:0,!!o&&Pe(o)&&Xr(i,o)&&(yi(t)||Ge(t)||ze(t)))}function Kr(t){var n=t.length,r=t.constructor(n);return n&&"string"==typeof t[0]&&Wu.call(t,"index")&&(r.index=t.index,r.input=t.input),r}function Gr(t){return typeof t.constructor!="function"||ee(t)?{}:un(Ju(Object(t)));
}function Jr(r,e,u,o){var i=r.constructor;switch(e){case"[object ArrayBuffer]":return ir(r);case"[object Boolean]":case"[object Date]":return new i(+r);case"[object DataView]":return e=o?ir(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.byteLength);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":
return e=o?ir(r.buffer):r.buffer,new r.constructor(e,r.byteOffset,r.length);case"[object Map]":return e=o?u(U(r),true):U(r),h(e,t,new r.constructor);case"[object Number]":case"[object String]":return new i(r);case"[object RegExp]":return e=new r.constructor(r.source,_t.exec(r)),e.lastIndex=r.lastIndex,e;case"[object Set]":return e=o?u(D(r),true):D(r),h(e,n,new r.constructor);case"[object Symbol]":return wo?Object(wo.call(r)):{}}}function Yr(t){var n=t?t.length:T;return Pe(n)&&(yi(t)||Ge(t)||ze(t))?m(n,String):null;
}function Hr(t){return yi(t)||ze(t)}function Qr(t){return yi(t)&&!(2==t.length&&!Fe(t[0]))}function Xr(t,n){return n=null==n?9007199254740991:n,!!n&&(typeof t=="number"||xt.test(t))&&t>-1&&0==t%1&&n>t}function te(t,n,r){if(!Ze(r))return false;var e=typeof n;return("number"==e?Ue(r)&&Xr(n,r.length):"string"==e&&n in r)?Ce(r[n],t):false}function ne(t,n){if(yi(t))return false;var r=typeof t;return"number"==r||"symbol"==r||"boolean"==r||null==t||Je(t)?true:ut.test(t)||!et.test(t)||null!=n&&t in Object(n)}function re(t){
var n=$r(t),r=Ot[n];return typeof r=="function"&&n in Ut.prototype?t===r?true:(n=Ro(r),!!n&&t===n[0]):false}function ee(t){var n=t&&t.constructor;return t===(typeof n=="function"&&n.prototype||ku)}function ue(t,n){return function(r){return null==r?false:r[t]===n&&(n!==T||t in Object(r))}}function oe(t,n,r,e,u,o){return Ze(t)&&Ze(n)&&Bn(t,n,T,oe,o.set(n,t)),t}function ie(t,n){return 1==n.length?t:vn(t,Tn(n,0,-1))}function fe(t){if(typeof t=="string"||Je(t))return t;var n=t+"";return"0"==n&&1/t==-q?"-0":n}function ce(t){
if(null!=t){try{return Ru.call(t)}catch(n){}return t+""}return""}function ae(t){if(t instanceof Ut)return t.clone();var n=new zt(t.__wrapped__,t.__chain__);return n.__actions__=lr(t.__actions__),n.__index__=t.__index__,n.__values__=t.__values__,n}function le(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Xe(n),Tn(t,0>n?0:n,e)):[]}function se(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Xe(n),n=e-n,Tn(t,0,0>n?0:n)):[]}function he(t,n,r){var e=t?t.length:0;return e?(r=null==r?0:Xe(r),0>r&&(r=Xu(e+r,0)),
g(t,Fr(n,3),r)):-1}function pe(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e-1;return r!==T&&(u=Xe(r),u=0>r?Xu(e+u,0):to(u,e-1)),g(t,Fr(n,3),u,true)}function _e(t){return t&&t.length?t[0]:T}function ve(t){var n=t?t.length:0;return n?t[n-1]:T}function ge(t,n){return t&&t.length&&n&&n.length?Dn(t,n):t}function de(t){return t?uo.call(t):t}function ye(t){if(!t||!t.length)return[];var n=0;return t=f(t,function(t){return $e(t)?(n=Xu(t.length,n),true):void 0}),m(n,function(n){return l(t,Un(n))})}function be(t,n){
if(!t||!t.length)return[];var e=ye(t);return null==n?e:l(e,function(t){return r(n,T,t)})}function xe(t){return t=Ot(t),t.__chain__=true,t}function je(t,n){return n(t)}function we(){return this}function me(t,n){return(yi(t)?u:Ao)(t,Fr(n,3))}function Ae(t,n){return(yi(t)?o:Oo)(t,Fr(n,3))}function Oe(t,n){return(yi(t)?l:In)(t,Fr(n,3))}function ke(t,n,r){var e=-1,u=He(t),o=u.length,i=o-1;for(n=(r?te(t,n,r):n===T)?1:nn(Xe(n),0,o);++e<n;)t=Nn(e,i),r=u[t],u[t]=u[e],u[e]=r;return u.length=n,u}function Ee(){
return xu.now()}function Se(t,n,r){return n=r?T:n,n=t&&null==n?t.length:n,Cr(t,128,T,T,T,T,n)}function Ie(t,n){var r;if(typeof n!="function")throw new Au("Expected a function");return t=Xe(t),function(){return 0<--t&&(r=n.apply(this,arguments)),1>=t&&(n=T),r}}function Re(t,n,r){return n=r?T:n,t=Cr(t,8,T,T,T,T,T,n),t.placeholder=Re.placeholder,t}function We(t,n,r){return n=r?T:n,t=Cr(t,16,T,T,T,T,T,n),t.placeholder=We.placeholder,t}function Be(t,n,r){function e(n){var r=c,e=a;return c=a=T,_=n,s=t.apply(e,r);
}function u(t){var r=t-p;return t-=_,p===T||r>=n||0>r||g&&t>=l}function o(){var t=Ee();if(u(t))return i(t);var r;r=t-_,t=n-(t-p),r=g?to(t,l-r):t,h=At(o,r)}function i(t){return h=T,d&&c?e(t):(c=a=T,s)}function f(){var t=Ee(),r=u(t);if(c=arguments,a=this,p=t,r){if(h===T)return _=t=p,h=At(o,n),v?e(t):s;if(g)return h=At(o,n),e(p)}return h===T&&(h=At(o,n)),s}var c,a,l,s,h,p,_=0,v=false,g=false,d=true;if(typeof t!="function")throw new Au("Expected a function");return n=nu(n)||0,Ze(r)&&(v=!!r.leading,l=(g="maxWait"in r)?Xu(nu(r.maxWait)||0,n):l,
d="trailing"in r?!!r.trailing:d),f.cancel=function(){_=0,c=p=a=h=T},f.flush=function(){return h===T?s:i(Ee())},f}function Le(t,n){function r(){var e=arguments,u=n?n.apply(this,e):e[0],o=r.cache;return o.has(u)?o.get(u):(e=t.apply(this,e),r.cache=o.set(u,e),e)}if(typeof t!="function"||n&&typeof n!="function")throw new Au("Expected a function");return r.cache=new(Le.Cache||Pt),r}function Me(t,n){if(typeof t!="function")throw new Au("Expected a function");return n=Xu(n===T?t.length-1:Xe(n),0),function(){
for(var e=arguments,u=-1,o=Xu(e.length-n,0),i=Array(o);++u<o;)i[u]=e[n+u];switch(n){case 0:return t.call(this,i);case 1:return t.call(this,e[0],i);case 2:return t.call(this,e[0],e[1],i)}for(o=Array(n+1),u=-1;++u<n;)o[u]=e[u];return o[n]=i,r(t,this,o)}}function Ce(t,n){return t===n||t!==t&&n!==n}function ze(t){return $e(t)&&Wu.call(t,"callee")&&(!qu.call(t,"callee")||"[object Arguments]"==Mu.call(t))}function Ue(t){return null!=t&&Pe(Wo(t))&&!Fe(t)}function $e(t){return Te(t)&&Ue(t)}function De(t){
return Te(t)?"[object Error]"==Mu.call(t)||typeof t.message=="string"&&typeof t.name=="string":false}function Fe(t){return t=Ze(t)?Mu.call(t):"","[object Function]"==t||"[object GeneratorFunction]"==t}function Ne(t){return typeof t=="number"&&t==Xe(t)}function Pe(t){return typeof t=="number"&&t>-1&&0==t%1&&9007199254740991>=t}function Ze(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function Te(t){return!!t&&typeof t=="object"}function qe(t){return typeof t=="number"||Te(t)&&"[object Number]"==Mu.call(t);
}function Ve(t){return!Te(t)||"[object Object]"!=Mu.call(t)||C(t)?false:(t=Ju(Object(t)),null===t?true:(t=Wu.call(t,"constructor")&&t.constructor,typeof t=="function"&&t instanceof t&&Ru.call(t)==Lu))}function Ke(t){return Ze(t)&&"[object RegExp]"==Mu.call(t)}function Ge(t){return typeof t=="string"||!yi(t)&&Te(t)&&"[object String]"==Mu.call(t)}function Je(t){return typeof t=="symbol"||Te(t)&&"[object Symbol]"==Mu.call(t)}function Ye(t){return Te(t)&&Pe(t.length)&&!!Mt[Mu.call(t)]}function He(t){if(!t)return[];
if(Ue(t))return Ge(t)?t.match(It):lr(t);if(Zu&&t[Zu])return z(t[Zu]());var n=qr(t);return("[object Map]"==n?U:"[object Set]"==n?D:cu)(t)}function Qe(t){return t?(t=nu(t),t===q||t===-q?1.7976931348623157e308*(0>t?-1:1):t===t?t:0):0===t?t:0}function Xe(t){t=Qe(t);var n=t%1;return t===t?n?t-n:t:0}function tu(t){return t?nn(Xe(t),0,4294967295):0}function nu(t){if(typeof t=="number")return t;if(Je(t))return V;if(Ze(t)&&(t=Fe(t.valueOf)?t.valueOf():t,t=Ze(t)?t+"":t),typeof t!="string")return 0===t?t:+t;
t=t.replace(ct,"");var n=dt.test(t);return n||bt.test(t)?Nt(t.slice(2),n?2:8):gt.test(t)?V:+t}function ru(t){return sr(t,fu(t))}function eu(t){return null==t?"":Yn(t)}function uu(t,n,r){return t=null==t?T:vn(t,n),t===T?r:t}function ou(t,n){return null!=t&&Vr(t,n,bn)}function iu(t){var n=ee(t);if(!n&&!Ue(t))return Qu(Object(t));var r,e=Yr(t),u=!!e,e=e||[],o=e.length;for(r in t)!yn(t,r)||u&&("length"==r||Xr(r,o))||n&&"constructor"==r||e.push(r);return e}function fu(t){for(var n=-1,r=ee(t),e=En(t),u=e.length,o=Yr(t),i=!!o,o=o||[],f=o.length;++n<u;){
var c=e[n];i&&("length"==c||Xr(c,f))||"constructor"==c&&(r||!Wu.call(t,c))||o.push(c)}return o}function cu(t){return t?k(t,iu(t)):[]}function au(t){return qi(eu(t).toLowerCase())}function lu(t){return(t=eu(t))&&t.replace(jt,W).replace(St,"")}function su(t,n,r){return t=eu(t),n=r?T:n,n===T&&(n=Bt.test(t)?Rt:st),t.match(n)||[]}function hu(t){return function(){return t}}function pu(t){return t}function _u(t){return kn(typeof t=="function"?t:rn(t,true))}function vu(t,n,r){var e=iu(n),o=_n(n,e);null!=r||Ze(n)&&(o.length||!e.length)||(r=n,
n=t,t=this,o=_n(n,iu(n)));var i=!(Ze(r)&&"chain"in r&&!r.chain),f=Fe(t);return u(o,function(r){var e=n[r];t[r]=e,f&&(t.prototype[r]=function(){var n=this.__chain__;if(i||n){var r=t(this.__wrapped__);return(r.__actions__=lr(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}return e.apply(t,s([this.value()],arguments))})}),t}function gu(){}function du(t){return ne(t)?Un(fe(t)):$n(t)}function yu(){return[]}function bu(){return false}R=R?Gt.defaults({},R,Gt.pick(Kt,Lt)):Kt;var xu=R.Date,ju=R.Error,wu=R.Math,mu=R.RegExp,Au=R.TypeError,Ou=R.Array.prototype,ku=R.Object.prototype,Eu=R.String.prototype,Su=R["__core-js_shared__"],Iu=function(){
var t=/[^.]+$/.exec(Su&&Su.keys&&Su.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Ru=R.Function.prototype.toString,Wu=ku.hasOwnProperty,Bu=0,Lu=Ru.call(Object),Mu=ku.toString,Cu=Kt._,zu=mu("^"+Ru.call(Wu).replace(it,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Uu=Tt?R.Buffer:T,$u=R.Reflect,Du=R.Symbol,Fu=R.Uint8Array,Nu=$u?$u.f:T,Pu=Object.getOwnPropertySymbols,Zu=typeof(Zu=Du&&Du.iterator)=="symbol"?Zu:T,Tu=Object.create,qu=ku.propertyIsEnumerable,Vu=Ou.splice,Ku=wu.ceil,Gu=wu.floor,Ju=Object.getPrototypeOf,Yu=R.isFinite,Hu=Ou.join,Qu=Object.keys,Xu=wu.max,to=wu.min,no=R.parseInt,ro=wu.random,eo=Eu.replace,uo=Ou.reverse,oo=Eu.split,io=Zr(R,"DataView"),fo=Zr(R,"Map"),co=Zr(R,"Promise"),ao=Zr(R,"Set"),lo=Zr(R,"WeakMap"),so=Zr(Object,"create"),ho=lo&&new lo,po=!qu.call({
valueOf:1},"valueOf"),_o={},vo=ce(io),go=ce(fo),yo=ce(co),bo=ce(ao),xo=ce(lo),jo=Du?Du.prototype:T,wo=jo?jo.valueOf:T,mo=jo?jo.toString:T;Ot.templateSettings={escape:tt,evaluate:nt,interpolate:rt,variable:"",imports:{_:Ot}},Ot.prototype=kt.prototype,Ot.prototype.constructor=Ot,zt.prototype=un(kt.prototype),zt.prototype.constructor=zt,Ut.prototype=un(kt.prototype),Ut.prototype.constructor=Ut,$t.prototype.clear=function(){this.__data__=so?so(null):{}},$t.prototype["delete"]=function(t){return this.has(t)&&delete this.__data__[t];
},$t.prototype.get=function(t){var n=this.__data__;return so?(t=n[t],"__lodash_hash_undefined__"===t?T:t):Wu.call(n,t)?n[t]:T},$t.prototype.has=function(t){var n=this.__data__;return so?n[t]!==T:Wu.call(n,t)},$t.prototype.set=function(t,n){return this.__data__[t]=so&&n===T?"__lodash_hash_undefined__":n,this},Dt.prototype.clear=function(){this.__data__=[]},Dt.prototype["delete"]=function(t){var n=this.__data__;return t=Ht(n,t),0>t?false:(t==n.length-1?n.pop():Vu.call(n,t,1),true)},Dt.prototype.get=function(t){
var n=this.__data__;return t=Ht(n,t),0>t?T:n[t][1]},Dt.prototype.has=function(t){return-1<Ht(this.__data__,t)},Dt.prototype.set=function(t,n){var r=this.__data__,e=Ht(r,t);return 0>e?r.push([t,n]):r[e][1]=n,this},Pt.prototype.clear=function(){this.__data__={hash:new $t,map:new(fo||Dt),string:new $t}},Pt.prototype["delete"]=function(t){return Nr(this,t)["delete"](t)},Pt.prototype.get=function(t){return Nr(this,t).get(t)},Pt.prototype.has=function(t){return Nr(this,t).has(t)},Pt.prototype.set=function(t,n){
return Nr(this,t).set(t,n),this},Zt.prototype.add=Zt.prototype.push=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this},Zt.prototype.has=function(t){return this.__data__.has(t)},qt.prototype.clear=function(){this.__data__=new Dt},qt.prototype["delete"]=function(t){return this.__data__["delete"](t)},qt.prototype.get=function(t){return this.__data__.get(t)},qt.prototype.has=function(t){return this.__data__.has(t)},qt.prototype.set=function(t,n){var r=this.__data__;return r instanceof Dt&&200==r.__data__.length&&(r=this.__data__=new Pt(r.__data__)),
r.set(t,n),this};var Ao=vr(hn),Oo=vr(pn,true),ko=gr(),Eo=gr(true);Nu&&!qu.call({valueOf:1},"valueOf")&&(En=function(t){return z(Nu(t))});var So=ho?function(t,n){return ho.set(t,n),t}:pu,Io=ao&&1/D(new ao([,-0]))[1]==q?function(t){return new ao(t)}:gu,Ro=ho?function(t){return ho.get(t)}:gu,Wo=Un("length");Pu||(Tr=yu);var Bo=Pu?function(t){for(var n=[];t;)s(n,Tr(t)),t=Ju(Object(t));return n}:Tr;(io&&"[object DataView]"!=qr(new io(new ArrayBuffer(1)))||fo&&"[object Map]"!=qr(new fo)||co&&"[object Promise]"!=qr(co.resolve())||ao&&"[object Set]"!=qr(new ao)||lo&&"[object WeakMap]"!=qr(new lo))&&(qr=function(t){
var n=Mu.call(t);if(t=(t="[object Object]"==n?t.constructor:T)?ce(t):T)switch(t){case vo:return"[object DataView]";case go:return"[object Map]";case yo:return"[object Promise]";case bo:return"[object Set]";case xo:return"[object WeakMap]"}return n});var Lo=Su?Fe:bu,Mo=function(){var t=0,n=0;return function(r,e){var u=Ee(),o=16-(u-n);if(n=u,o>0){if(150<=++t)return r}else t=0;return So(r,e)}}(),Co=Le(function(t){var n=[];return eu(t).replace(ot,function(t,r,e,u){n.push(e?u.replace(ht,"$1"):r||t)}),
n}),zo=Me(function(t,n){return $e(t)?fn(t,sn(n,1,$e,true)):[]}),Uo=Me(function(t,n){var r=ve(n);return $e(r)&&(r=T),$e(t)?fn(t,sn(n,1,$e,true),Fr(r)):[]}),$o=Me(function(t,n){var r=ve(n);return $e(r)&&(r=T),$e(t)?fn(t,sn(n,1,$e,true),T,r):[]}),Do=Me(function(t){var n=l(t,rr);return n.length&&n[0]===t[0]?xn(n):[]}),Fo=Me(function(t){var n=ve(t),r=l(t,rr);return n===ve(r)?n=T:r.pop(),r.length&&r[0]===t[0]?xn(r,Fr(n)):[]}),No=Me(function(t){var n=ve(t),r=l(t,rr);return n===ve(r)?n=T:r.pop(),r.length&&r[0]===t[0]?xn(r,T,n):[];
}),Po=Me(ge),Zo=Me(function(t,n){n=sn(n,1);var r=t?t.length:0,e=tn(t,n);return Fn(t,l(n,function(t){return Xr(t,r)?+t:t}).sort(fr)),e}),To=Me(function(t){return Hn(sn(t,1,$e,true))}),qo=Me(function(t){var n=ve(t);return $e(n)&&(n=T),Hn(sn(t,1,$e,true),Fr(n))}),Vo=Me(function(t){var n=ve(t);return $e(n)&&(n=T),Hn(sn(t,1,$e,true),T,n)}),Ko=Me(function(t,n){return $e(t)?fn(t,n):[]}),Go=Me(function(t){return tr(f(t,$e))}),Jo=Me(function(t){var n=ve(t);return $e(n)&&(n=T),tr(f(t,$e),Fr(n))}),Yo=Me(function(t){
var n=ve(t);return $e(n)&&(n=T),tr(f(t,$e),T,n)}),Ho=Me(ye),Qo=Me(function(t){var n=t.length,n=n>1?t[n-1]:T,n=typeof n=="function"?(t.pop(),n):T;return be(t,n)}),Xo=Me(function(t){function n(n){return tn(n,t)}t=sn(t,1);var r=t.length,e=r?t[0]:0,u=this.__wrapped__;return!(r>1||this.__actions__.length)&&u instanceof Ut&&Xr(e)?(u=u.slice(e,+e+(r?1:0)),u.__actions__.push({func:je,args:[n],thisArg:T}),new zt(u,this.__chain__).thru(function(t){return r&&!t.length&&t.push(T),t})):this.thru(n)}),ti=pr(function(t,n,r){
Wu.call(t,r)?++t[r]:t[r]=1}),ni=wr(he),ri=wr(pe),ei=pr(function(t,n,r){Wu.call(t,r)?t[r].push(n):t[r]=[n]}),ui=Me(function(t,n,e){var u=-1,o=typeof n=="function",i=ne(n),f=Ue(t)?Array(t.length):[];return Ao(t,function(t){var c=o?n:i&&null!=t?t[n]:T;f[++u]=c?r(c,t,e):wn(t,n,e)}),f}),oi=pr(function(t,n,r){t[r]=n}),ii=pr(function(t,n,r){t[r?0:1].push(n)},function(){return[[],[]]}),fi=Me(function(t,n){if(null==t)return[];var r=n.length;return r>1&&te(t,n[0],n[1])?n=[]:r>2&&te(n[0],n[1],n[2])&&(n=[n[0]]),
n=1==n.length&&yi(n[0])?n[0]:sn(n,1,Qr),Mn(t,n,[])}),ci=Me(function(t,n,r){var e=1;if(r.length)var u=$(r,Dr(ci)),e=32|e;return Cr(t,e,n,r,u)}),ai=Me(function(t,n,r){var e=3;if(r.length)var u=$(r,Dr(ai)),e=32|e;return Cr(n,e,t,r,u)}),li=Me(function(t,n){return on(t,1,n)}),si=Me(function(t,n,r){return on(t,nu(n)||0,r)});Le.Cache=Pt;var hi=Me(function(t,n){n=1==n.length&&yi(n[0])?l(n[0],O(Fr())):l(sn(n,1,Qr),O(Fr()));var e=n.length;return Me(function(u){for(var o=-1,i=to(u.length,e);++o<i;)u[o]=n[o].call(this,u[o]);
return r(t,this,u)})}),pi=Me(function(t,n){var r=$(n,Dr(pi));return Cr(t,32,T,n,r)}),_i=Me(function(t,n){var r=$(n,Dr(_i));return Cr(t,64,T,n,r)}),vi=Me(function(t,n){return Cr(t,256,T,T,T,sn(n,1))}),gi=Wr(dn),di=Wr(function(t,n){return t>=n}),yi=Array.isArray,bi=Uu?function(t){return t instanceof Uu}:bu,xi=Wr(Sn),ji=Wr(function(t,n){return n>=t}),wi=_r(function(t,n){if(po||ee(n)||Ue(n))sr(n,iu(n),t);else for(var r in n)Wu.call(n,r)&&Yt(t,r,n[r])}),mi=_r(function(t,n){if(po||ee(n)||Ue(n))sr(n,fu(n),t);else for(var r in n)Yt(t,r,n[r]);
}),Ai=_r(function(t,n,r,e){sr(n,fu(n),t,e)}),Oi=_r(function(t,n,r,e){sr(n,iu(n),t,e)}),ki=Me(function(t,n){return tn(t,sn(n,1))}),Ei=Me(function(t){return t.push(T,Vt),r(Ai,T,t)}),Si=Me(function(t){return t.push(T,oe),r(Li,T,t)}),Ii=Or(function(t,n,r){t[n]=r},hu(pu)),Ri=Or(function(t,n,r){Wu.call(t,n)?t[n].push(r):t[n]=[r]},Fr),Wi=Me(wn),Bi=_r(function(t,n,r){Bn(t,n,r)}),Li=_r(function(t,n,r,e){Bn(t,n,r,e)}),Mi=Me(function(t,n){return null==t?{}:(n=l(sn(n,1),fe),Cn(t,fn(gn(t,fu,Bo),n)))}),Ci=Me(function(t,n){
return null==t?{}:Cn(t,l(sn(n,1),fe))}),zi=Mr(iu),Ui=Mr(fu),$i=br(function(t,n,r){return n=n.toLowerCase(),t+(r?au(n):n)}),Di=br(function(t,n,r){return t+(r?"-":"")+n.toLowerCase()}),Fi=br(function(t,n,r){return t+(r?" ":"")+n.toLowerCase()}),Ni=yr("toLowerCase"),Pi=br(function(t,n,r){return t+(r?"_":"")+n.toLowerCase()}),Zi=br(function(t,n,r){return t+(r?" ":"")+qi(n)}),Ti=br(function(t,n,r){return t+(r?" ":"")+n.toUpperCase()}),qi=yr("toUpperCase"),Vi=Me(function(t,n){try{return r(t,T,n)}catch(e){
return De(e)?e:new ju(e)}}),Ki=Me(function(t,n){return u(sn(n,1),function(n){n=fe(n),t[n]=ci(t[n],t)}),t}),Gi=mr(),Ji=mr(true),Yi=Me(function(t,n){return function(r){return wn(r,t,n)}}),Hi=Me(function(t,n){return function(r){return wn(t,r,n)}}),Qi=Er(l),Xi=Er(i),tf=Er(_),nf=Rr(),rf=Rr(true),ef=kr(function(t,n){return t+n}),uf=Lr("ceil"),of=kr(function(t,n){return t/n}),ff=Lr("floor"),cf=kr(function(t,n){return t*n}),af=Lr("round"),lf=kr(function(t,n){return t-n});return Ot.after=function(t,n){if(typeof n!="function")throw new Au("Expected a function");
return t=Xe(t),function(){return 1>--t?n.apply(this,arguments):void 0}},Ot.ary=Se,Ot.assign=wi,Ot.assignIn=mi,Ot.assignInWith=Ai,Ot.assignWith=Oi,Ot.at=ki,Ot.before=Ie,Ot.bind=ci,Ot.bindAll=Ki,Ot.bindKey=ai,Ot.castArray=function(){if(!arguments.length)return[];var t=arguments[0];return yi(t)?t:[t]},Ot.chain=xe,Ot.chunk=function(t,n,r){if(n=(r?te(t,n,r):n===T)?1:Xu(Xe(n),0),r=t?t.length:0,!r||1>n)return[];for(var e=0,u=0,o=Array(Ku(r/n));r>e;)o[u++]=Tn(t,e,e+=n);return o},Ot.compact=function(t){for(var n=-1,r=t?t.length:0,e=0,u=[];++n<r;){
var o=t[n];o&&(u[e++]=o)}return u},Ot.concat=function(){for(var t=arguments.length,n=Array(t?t-1:0),r=arguments[0],e=t;e--;)n[e-1]=arguments[e];return t?s(yi(r)?lr(r):[r],sn(n,1)):[]},Ot.cond=function(t){var n=t?t.length:0,e=Fr();return t=n?l(t,function(t){if("function"!=typeof t[1])throw new Au("Expected a function");return[e(t[0]),t[1]]}):[],Me(function(e){for(var u=-1;++u<n;){var o=t[u];if(r(o[0],this,e))return r(o[1],this,e)}})},Ot.conforms=function(t){return en(rn(t,true))},Ot.constant=hu,Ot.countBy=ti,
Ot.create=function(t,n){var r=un(t);return n?Xt(r,n):r},Ot.curry=Re,Ot.curryRight=We,Ot.debounce=Be,Ot.defaults=Ei,Ot.defaultsDeep=Si,Ot.defer=li,Ot.delay=si,Ot.difference=zo,Ot.differenceBy=Uo,Ot.differenceWith=$o,Ot.drop=le,Ot.dropRight=se,Ot.dropRightWhile=function(t,n){return t&&t.length?Qn(t,Fr(n,3),true,true):[]},Ot.dropWhile=function(t,n){return t&&t.length?Qn(t,Fr(n,3),true):[]},Ot.fill=function(t,n,r,e){var u=t?t.length:0;if(!u)return[];for(r&&typeof r!="number"&&te(t,n,r)&&(r=0,e=u),u=t.length,
r=Xe(r),0>r&&(r=-r>u?0:u+r),e=e===T||e>u?u:Xe(e),0>e&&(e+=u),e=r>e?0:tu(e);e>r;)t[r++]=n;return t},Ot.filter=function(t,n){return(yi(t)?f:ln)(t,Fr(n,3))},Ot.flatMap=function(t,n){return sn(Oe(t,n),1)},Ot.flatMapDeep=function(t,n){return sn(Oe(t,n),q)},Ot.flatMapDepth=function(t,n,r){return r=r===T?1:Xe(r),sn(Oe(t,n),r)},Ot.flatten=function(t){return t&&t.length?sn(t,1):[]},Ot.flattenDeep=function(t){return t&&t.length?sn(t,q):[]},Ot.flattenDepth=function(t,n){return t&&t.length?(n=n===T?1:Xe(n),sn(t,n)):[];
},Ot.flip=function(t){return Cr(t,512)},Ot.flow=Gi,Ot.flowRight=Ji,Ot.fromPairs=function(t){for(var n=-1,r=t?t.length:0,e={};++n<r;){var u=t[n];e[u[0]]=u[1]}return e},Ot.functions=function(t){return null==t?[]:_n(t,iu(t))},Ot.functionsIn=function(t){return null==t?[]:_n(t,fu(t))},Ot.groupBy=ei,Ot.initial=function(t){return se(t,1)},Ot.intersection=Do,Ot.intersectionBy=Fo,Ot.intersectionWith=No,Ot.invert=Ii,Ot.invertBy=Ri,Ot.invokeMap=ui,Ot.iteratee=_u,Ot.keyBy=oi,Ot.keys=iu,Ot.keysIn=fu,Ot.map=Oe,
Ot.mapKeys=function(t,n){var r={};return n=Fr(n,3),hn(t,function(t,e,u){r[n(t,e,u)]=t}),r},Ot.mapValues=function(t,n){var r={};return n=Fr(n,3),hn(t,function(t,e,u){r[e]=n(t,e,u)}),r},Ot.matches=function(t){return Rn(rn(t,true))},Ot.matchesProperty=function(t,n){return Wn(t,rn(n,true))},Ot.memoize=Le,Ot.merge=Bi,Ot.mergeWith=Li,Ot.method=Yi,Ot.methodOf=Hi,Ot.mixin=vu,Ot.negate=function(t){if(typeof t!="function")throw new Au("Expected a function");return function(){return!t.apply(this,arguments)}},Ot.nthArg=function(t){
return t=Xe(t),Me(function(n){return Ln(n,t)})},Ot.omit=Mi,Ot.omitBy=function(t,n){return n=Fr(n),zn(t,function(t,r){return!n(t,r)})},Ot.once=function(t){return Ie(2,t)},Ot.orderBy=function(t,n,r,e){return null==t?[]:(yi(n)||(n=null==n?[]:[n]),r=e?T:r,yi(r)||(r=null==r?[]:[r]),Mn(t,n,r))},Ot.over=Qi,Ot.overArgs=hi,Ot.overEvery=Xi,Ot.overSome=tf,Ot.partial=pi,Ot.partialRight=_i,Ot.partition=ii,Ot.pick=Ci,Ot.pickBy=function(t,n){return null==t?{}:zn(t,Fr(n))},Ot.property=du,Ot.propertyOf=function(t){
return function(n){return null==t?T:vn(t,n)}},Ot.pull=Po,Ot.pullAll=ge,Ot.pullAllBy=function(t,n,r){return t&&t.length&&n&&n.length?Dn(t,n,Fr(r)):t},Ot.pullAllWith=function(t,n,r){return t&&t.length&&n&&n.length?Dn(t,n,T,r):t},Ot.pullAt=Zo,Ot.range=nf,Ot.rangeRight=rf,Ot.rearg=vi,Ot.reject=function(t,n){var r=yi(t)?f:ln;return n=Fr(n,3),r(t,function(t,r,e){return!n(t,r,e)})},Ot.remove=function(t,n){var r=[];if(!t||!t.length)return r;var e=-1,u=[],o=t.length;for(n=Fr(n,3);++e<o;){var i=t[e];n(i,e,t)&&(r.push(i),
u.push(e))}return Fn(t,u),r},Ot.rest=Me,Ot.reverse=de,Ot.sampleSize=ke,Ot.set=function(t,n,r){return null==t?t:Zn(t,n,r)},Ot.setWith=function(t,n,r,e){return e=typeof e=="function"?e:T,null==t?t:Zn(t,n,r,e)},Ot.shuffle=function(t){return ke(t,4294967295)},Ot.slice=function(t,n,r){var e=t?t.length:0;return e?(r&&typeof r!="number"&&te(t,n,r)?(n=0,r=e):(n=null==n?0:Xe(n),r=r===T?e:Xe(r)),Tn(t,n,r)):[]},Ot.sortBy=fi,Ot.sortedUniq=function(t){return t&&t.length?Gn(t):[]},Ot.sortedUniqBy=function(t,n){
return t&&t.length?Gn(t,Fr(n)):[]},Ot.split=function(t,n,r){return r&&typeof r!="number"&&te(t,n,r)&&(n=r=T),r=r===T?4294967295:r>>>0,r?(t=eu(t))&&(typeof n=="string"||null!=n&&!Ke(n))&&(n=Yn(n),""==n&&Wt.test(t))?ur(t.match(It),0,r):oo.call(t,n,r):[]},Ot.spread=function(t,n){if(typeof t!="function")throw new Au("Expected a function");return n=n===T?0:Xu(Xe(n),0),Me(function(e){var u=e[n];return e=ur(e,0,n),u&&s(e,u),r(t,this,e)})},Ot.tail=function(t){return le(t,1)},Ot.take=function(t,n,r){return t&&t.length?(n=r||n===T?1:Xe(n),
Tn(t,0,0>n?0:n)):[]},Ot.takeRight=function(t,n,r){var e=t?t.length:0;return e?(n=r||n===T?1:Xe(n),n=e-n,Tn(t,0>n?0:n,e)):[]},Ot.takeRightWhile=function(t,n){return t&&t.length?Qn(t,Fr(n,3),false,true):[]},Ot.takeWhile=function(t,n){return t&&t.length?Qn(t,Fr(n,3)):[]},Ot.tap=function(t,n){return n(t),t},Ot.throttle=function(t,n,r){var e=true,u=true;if(typeof t!="function")throw new Au("Expected a function");return Ze(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),Be(t,n,{leading:e,maxWait:n,
trailing:u})},Ot.thru=je,Ot.toArray=He,Ot.toPairs=zi,Ot.toPairsIn=Ui,Ot.toPath=function(t){return yi(t)?l(t,fe):Je(t)?[t]:lr(Co(t))},Ot.toPlainObject=ru,Ot.transform=function(t,n,r){var e=yi(t)||Ye(t);if(n=Fr(n,4),null==r)if(e||Ze(t)){var o=t.constructor;r=e?yi(t)?new o:[]:Fe(o)?un(Ju(Object(t))):{}}else r={};return(e?u:hn)(t,function(t,e,u){return n(r,t,e,u)}),r},Ot.unary=function(t){return Se(t,1)},Ot.union=To,Ot.unionBy=qo,Ot.unionWith=Vo,Ot.uniq=function(t){return t&&t.length?Hn(t):[]},Ot.uniqBy=function(t,n){
return t&&t.length?Hn(t,Fr(n)):[]},Ot.uniqWith=function(t,n){return t&&t.length?Hn(t,T,n):[]},Ot.unset=function(t,n){var r;if(null==t)r=true;else{r=t;var e=n,e=ne(e,r)?[e]:er(e);r=ie(r,e),e=fe(ve(e)),r=!(null!=r&&yn(r,e))||delete r[e]}return r},Ot.unzip=ye,Ot.unzipWith=be,Ot.update=function(t,n,r){return null==t?t:Zn(t,n,(typeof r=="function"?r:pu)(vn(t,n)),void 0)},Ot.updateWith=function(t,n,r,e){return e=typeof e=="function"?e:T,null!=t&&(t=Zn(t,n,(typeof r=="function"?r:pu)(vn(t,n)),e)),t},Ot.values=cu,
Ot.valuesIn=function(t){return null==t?[]:k(t,fu(t))},Ot.without=Ko,Ot.words=su,Ot.wrap=function(t,n){return n=null==n?pu:n,pi(n,t)},Ot.xor=Go,Ot.xorBy=Jo,Ot.xorWith=Yo,Ot.zip=Ho,Ot.zipObject=function(t,n){return nr(t||[],n||[],Yt)},Ot.zipObjectDeep=function(t,n){return nr(t||[],n||[],Zn)},Ot.zipWith=Qo,Ot.entries=zi,Ot.entriesIn=Ui,Ot.extend=mi,Ot.extendWith=Ai,vu(Ot,Ot),Ot.add=ef,Ot.attempt=Vi,Ot.camelCase=$i,Ot.capitalize=au,Ot.ceil=uf,Ot.clamp=function(t,n,r){return r===T&&(r=n,n=T),r!==T&&(r=nu(r),
r=r===r?r:0),n!==T&&(n=nu(n),n=n===n?n:0),nn(nu(t),n,r)},Ot.clone=function(t){return rn(t,false,true)},Ot.cloneDeep=function(t){return rn(t,true,true)},Ot.cloneDeepWith=function(t,n){return rn(t,true,true,n)},Ot.cloneWith=function(t,n){return rn(t,false,true,n)},Ot.deburr=lu,Ot.divide=of,Ot.endsWith=function(t,n,r){t=eu(t),n=Yn(n);var e=t.length;return r=r===T?e:nn(Xe(r),0,e),r-=n.length,r>=0&&t.indexOf(n,r)==r},Ot.eq=Ce,Ot.escape=function(t){return(t=eu(t))&&X.test(t)?t.replace(H,B):t},Ot.escapeRegExp=function(t){
return(t=eu(t))&&ft.test(t)?t.replace(it,"\\$&"):t},Ot.every=function(t,n,r){var e=yi(t)?i:cn;return r&&te(t,n,r)&&(n=T),e(t,Fr(n,3))},Ot.find=ni,Ot.findIndex=he,Ot.findKey=function(t,n){return v(t,Fr(n,3),hn)},Ot.findLast=ri,Ot.findLastIndex=pe,Ot.findLastKey=function(t,n){return v(t,Fr(n,3),pn)},Ot.floor=ff,Ot.forEach=me,Ot.forEachRight=Ae,Ot.forIn=function(t,n){return null==t?t:ko(t,Fr(n,3),fu)},Ot.forInRight=function(t,n){return null==t?t:Eo(t,Fr(n,3),fu)},Ot.forOwn=function(t,n){return t&&hn(t,Fr(n,3));
},Ot.forOwnRight=function(t,n){return t&&pn(t,Fr(n,3))},Ot.get=uu,Ot.gt=gi,Ot.gte=di,Ot.has=function(t,n){return null!=t&&Vr(t,n,yn)},Ot.hasIn=ou,Ot.head=_e,Ot.identity=pu,Ot.includes=function(t,n,r,e){return t=Ue(t)?t:cu(t),r=r&&!e?Xe(r):0,e=t.length,0>r&&(r=Xu(e+r,0)),Ge(t)?e>=r&&-1<t.indexOf(n,r):!!e&&-1<d(t,n,r)},Ot.indexOf=function(t,n,r){var e=t?t.length:0;return e?(r=null==r?0:Xe(r),0>r&&(r=Xu(e+r,0)),d(t,n,r)):-1},Ot.inRange=function(t,n,r){return n=nu(n)||0,r===T?(r=n,n=0):r=nu(r)||0,t=nu(t),
t>=to(n,r)&&t<Xu(n,r)},Ot.invoke=Wi,Ot.isArguments=ze,Ot.isArray=yi,Ot.isArrayBuffer=function(t){return Te(t)&&"[object ArrayBuffer]"==Mu.call(t)},Ot.isArrayLike=Ue,Ot.isArrayLikeObject=$e,Ot.isBoolean=function(t){return true===t||false===t||Te(t)&&"[object Boolean]"==Mu.call(t)},Ot.isBuffer=bi,Ot.isDate=function(t){return Te(t)&&"[object Date]"==Mu.call(t)},Ot.isElement=function(t){return!!t&&1===t.nodeType&&Te(t)&&!Ve(t)},Ot.isEmpty=function(t){if(Ue(t)&&(yi(t)||Ge(t)||Fe(t.splice)||ze(t)||bi(t)))return!t.length;
if(Te(t)){var n=qr(t);if("[object Map]"==n||"[object Set]"==n)return!t.size}for(var r in t)if(Wu.call(t,r))return false;return!(po&&iu(t).length)},Ot.isEqual=function(t,n){return mn(t,n)},Ot.isEqualWith=function(t,n,r){var e=(r=typeof r=="function"?r:T)?r(t,n):T;return e===T?mn(t,n,r):!!e},Ot.isError=De,Ot.isFinite=function(t){return typeof t=="number"&&Yu(t)},Ot.isFunction=Fe,Ot.isInteger=Ne,Ot.isLength=Pe,Ot.isMap=function(t){return Te(t)&&"[object Map]"==qr(t)},Ot.isMatch=function(t,n){return t===n||An(t,n,Pr(n));
},Ot.isMatchWith=function(t,n,r){return r=typeof r=="function"?r:T,An(t,n,Pr(n),r)},Ot.isNaN=function(t){return qe(t)&&t!=+t},Ot.isNative=function(t){if(Lo(t))throw new ju("This method is not supported with `core-js`. Try https://github.com/es-shims.");return On(t)},Ot.isNil=function(t){return null==t},Ot.isNull=function(t){return null===t},Ot.isNumber=qe,Ot.isObject=Ze,Ot.isObjectLike=Te,Ot.isPlainObject=Ve,Ot.isRegExp=Ke,Ot.isSafeInteger=function(t){return Ne(t)&&t>=-9007199254740991&&9007199254740991>=t;
},Ot.isSet=function(t){return Te(t)&&"[object Set]"==qr(t)},Ot.isString=Ge,Ot.isSymbol=Je,Ot.isTypedArray=Ye,Ot.isUndefined=function(t){return t===T},Ot.isWeakMap=function(t){return Te(t)&&"[object WeakMap]"==qr(t)},Ot.isWeakSet=function(t){return Te(t)&&"[object WeakSet]"==Mu.call(t)},Ot.join=function(t,n){return t?Hu.call(t,n):""},Ot.kebabCase=Di,Ot.last=ve,Ot.lastIndexOf=function(t,n,r){var e=t?t.length:0;if(!e)return-1;var u=e;if(r!==T&&(u=Xe(r),u=(0>u?Xu(e+u,0):to(u,e-1))+1),n!==n)return M(t,u-1,true);
for(;u--;)if(t[u]===n)return u;return-1},Ot.lowerCase=Fi,Ot.lowerFirst=Ni,Ot.lt=xi,Ot.lte=ji,Ot.max=function(t){return t&&t.length?an(t,pu,dn):T},Ot.maxBy=function(t,n){return t&&t.length?an(t,Fr(n),dn):T},Ot.mean=function(t){return b(t,pu)},Ot.meanBy=function(t,n){return b(t,Fr(n))},Ot.min=function(t){return t&&t.length?an(t,pu,Sn):T},Ot.minBy=function(t,n){return t&&t.length?an(t,Fr(n),Sn):T},Ot.stubArray=yu,Ot.stubFalse=bu,Ot.stubObject=function(){return{}},Ot.stubString=function(){return""},Ot.stubTrue=function(){
return true},Ot.multiply=cf,Ot.nth=function(t,n){return t&&t.length?Ln(t,Xe(n)):T},Ot.noConflict=function(){return Kt._===this&&(Kt._=Cu),this},Ot.noop=gu,Ot.now=Ee,Ot.pad=function(t,n,r){t=eu(t);var e=(n=Xe(n))?N(t):0;return!n||e>=n?t:(n=(n-e)/2,Sr(Gu(n),r)+t+Sr(Ku(n),r))},Ot.padEnd=function(t,n,r){t=eu(t);var e=(n=Xe(n))?N(t):0;return n&&n>e?t+Sr(n-e,r):t},Ot.padStart=function(t,n,r){t=eu(t);var e=(n=Xe(n))?N(t):0;return n&&n>e?Sr(n-e,r)+t:t},Ot.parseInt=function(t,n,r){return r||null==n?n=0:n&&(n=+n),
t=eu(t).replace(ct,""),no(t,n||(vt.test(t)?16:10))},Ot.random=function(t,n,r){if(r&&typeof r!="boolean"&&te(t,n,r)&&(n=r=T),r===T&&(typeof n=="boolean"?(r=n,n=T):typeof t=="boolean"&&(r=t,t=T)),t===T&&n===T?(t=0,n=1):(t=nu(t)||0,n===T?(n=t,t=0):n=nu(n)||0),t>n){var e=t;t=n,n=e}return r||t%1||n%1?(r=ro(),to(t+r*(n-t+Ft("1e-"+((r+"").length-1))),n)):Nn(t,n)},Ot.reduce=function(t,n,r){var e=yi(t)?h:x,u=3>arguments.length;return e(t,Fr(n,4),r,u,Ao)},Ot.reduceRight=function(t,n,r){var e=yi(t)?p:x,u=3>arguments.length;
return e(t,Fr(n,4),r,u,Oo)},Ot.repeat=function(t,n,r){return n=(r?te(t,n,r):n===T)?1:Xe(n),Pn(eu(t),n)},Ot.replace=function(){var t=arguments,n=eu(t[0]);return 3>t.length?n:eo.call(n,t[1],t[2])},Ot.result=function(t,n,r){n=ne(n,t)?[n]:er(n);var e=-1,u=n.length;for(u||(t=T,u=1);++e<u;){var o=null==t?T:t[fe(n[e])];o===T&&(e=u,o=r),t=Fe(o)?o.call(t):o}return t},Ot.round=af,Ot.runInContext=Z,Ot.sample=function(t){t=Ue(t)?t:cu(t);var n=t.length;return n>0?t[Nn(0,n-1)]:T},Ot.size=function(t){if(null==t)return 0;
if(Ue(t)){var n=t.length;return n&&Ge(t)?N(t):n}return Te(t)&&(n=qr(t),"[object Map]"==n||"[object Set]"==n)?t.size:iu(t).length},Ot.snakeCase=Pi,Ot.some=function(t,n,r){var e=yi(t)?_:qn;return r&&te(t,n,r)&&(n=T),e(t,Fr(n,3))},Ot.sortedIndex=function(t,n){return Vn(t,n)},Ot.sortedIndexBy=function(t,n,r){return Kn(t,n,Fr(r))},Ot.sortedIndexOf=function(t,n){var r=t?t.length:0;if(r){var e=Vn(t,n);if(r>e&&Ce(t[e],n))return e}return-1},Ot.sortedLastIndex=function(t,n){return Vn(t,n,true)},Ot.sortedLastIndexBy=function(t,n,r){
return Kn(t,n,Fr(r),true)},Ot.sortedLastIndexOf=function(t,n){if(t&&t.length){var r=Vn(t,n,true)-1;if(Ce(t[r],n))return r}return-1},Ot.startCase=Zi,Ot.startsWith=function(t,n,r){return t=eu(t),r=nn(Xe(r),0,t.length),t.lastIndexOf(Yn(n),r)==r},Ot.subtract=lf,Ot.sum=function(t){return t&&t.length?w(t,pu):0},Ot.sumBy=function(t,n){return t&&t.length?w(t,Fr(n)):0},Ot.template=function(t,n,r){var e=Ot.templateSettings;r&&te(t,n,r)&&(n=T),t=eu(t),n=Ai({},n,e,Vt),r=Ai({},n.imports,e.imports,Vt);var u,o,i=iu(r),f=k(r,i),c=0;
r=n.interpolate||wt;var a="__p+='";r=mu((n.escape||wt).source+"|"+r.source+"|"+(r===rt?pt:wt).source+"|"+(n.evaluate||wt).source+"|$","g");var l="sourceURL"in n?"//# sourceURL="+n.sourceURL+"\n":"";if(t.replace(r,function(n,r,e,i,f,l){return e||(e=i),a+=t.slice(c,l).replace(mt,L),r&&(u=true,a+="'+__e("+r+")+'"),f&&(o=true,a+="';"+f+";\n__p+='"),e&&(a+="'+((__t=("+e+"))==null?'':__t)+'"),c=l+n.length,n}),a+="';",(n=n.variable)||(a="with(obj){"+a+"}"),a=(o?a.replace(K,""):a).replace(G,"$1").replace(J,"$1;"),
a="function("+(n||"obj")+"){"+(n?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+a+"return __p}",n=Vi(function(){return Function(i,l+"return "+a).apply(T,f)}),n.source=a,De(n))throw n;return n},Ot.times=function(t,n){if(t=Xe(t),1>t||t>9007199254740991)return[];var r=4294967295,e=to(t,4294967295);for(n=Fr(n),t-=4294967295,e=m(e,n);++r<t;)n(r);return e},Ot.toFinite=Qe,Ot.toInteger=Xe,Ot.toLength=tu,Ot.toLower=function(t){
return eu(t).toLowerCase()},Ot.toNumber=nu,Ot.toSafeInteger=function(t){return nn(Xe(t),-9007199254740991,9007199254740991)},Ot.toString=eu,Ot.toUpper=function(t){return eu(t).toUpperCase()},Ot.trim=function(t,n,r){return(t=eu(t))&&(r||n===T)?t.replace(ct,""):t&&(n=Yn(n))?(t=t.match(It),n=n.match(It),ur(t,S(t,n),I(t,n)+1).join("")):t},Ot.trimEnd=function(t,n,r){return(t=eu(t))&&(r||n===T)?t.replace(lt,""):t&&(n=Yn(n))?(t=t.match(It),n=I(t,n.match(It))+1,ur(t,0,n).join("")):t},Ot.trimStart=function(t,n,r){
return(t=eu(t))&&(r||n===T)?t.replace(at,""):t&&(n=Yn(n))?(t=t.match(It),n=S(t,n.match(It)),ur(t,n).join("")):t},Ot.truncate=function(t,n){var r=30,e="...";if(Ze(n))var u="separator"in n?n.separator:u,r="length"in n?Xe(n.length):r,e="omission"in n?Yn(n.omission):e;t=eu(t);var o=t.length;if(Wt.test(t))var i=t.match(It),o=i.length;if(r>=o)return t;if(o=r-N(e),1>o)return e;if(r=i?ur(i,0,o).join(""):t.slice(0,o),u===T)return r+e;if(i&&(o+=r.length-o),Ke(u)){if(t.slice(o).search(u)){var f=r;for(u.global||(u=mu(u.source,eu(_t.exec(u))+"g")),
u.lastIndex=0;i=u.exec(f);)var c=i.index;r=r.slice(0,c===T?o:c)}}else t.indexOf(Yn(u),o)!=o&&(u=r.lastIndexOf(u),u>-1&&(r=r.slice(0,u)));return r+e},Ot.unescape=function(t){return(t=eu(t))&&Q.test(t)?t.replace(Y,P):t},Ot.uniqueId=function(t){var n=++Bu;return eu(t)+n},Ot.upperCase=Ti,Ot.upperFirst=qi,Ot.each=me,Ot.eachRight=Ae,Ot.first=_e,vu(Ot,function(){var t={};return hn(Ot,function(n,r){Wu.call(Ot.prototype,r)||(t[r]=n)}),t}(),{chain:false}),Ot.VERSION="4.13.1",u("bind bindKey curry curryRight partial partialRight".split(" "),function(t){
Ot[t].placeholder=Ot}),u(["drop","take"],function(t,n){Ut.prototype[t]=function(r){var e=this.__filtered__;if(e&&!n)return new Ut(this);r=r===T?1:Xu(Xe(r),0);var u=this.clone();return e?u.__takeCount__=to(r,u.__takeCount__):u.__views__.push({size:to(r,4294967295),type:t+(0>u.__dir__?"Right":"")}),u},Ut.prototype[t+"Right"]=function(n){return this.reverse()[t](n).reverse()}}),u(["filter","map","takeWhile"],function(t,n){var r=n+1,e=1==r||3==r;Ut.prototype[t]=function(t){var n=this.clone();return n.__iteratees__.push({
iteratee:Fr(t,3),type:r}),n.__filtered__=n.__filtered__||e,n}}),u(["head","last"],function(t,n){var r="take"+(n?"Right":"");Ut.prototype[t]=function(){return this[r](1).value()[0]}}),u(["initial","tail"],function(t,n){var r="drop"+(n?"":"Right");Ut.prototype[t]=function(){return this.__filtered__?new Ut(this):this[r](1)}}),Ut.prototype.compact=function(){return this.filter(pu)},Ut.prototype.find=function(t){return this.filter(t).head()},Ut.prototype.findLast=function(t){return this.reverse().find(t);
},Ut.prototype.invokeMap=Me(function(t,n){return typeof t=="function"?new Ut(this):this.map(function(r){return wn(r,t,n)})}),Ut.prototype.reject=function(t){return t=Fr(t,3),this.filter(function(n){return!t(n)})},Ut.prototype.slice=function(t,n){t=Xe(t);var r=this;return r.__filtered__&&(t>0||0>n)?new Ut(r):(0>t?r=r.takeRight(-t):t&&(r=r.drop(t)),n!==T&&(n=Xe(n),r=0>n?r.dropRight(-n):r.take(n-t)),r)},Ut.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},Ut.prototype.toArray=function(){
return this.take(4294967295)},hn(Ut.prototype,function(t,n){var r=/^(?:filter|find|map|reject)|While$/.test(n),e=/^(?:head|last)$/.test(n),u=Ot[e?"take"+("last"==n?"Right":""):n],o=e||/^find/.test(n);u&&(Ot.prototype[n]=function(){function n(t){return t=u.apply(Ot,s([t],f)),e&&h?t[0]:t}var i=this.__wrapped__,f=e?[1]:arguments,c=i instanceof Ut,a=f[0],l=c||yi(i);l&&r&&typeof a=="function"&&1!=a.length&&(c=l=false);var h=this.__chain__,p=!!this.__actions__.length,a=o&&!h,c=c&&!p;return!o&&l?(i=c?i:new Ut(this),
i=t.apply(i,f),i.__actions__.push({func:je,args:[n],thisArg:T}),new zt(i,h)):a&&c?t.apply(this,f):(i=this.thru(n),a?e?i.value()[0]:i.value():i)})}),u("pop push shift sort splice unshift".split(" "),function(t){var n=Ou[t],r=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",e=/^(?:pop|shift)$/.test(t);Ot.prototype[t]=function(){var t=arguments;if(e&&!this.__chain__){var u=this.value();return n.apply(yi(u)?u:[],t)}return this[r](function(r){return n.apply(yi(r)?r:[],t)})}}),hn(Ut.prototype,function(t,n){
var r=Ot[n];if(r){var e=r.name+"";(_o[e]||(_o[e]=[])).push({name:n,func:r})}}),_o[Ar(T,2).name]=[{name:"wrapper",func:T}],Ut.prototype.clone=function(){var t=new Ut(this.__wrapped__);return t.__actions__=lr(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=lr(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=lr(this.__views__),t},Ut.prototype.reverse=function(){if(this.__filtered__){var t=new Ut(this);t.__dir__=-1,t.__filtered__=true}else t=this.clone(),
t.__dir__*=-1;return t},Ut.prototype.value=function(){var t,n=this.__wrapped__.value(),r=this.__dir__,e=yi(n),u=0>r,o=e?n.length:0;t=o;for(var i=this.__views__,f=0,c=-1,a=i.length;++c<a;){var l=i[c],s=l.size;switch(l.type){case"drop":f+=s;break;case"dropRight":t-=s;break;case"take":t=to(t,f+s);break;case"takeRight":f=Xu(f,t-s)}}if(t={start:f,end:t},i=t.start,f=t.end,t=f-i,u=u?f:i-1,i=this.__iteratees__,f=i.length,c=0,a=to(t,this.__takeCount__),!e||200>o||o==t&&a==t)return Xn(n,this.__actions__);e=[];
t:for(;t--&&a>c;){for(u+=r,o=-1,l=n[u];++o<f;){var h=i[o],s=h.type,h=(0,h.iteratee)(l);if(2==s)l=h;else if(!h){if(1==s)continue t;break t}}e[c++]=l}return e},Ot.prototype.at=Xo,Ot.prototype.chain=function(){return xe(this)},Ot.prototype.commit=function(){return new zt(this.value(),this.__chain__)},Ot.prototype.next=function(){this.__values__===T&&(this.__values__=He(this.value()));var t=this.__index__>=this.__values__.length,n=t?T:this.__values__[this.__index__++];return{done:t,value:n}},Ot.prototype.plant=function(t){
for(var n,r=this;r instanceof kt;){var e=ae(r);e.__index__=0,e.__values__=T,n?u.__wrapped__=e:n=e;var u=e,r=r.__wrapped__}return u.__wrapped__=t,n},Ot.prototype.reverse=function(){var t=this.__wrapped__;return t instanceof Ut?(this.__actions__.length&&(t=new Ut(this)),t=t.reverse(),t.__actions__.push({func:je,args:[de],thisArg:T}),new zt(t,this.__chain__)):this.thru(de)},Ot.prototype.toJSON=Ot.prototype.valueOf=Ot.prototype.value=function(){return Xn(this.__wrapped__,this.__actions__)},Zu&&(Ot.prototype[Zu]=we),
Ot}var T,q=1/0,V=NaN,K=/\b__p\+='';/g,G=/\b(__p\+=)''\+/g,J=/(__e\(.*?\)|\b__t\))\+'';/g,Y=/&(?:amp|lt|gt|quot|#39|#96);/g,H=/[&<>"'`]/g,Q=RegExp(Y.source),X=RegExp(H.source),tt=/<%-([\s\S]+?)%>/g,nt=/<%([\s\S]+?)%>/g,rt=/<%=([\s\S]+?)%>/g,et=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ut=/^\w*$/,ot=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g,it=/[\\^$.*+?()[\]{}|]/g,ft=RegExp(it.source),ct=/^\s+|\s+$/g,at=/^\s+/,lt=/\s+$/,st=/[a-zA-Z0-9]+/g,ht=/\\(\\)?/g,pt=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,_t=/\w*$/,vt=/^0x/i,gt=/^[-+]0x[0-9a-f]+$/i,dt=/^0b[01]+$/i,yt=/^\[object .+?Constructor\]$/,bt=/^0o[0-7]+$/i,xt=/^(?:0|[1-9]\d*)$/,jt=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,wt=/($^)/,mt=/['\n\r\u2028\u2029\\]/g,At="[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?(?:\\u200d(?:[^\\ud800-\\udfff]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])[\\ufe0e\\ufe0f]?(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?)*",Ot="(?:[\\u2700-\\u27bf]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff])"+At,kt="(?:[^\\ud800-\\udfff][\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]?|[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|(?:\\ud83c[\\udde6-\\uddff]){2}|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\ud800-\\udfff])",Et=RegExp("['\u2019]","g"),St=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]","g"),It=RegExp("\\ud83c[\\udffb-\\udfff](?=\\ud83c[\\udffb-\\udfff])|"+kt+At,"g"),Rt=RegExp(["[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+(?:['\u2019](?:d|ll|m|re|s|t|ve))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde]|$)|(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?(?=[\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000]|[A-Z\\xc0-\\xd6\\xd8-\\xde](?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])|$)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?(?:[a-z\\xdf-\\xf6\\xf8-\\xff]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['\u2019](?:d|ll|m|re|s|t|ve))?|[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?:['\u2019](?:D|LL|M|RE|S|T|VE))?|\\d+",Ot].join("|"),"g"),Wt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0\\ufe0e\\ufe0f]"),Bt=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,Lt="Array Buffer DataView Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Map Math Object Promise Reflect RegExp Set String Symbol TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap _ isFinite parseInt setTimeout".split(" "),Mt={};
Mt["[object Float32Array]"]=Mt["[object Float64Array]"]=Mt["[object Int8Array]"]=Mt["[object Int16Array]"]=Mt["[object Int32Array]"]=Mt["[object Uint8Array]"]=Mt["[object Uint8ClampedArray]"]=Mt["[object Uint16Array]"]=Mt["[object Uint32Array]"]=true,Mt["[object Arguments]"]=Mt["[object Array]"]=Mt["[object ArrayBuffer]"]=Mt["[object Boolean]"]=Mt["[object DataView]"]=Mt["[object Date]"]=Mt["[object Error]"]=Mt["[object Function]"]=Mt["[object Map]"]=Mt["[object Number]"]=Mt["[object Object]"]=Mt["[object RegExp]"]=Mt["[object Set]"]=Mt["[object String]"]=Mt["[object WeakMap]"]=false;
var Ct={};Ct["[object Arguments]"]=Ct["[object Array]"]=Ct["[object ArrayBuffer]"]=Ct["[object DataView]"]=Ct["[object Boolean]"]=Ct["[object Date]"]=Ct["[object Float32Array]"]=Ct["[object Float64Array]"]=Ct["[object Int8Array]"]=Ct["[object Int16Array]"]=Ct["[object Int32Array]"]=Ct["[object Map]"]=Ct["[object Number]"]=Ct["[object Object]"]=Ct["[object RegExp]"]=Ct["[object Set]"]=Ct["[object String]"]=Ct["[object Symbol]"]=Ct["[object Uint8Array]"]=Ct["[object Uint8ClampedArray]"]=Ct["[object Uint16Array]"]=Ct["[object Uint32Array]"]=true,
Ct["[object Error]"]=Ct["[object Function]"]=Ct["[object WeakMap]"]=false;var zt={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O",
"\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Ut={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},$t={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Dt={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Ft=parseFloat,Nt=parseInt,Pt=typeof exports=="object"&&exports,Zt=Pt&&typeof module=="object"&&module,Tt=Zt&&Zt.exports===Pt,qt=R(typeof self=="object"&&self),Vt=R(typeof this=="object"&&this),Kt=R(typeof global=="object"&&global)||qt||Vt||Function("return this")(),Gt=Z();
(qt||{})._=Gt,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return Gt}):Zt?((Zt.exports=Gt)._=Gt,Pt._=Gt):Kt._=Gt}).call(this);
/*
 * Инициализация переменных
 */

'use strict';

if (!ISnew) {
  var ISnew = {};
}

// Место для всяких утилиток
if (!ISnew.tools) {
  ISnew.tools = {};
}

// Глобальная информация о сайте.
if (!Site) {
  var Site = {};
}

// Место для всех оберток json
if (!ISnew.json) {
  ISnew.json = {};
}

if (!EventBus) {
  var EventBus;
}

/**
 * Класс для работы с клиентом сайта
 */

ISnew.Client = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._init();
}

/**
 * Инициализация
 */
ISnew.Client.prototype._init = function () {
  var self = this;

  self._get();
};

/**
 * Забираем инфу с сервера
 */
ISnew.Client.prototype._get = function () {
  var self = this;
  var result = $.Deferred();

  ISnew.json.getClientInfo()
    .done(function (response) {
      _.merge(self, response);
      result.resolve(self);
    })
    .fail(function (response) {
      console.log('ISnew.Client: _get: fail: ', response);
      result.reject(response);
    });

  return result.promise();
};

/**
 * Обновление данных
 */
ISnew.Client.prototype.get = function () {
  var self = this;

  return self._get();
};
/**
 * Класс для работы с валютой.
 */
ISnew.Money = function () {
  var self = this;

  self._init();
};

/**
 * Разбиралка настроек
 */
ISnew.Money.prototype._init = function () {
  var self = this;

  return;
};

ISnew.Money.prototype._set = function (params) {
  var self = this;

  self.options = $.parseJSON(params);

  return;
};

ISnew.Money.prototype.set = function (params) {
  var self = this;

  self._set(params);
};

ISnew.Money.prototype.format = function (amount) {
  var self = this;
  var value = amount;
  var patern = /(\d)(?=(\d\d\d)+(?!\d))/g;

  if (amount === null || amount === undefined) {
    return '';
  }

  value = value.toString().replace(',', '.');
  value = parseFloat(value).toFixed(2) || 0;
  value = value.toString().split('.');
  value[0] = value[0].replace(patern, '$1'+ self.options.delimiter);

  if (self.options.show_price_without_cents) {
    value = value[0];
  } else {
    value = value.join(self.options.separator);
  }

  value = self.options.format.replace('%n', value).replace('%u', self.options.unit);

  return value;
};
/**
 * Класс для работы с Магазином??
 */

ISnew.Shop = function () {
  var self = this;

  self.money = new ISnew.Money();
  self.client = new ISnew.Client(self);

  self._init();
}

ISnew.Shop.prototype._init = function () {
  var self = this;
};

/**
 * Отправка сообщений
 */
ISnew.Shop.prototype.sendMessage = function (message) {
  var self = this;

  return ISnew.json.sendMessage(message);
};
/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;
  self._templateList = {};

  self._init();
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;
  var template = self._templateList[template_id];
  var result;

  if (template !== undefined) {
    result = self._templateList[template_id](data);
  } else {
    result = false;
    console.warn('Template: ', template_id, ' не подключен');
  }

  return result;
};

/**
 * Складываем шаблоны по местам, подготавливаем для работы
 */
ISnew.Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Автоматический сбор шаблонов в верстке
 */
ISnew.Template.prototype._init = function () {
  var self = this;

  //  устанавливаем lock пока не собирем все шаблоны
  self.lock = true;

  //  устанавливаем статус пусто
  self.empty = true;

  //  вытаскиваем дефолтный шаблон
  self._setDefault();

  $(function () {
    var $templates = $('[data-template-id]');

    if ($templates.length) {
      $templates.each(function (index, el) {
        self.load($(el).html(), $(el).data('templateId'));

        if ($(el).is(':last')) {
          //  снимаем lock
          self.lock = false;
          //  обновляем статус
          self.empty = false;
        }
      });
    } else {
      //  снимаем lock
      self.lock = false;
      //  обновляем статус
      self.empty = true;
    }
  });
};

ISnew.Template.prototype.has = function (template_id) {
  var self = this;

  var _has = false;

  if (!Template.empty || self._templateList[template_id]) {
    _has = true;
  }

  return _has;
};
/**
 * прибиваем дефолтный селект для вывода опций
 */
ISnew.Template.prototype._setDefault = function () {
  var self = this;

  var option_default = '<div class="option-<%= option.handle %>">\n<label><%= option.title %></label>\n<select data-option-bind="<%= option.id %>">\n<% _.forEach(option.values, function (value){ %>\n<option\ndata-value-position="<%= value.position %>"\nvalue="<%= value.position %>"\n<% if (option.selected == value.position & initOption) { %>selected<% } %>\n>\n<%= value.title %>\n</option>\n<% }) %>\n</select>\n</div>';

  var search_default = '<% if (suggestions.length > 0){ %>\n<ul class="ajax_search-results">\n<% _.forEach(suggestions, function (product){ %>\n<li class="ajax_search-item">\n<a href="<%- product.url %>" class="ajax_search-link"><%= product.markedTitle %></a>\n</li><% }) %>\n</ul>\n<% } %>';

  self.load(option_default, 'option-default');
  self.load(search_default, 'search-default');
}
/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

/**
 * Класс Шины Событий
 */

// TODO: сделать синглтон
ISnew.EventBus = function () {
  var self = this;

  self.eventsList = {};
  self.logger = new ISnew.EventsLogger();

  return;
};

/**
 * Публикация события с данными
 */
ISnew.EventBus.prototype.publish = function (eventId, data) {
  var self = this;

  self.logger.addListner(eventId);

  return self._selectEvent(eventId).fire(data);
};

/**
 * Подписаться на событие
 */
ISnew.EventBus.prototype.subscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).add(callback);
};

/**
 * Отписаться от события
 */
ISnew.EventBus.prototype.unsubscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).remove(callback);
};

/**
 * Выбор нужного события
 */
ISnew.EventBus.prototype._selectEvent = function (eventId) {
  var self = this;
  var Event;

  eventId = _.toString(eventId);
  Event = self.eventsList[eventId];

  // Если у нас новое событие, создаем его и объявляем в системе.
  if (!Event) {
    // Объявляем методы
    Event = $.Callbacks('memory');
    self.eventsList[eventId] = Event;
  }

  return Event;
};
/**
 * Logger на шине событий
 *
 * Позволяет одной командой перехватывать все события, порождаемые компонентом
 */
ISnew.EventsLogger = function () {
  var self = this;

  self.loggersList = {};
};

/**
 * Добавляем прослушку компонента
 */
ISnew.EventsLogger.prototype.add = function (component) {
  var self = this;

  self.loggersList[component] = {};
  self._init(component);

  return;
};

/**
 * Проходим по уже существующим событиям и вешаемся на них
 */
ISnew.EventsLogger.prototype._init = function (component) {
  var self = this;

  _.forEach(EventBus.eventsList, function (item, eventName) {
    self.addListner(eventName)
  });

  return;
};

/**
 * Вешаем слушателя на событие
 */
ISnew.EventsLogger.prototype.addListner = function (eventName) {
  var self = this;
  var component = self._component(eventName);

  // если такой
  if (self._inList(component) && !self._isListen(eventName)) {
    self.loggersList[component][eventName] = true;

    EventBus.subscribe(eventName, function (data) {
      console.log('LISTNER: ', eventName, data);
    });
  }

  return;
};

/**
 * Проверяем, слушаем ли мы такой компонент?
 */
ISnew.EventsLogger.prototype._inList = function (component) {
  var self = this;

  return _.has(self.loggersList, component) ? true : false;
};

/**
 * Проверка
 */
ISnew.EventsLogger.prototype._isListen = function (eventName) {
  var self = this;
  var component = self._component(eventName);
  var status = false;

  if (self._inList(component)) {
    status = _.has(self.loggersList[component], eventName);
  }

  return status;
};

/**
 * Вытаскиваем название компонента из события
 */
ISnew.EventsLogger.prototype._component = function (eventName) {
  return _.last(eventName.split(':'));
};

EventBus = new ISnew.EventBus();
/**
 * Тул для вывода ошибок.
 */
ISnew.tools.Error = function (name, message) {
  var self = this;
  var errorObject = new Error(message);

  errorObject.name = name || 'Ошибка';

  self.name = errorObject.name;
  self.message = errorObject.message;

  if (errorObject.stack) {
    self.stack = errorObject.stack;
  }

  //Вывод в консоль
  self.toString = function() {
   return self.name + ': ' + self.message;
  };

  return self;
};
ISnew.tools.RegExp = function () {
  var self = this;

  self._toEscape = /[|\\{}()[\]^$+*?.]/g;
}

ISnew.tools.RegExp.prototype.escape = function (string) {
  var self = this;

  if (!_.isString(string)) {
    console.warn('not string: ', string);
    return false;
  }

  return string.replace(self._toEscape, '\\$&');
};
/**
 * производим транслитерацию строки
 */
ISnew.tools.Translit = function( string ) {
  var self = this;

  var space = '_';

  self.translit = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
    ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
    '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
    '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
    ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
    '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
    '?': space, '<': space, '>': space, '№':space
  };
};

/*
 * Основной метод.
 */
ISnew.tools.Translit.prototype.replace = function (string) {
  var self = this;

  return _.reduce(string.toLowerCase(), function(test, symbol) {
    if (self.translit[symbol] !== undefined) {
      test += self.translit[symbol];
    } else {
      test += symbol;
    }

    return test;
  }, '');
}
/**
 * Тул для разбора url.
 */
ISnew.tools.URL = function () {
  var self = this;

  self._init();
};

/**
 * Разбор урла
 */
ISnew.tools.URL.prototype._init = function () {
  var self = this;
  self.keys = {};
  self.location = window.location;

  _.chain(self.location.search.replace('?', ''))
    .split('&')
    .forEach(function (part) {
      if (part !== '') {
        part = part.split('=');
        self.keys[part[0]] = part[1];
      }
    })
    .value();

  return;
};

/**
 * Вытаскиваем значение ключа
 */
ISnew.tools.URL.prototype.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};
/*
 * Добавление товара в корзину
 */

/**
 * Принимаем объект
 *
 * Внезапно, если это объект невалидного вида мы все равно получим ответ!!!
 */

ISnew.json.addCartItems = function (items, options) {
  var fields = {};
  options = options || {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  return $.post('/cart_items.json', fields);
}
/**
 * Добавление товара в сравнение
 */

ISnew.json.addCompareItem = function (id) {
  var fields = {
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};
/*
 * Получение состава корзины
 */

ISnew.json.getCartItems = function () {
  var result = $.Deferred();
  var cookieCart = $.cookie('cart');

  /*
   * В куке состав корзины хранится, если там не более 4х РАЗНЫХ модификаций
   * Кука может быть пустой - дергаем инфу с сервера
   * Если кука содержит строку 'json' - дергаю инфу с сервера
   */
  if (cookieCart && cookieCart != 'json') {
    order = $.parseJSON(cookieCart) || null;
    result.resolve(order);
    // reject??
  } else {
    $.getJSON('/cart_items.json')
      .done(function (order) {
        result.resolve(order);
      })
      .fail(function (response) {
        result.reject(response);
      });
  }

  return result.promise();
};
ISnew.json.getClientInfo = function (){
  var result = $.Deferred();

  $.getJSON('/client_account/contacts.json')
    .done(function (response) {
      switch (response.status) {
        case 'error':
          result.resolve({
            message: response.message,
            url: response.url,
            authorized: false
          });
          break;
        default:
          result.resolve(_.merge(response.client, { authorized: true }));
      }
    })
    .fail(function (response) {
      console.log('json.getClientInfo: fail: ', response);
    });

  return result.promise();
};
/*
 * Получение информации о коллекции
 */

ISnew.json.getCollection = function () {
  var path = '/collection/'+ _.toString(arguments[0]) +'.json';
  var fields = {};

  _.chain(arguments)
    .drop()
    .compact()
    .each(function (value) {
      _.assign(fields, value)
    })
    .value();

  return $.getJSON(path, fields);
};
/**
 * Добавление товара в сравнение
 */

ISnew.json.getCompareItems = function (id) {

  return $.getJSON('/compares.json');
};
/*
 * Получение информации о товаре
 */

ISnew.json.getProduct = function (id) {
  var result = $.Deferred();

  $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json', { format: 'json' })
    .done(function (response) {
      result.resolve(response.product);
    })
    .fail(function (response) {
      console.log('JSON: ошибка при получении данных от платформы', response);
      result.resolve({});
    });

  return result.promise();
};
/*
 * Получение информации о списке товаров
 */

ISnew.json.getProductsList = function (id_array) {
  // указваем, сколько id нужно отправить за раз
  var query_limit = 25;

  /**
   * Генерим адреса для запросов
   *
   * Приводим к типу массив (мало ли что там прилетело)
   * Разбиваем на пачки, делаем из них правильные адреса для запросов
   */
  var paths = _.chain(id_array)
    .toArray()
    .compact()
    .chunk(query_limit)
    .map(function (ids_list) {
      return '/products_by_id/'+ ids_list.join() +'.json';
    })
    .value();

  // собираем задачи
  var promises = $.map(paths, function (path) {
    return $.ajax(path).then(function (response) {
        return response;
      });
  });

  /**
   * Склеиваем ответы.
   *
   * Проходимся по всем получившимся промисам, дергаем их
   */
  return $.when.apply(this, promises)
    .then(function () {
      /**
       * Получаем ответы ото ВСЕХ промисов.
       * Приводим к типу массив, на случай если ответы все кривые и там - пустота
       * Вытаскиваем массив с продуктами, склеиваем все массивы и выдаем наружу
       */
      return _.chain(arguments)
        .toArray()
        .map(function (response) {
          return response.products;
        })
        .flatten()
        .union()
        .value()
    });
};
/**
 * Оформление заказа
 */

ISnew.json.makeCheckout = function (client, order) {
  console.log(client, order);
  var dfd = $.Deferred();
  var checkout = {
    pid: 1,
    'order[delivery_variant_id]': _.toInteger(order.delivery),
    'order[payment_gateway_id]': _.toInteger(order.payment)
  };

  _.forIn(client, function (value, field) {
    checkout['client['+ field +']'] = value;
  });

  console.log(checkout);

  $.post('/fast_checkout.json', checkout)
    .done(function (response) {
      if (response.status == 'ok') {
        dfd.resolve(response);
      } else {
        dfd.reject(response);
      }
    })
    .fail(function (response) {
      dfd.reject(response)
    })

  return dfd.promise();
};
/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function (variant_id) {
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var fields = {
    '_method': 'delete'
  };

  return $.post(path, fields);
};
/*
 * Удаление товара из сравнения
 */

ISnew.json.removeCompareItem = function (id) {
  var fields = {
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
};
/*
 * Отправление сообщения
 */

ISnew.json.sendMessage = function (input) {
  var result = $.Deferred();
  var message = {};

  _.forIn(input, function (value, key) {
    message['feedback['+ key +']'] = value;
  });

  $.post('/client_account/feedback.json', message)
    .done(function (response) {
      if (message && response.status == 'ok') {
        result.resolve(response);
      } else {
        response.message = message;
        result.reject(response);
      }
    });

  return result.promise();
};
/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items, options) {
  var fields = {
    '_method': 'put'
  };

  options = options || {};

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function(comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  return $.post('/cart_items.json', fields);
};
/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

// TODO: сделать синглтон
ISnew.Cart = function () {
  var self = this;

  self.ui = new ISnew.CartDOM();
  self.order = new ISnew.CartOrder(self);
  self.tasks = new ISnew.CartTasks(self);

  self.init();
};

/**
 * Получить с сервера состав корзины
 */
// TODO: изменить на нормальныйую логику после нормолизации ответов json
// TODO: может не надо? у нас теперь появляется нормальный таск манагер :)
ISnew.Cart.prototype.init = function () {
  var self = this;
  var task = {
    method: 'init'
  };

  self.tasks.send(task);
};

ISnew.Cart.prototype._get = function () {
  var self = this;
  var current_items = {};

  return current_items;
};

/**
 * Добавить в корзину заданное кол-во товаров
 *
 * на вход - объект. смотреть доку
 */
ISnew.Cart.prototype.add = function (task) {
  var self = this;

  task = task || {};
  task.method = 'add_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._add_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

    current_items[variant_id] = current_quantity;
  });

  return current_items;
};

/**
 * Удадить из корзины заданное кол-во товаров
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.remove = function (task) {
  var self = this;

  task = task || {};
  task.method = 'remove_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._remove_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) - _.toInteger(quantity);

    current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
  });

  return current_items;
};

/**
 * Устанавливает кол-во товаров в корзине для каждой позиции
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.set = function (task) {
  var self = this;
  task = task || {};
  task.method = 'set_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._set_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  return current_items;
};

/**
 * Удалить позиции из корзины
 * на вход - массив с variant_id
 */
ISnew.Cart.prototype.delete = function (task) {
  var self = this;
  task = task || {};
  task.method = 'delete_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._delete_items = function (task, current_items) {
  var self = this;

  _.chain(task.items)
    .toArray()
    .forEach(function(variant_id) {
      current_items[variant_id] = 0;
    })
    .value();

  return current_items;
};

/**
 * Полностью очистить корзину
 */
ISnew.Cart.prototype.clear = function (task) {
  var self = this;
  task = task || {};
  task.method = 'clear_items';

  self.tasks.send(task);
};

ISnew.Cart.prototype._clear_items = function (task, current_items) {
  var self = this;

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  return current_items;
};

/**
 * Устанавливаем купон
 */
ISnew.Cart.prototype.setCoupon = function (task) {
  var self = this;

  task = task || {};
  task.method = 'set_coupon';

  self.tasks.send(task);
};

ISnew.Cart.prototype._set_coupon = function (task, current_items) {
  var self = this;

  return current_items;
};

/**
 * Получить состав корзины
 */
ISnew.Cart.prototype.getOrder = function () {
  var self = this;

  return self.order.get();
};

/**
 * Обновление состава корзины
 */
ISnew.Cart.prototype._update = function (items, task) {
  var self = this;

  self.tasks._before();

  ISnew.json.updateCartItems(items, task)
    .done(function (response) {
      self.tasks._done(response);
    })
    .fail(function (response) {
      self.tasks._fail(response);
    })
    .always(function () {
      self.tasks._always();
    });
};

/**
 * Фикс для заказа в один клик
 */
ISnew.Cart.prototype.addItem = function (form) {
  var self = this;
  var _button = $(form).find('['+ self.ui.options.add +']');
  //  Ставим флаг на кнопку
  _button.checkoutButton = true;
  self.ui._addItem(_button);
  // вызываем модалку чекаута
  $('#insales-quick-checkout-dialog').modal({
    fadeDuration: 250
  });
};

ISnew.Cart.prototype.setConfig = function (settings) {
  var self = this;

  self.ui.setConfig(settings);

  return;
};
/**
 * Класс отвечает за работу и форматирование состава корзины
 */

ISnew.CartOrder = function (_cart) {
  var self = this;

  self._owner = _cart;
};

/**
 * обновляем состав корзины
 */
ISnew.CartOrder.prototype.set = function (order) {
  var self = this;

  self._patch(order);

  return self;
};

/**
 * забираем актуальный состав корзины
 */
ISnew.CartOrder.prototype.get = function () {
  var self = this;

  return self;
};

/**
 * Формируем инфу о позициях
 */
ISnew.CartOrder.prototype.getItems = function () {
  var self = this;
  var items = {};

  _.forEach(self.order_lines, function (item) {
    items[item.variant_id] = item.quantity;
  });

  return items;
};

ISnew.CartOrder.prototype.getComments = function () {
  var self = this;

  return self.order_line_comments;
};

/**
 * Фиксим инфу по корзине
 */
ISnew.CartOrder.prototype._patch = function (current_order) {
  var self = this;

  self.order_lines = current_order.order_lines || current_order.items;
  self.order_line_comments = current_order.order_line_comments || current_order.order.order_line_comments;

  self.positions_count = self.order_lines.length;

  self.items_count = current_order.items_count;
  self.items_price = 0;

  self.total_price = current_order.total_price;

  self.discounts = current_order.discounts;

  self._itemsPrice();
  self._deliveryPrice(current_order);
  self._url();
  self._setId()
  self._images();

  return;
};

/**
 * Добавляем поле с ценой только товаров, без доставки
 */
ISnew.CartOrder.prototype._itemsPrice = function () {
  var self = this;

  self.items_price = _.reduce(self.order_lines, function (sum, item) {
    return sum + item.sale_price * item.quantity;
  }, 0);

  return;
};

/**
 * Добавляем цену доставки
 * NOTE: в разных json лежит в разных местах
 */
ISnew.CartOrder.prototype._deliveryPrice = function (current_order) {
  var self = this;
  var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

  self.delivery_price = parseFloat(delivery_price);

  return;
};

/**
 * Фиксим url с учетом языков
 */
ISnew.CartOrder.prototype._url = function () {
  var self = this;
  _.forEach(self.order_lines, function (item) {
    //console.log(item);
    // TODO: пока хз. нужен язык
  });
  return;
};

ISnew.CartOrder.prototype._setId = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.id = item.variant_id;
  });
  return;
};

/**
 * Фиксим картинки товаров
 */
ISnew.CartOrder.prototype._images = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.images = item.product.images;
  });
  return;
};

ISnew.CartOrder.prototype.getItemByID = function (id) {
  var self = this;
  var _item;

  id = _.toInteger(id);

  _.forEach(self.order_lines, function (item) {
    if (item.id === id) {
      _item = item;
      return false;
    }
  });

  return _item;
};
/**
 * Менеджер задач для корзины
 * Занимается контролем за задачами, склейкой и отправкой
 */
ISnew.CartTasks = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._lock = false;

  self._taskToWork = [];
  self._taskInWork = [];

  self._init();
};

ISnew.CartTasks.prototype._init = function () {
  var self = this;
  var _atStore = localStorage.getItem('cart');

  _atStore = JSON.parse(_atStore);
  if (_atStore && (_.now() - _atStore.addedAt) < 30000) {
    self._owner.order.set(_atStore);
  }
};

/**
 * Точка входа
 *
 * Если параметр передан, то добавляем таску в очередь.
 *
 * Если нет - пинаем оставшуюся очередь, может прилететь только от CART()!!!
 * После получения ответа от сервера.
 */
ISnew.CartTasks.prototype.send = function (task) {
  var self = this;


  if (task) {
    self._add(task);
  } else {
    self._push();
  }

  return;
};

/**
 * Добавляем таску в очередь
 */
ISnew.CartTasks.prototype._add = function (task) {
  var self = this;

  self._taskToWork.push(task);

  self._push();
  return;
};

/**
 * Пушим очередь на сервер
 */
ISnew.CartTasks.prototype._push = function () {
  var self = this;
  var tasks = self._taskToWork;
  var items_set = self._owner.order.getItems();
  var result_task = {
    comments: self._owner.order.getComments()
  };

  // если залокано запросом - посылаем в утиль
  if (self._lock || tasks.length == 0) {
    return false;
  }

  // не залочен? решаем этот вопрос )
  self._lock = true;

  // перебрасываем накопившиеся таски в обработку
  self._taskInWork = self._taskToWork;
  self._taskToWork = [];

  // проходим по таскам
  _.forEach(self._taskInWork, function(task) {
    // применяем таски на актуальный состав
    items_set = self._task(task, items_set);

    // комбайним комменты и купоны
    _.assign(result_task.comments, task.comments);
    result_task.coupon = task.coupon;
  }, items_set);

  self._send(items_set, result_task);
  return;
};

/**
 * Отсылаем на сервак
 */
ISnew.CartTasks.prototype._send = function (items_set, task) {
  var self = this;

  self._owner._update(items_set, task);
  return;
};

/**
 * Применяем таски на местность
 */
ISnew.CartTasks.prototype._task = function (task, current_items) {
  var self = this;
  var method = '_'+ task.method;

  // если такого метода нет - тягаем обновление корзины.
  if (!_.isFunction(self._owner[method])) {
    method = '_get';
  }

  return self._owner[method](task, current_items);
};

/**
 * Действия при успешном обновлении
 */
ISnew.CartTasks.prototype._done = function (order) {
  var self = this;
  var data = {};

  // ставим актуальные данные в корзину
  self._owner.order.set(order);

  order.addedAt = _.now();
  localStorage.setItem('cart', JSON.stringify(order));

  data = _.clone(self._owner.order.get());

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    EventBus.publish(task.method +':insales:cart', data);
  });

  //  снимаем флаг с кнопки
  var _button = data.action.button;

  if (_button && _button.checkoutButton) {
    _button.checkoutButton = false;
  }

  EventBus.publish('update_items:insales:cart', data);
  return;
};

/**
 * Действия при фейле
 */
ISnew.CartTasks.prototype._fail = function (response) {
  var self = this;

  // если не прокатило - заливаем обратно таски
  if (self._taskInWork.length != 0) {
    _.concat(self._taskToWork, self._taskInWork);
  }

  return;
};

/**
 * Действия "всегда"
 */
ISnew.CartTasks.prototype._always = function () {
  var self = this;
  var data = {};

  // снимаем лок
  self._lock = false;

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    EventBus.publish('always:insales:cart', data);
  });

  // всё ок, удаляем задачи
  self._taskInWork = [];

  // погнали все кругом
  self.send();
  return;
};

ISnew.CartTasks.prototype._before = function () {
  var self = this;
  var data = {};

  _.forEach(self._taskInWork, function (task) {
    data.action = task || {};
    if (task.method != 'init') {
      EventBus.publish('before:insales:cart', data);
    }
  });
  return;
};
/**
 * Связка с DOM
 */
ISnew.CartDOM = function () {
  var self = this;

  self.options = {
    inProcess: 'inProcess',
    disabled: 'disabled',

    form: 'data-cart-form',
    add: 'data-item-add',
    delete: 'data-item-delete',
    update: 'data-cart-update',
    submit: 'data-cart-submit',
    clear: 'data-cart-clear',
    coupon: 'data-coupon-submit',

    reloadOnCoupon: true
  };

  self._init();
};

/**
 * Инициализация
 */
ISnew.CartDOM.prototype._init = function () {
  var self = this;

  // Прибиваем все обработчики
  self._bindAddItem();
  self._bindDeleteItem();
  self._bindUpdateCart();
  self._bindClearOrder();
  self._bindCoupon();

  return;
};

ISnew.CartDOM.prototype.setConfig = function (options) {
  var self = this;

  _.assign(self.options, options);

  return;
};
/**
 * Добавляем товары из формы
 */
ISnew.CartDOM.prototype._addItem = function ($button) {
  var self = this;

  var $form = $button.parents('form:first');
  var $fields = $form.find('[name*="variant_ids"]');
  var $one_variant = $form.find('[name="variant_id"]');
  var $quantity = $form.find('input[name="quantity"]');
  var $comment = $form.find('[name="comment"]');

  var task = {
    items: {},
    comments: {},
    button: $button,
    form: $form,
    coupon: self._getCoupon($form)
  };

  // складываем данные в объект
  // если в форме был стандартный селектор модификаций, кладем отдельно
  if ($one_variant.length == 1) {
    task.items[_.toInteger($one_variant.val())] = parseFloat($quantity.val());
    task.comments[_.toInteger($one_variant.val())] = $comment.val();
  }
  _.assign(task.items, self._getItems($fields));

  _.assign(task.comments, self._getComments($form));

  // посылаем данные в корзину
  Cart.add(task);
  return;
};

/**
 * Обработка добавления товара в корзину
 */
ISnew.CartDOM.prototype._bindAddItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.add +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      // если эту кнопку еще не жали
      if (!$button.prop(self.options.disabled)) {
        // если кнопка не заблочена - делаем добавление
        // вешаем на кнопку метку "В обработке"
        $button.prop(self.options.inProcess, true);
        self._addItem($button);
      } else {
        // иначе - дергаем событие
        EventBus.publish('add_disabled:insales:product', {
          button: $button,
        });
      }
    }
  });

  // снимаем с кнопки метку после операций с корзиной
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'add_items');
  });
};

/**
 * Удаляем один элемент из корзины по клику на кнопке "Удалить"
 */
ISnew.CartDOM.prototype._deleteItem = function ($button) {
  var self = this;

  var task = {
    items: [self._getId($button.attr(self.options.delete))],
    button: $button
  };

  // посылаем данные в корзину
  Cart.delete(task);
  return;
};

/**
 * Обработка удаления товара из корзины
 */
ISnew.CartDOM.prototype._bindDeleteItem = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.delete +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      // Вешаем метку "в обработке"
      $button.prop(self.options.inProcess, true);
      self._deleteItem($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'delete_items');
  });
};

/**
 * Пересчет корзины из формы
 */
ISnew.CartDOM.prototype.updateOrder = function ($button) {
  var self = this;
  var $form = $('['+ self.options.form +']');
  var $fields = $form.find('input[name*="cart[quantity]"]');

  var task = {
    items: {},
    form: $form,
    coupon: self._getCoupon($form)
  };

  if ($button && $button.length != 0) {
    task.button = $button;
  }

  task.items = self._getItems($fields);

  Cart.set(task);
  return;
};

/**
 * Обновление корзины
 */
ISnew.CartDOM.prototype._bindUpdateCart = function () {
  var self = this;
  var form = '['+ self.options.form +']';

  // обработчик нажатия enter в форме корзины
  $(document).on('keypress', form, function (event) {
    if (event.keyCode == '13') {
      // блочим отправку формы и запускаем обработку
      event.preventDefault();

      self.updateOrder();
      // TODO: удалить
      self.updateOrder($(event.target));
    }
  });

  $(document).on('click', '['+ self.options.update +']', function (event) {
    event.preventDefault()

    var $button = $(this);
    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self.updateOrder($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'set_items');
  });

  // Слушаем изменение кол-ва товара в корзине
  $(function () {
    // находим форму
    var $form = $(form);

    // есть ли она?
    if ($form.length) {
      // подписываемся на событие
      EventBus.subscribe('change_quantity:insales:item', function (data) {
        // а оно было в форме?
        if (data.action.product.closest($form).length) {
          // все ок, пинаем
          self.updateOrder();
        }
      });
    }
  });
};

/**
 * Очистить корзину (через форму)
 */
ISnew.CartDOM.prototype.clearOder = function ($button) {
  var self = this;
  var $form = $('['+ self.options.form +']')
  var $fields = $form.find('input[name*="cart[quantity]"]');

  var task = {
    items: [],
    form: $form,
  };

  // вешаем метку на кнопку, добавляем ее в таску
  if ($button && $button.length != 0) {
    task.button = $button;
  }

  task.items = _.keys(self._getItems($fields));

  Cart.delete(task);
  return;
};

/**
 * Обработка полной очистки корзины
 */
ISnew.CartDOM.prototype._bindClearOrder = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.clear +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self.clearOder($button);
    }
  });

  // снимаем метку "в процессе" с кнопки
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'delete_items');
  });
};

/**
 * Отправка купона
 */
ISnew.CartDOM.prototype.setCoupon = function ($form, $button) {
  var self = this;
  var task = {
    items: {},
    form: $form,
    coupon: self._getCoupon($form),
    button: $button
  };

  Cart.setCoupon(task);
  return;
};

/**
 * Обработчики работы с купоном
 */
ISnew.CartDOM.prototype._bindCoupon = function () {
  var self = this;

  // вешаем глобальный обработчик
  $(document).on('click', '['+ self.options.coupon +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    self.setCoupon($button.parents('form:first'), $button);
  });

  $(document).on('keypress', '[name="cart[coupon]"]', function (event) {
    if (event.keyCode == 13) {
      event.stopPropagation();
      event.preventDefault();

      self.setCoupon($(this).parents('form:first'));
    }
  });

  // снимаем метку "в процессе" с формы
  EventBus.subscribe('always:insales:cart', function (data) {
    self._unlockButton(data, 'set_coupon');
  });

  // прогружаем верстку
  EventBus.subscribe('set_coupon:insales:cart', function (data) {
    if (data.action.form.is('['+ self.options.form +']')) {
      if (self.options.reloadOnCoupon) {
        document.location.reload();
      } else {
        console.log('Вы отключили атвоматическое обновление страницы корзины после применения купона. Создайте свой обработчик по событию шины "set_coupon:insales:cart"');
      }
    }
  });
  return;
};

/**
 * Вытаскиваем id из строки
 */
ISnew.CartDOM.prototype._getId = function (string) {
  return _.toInteger(string.replace(/\D+/g, ''));
};

/**
 * Собираем items из $form
 */
ISnew.CartDOM.prototype._getItems = function ($fields) {
  var self = this;
  var items = {};

  $fields.each(function (index, item) {
    var $item = $(item);
    items[self._getId($item.attr('name'))] = parseFloat($item.val());
  });

  return items;
};

/**
 * Lurk for coupon
 */
ISnew.CartDOM.prototype._getCoupon = function ($form) {
  return $form.find('[name="cart[coupon]"]').val() || false;
};

ISnew.CartDOM.prototype._unlockButton = function (data, eventName) {
  var self = this;

  if (data.action && data.action.button && data.action.method == eventName) {
    data.action.button.prop(self.options.inProcess, false);
  }

  return;
};

ISnew.CartDOM.prototype._getComments = function ($form) {
  var self = this;
  var comments = {};
  var $comments = $form.find('[name*="cart[order_line_comments]"]');

  $comments.each(function () {
    var $comment = $(this);
    comments[self._getId($comment.attr('name'))] = $comment.val();
  });

  return comments;
};
/**
 * Объект отвечающий за работу опшн селектора
 *
 * @class
 * @name ISnew.OptionSelector
 *
 * @param {jQuery Object} $product - ссылка на форму
 * @param {object} _product ссылка на родительский класс ISnew.Products
 *
 * @property {object} selector в объекте хранятся названия селекторов
 * @property {object} $product опорный DOM-узел, который описывает товар
 * @property {object} $nativeSelect нативный селект который выводим через liquid
 * @property {object} $optionSelector контейнер куда происходит рендер селекторов опций
 *
 */
ISnew.OptionSelector = function (_owner) {
  var self = this;

  self._owner = _owner;

  self.selectors = self._owner.selectors;
  self.$product = _owner.$product;

  self._init();
};

/**
 * Инициализация
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _product ссылка на родительский класс ISnew.Products
 *
 */
ISnew.OptionSelector.prototype._init = function () {
  var self = this;
  var product = self._owner;

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // находим там нативный селект/точку для рендера
  self.$nativeSelect = self.$product.find('['+ self.selectors.nativeSelect +']');

  // если нативного селектора нет, выходим
  if (self.$nativeSelect.length == 0) {
    return;
  }

  var $optionSelector = self.$product.find('['+ self.selectors.optionSelector +']');

  // создаем контейнер и сохраняем линк на него
  if (!$optionSelector.length) {
    self.$nativeSelect.after('<div class="option-selector" '+ self.selectors.optionSelector +'/>');
  }

  self.$optionSelector = self.$product.find('['+ self.selectors.optionSelector +']');

  self.$nativeSelect.hide();

  self._bindEvents();
  //  вызов рендера
  self._renderSelector();

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  var variants = self._owner.variants;
  var images = self._owner.product._images;
  var settings = self._owner.product.settings;

  // Если в настройках не отключили отображение селекторов
  if (settings.showVariants && self.$optionSelector) {
    //  собираем отрендеренные селекторы
    var optionsHTML = _.reduce(variants.options, function (html, value, index) {
      return html += self._renderOption({
        option: variants.getFilterOption(index),
        images: images,
        fileUrl: settings.fileUrl,
        initOption: settings.initOption
      });
    }, '');

    self.$optionSelector.html(optionsHTML);
  }
};

/**
 * Рендер разметки
 */
ISnew.OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var renderType = option.option.renderType;

  //  если не получили шаблон
  if (!renderType) {
    throw new ISnew.tools.Error('ErrorOptionSelector', 'ошибка в получении шаблона');
  }

  return Template.render(option, renderType);
};

/**
 * инитим события
 */
ISnew.OptionSelector.prototype._bindEvents = function () {
  var self = this;

  if (document._optionSelectors) {
    return false;
  }

  document._optionSelectors = true;

  self._bindSetVariant();
  self._bindOptionTriggers();
  self._bindEvents();
  self._bindUpdateVariant();
};

/**
 * Навешиваем свой дефолтный слушатель для обновления рендера
 */
ISnew.OptionSelector.prototype._bindUpdateVariant = function () {
  var self = this;

  EventBus.subscribe('update_variant:insales:product', function (data) {
    if (data.action.method == 'update') {
      var product = self._owner.getInstance(data.action.product);
      var OptionSelector;

      if (!product) {
        return false;
      }

      OptionSelector = product.optionSelector;

      if (OptionSelector) {
        OptionSelector.$nativeSelect.val(data.id);
        OptionSelector._renderSelector();
      }
    }
  });
};

/**
 * Слушаем изменения в нативном селекте
 */
ISnew.OptionSelector.prototype._bindSetVariant = function () {
  var self = this;

  $(document).on('change', '['+ self.selectors.nativeSelect +']', function (event) {
    event.preventDefault();
    var $select = $(this);

    var variantId = _.toInteger($select.val());
    var $product = $select
      .parents('[data-product-id]:first')[0];

    var product = self._owner.getInstance($select);
    if (!product) {
      return false;
    }

    product.variants.setVariant(variantId);
  });
};

//  Слушаем изменения в селекторах модификаций
ISnew.OptionSelector.prototype._bindOptionTriggers = function () {
  var self = this;

  $(document).on('change click', '[data-option-bind]', function (event) {
    event.preventDefault();

    var $option = $(this);
    var product = self._owner.getInstance($option);
    var option;

    if ($option.is('select') && event.type === 'click') {
      return false;
    }

    if (!product) {
      return false;
    }

    option = {
      option_name_id: $option.data('option-bind'),
      position: $option.data('value-position')
    };

    if ($option.is('select')) {
      option.position = _.toInteger($option.val());
    }

    product.variants.setOption(option);
  });
};
/**
 * Типы цен
 *
 * @class
 * @name ISnew.ProductPriceType
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _owner ссылка на родительский класс ISnew.Products
 *
 */
ISnew.ProductPriceType = function (_owner) {
  var self = this;
  self._owner = _owner;

  self.price_kinds = {};

  self._init();

  return self;
};

ISnew.ProductPriceType.prototype._init = function () {
  var self = this;

  self.price_kinds = self._initPrices(self._owner.product);
};

/**
 * Инициализация
 */
ISnew.ProductPriceType.prototype._initPrices = function (product) {
  var self = this;
  var price_kinds = product.price_kinds;
  var price_types = {};

  _.forEach(product.variants, function (variant) {
    price_types[variant.id] = [];

    price_types[variant.id].push({
      min_quantity: 0,
      price: parseFloat(variant.price)
    });

    _.forEach(variant.prices, function (price, index) {
      price_types[variant.id].push({
        min_quantity: price_kinds[index].value,
        price: parseFloat(variant.prices[index])
      });
    })
  });

  return price_types;
};

/**
 * Получение актуальной цены за штуку
 */
ISnew.ProductPriceType.prototype.getPrice = function (options) {
  var self = this;
  var price = 0;

  _.forEach(self.price_kinds[options.variantId], function (price_type) {
    if (options.quantity < price_type.min_quantity) {
      return false;
    }

    price = price_type.price;
  });

  return price;
};
/**
 * Главный объект продукта
 *
 * @class
 * @name ISnew.Product
 *
 * @param {json} product json с информацией о товаре
 * @param {object} settings конфиг для рендера optionSelector
 *
 */
ISnew.Product = function (product, settings) {
  var self = this;

  // Банхамер должен быть на входе
  if (!product) {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче продукта');
  }

  self._selectors = {
    product: 'data-product-id',
  };

  _.merge(self, product);
  //  Валидация настроек
  self.settings = new ISnew.ProductSettings(settings, self);

  self._images = self._getImage(product.images);

  self._init();
};

/**
 * Инициализация
 */
ISnew.Product.prototype._init = function (){
  var self = this;

  // должен быть здесь, чтобы перезапустить при смене настроек.
  // TODO: вынести в отдельный метод, прикруть методы к Классам
  //self.variants = new ISnew.ProductVariants(self);
  self._instance = self._initInstance();
}

// ====================================================================================
//                          Методы по работе с изображениями продукта
// ====================================================================================

/**
 * Получаем объект с изображениями где ключом является название изображения
 *
 * @param  {array} images массив изображений продукта (product.images)
 *
 * @return {object} _images объект с изображениями в виде {'image.title': {small_url: 'http//'}}
 */
ISnew.Product.prototype._getImage = function (images) {
  var self = this;

  var _images = {};

  //  если у продукта есть изображения
  if (_.size(images) > 0) {
    _.forEach(images, function (image) {
      //  если у изображения есть title
      if (image['title']) {
        var imageName = image['title'].toLowerCase();
        _images[imageName] = {
          thumb_url: image['thumb_url'],
          small_url: image['small_url'],
          medium_url: image['medium_url'],
          large_url: image['large_url'],
          original_url: image['original_url']
        };
      }
    });
  }

  return _images;
}

/*
 * Инициализация форм()
 */
ISnew.Product.prototype._initInstance = function () {
  var self = this;

  self.$product = $('['+ self._selectors.product +'="'+ self.id +'"]');

  self.$product.each(function () {
    new ISnew.ProductInstance(self, $(this));
  });
};
/**
 * Класс отвечает за взаимодействие верскти с конкретным
 * экземпляром Product()
 */
ISnew.ProductInstance = function (_owner, $product) {
  var self = this;

  self.selectors = {
    //  селектор формы
    product: 'data-product-id',
    item: 'data-item-id',
    // data атрибут нативного селекта
    nativeSelect: 'data-product-variants',
    // data атрибут блока в который происходит рендер модификаций
    optionSelector: 'data-option-selector',

    quantity: 'data-quantity',
    quantityButton: 'data-quantity-change'
  }

  // настройки для экземпляра
  self._owner = _owner;

  self.settings = self._owner.settings;
  self.product = self._owner;
  self.quantity = {};

  self.type = 'product';

  self.$product = $product;

  // прибиваем экземпляр к узлу
  $product[0].Product = self;

  self._init ();
};

/**
 * Инициализация связки
 */
ISnew.ProductInstance.prototype._init = function () {
  var self = this;

  // привязываем нужные объекты
  self.variants = new ISnew.ProductVariants(self);
  self._initQuantity();
  self.price_kinds = new ISnew.ProductPriceType(self);

  if (self.$product.data('item-id')) {
    self.type = 'item';
  }

  self._initOptionSelectors();
  self._bindUpdateCart();
};

/**
 * Инициализация селектора
 */
ISnew.ProductInstance.prototype._initOptionSelectors = function () {
  var self = this;
  var _isActive = _.isObject(self.optionSelector);

  self._hasSelector = self.$product.find('['+ self.selectors.nativeSelect +']').length;

  if (!self._hasSelector) {
    return false;
  }

  if (!_isActive) {
    // У нас нет активных селекторов
    // заряжаем
    self.optionSelector = new ISnew.OptionSelector(self);
  } else {
    // данный селектор активен
    // наверное оти перезаписать настройки
    self.optionSelector._init();
  }

  // Дергаем вариант
  if (self.product.settings.initOption) {
    self.variants._update();
  }
};

/**
 * Инициализация счетчиков
 */
ISnew.ProductInstance.prototype._initQuantity = function () {
  var self = this;
  var $quantity = self.$product.find('['+ self.selectors.quantity +']');

  $quantity.each(function (index) {
    self.quantity[index] = new ISnew.ProductQuantity(self, this);
  });
};

/**
 * Получаем конкретный экземпляр.
 * Возвращет экземпляр, либо false
 */
ISnew.ProductInstance.prototype.getInstance = function ($object) {
  var self = this;
  var instance;

  if (_.isObject($object[0].Product)) {
    instance = $object[0];
  } else {
    instance = $object.parents('['+ self.selectors.product +']:first')[0];
  }

  if (!instance) {
    instance = false;
  } else {
    instance = instance.Product
  }

  return instance;
};

/**
 * Обновление состояния
 * Должна сама забирать всю информацию из компонентов и обновлять
 * максимум - получить линк на quantity, откуда брать актуальную инфу
 * о кол-ве
 */
ISnew.ProductInstance.prototype._updateStatus = function (status) {
  var self = this;
  var _variant;
  var _quantity;
  var _atCart;
  var _$input;

  // если обновление вызвала смена варианта, то обновляем чиселку
  // и убиваем поток
  _$input = self.quantity[0];

  // если в верстке не указан контейнеры со счетчиками - отваливаемся
  if (_$input === undefined) {
    console.warn('Product: Quantity', 'Не указан блок "Количество товаров" для ', self.$product);
    return false;
  }

  if (status.event == 'update_variant') {
    _$input.setVariant(self.variants.getVariant());
    return false;
  };

  // немного магии
  if (self._hasSelector) {
    // если в инстансе есть селектор
    _variant = self.variants.getVariant();
    _quantity = _$input.get();
    _$input = _$input.$input;
  } else {
    // если у нас куча считалок
    _variant = status.instance.variant;
    _quantity = status.instance.get();
    _$input = status.instance.$input;
  }

  _atCart = Cart.order.getItemByID(_variant.id);

  if (_atCart && self.settings && self.type != 'item') {
    _quantity += _atCart.quantity;
  }

  // получаем тип цены
  var _price = self.price_kinds.getPrice({
    variantId: _variant.id,
    quantity: _quantity.current
  });

  // формируем действие
  _variant.action = {
    method: status.method,
    product: self.$product,
    price: _price,
    quantity: _quantity,
    quantityInput: _$input
  };

  EventBus.publish('before:insales:'+ self.type, _variant);

  if (status.event != 'update_variant') {
    EventBus.publish(status.event +':insales:'+ self.type, _variant);
  }

  EventBus.publish('update_variant:insales:'+ self.type, _variant);

  EventBus.publish('always:insales:'+ self.type, _variant);
};

/**
 * Слушатель на обновление корзины
 */
ISnew.ProductInstance.prototype._bindUpdateCart = function () {
  var self = this;

  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (data.action.method != 'init') {
      _.forEach(self.quantity, function (quantity) {
        // Добавлен дебаунс для предотвращени
        _.debounce(quantity._update, 200);
      });
    }
  });
};
/**
 * Класс для работы с полем кол-во товара
 */
ISnew.ProductQuantity = function (_owner, _quantityNode) {
  var self = this;

  // задаем базывае
  self._owner = _owner;
  self.settings = self._owner.settings;
  self.selectors = self._owner.selectors;
  self.variant = {};

  self.quantity = {
    current: 0,
    toCheck: 0,
    max: 10000000,
    min: 0
  };
  self.unit = 'pce';
  self.decimal = 0;

  // привязываем узел
  self.node = _quantityNode;
  self.$node = $(_quantityNode);
  // сохраняем линк на наше поле ввода
  self.$input = self.$node.find('input[name]');

  // привязываем экземпляр к узлу
  _quantityNode.Quantity = self;

  self._init();
};

/**
 * Инициализаций
 */
ISnew.ProductQuantity.prototype._init = function () {
  var self = this;
  var _settings;
  var _variant;

  // снимаем с конфиги
  _settings = self._getConfig();

  self.quantity = {
    current: self._getQuantity(),
    toCheck: self._getQuantity()
  };

  // уточняем из товара единицу измерения
  self.unit = self._owner.product.unit;

  // определяем точность
  self.decimal = _.toInteger(self.settings.decimal[self.unit]) || 0;

  // определяем, с каким вариантом мы работаем
  if (_settings.variantId) {
    self.variant = self._owner.variants.getVariantById(_settings.variantId);
  } else {
    self.variant = self._owner.variants.getVariant();
  }

  // определяем максимум
  if (self.variant.quantity && self.settings.useMax) {
    self.quantity.max = self._fixValue(self.variant.quantity);
  }

  // шаг
  self.step = self._fixValue(_settings.step || Math.pow(10, -1 * self.decimal));
  // определяем минимальное кол-во
  self.quantity.min = self._fixValue(_settings.min || self.step);

  self._check();
  self._bindEvents();
};

/**
 * Забираем data- из поля ввода
 * data-quantity - '' или id variant
 * data-step - шаг
 * data-min - минимальное
 */
ISnew.ProductQuantity.prototype._getConfig = function () {
  var self = this;
  var _config = self.$node.data() || {};
  var _name = _.words(self.$input.attr('name'));
  var _variant;

  if (_name[0] == 'variant' || _name[0] == 'cart') {
    _config.variantId = _.toInteger(_name[2]);
  }

  return _config;
};

/**
 * Забираем текущее значение
 */
ISnew.ProductQuantity.prototype._getQuantity = function () {
  var self = this;

  var _value = self.$input.val();
  // TODO: исправить! у нас может быть форма без инпутов???
  _value = _value ? _value.replace(',', '.').replace(/[^0-9.]/g, '') : 1;

  return self._fixValue(_value);
};

/**
 * Указываем вариант, с которым работаем ???
 */
ISnew.ProductQuantity.prototype.setVariant = function (variant) {
  var self = this;

  self.variant = variant;
  self._check();
};

/**
 * Получение текущего количества и прочей инфы
 */
ISnew.ProductQuantity.prototype.get = function () {
  var self = this;
  var _quantity = _.clone(self.quantity);
  _.unset(_quantity, 'toCheck');

  if (!self.settings.useMax) {
    _.unset(_quantity, 'max');
  }

  return _quantity;
};

/**
* Добавляем значение по клику на кнопку
*/
ISnew.ProductQuantity.prototype._changeQuantity = function (value) {
  var self = this;

  self.quantity.toCheck += self._fixValue(value);

  self._check();
};

/**
 * Устанвливаем новое значение при изменении поля
 */
ISnew.ProductQuantity.prototype._setQuantity = function () {
  var self = this;

  self.quantity.toCheck = self._getQuantity();

  self._check();
};

/**
 * Проверка
 */
ISnew.ProductQuantity.prototype._check = function () {
  var self = this;
  var _initState = _.clone(self.quantity);

  // если больше
  if (self.settings.max && self.quantity.toCheck > self.quantity.max) {
    self.quantity.toCheck = self.quantity.max;
  }

  // ушли меньше возможного минимума
  if (isNaN(self.quantity.toCheck) || self.quantity.toCheck < self.quantity.min) {
    self.quantity.toCheck = self.quantity.min;
  }

  self.quantityChanged = false;

  // после всех этих хитрых манипуляций у нас что-то изменилось?
  if (self.quantity.current !== self.quantity.toCheck) {
    self.quantity.current = self._fixValue(self.quantity.toCheck);
    self.quantityChanged = true;
  }
  // дергаем статусы
  self._update();
};

/**
 * Обновляем мир
 */
ISnew.ProductQuantity.prototype._update = function () {
  var self = this;

  self.$input.val(self.quantity.current.toFixed(self.decimal));

  setTimeout(function () {
    var eventName = self.quantityChanged ? 'change_quantity' : 'unchange_quantity';
    self._owner._updateStatus({
      'event': eventName,
      method: 'update',
      instance: self,
    });
  }, 0);
};

/**
 * Вытаскиваем эекземпляр класса
 */
ISnew.ProductQuantity.prototype._getInstance = function ($selector) {
  var self = this;
  var _instance = $selector.parents('['+ self.selectors.quantity+']')[0];

  if (_instance !== undefined) {
    _instance = _instance.Quantity
  } else {
    // если не нашли экземпляр - говорим, что продолбалось, отваливаемся
    console.warn('Product: Quantity', 'Не указан блок "Количество товаров" для', $selector);
    return false;
  }

  return _instance;
};

/**
 * Биндим события
 */
ISnew.ProductQuantity.prototype._bindEvents = function () {
  var self = this;

  // очередной костыль в мой гроб
  if (document.ProductQuantity) {
    return false;
  };

  self._bindQuantityButtons();
  self._bindQuantityInput();

  document.ProductQuantity = true;
};

/**
 * Слушаем нажатия на кнопки +-
 */
ISnew.ProductQuantity.prototype._bindQuantityButtons = function () {
  var self = this;

  $(document).on('click', '['+ self.selectors.quantityButton +']', function (event) {
    event.preventDefault();

    var $quantityButton = $(this);
    var quantity = self._getInstance($quantityButton);

    quantity._changeQuantity($quantityButton.data('quantity-change'));
  });
};

/**
 * Слушаем поле.
 */
ISnew.ProductQuantity.prototype._bindQuantityInput = function () {
  var self = this;

  function _updateQuantity (event) {
    event.preventDefault();

    self._getInstance($(this))
      ._setQuantity();
  };

  $(document)
    .on('blur change', '['+ self.selectors.quantity +'] input[name]', _.debounce(_updateQuantity, 150))
    .on('keypress', '['+ self.selectors.quantity +'] input[name]', function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        event.stopPropagation();

        self._getInstance($(this))
          ._setQuantity();
      }
    });
};

ISnew.ProductQuantity.prototype._fixValue = function (_value) {
  var self = this;

  return _.chain(_value)
    .toFinite()
    .round(self.decimal)
    .value();
};
/**
 * Класс для работы с настройками Продукта
 */
ISnew.ProductSettings = function (settings, _owner) {
  var self = this;

  self._default = {
    options: {
      default: 'option-default'
    },
    showVariants: true,
    initOption: true,
    fileUrl: {},
    filtered: true,

    useMax: false,
    decimal: {
      kgm: 1,
      dmt: 1
    },
    withCart: false
  };

  self._owner = _owner;

  self._set(settings);
}

/**
 * Выставляем настройки, делаем немного магии
 */
ISnew.ProductSettings.prototype._set = function (settings) {
  var self = this;

  _.merge(self, self._default, settings);

  self._patch();
};

/**
 * всякие доп проверки
 */
ISnew.ProductSettings.prototype._patch = function () {
  var self = this;

  _.forEach(self.options, function (templateId, option) {
    // Патчим шаблоны для рендера.
    // Если такой шаблон не подключен к системе - ставим дефолтный вариант
    if (!Template.has(templateId)) {
      self.options[option] = 'option-default';
    }
  });
};

/**
 * Жестко ставим настройки из-вне
 */
ISnew.ProductSettings.prototype.set = function (settings) {
  var self = this;

  self._set(settings);

  self._owner._init();
};
/**
 * Конструктор объета по работе с вариантами продукта
 * @class
 * @name ISnew.ProductVariants
 *
 * @example
 * self.variants = new ISnew.ProductVariants(_owner);
 *
 * @param  {object} _owner родительский объект класса Product
 *
 * @property {array} variants массив модификаций продукта
 * @property {object} images картики продукта в виде {'title': {small_url: 'http//'}}
 * @property {number} urlVariant id варианта из урла
 * @property {object} options все опции продукта со всеми своими значениями
 * @property {object} tree дерево вариантов
 *
 */
ISnew.ProductVariants = function (_owner) {
  var self = this;

  self._owner = _owner;
  self._variants = {};
  self.variants = self._owner.product.variants;
  self.urlVariant = Site.URL.getKeyValue('variant_id');

  self._init()
};

/**
 * Инициализация объекта по работе с вариантами
 */
ISnew.ProductVariants.prototype._init = function () {
  var self = this;

  // создаем опции
  self.options = self._initOptions();
  // создаем дерево
  self.tree = self._initTree();
  // проставляем выбранные опции
  self.options = self._selectedOptions(self.options);
};

/**
 * Смена родителя
 */
ISnew.ProductVariants.prototype.setOwner = function (_owner) {
  var self = this;

  self._owner = _owner;

  return;
};

// ====================================================================================
//                          Методы по работе с деревом вариантов
// ====================================================================================

/**
 * Строим дерево вариантов
 */
ISnew.ProductVariants.prototype._initTree = function () {
  var self = this;
  var variants = self._owner.product.variants
  var tree = {};

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var leaf = tree;

    self._variants[variant.id] = variant;

    if (variant.option_values.length) {
      // все хорошо, у нас много опций
      // Разбираем опции
      self._parseVariantOptions(variant, leaf);
    } else {
      // все плохо, у нас один вариант, нет опций
      self._addLeaf({ id: 0, title: '_empty', position: 0 }, leaf, { id: variant.id, available: variant.available });
    }
  });

  _.forEach(tree, function (leaf) {
    self._nodeAvailable(leaf);
  });

  return tree;
};

// ====================================================================================
//                          Методы по работе с вариантом
// ====================================================================================

/**
 * Разбор Опций варианта
 */
ISnew.ProductVariants.prototype._parseVariantOptions = function (variant, leaf) {
  var self = this;

  _.forEach(variant.option_values, function(option, index) {
    // Добавляем новое значение в опцию
    self._addValues(option, index);

    var _variantSet = {
      id: undefined,
      available: undefined
    }

    // Если дошли до последней опции - выставляем вариант и доступность
    var _isLast = (index == (variant.option_values.length - 1));

    if (_isLast) {
      _variantSet = {
        id: variant.id,
        available: variant.available
      };
    }

    self._addLeaf(option, leaf, _variantSet);

    leaf = leaf[option.position].tree;
  });
};

/**
 * Добавляем узел дерева
 */
ISnew.ProductVariants.prototype._addLeaf = function (option, leaf, _variantSet) {
  var self = this;

  // Если такую опцию мы еще не вносили - вбиваем все, что есть.
  if (!leaf[_.toInteger(option.position)]) {
    leaf[_.toInteger(option.position)] = {
      id: _.toInteger(option.id),
      tree: {},
      title: option.title,
      name: option.title.toLowerCase(),
      variant_id: _variantSet.id,
      position: _.toInteger(option.position)
    };
  };

  // Выставляем доступность
  if (_variantSet.available !== undefined) {
    leaf[_.toInteger(option.position)].available = _variantSet.available;
  };

  return;
};

/**
 * Установка доступности вариантов
 *
 * Если все потомки узла недоступны - узел недоступен
 */
ISnew.ProductVariants.prototype._nodeAvailable = function (leaf) {
  var self = this;

  if (leaf.variant_id === undefined) {
    var isAvailable = false;

    _.forEach(leaf.tree, function (child){
      if (self._nodeAvailable(child)) {
        isAvailable = true;
      };
    });

    leaf.available = isAvailable;
  };

  return leaf.available;
};

/**
 * Обновляем состояние вариантов
 */
ISnew.ProductVariants.prototype._update = function () {
  var self = this;

  self._owner._updateStatus({
    event: 'update_variant',
    method: 'change'
  });

  //  если есть id в урле обновляем вариант
  if (self.urlVariant) {
    self._setOptionByVariant(self.urlVariant);
    self.urlVariant = false;
  }

  return;
};

/**
 * Получить значения с уровня
 */
ISnew.ProductVariants.prototype.getLevel = function (level) {
  var self = this;
  var leaf = self.tree;

  _.forEach(self.options, function(option, option_level) {
    if (level == option_level) {
      return false;
    }
    leaf = leaf[option.selected].tree;
  });

  return leaf;
};

/**
 * Получить первый элемент на уровне
 */
ISnew.ProductVariants.prototype.getFirst = function (leaf) {
  var self = this;

  var first = _.chain(leaf)
    .toArray()
    .first()
    .value();

  return first;
};

/**
 * Получаем выбранный вариант
 */
ISnew.ProductVariants.prototype.getVariant = function () {
  var self = this;
  var branch = _.get(self, self._getSelectedVector());
  var branchId = branch.variant_id;
  var id;

  //  если есть id в урле подменяем вариант
  if (self.urlVariant) {
    branchId = self.urlVariant;
  }

  id = _.findKey(self.variants, function(variant) {
    return variant.id == branchId;
  });

  //  если поиск по варианту из урла ничего не выдал
  if (!id) {
    id = _.findKey(self.variants, function(variant) {
      return variant.id == branch.variant_id;
    });
  }

  return self.variants[id];
};

/**
 * Получаем выбранный вариант
 */
ISnew.ProductVariants.prototype.getVariantById = function (_id) {
  var self = this;

  return self._variants[_id];
};

/**
 * Устанавливаем вариант
 */
ISnew.ProductVariants.prototype.setVariant = function (variant_id) {
  var self = this;
  var settings = self._owner.settings

  // TODO: пихнуть эту штуку в более актуальное место
  // нужна для принудительного выбора модификации
  if (!settings.initOption) {
    settings.initOption = true;
  }

  self._setOptionByVariant(variant_id);

  self._update();
  return;
};
// ====================================================================================
//                          Методы по работе с опциями
// ====================================================================================

/**
 * Подготовка опций
 *
 * @return {object} options модифицированный объект опций, добавляется renderType из параметров продукта, добавляется handle как название опции транслитом.
 */
ISnew.ProductVariants.prototype._initOptions = function () {
  var self = this;

  var options = self._owner.product.option_names;
  //  получаем параметры рендера опций
  var settingsOptions = self._owner.settings.options;

  if (options.length) {
    // все хорошо, у нас есть опции
    _.forEach(options, function(option, index) {
      // название опции транслитом
      option.handle = Site.Translit.replace(option.title);

      // Выставляем шаблон для опции, либо из настроек, либо дефолтный шаблон
      option.renderType = settingsOptions[option.title] || settingsOptions.default;

      // массив значений опции
      option.values = {};
    });
  } else {
    // всё плохо - у товара один вариант, свойств нет
    options[0] = {
      handle: '_empty',
      title: '_empty',
      values: {},
      renderType: settingsOptions.default,
      position: 0,
      id: 0
    };
  }

  return options;
}

/**
 * Собираем все значения опций варианта в опции по индексу (self.options[index].values)
 *
 * @param {object} value значение опции, прилетает из перебора всех вариантов. value добавляется в объект self.options[index].values.
 * @param {number} index порядковый номер опции.
 */
ISnew.ProductVariants.prototype._addValues = function (value, index) {
  var self = this;

  var optionValues = self.options[index].values;

  if (!optionValues[value.position]) {
    optionValues[value.position] = value;
    optionValues[value.position].name = optionValues[value.position].title.toLowerCase();
  }
}

/**
 * Устанавливаем selected
 *
 * @param  {object} options объект со всеми опциями (self.options)
 *
 * @return {object} options модифицированный self.options c новым свойством selected. option.selected содержит позицию выбранного значения.
 */

// TODO: у нас может быть ситуация, когда нет опций в товаре.
ISnew.ProductVariants.prototype._selectedOptions = function (options) {
  var self = this;
  var leaf = self.tree;

  _.forEach(options, function(option, index) {
    var first = self.getFirst(leaf);

    options[index].selected = first.position;
    leaf = first.tree;
  });

  return options;
};

/**
 * Устанавливаем опцию внешним обработчиком.
 * АХТУНГ!!! Влечет обновление актуального варианта!
 */
ISnew.ProductVariants.prototype.setOption = function (option) {
  var self = this;

  var index = _.findKey(self.options, function (_option) {
    return _option.id == option.option_name_id;
  });

  // Если не опцию не меняли - на выход
  if (self.options[index].selected == option.position && self._owner.settings.initOption) {
    return;
  }

  self.options[index].selected = option.position;

  /**
   * Проходим по выбранным опциям и фиксим неприавльно выбранные.
   * Неправильные - если при текущем варианте мы уходм в лес.
   */
  _.forEach(self.options, function (_option, index) {
    var isLeaf = _.get(self, self._getSelectedVector(index + 1));

    // Если мы не можем найти такую ветку - вытаскиваем строение уровня
    // и помечаем первое свойство как выбранное
    if (isLeaf === undefined) {
      var leaf = self.getLevel(index);
      var first = self.getFirst(leaf);

      _option.selected = first.position;
    }
  });

  if (! self._owner.settings.initOption) {
    self._owner.settings.initOption = true;
  }

  self._update();
  return;
};

/**
 * Получить опцию
 */
ISnew.ProductVariants.prototype.getOption = function (index) {
  var self = this;

  return self.options[index];
};

/**
 * Фильтрация опций по доступности в выбанном варианте
 *
 * @param  {number} level уровень опции в дереве (self.tree)
 * @return {object} option опция готовая для рендера, в значениях опции проставлен value.disabled или удалены не относящиеся к варианту значения в зависимости от настроек продукта (self._owner.settings.filtered);
 */
ISnew.ProductVariants.prototype.getFilterOption = function (level) {
  var self = this;

  var option = _.cloneDeep(self.getOption(level));
  var values = self.getLevel(level);

  _.forEach(option.values, function (value, index) {
    if (!values[value.position]) {
      //  если стоит фильтрация то ставим disabled, иначе удаляем ключ
      if (self._owner.settings.filtered) {
        value.disabled = true;
      }else{
        delete option.values[index];
      }
    }
  });

  return option;
};

/**
 * Установить опции по варианту
 */
ISnew.ProductVariants.prototype._setOptionByVariant = function (variant_id) {
  var self = this;

  var index = _.findKey(self.variants, function (variant) {
    return variant.id == variant_id;
  });

  if (self.variants[index]) {
    _.forEach(self.variants[index].option_values, function(option, option_index) {
      self.options[option_index].selected = option.position;
    });
  }
  return;
};

/**
 * генерим путь по выбранным опциям
 */
ISnew.ProductVariants.prototype._getSelectedVector = function (_length) {
  var self = this;
  var vector = '';
  _length = (_length || self.options.length) - 1;

  _.forEach(self.options, function(option, index) {
    vector += '.tree['+ (option.selected) +']';
    if (_length == index) {
      return false;
    }
  });

  return vector;
};
/**
 * Централизованная работа с товарами
 */
ISnew.Products = function () {
  var self = this;

  // настройки
  self._settings = {};
  // объект с готовыми к употреблению товарами
  self._products = {};

  // массив с актуальными id (которые есть на странице +-)
  self._storage = new ISnew.ProductsStorage(self);

  self._init();
};

/**
 * Инициализация
 */
ISnew.Products.prototype._init = function () {
  var self = this;

  self._getDomId()
    .done(function (idList) {
      self._getList(idList);
    });
};

/**
 * Получаем готовый к употреблению товар
 */
ISnew.Products.prototype.get = function (id) {
  var self = this;

  id = _.toInteger(id);

  return self._getOne(id);
};

/**
 * Получение списка товаров
 */
ISnew.Products.prototype.getList = function (idList) {
  var self = this;

  idList = _.toArray(idList);

  return self._getList(idList);
};

/**
 * Обновление настроек продуктов созданных через
 */
ISnew.Products.prototype.setConfig = function (settings){
  var self = this;

  self._settings = settings;

  _.forEach(self._products, function (product) {
    product.settings.set(self._settings);
  });
};

/**
 * Получение списка из id из DOM
 */
ISnew.Products.prototype._getDomId = function () {
  var self = this;
  var result = $.Deferred();
  var _idList = [];

  $(function () {
    $('[data-product-id]').each(function (index, form) {
      var id = _.toInteger($(form).data('product-id'));

      _idList.push(id);
    });

    result.resolve(_.uniq(_idList));
  });

  return result.promise();
};

/**
 * Получение списка товаров
 */
ISnew.Products.prototype._getList = function (_idList) {
  var self = this;
  var result = $.Deferred();

  // проверить все ли товары инициализированны?
  var diffId = _.difference(_idList, self._actualId);

  if (diffId.length) {
    // чего-то нет
    // Забираем из харнилища
    self._storage.getProducts(diffId)
      .done(function (products) {
        // инитим товары
        _.forEach(products, function (product) {
          self._initProduct(product);
        });

        // отдаем результат
        result.resolve(_.pick(self._products, _idList));
      });
  } else {
    // всё есть - отдаем
    result.resolve(_.pick(self._products, _idList));
  }

  return result.promise();
};

/**
 * Получение информации о товаре
 */
ISnew.Products.prototype._getOne = function (_id) {
  var self = this;
  var result = $.Deferred();

  // а по сути нужно сделать все тоже, что и в
  // _getList, но забрать первый элемент
  self._getList([_id])
    .done(function (products) {
      products = _.toArray(products);
      result.resolve(products[0]);
    });

  return result.promise();
};

/**
 *
 */
ISnew.Products.prototype._initProduct = function (_productJSON) {
  var self = this;

  self._products[_productJSON.id] = new ISnew.Product(_productJSON, self._settings);
};
/**
 * Класс Хранилища json Товаров
 * управляет всем процессом получения и хранения json'ов
 */
ISnew.ProductsStorage = function (_owner) {
  var self = this;

  self._settings = {
    maxProducts: 100,
    json: 'products',
    liveTime: 300000 // milisec
  };

  self._owner = _owner;
  self._storage = localStorage;

  // объект для хранения json
  self._json = {};

  self._init();
}

/**
 * Инициализация
 */
ISnew.ProductsStorage.prototype._init = function () {
  var self = this;

  // грузим сохраненные товары
  self._json = self._loadJSON();

  self._checkAlive();
};

/**
 * Отдаем json'ы товаров и хранилища
 */
ISnew.ProductsStorage.prototype.getProducts = function (_idList) {
  var self = this;
  var result = $.Deferred();

  // проверим, про какие товары мы ничего не знаеи?
  var diffId = _.differenceBy(_idList, _.keys(self._json), _.toInteger);

  if (diffId.length) {
    // если про что-то не знаем - тащим всю портянку
    ISnew.json.getProductsList(diffId)
      .done(function (_JSONs) {
        // обрабатываем ответы
        self._updateJSON(_JSONs);

        // отдаем результат
        result.resolve(_.pick(self._json, _idList));
      });
  } else {
    // всё есть - отдаем информацию
    result.resolve(_.pick(self._json, _idList));
  }

  return result.promise();
};

/**
 * Получение сохраненных товаров
 */
ISnew.ProductsStorage.prototype._loadJSON = function () {
  var self = this;
  var _json = self._storage.getItem(self._settings.json);

  _json = JSON.parse(_json) || {};

  return _json;
};

/**
 * Сохранение товаров
 */
ISnew.ProductsStorage.prototype._saveJSON = function () {
  var self = this;
  var _json = JSON.stringify(self._json);

  self._storage.setItem(self._settings.json, _json);

  return;
};

/**
 * Обновление базы )
 */
ISnew.ProductsStorage.prototype._updateJSON = function (_JSONs) {
  var self = this;

  // Добавляем записи
  _.forEach(_JSONs, function (_json) {
    _json.updatedAt = _.now();
    self._json[_json.id] = _json;
  });

  // сохранаяем все добро
  self._saveJSON();

  return;
};

/**
 * Проверяем актуальность записей
 */
ISnew.ProductsStorage.prototype._checkAlive = function () {
  var self = this;
  var currentMoment = _.now();

  _.forEach(self._json, function(_json, key) {
    var _isValid = (currentMoment - _json.updatedAt) < self._settings.liveTime;
    if (!_isValid) {
      _.unset(self._json, key);
    };
  });
};
/**
 * Сравнение товаров
 */

// TODO: сделать синглтон
ISnew.Compare = function (options) {
  options = options || {};

  var self = this;
  self.products = [];
  self.maxItems = options.maxItems || 4;

  self.ui = new ISnew.CompareDOM(options);

  // Обновляемся
  self._update();
};

/**
 * Добавляем товар
 */
ISnew.Compare.prototype.add = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'add_item';

  // если достигли максимального кол-ва товаров
  // кидаем остановку
  if (self.products.length >= self.maxItems) {
    task.method = 'overload';
    self._events(task);
    self._always(task);

    return;
  } else if (_.findIndex(self.products, task.item) != -1) {
    task.method = 'in_list';
    self._events(task);
    self._always(task);

    return;
  } else {
    self._before(task);
    ISnew.json.addCompareItem(task.item)
      .done(function (response) {
        self._update(task);
      })
      .fail(function (response) {
        console.log('fail: ', response);
        // Завернуто сюда, потому что в done идет ещё один
        // ajax запрос. Нужно сделать удобные ответы на эти запросы
        self._always(task);
      });
  }
};

/**
 * Удаляем товар
 */
ISnew.Compare.prototype.remove = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'remove_item';

  self._before(task);
  ISnew.json.removeCompareItem(task.item)
    .done(function (response) {
      self._update(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
      // Завернуто сюда, потому что в done идет ещё один
      // ajax запрос. Нужно сделать удобные ответы на эти запросы
      self._always(task);
    });
};

/**
 * Обновляем состояние сравнения
 */
ISnew.Compare.prototype.update = function () {
  var self = this;

  self._update({
    method: 'update_items'
  });
};

/**
 *
 */
ISnew.Compare.prototype.getCompare = function () {
  var self = this;

  return self;
};

/**
 * Получение актуальной инфы с сервера
 */
ISnew.Compare.prototype._update = function (task) {
  var self = this;

  task = task || {};
  task.method = task.method || 'init';

  if (task.method == 'init' || task.method == 'update_items') {
    self._before(task);
  }

  ISnew.json.getCompareItems()
    .done(function (response) {
      self.products = response.products;
      self._events(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
    })
    .always(function () {
      self._always(task);
    });
};

/**
 * Вызов событий
 */
ISnew.Compare.prototype._events = function (task) {
  var self = this;
  var data = self;
  data.action = task;
  EventBus.publish(task.method +':insales:compares', data);

  if (data.action.method != 'update_items' && data.action.method != 'overload') {
    EventBus.publish('update_items:insales:compares', data);
  }
};

/**
 * Событие ПЕРЕД действием
 */
ISnew.Compare.prototype._before = function (task) {
  EventBus.publish('before:insales:compares', task);
};

/**
 * Мы закончили что-то делать в сравнении
 */
ISnew.Compare.prototype._always = function (task) {
  EventBus.publish('always:insales:compares', task);
};
/**
 * DOM + ISnew.Compare
 */

ISnew.CompareDOM = function (options) {
  var self = this;

  self._init(options);
}

ISnew.CompareDOM.prototype._init = function (options) {
  var self = this;

  self.options = {
    add: 'data-compare-add',
    delete: 'data-compare-delete',

    disabled: 'disabled',
    inProcess: 'inProcess'
  };

  self._bindAddItem();
  self._bindDelteItem();
};

/**
 * Обработчик добавления
 */
ISnew.CompareDOM.prototype._bindAddItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.add +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._addItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    var try_added = (data.method == 'add_item' || data.method == 'overload');
    if (data.button && try_added) {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика добавления товара в сравнение по кнопке
 */
ISnew.CompareDOM.prototype._addItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.add))
  };

  Compare.add(task);
  return;
};

/**
 * Обработчик удаления
 */
ISnew.CompareDOM.prototype._bindDelteItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.delete +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._deleteItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    if (data.button && data.method == 'remove_item') {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика удаления товара из сравнения по кнопке
 */
ISnew.CompareDOM.prototype._deleteItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.delete))
  };

  Compare.remove(task);
};
/**
 * Live search
 *
 * @class
 * @name ISnew.Search
 */
ISnew.Search = function () {
  var self = this;

  // настройки по-умолчанию
  self._default = {
    settings: {
      searchSelector: 'data-search-field',
      resultPlaceholder: 'data-search-result',
      markerClass: 'ajax_search-marked',
      letters: 3,
      template: 'search-default',
      delay: 300
    }
  };

  //
  self.path = '/search_suggestions';
  self.keyupTimeoutID = '';

  self._init();
}

/**
 * Настройка
 *
 * @param  {object} options конфигурация поиска
 */
ISnew.Search.prototype._init = function () {
  var self = this;

  self.setConfig({});

  self._ui = new ISnew.SearchDOM(self);
};

/**
 * Что-то забираем
 * {
 *   query: string
 *   input: jquery(input)
 * }
 */
ISnew.Search.prototype._get = function (options) {
  var self = this;

  EventBus.publish('before:insales:search');

  clearTimeout(self.keyupTimeoutID);

  if (self._isValid(options.query)) {
    self.data.query = options.query;
    self.keyupTimeoutID = setTimeout(function () {
      $.getJSON(self.path, self.data, function (response) {
        self._update(_.merge(options, response));
      });
    }, self.settings.delay);
  } else {
    self._update(options);
  }
};

ISnew.Search.prototype._update = function (options) {
  var self = this;

  var data = {
    suggestions: self._patch(options),
    action: options
  };

  data.invalid = !self._isValid(options.query);
  data.empty = !_.size(options.suggestions);
  data.letters = self.settings.letters;

  _.unset(data.action, 'suggestions');

  EventBus.publish('update:insales:search', data);
};

/**
 * Обновляем настройки
 */
ISnew.Search.prototype.setConfig = function (settings) {
  var self = this;

  _.merge(self, self._default, { settings: settings });

  self.settings.replacment = '<span class="'+ self.settings.markerClass +'">$1</span>';
}

/**
 * Параметры запросов
 *
 * Тащим поля из настроек магазина и текущей локали
 * account_id: Site.account.id,
 * locale: Site.language.locale,
 * fields: [ 'price_min', 'price_min_available' ],
 * hide_items_out_of_stock: Site.account.hide_items
 */
ISnew.Search.prototype._setData = function (_data) {
  var self = this;

  _.merge(self, { data: _data });
};

/**
 * приводим в общий порядок список поиска
 */
ISnew.Search.prototype._patch = function (options) {
  var self = this;
  var _regExp = new RegExp('('+ Site.RegExp.escape(options.query) +')', 'gi');

  return _.reduce(options.suggestions, function (result, product) {
    var temp = {
      id: product.data,
      url: '/product_by_id/'+ product.data,
      title: product.value,
      markedTitle: product.value.replace(_regExp, self.settings.replacment)
    };

    result.push(_.merge(product, temp));
    return result;
  }, []);
};

ISnew.Search.prototype._isValid = function (query) {
  var self = this;

  return query !== '' && query.length >= self.settings.letters;
};
ISnew.SearchDOM = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.settings = self._owner.settings;

  self.settings.inProcess = 'inProcess';

  self._init();
}

ISnew.SearchDOM.prototype._init = function () {
  var self = this;

  self._setConfig();
  self._keyUp();
  self._events();
  self._outFocus();
};

/**
 * Грузим настройки по готовности DOM
 */
ISnew.SearchDOM.prototype._setConfig = function () {
  var self = this;

  $(function () {
    self._owner._setData({
      account_id: Site.account.id,
      locale: Site.language.locale,
      fields: ['price_min', 'price_min_available'],
      hide_items_out_of_stock: Site.account.hide_items
    });

    self.$searchField = $('['+ self.settings.searchSelector +']');
    self.$searchForm = self.$searchField.parents('form:first');

    self.$searchField.attr(self.settings.inProcess, false);
  });
};

ISnew.SearchDOM.prototype._getInstance = function ($object) {
  var self = this;
  var $search;
  var _target = $object.data('target');

  if (_target) {
    $search = $(_target);
  } else {
    $search = $object.parents('form:first');
  }

  return $search;
};

/**
 * Обработчик ввода символов
 */
ISnew.SearchDOM.prototype._keyUp = function () {
  var self = this;

  $(document).on('keyup', '['+ self.settings.searchSelector +']', function () {
    var $input = $(this);
    var $form = self._getInstance($input);
    var _query = $input.val();
    var _inProcess = $input.prop(self.settings.inProcess);

    document._searchActive = true;

    // блокировка ввода
    if (_inProcess) {
      return;
    }

    if ($input[0]._queryLength == _query.length) {
      return
    }

    $input[0]._queryLength = _query.length;
    $input.prop(self.settings.inProcess, true);

    self._owner._get({
      query: _query,
      input: $input,
      form: $form
    });
  });
};

/**
 * Вешаем слушателя на обновление данных из поиска
 */
ISnew.SearchDOM.prototype._events = function () {
  var self = this;

  EventBus.subscribe('update:insales:search', function (data) {
    var $node;

    if (data.action.form) {
      // срабатывает на события внутри формы
      $node = data.action.form
        .find('['+ self.settings.resultPlaceholder +']');
    } else {
      // убиваем потраха во всех формах
      $node = $('['+ self.settings.resultPlaceholder +']')
    }

    $node.html(Template.render(data, self.settings.template));

    document._searchActive = false;

    // если указан инпут, который надо разлочить
    if (data.action.input) {
      data.action.input
        .prop(self.settings.inProcess, false)
        .trigger('keyup');
    }
  });
};

/**
 * Перехватываем клик вне поиска
 */
ISnew.SearchDOM.prototype._outFocus = function () {
  var self = this;

  $(document).on('click', function (event) {
    var $input = $('['+ self.settings.searchSelector +']');
    var $form = $input.parents('form:first');

    if (document._searchActive && !$(event.target).closest($form).length) {
      self._owner._get({
        query: '',
      });
    }
  });
};

/*
 * Инициализация объектов
 */
var Cart = new ISnew.Cart();
var Template = new ISnew.Template();
var Compare = new ISnew.Compare();
var AjaxSearch = new ISnew.Search();
var Products = new ISnew.Products();
var Shop = new ISnew.Shop();

Site.URL = new ISnew.tools.URL();
Site.Translit = new ISnew.tools.Translit();
Site.RegExp = new ISnew.tools.RegExp();