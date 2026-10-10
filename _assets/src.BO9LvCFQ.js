import{r as e,t}from"./rolldown-runtime.hePW80VL.js";import{n,r}from"./unsupportedIterableToArray.DFXI1Ww-.js";import{a as i,n as a,t as o}from"./objectWithoutProperties.Jt8wZbuI.js";import{a as s,i as c,n as l,t as u}from"./asyncToGenerator.B289w5-A.js";import{a as d,n as f,r as p,t as m}from"./createForOfIteratorHelper.v-UO4Zzr.js";import{$t as h,A as g,An as _,Bn as v,Bt as y,C as b,E as x,En as S,Et as C,Gn as w,H as T,Ht as E,J as D,Jn as O,Jt as k,Kn as A,Kt as j,Ln as ee,Mn as M,Nn as te,On as ne,Pn as re,Qn as ie,Tn as ae,Vn as N,Vt as oe,Wn as P,Xn as se,Yn as ce,Zt as F,_ as le,bn as ue,er as de,ft as fe,gn as pe,gt as I,h as me,hn as he,kn as ge,ln as _e,n as ve,nn as ye,qn as be,r as xe,rn as L,t as Se,tn as Ce,tr as we,wn as Te}from"./index.esm.CCFCaHNf.js";import{B as Ee,J as R,Lt as De,R as Oe,rn as ke,wn as Ae,y as je,z as Me,zt as Ne}from"./esm.1ddJCXJN.js";import{a as Pe,c as Fe,i as Ie,n as Le,o as Re,s as ze,t as Be,u as Ve}from"./tslib.es6.D8CxLKyL.js";import"./index.esm.CLPMNnfb.js";import{A as He,Gt as Ue,Ht as We,Lt as Ge,Rt as Ke,X as qe,_t as Je,en as Ye,jt as Xe,st as Ze}from"./src.RzVD1Zqa.js";import{t as Qe}from"./index.esm.Db8L2U1j.js";import{a as $e,c as et,d as tt,i as nt,l as rt,n as it,o as at,r as ot,s as st,t as ct,u as lt}from"./y.SfYSYD98.js";import{t as ut}from"./toArray.DKdkmv9S.js";function dt(e,t,n){var r,i=rt(.1),a,o;typeof e!=`function`&&(e=rt(+e)),t??=0,n??=0;function s(e){for(var i=0,s=r.length;i<s;++i){var c=r[i],l=c.x-t||1e-6,u=c.y-n||1e-6,d=Math.sqrt(l*l+u*u),f=(o[i]-d)*a[i]*e/d;c.vx+=l*f,c.vy+=u*f}}function c(){if(r){var t,n=r.length;for(a=Array(n),o=Array(n),t=0;t<n;++t)o[t]=+e(r[t],t,r),a[t]=isNaN(o[t])?0:+i(r[t],t,r)}}return s.initialize=function(e){r=e,c()},s.strength=function(e){return arguments.length?(i=typeof e==`function`?e:rt(+e),c(),s):i},s.radius=function(t){return arguments.length?(e=typeof t==`function`?t:rt(+t),c(),s):e},s.x=function(e){return arguments.length?(t=+e,s):t},s.y=function(e){return arguments.length?(n=+e,s):n},s}function ft(e){let t=+this._x.call(null,e),n=+this._y.call(null,e),r=+this._z.call(null,e);return pt(this.cover(t,n,r),t,n,r,e)}function pt(e,t,n,r,i){if(isNaN(t)||isNaN(n)||isNaN(r))return e;var a,o=e._root,s={data:i},c=e._x0,l=e._y0,u=e._z0,d=e._x1,f=e._y1,p=e._z1,m,h,g,_,v,y,b,x,S,C,w;if(!o)return e._root=s,e;for(;o.length;)if((b=t>=(m=(c+d)/2))?c=m:d=m,(x=n>=(h=(l+f)/2))?l=h:f=h,(S=r>=(g=(u+p)/2))?u=g:p=g,a=o,!(o=o[C=S<<2|x<<1|b]))return a[C]=s,e;if(_=+e._x.call(null,o.data),v=+e._y.call(null,o.data),y=+e._z.call(null,o.data),t===_&&n===v&&r===y)return s.next=o,a?a[C]=s:e._root=s,e;do a=a?a[C]=Array(8):e._root=Array(8),(b=t>=(m=(c+d)/2))?c=m:d=m,(x=n>=(h=(l+f)/2))?l=h:f=h,(S=r>=(g=(u+p)/2))?u=g:p=g;while((C=S<<2|x<<1|b)==(w=(y>=g)<<2|(v>=h)<<1|_>=m));return a[w]=o,a[C]=s,e}function mt(e){Array.isArray(e)||(e=Array.from(e));let t=e.length,n=new Float64Array(t),r=new Float64Array(t),i=new Float64Array(t),a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0;for(let d=0,f,p,m,h;d<t;++d)isNaN(p=+this._x.call(null,f=e[d]))||isNaN(m=+this._y.call(null,f))||isNaN(h=+this._z.call(null,f))||(n[d]=p,r[d]=m,i[d]=h,p<a&&(a=p),p>c&&(c=p),m<o&&(o=m),m>l&&(l=m),h<s&&(s=h),h>u&&(u=h));if(a>c||o>l||s>u)return this;this.cover(a,o,s).cover(c,l,u);for(let a=0;a<t;++a)pt(this,n[a],r[a],i[a],e[a]);return this}function ht(e,t,n){if(isNaN(e=+e)||isNaN(t=+t)||isNaN(n=+n))return this;var r=this._x0,i=this._y0,a=this._z0,o=this._x1,s=this._y1,c=this._z1;if(isNaN(r))o=(r=Math.floor(e))+1,s=(i=Math.floor(t))+1,c=(a=Math.floor(n))+1;else{for(var l=o-r||1,u=this._root,d,f;r>e||e>=o||i>t||t>=s||a>n||n>=c;)switch(f=(n<a)<<2|(t<i)<<1|e<r,d=Array(8),d[f]=u,u=d,l*=2,f){case 0:o=r+l,s=i+l,c=a+l;break;case 1:r=o-l,s=i+l,c=a+l;break;case 2:o=r+l,i=s-l,c=a+l;break;case 3:r=o-l,i=s-l,c=a+l;break;case 4:o=r+l,s=i+l,a=c-l;break;case 5:r=o-l,s=i+l,a=c-l;break;case 6:o=r+l,i=s-l,a=c-l;break;case 7:r=o-l,i=s-l,a=c-l}this._root&&this._root.length&&(this._root=u)}return this._x0=r,this._y0=i,this._z0=a,this._x1=o,this._y1=s,this._z1=c,this}function gt(){var e=[];return this.visit(function(t){if(!t.length)do e.push(t.data);while(t=t.next)}),e}function _t(e){return arguments.length?this.cover(+e[0][0],+e[0][1],+e[0][2]).cover(+e[1][0],+e[1][1],+e[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]}function vt(e,t,n,r,i,a,o){this.node=e,this.x0=t,this.y0=n,this.z0=r,this.x1=i,this.y1=a,this.z1=o}function yt(e,t,n,r){var i,a=this._x0,o=this._y0,s=this._z0,c,l,u,d,f,p,m=this._x1,h=this._y1,g=this._z1,_=[],v=this._root,y,b;for(v&&_.push(new vt(v,a,o,s,m,h,g)),r==null?r=1/0:(a=e-r,o=t-r,s=n-r,m=e+r,h=t+r,g=n+r,r*=r);y=_.pop();)if(!(!(v=y.node)||(c=y.x0)>m||(l=y.y0)>h||(u=y.z0)>g||(d=y.x1)<a||(f=y.y1)<o||(p=y.z1)<s)){if(v.length){var x=(c+d)/2,S=(l+f)/2,C=(u+p)/2;_.push(new vt(v[7],x,S,C,d,f,p),new vt(v[6],c,S,C,x,f,p),new vt(v[5],x,l,C,d,S,p),new vt(v[4],c,l,C,x,S,p),new vt(v[3],x,S,u,d,f,C),new vt(v[2],c,S,u,x,f,C),new vt(v[1],x,l,u,d,S,C),new vt(v[0],c,l,u,x,S,C)),(b=(n>=C)<<2|(t>=S)<<1|e>=x)&&(y=_[_.length-1],_[_.length-1]=_[_.length-1-b],_[_.length-1-b]=y)}else{var w=e-+this._x.call(null,v.data),T=t-+this._y.call(null,v.data),E=n-+this._z.call(null,v.data),D=w*w+T*T+E*E;if(D<r){var O=Math.sqrt(r=D);a=e-O,o=t-O,s=n-O,m=e+O,h=t+O,g=n+O,i=v.data}}}return i}var bt=(e,t,n,r,i,a)=>Math.sqrt((e-r)**2+(t-i)**2+(n-a)**2);function xt(e,t,n,r){let i=[],a=e-r,o=t-r,s=n-r,c=e+r,l=t+r,u=n+r;return this.visit((d,f,p,m,h,g,_)=>{if(!d.length)do{let a=d.data;bt(e,t,n,this._x(a),this._y(a),this._z(a))<=r&&i.push(a)}while(d=d.next);return f>c||p>l||m>u||h<a||g<o||_<s}),i}function St(e){if(isNaN(f=+this._x.call(null,e))||isNaN(p=+this._y.call(null,e))||isNaN(m=+this._z.call(null,e)))return this;var t,n=this._root,r,i,a,o=this._x0,s=this._y0,c=this._z0,l=this._x1,u=this._y1,d=this._z1,f,p,m,h,g,_,v,y,b,x,S;if(!n)return this;if(n.length)for(;;){if((v=f>=(h=(o+l)/2))?o=h:l=h,(y=p>=(g=(s+u)/2))?s=g:u=g,(b=m>=(_=(c+d)/2))?c=_:d=_,t=n,!(n=n[x=b<<2|y<<1|v]))return this;if(!n.length)break;(t[x+1&7]||t[x+2&7]||t[x+3&7]||t[x+4&7]||t[x+5&7]||t[x+6&7]||t[x+7&7])&&(r=t,S=x)}for(;n.data!==e;)if(i=n,!(n=n.next))return this;return(a=n.next)&&delete n.next,i?(a?i.next=a:delete i.next,this):t?(a?t[x]=a:delete t[x],(n=t[0]||t[1]||t[2]||t[3]||t[4]||t[5]||t[6]||t[7])&&n===(t[7]||t[6]||t[5]||t[4]||t[3]||t[2]||t[1]||t[0])&&!n.length&&(r?r[S]=n:this._root=n),this):(this._root=a,this)}function Ct(e){for(var t=0,n=e.length;t<n;++t)this.remove(e[t]);return this}function wt(){return this._root}function Tt(){var e=0;return this.visit(function(t){if(!t.length)do++e;while(t=t.next)}),e}function Et(e){var t=[],n,r=this._root,i,a,o,s,c,l,u;for(r&&t.push(new vt(r,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));n=t.pop();)if(!e(r=n.node,a=n.x0,o=n.y0,s=n.z0,c=n.x1,l=n.y1,u=n.z1)&&r.length){var d=(a+c)/2,f=(o+l)/2,p=(s+u)/2;(i=r[7])&&t.push(new vt(i,d,f,p,c,l,u)),(i=r[6])&&t.push(new vt(i,a,f,p,d,l,u)),(i=r[5])&&t.push(new vt(i,d,o,p,c,f,u)),(i=r[4])&&t.push(new vt(i,a,o,p,d,f,u)),(i=r[3])&&t.push(new vt(i,d,f,s,c,l,p)),(i=r[2])&&t.push(new vt(i,a,f,s,d,l,p)),(i=r[1])&&t.push(new vt(i,d,o,s,c,f,p)),(i=r[0])&&t.push(new vt(i,a,o,s,d,f,p))}return this}function Dt(e){var t=[],n=[],r;for(this._root&&t.push(new vt(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));r=t.pop();){var i=r.node;if(i.length){var a,o=r.x0,s=r.y0,c=r.z0,l=r.x1,u=r.y1,d=r.z1,f=(o+l)/2,p=(s+u)/2,m=(c+d)/2;(a=i[0])&&t.push(new vt(a,o,s,c,f,p,m)),(a=i[1])&&t.push(new vt(a,f,s,c,l,p,m)),(a=i[2])&&t.push(new vt(a,o,p,c,f,u,m)),(a=i[3])&&t.push(new vt(a,f,p,c,l,u,m)),(a=i[4])&&t.push(new vt(a,o,s,m,f,p,d)),(a=i[5])&&t.push(new vt(a,f,s,m,l,p,d)),(a=i[6])&&t.push(new vt(a,o,p,m,f,u,d)),(a=i[7])&&t.push(new vt(a,f,p,m,l,u,d))}n.push(r)}for(;r=n.pop();)e(r.node,r.x0,r.y0,r.z0,r.x1,r.y1,r.z1);return this}function Ot(e){return e[0]}function kt(e){return arguments.length?(this._x=e,this):this._x}function At(e){return e[1]}function jt(e){return arguments.length?(this._y=e,this):this._y}function Mt(e){return e[2]}function Nt(e){return arguments.length?(this._z=e,this):this._z}function Pt(e,t,n,r){var i=new Ft(t??Ot,n??At,r??Mt,NaN,NaN,NaN,NaN,NaN,NaN);return e==null?i:i.addAll(e)}function Ft(e,t,n,r,i,a,o,s,c){this._x=e,this._y=t,this._z=n,this._x0=r,this._y0=i,this._z0=a,this._x1=o,this._y1=s,this._z1=c,this._root=void 0}function It(e){for(var t={data:e.data},n=t;e=e.next;)n=n.next={data:e.data};return t}var Lt=Pt.prototype=Ft.prototype;Lt.copy=function(){var e=new Ft(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),t=this._root,n,r;if(!t)return e;if(!t.length)return e._root=It(t),e;for(n=[{source:t,target:e._root=Array(8)}];t=n.pop();)for(var i=0;i<8;++i)(r=t.source[i])&&(r.length?n.push({source:r,target:t.target[i]=Array(8)}):t.target[i]=It(r));return e},Lt.add=ft,Lt.addAll=mt,Lt.cover=ht,Lt.data=gt,Lt.extent=_t,Lt.find=yt,Lt.findAllWithinRadius=xt,Lt.remove=St,Lt.removeAll=Ct,Lt.root=wt,Lt.size=Tt,Lt.visit=Et,Lt.visitAfter=Dt,Lt.x=kt,Lt.y=jt,Lt.z=Nt;var Rt=class{constructor(e){this.id=`d3-force`,this.config={inputNodeAttrs:[`x`,`y`,`vx`,`vy`,`fx`,`fy`],outputNodeAttrs:[`x`,`y`,`vx`,`vy`],simulationAttrs:[`alpha`,`alphaMin`,`alphaDecay`,`alphaTarget`,`velocityDecay`,`randomSource`]},this.forceMap={link:st,manyBody:ot,center:tt,collide:et,radial:dt,x:it,y:ct},this.options={link:{id:e=>e.id},manyBody:{},center:{x:0,y:0}},this.context={options:{},assign:!1,nodes:[],edges:[]},R(this.options,e),this.options.forceSimulation&&(this.simulation=this.options.forceSimulation)}execute(e,t){return Le(this,void 0,void 0,function*(){return this.genericLayout(!1,e,t)})}assign(e,t){return Le(this,void 0,void 0,function*(){yield this.genericLayout(!0,e,t)})}stop(){this.simulation.stop()}tick(e){return this.simulation.tick(e),this.getResult()}restart(){this.simulation.restart()}setFixedPosition(e,t){let n=this.context.nodes.find(t=>t.id===e);n&&t.forEach((e,t)=>{if(typeof e==`number`||e===null){let r=[`fx`,`fy`,`fz`][t];n[r]=e}})}getOptions(e){let t=R({},this.options,e);return t.collide&&t.collide?.radius===void 0&&(t.collide=t.collide||{},t.collide.radius=t.nodeSize??10),t.iterations===void 0&&(t.link&&t.link.iterations===void 0&&(t.iterations=t.link.iterations),t.collide&&t.collide.iterations===void 0&&(t.iterations=t.collide.iterations)),this.context.options=t,t}genericLayout(e,t,n){var r;return Le(this,void 0,void 0,function*(){let i=this.getOptions(n),a=t.getAllNodes().map(({id:e,data:t})=>Object.assign(Object.assign({id:e},t),Oe(t.data,this.config.inputNodeAttrs))),o=t.getAllEdges().map(e=>Object.assign({},e));Object.assign(this.context,{assign:e,nodes:a,edges:o,graph:t});let s=new Promise(e=>{this.resolver=e}),c=this.setSimulation(i);return c.nodes(a),(r=c.force(`link`))==null||r.links(o),s})}getResult(){let{assign:e,nodes:t,edges:n,graph:r}=this.context,i=t.map(e=>({id:e.id,data:Object.assign(Object.assign({},e.data),Oe(e,this.config.outputNodeAttrs))})),a=n.map(({id:e,source:t,target:n,data:r})=>({id:e,source:typeof t==`object`?t.id:t,target:typeof n==`object`?n.id:n,data:r}));return e&&i.forEach(e=>r.mergeNodeData(e.id,e.data)),{nodes:i,edges:a}}initSimulation(){return nt()}setSimulation(e){let t=this.simulation||this.options.forceSimulation||this.initSimulation();return this.simulation||=t.on(`tick`,()=>e.onTick?.call(e,this.getResult())).on(`end`,()=>this.resolver?.call(this,this.getResult())),zt(t,this.config.simulationAttrs.map(t=>[t,e[t]])),Object.entries(this.forceMap).forEach(([n,r])=>{let i=n;if(e[n]){let n=t.force(i);n||(n=r(),t.force(i,n)),zt(n,Object.entries(e[i]))}else t.force(i,null)}),t}},zt=(e,t)=>t.reduce((t,[n,r])=>!t[n]||r===void 0?t:t[n].call(e,r),e);function Bt(e,t,n){var r,i=1;e??=0,t??=0,n??=0;function a(){var a,o=r.length,s,c=0,l=0,u=0;for(a=0;a<o;++a)s=r[a],c+=s.x||0,l+=s.y||0,u+=s.z||0;for(c=(c/o-e)*i,l=(l/o-t)*i,u=(u/o-n)*i,a=0;a<o;++a)s=r[a],c&&(s.x-=c),l&&(s.y-=l),u&&(s.z-=u)}return a.initialize=function(e){r=e},a.x=function(t){return arguments.length?(e=+t,a):e},a.y=function(e){return arguments.length?(t=+e,a):t},a.z=function(e){return arguments.length?(n=+e,a):n},a.strength=function(e){return arguments.length?(i=+e,a):i},a}function Vt(e){let t=+this._x.call(null,e);return Ht(this.cover(t),t,e)}function Ht(e,t,n){if(isNaN(t))return e;var r,i=e._root,a={data:n},o=e._x0,s=e._x1,c,l,u,d,f;if(!i)return e._root=a,e;for(;i.length;)if((u=t>=(c=(o+s)/2))?o=c:s=c,r=i,!(i=i[d=+u]))return r[d]=a,e;if(l=+e._x.call(null,i.data),t===l)return a.next=i,r?r[d]=a:e._root=a,e;do r=r?r[d]=[,,]:e._root=[,,],(u=t>=(c=(o+s)/2))?o=c:s=c;while((d=+u)==(f=+(l>=c)));return r[f]=i,r[d]=a,e}function Ut(e){Array.isArray(e)||(e=Array.from(e));let t=e.length,n=new Float64Array(t),r=1/0,i=-1/0;for(let a=0,o;a<t;++a)isNaN(o=+this._x.call(null,e[a]))||(n[a]=o,o<r&&(r=o),o>i&&(i=o));if(r>i)return this;this.cover(r).cover(i);for(let r=0;r<t;++r)Ht(this,n[r],e[r]);return this}function Wt(e){if(isNaN(e=+e))return this;var t=this._x0,n=this._x1;if(isNaN(t))n=(t=Math.floor(e))+1;else{for(var r=n-t||1,i=this._root,a,o;t>e||e>=n;)switch(o=+(e<t),a=[,,],a[o]=i,i=a,r*=2,o){case 0:n=t+r;break;case 1:t=n-r}this._root&&this._root.length&&(this._root=i)}return this._x0=t,this._x1=n,this}function Gt(){var e=[];return this.visit(function(t){if(!t.length)do e.push(t.data);while(t=t.next)}),e}function Kt(e){return arguments.length?this.cover(+e[0][0]).cover(+e[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]}function qt(e,t,n){this.node=e,this.x0=t,this.x1=n}function Jt(e,t){var n,r=this._x0,i,a,o=this._x1,s=[],c=this._root,l,u;for(c&&s.push(new qt(c,r,o)),t==null?t=1/0:(r=e-t,o=e+t);l=s.pop();)if(!(!(c=l.node)||(i=l.x0)>o||(a=l.x1)<r)){if(c.length){var d=(i+a)/2;s.push(new qt(c[1],d,a),new qt(c[0],i,d)),(u=+(e>=d))&&(l=s[s.length-1],s[s.length-1]=s[s.length-1-u],s[s.length-1-u]=l)}else{var f=Math.abs(e-+this._x.call(null,c.data));f<t&&(t=f,r=e-f,o=e+f,n=c.data)}}return n}function Yt(e){if(isNaN(c=+this._x.call(null,e)))return this;var t,n=this._root,r,i,a,o=this._x0,s=this._x1,c,l,u,d,f;if(!n)return this;if(n.length)for(;;){if((u=c>=(l=(o+s)/2))?o=l:s=l,t=n,!(n=n[d=+u]))return this;if(!n.length)break;t[d+1&1]&&(r=t,f=d)}for(;n.data!==e;)if(i=n,!(n=n.next))return this;return(a=n.next)&&delete n.next,i?(a?i.next=a:delete i.next,this):t?(a?t[d]=a:delete t[d],(n=t[0]||t[1])&&n===(t[1]||t[0])&&!n.length&&(r?r[f]=n:this._root=n),this):(this._root=a,this)}function Xt(e){for(var t=0,n=e.length;t<n;++t)this.remove(e[t]);return this}function Zt(){return this._root}function Qt(){var e=0;return this.visit(function(t){if(!t.length)do++e;while(t=t.next)}),e}function $t(e){var t=[],n,r=this._root,i,a,o;for(r&&t.push(new qt(r,this._x0,this._x1));n=t.pop();)if(!e(r=n.node,a=n.x0,o=n.x1)&&r.length){var s=(a+o)/2;(i=r[1])&&t.push(new qt(i,s,o)),(i=r[0])&&t.push(new qt(i,a,s))}return this}function en(e){var t=[],n=[],r;for(this._root&&t.push(new qt(this._root,this._x0,this._x1));r=t.pop();){var i=r.node;if(i.length){var a,o=r.x0,s=r.x1,c=(o+s)/2;(a=i[0])&&t.push(new qt(a,o,c)),(a=i[1])&&t.push(new qt(a,c,s))}n.push(r)}for(;r=n.pop();)e(r.node,r.x0,r.x1);return this}function tn(e){return e[0]}function nn(e){return arguments.length?(this._x=e,this):this._x}function rn(e,t){var n=new an(t??tn,NaN,NaN);return e==null?n:n.addAll(e)}function an(e,t,n){this._x=e,this._x0=t,this._x1=n,this._root=void 0}function on(e){for(var t={data:e.data},n=t;e=e.next;)n=n.next={data:e.data};return t}var sn=rn.prototype=an.prototype;sn.copy=function(){var e=new an(this._x,this._x0,this._x1),t=this._root,n,r;if(!t)return e;if(!t.length)return e._root=on(t),e;for(n=[{source:t,target:e._root=[,,]}];t=n.pop();)for(var i=0;i<2;++i)(r=t.source[i])&&(r.length?n.push({source:r,target:t.target[i]=[,,]}):t.target[i]=on(r));return e},sn.add=Vt,sn.addAll=Ut,sn.cover=Wt,sn.data=Gt,sn.extent=Kt,sn.find=Jt,sn.remove=Yt,sn.removeAll=Xt,sn.root=Zt,sn.size=Qt,sn.visit=$t,sn.visitAfter=en,sn.x=nn;function cn(e){return function(){return e}}function ln(e){return(e()-.5)*1e-6}function un(e){return e.x+e.vx}function dn(e){return e.y+e.vy}function fn(e){return e.z+e.vz}function pn(e){var t,n,r,i,a=1,o=1;typeof e!=`function`&&(e=cn(e==null?1:+e));function s(){for(var e,s=t.length,l,u,d,f,p,m,h,g=0;g<o;++g)for(l=(n===1?rn(t,un):n===2?lt(t,un,dn):n===3?Pt(t,un,dn,fn):null).visitAfter(c),e=0;e<s;++e)u=t[e],m=r[u.index],h=m*m,d=u.x+u.vx,n>1&&(f=u.y+u.vy),n>2&&(p=u.z+u.vz),l.visit(_);function _(e,t,r,o,s,c,l){var g=[t,r,o,s,c,l],_=g[0],v=g[1],y=g[2],b=g[n],x=g[n+1],S=g[n+2],C=e.data,w=e.r,T=m+w;if(C){if(C.index>u.index){var E=d-C.x-C.vx,D=n>1?f-C.y-C.vy:0,O=n>2?p-C.z-C.vz:0,k=E*E+D*D+O*O;k<T*T&&(E===0&&(E=ln(i),k+=E*E),n>1&&D===0&&(D=ln(i),k+=D*D),n>2&&O===0&&(O=ln(i),k+=O*O),k=(T-(k=Math.sqrt(k)))/k*a,u.vx+=(E*=k)*(T=(w*=w)/(h+w)),n>1&&(u.vy+=(D*=k)*T),n>2&&(u.vz+=(O*=k)*T),C.vx-=E*(T=1-T),n>1&&(C.vy-=D*T),n>2&&(C.vz-=O*T))}}else return _>d+T||b<d-T||n>1&&(v>f+T||x<f-T)||n>2&&(y>p+T||S<p-T)}}function c(e){if(e.data)return e.r=r[e.data.index];for(var t=e.r=0;t<2**n;++t)e[t]&&e[t].r>e.r&&(e.r=e[t].r)}function l(){if(t){var n,i=t.length,a;for(r=Array(i),n=0;n<i;++n)a=t[n],r[a.index]=+e(a,n,t)}}return s.initialize=function(e,...r){t=e,i=r.find(e=>typeof e==`function`)||Math.random,n=r.find(e=>[1,2,3].includes(e))||2,l()},s.iterations=function(e){return arguments.length?(o=+e,s):o},s.strength=function(e){return arguments.length?(a=+e,s):a},s.radius=function(t){return arguments.length?(e=typeof t==`function`?t:cn(+t),l(),s):e},s}function mn(e){return e.index}function hn(e,t){var n=e.get(t);if(!n)throw Error(`node not found: `+t);return n}function gn(e){var t=mn,n=f,r,i=cn(30),a,o,s,c,l,u,d=1;e??=[];function f(e){return 1/Math.min(c[e.source.index],c[e.target.index])}function p(t){for(var n=0,i=e.length;n<d;++n)for(var o=0,c,f,p,m=0,h=0,g=0,_,v;o<i;++o)c=e[o],f=c.source,p=c.target,m=p.x+p.vx-f.x-f.vx||ln(u),s>1&&(h=p.y+p.vy-f.y-f.vy||ln(u)),s>2&&(g=p.z+p.vz-f.z-f.vz||ln(u)),_=Math.sqrt(m*m+h*h+g*g),_=(_-a[o])/_*t*r[o],m*=_,h*=_,g*=_,p.vx-=m*(v=l[o]),s>1&&(p.vy-=h*v),s>2&&(p.vz-=g*v),f.vx+=m*(v=1-v),s>1&&(f.vy+=h*v),s>2&&(f.vz+=g*v)}function m(){if(o){var n,i=o.length,s=e.length,u=new Map(o.map((e,n)=>[t(e,n,o),e])),d;for(n=0,c=Array(i);n<s;++n)d=e[n],d.index=n,typeof d.source!=`object`&&(d.source=hn(u,d.source)),typeof d.target!=`object`&&(d.target=hn(u,d.target)),c[d.source.index]=(c[d.source.index]||0)+1,c[d.target.index]=(c[d.target.index]||0)+1;for(n=0,l=Array(s);n<s;++n)d=e[n],l[n]=c[d.source.index]/(c[d.source.index]+c[d.target.index]);r=Array(s),h(),a=Array(s),g()}}function h(){if(o)for(var t=0,i=e.length;t<i;++t)r[t]=+n(e[t],t,e)}function g(){if(o)for(var t=0,n=e.length;t<n;++t)a[t]=+i(e[t],t,e)}return p.initialize=function(e,...t){o=e,u=t.find(e=>typeof e==`function`)||Math.random,s=t.find(e=>[1,2,3].includes(e))||2,m()},p.links=function(t){return arguments.length?(e=t,m(),p):e},p.id=function(e){return arguments.length?(t=e,p):t},p.iterations=function(e){return arguments.length?(d=+e,p):d},p.strength=function(e){return arguments.length?(n=typeof e==`function`?e:cn(+e),h(),p):n},p.distance=function(e){return arguments.length?(i=typeof e==`function`?e:cn(+e),g(),p):i},p}var _n=1664525,vn=1013904223,yn=4294967296;function bn(){let e=1;return()=>(e=(_n*e+vn)%yn)/yn}var xn=3;function Sn(e){return e.x}function Cn(e){return e.y}function wn(e){return e.z}var Tn=10,En=Math.PI*(3-Math.sqrt(5)),Dn=Math.PI*20/(9+Math.sqrt(221));function On(e,t){t||=2;var n=Math.min(xn,Math.max(1,Math.round(t))),r,i=1,a=.001,o=1-a**(1/300),s=0,c=.6,l=new Map,u=$e(p),d=at(`tick`,`end`),f=bn();e??=[];function p(){m(),d.call(`tick`,r),i<a&&(u.stop(),d.call(`end`,r))}function m(t){var a,u=e.length,d;t===void 0&&(t=1);for(var f=0;f<t;++f)for(i+=(s-i)*o,l.forEach(function(e){e(i)}),a=0;a<u;++a)d=e[a],d.fx==null?d.x+=d.vx*=c:(d.x=d.fx,d.vx=0),n>1&&(d.fy==null?d.y+=d.vy*=c:(d.y=d.fy,d.vy=0)),n>2&&(d.fz==null?d.z+=d.vz*=c:(d.z=d.fz,d.vz=0));return r}function h(){for(var t=0,r=e.length,i;t<r;++t){if(i=e[t],i.index=t,i.fx!=null&&(i.x=i.fx),i.fy!=null&&(i.y=i.fy),i.fz!=null&&(i.z=i.fz),isNaN(i.x)||n>1&&isNaN(i.y)||n>2&&isNaN(i.z)){var a=Tn*(n>2?Math.cbrt(.5+t):n>1?Math.sqrt(.5+t):t),o=t*En,s=t*Dn;n===1?i.x=a:n===2?(i.x=a*Math.cos(o),i.y=a*Math.sin(o)):(i.x=a*Math.sin(o)*Math.cos(s),i.y=a*Math.cos(o),i.z=a*Math.sin(o)*Math.sin(s))}(isNaN(i.vx)||n>1&&isNaN(i.vy)||n>2&&isNaN(i.vz))&&(i.vx=0,n>1&&(i.vy=0),n>2&&(i.vz=0))}}function g(t){return t.initialize&&t.initialize(e,f,n),t}return h(),r={tick:m,restart:function(){return u.restart(p),r},stop:function(){return u.stop(),r},numDimensions:function(e){return arguments.length?(n=Math.min(xn,Math.max(1,Math.round(e))),l.forEach(g),r):n},nodes:function(t){return arguments.length?(e=t,h(),l.forEach(g),r):e},alpha:function(e){return arguments.length?(i=+e,r):i},alphaMin:function(e){return arguments.length?(a=+e,r):a},alphaDecay:function(e){return arguments.length?(o=+e,r):+o},alphaTarget:function(e){return arguments.length?(s=+e,r):s},velocityDecay:function(e){return arguments.length?(c=1-e,r):1-c},randomSource:function(e){return arguments.length?(f=e,l.forEach(g),r):f},force:function(e,t){return arguments.length>1?(t==null?l.delete(e):l.set(e,g(t)),r):l.get(e)},find:function(){var t=Array.prototype.slice.call(arguments),r=t.shift()||0,i=(n>1?t.shift():null)||0,a=(n>2?t.shift():null)||0,o=t.shift()||1/0,s=0,c=e.length,l,u,d,f,p,m;for(o*=o,s=0;s<c;++s)p=e[s],l=r-p.x,u=i-(p.y||0),d=a-(p.z||0),f=l*l+u*u+d*d,f<o&&(m=p,o=f);return m},on:function(e,t){return arguments.length>1?(d.on(e,t),r):d.on(e)}}}function kn(){var e,t,n,r,i,a=cn(-30),o,s=1,c=1/0,l=.81;function u(r){var a,o=e.length,s=(t===1?rn(e,Sn):t===2?lt(e,Sn,Cn):t===3?Pt(e,Sn,Cn,wn):null).visitAfter(f);for(i=r,a=0;a<o;++a)n=e[a],s.visit(p)}function d(){if(e){var t,n=e.length,r;for(o=Array(n),t=0;t<n;++t)r=e[t],o[r.index]=+a(r,t,e)}}function f(e){var n=0,r,i,a=0,s,c,l,u,d=e.length;if(d){for(s=c=l=u=0;u<d;++u)(r=e[u])&&(i=Math.abs(r.value))&&(n+=r.value,a+=i,s+=i*(r.x||0),c+=i*(r.y||0),l+=i*(r.z||0));n*=Math.sqrt(4/d),e.x=s/a,t>1&&(e.y=c/a),t>2&&(e.z=l/a)}else{r=e,r.x=r.data.x,t>1&&(r.y=r.data.y),t>2&&(r.z=r.data.z);do n+=o[r.data.index];while(r=r.next)}e.value=n}function p(e,a,u,d,f){if(!e.value)return!0;var p=[u,d,f][t-1],m=e.x-n.x,h=t>1?e.y-n.y:0,g=t>2?e.z-n.z:0,_=p-a,v=m*m+h*h+g*g;if(_*_/l<v)return v<c&&(m===0&&(m=ln(r),v+=m*m),t>1&&h===0&&(h=ln(r),v+=h*h),t>2&&g===0&&(g=ln(r),v+=g*g),v<s&&(v=Math.sqrt(s*v)),n.vx+=m*e.value*i/v,t>1&&(n.vy+=h*e.value*i/v),t>2&&(n.vz+=g*e.value*i/v)),!0;if(!(e.length||v>=c)){(e.data!==n||e.next)&&(m===0&&(m=ln(r),v+=m*m),t>1&&h===0&&(h=ln(r),v+=h*h),t>2&&g===0&&(g=ln(r),v+=g*g),v<s&&(v=Math.sqrt(s*v)));do e.data!==n&&(_=o[e.data.index]*i/v,n.vx+=m*_,t>1&&(n.vy+=h*_),t>2&&(n.vz+=g*_));while(e=e.next)}}return u.initialize=function(n,...i){e=n,r=i.find(e=>typeof e==`function`)||Math.random,t=i.find(e=>[1,2,3].includes(e))||2,d()},u.strength=function(e){return arguments.length?(a=typeof e==`function`?e:cn(+e),d(),u):a},u.distanceMin=function(e){return arguments.length?(s=e*e,u):Math.sqrt(s)},u.distanceMax=function(e){return arguments.length?(c=e*e,u):Math.sqrt(c)},u.theta=function(e){return arguments.length?(l=e*e,u):Math.sqrt(l)},u}function An(e,t,n,r){var i,a,o=cn(.1),s,c;typeof e!=`function`&&(e=cn(+e)),t??=0,n??=0,r??=0;function l(e){for(var o=0,l=i.length;o<l;++o){var u=i[o],d=u.x-t||1e-6,f=(u.y||0)-n||1e-6,p=(u.z||0)-r||1e-6,m=Math.sqrt(d*d+f*f+p*p),h=(c[o]-m)*s[o]*e/m;u.vx+=d*h,a>1&&(u.vy+=f*h),a>2&&(u.vz+=p*h)}}function u(){if(i){var t,n=i.length;for(s=Array(n),c=Array(n),t=0;t<n;++t)c[t]=+e(i[t],t,i),s[t]=isNaN(c[t])?0:+o(i[t],t,i)}}return l.initialize=function(e,...t){i=e,a=t.find(e=>[1,2,3].includes(e))||2,u()},l.strength=function(e){return arguments.length?(o=typeof e==`function`?e:cn(+e),u(),l):o},l.radius=function(t){return arguments.length?(e=typeof t==`function`?t:cn(+t),u(),l):e},l.x=function(e){return arguments.length?(t=+e,l):t},l.y=function(e){return arguments.length?(n=+e,l):n},l.z=function(e){return arguments.length?(r=+e,l):r},l}function jn(e){var t=cn(.1),n,r,i;typeof e!=`function`&&(e=cn(e==null?0:+e));function a(e){for(var t=0,a=n.length,o;t<a;++t)o=n[t],o.vx+=(i[t]-o.x)*r[t]*e}function o(){if(n){var a,o=n.length;for(r=Array(o),i=Array(o),a=0;a<o;++a)r[a]=isNaN(i[a]=+e(n[a],a,n))?0:+t(n[a],a,n)}}return a.initialize=function(e){n=e,o()},a.strength=function(e){return arguments.length?(t=typeof e==`function`?e:cn(+e),o(),a):t},a.x=function(t){return arguments.length?(e=typeof t==`function`?t:cn(+t),o(),a):e},a}function Mn(e){var t=cn(.1),n,r,i;typeof e!=`function`&&(e=cn(e==null?0:+e));function a(e){for(var t=0,a=n.length,o;t<a;++t)o=n[t],o.vy+=(i[t]-o.y)*r[t]*e}function o(){if(n){var a,o=n.length;for(r=Array(o),i=Array(o),a=0;a<o;++a)r[a]=isNaN(i[a]=+e(n[a],a,n))?0:+t(n[a],a,n)}}return a.initialize=function(e){n=e,o()},a.strength=function(e){return arguments.length?(t=typeof e==`function`?e:cn(+e),o(),a):t},a.y=function(t){return arguments.length?(e=typeof t==`function`?t:cn(+t),o(),a):e},a}function Nn(e){var t=cn(.1),n,r,i;typeof e!=`function`&&(e=cn(e==null?0:+e));function a(e){for(var t=0,a=n.length,o;t<a;++t)o=n[t],o.vz+=(i[t]-o.z)*r[t]*e}function o(){if(n){var a,o=n.length;for(r=Array(o),i=Array(o),a=0;a<o;++a)r[a]=isNaN(i[a]=+e(n[a],a,n))?0:+t(n[a],a,n)}}return a.initialize=function(e){n=e,o()},a.strength=function(e){return arguments.length?(t=typeof e==`function`?e:cn(+e),o(),a):t},a.z=function(t){return arguments.length?(e=typeof t==`function`?t:cn(+t),o(),a):e},a}var Pn=class extends Rt{constructor(){super(...arguments),this.id=`d3-force-3d`,this.config={inputNodeAttrs:[`x`,`y`,`z`,`vx`,`vy`,`vz`,`fx`,`fy`,`fz`],outputNodeAttrs:[`x`,`y`,`z`,`vx`,`vy`,`vz`],simulationAttrs:[`alpha`,`alphaMin`,`alphaDecay`,`alphaTarget`,`velocityDecay`,`randomSource`,`numDimensions`]},this.forceMap={link:gn,manyBody:kn,center:Bt,collide:pn,radial:An,x:jn,y:Mn,z:Nn},this.options={numDimensions:3,link:{id:e=>e.id},manyBody:{},center:{x:0,y:0,z:0}}}initSimulation(){return On()}},Fn=class extends Ze{async translate(e,t){this.context.canvas.getCamera().pan(-e[0],-e[1])}},In=class e extends Ue{static{this.defaultOptions={enable:!0,mode:`orbiting`,trigger:[]}}get camera(){return this.context.canvas.getCamera()}constructor(t,n){super(t,{...e.defaultOptions,...n}),this.setCameraType=()=>{let{mode:e}=this.options,t={orbiting:me.ORBITING,exploring:me.EXPLORING,tracking:me.TRACKING};this.camera.setType(t[e])},this.onDrag=e=>{if(!this.options.enable)return;let{x:t,y:n}=e.movement,r=this.getRatio();this.camera.rotate(t*r,-n*r,0)},this.shortcut=new We(t.graph),this.bindEvents()}update(e){super.update(e),this.setCameraType()}getRatio(){let{sensitivity:e,mode:t}=this.options;return e?e/10:t===`tracking`?.1:1}bindEvents(){let{graph:e}=this.context;e.once(Ye.BEFORE_DRAW,this.setCameraType),this.shortcut.unbindAll(),this.shortcut.bind([...this.options.trigger,`drag`],this.onDrag)}destroy(){this.shortcut.destroy(),super.destroy()}},Ln=class e extends He{static{this.defaultOptions={enable:!0,trigger:[`wheel`],sensitivity:1}}get camera(){return this.context.canvas.getCamera()}constructor(t,n){super(t,{...e.defaultOptions,...n}),this.onRoll=e=>{let t=this.camera.getRoll(),n=e.deltaY;this.camera.setRoll(t+this.getAngle(n))},this.shortcut=new We(t.graph),this.bindEvents()}getAngle(e){let{sensitivity:t}=this.options;return-(e*t)/10}bindEvents(){let{trigger:e}=this.options;this.shortcut.unbindAll(),this.shortcut.bind([...e,`wheel`],this.onRoll)}},Rn=class extends qe{constructor(...e){super(...e),this.zoom=async(e,t,n)=>{if(!this.validate(t))return;let{graph:r}=this.context,{sensitivity:i,onFinish:a}=this.options,o=1+Ne(e,-50,50)*i/100,s=r.getZoom();this.context.canvas.getCamera().setZoom(s*o),a?.()}}},z;(function(e){e[e.DEPTH_BUFFER_BIT=256]=`DEPTH_BUFFER_BIT`,e[e.STENCIL_BUFFER_BIT=1024]=`STENCIL_BUFFER_BIT`,e[e.COLOR_BUFFER_BIT=16384]=`COLOR_BUFFER_BIT`,e[e.POINTS=0]=`POINTS`,e[e.LINES=1]=`LINES`,e[e.LINE_LOOP=2]=`LINE_LOOP`,e[e.LINE_STRIP=3]=`LINE_STRIP`,e[e.TRIANGLES=4]=`TRIANGLES`,e[e.TRIANGLE_STRIP=5]=`TRIANGLE_STRIP`,e[e.TRIANGLE_FAN=6]=`TRIANGLE_FAN`,e[e.ZERO=0]=`ZERO`,e[e.ONE=1]=`ONE`,e[e.SRC_COLOR=768]=`SRC_COLOR`,e[e.ONE_MINUS_SRC_COLOR=769]=`ONE_MINUS_SRC_COLOR`,e[e.SRC_ALPHA=770]=`SRC_ALPHA`,e[e.ONE_MINUS_SRC_ALPHA=771]=`ONE_MINUS_SRC_ALPHA`,e[e.DST_ALPHA=772]=`DST_ALPHA`,e[e.ONE_MINUS_DST_ALPHA=773]=`ONE_MINUS_DST_ALPHA`,e[e.DST_COLOR=774]=`DST_COLOR`,e[e.ONE_MINUS_DST_COLOR=775]=`ONE_MINUS_DST_COLOR`,e[e.SRC_ALPHA_SATURATE=776]=`SRC_ALPHA_SATURATE`,e[e.CONSTANT_COLOR=32769]=`CONSTANT_COLOR`,e[e.ONE_MINUS_CONSTANT_COLOR=32770]=`ONE_MINUS_CONSTANT_COLOR`,e[e.CONSTANT_ALPHA=32771]=`CONSTANT_ALPHA`,e[e.ONE_MINUS_CONSTANT_ALPHA=32772]=`ONE_MINUS_CONSTANT_ALPHA`,e[e.FUNC_ADD=32774]=`FUNC_ADD`,e[e.FUNC_SUBTRACT=32778]=`FUNC_SUBTRACT`,e[e.FUNC_REVERSE_SUBTRACT=32779]=`FUNC_REVERSE_SUBTRACT`,e[e.BLEND_EQUATION=32777]=`BLEND_EQUATION`,e[e.BLEND_EQUATION_RGB=32777]=`BLEND_EQUATION_RGB`,e[e.BLEND_EQUATION_ALPHA=34877]=`BLEND_EQUATION_ALPHA`,e[e.BLEND_DST_RGB=32968]=`BLEND_DST_RGB`,e[e.BLEND_SRC_RGB=32969]=`BLEND_SRC_RGB`,e[e.BLEND_DST_ALPHA=32970]=`BLEND_DST_ALPHA`,e[e.BLEND_SRC_ALPHA=32971]=`BLEND_SRC_ALPHA`,e[e.BLEND_COLOR=32773]=`BLEND_COLOR`,e[e.ARRAY_BUFFER_BINDING=34964]=`ARRAY_BUFFER_BINDING`,e[e.ELEMENT_ARRAY_BUFFER_BINDING=34965]=`ELEMENT_ARRAY_BUFFER_BINDING`,e[e.LINE_WIDTH=2849]=`LINE_WIDTH`,e[e.ALIASED_POINT_SIZE_RANGE=33901]=`ALIASED_POINT_SIZE_RANGE`,e[e.ALIASED_LINE_WIDTH_RANGE=33902]=`ALIASED_LINE_WIDTH_RANGE`,e[e.CULL_FACE_MODE=2885]=`CULL_FACE_MODE`,e[e.FRONT_FACE=2886]=`FRONT_FACE`,e[e.DEPTH_RANGE=2928]=`DEPTH_RANGE`,e[e.DEPTH_WRITEMASK=2930]=`DEPTH_WRITEMASK`,e[e.DEPTH_CLEAR_VALUE=2931]=`DEPTH_CLEAR_VALUE`,e[e.DEPTH_FUNC=2932]=`DEPTH_FUNC`,e[e.STENCIL_CLEAR_VALUE=2961]=`STENCIL_CLEAR_VALUE`,e[e.STENCIL_FUNC=2962]=`STENCIL_FUNC`,e[e.STENCIL_FAIL=2964]=`STENCIL_FAIL`,e[e.STENCIL_PASS_DEPTH_FAIL=2965]=`STENCIL_PASS_DEPTH_FAIL`,e[e.STENCIL_PASS_DEPTH_PASS=2966]=`STENCIL_PASS_DEPTH_PASS`,e[e.STENCIL_REF=2967]=`STENCIL_REF`,e[e.STENCIL_VALUE_MASK=2963]=`STENCIL_VALUE_MASK`,e[e.STENCIL_WRITEMASK=2968]=`STENCIL_WRITEMASK`,e[e.STENCIL_BACK_FUNC=34816]=`STENCIL_BACK_FUNC`,e[e.STENCIL_BACK_FAIL=34817]=`STENCIL_BACK_FAIL`,e[e.STENCIL_BACK_PASS_DEPTH_FAIL=34818]=`STENCIL_BACK_PASS_DEPTH_FAIL`,e[e.STENCIL_BACK_PASS_DEPTH_PASS=34819]=`STENCIL_BACK_PASS_DEPTH_PASS`,e[e.STENCIL_BACK_REF=36003]=`STENCIL_BACK_REF`,e[e.STENCIL_BACK_VALUE_MASK=36004]=`STENCIL_BACK_VALUE_MASK`,e[e.STENCIL_BACK_WRITEMASK=36005]=`STENCIL_BACK_WRITEMASK`,e[e.VIEWPORT=2978]=`VIEWPORT`,e[e.SCISSOR_BOX=3088]=`SCISSOR_BOX`,e[e.COLOR_CLEAR_VALUE=3106]=`COLOR_CLEAR_VALUE`,e[e.COLOR_WRITEMASK=3107]=`COLOR_WRITEMASK`,e[e.UNPACK_ALIGNMENT=3317]=`UNPACK_ALIGNMENT`,e[e.PACK_ALIGNMENT=3333]=`PACK_ALIGNMENT`,e[e.MAX_TEXTURE_SIZE=3379]=`MAX_TEXTURE_SIZE`,e[e.MAX_VIEWPORT_DIMS=3386]=`MAX_VIEWPORT_DIMS`,e[e.SUBPIXEL_BITS=3408]=`SUBPIXEL_BITS`,e[e.RED_BITS=3410]=`RED_BITS`,e[e.GREEN_BITS=3411]=`GREEN_BITS`,e[e.BLUE_BITS=3412]=`BLUE_BITS`,e[e.ALPHA_BITS=3413]=`ALPHA_BITS`,e[e.DEPTH_BITS=3414]=`DEPTH_BITS`,e[e.STENCIL_BITS=3415]=`STENCIL_BITS`,e[e.POLYGON_OFFSET_UNITS=10752]=`POLYGON_OFFSET_UNITS`,e[e.POLYGON_OFFSET_FACTOR=32824]=`POLYGON_OFFSET_FACTOR`,e[e.TEXTURE_BINDING_2D=32873]=`TEXTURE_BINDING_2D`,e[e.SAMPLE_BUFFERS=32936]=`SAMPLE_BUFFERS`,e[e.SAMPLES=32937]=`SAMPLES`,e[e.SAMPLE_COVERAGE_VALUE=32938]=`SAMPLE_COVERAGE_VALUE`,e[e.SAMPLE_COVERAGE_INVERT=32939]=`SAMPLE_COVERAGE_INVERT`,e[e.COMPRESSED_TEXTURE_FORMATS=34467]=`COMPRESSED_TEXTURE_FORMATS`,e[e.VENDOR=7936]=`VENDOR`,e[e.RENDERER=7937]=`RENDERER`,e[e.VERSION=7938]=`VERSION`,e[e.IMPLEMENTATION_COLOR_READ_TYPE=35738]=`IMPLEMENTATION_COLOR_READ_TYPE`,e[e.IMPLEMENTATION_COLOR_READ_FORMAT=35739]=`IMPLEMENTATION_COLOR_READ_FORMAT`,e[e.BROWSER_DEFAULT_WEBGL=37444]=`BROWSER_DEFAULT_WEBGL`,e[e.STATIC_DRAW=35044]=`STATIC_DRAW`,e[e.STREAM_DRAW=35040]=`STREAM_DRAW`,e[e.DYNAMIC_DRAW=35048]=`DYNAMIC_DRAW`,e[e.ARRAY_BUFFER=34962]=`ARRAY_BUFFER`,e[e.ELEMENT_ARRAY_BUFFER=34963]=`ELEMENT_ARRAY_BUFFER`,e[e.BUFFER_SIZE=34660]=`BUFFER_SIZE`,e[e.BUFFER_USAGE=34661]=`BUFFER_USAGE`,e[e.CURRENT_VERTEX_ATTRIB=34342]=`CURRENT_VERTEX_ATTRIB`,e[e.VERTEX_ATTRIB_ARRAY_ENABLED=34338]=`VERTEX_ATTRIB_ARRAY_ENABLED`,e[e.VERTEX_ATTRIB_ARRAY_SIZE=34339]=`VERTEX_ATTRIB_ARRAY_SIZE`,e[e.VERTEX_ATTRIB_ARRAY_STRIDE=34340]=`VERTEX_ATTRIB_ARRAY_STRIDE`,e[e.VERTEX_ATTRIB_ARRAY_TYPE=34341]=`VERTEX_ATTRIB_ARRAY_TYPE`,e[e.VERTEX_ATTRIB_ARRAY_NORMALIZED=34922]=`VERTEX_ATTRIB_ARRAY_NORMALIZED`,e[e.VERTEX_ATTRIB_ARRAY_POINTER=34373]=`VERTEX_ATTRIB_ARRAY_POINTER`,e[e.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING=34975]=`VERTEX_ATTRIB_ARRAY_BUFFER_BINDING`,e[e.CULL_FACE=2884]=`CULL_FACE`,e[e.FRONT=1028]=`FRONT`,e[e.BACK=1029]=`BACK`,e[e.FRONT_AND_BACK=1032]=`FRONT_AND_BACK`,e[e.BLEND=3042]=`BLEND`,e[e.DEPTH_TEST=2929]=`DEPTH_TEST`,e[e.DITHER=3024]=`DITHER`,e[e.POLYGON_OFFSET_FILL=32823]=`POLYGON_OFFSET_FILL`,e[e.SAMPLE_ALPHA_TO_COVERAGE=32926]=`SAMPLE_ALPHA_TO_COVERAGE`,e[e.SAMPLE_COVERAGE=32928]=`SAMPLE_COVERAGE`,e[e.SCISSOR_TEST=3089]=`SCISSOR_TEST`,e[e.STENCIL_TEST=2960]=`STENCIL_TEST`,e[e.NO_ERROR=0]=`NO_ERROR`,e[e.INVALID_ENUM=1280]=`INVALID_ENUM`,e[e.INVALID_VALUE=1281]=`INVALID_VALUE`,e[e.INVALID_OPERATION=1282]=`INVALID_OPERATION`,e[e.OUT_OF_MEMORY=1285]=`OUT_OF_MEMORY`,e[e.CONTEXT_LOST_WEBGL=37442]=`CONTEXT_LOST_WEBGL`,e[e.CW=2304]=`CW`,e[e.CCW=2305]=`CCW`,e[e.DONT_CARE=4352]=`DONT_CARE`,e[e.FASTEST=4353]=`FASTEST`,e[e.NICEST=4354]=`NICEST`,e[e.GENERATE_MIPMAP_HINT=33170]=`GENERATE_MIPMAP_HINT`,e[e.BYTE=5120]=`BYTE`,e[e.UNSIGNED_BYTE=5121]=`UNSIGNED_BYTE`,e[e.SHORT=5122]=`SHORT`,e[e.UNSIGNED_SHORT=5123]=`UNSIGNED_SHORT`,e[e.INT=5124]=`INT`,e[e.UNSIGNED_INT=5125]=`UNSIGNED_INT`,e[e.FLOAT=5126]=`FLOAT`,e[e.DOUBLE=5130]=`DOUBLE`,e[e.DEPTH_COMPONENT=6402]=`DEPTH_COMPONENT`,e[e.ALPHA=6406]=`ALPHA`,e[e.RGB=6407]=`RGB`,e[e.RGBA=6408]=`RGBA`,e[e.LUMINANCE=6409]=`LUMINANCE`,e[e.LUMINANCE_ALPHA=6410]=`LUMINANCE_ALPHA`,e[e.UNSIGNED_SHORT_4_4_4_4=32819]=`UNSIGNED_SHORT_4_4_4_4`,e[e.UNSIGNED_SHORT_5_5_5_1=32820]=`UNSIGNED_SHORT_5_5_5_1`,e[e.UNSIGNED_SHORT_5_6_5=33635]=`UNSIGNED_SHORT_5_6_5`,e[e.FRAGMENT_SHADER=35632]=`FRAGMENT_SHADER`,e[e.VERTEX_SHADER=35633]=`VERTEX_SHADER`,e[e.COMPILE_STATUS=35713]=`COMPILE_STATUS`,e[e.DELETE_STATUS=35712]=`DELETE_STATUS`,e[e.LINK_STATUS=35714]=`LINK_STATUS`,e[e.VALIDATE_STATUS=35715]=`VALIDATE_STATUS`,e[e.ATTACHED_SHADERS=35717]=`ATTACHED_SHADERS`,e[e.ACTIVE_ATTRIBUTES=35721]=`ACTIVE_ATTRIBUTES`,e[e.ACTIVE_UNIFORMS=35718]=`ACTIVE_UNIFORMS`,e[e.MAX_VERTEX_ATTRIBS=34921]=`MAX_VERTEX_ATTRIBS`,e[e.MAX_VERTEX_UNIFORM_VECTORS=36347]=`MAX_VERTEX_UNIFORM_VECTORS`,e[e.MAX_VARYING_VECTORS=36348]=`MAX_VARYING_VECTORS`,e[e.MAX_COMBINED_TEXTURE_IMAGE_UNITS=35661]=`MAX_COMBINED_TEXTURE_IMAGE_UNITS`,e[e.MAX_VERTEX_TEXTURE_IMAGE_UNITS=35660]=`MAX_VERTEX_TEXTURE_IMAGE_UNITS`,e[e.MAX_TEXTURE_IMAGE_UNITS=34930]=`MAX_TEXTURE_IMAGE_UNITS`,e[e.MAX_FRAGMENT_UNIFORM_VECTORS=36349]=`MAX_FRAGMENT_UNIFORM_VECTORS`,e[e.SHADER_TYPE=35663]=`SHADER_TYPE`,e[e.SHADING_LANGUAGE_VERSION=35724]=`SHADING_LANGUAGE_VERSION`,e[e.CURRENT_PROGRAM=35725]=`CURRENT_PROGRAM`,e[e.NEVER=512]=`NEVER`,e[e.ALWAYS=519]=`ALWAYS`,e[e.LESS=513]=`LESS`,e[e.EQUAL=514]=`EQUAL`,e[e.LEQUAL=515]=`LEQUAL`,e[e.GREATER=516]=`GREATER`,e[e.GEQUAL=518]=`GEQUAL`,e[e.NOTEQUAL=517]=`NOTEQUAL`,e[e.KEEP=7680]=`KEEP`,e[e.REPLACE=7681]=`REPLACE`,e[e.INCR=7682]=`INCR`,e[e.DECR=7683]=`DECR`,e[e.INVERT=5386]=`INVERT`,e[e.INCR_WRAP=34055]=`INCR_WRAP`,e[e.DECR_WRAP=34056]=`DECR_WRAP`,e[e.NEAREST=9728]=`NEAREST`,e[e.LINEAR=9729]=`LINEAR`,e[e.NEAREST_MIPMAP_NEAREST=9984]=`NEAREST_MIPMAP_NEAREST`,e[e.LINEAR_MIPMAP_NEAREST=9985]=`LINEAR_MIPMAP_NEAREST`,e[e.NEAREST_MIPMAP_LINEAR=9986]=`NEAREST_MIPMAP_LINEAR`,e[e.LINEAR_MIPMAP_LINEAR=9987]=`LINEAR_MIPMAP_LINEAR`,e[e.TEXTURE_MAG_FILTER=10240]=`TEXTURE_MAG_FILTER`,e[e.TEXTURE_MIN_FILTER=10241]=`TEXTURE_MIN_FILTER`,e[e.TEXTURE_WRAP_S=10242]=`TEXTURE_WRAP_S`,e[e.TEXTURE_WRAP_T=10243]=`TEXTURE_WRAP_T`,e[e.TEXTURE_2D=3553]=`TEXTURE_2D`,e[e.TEXTURE=5890]=`TEXTURE`,e[e.TEXTURE_CUBE_MAP=34067]=`TEXTURE_CUBE_MAP`,e[e.TEXTURE_BINDING_CUBE_MAP=34068]=`TEXTURE_BINDING_CUBE_MAP`,e[e.TEXTURE_CUBE_MAP_POSITIVE_X=34069]=`TEXTURE_CUBE_MAP_POSITIVE_X`,e[e.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]=`TEXTURE_CUBE_MAP_NEGATIVE_X`,e[e.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]=`TEXTURE_CUBE_MAP_POSITIVE_Y`,e[e.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]=`TEXTURE_CUBE_MAP_NEGATIVE_Y`,e[e.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]=`TEXTURE_CUBE_MAP_POSITIVE_Z`,e[e.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]=`TEXTURE_CUBE_MAP_NEGATIVE_Z`,e[e.MAX_CUBE_MAP_TEXTURE_SIZE=34076]=`MAX_CUBE_MAP_TEXTURE_SIZE`,e[e.TEXTURE0=33984]=`TEXTURE0`,e[e.ACTIVE_TEXTURE=34016]=`ACTIVE_TEXTURE`,e[e.REPEAT=10497]=`REPEAT`,e[e.CLAMP_TO_EDGE=33071]=`CLAMP_TO_EDGE`,e[e.MIRRORED_REPEAT=33648]=`MIRRORED_REPEAT`,e[e.TEXTURE_WIDTH=4096]=`TEXTURE_WIDTH`,e[e.TEXTURE_HEIGHT=4097]=`TEXTURE_HEIGHT`,e[e.FLOAT_VEC2=35664]=`FLOAT_VEC2`,e[e.FLOAT_VEC3=35665]=`FLOAT_VEC3`,e[e.FLOAT_VEC4=35666]=`FLOAT_VEC4`,e[e.INT_VEC2=35667]=`INT_VEC2`,e[e.INT_VEC3=35668]=`INT_VEC3`,e[e.INT_VEC4=35669]=`INT_VEC4`,e[e.BOOL=35670]=`BOOL`,e[e.BOOL_VEC2=35671]=`BOOL_VEC2`,e[e.BOOL_VEC3=35672]=`BOOL_VEC3`,e[e.BOOL_VEC4=35673]=`BOOL_VEC4`,e[e.FLOAT_MAT2=35674]=`FLOAT_MAT2`,e[e.FLOAT_MAT3=35675]=`FLOAT_MAT3`,e[e.FLOAT_MAT4=35676]=`FLOAT_MAT4`,e[e.SAMPLER_2D=35678]=`SAMPLER_2D`,e[e.SAMPLER_CUBE=35680]=`SAMPLER_CUBE`,e[e.LOW_FLOAT=36336]=`LOW_FLOAT`,e[e.MEDIUM_FLOAT=36337]=`MEDIUM_FLOAT`,e[e.HIGH_FLOAT=36338]=`HIGH_FLOAT`,e[e.LOW_INT=36339]=`LOW_INT`,e[e.MEDIUM_INT=36340]=`MEDIUM_INT`,e[e.HIGH_INT=36341]=`HIGH_INT`,e[e.FRAMEBUFFER=36160]=`FRAMEBUFFER`,e[e.RENDERBUFFER=36161]=`RENDERBUFFER`,e[e.RGBA4=32854]=`RGBA4`,e[e.RGB5_A1=32855]=`RGB5_A1`,e[e.RGB565=36194]=`RGB565`,e[e.DEPTH_COMPONENT16=33189]=`DEPTH_COMPONENT16`,e[e.STENCIL_INDEX=6401]=`STENCIL_INDEX`,e[e.STENCIL_INDEX8=36168]=`STENCIL_INDEX8`,e[e.DEPTH_STENCIL=34041]=`DEPTH_STENCIL`,e[e.RENDERBUFFER_WIDTH=36162]=`RENDERBUFFER_WIDTH`,e[e.RENDERBUFFER_HEIGHT=36163]=`RENDERBUFFER_HEIGHT`,e[e.RENDERBUFFER_INTERNAL_FORMAT=36164]=`RENDERBUFFER_INTERNAL_FORMAT`,e[e.RENDERBUFFER_RED_SIZE=36176]=`RENDERBUFFER_RED_SIZE`,e[e.RENDERBUFFER_GREEN_SIZE=36177]=`RENDERBUFFER_GREEN_SIZE`,e[e.RENDERBUFFER_BLUE_SIZE=36178]=`RENDERBUFFER_BLUE_SIZE`,e[e.RENDERBUFFER_ALPHA_SIZE=36179]=`RENDERBUFFER_ALPHA_SIZE`,e[e.RENDERBUFFER_DEPTH_SIZE=36180]=`RENDERBUFFER_DEPTH_SIZE`,e[e.RENDERBUFFER_STENCIL_SIZE=36181]=`RENDERBUFFER_STENCIL_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE=36048]=`FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE`,e[e.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME=36049]=`FRAMEBUFFER_ATTACHMENT_OBJECT_NAME`,e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL=36050]=`FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL`,e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE=36051]=`FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE`,e[e.COLOR_ATTACHMENT0=36064]=`COLOR_ATTACHMENT0`,e[e.DEPTH_ATTACHMENT=36096]=`DEPTH_ATTACHMENT`,e[e.STENCIL_ATTACHMENT=36128]=`STENCIL_ATTACHMENT`,e[e.DEPTH_STENCIL_ATTACHMENT=33306]=`DEPTH_STENCIL_ATTACHMENT`,e[e.NONE=0]=`NONE`,e[e.FRAMEBUFFER_COMPLETE=36053]=`FRAMEBUFFER_COMPLETE`,e[e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT=36054]=`FRAMEBUFFER_INCOMPLETE_ATTACHMENT`,e[e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT=36055]=`FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT`,e[e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS=36057]=`FRAMEBUFFER_INCOMPLETE_DIMENSIONS`,e[e.FRAMEBUFFER_UNSUPPORTED=36061]=`FRAMEBUFFER_UNSUPPORTED`,e[e.FRAMEBUFFER_BINDING=36006]=`FRAMEBUFFER_BINDING`,e[e.RENDERBUFFER_BINDING=36007]=`RENDERBUFFER_BINDING`,e[e.READ_FRAMEBUFFER=36008]=`READ_FRAMEBUFFER`,e[e.DRAW_FRAMEBUFFER=36009]=`DRAW_FRAMEBUFFER`,e[e.MAX_RENDERBUFFER_SIZE=34024]=`MAX_RENDERBUFFER_SIZE`,e[e.INVALID_FRAMEBUFFER_OPERATION=1286]=`INVALID_FRAMEBUFFER_OPERATION`,e[e.UNPACK_FLIP_Y_WEBGL=37440]=`UNPACK_FLIP_Y_WEBGL`,e[e.UNPACK_PREMULTIPLY_ALPHA_WEBGL=37441]=`UNPACK_PREMULTIPLY_ALPHA_WEBGL`,e[e.UNPACK_COLORSPACE_CONVERSION_WEBGL=37443]=`UNPACK_COLORSPACE_CONVERSION_WEBGL`,e[e.READ_BUFFER=3074]=`READ_BUFFER`,e[e.UNPACK_ROW_LENGTH=3314]=`UNPACK_ROW_LENGTH`,e[e.UNPACK_SKIP_ROWS=3315]=`UNPACK_SKIP_ROWS`,e[e.UNPACK_SKIP_PIXELS=3316]=`UNPACK_SKIP_PIXELS`,e[e.PACK_ROW_LENGTH=3330]=`PACK_ROW_LENGTH`,e[e.PACK_SKIP_ROWS=3331]=`PACK_SKIP_ROWS`,e[e.PACK_SKIP_PIXELS=3332]=`PACK_SKIP_PIXELS`,e[e.TEXTURE_BINDING_3D=32874]=`TEXTURE_BINDING_3D`,e[e.UNPACK_SKIP_IMAGES=32877]=`UNPACK_SKIP_IMAGES`,e[e.UNPACK_IMAGE_HEIGHT=32878]=`UNPACK_IMAGE_HEIGHT`,e[e.MAX_3D_TEXTURE_SIZE=32883]=`MAX_3D_TEXTURE_SIZE`,e[e.MAX_ELEMENTS_VERTICES=33e3]=`MAX_ELEMENTS_VERTICES`,e[e.MAX_ELEMENTS_INDICES=33001]=`MAX_ELEMENTS_INDICES`,e[e.MAX_TEXTURE_LOD_BIAS=34045]=`MAX_TEXTURE_LOD_BIAS`,e[e.MAX_FRAGMENT_UNIFORM_COMPONENTS=35657]=`MAX_FRAGMENT_UNIFORM_COMPONENTS`,e[e.MAX_VERTEX_UNIFORM_COMPONENTS=35658]=`MAX_VERTEX_UNIFORM_COMPONENTS`,e[e.MAX_ARRAY_TEXTURE_LAYERS=35071]=`MAX_ARRAY_TEXTURE_LAYERS`,e[e.MIN_PROGRAM_TEXEL_OFFSET=35076]=`MIN_PROGRAM_TEXEL_OFFSET`,e[e.MAX_PROGRAM_TEXEL_OFFSET=35077]=`MAX_PROGRAM_TEXEL_OFFSET`,e[e.MAX_VARYING_COMPONENTS=35659]=`MAX_VARYING_COMPONENTS`,e[e.FRAGMENT_SHADER_DERIVATIVE_HINT=35723]=`FRAGMENT_SHADER_DERIVATIVE_HINT`,e[e.RASTERIZER_DISCARD=35977]=`RASTERIZER_DISCARD`,e[e.VERTEX_ARRAY_BINDING=34229]=`VERTEX_ARRAY_BINDING`,e[e.MAX_VERTEX_OUTPUT_COMPONENTS=37154]=`MAX_VERTEX_OUTPUT_COMPONENTS`,e[e.MAX_FRAGMENT_INPUT_COMPONENTS=37157]=`MAX_FRAGMENT_INPUT_COMPONENTS`,e[e.MAX_SERVER_WAIT_TIMEOUT=37137]=`MAX_SERVER_WAIT_TIMEOUT`,e[e.MAX_ELEMENT_INDEX=36203]=`MAX_ELEMENT_INDEX`,e[e.RED=6403]=`RED`,e[e.RGB8=32849]=`RGB8`,e[e.RGBA8=32856]=`RGBA8`,e[e.RGB10_A2=32857]=`RGB10_A2`,e[e.TEXTURE_3D=32879]=`TEXTURE_3D`,e[e.TEXTURE_WRAP_R=32882]=`TEXTURE_WRAP_R`,e[e.TEXTURE_MIN_LOD=33082]=`TEXTURE_MIN_LOD`,e[e.TEXTURE_MAX_LOD=33083]=`TEXTURE_MAX_LOD`,e[e.TEXTURE_BASE_LEVEL=33084]=`TEXTURE_BASE_LEVEL`,e[e.TEXTURE_MAX_LEVEL=33085]=`TEXTURE_MAX_LEVEL`,e[e.TEXTURE_COMPARE_MODE=34892]=`TEXTURE_COMPARE_MODE`,e[e.TEXTURE_COMPARE_FUNC=34893]=`TEXTURE_COMPARE_FUNC`,e[e.SRGB=35904]=`SRGB`,e[e.SRGB8=35905]=`SRGB8`,e[e.SRGB8_ALPHA8=35907]=`SRGB8_ALPHA8`,e[e.COMPARE_REF_TO_TEXTURE=34894]=`COMPARE_REF_TO_TEXTURE`,e[e.RGBA32F=34836]=`RGBA32F`,e[e.RGB32F=34837]=`RGB32F`,e[e.RGBA16F=34842]=`RGBA16F`,e[e.RGB16F=34843]=`RGB16F`,e[e.TEXTURE_2D_ARRAY=35866]=`TEXTURE_2D_ARRAY`,e[e.TEXTURE_BINDING_2D_ARRAY=35869]=`TEXTURE_BINDING_2D_ARRAY`,e[e.R11F_G11F_B10F=35898]=`R11F_G11F_B10F`,e[e.RGB9_E5=35901]=`RGB9_E5`,e[e.RGBA32UI=36208]=`RGBA32UI`,e[e.RGB32UI=36209]=`RGB32UI`,e[e.RGBA16UI=36214]=`RGBA16UI`,e[e.RGB16UI=36215]=`RGB16UI`,e[e.RGBA8UI=36220]=`RGBA8UI`,e[e.RGB8UI=36221]=`RGB8UI`,e[e.RGBA32I=36226]=`RGBA32I`,e[e.RGB32I=36227]=`RGB32I`,e[e.RGBA16I=36232]=`RGBA16I`,e[e.RGB16I=36233]=`RGB16I`,e[e.RGBA8I=36238]=`RGBA8I`,e[e.RGB8I=36239]=`RGB8I`,e[e.RED_INTEGER=36244]=`RED_INTEGER`,e[e.RGB_INTEGER=36248]=`RGB_INTEGER`,e[e.RGBA_INTEGER=36249]=`RGBA_INTEGER`,e[e.R8=33321]=`R8`,e[e.RG8=33323]=`RG8`,e[e.R16F=33325]=`R16F`,e[e.R32F=33326]=`R32F`,e[e.RG16F=33327]=`RG16F`,e[e.RG32F=33328]=`RG32F`,e[e.R8I=33329]=`R8I`,e[e.R8UI=33330]=`R8UI`,e[e.R16I=33331]=`R16I`,e[e.R16UI=33332]=`R16UI`,e[e.R32I=33333]=`R32I`,e[e.R32UI=33334]=`R32UI`,e[e.RG8I=33335]=`RG8I`,e[e.RG8UI=33336]=`RG8UI`,e[e.RG16I=33337]=`RG16I`,e[e.RG16UI=33338]=`RG16UI`,e[e.RG32I=33339]=`RG32I`,e[e.RG32UI=33340]=`RG32UI`,e[e.R8_SNORM=36756]=`R8_SNORM`,e[e.RG8_SNORM=36757]=`RG8_SNORM`,e[e.RGB8_SNORM=36758]=`RGB8_SNORM`,e[e.RGBA8_SNORM=36759]=`RGBA8_SNORM`,e[e.RGB10_A2UI=36975]=`RGB10_A2UI`,e[e.TEXTURE_IMMUTABLE_FORMAT=37167]=`TEXTURE_IMMUTABLE_FORMAT`,e[e.TEXTURE_IMMUTABLE_LEVELS=33503]=`TEXTURE_IMMUTABLE_LEVELS`,e[e.UNSIGNED_INT_2_10_10_10_REV=33640]=`UNSIGNED_INT_2_10_10_10_REV`,e[e.UNSIGNED_INT_10F_11F_11F_REV=35899]=`UNSIGNED_INT_10F_11F_11F_REV`,e[e.UNSIGNED_INT_5_9_9_9_REV=35902]=`UNSIGNED_INT_5_9_9_9_REV`,e[e.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]=`FLOAT_32_UNSIGNED_INT_24_8_REV`,e[e.UNSIGNED_INT_24_8=34042]=`UNSIGNED_INT_24_8`,e[e.HALF_FLOAT=5131]=`HALF_FLOAT`,e[e.RG=33319]=`RG`,e[e.RG_INTEGER=33320]=`RG_INTEGER`,e[e.INT_2_10_10_10_REV=36255]=`INT_2_10_10_10_REV`,e[e.CURRENT_QUERY=34917]=`CURRENT_QUERY`,e[e.QUERY_RESULT=34918]=`QUERY_RESULT`,e[e.QUERY_RESULT_AVAILABLE=34919]=`QUERY_RESULT_AVAILABLE`,e[e.ANY_SAMPLES_PASSED=35887]=`ANY_SAMPLES_PASSED`,e[e.ANY_SAMPLES_PASSED_CONSERVATIVE=36202]=`ANY_SAMPLES_PASSED_CONSERVATIVE`,e[e.MAX_DRAW_BUFFERS=34852]=`MAX_DRAW_BUFFERS`,e[e.DRAW_BUFFER0=34853]=`DRAW_BUFFER0`,e[e.DRAW_BUFFER1=34854]=`DRAW_BUFFER1`,e[e.DRAW_BUFFER2=34855]=`DRAW_BUFFER2`,e[e.DRAW_BUFFER3=34856]=`DRAW_BUFFER3`,e[e.DRAW_BUFFER4=34857]=`DRAW_BUFFER4`,e[e.DRAW_BUFFER5=34858]=`DRAW_BUFFER5`,e[e.DRAW_BUFFER6=34859]=`DRAW_BUFFER6`,e[e.DRAW_BUFFER7=34860]=`DRAW_BUFFER7`,e[e.DRAW_BUFFER8=34861]=`DRAW_BUFFER8`,e[e.DRAW_BUFFER9=34862]=`DRAW_BUFFER9`,e[e.DRAW_BUFFER10=34863]=`DRAW_BUFFER10`,e[e.DRAW_BUFFER11=34864]=`DRAW_BUFFER11`,e[e.DRAW_BUFFER12=34865]=`DRAW_BUFFER12`,e[e.DRAW_BUFFER13=34866]=`DRAW_BUFFER13`,e[e.DRAW_BUFFER14=34867]=`DRAW_BUFFER14`,e[e.DRAW_BUFFER15=34868]=`DRAW_BUFFER15`,e[e.MAX_COLOR_ATTACHMENTS=36063]=`MAX_COLOR_ATTACHMENTS`,e[e.COLOR_ATTACHMENT1=36065]=`COLOR_ATTACHMENT1`,e[e.COLOR_ATTACHMENT2=36066]=`COLOR_ATTACHMENT2`,e[e.COLOR_ATTACHMENT3=36067]=`COLOR_ATTACHMENT3`,e[e.COLOR_ATTACHMENT4=36068]=`COLOR_ATTACHMENT4`,e[e.COLOR_ATTACHMENT5=36069]=`COLOR_ATTACHMENT5`,e[e.COLOR_ATTACHMENT6=36070]=`COLOR_ATTACHMENT6`,e[e.COLOR_ATTACHMENT7=36071]=`COLOR_ATTACHMENT7`,e[e.COLOR_ATTACHMENT8=36072]=`COLOR_ATTACHMENT8`,e[e.COLOR_ATTACHMENT9=36073]=`COLOR_ATTACHMENT9`,e[e.COLOR_ATTACHMENT10=36074]=`COLOR_ATTACHMENT10`,e[e.COLOR_ATTACHMENT11=36075]=`COLOR_ATTACHMENT11`,e[e.COLOR_ATTACHMENT12=36076]=`COLOR_ATTACHMENT12`,e[e.COLOR_ATTACHMENT13=36077]=`COLOR_ATTACHMENT13`,e[e.COLOR_ATTACHMENT14=36078]=`COLOR_ATTACHMENT14`,e[e.COLOR_ATTACHMENT15=36079]=`COLOR_ATTACHMENT15`,e[e.SAMPLER_3D=35679]=`SAMPLER_3D`,e[e.SAMPLER_2D_SHADOW=35682]=`SAMPLER_2D_SHADOW`,e[e.SAMPLER_2D_ARRAY=36289]=`SAMPLER_2D_ARRAY`,e[e.SAMPLER_2D_ARRAY_SHADOW=36292]=`SAMPLER_2D_ARRAY_SHADOW`,e[e.SAMPLER_CUBE_SHADOW=36293]=`SAMPLER_CUBE_SHADOW`,e[e.INT_SAMPLER_2D=36298]=`INT_SAMPLER_2D`,e[e.INT_SAMPLER_3D=36299]=`INT_SAMPLER_3D`,e[e.INT_SAMPLER_CUBE=36300]=`INT_SAMPLER_CUBE`,e[e.INT_SAMPLER_2D_ARRAY=36303]=`INT_SAMPLER_2D_ARRAY`,e[e.UNSIGNED_INT_SAMPLER_2D=36306]=`UNSIGNED_INT_SAMPLER_2D`,e[e.UNSIGNED_INT_SAMPLER_3D=36307]=`UNSIGNED_INT_SAMPLER_3D`,e[e.UNSIGNED_INT_SAMPLER_CUBE=36308]=`UNSIGNED_INT_SAMPLER_CUBE`,e[e.UNSIGNED_INT_SAMPLER_2D_ARRAY=36311]=`UNSIGNED_INT_SAMPLER_2D_ARRAY`,e[e.MAX_SAMPLES=36183]=`MAX_SAMPLES`,e[e.SAMPLER_BINDING=35097]=`SAMPLER_BINDING`,e[e.PIXEL_PACK_BUFFER=35051]=`PIXEL_PACK_BUFFER`,e[e.PIXEL_UNPACK_BUFFER=35052]=`PIXEL_UNPACK_BUFFER`,e[e.PIXEL_PACK_BUFFER_BINDING=35053]=`PIXEL_PACK_BUFFER_BINDING`,e[e.PIXEL_UNPACK_BUFFER_BINDING=35055]=`PIXEL_UNPACK_BUFFER_BINDING`,e[e.COPY_READ_BUFFER=36662]=`COPY_READ_BUFFER`,e[e.COPY_WRITE_BUFFER=36663]=`COPY_WRITE_BUFFER`,e[e.COPY_READ_BUFFER_BINDING=36662]=`COPY_READ_BUFFER_BINDING`,e[e.COPY_WRITE_BUFFER_BINDING=36663]=`COPY_WRITE_BUFFER_BINDING`,e[e.FLOAT_MAT2x3=35685]=`FLOAT_MAT2x3`,e[e.FLOAT_MAT2x4=35686]=`FLOAT_MAT2x4`,e[e.FLOAT_MAT3x2=35687]=`FLOAT_MAT3x2`,e[e.FLOAT_MAT3x4=35688]=`FLOAT_MAT3x4`,e[e.FLOAT_MAT4x2=35689]=`FLOAT_MAT4x2`,e[e.FLOAT_MAT4x3=35690]=`FLOAT_MAT4x3`,e[e.UNSIGNED_INT_VEC2=36294]=`UNSIGNED_INT_VEC2`,e[e.UNSIGNED_INT_VEC3=36295]=`UNSIGNED_INT_VEC3`,e[e.UNSIGNED_INT_VEC4=36296]=`UNSIGNED_INT_VEC4`,e[e.UNSIGNED_NORMALIZED=35863]=`UNSIGNED_NORMALIZED`,e[e.SIGNED_NORMALIZED=36764]=`SIGNED_NORMALIZED`,e[e.VERTEX_ATTRIB_ARRAY_INTEGER=35069]=`VERTEX_ATTRIB_ARRAY_INTEGER`,e[e.VERTEX_ATTRIB_ARRAY_DIVISOR=35070]=`VERTEX_ATTRIB_ARRAY_DIVISOR`,e[e.TRANSFORM_FEEDBACK_BUFFER_MODE=35967]=`TRANSFORM_FEEDBACK_BUFFER_MODE`,e[e.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS=35968]=`MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS`,e[e.TRANSFORM_FEEDBACK_VARYINGS=35971]=`TRANSFORM_FEEDBACK_VARYINGS`,e[e.TRANSFORM_FEEDBACK_BUFFER_START=35972]=`TRANSFORM_FEEDBACK_BUFFER_START`,e[e.TRANSFORM_FEEDBACK_BUFFER_SIZE=35973]=`TRANSFORM_FEEDBACK_BUFFER_SIZE`,e[e.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN=35976]=`TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN`,e[e.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS=35978]=`MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS`,e[e.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS=35979]=`MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS`,e[e.INTERLEAVED_ATTRIBS=35980]=`INTERLEAVED_ATTRIBS`,e[e.SEPARATE_ATTRIBS=35981]=`SEPARATE_ATTRIBS`,e[e.TRANSFORM_FEEDBACK_BUFFER=35982]=`TRANSFORM_FEEDBACK_BUFFER`,e[e.TRANSFORM_FEEDBACK_BUFFER_BINDING=35983]=`TRANSFORM_FEEDBACK_BUFFER_BINDING`,e[e.TRANSFORM_FEEDBACK=36386]=`TRANSFORM_FEEDBACK`,e[e.TRANSFORM_FEEDBACK_PAUSED=36387]=`TRANSFORM_FEEDBACK_PAUSED`,e[e.TRANSFORM_FEEDBACK_ACTIVE=36388]=`TRANSFORM_FEEDBACK_ACTIVE`,e[e.TRANSFORM_FEEDBACK_BINDING=36389]=`TRANSFORM_FEEDBACK_BINDING`,e[e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING=33296]=`FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING`,e[e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE=33297]=`FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE`,e[e.FRAMEBUFFER_ATTACHMENT_RED_SIZE=33298]=`FRAMEBUFFER_ATTACHMENT_RED_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE=33299]=`FRAMEBUFFER_ATTACHMENT_GREEN_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE=33300]=`FRAMEBUFFER_ATTACHMENT_BLUE_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE=33301]=`FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE=33302]=`FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE`,e[e.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE=33303]=`FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE`,e[e.FRAMEBUFFER_DEFAULT=33304]=`FRAMEBUFFER_DEFAULT`,e[e.DEPTH24_STENCIL8=35056]=`DEPTH24_STENCIL8`,e[e.DRAW_FRAMEBUFFER_BINDING=36006]=`DRAW_FRAMEBUFFER_BINDING`,e[e.READ_FRAMEBUFFER_BINDING=36010]=`READ_FRAMEBUFFER_BINDING`,e[e.RENDERBUFFER_SAMPLES=36011]=`RENDERBUFFER_SAMPLES`,e[e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER=36052]=`FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER`,e[e.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE=36182]=`FRAMEBUFFER_INCOMPLETE_MULTISAMPLE`,e[e.UNIFORM_BUFFER=35345]=`UNIFORM_BUFFER`,e[e.UNIFORM_BUFFER_BINDING=35368]=`UNIFORM_BUFFER_BINDING`,e[e.UNIFORM_BUFFER_START=35369]=`UNIFORM_BUFFER_START`,e[e.UNIFORM_BUFFER_SIZE=35370]=`UNIFORM_BUFFER_SIZE`,e[e.MAX_VERTEX_UNIFORM_BLOCKS=35371]=`MAX_VERTEX_UNIFORM_BLOCKS`,e[e.MAX_FRAGMENT_UNIFORM_BLOCKS=35373]=`MAX_FRAGMENT_UNIFORM_BLOCKS`,e[e.MAX_COMBINED_UNIFORM_BLOCKS=35374]=`MAX_COMBINED_UNIFORM_BLOCKS`,e[e.MAX_UNIFORM_BUFFER_BINDINGS=35375]=`MAX_UNIFORM_BUFFER_BINDINGS`,e[e.MAX_UNIFORM_BLOCK_SIZE=35376]=`MAX_UNIFORM_BLOCK_SIZE`,e[e.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS=35377]=`MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS`,e[e.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS=35379]=`MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS`,e[e.UNIFORM_BUFFER_OFFSET_ALIGNMENT=35380]=`UNIFORM_BUFFER_OFFSET_ALIGNMENT`,e[e.ACTIVE_UNIFORM_BLOCKS=35382]=`ACTIVE_UNIFORM_BLOCKS`,e[e.UNIFORM_TYPE=35383]=`UNIFORM_TYPE`,e[e.UNIFORM_SIZE=35384]=`UNIFORM_SIZE`,e[e.UNIFORM_BLOCK_INDEX=35386]=`UNIFORM_BLOCK_INDEX`,e[e.UNIFORM_OFFSET=35387]=`UNIFORM_OFFSET`,e[e.UNIFORM_ARRAY_STRIDE=35388]=`UNIFORM_ARRAY_STRIDE`,e[e.UNIFORM_MATRIX_STRIDE=35389]=`UNIFORM_MATRIX_STRIDE`,e[e.UNIFORM_IS_ROW_MAJOR=35390]=`UNIFORM_IS_ROW_MAJOR`,e[e.UNIFORM_BLOCK_BINDING=35391]=`UNIFORM_BLOCK_BINDING`,e[e.UNIFORM_BLOCK_DATA_SIZE=35392]=`UNIFORM_BLOCK_DATA_SIZE`,e[e.UNIFORM_BLOCK_ACTIVE_UNIFORMS=35394]=`UNIFORM_BLOCK_ACTIVE_UNIFORMS`,e[e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES=35395]=`UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES`,e[e.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER=35396]=`UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER`,e[e.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER=35398]=`UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER`,e[e.OBJECT_TYPE=37138]=`OBJECT_TYPE`,e[e.SYNC_CONDITION=37139]=`SYNC_CONDITION`,e[e.SYNC_STATUS=37140]=`SYNC_STATUS`,e[e.SYNC_FLAGS=37141]=`SYNC_FLAGS`,e[e.SYNC_FENCE=37142]=`SYNC_FENCE`,e[e.SYNC_GPU_COMMANDS_COMPLETE=37143]=`SYNC_GPU_COMMANDS_COMPLETE`,e[e.UNSIGNALED=37144]=`UNSIGNALED`,e[e.SIGNALED=37145]=`SIGNALED`,e[e.ALREADY_SIGNALED=37146]=`ALREADY_SIGNALED`,e[e.TIMEOUT_EXPIRED=37147]=`TIMEOUT_EXPIRED`,e[e.CONDITION_SATISFIED=37148]=`CONDITION_SATISFIED`,e[e.WAIT_FAILED=37149]=`WAIT_FAILED`,e[e.SYNC_FLUSH_COMMANDS_BIT=1]=`SYNC_FLUSH_COMMANDS_BIT`,e[e.COLOR=6144]=`COLOR`,e[e.DEPTH=6145]=`DEPTH`,e[e.STENCIL=6146]=`STENCIL`,e[e.MIN=32775]=`MIN`,e[e.MAX=32776]=`MAX`,e[e.DEPTH_COMPONENT24=33190]=`DEPTH_COMPONENT24`,e[e.STREAM_READ=35041]=`STREAM_READ`,e[e.STREAM_COPY=35042]=`STREAM_COPY`,e[e.STATIC_READ=35045]=`STATIC_READ`,e[e.STATIC_COPY=35046]=`STATIC_COPY`,e[e.DYNAMIC_READ=35049]=`DYNAMIC_READ`,e[e.DYNAMIC_COPY=35050]=`DYNAMIC_COPY`,e[e.DEPTH_COMPONENT32F=36012]=`DEPTH_COMPONENT32F`,e[e.DEPTH32F_STENCIL8=36013]=`DEPTH32F_STENCIL8`,e[e.INVALID_INDEX=4294967295]=`INVALID_INDEX`,e[e.TIMEOUT_IGNORED=-1]=`TIMEOUT_IGNORED`,e[e.MAX_CLIENT_WAIT_TIMEOUT_WEBGL=37447]=`MAX_CLIENT_WAIT_TIMEOUT_WEBGL`,e[e.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE=35070]=`VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE`,e[e.UNMASKED_VENDOR_WEBGL=37445]=`UNMASKED_VENDOR_WEBGL`,e[e.UNMASKED_RENDERER_WEBGL=37446]=`UNMASKED_RENDERER_WEBGL`,e[e.MAX_TEXTURE_MAX_ANISOTROPY_EXT=34047]=`MAX_TEXTURE_MAX_ANISOTROPY_EXT`,e[e.TEXTURE_MAX_ANISOTROPY_EXT=34046]=`TEXTURE_MAX_ANISOTROPY_EXT`,e[e.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]=`COMPRESSED_RGB_S3TC_DXT1_EXT`,e[e.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]=`COMPRESSED_RGBA_S3TC_DXT1_EXT`,e[e.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]=`COMPRESSED_RGBA_S3TC_DXT3_EXT`,e[e.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]=`COMPRESSED_RGBA_S3TC_DXT5_EXT`,e[e.COMPRESSED_R11_EAC=37488]=`COMPRESSED_R11_EAC`,e[e.COMPRESSED_SIGNED_R11_EAC=37489]=`COMPRESSED_SIGNED_R11_EAC`,e[e.COMPRESSED_RG11_EAC=37490]=`COMPRESSED_RG11_EAC`,e[e.COMPRESSED_SIGNED_RG11_EAC=37491]=`COMPRESSED_SIGNED_RG11_EAC`,e[e.COMPRESSED_RGB8_ETC2=37492]=`COMPRESSED_RGB8_ETC2`,e[e.COMPRESSED_RGBA8_ETC2_EAC=37493]=`COMPRESSED_RGBA8_ETC2_EAC`,e[e.COMPRESSED_SRGB8_ETC2=37494]=`COMPRESSED_SRGB8_ETC2`,e[e.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37495]=`COMPRESSED_SRGB8_ALPHA8_ETC2_EAC`,e[e.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37496]=`COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2`,e[e.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37497]=`COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2`,e[e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]=`COMPRESSED_RGB_PVRTC_4BPPV1_IMG`,e[e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]=`COMPRESSED_RGBA_PVRTC_4BPPV1_IMG`,e[e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]=`COMPRESSED_RGB_PVRTC_2BPPV1_IMG`,e[e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]=`COMPRESSED_RGBA_PVRTC_2BPPV1_IMG`,e[e.COMPRESSED_RGB_ETC1_WEBGL=36196]=`COMPRESSED_RGB_ETC1_WEBGL`,e[e.COMPRESSED_RGB_ATC_WEBGL=35986]=`COMPRESSED_RGB_ATC_WEBGL`,e[e.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]=`COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL`,e[e.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]=`COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL`,e[e.UNSIGNED_INT_24_8_WEBGL=34042]=`UNSIGNED_INT_24_8_WEBGL`,e[e.HALF_FLOAT_OES=36193]=`HALF_FLOAT_OES`,e[e.RGBA32F_EXT=34836]=`RGBA32F_EXT`,e[e.RGB32F_EXT=34837]=`RGB32F_EXT`,e[e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT=33297]=`FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT`,e[e.UNSIGNED_NORMALIZED_EXT=35863]=`UNSIGNED_NORMALIZED_EXT`,e[e.MIN_EXT=32775]=`MIN_EXT`,e[e.MAX_EXT=32776]=`MAX_EXT`,e[e.SRGB_EXT=35904]=`SRGB_EXT`,e[e.SRGB_ALPHA_EXT=35906]=`SRGB_ALPHA_EXT`,e[e.SRGB8_ALPHA8_EXT=35907]=`SRGB8_ALPHA8_EXT`,e[e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT=33296]=`FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT`,e[e.FRAGMENT_SHADER_DERIVATIVE_HINT_OES=35723]=`FRAGMENT_SHADER_DERIVATIVE_HINT_OES`,e[e.COLOR_ATTACHMENT0_WEBGL=36064]=`COLOR_ATTACHMENT0_WEBGL`,e[e.COLOR_ATTACHMENT1_WEBGL=36065]=`COLOR_ATTACHMENT1_WEBGL`,e[e.COLOR_ATTACHMENT2_WEBGL=36066]=`COLOR_ATTACHMENT2_WEBGL`,e[e.COLOR_ATTACHMENT3_WEBGL=36067]=`COLOR_ATTACHMENT3_WEBGL`,e[e.COLOR_ATTACHMENT4_WEBGL=36068]=`COLOR_ATTACHMENT4_WEBGL`,e[e.COLOR_ATTACHMENT5_WEBGL=36069]=`COLOR_ATTACHMENT5_WEBGL`,e[e.COLOR_ATTACHMENT6_WEBGL=36070]=`COLOR_ATTACHMENT6_WEBGL`,e[e.COLOR_ATTACHMENT7_WEBGL=36071]=`COLOR_ATTACHMENT7_WEBGL`,e[e.COLOR_ATTACHMENT8_WEBGL=36072]=`COLOR_ATTACHMENT8_WEBGL`,e[e.COLOR_ATTACHMENT9_WEBGL=36073]=`COLOR_ATTACHMENT9_WEBGL`,e[e.COLOR_ATTACHMENT10_WEBGL=36074]=`COLOR_ATTACHMENT10_WEBGL`,e[e.COLOR_ATTACHMENT11_WEBGL=36075]=`COLOR_ATTACHMENT11_WEBGL`,e[e.COLOR_ATTACHMENT12_WEBGL=36076]=`COLOR_ATTACHMENT12_WEBGL`,e[e.COLOR_ATTACHMENT13_WEBGL=36077]=`COLOR_ATTACHMENT13_WEBGL`,e[e.COLOR_ATTACHMENT14_WEBGL=36078]=`COLOR_ATTACHMENT14_WEBGL`,e[e.COLOR_ATTACHMENT15_WEBGL=36079]=`COLOR_ATTACHMENT15_WEBGL`,e[e.DRAW_BUFFER0_WEBGL=34853]=`DRAW_BUFFER0_WEBGL`,e[e.DRAW_BUFFER1_WEBGL=34854]=`DRAW_BUFFER1_WEBGL`,e[e.DRAW_BUFFER2_WEBGL=34855]=`DRAW_BUFFER2_WEBGL`,e[e.DRAW_BUFFER3_WEBGL=34856]=`DRAW_BUFFER3_WEBGL`,e[e.DRAW_BUFFER4_WEBGL=34857]=`DRAW_BUFFER4_WEBGL`,e[e.DRAW_BUFFER5_WEBGL=34858]=`DRAW_BUFFER5_WEBGL`,e[e.DRAW_BUFFER6_WEBGL=34859]=`DRAW_BUFFER6_WEBGL`,e[e.DRAW_BUFFER7_WEBGL=34860]=`DRAW_BUFFER7_WEBGL`,e[e.DRAW_BUFFER8_WEBGL=34861]=`DRAW_BUFFER8_WEBGL`,e[e.DRAW_BUFFER9_WEBGL=34862]=`DRAW_BUFFER9_WEBGL`,e[e.DRAW_BUFFER10_WEBGL=34863]=`DRAW_BUFFER10_WEBGL`,e[e.DRAW_BUFFER11_WEBGL=34864]=`DRAW_BUFFER11_WEBGL`,e[e.DRAW_BUFFER12_WEBGL=34865]=`DRAW_BUFFER12_WEBGL`,e[e.DRAW_BUFFER13_WEBGL=34866]=`DRAW_BUFFER13_WEBGL`,e[e.DRAW_BUFFER14_WEBGL=34867]=`DRAW_BUFFER14_WEBGL`,e[e.DRAW_BUFFER15_WEBGL=34868]=`DRAW_BUFFER15_WEBGL`,e[e.MAX_COLOR_ATTACHMENTS_WEBGL=36063]=`MAX_COLOR_ATTACHMENTS_WEBGL`,e[e.MAX_DRAW_BUFFERS_WEBGL=34852]=`MAX_DRAW_BUFFERS_WEBGL`,e[e.VERTEX_ARRAY_BINDING_OES=34229]=`VERTEX_ARRAY_BINDING_OES`,e[e.QUERY_COUNTER_BITS_EXT=34916]=`QUERY_COUNTER_BITS_EXT`,e[e.CURRENT_QUERY_EXT=34917]=`CURRENT_QUERY_EXT`,e[e.QUERY_RESULT_EXT=34918]=`QUERY_RESULT_EXT`,e[e.QUERY_RESULT_AVAILABLE_EXT=34919]=`QUERY_RESULT_AVAILABLE_EXT`,e[e.TIME_ELAPSED_EXT=35007]=`TIME_ELAPSED_EXT`,e[e.TIMESTAMP_EXT=36392]=`TIMESTAMP_EXT`,e[e.GPU_DISJOINT_EXT=36795]=`GPU_DISJOINT_EXT`})(z||={});var B;(function(e){e[e.Buffer=0]=`Buffer`,e[e.Texture=1]=`Texture`,e[e.RenderTarget=2]=`RenderTarget`,e[e.Sampler=3]=`Sampler`,e[e.Program=4]=`Program`,e[e.Bindings=5]=`Bindings`,e[e.InputLayout=6]=`InputLayout`,e[e.RenderPipeline=7]=`RenderPipeline`,e[e.ComputePipeline=8]=`ComputePipeline`,e[e.Readback=9]=`Readback`,e[e.QueryPool=10]=`QueryPool`,e[e.RenderBundle=11]=`RenderBundle`})(B||={});var zn;(function(e){e[e.NEVER=512]=`NEVER`,e[e.LESS=513]=`LESS`,e[e.EQUAL=514]=`EQUAL`,e[e.LEQUAL=515]=`LEQUAL`,e[e.GREATER=516]=`GREATER`,e[e.NOTEQUAL=517]=`NOTEQUAL`,e[e.GEQUAL=518]=`GEQUAL`,e[e.ALWAYS=519]=`ALWAYS`})(zn||={});var Bn;(function(e){e[e.CCW=2305]=`CCW`,e[e.CW=2304]=`CW`})(Bn||={});var Vn;(function(e){e[e.NONE=0]=`NONE`,e[e.FRONT=1]=`FRONT`,e[e.BACK=2]=`BACK`,e[e.FRONT_AND_BACK=3]=`FRONT_AND_BACK`})(Vn||={});var Hn;(function(e){e[e.ZERO=0]=`ZERO`,e[e.ONE=1]=`ONE`,e[e.SRC=768]=`SRC`,e[e.ONE_MINUS_SRC=769]=`ONE_MINUS_SRC`,e[e.DST=774]=`DST`,e[e.ONE_MINUS_DST=775]=`ONE_MINUS_DST`,e[e.SRC_ALPHA=770]=`SRC_ALPHA`,e[e.ONE_MINUS_SRC_ALPHA=771]=`ONE_MINUS_SRC_ALPHA`,e[e.DST_ALPHA=772]=`DST_ALPHA`,e[e.ONE_MINUS_DST_ALPHA=773]=`ONE_MINUS_DST_ALPHA`,e[e.CONST=32769]=`CONST`,e[e.ONE_MINUS_CONSTANT=32770]=`ONE_MINUS_CONSTANT`,e[e.SRC_ALPHA_SATURATE=776]=`SRC_ALPHA_SATURATE`})(Hn||={});var Un;(function(e){e[e.ADD=32774]=`ADD`,e[e.SUBSTRACT=32778]=`SUBSTRACT`,e[e.REVERSE_SUBSTRACT=32779]=`REVERSE_SUBSTRACT`,e[e.MIN=32775]=`MIN`,e[e.MAX=32776]=`MAX`})(Un||={});var Wn;(function(e){e[e.CLAMP_TO_EDGE=0]=`CLAMP_TO_EDGE`,e[e.REPEAT=1]=`REPEAT`,e[e.MIRRORED_REPEAT=2]=`MIRRORED_REPEAT`})(Wn||={});var Gn;(function(e){e[e.POINT=0]=`POINT`,e[e.BILINEAR=1]=`BILINEAR`})(Gn||={});var Kn;(function(e){e[e.NO_MIP=0]=`NO_MIP`,e[e.NEAREST=1]=`NEAREST`,e[e.LINEAR=2]=`LINEAR`})(Kn||={});var qn;(function(e){e[e.POINTS=0]=`POINTS`,e[e.TRIANGLES=1]=`TRIANGLES`,e[e.TRIANGLE_STRIP=2]=`TRIANGLE_STRIP`,e[e.LINES=3]=`LINES`,e[e.LINE_STRIP=4]=`LINE_STRIP`})(qn||={});var V;(function(e){e[e.MAP_READ=1]=`MAP_READ`,e[e.MAP_WRITE=2]=`MAP_WRITE`,e[e.COPY_SRC=4]=`COPY_SRC`,e[e.COPY_DST=8]=`COPY_DST`,e[e.INDEX=16]=`INDEX`,e[e.VERTEX=32]=`VERTEX`,e[e.UNIFORM=64]=`UNIFORM`,e[e.STORAGE=128]=`STORAGE`,e[e.INDIRECT=256]=`INDIRECT`,e[e.QUERY_RESOLVE=512]=`QUERY_RESOLVE`})(V||={});var Jn;(function(e){e[e.STATIC=1]=`STATIC`,e[e.DYNAMIC=2]=`DYNAMIC`})(Jn||={});var H;(function(e){e[e.VERTEX=1]=`VERTEX`,e[e.INSTANCE=2]=`INSTANCE`})(H||={});var Yn;(function(e){e.LOADED=`loaded`})(Yn||={});var U;(function(e){e[e.TEXTURE_2D=0]=`TEXTURE_2D`,e[e.TEXTURE_2D_ARRAY=1]=`TEXTURE_2D_ARRAY`,e[e.TEXTURE_3D=2]=`TEXTURE_3D`,e[e.TEXTURE_CUBE_MAP=3]=`TEXTURE_CUBE_MAP`})(U||={});var Xn;(function(e){e[e.SAMPLED=1]=`SAMPLED`,e[e.RENDER_TARGET=2]=`RENDER_TARGET`,e[e.STORAGE=4]=`STORAGE`})(Xn||={});var Zn;(function(e){e[e.NONE=0]=`NONE`,e[e.RED=1]=`RED`,e[e.GREEN=2]=`GREEN`,e[e.BLUE=4]=`BLUE`,e[e.ALPHA=8]=`ALPHA`,e[e.RGB=7]=`RGB`,e[e.ALL=15]=`ALL`})(Zn||={});var Qn;(function(e){e[e.KEEP=7680]=`KEEP`,e[e.ZERO=0]=`ZERO`,e[e.REPLACE=7681]=`REPLACE`,e[e.INVERT=5386]=`INVERT`,e[e.INCREMENT_CLAMP=7682]=`INCREMENT_CLAMP`,e[e.DECREMENT_CLAMP=7683]=`DECREMENT_CLAMP`,e[e.INCREMENT_WRAP=34055]=`INCREMENT_WRAP`,e[e.DECREMENT_WRAP=34056]=`DECREMENT_WRAP`})(Qn||={});function $n(e,t,n,r){return{dimension:U.TEXTURE_2D,format:e,width:t,height:n,depthOrArrayLayers:1,mipLevelCount:r,usage:Xn.SAMPLED}}var er;(function(e){e[e.Float=0]=`Float`,e[e.UnfilterableFloat=1]=`UnfilterableFloat`,e[e.Uint=2]=`Uint`,e[e.Sint=3]=`Sint`,e[e.Depth=4]=`Depth`})(er||={});var tr;(function(e){e[e.LOWER_LEFT=0]=`LOWER_LEFT`,e[e.UPPER_LEFT=1]=`UPPER_LEFT`})(tr||={});var nr;(function(e){e[e.NEGATIVE_ONE=0]=`NEGATIVE_ONE`,e[e.ZERO=1]=`ZERO`})(nr||={});var rr;(function(e){e[e.OcclusionConservative=0]=`OcclusionConservative`})(rr||={});var W;(function(e){e[e.U8=1]=`U8`,e[e.U16=2]=`U16`,e[e.U32=3]=`U32`,e[e.S8=4]=`S8`,e[e.S16=5]=`S16`,e[e.S32=6]=`S32`,e[e.F16=7]=`F16`,e[e.F32=8]=`F32`,e[e.BC1=65]=`BC1`,e[e.BC2=66]=`BC2`,e[e.BC3=67]=`BC3`,e[e.BC4_UNORM=68]=`BC4_UNORM`,e[e.BC4_SNORM=69]=`BC4_SNORM`,e[e.BC5_UNORM=70]=`BC5_UNORM`,e[e.BC5_SNORM=71]=`BC5_SNORM`,e[e.U16_PACKED_5551=97]=`U16_PACKED_5551`,e[e.U16_PACKED_565=98]=`U16_PACKED_565`,e[e.D24=129]=`D24`,e[e.D32F=130]=`D32F`,e[e.D24S8=131]=`D24S8`,e[e.D32FS8=132]=`D32FS8`})(W||={});var G;(function(e){e[e.R=1]=`R`,e[e.RG=2]=`RG`,e[e.RGB=3]=`RGB`,e[e.RGBA=4]=`RGBA`,e[e.A=5]=`A`})(G||={});function ir(e){return e}var K;(function(e){e[e.None=0]=`None`,e[e.Normalized=1]=`Normalized`,e[e.sRGB=2]=`sRGB`,e[e.Depth=4]=`Depth`,e[e.Stencil=8]=`Stencil`,e[e.RenderTarget=16]=`RenderTarget`,e[e.Luminance=32]=`Luminance`})(K||={});function q(e,t,n){return e<<16|t<<8|n}var J;(function(e){e[e.ALPHA=q(W.U8,G.A,K.None)]=`ALPHA`,e[e.U8_LUMINANCE=q(W.U8,G.A,K.Luminance)]=`U8_LUMINANCE`,e[e.F16_LUMINANCE=q(W.F16,G.A,K.Luminance)]=`F16_LUMINANCE`,e[e.F32_LUMINANCE=q(W.F32,G.A,K.Luminance)]=`F32_LUMINANCE`,e[e.F16_R=q(W.F16,G.R,K.None)]=`F16_R`,e[e.F16_RG=q(W.F16,G.RG,K.None)]=`F16_RG`,e[e.F16_RGB=q(W.F16,G.RGB,K.None)]=`F16_RGB`,e[e.F16_RGBA=q(W.F16,G.RGBA,K.None)]=`F16_RGBA`,e[e.F32_R=q(W.F32,G.R,K.None)]=`F32_R`,e[e.F32_RG=q(W.F32,G.RG,K.None)]=`F32_RG`,e[e.F32_RGB=q(W.F32,G.RGB,K.None)]=`F32_RGB`,e[e.F32_RGBA=q(W.F32,G.RGBA,K.None)]=`F32_RGBA`,e[e.U8_R=q(W.U8,G.R,K.None)]=`U8_R`,e[e.U8_R_NORM=q(W.U8,G.R,K.Normalized)]=`U8_R_NORM`,e[e.U8_RG=q(W.U8,G.RG,K.None)]=`U8_RG`,e[e.U8_RG_NORM=q(W.U8,G.RG,K.Normalized)]=`U8_RG_NORM`,e[e.U8_RGB=q(W.U8,G.RGB,K.None)]=`U8_RGB`,e[e.U8_RGB_NORM=q(W.U8,G.RGB,K.Normalized)]=`U8_RGB_NORM`,e[e.U8_RGB_SRGB=q(W.U8,G.RGB,K.sRGB|K.Normalized)]=`U8_RGB_SRGB`,e[e.U8_RGBA=q(W.U8,G.RGBA,K.None)]=`U8_RGBA`,e[e.U8_RGBA_NORM=q(W.U8,G.RGBA,K.Normalized)]=`U8_RGBA_NORM`,e[e.U8_RGBA_SRGB=q(W.U8,G.RGBA,K.sRGB|K.Normalized)]=`U8_RGBA_SRGB`,e[e.U16_R=q(W.U16,G.R,K.None)]=`U16_R`,e[e.U16_R_NORM=q(W.U16,G.R,K.Normalized)]=`U16_R_NORM`,e[e.U16_RG_NORM=q(W.U16,G.RG,K.Normalized)]=`U16_RG_NORM`,e[e.U16_RGBA_NORM=q(W.U16,G.RGBA,K.Normalized)]=`U16_RGBA_NORM`,e[e.U16_RGBA=q(W.U16,G.RGBA,K.None)]=`U16_RGBA`,e[e.U16_RGB=q(W.U16,G.RGB,K.None)]=`U16_RGB`,e[e.U16_RG=q(W.U16,G.RG,K.None)]=`U16_RG`,e[e.U32_R=q(W.U32,G.R,K.None)]=`U32_R`,e[e.U32_RG=q(W.U32,G.RG,K.None)]=`U32_RG`,e[e.U32_RGB=q(W.U32,G.RGB,K.None)]=`U32_RGB`,e[e.U32_RGBA=q(W.U32,G.RGBA,K.None)]=`U32_RGBA`,e[e.S8_R=q(W.S8,G.R,K.None)]=`S8_R`,e[e.S8_R_NORM=q(W.S8,G.R,K.Normalized)]=`S8_R_NORM`,e[e.S8_RG_NORM=q(W.S8,G.RG,K.Normalized)]=`S8_RG_NORM`,e[e.S8_RGB_NORM=q(W.S8,G.RGB,K.Normalized)]=`S8_RGB_NORM`,e[e.S8_RGBA_NORM=q(W.S8,G.RGBA,K.Normalized)]=`S8_RGBA_NORM`,e[e.S16_R=q(W.S16,G.R,K.None)]=`S16_R`,e[e.S16_RG=q(W.S16,G.RG,K.None)]=`S16_RG`,e[e.S16_RG_NORM=q(W.S16,G.RG,K.Normalized)]=`S16_RG_NORM`,e[e.S16_RGB_NORM=q(W.S16,G.RGB,K.Normalized)]=`S16_RGB_NORM`,e[e.S16_RGBA=q(W.S16,G.RGBA,K.None)]=`S16_RGBA`,e[e.S16_RGBA_NORM=q(W.S16,G.RGBA,K.Normalized)]=`S16_RGBA_NORM`,e[e.S32_R=q(W.S32,G.R,K.None)]=`S32_R`,e[e.S32_RG=q(W.S32,G.RG,K.None)]=`S32_RG`,e[e.S32_RGB=q(W.S32,G.RGB,K.None)]=`S32_RGB`,e[e.S32_RGBA=q(W.S32,G.RGBA,K.None)]=`S32_RGBA`,e[e.U16_RGBA_5551=q(W.U16_PACKED_5551,G.RGBA,K.Normalized)]=`U16_RGBA_5551`,e[e.U16_RGB_565=q(W.U16_PACKED_565,G.RGB,K.Normalized)]=`U16_RGB_565`,e[e.BC1=q(W.BC1,G.RGBA,K.Normalized)]=`BC1`,e[e.BC1_SRGB=q(W.BC1,G.RGBA,K.Normalized|K.sRGB)]=`BC1_SRGB`,e[e.BC2=q(W.BC2,G.RGBA,K.Normalized)]=`BC2`,e[e.BC2_SRGB=q(W.BC2,G.RGBA,K.Normalized|K.sRGB)]=`BC2_SRGB`,e[e.BC3=q(W.BC3,G.RGBA,K.Normalized)]=`BC3`,e[e.BC3_SRGB=q(W.BC3,G.RGBA,K.Normalized|K.sRGB)]=`BC3_SRGB`,e[e.BC4_UNORM=q(W.BC4_UNORM,G.R,K.Normalized)]=`BC4_UNORM`,e[e.BC4_SNORM=q(W.BC4_SNORM,G.R,K.Normalized)]=`BC4_SNORM`,e[e.BC5_UNORM=q(W.BC5_UNORM,G.RG,K.Normalized)]=`BC5_UNORM`,e[e.BC5_SNORM=q(W.BC5_SNORM,G.RG,K.Normalized)]=`BC5_SNORM`,e[e.D24=q(W.D24,G.R,K.Depth)]=`D24`,e[e.D24_S8=q(W.D24S8,G.RG,K.Depth|K.Stencil)]=`D24_S8`,e[e.D32F=q(W.D32F,G.R,K.Depth)]=`D32F`,e[e.D32F_S8=q(W.D32FS8,G.RG,K.Depth|K.Stencil)]=`D32F_S8`,e[e.U8_RGB_RT=q(W.U8,G.RGB,K.RenderTarget|K.Normalized)]=`U8_RGB_RT`,e[e.U8_RGBA_RT=q(W.U8,G.RGBA,K.RenderTarget|K.Normalized)]=`U8_RGBA_RT`,e[e.U8_RGBA_RT_SRGB=q(W.U8,G.RGBA,K.RenderTarget|K.Normalized|K.sRGB)]=`U8_RGBA_RT_SRGB`})(J||={});function ar(e){return e>>>8&255}function or(e){return e>>>16&255}function sr(e){return e&255}function cr(e){switch(e){case W.F32:case W.U32:case W.S32:return 4;case W.U16:case W.S16:case W.F16:return 2;case W.U8:case W.S8:return 1;default:throw Error(`whoops`)}}function lr(e){return cr(or(e))}function ur(e){return cr(or(e))*ir(ar(e))}function dr(e){var t=sr(e);if(t&K.Depth)return er.Depth;if(t&K.Normalized)return er.Float;var n=or(e);if(n===W.F16||n===W.F32)return er.Float;if(n===W.U8||n===W.U16||n===W.U32)return er.Uint;if(n===W.S8||n===W.S16||n===W.S32)return er.Sint;throw Error(`whoops`)}function Y(e,t){if(t===void 0&&(t=``),!e)throw Error(`Assert fail: ${t}`)}function fr(e){if(e!=null)return e;throw Error(`Missing object`)}function pr(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}function mr(e,t){e.r=t.r,e.g=t.g,e.b=t.b,e.a=t.a}function hr(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}function gr(e,t,n,r){return r===void 0&&(r=1),{r:e,g:t,b:n,a:r}}var _r=gr(0,0,0,0);gr(0,0,0,1);var vr=gr(1,1,1,0),yr=gr(1,1,1,1);function br(e){return!(!e||e&e-1)}function xr(e,t){return e??t}function Sr(e){return e===void 0?null:e}function Cr(e,t,n){e.length=t,e.fill(n)}function wr(e,t){var n=t-1;return e+n&~n}function Tr(e,t){return((e+t-1)/t|0)*t}function Er(e,t,n){for(var r=0,i=e.length;r<i;){var a=r+(i-r>>>1);n(t,e[a])<0?i=a:r=a+1}return r}function Dr(e,t,n){var r=Er(e,t,n);e.splice(r,0,t)}function Or(e,t,n){return n?e|=t:e&=~t,e}function kr(e,t){for(var n=Array(e),r=0;r<e;r++)n[r]=t();return n}function Ar(e,t){return t===void 0&&(t=1),e.split(`
`).map(function(e,n){return`${jr(``+(t+n),4,` `)}  ${e}`}).join(`
`)}function jr(e,t,n){for(n===void 0&&(n=`0`);e.length<t;)e=`${n}${e}`;return e}function Mr(e,t){e.blendDstFactor=t.blendDstFactor,e.blendSrcFactor=t.blendSrcFactor,e.blendMode=t.blendMode}function Nr(e,t){return e===void 0&&(e={}),e.compare=t.compare,e.depthFailOp=t.depthFailOp,e.passOp=t.passOp,e.failOp=t.failOp,e.mask=t.mask,e}function Pr(e,t){return e===void 0&&(e={rgbBlendState:{},alphaBlendState:{},channelWriteMask:0}),Mr(e.rgbBlendState,t.rgbBlendState),Mr(e.alphaBlendState,t.alphaBlendState),e.channelWriteMask=t.channelWriteMask,e}function Fr(e,t){e.length!==t.length&&(e.length=t.length);for(var n=0;n<t.length;n++)e[n]=Pr(e[n],t[n])}function Ir(e,t){t.attachmentsState!==void 0&&Fr(e.attachmentsState,t.attachmentsState),e.blendConstant&&t.blendConstant&&mr(e.blendConstant,t.blendConstant),e.depthCompare=xr(t.depthCompare,e.depthCompare),e.depthWrite=xr(t.depthWrite,e.depthWrite),e.stencilWrite=xr(t.stencilWrite,e.stencilWrite),e.stencilFront&&t.stencilFront&&Nr(e.stencilFront,t.stencilFront),e.stencilBack&&t.stencilBack&&Nr(e.stencilBack,t.stencilBack),e.cullMode=xr(t.cullMode,e.cullMode),e.frontFace=xr(t.frontFace,e.frontFace),e.polygonOffset=xr(t.polygonOffset,e.polygonOffset),e.polygonOffsetFactor=xr(t.polygonOffsetFactor,e.polygonOffsetFactor),e.polygonOffsetUnits=xr(t.polygonOffsetUnits,e.polygonOffsetUnits)}function Lr(e){var t=Object.assign({},e);return t.attachmentsState=[],Fr(t.attachmentsState,e.attachmentsState),t.blendConstant=t.blendConstant&&hr(t.blendConstant),t.stencilFront=Nr(void 0,e.stencilFront),t.stencilBack=Nr(void 0,e.stencilBack),t}function Rr(e,t){t.channelWriteMask!==void 0&&(e.channelWriteMask=t.channelWriteMask),t.rgbBlendMode!==void 0&&(e.rgbBlendState.blendMode=t.rgbBlendMode),t.alphaBlendMode!==void 0&&(e.alphaBlendState.blendMode=t.alphaBlendMode),t.rgbBlendSrcFactor!==void 0&&(e.rgbBlendState.blendSrcFactor=t.rgbBlendSrcFactor),t.alphaBlendSrcFactor!==void 0&&(e.alphaBlendState.blendSrcFactor=t.alphaBlendSrcFactor),t.rgbBlendDstFactor!==void 0&&(e.rgbBlendState.blendDstFactor=t.rgbBlendDstFactor),t.alphaBlendDstFactor!==void 0&&(e.alphaBlendState.blendDstFactor=t.alphaBlendDstFactor)}var zr={blendMode:Un.ADD,blendSrcFactor:Hn.ONE,blendDstFactor:Hn.ZERO},Br={attachmentsState:[{channelWriteMask:Zn.ALL,rgbBlendState:zr,alphaBlendState:zr}],blendConstant:hr(_r),depthWrite:!0,depthCompare:zn.LEQUAL,stencilWrite:!1,stencilFront:{compare:zn.ALWAYS,passOp:Qn.KEEP,depthFailOp:Qn.KEEP,failOp:Qn.KEEP},stencilBack:{compare:zn.ALWAYS,passOp:Qn.KEEP,depthFailOp:Qn.KEEP,failOp:Qn.KEEP},cullMode:Vn.NONE,frontFace:Bn.CCW,polygonOffset:!1,polygonOffsetFactor:0,polygonOffsetUnits:0};function Vr(e,t){e===void 0&&(e=null),t===void 0&&(t=Br);var n=Lr(t);return e!==null&&Ir(n,e),n}var Hr=Vr({depthCompare:zn.ALWAYS,depthWrite:!1},Br);function Ur(e,t){return e.attachmentsState===void 0&&(e.attachmentsState=[],Fr(e.attachmentsState,Br.attachmentsState)),Rr(e.attachmentsState[0],t),e}var Wr={texture:null,sampler:null,formatKind:er.Float,dimension:U.TEXTURE_2D};function Gr(e,t,n){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!n(e[r],t[r]))return!1;return!0}function Kr(e,t){for(var n=Array(e.length),r=0;r<e.length;r++)n[r]=t(e[r]);return n}function qr(e,t){return e.texture===t.texture&&e.binding===t.binding}function Jr(e,t){return e.buffer===t.buffer&&e.size===t.size&&e.binding===t.binding&&e.offset===t.offset}function Yr(e,t){return e===null?t===null:t!==null&&e.sampler===t.sampler&&e.texture===t.texture&&e.dimension===t.dimension&&e.formatKind===t.formatKind&&e.comparison===t.comparison}function Xr(e,t){return e.samplerBindings=e.samplerBindings||[],e.uniformBufferBindings=e.uniformBufferBindings||[],e.storageBufferBindings=e.storageBufferBindings||[],e.storageTextureBindings=e.storageTextureBindings||[],t.samplerBindings=t.samplerBindings||[],t.uniformBufferBindings=t.uniformBufferBindings||[],t.storageBufferBindings=t.storageBufferBindings||[],t.storageTextureBindings=t.storageTextureBindings||[],!(e.samplerBindings.length!==t.samplerBindings.length||!Gr(e.samplerBindings,t.samplerBindings,Yr)||!Gr(e.uniformBufferBindings,t.uniformBufferBindings,Jr)||!Gr(e.storageBufferBindings,t.storageBufferBindings,Jr)||!Gr(e.storageTextureBindings,t.storageTextureBindings,qr))}function Zr(e,t){return e.blendMode==t.blendMode&&e.blendSrcFactor===t.blendSrcFactor&&e.blendDstFactor===t.blendDstFactor}function Qr(e,t){return!(!Zr(e.rgbBlendState,t.rgbBlendState)||!Zr(e.alphaBlendState,t.alphaBlendState)||e.channelWriteMask!==t.channelWriteMask)}function $r(e,t){return e.compare==t.compare&&e.depthFailOp===t.depthFailOp&&e.failOp===t.failOp&&e.passOp===t.passOp&&e.mask===t.mask}function ei(e,t){return!Gr(e.attachmentsState,t.attachmentsState,Qr)||e.blendConstant&&t.blendConstant&&!pr(e.blendConstant,t.blendConstant)||e.stencilFront&&t.stencilFront&&!$r(e.stencilFront,t.stencilFront)||e.stencilBack&&t.stencilBack&&!$r(e.stencilBack,t.stencilBack)?!1:e.depthCompare===t.depthCompare&&e.depthWrite===t.depthWrite&&e.stencilWrite===t.stencilWrite&&e.cullMode===t.cullMode&&e.frontFace===t.frontFace&&e.polygonOffset===t.polygonOffset&&e.polygonOffsetFactor===t.polygonOffsetFactor&&e.polygonOffsetUnits===t.polygonOffsetUnits}function ti(e,t){return e.id===t.id}function ni(e,t){return e===t}function ri(e,t){return!(e.topology!==t.topology||e.inputLayout!==t.inputLayout||e.sampleCount!==t.sampleCount||e.megaStateDescriptor&&t.megaStateDescriptor&&!ei(e.megaStateDescriptor,t.megaStateDescriptor)||!ti(e.program,t.program)||!Gr(e.colorAttachmentFormats,t.colorAttachmentFormats,ni)||e.depthStencilAttachmentFormat!==t.depthStencilAttachmentFormat)}function ii(e,t){return e.offset===t.offset&&e.shaderLocation===t.shaderLocation&&e.format===t.format&&e.divisor===t.divisor}function ai(e,t){return Ae(e)?Ae(t):!Ae(t)&&e.arrayStride===t.arrayStride&&e.stepMode===t.stepMode&&Gr(e.attributes,t.attributes,ii)}function oi(e,t){return!(e.indexBufferFormat!==t.indexBufferFormat||!Gr(e.vertexBufferDescriptors,t.vertexBufferDescriptors,ai)||!ti(e.program,t.program))}function si(e,t){return e.addressModeU===t.addressModeU&&e.addressModeV===t.addressModeV&&e.minFilter===t.minFilter&&e.magFilter===t.magFilter&&e.mipmapFilter===t.mipmapFilter&&e.lodMinClamp===t.lodMinClamp&&e.lodMaxClamp===t.lodMaxClamp&&e.maxAnisotropy===t.maxAnisotropy&&e.compareFunction===t.compareFunction}function ci(e){return{sampler:e.sampler,texture:e.texture,dimension:e.dimension,formatKind:e.formatKind,comparison:e.comparison}}function li(e){var t=e.buffer,n=e.size;return{binding:e.binding,buffer:t,offset:e.offset,size:n}}function ui(e){return{binding:e.binding,texture:e.texture}}function di(e){return{samplerBindings:e.samplerBindings&&Kr(e.samplerBindings,ci),uniformBufferBindings:e.uniformBufferBindings&&Kr(e.uniformBufferBindings,li),storageBufferBindings:e.storageBufferBindings&&Kr(e.storageBufferBindings,li),storageTextureBindings:e.storageTextureBindings&&Kr(e.storageTextureBindings,ui),pipeline:e.pipeline}}function fi(e){var t=e.inputLayout,n=e.program,r=e.topology;return{inputLayout:t,megaStateDescriptor:e.megaStateDescriptor&&Lr(e.megaStateDescriptor),program:n,topology:r,colorAttachmentFormats:e.colorAttachmentFormats.slice(),depthStencilAttachmentFormat:e.depthStencilAttachmentFormat,sampleCount:e.sampleCount}}function pi(e){return{shaderLocation:e.shaderLocation,format:e.format,offset:e.offset,divisor:e.divisor}}function mi(e){return Ae(e)?e:{arrayStride:e.arrayStride,stepMode:e.stepMode,attributes:Kr(e.attributes,pi)}}function hi(e){return{vertexBufferDescriptors:Kr(e.vertexBufferDescriptors,mi),indexBufferFormat:e.indexBufferFormat,program:e.program}}var X,gi=/([^[]*)(\[[0-9]+\])?/;function _i(e){if(e[e.length-1]!==`]`)return{name:e,length:1,isArray:!1};var t=e.match(gi);if(!t||t.length<2)throw Error(`Failed to parse GLSL uniform name ${e}`);return{name:t[1],length:Number(t[2])||1,isArray:!!t[2]}}function vi(){var e=null;return function(t,n,r){var i=e!==r;return i&&(t.uniform1i(n,r),e=r),i}}function yi(e,t,n,r){var i=null,a=null;return function(o,s,c){var l=t(c,n),u=l.length,d=!1;if(i===null)i=new Float32Array(u),a=u,d=!0;else{Y(a===u,`Uniform length cannot change.`);for(var f=0;f<u;++f)if(l[f]!==i[f]){d=!0;break}}return d&&(r(o,e,s,l),i.set(l)),d}}function bi(e,t,n,r){e[t](n,r)}function xi(e,t,n,r){e[t](n,!1,r)}var Si={},Ci={},wi={},Ti=[0];function Ei(e,t,n,r){t===1&&typeof e==`boolean`&&(e=+!!e),Number.isFinite(e)&&(Ti[0]=e,e=Ti);var i=e.length;if(e instanceof n)return e;var a=r[i];a||(a=new n(i),r[i]=a);for(var o=0;o<i;o++)a[o]=e[o];return a}function Di(e,t){return Ei(e,t,Float32Array,Si)}function Oi(e,t){return Ei(e,t,Int32Array,Ci)}function ki(e,t){return Ei(e,t,Uint32Array,wi)}var Ai=(X={},X[z.FLOAT]=yi.bind(null,`uniform1fv`,Di,1,bi),X[z.FLOAT_VEC2]=yi.bind(null,`uniform2fv`,Di,2,bi),X[z.FLOAT_VEC3]=yi.bind(null,`uniform3fv`,Di,3,bi),X[z.FLOAT_VEC4]=yi.bind(null,`uniform4fv`,Di,4,bi),X[z.INT]=yi.bind(null,`uniform1iv`,Oi,1,bi),X[z.INT_VEC2]=yi.bind(null,`uniform2iv`,Oi,2,bi),X[z.INT_VEC3]=yi.bind(null,`uniform3iv`,Oi,3,bi),X[z.INT_VEC4]=yi.bind(null,`uniform4iv`,Oi,4,bi),X[z.BOOL]=yi.bind(null,`uniform1iv`,Oi,1,bi),X[z.BOOL_VEC2]=yi.bind(null,`uniform2iv`,Oi,2,bi),X[z.BOOL_VEC3]=yi.bind(null,`uniform3iv`,Oi,3,bi),X[z.BOOL_VEC4]=yi.bind(null,`uniform4iv`,Oi,4,bi),X[z.FLOAT_MAT2]=yi.bind(null,`uniformMatrix2fv`,Di,4,xi),X[z.FLOAT_MAT3]=yi.bind(null,`uniformMatrix3fv`,Di,9,xi),X[z.FLOAT_MAT4]=yi.bind(null,`uniformMatrix4fv`,Di,16,xi),X[z.UNSIGNED_INT]=yi.bind(null,`uniform1uiv`,ki,1,bi),X[z.UNSIGNED_INT_VEC2]=yi.bind(null,`uniform2uiv`,ki,2,bi),X[z.UNSIGNED_INT_VEC3]=yi.bind(null,`uniform3uiv`,ki,3,bi),X[z.UNSIGNED_INT_VEC4]=yi.bind(null,`uniform4uiv`,ki,4,bi),X[z.FLOAT_MAT2x3]=yi.bind(null,`uniformMatrix2x3fv`,Di,6,xi),X[z.FLOAT_MAT2x4]=yi.bind(null,`uniformMatrix2x4fv`,Di,8,xi),X[z.FLOAT_MAT3x2]=yi.bind(null,`uniformMatrix3x2fv`,Di,6,xi),X[z.FLOAT_MAT3x4]=yi.bind(null,`uniformMatrix3x4fv`,Di,12,xi),X[z.FLOAT_MAT4x2]=yi.bind(null,`uniformMatrix4x2fv`,Di,8,xi),X[z.FLOAT_MAT4x3]=yi.bind(null,`uniformMatrix4x3fv`,Di,12,xi),X[z.SAMPLER_2D]=vi,X[z.SAMPLER_CUBE]=vi,X[z.SAMPLER_3D]=vi,X[z.SAMPLER_2D_SHADOW]=vi,X[z.SAMPLER_2D_ARRAY]=vi,X[z.SAMPLER_2D_ARRAY_SHADOW]=vi,X[z.SAMPLER_CUBE_SHADOW]=vi,X[z.INT_SAMPLER_2D]=vi,X[z.INT_SAMPLER_3D]=vi,X[z.INT_SAMPLER_CUBE]=vi,X[z.INT_SAMPLER_2D_ARRAY]=vi,X[z.UNSIGNED_INT_SAMPLER_2D]=vi,X[z.UNSIGNED_INT_SAMPLER_3D]=vi,X[z.UNSIGNED_INT_SAMPLER_CUBE]=vi,X[z.UNSIGNED_INT_SAMPLER_2D_ARRAY]=vi,X);function ji(e,t,n){var r=Ai[n.type];if(!r)throw Error(`Unknown GLSL uniform type ${n.type}`);return r().bind(null,e,t)}var Mi={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121};function Ni(e){return Object.prototype.toString.call(e)in Mi}function Pi(e,t){return`#define ${e} ${t}`}function Fi(e){var t={};return e.replace(/^\s*#define\s*(\S*)\s*(\S*)\s*$/gm,function(e,n,r){var i=Number(r);return t[n]=isNaN(i)?r:i,``}),t}function Ii(e,t){var n=[];return e.replace(/^\s*layout\(location\s*=\s*(\S*)\)\s*in\s+\S+\s*(.*);$/gm,function(e,r,i){var a=Number(r);return n.push({location:isNaN(a)?t[r]:a,name:i}),``}),n}function Li(e){var t=[],n=[];return e.replace(/\s*struct\s*(.*)\s*{((?:\s*.*\s*)*?)};/g,function(e,t,r){var i=[];return r.trim().replace(`\r
`,`
`).split(`
`).forEach(function(e){var t=Re(e.trim().split(/\s+/),2),n=t[0],r=t[1];i.push({type:n.trim(),name:r.replace(`;`,``).trim()})}),n.push({type:t.trim(),uniforms:i}),``}),e.replace(/\s*uniform(?:\s+)(?:\w+)(?:\s?){([^]*?)};?/g,function(e,r){return r.trim().replace(`\r
`,`
`).split(`
`).forEach(function(e){var r=e.trim().split(` `),i=r[0]||``,a=r[1]||``,o=a.indexOf(`[`)>-1;if(a=a.replace(`;`,``).replace(`[`,``).trim(),!i.startsWith(`#`)){if(i){var s=n.find(function(e){return i===e.type});if(s){if(o)for(var c=function(e){s.uniforms.forEach(function(n){t.push(`${a}[${e}].${n.name}`)})},l=0;l<5;l++)c(l);else s.uniforms.forEach(function(e){t.push(`${a}.${e.name}`)})}}a&&t.push(a)}}),``}),t}function Ri(e){if(e===void 0)return null;var t=/binding\s*=\s*(\d+)/.exec(e);if(t!==null){var n=parseInt(t[1],10);if(!Number.isNaN(n))return n}return null}function zi(e){return[e,``]}function Bi(e,t,n,r,i){r===void 0&&(r=null),i===void 0&&(i=!0);var a=e.glslVersion===`#version 100`,o=t===`frag`&&n.match(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm)?.length>1,s=n.replace(`\r
`,`
`).split(`
`).map(function(e){return e.replace(/[/][/].*$/,``)}).filter(function(e){return!(!e||/^\s+$/.test(e))}),c=``;r!==null&&(c=Object.keys(r).map(function(e){return Pi(e,r[e])}).join(`
`));var l=s.find(function(e){return e.startsWith(`precision`)})||`precision mediump float;`,u=i?s.filter(function(e){return!e.startsWith(`precision`)}).join(`
`):s.join(`
`),d=``;if(e.viewportOrigin===tr.UPPER_LEFT&&(d+=`${Pi(`VIEWPORT_ORIGIN_TL`,`1`)}
`),e.clipSpaceNearZ===nr.ZERO&&(d+=`${Pi(`CLIPSPACE_NEAR_ZERO`,`1`)}
`),e.explicitBindingLocations){var f=0,p=0,m=0;u=u.replace(/^\s*(layout\((.*)\))?\s*uniform(.+{)$/gm,function(e,t,n,r){return`layout(${n?`${n}, `:``}set = ${f}, binding = ${p++}) uniform ${r}`}),f++,p=0,Y(e.separateSamplerTextures),u=u.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(e,n,r,i,a){var o=Ri(r);o===null&&(o=p++);var s=Re(zi(i),2),c=s[0],l=s[1];return t===`frag`?`
layout(set = ${f}, binding = ${o*2+0}) uniform texture${c} T_${a};
layout(set = ${f}, binding = ${o*2+1}) uniform sampler${l} S_${a};`.trim():``}),u=u.replace(t===`frag`?/^\s*\b(varying|in)\b/gm:/^\s*\b(varying|out)\b/gm,function(e,t){return`layout(location = ${m++}) ${t}`}),d+=`${Pi(`gl_VertexID`,`gl_VertexIndex`)}
`,d+=`${Pi(`gl_InstanceID`,`gl_InstanceIndex`)}
`,l=l.replace(/^precision (.*) sampler(.*);$/gm,``)}else{var h=0;u=u.replace(/^\s*(layout\((.*)\))?\s*uniform sampler(\w+) (.*);/gm,function(e,t,n,r,i){var a=Ri(n);return a===null&&(a=h++),`uniform sampler${r} ${i}; // BINDING=${a}`})}if(u=u.replace(/\bPU_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return`SAMPLER_${t}(P_${n})`}),u=u.replace(/\bPF_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return`PP_SAMPLER_${t}(P_${n})`}),u=u.replace(/\bPU_TEXTURE\((.*?)\)/g,function(e,t){return`TEXTURE(P_${t})`}),e.separateSamplerTextures)u=u.replace(/\bPD_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){var r=Re(zi(t),2);return`texture${r[0]} T_P_${n}, sampler${r[1]} S_P_${n}`}),u=u.replace(/\bPP_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return`T_${n}, S_${n}`}),u=u.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return`sampler${t}(T_${n}, S_${n})`}),u=u.replace(/\bTEXTURE\((.*?)\)/g,function(e,t){return`T_${t}`});else{var g=[];u=u.replace(/\bPD_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return`sampler${t} P_${n}`}),u=u.replace(/\bPP_SAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return n}),u=u.replace(/\bSAMPLER_(\w+)\((.*?)\)/g,function(e,t,n){return g.push([n,t]),n}),a&&g.forEach(function(e){var t=Re(e,2),n=t[0],r=t[1];u=u.replace(RegExp(`texture\\(${n}`,`g`),function(){return`texture${r}(${n}`})}),u=u.replace(/\bTEXTURE\((.*?)\)/g,function(e,t){return t})}var _=`${a?``:e.glslVersion}
${a&&o?`#extension GL_EXT_draw_buffers : require
`:``}
${a&&t===`frag`?`#extension GL_OES_standard_derivatives : enable
`:``}${i?l:``}
${d||``}${c?c+`
`:``}
${u}
`.trim();if(e.explicitBindingLocations&&t===`frag`&&(_=_.replace(/^\b(out)\b/g,function(e,t){return`layout(location = 0) ${t}`})),a){if(t===`frag`&&(_=_.replace(/^\s*in\s+(\S+)\s*(.*);$/gm,function(e,t,n){return`varying ${t} ${n};
`})),t===`vert`&&(_=_.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(e,t,n){return`varying ${t} ${n};
`}),_=_.replace(/^\s*layout\(location\s*=\s*\S*\)\s*in\s+(\S+)\s*(.*);$/gm,function(e,t,n){return`attribute ${t} ${n};
`})),_=_.replace(/\s*uniform\s*.*\s*{((?:\s*.*\s*)*?)};/g,function(e,t){return t.trim().replace(/^.*$/gm,function(e){var t=e.trim();return t.startsWith(`#`)?t:e?`uniform ${t}`:``})}),t===`frag`){if(o){var v=[];_=_.replace(/^\s*layout\(location\s*=\s*\d*\)\s*out\s+vec4\s*(.*);$/gm,function(e,t){return v.push(t),`vec4 ${t};
`});var y=_.lastIndexOf(`}`);_=_.substring(0,y)+`
    ${v.map(function(e,t){return`gl_FragData[${t}] = ${e};
    `}).join(`
`)}`+_.substring(y)}else{var b;if(_=_.replace(/^\s*out\s+(\S+)\s*(.*);$/gm,function(e,t,n){return b=n,`${t} ${n};
`}),b){var y=_.lastIndexOf(`}`);_=_.substring(0,y)+`
  gl_FragColor = vec4(${b});
`+_.substring(y)}}}_=_.replace(/^\s*layout\((.*)\)/gm,``)}return _}function Vi(e,t,n,r){return r===void 0&&(r=null),{vert:t,frag:n,preprocessedVert:Bi(e,`vert`,t,r),preprocessedFrag:Bi(e,`frag`,n,r)}}var Hi=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=e.call(this)||this;return i.id=n,i.device=r,i.device.resourceCreationTracker!==null&&i.device.resourceCreationTracker.trackResourceCreated(i),i}return t.prototype.destroy=function(){this.device.resourceCreationTracker!==null&&this.device.resourceCreationTracker.trackResourceDestroyed(this)},t}(we),Ui=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Bindings;var o=i.uniformBufferBindings,s=i.samplerBindings;return a.uniformBufferBindings=o||[],a.samplerBindings=s||[],a.bindingLayouts=a.createBindingLayouts(),a}return t.prototype.createBindingLayouts=function(){var e=0,t=0,n=[],r=this.uniformBufferBindings.length,i=this.samplerBindings.length;return n.push({firstUniformBuffer:e,numUniformBuffers:r,firstSampler:t,numSamplers:i}),e+=r,t+=i,{numUniformBuffers:e,numSamplers:t,bindingLayoutTables:n}},t}(Hi),Wi;function Z(e){return Wi===void 0?typeof WebGL2RenderingContext<`u`&&e instanceof WebGL2RenderingContext?(Wi=!0,!0):(Wi=!!(e&&e._version===2),Wi):Wi}function Gi(e){switch(or(e)){case W.BC1:case W.BC2:case W.BC3:case W.BC4_UNORM:case W.BC4_SNORM:case W.BC5_UNORM:case W.BC5_SNORM:return!0;default:return!1}}function Ki(e){if(sr(e)&K.Normalized)return!1;var t=or(e);return t===W.S8||t===W.S16||t===W.S32||t===W.U8||t===W.U16||t===W.U32}function qi(e){switch(e){case Jn.STATIC:return z.STATIC_DRAW;case Jn.DYNAMIC:return z.DYNAMIC_DRAW}}function Ji(e){if(e&V.INDEX)return z.ELEMENT_ARRAY_BUFFER;if(e&V.VERTEX)return z.ARRAY_BUFFER;if(e&V.UNIFORM)return z.UNIFORM_BUFFER}function Yi(e){switch(e){case qn.TRIANGLES:return z.TRIANGLES;case qn.POINTS:return z.POINTS;case qn.TRIANGLE_STRIP:return z.TRIANGLE_STRIP;case qn.LINES:return z.LINES;case qn.LINE_STRIP:return z.LINE_STRIP;default:throw Error(`Unknown primitive topology mode`)}}function Xi(e){switch(e){case W.U8:return z.UNSIGNED_BYTE;case W.U16:return z.UNSIGNED_SHORT;case W.U32:return z.UNSIGNED_INT;case W.S8:return z.BYTE;case W.S16:return z.SHORT;case W.S32:return z.INT;case W.F16:return z.HALF_FLOAT;case W.F32:return z.FLOAT;default:throw Error(`whoops`)}}function Zi(e){switch(e){case G.R:return 1;case G.RG:return 2;case G.RGB:return 3;case G.RGBA:return 4;default:return 1}}function Qi(e){var t=or(e),n=ar(e),r=sr(e),i=Xi(t);return{size:Zi(n),type:i,normalized:!!(r&K.Normalized)}}function $i(e){switch(e){case J.U8_R:return z.UNSIGNED_BYTE;case J.U16_R:return z.UNSIGNED_SHORT;case J.U32_R:return z.UNSIGNED_INT;default:throw Error(`whoops`)}}function ea(e){switch(e){case Wn.CLAMP_TO_EDGE:return z.CLAMP_TO_EDGE;case Wn.REPEAT:return z.REPEAT;case Wn.MIRRORED_REPEAT:return z.MIRRORED_REPEAT;default:throw Error(`whoops`)}}function ta(e,t){if(t===Kn.LINEAR&&e===Gn.BILINEAR)return z.LINEAR_MIPMAP_LINEAR;if(t===Kn.LINEAR&&e===Gn.POINT)return z.NEAREST_MIPMAP_LINEAR;if(t===Kn.NEAREST&&e===Gn.BILINEAR)return z.LINEAR_MIPMAP_NEAREST;if(t===Kn.NEAREST&&e===Gn.POINT)return z.NEAREST_MIPMAP_NEAREST;if(t===Kn.NO_MIP&&e===Gn.BILINEAR)return z.LINEAR;if(t===Kn.NO_MIP&&e===Gn.POINT)return z.NEAREST;throw Error(`Unknown texture filter mode`)}function na(e,t){t===void 0&&(t=0);var n=e;return n.gl_buffer_pages[t/n.pageByteSize|0]}function ra(e){return e.gl_texture}function ia(e){return e.gl_sampler}function aa(e,t){e.name=t,e.__SPECTOR_Metadata={name:t}}function oa(e,t){for(var n=[];;){var r=t.exec(e);if(!r)break;n.push(r)}return n}function sa(e){return e.blendMode==Un.ADD&&e.blendSrcFactor==Hn.ONE&&e.blendDstFactor===Hn.ZERO}function ca(e){switch(e){case rr.OcclusionConservative:return z.ANY_SAMPLES_PASSED_CONSERVATIVE;default:throw Error(`whoops`)}}function la(e){if(e===U.TEXTURE_2D)return z.TEXTURE_2D;if(e===U.TEXTURE_2D_ARRAY)return z.TEXTURE_2D_ARRAY;if(e===U.TEXTURE_CUBE_MAP)return z.TEXTURE_CUBE_MAP;if(e===U.TEXTURE_3D)return z.TEXTURE_3D;throw Error(`whoops`)}function ua(e,t,n,r){return e%n===0&&t%r===0}var da=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Buffer;var o=i.viewOrSize,s=i.usage,c=i.hint,l=c===void 0?Jn.STATIC:c,u=r.uniformBufferMaxPageByteSize,d=r.gl,f=s&V.UNIFORM;f||(Z(d)?d.bindVertexArray(null):r.OES_vertex_array_object.bindVertexArrayOES(null));var p=De(o)?wr(o,4):wr(o.byteLength,4);a.gl_buffer_pages=[];var m;if(f){for(var h=p;h>0;)a.gl_buffer_pages.push(a.createBufferPage(Math.min(h,u),s,l)),h-=u;m=u}else a.gl_buffer_pages.push(a.createBufferPage(p,s,l)),m=p;return a.pageByteSize=m,a.byteSize=p,a.usage=s,a.gl_target=Ji(s),De(o)||a.setSubData(0,new Uint8Array(o.buffer)),f||(Z(d)?d.bindVertexArray(a.device.currentBoundVAO):r.OES_vertex_array_object.bindVertexArrayOES(a.device.currentBoundVAO)),a}return t.prototype.setSubData=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=t.byteLength-n);for(var i=this.device.gl,a=this.pageByteSize,o=e+r,s=e,c=e%a;s<o;){var l=Z(i)?i.COPY_WRITE_BUFFER:this.gl_target,u=na(this,s);if(u.ubo)return;i.bindBuffer(l,u),Z(i)?i.bufferSubData(l,c,t,n,Math.min(o-s,a)):i.bufferSubData(l,c,t),s+=a,c=0,n+=a,this.device.debugGroupStatisticsBufferUpload()}},t.prototype.destroy=function(){e.prototype.destroy.call(this);for(var t=0;t<this.gl_buffer_pages.length;t++)this.gl_buffer_pages[t].ubo||this.device.gl.deleteBuffer(this.gl_buffer_pages[t]);this.gl_buffer_pages=[]},t.prototype.createBufferPage=function(e,t,n){var r=this.device.gl,i=t&V.UNIFORM;if(!Z(r)&&i)return{ubo:!0};var a=this.device.ensureResourceExists(r.createBuffer()),o=Ji(t),s=qi(n);return r.bindBuffer(o,a),r.bufferData(o,e,s),a},t}(Hi),fa=function(e){Ie(t,e);function t(t){var n,r,i,a,o=t.id,s=t.device,c=t.descriptor,l=e.call(this,{id:o,device:s})||this;l.type=B.InputLayout;var u=c.vertexBufferDescriptors,d=c.indexBufferFormat,f=c.program;Y(d===J.U16_R||d===J.U32_R||d===null);var p=d===null?null:$i(d),m=d===null?null:lr(d),h=l.device.gl,g=l.device.ensureResourceExists(Z(h)?h.createVertexArray():s.OES_vertex_array_object.createVertexArrayOES());Z(h)?h.bindVertexArray(g):s.OES_vertex_array_object.bindVertexArrayOES(g),h.bindBuffer(h.ARRAY_BUFFER,na(l.device.fallbackVertexBuffer));try{for(var _=Ve(c.vertexBufferDescriptors),v=_.next();!v.done;v=_.next()){var y=v.value,b=y.stepMode,x=y.attributes;try{for(var S=(i=void 0,Ve(x)),C=S.next();!C.done;C=S.next()){var w=C.value,T=w.shaderLocation,E=w.format,D=w.divisor,O=D===void 0?1:D,k=Z(h)?T:f.attributes[T]?.location,A=Qi(E);if(w.vertexFormat=A,!Ae(k)){Ki(E);var j=A.size,ee=A.type,M=A.normalized;h.vertexAttribPointer(k,j,ee,M,0,0),b===H.INSTANCE&&(Z(h)?h.vertexAttribDivisor(k,O):s.ANGLE_instanced_arrays.vertexAttribDivisorANGLE(k,O)),h.enableVertexAttribArray(k)}}}catch(e){i={error:e}}finally{try{C&&!C.done&&(a=S.return)&&a.call(S)}finally{if(i)throw i.error}}}}catch(e){n={error:e}}finally{try{v&&!v.done&&(r=_.return)&&r.call(_)}finally{if(n)throw n.error}}return Z(h)?h.bindVertexArray(null):s.OES_vertex_array_object.bindVertexArrayOES(null),l.vertexBufferDescriptors=u,l.vao=g,l.indexBufferFormat=d,l.indexBufferType=p,l.indexBufferCompByteSize=m,l.program=f,l}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.currentBoundVAO===this.vao&&(Z(this.device.gl)?(this.device.gl.bindVertexArray(null),this.device.gl.deleteVertexArray(this.vao)):(this.device.OES_vertex_array_object.bindVertexArrayOES(null),this.device.OES_vertex_array_object.deleteVertexArrayOES(this.vao)),this.device.currentBoundVAO=null)},t}(Hi),pa=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=t.fake,o=e.call(this,{id:n,device:r})||this;o.type=B.Texture,i=Be({dimension:U.TEXTURE_2D,depthOrArrayLayers:1,mipLevelCount:1},i);var s=o.device.gl,c,l,u=o.clampmipLevelCount(i);if(o.immutable=i.usage===Xn.RENDER_TARGET,o.pixelStore=i.pixelStore,o.format=i.format,o.dimension=i.dimension,o.formatKind=dr(i.format),o.width=i.width,o.height=i.height,o.depthOrArrayLayers=i.depthOrArrayLayers,o.mipmaps=u>=1,!a){l=o.device.ensureResourceExists(s.createTexture());var d=o.device.translateTextureType(i.format),f=o.device.translateTextureInternalFormat(i.format);if(o.device.setActiveTexture(s.TEXTURE0),o.device.currentTextures[0]=null,o.preprocessImage(),i.dimension===U.TEXTURE_2D){if(c=z.TEXTURE_2D,s.bindTexture(c,l),o.immutable){if(Z(s))s.texStorage2D(c,u,f,i.width,i.height);else{var p=(f===z.DEPTH_COMPONENT||o.isNPOT(),0);(o.format===J.D32F||o.format===J.D24_S8)&&!Z(s)&&!r.WEBGL_depth_texture||(s.texImage2D(c,p,f,i.width,i.height,0,f,d,null),o.mipmaps&&(o.mipmaps=!1,s.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR),s.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,z.CLAMP_TO_EDGE),s.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,z.CLAMP_TO_EDGE)))}}Y(i.depthOrArrayLayers===1)}else if(i.dimension===U.TEXTURE_2D_ARRAY)c=z.TEXTURE_2D_ARRAY,s.bindTexture(c,l),o.immutable&&Z(s)&&s.texStorage3D(c,u,f,i.width,i.height,i.depthOrArrayLayers);else if(i.dimension===U.TEXTURE_3D)c=z.TEXTURE_3D,s.bindTexture(c,l),o.immutable&&Z(s)&&s.texStorage3D(c,u,f,i.width,i.height,i.depthOrArrayLayers);else if(i.dimension===U.TEXTURE_CUBE_MAP)c=z.TEXTURE_CUBE_MAP,s.bindTexture(c,l),o.immutable&&Z(s)&&s.texStorage2D(c,u,f,i.width,i.height),Y(i.depthOrArrayLayers===6);else throw Error(`whoops`)}return o.gl_texture=l,o.gl_target=c,o.mipLevelCount=u,o}return t.prototype.setImageData=function(e,t){t===void 0&&(t=0);var n=this.device.gl;Gi(this.format);var r=this.gl_target===z.TEXTURE_3D||this.gl_target===z.TEXTURE_2D_ARRAY,i=this.gl_target===z.TEXTURE_CUBE_MAP,a=Ni(e[0]);this.device.setActiveTexture(n.TEXTURE0),this.device.currentTextures[0]=null;var o=e[0],s,c;a?(s=this.width,c=this.height):(s=o.width,c=o.height,this.width=s,this.height=c),n.bindTexture(this.gl_target,this.gl_texture);var l=this.device.translateTextureFormat(this.format),u=Z(n)?this.device.translateInternalTextureFormat(this.format):l,d=this.device.translateTextureType(this.format);this.preprocessImage();for(var f=0;f<this.depthOrArrayLayers;f++){var p=e[f],m=this.gl_target;i&&(m=z.TEXTURE_CUBE_MAP_POSITIVE_X+f%6),this.immutable?n.texSubImage2D(m,t,0,0,s,c,l,d,p):Z(n)?r?n.texImage3D(m,t,u,s,c,this.depthOrArrayLayers,0,l,d,p):n.texImage2D(m,t,u,s,c,0,l,d,p):a?n.texImage2D(m,t,l,s,c,0,l,d,p):n.texImage2D(m,t,l,l,d,p)}this.mipmaps&&this.generateMipmap(r)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.gl.deleteTexture(ra(this))},t.prototype.clampmipLevelCount=function(e){if(e.dimension===U.TEXTURE_2D_ARRAY&&e.depthOrArrayLayers>1&&or(e.format)===W.BC1)for(var t=e.width,n=e.height,r=0;r<e.mipLevelCount;r++){if(t<=2||n<=2)return r-1;t=Math.max(t/2|0,1),n=Math.max(n/2|0,1)}return e.mipLevelCount},t.prototype.preprocessImage=function(){var e=this.device.gl;this.pixelStore&&(this.pixelStore.unpackFlipY&&e.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,!0),this.pixelStore.packAlignment&&e.pixelStorei(z.PACK_ALIGNMENT,this.pixelStore.packAlignment),this.pixelStore.unpackAlignment&&e.pixelStorei(z.UNPACK_ALIGNMENT,this.pixelStore.unpackAlignment))},t.prototype.generateMipmap=function(e){e===void 0&&(e=!1);var t=this.device.gl;return!Z(t)&&this.isNPOT()||this.gl_texture&&this.gl_target&&(t.bindTexture(this.gl_target,this.gl_texture),e?(t.texParameteri(this.gl_target,z.TEXTURE_BASE_LEVEL,0),t.texParameteri(this.gl_target,z.TEXTURE_MAX_LEVEL,Math.log2(this.width)),t.texParameteri(this.gl_target,z.TEXTURE_MIN_FILTER,z.LINEAR_MIPMAP_LINEAR),t.texParameteri(this.gl_target,z.TEXTURE_MAG_FILTER,z.LINEAR)):t.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.NEAREST_MIPMAP_LINEAR),t.generateMipmap(this.gl_target),t.bindTexture(this.gl_target,null)),this},t.prototype.isNPOT=function(){var e=this.device.gl;return Z(e)?!1:!br(this.width)||!br(this.height)},t}(Hi),ma=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.RenderTarget,a.gl_renderbuffer=null,a.texture=null;var o=a.device.gl,s=i.format,c=i.width,l=i.height,u=i.sampleCount,d=u===void 0?1:u,f=i.texture,p=!1;if((s===J.D32F||s===J.D24_S8)&&f&&!Z(o)&&!r.WEBGL_depth_texture&&(f.destroy(),a.texture=null,p=!0),!p&&f)a.texture=f;else{a.gl_renderbuffer=a.device.ensureResourceExists(o.createRenderbuffer()),o.bindRenderbuffer(o.RENDERBUFFER,a.gl_renderbuffer);var m=a.device.translateTextureInternalFormat(s,!0);Z(o)&&d>1?o.renderbufferStorageMultisample(z.RENDERBUFFER,d,m,c,l):o.renderbufferStorage(z.RENDERBUFFER,m,c,l)}return a.format=s,a.width=c,a.height=l,a.sampleCount=d,a}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gl_renderbuffer!==null&&this.device.gl.deleteRenderbuffer(this.gl_renderbuffer),this.texture&&this.texture.destroy()},t}(Hi),ha;(function(e){e[e.NeedsCompile=0]=`NeedsCompile`,e[e.Compiling=1]=`Compiling`,e[e.NeedsBind=2]=`NeedsBind`,e[e.ReadyToUse=3]=`ReadyToUse`})(ha||={});var ga=function(e){Ie(t,e);function t(t,n){var r=t.id,i=t.device,a=t.descriptor,o=e.call(this,{id:r,device:i})||this;o.rawVertexGLSL=n,o.type=B.Program,o.uniformSetters={},o.attributes=[];var s=o.device.gl;return o.descriptor=a,o.gl_program=o.device.ensureResourceExists(s.createProgram()),o.gl_shader_vert=null,o.gl_shader_frag=null,o.compileState=ha.NeedsCompile,o.tryCompileProgram(),o}return t.prototype.destroy=function(){e.prototype.destroy.call(this),this.device.gl.deleteProgram(this.gl_program),this.device.gl.deleteShader(this.gl_shader_vert),this.device.gl.deleteShader(this.gl_shader_frag)},t.prototype.tryCompileProgram=function(){Y(this.compileState===ha.NeedsCompile);var e=this.descriptor,t=e.vertex,n=e.fragment,r=this.device.gl;t?.glsl&&n?.glsl&&(this.gl_shader_vert=this.compileShader(t.postprocess?t.postprocess(t.glsl):t.glsl,r.VERTEX_SHADER),this.gl_shader_frag=this.compileShader(n.postprocess?n.postprocess(n.glsl):n.glsl,r.FRAGMENT_SHADER),r.attachShader(this.gl_program,this.gl_shader_vert),r.attachShader(this.gl_program,this.gl_shader_frag),r.linkProgram(this.gl_program),this.compileState=ha.Compiling,Z(r)||(this.readUniformLocationsFromLinkedProgram(),this.readAttributesFromLinkedProgram()))},t.prototype.readAttributesFromLinkedProgram=function(){for(var e=this.device.gl,t=e.getProgramParameter(this.gl_program,e.ACTIVE_ATTRIBUTES),n=Fi(this.descriptor.vertex.glsl),r=Ii(this.rawVertexGLSL,n),i=function(t){var n=e.getActiveAttrib(a.gl_program,t),i=n.name,o=n.type,s=n.size,c=e.getAttribLocation(a.gl_program,i),l=r.find(function(e){return e.name===i})?.location;c>=0&&!Ae(l)&&(a.attributes[l]={name:i,location:c,type:o,size:s})},a=this,o=0;o<t;o++)i(o)},t.prototype.readUniformLocationsFromLinkedProgram=function(){for(var e=this.device.gl,t=e.getProgramParameter(this.gl_program,e.ACTIVE_UNIFORMS),n=0;n<t;n++){var r=e.getActiveUniform(this.gl_program,n),i=_i(r.name).name,a=e.getUniformLocation(this.gl_program,i);if(this.uniformSetters[i]=ji(e,a,r),r&&r.size>1)for(var o=0;o<r.size;o++)a=e.getUniformLocation(this.gl_program,`${i}[${o}]`),this.uniformSetters[`${i}[${o}]`]=ji(e,a,r)}},t.prototype.compileShader=function(e,t){var n=this.device.gl,r=this.device.ensureResourceExists(n.createShader(t));return n.shaderSource(r,e),n.compileShader(r),r},t.prototype.setUniformsLegacy=function(e){e===void 0&&(e={});var t=this.device.gl;if(!Z(t)){var n=!1;for(var r in e){n||=(t.useProgram(this.gl_program),!0);var i=e[r],a=this.uniformSetters[r];if(a){var o=i;o instanceof pa&&(o=o.textureIndex),a(o)}}}return this},t}(Hi),_a=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.QueryPool;var o=a.device.gl;if(Z(o)){var s=i.elemCount,c=i.type;a.gl_query=kr(s,function(){return a.device.ensureResourceExists(o.createQuery())}),a.gl_query_type=ca(c)}return a}return t.prototype.queryResultOcclusion=function(e){var t=this.device.gl;if(Z(t)){var n=this.gl_query[e];return t.getQueryParameter(n,t.QUERY_RESULT_AVAILABLE)?!!t.getQueryParameter(n,t.QUERY_RESULT):null}return null},t.prototype.destroy=function(){e.prototype.destroy.call(this);var t=this.device.gl;if(Z(t))for(var n=0;n<this.gl_query.length;n++)t.deleteQuery(this.gl_query[n])},t}(Hi),va=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=e.call(this,{id:n,device:r})||this;return i.type=B.Readback,i.gl_pbo=null,i.gl_sync=null,i}return t.prototype.clientWaitAsync=function(e,t,n){t===void 0&&(t=0),n===void 0&&(n=10);var r=this.device.gl;return new Promise(function(i,a){function o(){var s=r.clientWaitSync(e,t,0);s==r.WAIT_FAILED?a():s==r.TIMEOUT_EXPIRED?setTimeout(o,Ne(n,0,r.MAX_CLIENT_WAIT_TIMEOUT_WEBGL)):i()}o()})},t.prototype.getBufferSubDataAsync=function(e,t,n,r,i,a){return Le(this,void 0,void 0,function(){var o;return Pe(this,function(s){switch(s.label){case 0:return o=this.device.gl,Z(o)?(this.gl_sync=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0),o.flush(),[4,this.clientWaitAsync(this.gl_sync,0,10)]):[3,2];case 1:return s.sent(),o.bindBuffer(e,t),o.getBufferSubData(e,n,r,i,a),o.bindBuffer(e,null),[2,r];case 2:return[2]}})})},t.prototype.readTexture=function(e,t,n,r,i,a,o,s){return o===void 0&&(o=0),s===void 0&&(s=a.byteLength||0),Le(this,void 0,void 0,function(){var c,l,u,d,f;return Pe(this,function(p){return c=this.device.gl,l=e,u=this.device.translateTextureFormat(l.format),d=this.device.translateTextureType(l.format),f=ur(l.format),Z(c)?(this.gl_pbo=this.device.ensureResourceExists(c.createBuffer()),c.bindBuffer(c.PIXEL_PACK_BUFFER,this.gl_pbo),c.bufferData(c.PIXEL_PACK_BUFFER,s,c.STREAM_READ),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),c.bindFramebuffer(z.READ_FRAMEBUFFER,this.device.readbackFramebuffer),c.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,l.gl_texture,0),c.bindBuffer(c.PIXEL_PACK_BUFFER,this.gl_pbo),c.readPixels(t,n,r,i,u,d,o*f),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),[2,this.getBufferSubDataAsync(c.PIXEL_PACK_BUFFER,this.gl_pbo,0,a,o,0)]):[2,this.readTextureSync(e,t,n,r,i,a,o,s)]})})},t.prototype.readTextureSync=function(e,t,n,r,i,a,o,s){s===void 0&&(s=a.byteLength||0);var c=this.device.gl,l=e,u=this.device.translateTextureType(l.format);return c.bindFramebuffer(z.FRAMEBUFFER,this.device.readbackFramebuffer),c.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,l.gl_texture,0),c.pixelStorei(c.PACK_ALIGNMENT,4),c.readPixels(t,n,r,i,c.RGBA,u,a),a},t.prototype.readBuffer=function(e,t,n,r,i){return Le(this,void 0,void 0,function(){var a;return Pe(this,function(o){return a=this.device.gl,Z(a)?[2,this.getBufferSubDataAsync(a.ARRAY_BUFFER,na(e,t),t,n,r,i)]:[2,Promise.reject()]})})},t.prototype.destroy=function(){e.prototype.destroy.call(this),Z(this.device.gl)&&(this.gl_sync!==null&&this.device.gl.deleteSync(this.gl_sync),this.gl_pbo!==null&&this.device.gl.deleteBuffer(this.gl_pbo))},t}(Hi),ya=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;return a.type=B.RenderPipeline,a.drawMode=Yi(i.topology??qn.TRIANGLES),a.program=i.program,a.inputLayout=i.inputLayout,a.megaState=Be(Be({},Lr(Br)),i.megaStateDescriptor),a.colorAttachmentFormats=i.colorAttachmentFormats.slice(),a.depthStencilAttachmentFormat=i.depthStencilAttachmentFormat,a.sampleCount=i.sampleCount??1,a}return t}(Hi),ba=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;return a.type=B.ComputePipeline,a.descriptor=i,a}return t}(Hi),xa=function(){function e(){this.liveObjects=new Set,this.creationStacks=new Map,this.deletionStacks=new Map}return e.prototype.trackResourceCreated=function(e){this.creationStacks.set(e,Error().stack),this.liveObjects.add(e)},e.prototype.trackResourceDestroyed=function(e){this.deletionStacks.has(e)&&console.warn(`Object double freed:`,e,`

Creation stack: `,this.creationStacks.get(e),`

Deletion stack: `,this.deletionStacks.get(e),`

This stack: `,Error().stack),this.deletionStacks.set(e,Error().stack),this.liveObjects.delete(e)},e.prototype.checkForLeaks=function(){var e,t;try{for(var n=Ve(this.liveObjects.values()),r=n.next();!r.done;r=n.next()){var i=r.value;console.warn(`Object leaked:`,i,`Creation stack:`,this.creationStacks.get(i))}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}},e.prototype.setResourceLeakCheck=function(e,t){t?this.liveObjects.add(e):this.liveObjects.delete(e)},e}(),Sa=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Sampler;var o=a.device.gl;if(Z(o)){var s=a.device.ensureResourceExists(o.createSampler());o.samplerParameteri(s,z.TEXTURE_WRAP_S,ea(i.addressModeU)),o.samplerParameteri(s,z.TEXTURE_WRAP_T,ea(i.addressModeV)),o.samplerParameteri(s,z.TEXTURE_WRAP_R,ea(i.addressModeW??i.addressModeU)),o.samplerParameteri(s,z.TEXTURE_MIN_FILTER,ta(i.minFilter,i.mipmapFilter)),o.samplerParameteri(s,z.TEXTURE_MAG_FILTER,ta(i.magFilter,Kn.NO_MIP)),i.lodMinClamp!==void 0&&o.samplerParameterf(s,z.TEXTURE_MIN_LOD,i.lodMinClamp),i.lodMaxClamp!==void 0&&o.samplerParameterf(s,z.TEXTURE_MAX_LOD,i.lodMaxClamp),i.compareFunction!==void 0&&(o.samplerParameteri(s,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.samplerParameteri(s,o.TEXTURE_COMPARE_FUNC,i.compareFunction));var c=i.maxAnisotropy??1;c>1&&a.device.EXT_texture_filter_anisotropic!==null&&(Y(i.minFilter===Gn.BILINEAR&&i.magFilter===Gn.BILINEAR&&i.mipmapFilter===Kn.LINEAR),o.samplerParameterf(s,a.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,c)),a.gl_sampler=s}else a.descriptor=i;return a}return t.prototype.setTextureParameters=function(e,t,n){var r=this.device.gl,i=this.descriptor;this.isNPOT(t,n)?r.texParameteri(z.TEXTURE_2D,z.TEXTURE_MIN_FILTER,z.LINEAR):r.texParameteri(e,z.TEXTURE_MIN_FILTER,ta(i.minFilter,i.mipmapFilter)),r.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_S,ea(i.addressModeU)),r.texParameteri(z.TEXTURE_2D,z.TEXTURE_WRAP_T,ea(i.addressModeV)),r.texParameteri(e,z.TEXTURE_MAG_FILTER,ta(i.magFilter,Kn.NO_MIP));var a=i.maxAnisotropy??1;a>1&&this.device.EXT_texture_filter_anisotropic!==null&&(Y(i.minFilter===Gn.BILINEAR&&i.magFilter===Gn.BILINEAR&&i.mipmapFilter===Kn.LINEAR),r.texParameteri(e,this.device.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,a))},t.prototype.destroy=function(){e.prototype.destroy.call(this),Z(this.device.gl)&&this.device.gl.deleteSampler(ia(this))},t.prototype.isNPOT=function(e,t){return!br(e)||!br(t)},t}(Hi),Ca=function(){function e(){}return e.prototype.dispatchWorkgroups=function(e,t,n){},e.prototype.dispatchWorkgroupsIndirect=function(e,t){},e.prototype.setPipeline=function(e){},e.prototype.setBindings=function(e){},e.prototype.pushDebugGroup=function(e){},e.prototype.popDebugGroup=function(){},e.prototype.insertDebugMarker=function(e){},e}(),wa=function(e){Ie(t,e);function t(){var t=e!==null&&e.apply(this,arguments)||this;return t.type=B.RenderBundle,t.commands=[],t}return t.prototype.push=function(e){this.commands.push(e)},t.prototype.replay=function(){this.commands.forEach(function(e){return e()})},t}(Hi),Ta=65536,Ea=/uniform(?:\s+)(\w+)(?:\s?){([^]*?)}/g,Da=function(){function e(e,t){t===void 0&&(t={}),this.shaderDebug=!1,this.OES_vertex_array_object=null,this.ANGLE_instanced_arrays=null,this.OES_texture_float=null,this.OES_draw_buffers_indexed=null,this.WEBGL_draw_buffers=null,this.WEBGL_depth_texture=null,this.WEBGL_color_buffer_float=null,this.EXT_color_buffer_half_float=null,this.WEBGL_compressed_texture_s3tc=null,this.WEBGL_compressed_texture_s3tc_srgb=null,this.EXT_texture_compression_rgtc=null,this.EXT_texture_filter_anisotropic=null,this.KHR_parallel_shader_compile=null,this.EXT_texture_norm16=null,this.EXT_color_buffer_float=null,this.OES_texture_float_linear=null,this.OES_texture_half_float_linear=null,this.scTexture=null,this.scPlatformFramebuffer=null,this.currentActiveTexture=null,this.currentBoundVAO=null,this.currentProgram=null,this.resourceCreationTracker=null,this.resourceUniqueId=0,this.currentColorAttachments=[],this.currentColorAttachmentLevels=[],this.currentColorResolveTos=[],this.currentColorResolveToLevels=[],this.currentSampleCount=-1,this.currentIndexBufferByteOffset=null,this.currentMegaState=Lr(Br),this.currentSamplers=[],this.currentTextures=[],this.currentUniformBuffers=[],this.currentUniformBufferByteOffsets=[],this.currentUniformBufferByteSizes=[],this.currentScissorEnabled=!1,this.currentStencilRef=null,this.currentRenderPassDescriptor=null,this.currentRenderPassDescriptorStack=[],this.debugGroupStack=[],this.resolveColorAttachmentsChanged=!1,this.resolveDepthStencilAttachmentsChanged=!1,this.explicitBindingLocations=!1,this.separateSamplerTextures=!1,this.viewportOrigin=tr.LOWER_LEFT,this.clipSpaceNearZ=nr.NEGATIVE_ONE,this.supportMRT=!1,this.inBlitRenderPass=!1,this.supportedSampleCounts=[],this.occlusionQueriesRecommended=!1,this.computeShadersSupported=!1,this.gl=e,this.contextAttributes=fr(e.getContextAttributes()),Z(e)?(this.EXT_texture_norm16=e.getExtension(`EXT_texture_norm16`),this.EXT_color_buffer_float=e.getExtension(`EXT_color_buffer_float`)):(this.OES_vertex_array_object=e.getExtension(`OES_vertex_array_object`),this.ANGLE_instanced_arrays=e.getExtension(`ANGLE_instanced_arrays`),this.OES_texture_float=e.getExtension(`OES_texture_float`),this.WEBGL_draw_buffers=e.getExtension(`WEBGL_draw_buffers`),this.WEBGL_depth_texture=e.getExtension(`WEBGL_depth_texture`),this.WEBGL_color_buffer_float=e.getExtension(`WEBGL_color_buffer_float`),this.EXT_color_buffer_half_float=e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`EXT_frag_depth`),e.getExtension(`OES_element_index_uint`),e.getExtension(`OES_standard_derivatives`)),this.WEBGL_compressed_texture_s3tc=e.getExtension(`WEBGL_compressed_texture_s3tc`),this.WEBGL_compressed_texture_s3tc_srgb=e.getExtension(`WEBGL_compressed_texture_s3tc_srgb`),this.EXT_texture_compression_rgtc=e.getExtension(`EXT_texture_compression_rgtc`),this.EXT_texture_filter_anisotropic=e.getExtension(`EXT_texture_filter_anisotropic`),this.EXT_texture_norm16=e.getExtension(`EXT_texture_norm16`),this.OES_texture_float_linear=e.getExtension(`OES_texture_float_linear`),this.OES_texture_half_float_linear=e.getExtension(`OES_texture_half_float_linear`),this.KHR_parallel_shader_compile=e.getExtension(`KHR_parallel_shader_compile`),Z(e)?(this.platformString=`WebGL2`,this.glslVersion=`#version 300 es`):(this.platformString=`WebGL1`,this.glslVersion=`#version 100`),this.scTexture=new pa({id:this.getNextUniqueId(),device:this,descriptor:{width:0,height:0,depthOrArrayLayers:1,dimension:U.TEXTURE_2D,mipLevelCount:1,usage:Xn.RENDER_TARGET,format:this.contextAttributes.alpha===!1?J.U8_RGB_RT:J.U8_RGBA_RT},fake:!0}),this.scTexture.formatKind=er.Float,this.scTexture.gl_target=null,this.scTexture.gl_texture=null,this.resolveColorReadFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.resolveColorDrawFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.resolveDepthStencilReadFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.resolveDepthStencilDrawFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.renderPassDrawFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.readbackFramebuffer=this.ensureResourceExists(e.createFramebuffer()),this.fallbackTexture2D=this.createFallbackTexture(U.TEXTURE_2D,er.Float),this.fallbackTexture2DDepth=this.createFallbackTexture(U.TEXTURE_2D,er.Depth),this.fallbackVertexBuffer=this.createBuffer({viewOrSize:1,usage:V.VERTEX,hint:Jn.STATIC}),Z(e)&&(this.fallbackTexture2DArray=this.createFallbackTexture(U.TEXTURE_2D_ARRAY,er.Float),this.fallbackTexture3D=this.createFallbackTexture(U.TEXTURE_3D,er.Float),this.fallbackTextureCube=this.createFallbackTexture(U.TEXTURE_CUBE_MAP,er.Float)),this.currentMegaState.depthCompare=zn.LESS,this.currentMegaState.depthWrite=!1,this.currentMegaState.attachmentsState[0].channelWriteMask=Zn.ALL,e.enable(e.DEPTH_TEST),e.enable(e.STENCIL_TEST),this.checkLimits(),t.shaderDebug&&(this.shaderDebug=!0),t.trackResources&&(this.resourceCreationTracker=new xa)}return e.prototype.destroy=function(){this.blitBindings&&this.blitBindings.destroy(),this.blitInputLayout&&this.blitInputLayout.destroy(),this.blitRenderPipeline&&this.blitRenderPipeline.destroy(),this.blitVertexBuffer&&this.blitVertexBuffer.destroy(),this.blitProgram&&this.blitProgram.destroy()},e.prototype.createFallbackTexture=function(e,t){var n=e===U.TEXTURE_CUBE_MAP?6:1,r=t===er.Depth?J.D32F:J.U8_RGBA_NORM,i=this.createTexture({dimension:e,format:r,usage:Xn.SAMPLED,width:1,height:1,depthOrArrayLayers:n,mipLevelCount:1});return t===er.Float&&i.setImageData([new Uint8Array(4*n)]),ra(i)},e.prototype.getNextUniqueId=function(){return++this.resourceUniqueId},e.prototype.checkLimits=function(){var e=this.gl;if(this.maxVertexAttribs=e.getParameter(z.MAX_VERTEX_ATTRIBS),Z(e)){this.uniformBufferMaxPageByteSize=Math.min(e.getParameter(z.MAX_UNIFORM_BLOCK_SIZE),Ta),this.uniformBufferWordAlignment=e.getParameter(e.UNIFORM_BUFFER_OFFSET_ALIGNMENT)/4;var t=e.getInternalformatParameter(e.RENDERBUFFER,e.DEPTH32F_STENCIL8,e.SAMPLES);this.supportedSampleCounts=t?Fe([],Re(t),!1):[],this.occlusionQueriesRecommended=!0}else this.uniformBufferWordAlignment=64,this.uniformBufferMaxPageByteSize=Ta;this.uniformBufferMaxPageWordSize=this.uniformBufferMaxPageByteSize/4,this.supportedSampleCounts.includes(1)||this.supportedSampleCounts.push(1),this.supportedSampleCounts.sort(function(e,t){return e-t})},e.prototype.configureSwapChain=function(e,t,n){var r=this.scTexture;r.width=e,r.height=t,this.scPlatformFramebuffer=Sr(n)},e.prototype.getDevice=function(){return this},e.prototype.getCanvas=function(){return this.gl.canvas},e.prototype.getOnscreenTexture=function(){return this.scTexture},e.prototype.beginFrame=function(){},e.prototype.endFrame=function(){},e.prototype.translateTextureInternalFormat=function(e,t){switch(t===void 0&&(t=!1),e){case J.ALPHA:return z.ALPHA;case J.U8_LUMINANCE:case J.F16_LUMINANCE:case J.F32_LUMINANCE:return z.LUMINANCE;case J.F16_R:return z.R16F;case J.F16_RG:return z.RG16F;case J.F16_RGB:return z.RGB16F;case J.F16_RGBA:return z.RGBA16F;case J.F32_R:return z.R32F;case J.F32_RG:return z.RG32F;case J.F32_RGB:return z.RGB32F;case J.F32_RGBA:return Z(this.gl)?z.RGBA32F:t?this.WEBGL_color_buffer_float.RGBA32F_EXT:z.RGBA;case J.U8_R_NORM:return z.R8;case J.U8_RG_NORM:return z.RG8;case J.U8_RGB_NORM:case J.U8_RGB_RT:return z.RGB8;case J.U8_RGB_SRGB:return z.SRGB8;case J.U8_RGBA_NORM:case J.U8_RGBA_RT:return Z(this.gl)?z.RGBA8:t?z.RGBA4:z.RGBA;case J.U8_RGBA:return z.RGBA;case J.U8_RGBA_SRGB:case J.U8_RGBA_RT_SRGB:return z.SRGB8_ALPHA8;case J.U16_R:return z.R16UI;case J.U16_R_NORM:return this.EXT_texture_norm16.R16_EXT;case J.U16_RG_NORM:return this.EXT_texture_norm16.RG16_EXT;case J.U16_RGBA_NORM:return this.EXT_texture_norm16.RGBA16_EXT;case J.U16_RGBA_5551:return z.RGB5_A1;case J.U16_RGB_565:return z.RGB565;case J.U32_R:return z.R32UI;case J.S8_RGBA_NORM:return z.RGBA8_SNORM;case J.S8_RG_NORM:return z.RG8_SNORM;case J.BC1:return this.WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT;case J.BC1_SRGB:return this.WEBGL_compressed_texture_s3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;case J.BC2:return this.WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;case J.BC2_SRGB:return this.WEBGL_compressed_texture_s3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;case J.BC3:return this.WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;case J.BC3_SRGB:return this.WEBGL_compressed_texture_s3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;case J.BC4_UNORM:return this.EXT_texture_compression_rgtc.COMPRESSED_RED_RGTC1_EXT;case J.BC4_SNORM:return this.EXT_texture_compression_rgtc.COMPRESSED_SIGNED_RED_RGTC1_EXT;case J.BC5_UNORM:return this.EXT_texture_compression_rgtc.COMPRESSED_RED_GREEN_RGTC2_EXT;case J.BC5_SNORM:return this.EXT_texture_compression_rgtc.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;case J.D32F_S8:return Z(this.gl)?z.DEPTH32F_STENCIL8:this.WEBGL_depth_texture?z.DEPTH_STENCIL:z.DEPTH_COMPONENT16;case J.D24_S8:return Z(this.gl)?z.DEPTH24_STENCIL8:this.WEBGL_depth_texture?z.DEPTH_STENCIL:z.DEPTH_COMPONENT16;case J.D32F:return Z(this.gl)?z.DEPTH_COMPONENT32F:this.WEBGL_depth_texture?z.DEPTH_COMPONENT:z.DEPTH_COMPONENT16;case J.D24:return Z(this.gl)?z.DEPTH_COMPONENT24:this.WEBGL_depth_texture?z.DEPTH_COMPONENT:z.DEPTH_COMPONENT16;default:throw Error(`whoops`)}},e.prototype.translateTextureType=function(e){switch(or(e)){case W.U8:return z.UNSIGNED_BYTE;case W.U16:return z.UNSIGNED_SHORT;case W.U32:return z.UNSIGNED_INT;case W.S8:return z.BYTE;case W.F16:return z.HALF_FLOAT;case W.F32:return z.FLOAT;case W.U16_PACKED_5551:return z.UNSIGNED_SHORT_5_5_5_1;case W.D32F:return Z(this.gl)?z.FLOAT:this.WEBGL_depth_texture?z.UNSIGNED_INT:z.UNSIGNED_BYTE;case W.D24:return Z(this.gl)?z.UNSIGNED_INT_24_8:this.WEBGL_depth_texture?z.UNSIGNED_SHORT:z.UNSIGNED_BYTE;case W.D24S8:return Z(this.gl)?z.UNSIGNED_INT_24_8:this.WEBGL_depth_texture?z.UNSIGNED_INT_24_8_WEBGL:z.UNSIGNED_BYTE;case W.D32FS8:return z.FLOAT_32_UNSIGNED_INT_24_8_REV;default:throw Error(`whoops`)}},e.prototype.translateInternalTextureFormat=function(e){switch(e){case J.F32_R:return z.R32F;case J.F32_RG:return z.RG32F;case J.F32_RGB:return z.RGB32F;case J.F32_RGBA:return z.RGBA32F;case J.F16_R:return z.R16F;case J.F16_RG:return z.RG16F;case J.F16_RGB:return z.RGB16F;case J.F16_RGBA:return z.RGBA16F}return this.translateTextureFormat(e)},e.prototype.translateTextureFormat=function(e){if(Gi(e)||e===J.F32_LUMINANCE||e===J.U8_LUMINANCE)return this.translateTextureInternalFormat(e);var t=Z(this.gl)||!Z(this.gl)&&!!this.WEBGL_depth_texture;switch(e){case J.D24_S8:case J.D32F_S8:return t?z.DEPTH_STENCIL:z.RGBA;case J.D24:case J.D32F:return t?z.DEPTH_COMPONENT:z.RGBA}var n=Ki(e);switch(ar(e)){case G.A:return z.ALPHA;case G.R:return n?z.RED_INTEGER:z.RED;case G.RG:return n?z.RG_INTEGER:z.RG;case G.RGB:return n?z.RGB_INTEGER:z.RGB;case G.RGBA:return z.RGBA}},e.prototype.setActiveTexture=function(e){this.currentActiveTexture!==e&&(this.gl.activeTexture(e),this.currentActiveTexture=e)},e.prototype.bindVAO=function(e){this.currentBoundVAO!==e&&(Z(this.gl)?this.gl.bindVertexArray(e):this.OES_vertex_array_object.bindVertexArrayOES(e),this.currentBoundVAO=e)},e.prototype.programCompiled=function(e){Y(e.compileState!==ha.NeedsCompile),e.compileState===ha.Compiling&&(e.compileState=ha.NeedsBind,this.shaderDebug&&this.checkProgramCompilationForErrors(e))},e.prototype.useProgram=function(e){this.currentProgram!==e&&(this.programCompiled(e),this.gl.useProgram(e.gl_program),this.currentProgram=e)},e.prototype.ensureResourceExists=function(e){if(e===null){var t=this.gl.getError();throw Error(`Created resource is null; GL error encountered: ${t}`)}return e},e.prototype.createBuffer=function(e){return new da({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createTexture=function(e){return new pa({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createSampler=function(e){return new Sa({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createRenderTarget=function(e){return new ma({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createRenderTargetFromTexture=function(e){var t=e,n=t.format,r=t.width,i=t.height,a=t.mipLevelCount;return Y(a===1),this.createRenderTarget({format:n,width:r,height:i,sampleCount:1,texture:e})},e.prototype.createProgram=function(e){var t=e.vertex?.glsl;return e.vertex?.glsl&&(e.vertex.glsl=Bi(this.queryVendorInfo(),`vert`,e.vertex.glsl)),e.fragment?.glsl&&(e.fragment.glsl=Bi(this.queryVendorInfo(),`frag`,e.fragment.glsl)),this.createProgramSimple(e,t)},e.prototype.createProgramSimple=function(e,t){return new ga({id:this.getNextUniqueId(),device:this,descriptor:e},t)},e.prototype.createBindings=function(e){return new Ui({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createInputLayout=function(e){return new fa({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createRenderPipeline=function(e){return new ya({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createComputePass=function(){return new Ca},e.prototype.createComputePipeline=function(e){return new ba({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createReadback=function(){return new va({id:this.getNextUniqueId(),device:this})},e.prototype.createQueryPool=function(e,t){return new _a({id:this.getNextUniqueId(),device:this,descriptor:{type:e,elemCount:t}})},e.prototype.formatRenderPassDescriptor=function(e){var t=e.colorAttachment;e.depthClearValue=e.depthClearValue??`load`,e.stencilClearValue=e.stencilClearValue??`load`;for(var n=0;n<t.length;n++)e.colorAttachmentLevel||=[],e.colorAttachmentLevel[n]=e.colorAttachmentLevel[n]??0,e.colorResolveToLevel||=[],e.colorResolveToLevel[n]=e.colorResolveToLevel[n]??0,e.colorClearColor||=[],e.colorClearColor[n]=e.colorClearColor[n]??`load`,e.colorStore||=[],e.colorStore[n]=e.colorStore[n]??!1},e.prototype.createRenderBundle=function(){return new wa({id:this.getNextUniqueId(),device:this})},e.prototype.beginBundle=function(e){this.renderBundle=e},e.prototype.endBundle=function(){this.renderBundle=void 0},e.prototype.executeBundles=function(e){e.forEach(function(e){e.replay()})},e.prototype.createRenderPass=function(e){this.currentRenderPassDescriptor!==null&&this.currentRenderPassDescriptorStack.push(this.currentRenderPassDescriptor),this.currentRenderPassDescriptor=e,this.formatRenderPassDescriptor(e);var t=e.colorAttachment,n=e.colorAttachmentLevel,r=e.colorClearColor,i=e.colorResolveTo,a=e.colorResolveToLevel,o=e.depthStencilAttachment,s=e.depthClearValue,c=e.stencilClearValue,l=e.depthStencilResolveTo,u=i&&i.length===1&&i[0]===this.scTexture;this.setRenderPassParametersBegin(t.length,u);for(var d=0;d<t.length;d++)this.setRenderPassParametersColor(d,t[d],n[d],i[d],a[d],u);this.setRenderPassParametersDepthStencil(o,l,u),this.validateCurrentAttachments();for(var d=0;d<t.length;d++){var f=r[d];f!==`load`&&this.setRenderPassParametersClearColor(d,f.r,f.g,f.b,f.a)}return this.setRenderPassParametersClearDepthStencil(s,c),this},e.prototype.submitPass=function(e){Y(this.currentRenderPassDescriptor!==null),this.endPass(),this.currentRenderPassDescriptor=this.currentRenderPassDescriptorStack.length?this.currentRenderPassDescriptorStack.pop():null},e.prototype.copySubTexture2D=function(e,t,n,r,i,a){var o=this.gl,s=e,c=r;if(Y(c.mipLevelCount===1),Y(s.mipLevelCount===1),Z(o))s===this.scTexture?o.bindFramebuffer(o.DRAW_FRAMEBUFFER,this.scPlatformFramebuffer):(o.bindFramebuffer(o.DRAW_FRAMEBUFFER,this.resolveColorDrawFramebuffer),this.bindFramebufferAttachment(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,s,0)),o.bindFramebuffer(o.READ_FRAMEBUFFER,this.resolveColorReadFramebuffer),this.bindFramebufferAttachment(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,c,0),o.blitFramebuffer(i,a,i+c.width,a+c.height,t,n,t+c.width,n+c.height,o.COLOR_BUFFER_BIT,o.LINEAR),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null);else if(s===this.scTexture){var l=this.createRenderTargetFromTexture(r);this.submitBlitRenderPass(l,s)}},e.prototype.queryLimits=function(){return this},e.prototype.queryTextureFormatSupported=function(e,t,n){switch(e){case J.BC1_SRGB:case J.BC2_SRGB:case J.BC3_SRGB:return this.WEBGL_compressed_texture_s3tc_srgb!==null&&ua(t,n,4,4);case J.BC1:case J.BC2:case J.BC3:return this.WEBGL_compressed_texture_s3tc!==null&&ua(t,n,4,4);case J.BC4_UNORM:case J.BC4_SNORM:case J.BC5_UNORM:case J.BC5_SNORM:return this.EXT_texture_compression_rgtc!==null&&ua(t,n,4,4);case J.U16_R_NORM:case J.U16_RG_NORM:case J.U16_RGBA_NORM:return this.EXT_texture_norm16!==null;case J.F32_R:case J.F32_RG:case J.F32_RGB:case J.F32_RGBA:return this.OES_texture_float_linear!==null;case J.F16_R:case J.F16_RG:case J.F16_RGB:case J.F16_RGBA:return this.OES_texture_half_float_linear!==null;default:return!0}},e.prototype.queryProgramReady=function(e){var t=this.gl;if(e.compileState===ha.NeedsCompile)throw Error(`whoops`);if(e.compileState===ha.Compiling){var n=void 0;return n=this.KHR_parallel_shader_compile===null||t.getProgramParameter(e.gl_program,this.KHR_parallel_shader_compile.COMPLETION_STATUS_KHR),n&&this.programCompiled(e),n}return e.compileState===ha.NeedsBind||e.compileState===ha.ReadyToUse},e.prototype.queryPlatformAvailable=function(){return this.gl.isContextLost()},e.prototype.queryVendorInfo=function(){return this},e.prototype.queryRenderPass=function(e){return this.currentRenderPassDescriptor},e.prototype.queryRenderTarget=function(e){return e},e.prototype.setResourceName=function(e,t){if(e.name=t,e.type===B.Buffer)for(var n=e.gl_buffer_pages,r=0;r<n.length;r++)aa(n[r],`${t} Page ${r}`);else if(e.type===B.Texture)aa(ra(e),t);else if(e.type===B.Sampler)aa(ia(e),t);else if(e.type===B.RenderTarget){var i=e.gl_renderbuffer;i!==null&&aa(i,t)}else e.type===B.InputLayout&&aa(e.vao,t)},e.prototype.setResourceLeakCheck=function(e,t){this.resourceCreationTracker!==null&&this.resourceCreationTracker.setResourceLeakCheck(e,t)},e.prototype.checkForLeaks=function(){this.resourceCreationTracker!==null&&this.resourceCreationTracker.checkForLeaks()},e.prototype.pushDebugGroup=function(e){},e.prototype.popDebugGroup=function(){},e.prototype.insertDebugMarker=function(e){},e.prototype.programPatched=function(e,t){Y(this.shaderDebug)},e.prototype.getBufferData=function(e,t,n){n===void 0&&(n=0);var r=this.gl;Z(r)&&(r.bindBuffer(r.COPY_READ_BUFFER,na(e,n*4)),r.getBufferSubData(r.COPY_READ_BUFFER,n*4,t))},e.prototype.debugGroupStatisticsDrawCall=function(e){e===void 0&&(e=1);for(var t=this.debugGroupStack.length-1;t>=0;t--)this.debugGroupStack[t].drawCallCount+=e},e.prototype.debugGroupStatisticsBufferUpload=function(e){e===void 0&&(e=1);for(var t=this.debugGroupStack.length-1;t>=0;t--)this.debugGroupStack[t].bufferUploadCount+=e},e.prototype.debugGroupStatisticsTextureBind=function(e){e===void 0&&(e=1);for(var t=this.debugGroupStack.length-1;t>=0;t--)this.debugGroupStack[t].textureBindCount+=e},e.prototype.debugGroupStatisticsTriangles=function(e){for(var t=this.debugGroupStack.length-1;t>=0;t--)this.debugGroupStack[t].triangleCount+=e},e.prototype.reportShaderError=function(e,t){var n=this.gl,r=n.getShaderParameter(e,n.COMPILE_STATUS);if(!r){console.error(Ar(t));var i=n.getExtension(`WEBGL_debug_shaders`);i&&console.error(i.getTranslatedShaderSource(e)),console.error(n.getShaderInfoLog(e))}return r},e.prototype.checkProgramCompilationForErrors=function(e){var t=this.gl,n=e.gl_program;if(!t.getProgramParameter(n,t.LINK_STATUS)){var r=e.descriptor;if(!this.reportShaderError(e.gl_shader_vert,r.vertex.glsl)||!this.reportShaderError(e.gl_shader_frag,r.fragment.glsl))return;console.error(t.getProgramInfoLog(e.gl_program))}},e.prototype.bindFramebufferAttachment=function(e,t,n,r){var i=this.gl;if(Ae(n))i.framebufferRenderbuffer(e,t,i.RENDERBUFFER,null);else if(n.type===B.RenderTarget)n.gl_renderbuffer===null?n.texture!==null&&i.framebufferTexture2D(e,t,z.TEXTURE_2D,ra(n.texture),r):i.framebufferRenderbuffer(e,t,i.RENDERBUFFER,n.gl_renderbuffer);else if(n.type===B.Texture){var a=ra(n);n.dimension===U.TEXTURE_2D?i.framebufferTexture2D(e,t,z.TEXTURE_2D,a,r):Z(i)&&(n.dimension,U.TEXTURE_2D_ARRAY)}},e.prototype.bindFramebufferDepthStencilAttachment=function(e,t){var n=this.gl,r=Ae(t)?K.Depth|K.Stencil:sr(t.format),i=!!(r&K.Depth),a=!!(r&K.Stencil);i&&a?Z(this.gl)||!Z(this.gl)&&this.WEBGL_depth_texture?this.bindFramebufferAttachment(e,n.DEPTH_STENCIL_ATTACHMENT,t,0):this.bindFramebufferAttachment(e,n.DEPTH_ATTACHMENT,t,0):i?(this.bindFramebufferAttachment(e,n.DEPTH_ATTACHMENT,t,0),this.bindFramebufferAttachment(e,n.STENCIL_ATTACHMENT,null,0)):a&&(this.bindFramebufferAttachment(e,n.STENCIL_ATTACHMENT,t,0),this.bindFramebufferAttachment(e,n.DEPTH_ATTACHMENT,null,0))},e.prototype.validateCurrentAttachments=function(){for(var e=-1,t=-1,n=-1,r=0;r<this.currentColorAttachments.length;r++){var i=this.currentColorAttachments[r];i!==null&&(e===-1?(e=i.sampleCount,t=i.width,n=i.height):(Y(e===i.sampleCount),Y(t===i.width),Y(n===i.height)))}this.currentDepthStencilAttachment&&(e===-1?e=this.currentDepthStencilAttachment.sampleCount:(Y(e===this.currentDepthStencilAttachment.sampleCount),Y(t===this.currentDepthStencilAttachment.width),Y(n===this.currentDepthStencilAttachment.height))),this.currentSampleCount=e},e.prototype.setRenderPassParametersBegin=function(e,t){t===void 0&&(t=!1);var n=this.gl;if(t)n.bindFramebuffer(z.FRAMEBUFFER,null);else if(Z(n)?n.bindFramebuffer(z.DRAW_FRAMEBUFFER,this.renderPassDrawFramebuffer):this.inBlitRenderPass||n.bindFramebuffer(z.FRAMEBUFFER,this.renderPassDrawFramebuffer),Z(n)?n.drawBuffers([z.COLOR_ATTACHMENT0,z.COLOR_ATTACHMENT1,z.COLOR_ATTACHMENT2,z.COLOR_ATTACHMENT3]):!this.inBlitRenderPass&&this.WEBGL_draw_buffers&&this.WEBGL_draw_buffers.drawBuffersWEBGL([z.COLOR_ATTACHMENT0_WEBGL,z.COLOR_ATTACHMENT1_WEBGL,z.COLOR_ATTACHMENT2_WEBGL,z.COLOR_ATTACHMENT3_WEBGL]),!this.inBlitRenderPass)for(var r=e;r<this.currentColorAttachments.length;r++){var i=Z(n)?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,a=Z(n)?z.COLOR_ATTACHMENT0:z.COLOR_ATTACHMENT0_WEBGL;n.framebufferRenderbuffer(i,a+r,z.RENDERBUFFER,null),n.framebufferTexture2D(i,a+r,z.TEXTURE_2D,null,0)}this.currentColorAttachments.length=e},e.prototype.setRenderPassParametersColor=function(e,t,n,r,i,a){a===void 0&&(a=!1);var o=this.gl,s=Z(o);(this.currentColorAttachments[e]!==t||this.currentColorAttachmentLevels[e]!==n)&&(this.currentColorAttachments[e]=t,this.currentColorAttachmentLevels[e]=n,!a&&(s||!s&&this.WEBGL_draw_buffers)&&this.bindFramebufferAttachment(s?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,(s?z.COLOR_ATTACHMENT0:z.COLOR_ATTACHMENT0_WEBGL)+e,t,n),this.resolveColorAttachmentsChanged=!0),(this.currentColorResolveTos[e]!==r||this.currentColorResolveToLevels[e]!==i)&&(this.currentColorResolveTos[e]=r,this.currentColorResolveToLevels[e]=i,r!==null&&(this.resolveColorAttachmentsChanged=!0))},e.prototype.setRenderPassParametersDepthStencil=function(e,t,n){n===void 0&&(n=!1);var r=this.gl;this.currentDepthStencilAttachment!==e&&(this.currentDepthStencilAttachment=e,!n&&!this.inBlitRenderPass&&this.bindFramebufferDepthStencilAttachment(Z(r)?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,this.currentDepthStencilAttachment),this.resolveDepthStencilAttachmentsChanged=!0),this.currentDepthStencilResolveTo!==t&&(this.currentDepthStencilResolveTo=t,t&&(this.resolveDepthStencilAttachmentsChanged=!0))},e.prototype.setRenderPassParametersClearColor=function(e,t,n,r,i){var a=this.gl;if(this.OES_draw_buffers_indexed!==null){var o=this.currentMegaState.attachmentsState[e];o&&o.channelWriteMask!==Zn.ALL&&(this.OES_draw_buffers_indexed.colorMaskiOES(e,!0,!0,!0,!0),o.channelWriteMask=Zn.ALL)}else{var o=this.currentMegaState.attachmentsState[0];o&&o.channelWriteMask!==Zn.ALL&&(a.colorMask(!0,!0,!0,!0),o.channelWriteMask=Zn.ALL)}this.setScissorRectEnabled(!1),Z(a)?a.clearBufferfv(a.COLOR,e,[t,n,r,i]):(a.clearColor(t,n,r,i),a.clear(a.COLOR_BUFFER_BIT))},e.prototype.setRenderPassParametersClearDepthStencil=function(e,t){e===void 0&&(e=`load`),t===void 0&&(t=`load`);var n=this.gl;e!==`load`&&(Y(!!this.currentDepthStencilAttachment),this.currentMegaState.depthWrite||(n.depthMask(!0),this.currentMegaState.depthWrite=!0),Z(n)?n.clearBufferfv(n.DEPTH,0,[e]):(n.clearDepth(e),n.clear(n.DEPTH_BUFFER_BIT))),t!==`load`&&(Y(!!this.currentDepthStencilAttachment),this.currentMegaState.stencilWrite||(n.enable(n.STENCIL_TEST),n.stencilMask(255),this.currentMegaState.stencilWrite=!0),Z(n)?n.clearBufferiv(n.STENCIL,0,[t]):(n.clearStencil(t),n.clear(n.STENCIL_BUFFER_BIT)))},e.prototype.setBindings=function(e){var t=this,n;if(this.renderBundle)this.renderBundle.push(function(){return t.setBindings(e)});else{var r=this.gl,i=e,a=i.uniformBufferBindings,o=i.samplerBindings,s=i.bindingLayouts;Y(0<s.bindingLayoutTables.length);var c=s.bindingLayoutTables[0];Y(a.length>=c.numUniformBuffers),Y(o.length>=c.numSamplers);for(var l=0;l<a.length;l++){var u=a[l];if(u.size!==0){var d=c.firstUniformBuffer+l,f=u.buffer,p=u.offset||0,m=u.size||f.byteSize;if(f!==this.currentUniformBuffers[d]||p!==this.currentUniformBufferByteOffsets[d]||m!==this.currentUniformBufferByteSizes[d]){var h=p%f.pageByteSize,g=f.gl_buffer_pages[p/f.pageByteSize|0];Y(h+m<=f.pageByteSize),Z(r)&&r.bindBufferRange(r.UNIFORM_BUFFER,d,g,h,m),this.currentUniformBuffers[d]=f,this.currentUniformBufferByteOffsets[d]=p,this.currentUniformBufferByteSizes[d]=m}}}for(var l=0;l<c.numSamplers;l++){var u=o[l],_=c.firstSampler+l,v=u!==null&&u.sampler!==null?ia(u.sampler):null,y=u!==null&&u.texture!==null?ra(u.texture):null;if(this.currentSamplers[_]!==v&&(Z(r)&&r.bindSampler(_,v),this.currentSamplers[_]=v),this.currentTextures[_]!==y){if(this.setActiveTexture(r.TEXTURE0+_),y!==null){var b=fr(u).texture,x=b.gl_target,S=b.width,C=b.height;u.texture.textureIndex=_,r.bindTexture(x,y),Z(r)||(n=u.sampler)==null||n.setTextureParameters(x,S,C),this.debugGroupStatisticsTextureBind()}else{var w=Be(Be({},u),Wr),T=w.dimension,E=w.formatKind,x=la(T);r.bindTexture(x,this.getFallbackTexture(Be({gl_target:x,formatKind:E},w)))}this.currentTextures[_]=y}}}},e.prototype.setViewport=function(e,t,n,r){this.gl.viewport(e,t,n,r)},e.prototype.setScissorRect=function(e,t,n,r){var i=this.gl;this.setScissorRectEnabled(!0),i.scissor(e,t,n,r)},e.prototype.applyAttachmentStateIndexed=function(e,t,n){var r=this.gl,i=this.OES_draw_buffers_indexed;t.channelWriteMask!==n.channelWriteMask&&(i.colorMaskiOES(e,!!(n.channelWriteMask&Zn.RED),!!(n.channelWriteMask&Zn.GREEN),!!(n.channelWriteMask&Zn.BLUE),!!(n.channelWriteMask&Zn.ALPHA)),t.channelWriteMask=n.channelWriteMask);var a=t.rgbBlendState.blendMode!==n.rgbBlendState.blendMode||t.alphaBlendState.blendMode!==n.alphaBlendState.blendMode,o=t.rgbBlendState.blendSrcFactor!==n.rgbBlendState.blendSrcFactor||t.alphaBlendState.blendSrcFactor!==n.alphaBlendState.blendSrcFactor||t.rgbBlendState.blendDstFactor!==n.rgbBlendState.blendDstFactor||t.alphaBlendState.blendDstFactor!==n.alphaBlendState.blendDstFactor;(o||a)&&(sa(t.rgbBlendState)&&sa(t.alphaBlendState)?i.enableiOES(e,r.BLEND):sa(n.rgbBlendState)&&sa(n.alphaBlendState)&&i.disableiOES(e,r.BLEND)),a&&(i.blendEquationSeparateiOES(e,n.rgbBlendState.blendMode,n.alphaBlendState.blendMode),t.rgbBlendState.blendMode=n.rgbBlendState.blendMode,t.alphaBlendState.blendMode=n.alphaBlendState.blendMode),o&&(i.blendFuncSeparateiOES(e,n.rgbBlendState.blendSrcFactor,n.rgbBlendState.blendDstFactor,n.alphaBlendState.blendSrcFactor,n.alphaBlendState.blendDstFactor),t.rgbBlendState.blendSrcFactor=n.rgbBlendState.blendSrcFactor,t.alphaBlendState.blendSrcFactor=n.alphaBlendState.blendSrcFactor,t.rgbBlendState.blendDstFactor=n.rgbBlendState.blendDstFactor,t.alphaBlendState.blendDstFactor=n.alphaBlendState.blendDstFactor)},e.prototype.applyAttachmentState=function(e,t){var n=this.gl;e.channelWriteMask!==t.channelWriteMask&&(n.colorMask(!!(t.channelWriteMask&Zn.RED),!!(t.channelWriteMask&Zn.GREEN),!!(t.channelWriteMask&Zn.BLUE),!!(t.channelWriteMask&Zn.ALPHA)),e.channelWriteMask=t.channelWriteMask);var r=e.rgbBlendState.blendMode!==t.rgbBlendState.blendMode||e.alphaBlendState.blendMode!==t.alphaBlendState.blendMode,i=e.rgbBlendState.blendSrcFactor!==t.rgbBlendState.blendSrcFactor||e.alphaBlendState.blendSrcFactor!==t.alphaBlendState.blendSrcFactor||e.rgbBlendState.blendDstFactor!==t.rgbBlendState.blendDstFactor||e.alphaBlendState.blendDstFactor!==t.alphaBlendState.blendDstFactor;(i||r)&&(sa(e.rgbBlendState)&&sa(e.alphaBlendState)?n.enable(n.BLEND):sa(t.rgbBlendState)&&sa(t.alphaBlendState)&&n.disable(n.BLEND)),r&&(n.blendEquationSeparate(t.rgbBlendState.blendMode,t.alphaBlendState.blendMode),e.rgbBlendState.blendMode=t.rgbBlendState.blendMode,e.alphaBlendState.blendMode=t.alphaBlendState.blendMode),i&&(n.blendFuncSeparate(t.rgbBlendState.blendSrcFactor,t.rgbBlendState.blendDstFactor,t.alphaBlendState.blendSrcFactor,t.alphaBlendState.blendDstFactor),e.rgbBlendState.blendSrcFactor=t.rgbBlendState.blendSrcFactor,e.alphaBlendState.blendSrcFactor=t.alphaBlendState.blendSrcFactor,e.rgbBlendState.blendDstFactor=t.rgbBlendState.blendDstFactor,e.alphaBlendState.blendDstFactor=t.alphaBlendState.blendDstFactor)},e.prototype.setMegaState=function(e){var t=this.gl,n=this.currentMegaState;if(this.OES_draw_buffers_indexed!==null)for(var r=0;r<e.attachmentsState.length;r++)this.applyAttachmentStateIndexed(r,n.attachmentsState[0],e.attachmentsState[0]);else Y(e.attachmentsState.length===1),this.applyAttachmentState(n.attachmentsState[0],e.attachmentsState[0]);pr(n.blendConstant,e.blendConstant)||(t.blendColor(e.blendConstant.r,e.blendConstant.g,e.blendConstant.b,e.blendConstant.a),mr(n.blendConstant,e.blendConstant)),n.depthCompare!==e.depthCompare&&(t.depthFunc(e.depthCompare),n.depthCompare=e.depthCompare),!!n.depthWrite!=!!e.depthWrite&&(t.depthMask(e.depthWrite),n.depthWrite=e.depthWrite),!!n.stencilWrite!=!!e.stencilWrite&&(t.stencilMask(e.stencilWrite?255:0),n.stencilWrite=e.stencilWrite);var i=!1;if(!$r(n.stencilFront,e.stencilFront)){i=!0;var a=e.stencilFront,o=a.passOp,s=a.failOp,c=a.depthFailOp,l=a.compare;(n.stencilFront.passOp!==o||n.stencilFront.failOp!==s||n.stencilFront.depthFailOp!==c)&&(t.stencilOpSeparate(t.FRONT,s,c,o),n.stencilFront.passOp=o,n.stencilFront.failOp=s,n.stencilFront.depthFailOp=c),n.stencilFront.compare!==l&&(this.setStencilReference(0),n.stencilFront.compare=l)}if(!$r(n.stencilBack,e.stencilBack)){i=!0;var u=e.stencilBack,o=u.passOp,s=u.failOp,c=u.depthFailOp,l=u.compare;(n.stencilBack.passOp!==o||n.stencilBack.failOp!==s||n.stencilBack.depthFailOp!==c)&&(t.stencilOpSeparate(t.BACK,s,c,o),n.stencilBack.passOp=o,n.stencilBack.failOp=s,n.stencilBack.depthFailOp=c),n.stencilBack.compare!==l&&(this.setStencilReference(0),n.stencilBack.compare=l)}(n.stencilFront.mask!==e.stencilFront.mask||n.stencilBack.mask!==e.stencilBack.mask)&&(i=!0,n.stencilFront.mask=e.stencilFront.mask,n.stencilBack.mask=e.stencilBack.mask),i&&this.applyStencil(),n.cullMode!==e.cullMode&&(n.cullMode===Vn.NONE?t.enable(t.CULL_FACE):e.cullMode===Vn.NONE&&t.disable(t.CULL_FACE),e.cullMode===Vn.BACK?t.cullFace(t.BACK):e.cullMode===Vn.FRONT?t.cullFace(t.FRONT):e.cullMode===Vn.FRONT_AND_BACK&&t.cullFace(t.FRONT_AND_BACK),n.cullMode=e.cullMode),n.frontFace!==e.frontFace&&(t.frontFace(e.frontFace),n.frontFace=e.frontFace),n.polygonOffset!==e.polygonOffset&&(e.polygonOffset?t.enable(t.POLYGON_OFFSET_FILL):t.disable(t.POLYGON_OFFSET_FILL),n.polygonOffset=e.polygonOffset),(n.polygonOffsetFactor!==e.polygonOffsetFactor||n.polygonOffsetUnits!==e.polygonOffsetUnits)&&(t.polygonOffset(e.polygonOffsetFactor,e.polygonOffsetUnits),n.polygonOffsetFactor=e.polygonOffsetFactor,n.polygonOffsetUnits=e.polygonOffsetUnits)},e.prototype.validatePipelineFormats=function(e){for(var t=0;t<this.currentColorAttachments.length;t++)if(this.currentColorAttachments[t]===null)continue;this.currentDepthStencilAttachment&&Y(this.currentDepthStencilAttachment.format===e.depthStencilAttachmentFormat),this.currentSampleCount!==-1&&Y(this.currentSampleCount===e.sampleCount)},e.prototype.setPipeline=function(e){var t=this;if(this.renderBundle)this.renderBundle.push(function(){return t.setPipeline(e)});else{this.currentPipeline=e,this.validatePipelineFormats(this.currentPipeline),this.setMegaState(this.currentPipeline.megaState);var n=this.currentPipeline.program;if(this.useProgram(n),n.compileState===ha.NeedsBind){var r=this.gl,i=n.gl_program,a=n.descriptor,o=oa(a.vertex.glsl,Ea);if(Z(r))for(var s=0;s<o.length;s++){var c=Re(o[s],2)[1],l=r.getUniformBlockIndex(i,c);l!==-1&&l!==4294967295&&r.uniformBlockBinding(i,l,s)}for(var u=oa(a.fragment.glsl,/^uniform .*sampler\S+ (\w+);\s* \/\/ BINDING=(\d+)$/gm),s=0;s<u.length;s++){var d=Re(u[s],3),f=d[1],p=d[2],m=r.getUniformLocation(i,f);r.uniform1i(m,parseInt(p))}n.compileState=ha.ReadyToUse}}},e.prototype.setVertexInput=function(e,t,n){var r,i,a=this;if(this.renderBundle)this.renderBundle.push(function(){return a.setVertexInput(e,t,n)});else if(e!==null){Y(this.currentPipeline.inputLayout===e);var o=e;this.bindVAO(o.vao);for(var s=this.gl,c=0;c<o.vertexBufferDescriptors.length;c++){var l=o.vertexBufferDescriptors[c],u=l.arrayStride,d=l.attributes;try{for(var f=(r=void 0,Ve(d)),p=f.next();!p.done;p=f.next()){var m=p.value,h=m.shaderLocation,g=m.offset,_=Z(s)?h:o.program.attributes[h]?.location;if(!Ae(_)){var v=t[c];if(v===null)continue;var y=m.vertexFormat;s.bindBuffer(s.ARRAY_BUFFER,na(v.buffer));var b=(v.offset||0)+g;s.vertexAttribPointer(_,y.size,y.type,y.normalized,u,b)}}}catch(e){r={error:e}}finally{try{p&&!p.done&&(i=f.return)&&i.call(f)}finally{if(r)throw r.error}}}if(Y(n!==null==(o.indexBufferFormat!==null)),n!==null){var x=n.buffer;Y(x.usage===V.INDEX),s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,na(x)),this.currentIndexBufferByteOffset=n.offset||0}else this.currentIndexBufferByteOffset=null}else Y(this.currentPipeline.inputLayout===null),Y(n===null),this.bindVAO(null),this.currentIndexBufferByteOffset=0},e.prototype.setStencilReference=function(e){this.currentStencilRef!==e&&(this.currentStencilRef=e,this.applyStencil())},e.prototype.draw=function(e,t,n,r){var i,a=this;if(this.renderBundle)this.renderBundle.push(function(){return a.draw(e,t,n,r)});else{var o=this.gl,s=this.currentPipeline;if(t){var c=[s.drawMode,n||0,e,t];Z(o)?o.drawArraysInstanced.apply(o,Fe([],Re(c),!1)):(i=this.ANGLE_instanced_arrays).drawArraysInstancedANGLE.apply(i,Fe([],Re(c),!1))}else o.drawArrays(s.drawMode,n,e);this.debugGroupStatisticsDrawCall(),this.debugGroupStatisticsTriangles(e/3*Math.max(t,1))}},e.prototype.drawIndexed=function(e,t,n,r,i){var a,o=this;if(this.renderBundle)this.renderBundle.push(function(){return o.drawIndexed(e,t,n,r,i)});else{var s=this.gl,c=this.currentPipeline,l=fr(c.inputLayout),u=fr(this.currentIndexBufferByteOffset)+n*l.indexBufferCompByteSize;if(t){var d=[c.drawMode,e,l.indexBufferType,u,t];Z(s)?s.drawElementsInstanced.apply(s,Fe([],Re(d),!1)):(a=this.ANGLE_instanced_arrays).drawElementsInstancedANGLE.apply(a,Fe([],Re(d),!1))}else s.drawElements(c.drawMode,e,l.indexBufferType,u);this.debugGroupStatisticsDrawCall(),this.debugGroupStatisticsTriangles(e/3*Math.max(t,1))}},e.prototype.drawIndirect=function(e,t){},e.prototype.drawIndexedIndirect=function(e,t){},e.prototype.beginOcclusionQuery=function(e){var t=this.gl;if(Z(t)){var n=this.currentRenderPassDescriptor.occlusionQueryPool;t.beginQuery(n.gl_query_type,n.gl_query[e])}},e.prototype.endOcclusionQuery=function(){var e=this.gl;if(Z(e)){var t=this.currentRenderPassDescriptor.occlusionQueryPool;e.endQuery(t.gl_query_type)}},e.prototype.pipelineQueryReady=function(e){var t=e;return this.queryProgramReady(t.program)},e.prototype.pipelineForceReady=function(e){},e.prototype.endPass=function(){for(var e=this.gl,t=Z(e),n=this.currentColorResolveTos.length===1&&this.currentColorResolveTos[0]===this.scTexture,r=!1,i=0;i<this.currentColorAttachments.length;i++){var a=this.currentColorAttachments[i];if(a!==null){var o=this.currentColorResolveTos[i],s=!1;o!==null&&(Y(a.width===o.width&&a.height===o.height),this.setScissorRectEnabled(!1),n||(t&&e.bindFramebuffer(e.READ_FRAMEBUFFER,this.resolveColorReadFramebuffer),this.resolveColorAttachmentsChanged&&t&&this.bindFramebufferAttachment(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,a,this.currentColorAttachmentLevels[i])),s=!0,n||(o===this.scTexture?e.bindFramebuffer(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,this.scPlatformFramebuffer):(e.bindFramebuffer(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,this.resolveColorDrawFramebuffer),this.resolveColorAttachmentsChanged&&e.framebufferTexture2D(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o.gl_texture,this.currentColorResolveToLevels[i]))),n||(t?(e.blitFramebuffer(0,0,a.width,a.height,0,0,o.width,o.height,e.COLOR_BUFFER_BIT,e.LINEAR),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null)):this.submitBlitRenderPass(a,o)),r=!0),this.currentRenderPassDescriptor.colorStore[i]||!n&&!s&&(e.bindFramebuffer(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,this.resolveColorReadFramebuffer),this.resolveColorAttachmentsChanged&&this.bindFramebufferAttachment(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,e.COLOR_ATTACHMENT0,a,this.currentColorAttachmentLevels[i])),n||e.bindFramebuffer(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,null)}}this.resolveColorAttachmentsChanged=!1;var c=this.currentDepthStencilAttachment;if(c){var l=this.currentDepthStencilResolveTo,s=!1;l&&(Y(c.width===l.width&&c.height===l.height),this.setScissorRectEnabled(!1),n||(e.bindFramebuffer(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,this.resolveDepthStencilReadFramebuffer),e.bindFramebuffer(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,this.resolveDepthStencilDrawFramebuffer),this.resolveDepthStencilAttachmentsChanged&&(this.bindFramebufferDepthStencilAttachment(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,c),this.bindFramebufferDepthStencilAttachment(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,l))),s=!0,n||(t&&e.blitFramebuffer(0,0,c.width,c.height,0,0,l.width,l.height,e.DEPTH_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,null)),r=!0),!n&&!this.currentRenderPassDescriptor.depthStencilStore&&(s||=(e.bindFramebuffer(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,this.resolveDepthStencilReadFramebuffer),this.resolveDepthStencilAttachmentsChanged&&this.bindFramebufferDepthStencilAttachment(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,c),!0),t&&e.invalidateFramebuffer(e.READ_FRAMEBUFFER,[e.DEPTH_STENCIL_ATTACHMENT])),!n&&s&&e.bindFramebuffer(t?z.READ_FRAMEBUFFER:z.FRAMEBUFFER,null),this.resolveDepthStencilAttachmentsChanged=!1}!n&&!r&&e.bindFramebuffer(t?z.DRAW_FRAMEBUFFER:z.FRAMEBUFFER,null)},e.prototype.setScissorRectEnabled=function(e){if(this.currentScissorEnabled!==e){var t=this.gl;e?t.enable(t.SCISSOR_TEST):t.disable(t.SCISSOR_TEST),this.currentScissorEnabled=e}},e.prototype.applyStencil=function(){Ae(this.currentStencilRef)||(this.gl.stencilFuncSeparate(z.FRONT,this.currentMegaState.stencilFront.compare,this.currentStencilRef,this.currentMegaState.stencilFront.mask||255),this.gl.stencilFuncSeparate(z.BACK,this.currentMegaState.stencilBack.compare,this.currentStencilRef,this.currentMegaState.stencilBack.mask||255))},e.prototype.getFallbackTexture=function(e){var t=e.gl_target,n=e.formatKind;if(t===z.TEXTURE_2D)return n===er.Depth?this.fallbackTexture2DDepth:this.fallbackTexture2D;if(t===z.TEXTURE_2D_ARRAY)return this.fallbackTexture2DArray;if(t===z.TEXTURE_3D)return this.fallbackTexture3D;if(t===z.TEXTURE_CUBE_MAP)return this.fallbackTextureCube;throw Error(`whoops`)},e.prototype.submitBlitRenderPass=function(e,t){this.blitRenderPipeline||(this.blitProgram=this.createProgram({vertex:{glsl:`layout(location = 0) in vec2 a_Position;
out vec2 v_TexCoord;
void main() {
  v_TexCoord = 0.5 * (a_Position + 1.0);
  gl_Position = vec4(a_Position, 0., 1.);

  #ifdef VIEWPORT_ORIGIN_TL
    v_TexCoord.y = 1.0 - v_TexCoord.y;
  #endif
}`},fragment:{glsl:`uniform sampler2D u_Texture;
in vec2 v_TexCoord;
out vec4 outputColor;
void main() {
  outputColor = texture(SAMPLER_2D(u_Texture), v_TexCoord);
}`}}),this.blitVertexBuffer=this.createBuffer({usage:V.VERTEX|V.COPY_DST,viewOrSize:new Float32Array([-4,-4,4,-4,0,4])}),this.blitInputLayout=this.createInputLayout({vertexBufferDescriptors:[{arrayStride:8,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,offset:0,shaderLocation:0}]}],indexBufferFormat:null,program:this.blitProgram}),this.blitRenderPipeline=this.createRenderPipeline({topology:qn.TRIANGLES,sampleCount:1,program:this.blitProgram,colorAttachmentFormats:[J.U8_RGBA_RT],depthStencilAttachmentFormat:null,inputLayout:this.blitInputLayout,megaStateDescriptor:Lr(Br)}),this.blitBindings=this.createBindings({samplerBindings:[{sampler:null,texture:e.texture}],uniformBufferBindings:[]}),this.blitProgram.setUniformsLegacy({u_Texture:e}));var n=this.currentRenderPassDescriptor;this.currentRenderPassDescriptor=null,this.inBlitRenderPass=!0;var r=this.createRenderPass({colorAttachment:[e],colorResolveTo:[t],colorClearColor:[vr]}),i=this.getCanvas(),a=i.width,o=i.height;r.setPipeline(this.blitRenderPipeline),r.setBindings(this.blitBindings),r.setVertexInput(this.blitInputLayout,[{buffer:this.blitVertexBuffer}],null),r.setViewport(0,0,a,o),this.gl.disable(this.gl.BLEND),r.draw(3,0),this.gl.enable(this.gl.BLEND),this.currentRenderPassDescriptor=n,this.inBlitRenderPass=!1},e}(),Oa=function(){function e(e){this.pluginOptions=e}return e.prototype.createSwapChain=function(e){return Le(this,void 0,void 0,function(){var t,n,r,i,a,o,s,c,l,u,d,f,p;return Pe(this,function(m){return t=this.pluginOptions,n=t.targets,r=t.xrCompatible,i=t.antialias,a=i!==void 0&&i,o=t.preserveDrawingBuffer,s=o!==void 0&&o,c=t.premultipliedAlpha,l=c===void 0||c,u=t.shaderDebug,d=t.trackResources,f={antialias:a,preserveDrawingBuffer:s,stencil:!0,premultipliedAlpha:l,xrCompatible:r},this.handleContextEvents(e),n.includes(`webgl2`)&&(p=e.getContext(`webgl2`,f)||e.getContext(`experimental-webgl2`,f)),!p&&n.includes(`webgl1`)&&(p=e.getContext(`webgl`,f)||e.getContext(`experimental-webgl`,f)),[2,new Da(p,{shaderDebug:u,trackResources:d})]})})},e.prototype.handleContextEvents=function(e){var t=this.pluginOptions,n=t.onContextLost,r=t.onContextRestored,i=t.onContextCreationError;i&&e.addEventListener(`webglcontextcreationerror`,i,!1),n&&e.addEventListener(`webglcontextlost`,n,!1),r&&e.addEventListener(`webglcontextrestored`,r,!1)},e}(),ka,Aa=typeof TextDecoder<`u`?new TextDecoder(`utf-8`,{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error(`TextDecoder not available`)}};typeof TextDecoder<`u`&&Aa.decode();var ja=null;function Ma(){return(ja===null||ja.byteLength===0)&&(ja=new Uint8Array(ka.memory.buffer)),ja}function Na(e,t){return e>>>=0,Aa.decode(Ma().subarray(e,e+t))}var Pa=Array(128).fill(void 0);Pa.push(void 0,null,!0,!1);var Fa=Pa.length;function Ia(e){Fa===Pa.length&&Pa.push(Pa.length+1);let t=Fa;return Fa=Pa[t],Pa[t]=e,t}function La(e){return Pa[e]}function Ra(e){e<132||(Pa[e]=Fa,Fa=e)}function za(e){let t=La(e);return Ra(e),t}var Ba=0,Va=typeof TextEncoder<`u`?new TextEncoder(`utf-8`):{encode:()=>{throw Error(`TextEncoder not available`)}},Ha=typeof Va.encodeInto==`function`?function(e,t){return Va.encodeInto(e,t)}:function(e,t){let n=Va.encode(e);return t.set(n),{read:e.length,written:n.length}};function Ua(e,t,n){if(n===void 0){let n=Va.encode(e),r=t(n.length,1)>>>0;return Ma().subarray(r,r+n.length).set(n),Ba=n.length,r}let r=e.length,i=t(r,1)>>>0,a=Ma(),o=0;for(;o<r;o++){let t=e.charCodeAt(o);if(t>127)break;a[i+o]=t}if(o!==r){o!==0&&(e=e.slice(o)),i=n(i,r,r=o+e.length*3,1)>>>0;let t=Ma().subarray(i+o,i+r),a=Ha(e,t);o+=a.written}return Ba=o,i}var Wa=null;function Ga(){return(Wa===null||Wa.byteLength===0)&&(Wa=new Int32Array(ka.memory.buffer)),Wa}function Ka(e,t,n){let r,i;try{let s=ka.__wbindgen_add_to_stack_pointer(-16),c=Ua(e,ka.__wbindgen_malloc,ka.__wbindgen_realloc),l=Ba,u=Ua(t,ka.__wbindgen_malloc,ka.__wbindgen_realloc),d=Ba;ka.glsl_compile(s,c,l,u,d,n);var a=Ga()[s/4+0],o=Ga()[s/4+1];return r=a,i=o,Na(a,o)}finally{ka.__wbindgen_add_to_stack_pointer(16),ka.__wbindgen_free(r,i,1)}}var qa=class e{static __wrap(t){t>>>=0;let n=Object.create(e.prototype);return n.__wbg_ptr=t,n}__destroy_into_raw(){let e=this.__wbg_ptr;return this.__wbg_ptr=0,e}free(){let e=this.__destroy_into_raw();ka.__wbg_wgslcomposer_free(e)}constructor(){let t=ka.wgslcomposer_new();return e.__wrap(t)}load_composable(e){let t=Ua(e,ka.__wbindgen_malloc,ka.__wbindgen_realloc),n=Ba;ka.wgslcomposer_load_composable(this.__wbg_ptr,t,n)}wgsl_compile(e){let t,n;try{let a=ka.__wbindgen_add_to_stack_pointer(-16),o=Ua(e,ka.__wbindgen_malloc,ka.__wbindgen_realloc),s=Ba;ka.wgslcomposer_wgsl_compile(a,this.__wbg_ptr,o,s);var r=Ga()[a/4+0],i=Ga()[a/4+1];return t=r,n=i,Na(r,i)}finally{ka.__wbindgen_add_to_stack_pointer(16),ka.__wbindgen_free(t,n,1)}}};async function Ja(e,t){if(typeof Response==`function`&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming==`function`)try{return await WebAssembly.instantiateStreaming(e,t)}catch(t){if(e.headers.get(`Content-Type`)!=`application/wasm`)console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t);else throw t}let n=await e.arrayBuffer();return await WebAssembly.instantiate(n,t)}{let n=await WebAssembly.instantiate(e,t);return n instanceof WebAssembly.Instance?{instance:n,module:e}:n}}function Ya(){let e={};return e.wbg={},e.wbg.__wbindgen_string_new=function(e,t){return Ia(Na(e,t))},e.wbg.__wbindgen_object_drop_ref=function(e){za(e)},e.wbg.__wbg_log_1d3ae0273d8f4f8a=function(e){console.log(La(e))},e.wbg.__wbg_log_576ca876af0d4a77=function(e,t){console.log(La(e),La(t))},e.wbg.__wbindgen_throw=function(e,t){throw Error(Na(e,t))},e}function Xa(e,t){return ka=e.exports,Za.__wbindgen_wasm_module=t,Wa=null,ja=null,ka}async function Za(e){if(ka!==void 0)return ka;let t=Ya();(typeof e==`string`||typeof Request==`function`&&e instanceof Request||typeof URL==`function`&&e instanceof URL)&&(e=fetch(e));let{instance:n,module:r}=await Ja(await e,t);return Xa(n,r)}var Qa;(function(e){e[e.COPY_SRC=1]=`COPY_SRC`,e[e.COPY_DST=2]=`COPY_DST`,e[e.TEXTURE_BINDING=4]=`TEXTURE_BINDING`,e[e.STORAGE_BINDING=8]=`STORAGE_BINDING`,e[e.STORAGE=8]=`STORAGE`,e[e.RENDER_ATTACHMENT=16]=`RENDER_ATTACHMENT`})(Qa||={});var $a;(function(e){e[e.READ=1]=`READ`,e[e.WRITE=2]=`WRITE`})($a||={});function eo(e){var t=0;return e&Xn.SAMPLED&&(t|=Qa.TEXTURE_BINDING|Qa.COPY_DST|Qa.COPY_SRC),e&Xn.STORAGE&&(t|=Qa.TEXTURE_BINDING|Qa.STORAGE_BINDING|Qa.COPY_SRC|Qa.COPY_DST),e&Xn.RENDER_TARGET&&(t|=Qa.RENDER_ATTACHMENT|Qa.TEXTURE_BINDING|Qa.COPY_SRC|Qa.COPY_DST),t}function to(e){if(e===J.U8_R_NORM)return`r8unorm`;if(e===J.S8_R_NORM)return`r8snorm`;if(e===J.U8_RG_NORM)return`rg8unorm`;if(e===J.S8_RG_NORM)return`rg8snorm`;if(e===J.U32_R)return`r32uint`;if(e===J.S32_R)return`r32sint`;if(e===J.F32_R)return`r32float`;if(e===J.U16_RG)return`rg16uint`;if(e===J.S16_RG)return`rg16sint`;if(e===J.F16_RG)return`rg16float`;if(e===J.U8_RGBA_RT)return`bgra8unorm`;if(e===J.U8_RGBA_RT_SRGB)return`bgra8unorm-srgb`;if(e===J.U8_RGBA_NORM)return`rgba8unorm`;if(e===J.U8_RGBA_SRGB)return`rgba8unorm-srgb`;if(e===J.S8_RGBA_NORM)return`rgba8snorm`;if(e===J.U32_RG)return`rg32uint`;if(e===J.S32_RG)return`rg32sint`;if(e===J.F32_RG)return`rg32float`;if(e===J.U16_RGBA)return`rgba16uint`;if(e===J.S16_RGBA)return`rgba16sint`;if(e===J.F16_RGBA)return`rgba16float`;if(e===J.F32_RGBA)return`rgba32float`;if(e===J.U32_RGBA)return`rgba32uint`;if(e===J.S32_RGBA)return`rgba32sint`;if(e===J.D24)return`depth24plus`;if(e===J.D24_S8)return`depth24plus-stencil8`;if(e===J.D32F)return`depth32float`;if(e===J.D32F_S8)return`depth32float-stencil8`;if(e===J.BC1)return`bc1-rgba-unorm`;if(e===J.BC1_SRGB)return`bc1-rgba-unorm-srgb`;if(e===J.BC2)return`bc2-rgba-unorm`;if(e===J.BC2_SRGB)return`bc2-rgba-unorm-srgb`;if(e===J.BC3)return`bc3-rgba-unorm`;if(e===J.BC3_SRGB)return`bc3-rgba-unorm-srgb`;if(e===J.BC4_SNORM)return`bc4-r-snorm`;if(e===J.BC4_UNORM)return`bc4-r-unorm`;if(e===J.BC5_SNORM)return`bc5-rg-snorm`;if(e===J.BC5_UNORM)return`bc5-rg-unorm`;throw`whoops`}function no(e){if(e===U.TEXTURE_2D||e===U.TEXTURE_CUBE_MAP||e===U.TEXTURE_2D_ARRAY)return`2d`;if(e===U.TEXTURE_3D)return`3d`;throw Error(`whoops`)}function ro(e){if(e===U.TEXTURE_2D)return`2d`;if(e===U.TEXTURE_CUBE_MAP)return`cube`;if(e===U.TEXTURE_2D_ARRAY)return`2d-array`;if(e===U.TEXTURE_3D)return`3d`;throw Error(`whoops`)}function io(e){var t=0;return e&V.INDEX&&(t|=GPUBufferUsage.INDEX),e&V.VERTEX&&(t|=GPUBufferUsage.VERTEX),e&V.UNIFORM&&(t|=GPUBufferUsage.UNIFORM),e&V.STORAGE&&(t|=GPUBufferUsage.STORAGE),e&V.COPY_SRC&&(t|=GPUBufferUsage.COPY_SRC),e&V.INDIRECT&&(t|=GPUBufferUsage.INDIRECT),t|=GPUBufferUsage.COPY_DST,t}function ao(e){if(e===Wn.CLAMP_TO_EDGE)return`clamp-to-edge`;if(e===Wn.REPEAT)return`repeat`;if(e===Wn.MIRRORED_REPEAT)return`mirror-repeat`;throw Error(`whoops`)}function oo(e){if(e===Gn.BILINEAR)return`linear`;if(e===Gn.POINT)return`nearest`;throw Error(`whoops`)}function so(e){if(e===Kn.LINEAR)return`linear`;if(e===Kn.NEAREST||e===Kn.NO_MIP)return`nearest`;throw Error(`whoops`)}function co(e){return e.gpuBuffer}function lo(e){return e.gpuSampler}function uo(e){return e.querySet}function fo(e){if(e===rr.OcclusionConservative)return`occlusion`;throw Error(`whoops`)}function po(e){switch(e){case qn.TRIANGLES:return`triangle-list`;case qn.POINTS:return`point-list`;case qn.TRIANGLE_STRIP:return`triangle-strip`;case qn.LINES:return`line-list`;case qn.LINE_STRIP:return`line-strip`;default:throw Error(`Unknown primitive topology mode`)}}function mo(e){if(e===Vn.NONE)return`none`;if(e===Vn.FRONT)return`front`;if(e===Vn.BACK)return`back`;throw Error(`whoops`)}function ho(e){if(e===Bn.CCW)return`ccw`;if(e===Bn.CW)return`cw`;throw Error(`whoops`)}function go(e,t){return{topology:po(e),cullMode:mo(t.cullMode),frontFace:ho(t.frontFace)}}function _o(e){if(e===Hn.ZERO)return`zero`;if(e===Hn.ONE)return`one`;if(e===Hn.SRC)return`src`;if(e===Hn.ONE_MINUS_SRC)return`one-minus-src`;if(e===Hn.DST)return`dst`;if(e===Hn.ONE_MINUS_DST)return`one-minus-dst`;if(e===Hn.SRC_ALPHA)return`src-alpha`;if(e===Hn.ONE_MINUS_SRC_ALPHA)return`one-minus-src-alpha`;if(e===Hn.DST_ALPHA)return`dst-alpha`;if(e===Hn.ONE_MINUS_DST_ALPHA)return`one-minus-dst-alpha`;if(e===Hn.CONST)return`constant`;if(e===Hn.ONE_MINUS_CONSTANT)return`one-minus-constant`;if(e===Hn.SRC_ALPHA_SATURATE)return`src-alpha-saturated`;throw Error(`whoops`)}function vo(e){if(e===Un.ADD)return`add`;if(e===Un.SUBSTRACT)return`subtract`;if(e===Un.REVERSE_SUBSTRACT)return`reverse-subtract`;if(e===Un.MIN)return`min`;if(e===Un.MAX)return`max`;throw Error(`whoops`)}function yo(e){return{operation:vo(e.blendMode),srcFactor:_o(e.blendSrcFactor),dstFactor:_o(e.blendDstFactor)}}function bo(e){return e.blendMode===Un.ADD&&e.blendSrcFactor===Hn.ONE&&e.blendDstFactor===Hn.ZERO}function xo(e){if(!(bo(e.rgbBlendState)&&bo(e.alphaBlendState)))return{color:yo(e.rgbBlendState),alpha:yo(e.alphaBlendState)}}function So(e,t){return{format:to(t),blend:xo(e),writeMask:e.channelWriteMask}}function Co(e,t){return t.attachmentsState.map(function(t,n){return So(t,e[n])})}function wo(e){if(e===zn.NEVER)return`never`;if(e===zn.LESS)return`less`;if(e===zn.EQUAL)return`equal`;if(e===zn.LEQUAL)return`less-equal`;if(e===zn.GREATER)return`greater`;if(e===zn.NOTEQUAL)return`not-equal`;if(e===zn.GEQUAL)return`greater-equal`;if(e===zn.ALWAYS)return`always`;throw Error(`whoops`)}function To(e){if(e===Qn.KEEP)return`keep`;if(e===Qn.REPLACE)return`replace`;if(e===Qn.ZERO)return`zero`;if(e===Qn.DECREMENT_CLAMP)return`decrement-clamp`;if(e===Qn.DECREMENT_WRAP)return`decrement-wrap`;if(e===Qn.INCREMENT_CLAMP)return`increment-clamp`;if(e===Qn.INCREMENT_WRAP)return`increment-wrap`;if(e===Qn.INVERT)return`invert`;throw Error(`whoops`)}function Eo(e,t){if(!Ae(e))return{format:to(e),depthWriteEnabled:!!t.depthWrite,depthCompare:wo(t.depthCompare),depthBias:t.polygonOffset?t.polygonOffsetUnits:0,depthBiasSlopeScale:t.polygonOffset?t.polygonOffsetFactor:0,stencilFront:{compare:wo(t.stencilFront.compare),passOp:To(t.stencilFront.passOp),failOp:To(t.stencilFront.failOp),depthFailOp:To(t.stencilFront.depthFailOp)},stencilBack:{compare:wo(t.stencilBack.compare),passOp:To(t.stencilBack.passOp),failOp:To(t.stencilBack.failOp),depthFailOp:To(t.stencilBack.depthFailOp)},stencilReadMask:4294967295,stencilWriteMask:4294967295}}function Do(e){if(e!==null){if(e===J.U16_R)return`uint16`;if(e===J.U32_R)return`uint32`;throw Error(`whoops`)}}function Oo(e){if(e===H.VERTEX)return`vertex`;if(e===H.INSTANCE)return`instance`;throw Error(`whoops`)}function ko(e){if(e===J.U8_R||e===J.U8_RG)return`uint8x2`;if(e===J.U8_RGB||e===J.U8_RGBA)return`uint8x4`;if(e===J.U8_RG_NORM)return`unorm8x2`;if(e===J.U8_RGBA_NORM)return`unorm8x4`;if(e===J.S8_RGB_NORM||e===J.S8_RGBA_NORM)return`snorm8x4`;if(e===J.U16_RG_NORM)return`unorm16x2`;if(e===J.U16_RGBA_NORM)return`unorm16x4`;if(e===J.S16_RG_NORM)return`snorm16x2`;if(e===J.S16_RGBA_NORM)return`snorm16x4`;if(e===J.S16_RG)return`uint16x2`;if(e===J.F16_RG)return`float16x2`;if(e===J.F16_RGBA)return`float16x4`;if(e===J.F32_R)return`float32`;if(e===J.F32_RG)return`float32x2`;if(e===J.F32_RGB)return`float32x3`;if(e===J.F32_RGBA)return`float32x4`;throw`whoops`}function Ao(e){switch(or(e)){case W.BC1:case W.BC2:case W.BC3:case W.BC4_SNORM:case W.BC4_UNORM:case W.BC5_SNORM:case W.BC5_UNORM:return!0;default:return!1}}function jo(e){switch(or(e)){case W.BC1:case W.BC2:case W.BC3:case W.BC4_SNORM:case W.BC4_UNORM:case W.BC5_SNORM:case W.BC5_UNORM:return 4;default:return 1}}function Mo(e,t,n,r){switch(n===void 0&&(n=!1),e){case J.S8_R:case J.S8_R_NORM:case J.S8_RG_NORM:case J.S8_RGB_NORM:case J.S8_RGBA_NORM:var i=(t instanceof ArrayBuffer,new Int8Array(t));return r&&i.set(new Int8Array(r)),i;case J.U8_R:case J.U8_R_NORM:case J.U8_RG:case J.U8_RG_NORM:case J.U8_RGB:case J.U8_RGB_NORM:case J.U8_RGB_SRGB:case J.U8_RGBA:case J.U8_RGBA_NORM:case J.U8_RGBA_SRGB:var a=(t instanceof ArrayBuffer,new Uint8Array(t));return r&&a.set(new Uint8Array(r)),a;case J.S16_R:case J.S16_RG:case J.S16_RG_NORM:case J.S16_RGB_NORM:case J.S16_RGBA:case J.S16_RGBA_NORM:var o=t instanceof ArrayBuffer?new Int16Array(t):new Int16Array(n?t/2:t);return r&&o.set(new Int16Array(r)),o;case J.U16_R:case J.U16_RGB:case J.U16_RGBA_5551:case J.U16_RGBA_NORM:case J.U16_RG_NORM:case J.U16_R_NORM:var s=t instanceof ArrayBuffer?new Uint16Array(t):new Uint16Array(n?t/2:t);return r&&s.set(new Uint16Array(r)),s;case J.S32_R:var c=t instanceof ArrayBuffer?new Int32Array(t):new Int32Array(n?t/4:t);return r&&c.set(new Int32Array(r)),c;case J.U32_R:case J.U32_RG:var l=t instanceof ArrayBuffer?new Uint32Array(t):new Uint32Array(n?t/4:t);return r&&l.set(new Uint32Array(r)),l;case J.F32_R:case J.F32_RG:case J.F32_RGB:case J.F32_RGBA:var u=t instanceof ArrayBuffer?new Float32Array(t):new Float32Array(n?t/4:t);return r&&u.set(new Float32Array(r)),u}var d=(t instanceof ArrayBuffer,new Uint8Array(t));return r&&d.set(new Uint8Array(r)),d}function No(e){var t=(e&32768)>>15,n=(e&31744)>>10,r=e&1023;return n===0?(t?-1:1)*2**-14*(r/1024):n==31?r?NaN:(t?-1:1)*(1/0):(t?-1:1)*2**(n-15)*(1+r/1024)}function Po(e){switch(e){case`r8unorm`:case`r8snorm`:case`r8uint`:case`r8sint`:return{width:1,height:1,length:1};case`r16uint`:case`r16sint`:case`r16float`:case`rg8unorm`:case`rg8snorm`:case`rg8uint`:case`rg8sint`:return{width:1,height:1,length:2};case`r32uint`:case`r32sint`:case`r32float`:case`rg16uint`:case`rg16sint`:case`rg16float`:case`rgba8unorm`:case`rgba8unorm-srgb`:case`rgba8snorm`:case`rgba8uint`:case`rgba8sint`:case`bgra8unorm`:case`bgra8unorm-srgb`:case`rgb9e5ufloat`:case`rgb10a2unorm`:case`rg11b10ufloat`:return{width:1,height:1,length:4};case`rg32uint`:case`rg32sint`:case`rg32float`:case`rgba16uint`:case`rgba16sint`:case`rgba16float`:return{width:1,height:1,length:8};case`rgba32uint`:case`rgba32sint`:case`rgba32float`:return{width:1,height:1,length:16};case`stencil8`:throw Error(`No fixed size for Stencil8 format!`);case`depth16unorm`:return{width:1,height:1,length:2};case`depth24plus`:throw Error(`No fixed size for Depth24Plus format!`);case`depth24plus-stencil8`:throw Error(`No fixed size for Depth24PlusStencil8 format!`);case`depth32float`:return{width:1,height:1,length:4};case`depth32float-stencil8`:return{width:1,height:1,length:5};case`bc7-rgba-unorm`:case`bc7-rgba-unorm-srgb`:case`bc6h-rgb-ufloat`:case`bc6h-rgb-float`:case`bc2-rgba-unorm`:case`bc2-rgba-unorm-srgb`:case`bc3-rgba-unorm`:case`bc3-rgba-unorm-srgb`:case`bc5-rg-unorm`:case`bc5-rg-snorm`:return{width:4,height:4,length:16};case`bc4-r-unorm`:case`bc4-r-snorm`:case`bc1-rgba-unorm`:case`bc1-rgba-unorm-srgb`:return{width:4,height:4,length:8};default:return{width:1,height:1,length:4}}}var Fo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=e.call(this)||this;return i.id=n,i.device=r,i}return t.prototype.destroy=function(){},t}(we),Io=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Bindings;var o=i.pipeline;Y(!!o);var s=i.uniformBufferBindings,c=i.storageBufferBindings,l=i.samplerBindings,u=i.storageTextureBindings;a.numUniformBuffers=s?.length||0;var d=[[],[],[],[]],f=0;if(s&&s.length)for(var p=0;p<s.length;p++){var m=i.uniformBufferBindings[p],h=m.binding,g=m.size,_=m.offset,v=m.buffer,y={buffer:co(v),offset:_??0,size:g};d[0].push({binding:h??f++,resource:y})}if(l&&l.length){f=0;for(var p=0;p<l.length;p++){var b=Be(Be({},l[p]),Wr),h=i.samplerBindings[p],x=h.texture===null?a.device.getFallbackTexture(b):h.texture;b.dimension=x.dimension,b.formatKind=dr(x.format);var S=x.gpuTextureView;if(d[1].push({binding:h.textureBinding??f++,resource:S}),h.samplerBinding!==-1){var C=lo(h.sampler===null?a.device.getFallbackSampler(b):h.sampler);d[1].push({binding:h.samplerBinding??f++,resource:C})}}}if(c&&c.length){f=0;for(var p=0;p<c.length;p++){var w=i.storageBufferBindings[p],h=w.binding,g=w.size,_=w.offset,v=w.buffer,y={buffer:co(v),offset:_??0,size:g};d[2].push({binding:h??f++,resource:y})}}if(u&&u.length){f=0;for(var p=0;p<u.length;p++){var T=i.storageTextureBindings[p],h=T.binding,x=T.texture,S=x.gpuTextureView;d[3].push({binding:h??f++,resource:S})}}var E=d.findLastIndex(function(e){return!!e.length});return a.gpuBindGroup=d.map(function(e,t){return t<=E&&a.device.device.createBindGroup({layout:o.getBindGroupLayout(t),entries:e})}),a}return t}(Fo),Lo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Buffer;var o=i.usage,s=i.viewOrSize,c=!!(o&V.MAP_READ);a.usage=io(o),c&&(a.usage=V.MAP_READ|V.COPY_DST);var l=!De(s);return a.view=De(s)?null:s,a.size=De(s)?wr(s,4):wr(s.byteLength,4),De(s)?a.gpuBuffer=a.device.device.createBuffer({usage:a.usage,size:a.size,mappedAtCreation:c?l:!1}):(a.gpuBuffer=a.device.device.createBuffer({usage:a.usage,size:a.size,mappedAtCreation:!0}),new(s&&s.constructor||Float32Array)(a.gpuBuffer.getMappedRange()).set(s),a.gpuBuffer.unmap()),a}return t.prototype.setSubData=function(e,t,n,r){n===void 0&&(n=0),r===void 0&&(r=0);var i=this.gpuBuffer;r||=t.byteLength,r=Math.min(r,this.size-e);var a=t.byteOffset+n,o=a+r,s=r+3&-4;if(s!==r){var c=new Uint8Array(t.buffer.slice(a,o));t=new Uint8Array(s),t.set(c),n=0,a=0,o=s,r=s}for(var l=15728640,u=0;o-(a+u)>l;)this.device.device.queue.writeBuffer(i,e+u,t.buffer,a+u,l),u+=l;this.device.device.queue.writeBuffer(i,e+u,t.buffer,a+u,r-u)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gpuBuffer.destroy()},t}(Fo),Ro=function(){function e(){this.gpuComputePassEncoder=null}return e.prototype.dispatchWorkgroups=function(e,t,n){this.gpuComputePassEncoder.dispatchWorkgroups(e,t,n)},e.prototype.dispatchWorkgroupsIndirect=function(e,t){this.gpuComputePassEncoder.dispatchWorkgroupsIndirect(e.gpuBuffer,t)},e.prototype.finish=function(){this.gpuComputePassEncoder.end(),this.gpuComputePassEncoder=null,this.frameCommandEncoder=null},e.prototype.beginComputePass=function(e){Y(this.gpuComputePassEncoder===null),this.frameCommandEncoder=e,this.gpuComputePassEncoder=this.frameCommandEncoder.beginComputePass(this.gpuComputePassDescriptor)},e.prototype.setPipeline=function(e){var t=fr(e.gpuComputePipeline);this.gpuComputePassEncoder.setPipeline(t)},e.prototype.setBindings=function(e){var t=this,n=e;n.gpuBindGroup.forEach(function(e,r){e&&t.gpuComputePassEncoder.setBindGroup(r,n.gpuBindGroup[r])})},e.prototype.pushDebugGroup=function(e){this.gpuComputePassEncoder.pushDebugGroup(e)},e.prototype.popDebugGroup=function(){this.gpuComputePassEncoder.popDebugGroup()},e.prototype.insertDebugMarker=function(e){this.gpuComputePassEncoder.insertDebugMarker(e)},e}(),zo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.ComputePipeline,a.gpuComputePipeline=null,a.descriptor=i;var o=i.program.computeStage;if(o===null)return a;var s={layout:`auto`,compute:Be({},o)};return a.gpuComputePipeline=a.device.device.createComputePipeline(s),a.name!==void 0&&(a.gpuComputePipeline.label=a.name),a}return t.prototype.getBindGroupLayout=function(e){return this.gpuComputePipeline.getBindGroupLayout(e)},t}(Fo),Bo=function(e){Ie(t,e);function t(t){var n,r,i,a,o=t.id,s=t.device,c=t.descriptor,l=e.call(this,{id:o,device:s})||this;l.type=B.InputLayout;var u=[];try{for(var d=Ve(c.vertexBufferDescriptors),f=d.next();!f.done;f=d.next()){var p=f.value,m=p.arrayStride,h=p.stepMode,g=p.attributes;u.push({arrayStride:m,stepMode:Oo(h),attributes:[]});try{for(var _=(i=void 0,Ve(g)),v=_.next();!v.done;v=_.next()){var y=v.value,b=y.shaderLocation,x=y.format,S=y.offset;u[u.length-1].attributes.push({shaderLocation:b,format:ko(x),offset:S})}}catch(e){i={error:e}}finally{try{v&&!v.done&&(a=_.return)&&a.call(_)}finally{if(i)throw i.error}}}}catch(e){n={error:e}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(n)throw n.error}}return l.indexFormat=Do(c.indexBufferFormat),l.buffers=u,l}return t}(Fo),Vo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;return a.type=B.Program,a.vertexStage=null,a.fragmentStage=null,a.computeStage=null,a.descriptor=i,i.vertex&&(a.vertexStage=a.createShaderStage(i.vertex,`vertex`)),i.fragment&&(a.fragmentStage=a.createShaderStage(i.fragment,`fragment`)),i.compute&&(a.computeStage=a.createShaderStage(i.compute,`compute`)),a}return t.prototype.setUniformsLegacy=function(e){},t.prototype.createShaderStage=function(e,t){var n,r,i=e.glsl,a=e.wgsl,o=e.entryPoint,s=e.postprocess,c=!1,l=a;if(!l)try{l=this.device.glsl_compile(i,t,c)}catch(e){throw console.error(e,i),Error(`whoops`)}var u=function(e){if(!l.includes(e))return`continue`;l=l.replace(`var T_${e}: texture_2d<f32>;`,`var T_${e}: texture_depth_2d;`),l=l.replace(RegExp(`textureSample\\(T_${e}(.*)\\);$`,`gm`),function(t,n){return`vec4<f32>(textureSample(T_${e}${n}), 0.0, 0.0, 0.0);`})};try{for(var d=Ve([`u_TextureFramebufferDepth`]),f=d.next();!f.done;f=d.next()){var p=f.value;u(p)}}catch(e){n={error:e}}finally{try{f&&!f.done&&(r=d.return)&&r.call(d)}finally{if(n)throw n.error}}return s&&(l=s(l)),{module:this.device.device.createShaderModule({code:l}),entryPoint:o||`main`}},t}(Fo),Ho=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.QueryPool;var o=i.elemCount,s=i.type;return a.querySet=a.device.device.createQuerySet({type:fo(s),count:o}),a.resolveBuffer=a.device.device.createBuffer({size:o*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),a.cpuBuffer=a.device.device.createBuffer({size:o*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),a.results=null,a}return t.prototype.queryResultOcclusion=function(e){return this.results===null?null:this.results[e]!==BigInt(0)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.querySet.destroy(),this.resolveBuffer.destroy(),this.cpuBuffer.destroy()},t}(Fo),Uo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=e.call(this,{id:n,device:r})||this;return i.type=B.Readback,i}return t.prototype.readTexture=function(e,t,n,r,i,a,o,s){return o===void 0&&(o=0),Le(this,void 0,void 0,function(){var s,c,l,u,d,f,p,m;return Pe(this,function(h){return s=e,c=0,l=Po(s.gpuTextureformat),u=Math.ceil(r/l.width)*l.length,d=Math.ceil(u/256)*256,f=d*i,p=this.device.createBuffer({usage:V.STORAGE|V.MAP_READ|V.COPY_DST,hint:Jn.STATIC,viewOrSize:f}),m=this.device.device.createCommandEncoder(),m.copyTextureToBuffer({texture:s.gpuTexture,mipLevel:0,origin:{x:t,y:n,z:Math.max(c,0)}},{buffer:p.gpuBuffer,offset:0,bytesPerRow:d},{width:r,height:i,depthOrArrayLayers:1}),this.device.device.queue.submit([m.finish()]),[2,this.readBuffer(p,0,a.byteLength===f?a:null,o,f,s.format,!0,!1,u,d,i)]})})},t.prototype.readTextureSync=function(e,t,n,r,i,a,o,s){throw Error(`ERROR_MSG_METHOD_NOT_IMPLEMENTED`)},t.prototype.readBuffer=function(e,t,n,r,i,a,o,s,c,l,u){var d=this;t===void 0&&(t=0),n===void 0&&(n=null),i===void 0&&(i=0),a===void 0&&(a=J.U8_RGB),o===void 0&&(o=!1),c===void 0&&(c=0),l===void 0&&(l=0),u===void 0&&(u=0);var f=e,p=i||f.size,m=n||f.view,h=m&&m.constructor&&m.constructor.BYTES_PER_ELEMENT||lr(a),g=f;if(!(f.usage&V.MAP_READ&&f.usage&V.COPY_DST)){var _=this.device.device.createCommandEncoder();g=this.device.createBuffer({usage:V.STORAGE|V.MAP_READ|V.COPY_DST,hint:Jn.STATIC,viewOrSize:p}),_.copyBufferToBuffer(f.gpuBuffer,t,g.gpuBuffer,0,p),this.device.device.queue.submit([_.finish()])}return new Promise(function(e,n){g.gpuBuffer.mapAsync($a.READ,t,p).then(function(){var n=g.gpuBuffer.getMappedRange(t,p),r=m;if(o)r=r===null?Mo(a,p,!0,n):Mo(a,r.buffer,void 0,n);else if(r===null)switch(h){case 1:r=new Uint8Array(p),r.set(new Uint8Array(n));break;case 2:r=d.getHalfFloatAsFloatRGBAArrayBuffer(p/2,n);break;case 4:r=new Float32Array(p/4),r.set(new Float32Array(n))}else switch(h){case 1:r=new Uint8Array(r.buffer),r.set(new Uint8Array(n));break;case 2:r=d.getHalfFloatAsFloatRGBAArrayBuffer(p/2,n,m);break;case 4:var i=m&&m.constructor||Float32Array;r=new i(r.buffer),r.set(new i(n))}if(c!==l){h===1&&!o&&(c*=2,l*=2);for(var s=new Uint8Array(r.buffer),f=c,_=0,v=1;v<u;++v){_=v*l;for(var y=0;y<c;++y)s[f++]=s[_++]}r=h!==0&&!o?new Float32Array(s.buffer,0,f/4):new Uint8Array(s.buffer,0,f)}g.gpuBuffer.unmap(),e(r)},function(e){return n(e)})})},t.prototype.getHalfFloatAsFloatRGBAArrayBuffer=function(e,t,n){n||=new Float32Array(e);for(var r=new Uint16Array(t);e--;)n[e]=No(r[e]);return n},t}(Fo),Wo=function(){function e(e){this.device=e,this.gpuRenderPassEncoder=null,this.gfxColorAttachment=[],this.gfxColorAttachmentLevel=[],this.gfxColorResolveTo=[],this.gfxColorResolveToLevel=[],this.gfxDepthStencilAttachment=null,this.gfxDepthStencilResolveTo=null,this.gpuColorAttachments=[],this.gpuDepthStencilAttachment={view:null,depthLoadOp:`load`,depthStoreOp:`store`,stencilLoadOp:`load`,stencilStoreOp:`store`},this.gpuRenderPassDescriptor={colorAttachments:this.gpuColorAttachments,depthStencilAttachment:this.gpuDepthStencilAttachment}}return e.prototype.getEncoder=function(){return this.renderBundle?.renderBundleEncoder||this.gpuRenderPassEncoder},e.prototype.getTextureView=function(e,t){return Y(t<e.mipLevelCount),e.mipLevelCount===1?e.gpuTextureView:e.gpuTexture.createView({baseMipLevel:t,mipLevelCount:1})},e.prototype.setRenderPassDescriptor=function(e){this.descriptor=e,this.gpuRenderPassDescriptor.colorAttachments=this.gpuColorAttachments;var t=e.colorAttachment.length;this.gfxColorAttachment.length=t,this.gfxColorResolveTo.length=t;for(var n=0;n<e.colorAttachment.length;n++){var r=e.colorAttachment[n],i=e.colorResolveTo[n];if(r===null&&i!==null&&(r=i,i=null),this.gfxColorAttachment[n]=r,this.gfxColorResolveTo[n]=i,this.gfxColorAttachmentLevel[n]=e.colorAttachmentLevel?.[n]||0,this.gfxColorResolveToLevel[n]=e.colorResolveToLevel?.[n]||0,r!==null){this.gpuColorAttachments[n]===void 0&&(this.gpuColorAttachments[n]={});var a=this.gpuColorAttachments[n];a.view=this.getTextureView(r,this.gfxColorAttachmentLevel?.[n]||0);var o=e.colorClearColor?.[n]??`load`;o===`load`?a.loadOp=`load`:(a.loadOp=`clear`,a.clearValue=o),a.storeOp=e.colorStore?.[n]?`store`:`discard`,a.resolveTarget=void 0,i!==null&&(r.sampleCount>1?a.resolveTarget=this.getTextureView(i,this.gfxColorResolveToLevel[n]):a.storeOp=`store`)}else{this.gpuColorAttachments.length=n,this.gfxColorAttachment.length=n,this.gfxColorResolveTo.length=n;break}}if(this.gfxDepthStencilAttachment=e.depthStencilAttachment,this.gfxDepthStencilResolveTo=e.depthStencilResolveTo,e.depthStencilAttachment){var s=e.depthStencilAttachment,a=this.gpuDepthStencilAttachment;a.view=s.gpuTextureView,sr(s.format)&K.Depth?(e.depthClearValue===`load`?a.depthLoadOp=`load`:(a.depthLoadOp=`clear`,a.depthClearValue=e.depthClearValue),a.depthStoreOp=e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?`store`:`discard`):(a.depthLoadOp=void 0,a.depthStoreOp=void 0),sr(s.format)&K.Stencil?(e.stencilClearValue===`load`?a.stencilLoadOp=`load`:(a.stencilLoadOp=`clear`,a.stencilClearValue=e.stencilClearValue),a.stencilStoreOp=e.depthStencilStore||this.gfxDepthStencilResolveTo!==null?`store`:`discard`):(a.stencilLoadOp=void 0,a.stencilStoreOp=void 0),this.gpuRenderPassDescriptor.depthStencilAttachment=this.gpuDepthStencilAttachment}else this.gpuRenderPassDescriptor.depthStencilAttachment=void 0;this.gpuRenderPassDescriptor.occlusionQuerySet=Ae(e.occlusionQueryPool)?void 0:uo(e.occlusionQueryPool)},e.prototype.beginRenderPass=function(e,t){Y(this.gpuRenderPassEncoder===null),this.setRenderPassDescriptor(t),this.frameCommandEncoder=e,this.gpuRenderPassEncoder=this.frameCommandEncoder.beginRenderPass(this.gpuRenderPassDescriptor)},e.prototype.flipY=function(e,t){return this.device.swapChainHeight-e-t},e.prototype.setViewport=function(e,t,n,r,i,a){i===void 0&&(i=0),a===void 0&&(a=1),this.gpuRenderPassEncoder.setViewport(e,this.flipY(t,r),n,r,i,a)},e.prototype.setScissorRect=function(e,t,n,r){this.gpuRenderPassEncoder.setScissorRect(e,this.flipY(t,r),n,r)},e.prototype.setPipeline=function(e){var t=fr(e.gpuRenderPipeline);this.getEncoder().setPipeline(t)},e.prototype.setVertexInput=function(e,t,n){if(e!==null){var r=this.getEncoder(),i=e;n!==null&&r.setIndexBuffer(co(n.buffer),fr(i.indexFormat),n.offset);for(var a=0;a<t.length;a++){var o=t[a];o!==null&&r.setVertexBuffer(a,co(o.buffer),o.offset)}}},e.prototype.setBindings=function(e){var t=e,n=this.getEncoder();t.gpuBindGroup.forEach(function(e,r){e&&n.setBindGroup(r,t.gpuBindGroup[r])})},e.prototype.setStencilReference=function(e){this.gpuRenderPassEncoder.setStencilReference(e)},e.prototype.draw=function(e,t,n,r){this.getEncoder().draw(e,t,n,r)},e.prototype.drawIndexed=function(e,t,n,r,i){this.getEncoder().drawIndexed(e,t,n,r,i)},e.prototype.drawIndirect=function(e,t){this.getEncoder().drawIndirect(co(e),t)},e.prototype.drawIndexedIndirect=function(e,t){this.getEncoder().drawIndexedIndirect(co(e),t)},e.prototype.beginOcclusionQuery=function(e){this.gpuRenderPassEncoder.beginOcclusionQuery(e)},e.prototype.endOcclusionQuery=function(){this.gpuRenderPassEncoder.endOcclusionQuery()},e.prototype.pushDebugGroup=function(e){this.gpuRenderPassEncoder.pushDebugGroup(e)},e.prototype.popDebugGroup=function(){this.gpuRenderPassEncoder.popDebugGroup()},e.prototype.insertDebugMarker=function(e){this.gpuRenderPassEncoder.insertDebugMarker(e)},e.prototype.beginBundle=function(e){this.renderBundle=e},e.prototype.endBundle=function(){this.renderBundle.finish()},e.prototype.executeBundles=function(e){this.gpuRenderPassEncoder.executeBundles(e.map(function(e){return e.renderBundle}))},e.prototype.finish=function(){var e;(e=this.gpuRenderPassEncoder)==null||e.end(),this.gpuRenderPassEncoder=null;for(var t=0;t<this.gfxColorAttachment.length;t++){var n=this.gfxColorAttachment[t],r=this.gfxColorResolveTo[t];n!==null&&r!==null&&n.sampleCount===1&&this.copyAttachment(r,this.gfxColorAttachmentLevel[t],n,this.gfxColorResolveToLevel[t])}this.gfxDepthStencilAttachment&&this.gfxDepthStencilResolveTo&&(this.gfxDepthStencilAttachment.sampleCount>1||this.copyAttachment(this.gfxDepthStencilResolveTo,0,this.gfxDepthStencilAttachment,0)),this.frameCommandEncoder=null},e.prototype.copyAttachment=function(e,t,n,r){Y(n.sampleCount===1);var i={texture:n.gpuTexture,mipLevel:r},a={texture:e.gpuTexture,mipLevel:t};Y(n.width>>>r==e.width>>>t),Y(n.height>>>r==e.height>>>t),Y(!!(n.usage&Qa.COPY_SRC)),Y(!!(e.usage&Qa.COPY_DST)),this.frameCommandEncoder.copyTextureToTexture(i,a,[e.width,e.height,1])},e}(),Go=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;return a.type=B.RenderPipeline,a.isCreatingAsync=!1,a.gpuRenderPipeline=null,a.descriptor=i,a.device.createRenderPipelineInternal(a,!1),a}return t.prototype.getBindGroupLayout=function(e){return this.gpuRenderPipeline.getBindGroupLayout(e)},t}(Fo),Ko=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=e.call(this,{id:n,device:r})||this;a.type=B.Sampler;var o=i.lodMinClamp,s=i.mipmapFilter===Kn.NO_MIP?i.lodMinClamp:i.lodMaxClamp,c=i.maxAnisotropy??1;return c>1&&Y(i.minFilter===Gn.BILINEAR&&i.magFilter===Gn.BILINEAR&&i.mipmapFilter===Kn.LINEAR),a.gpuSampler=a.device.device.createSampler({addressModeU:ao(i.addressModeU),addressModeV:ao(i.addressModeV),addressModeW:ao(i.addressModeW??i.addressModeU),lodMinClamp:o,lodMaxClamp:s,minFilter:oo(i.minFilter),magFilter:oo(i.magFilter),mipmapFilter:so(i.mipmapFilter),compare:i.compareFunction===void 0?void 0:wo(i.compareFunction),maxAnisotropy:c}),a}return t}(Fo),qo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=t.descriptor,a=t.skipCreate,o=t.sampleCount,s=e.call(this,{id:n,device:r})||this;s.type=B.Texture,s.flipY=!1;var c=i.format,l=i.dimension,u=i.width,d=i.height,f=i.depthOrArrayLayers,p=i.mipLevelCount,m=i.usage;return s.flipY=!!i.pixelStore?.unpackFlipY,s.device.createTextureShared({format:c,dimension:l??U.TEXTURE_2D,width:u,height:d,depthOrArrayLayers:f??1,mipLevelCount:p??1,usage:m,sampleCount:o??1},s,a),s}return t.prototype.textureFromImageBitmapOrCanvas=function(e,t,n){for(var r=t[0].width,i=t[0].height,a={size:{width:r,height:i,depthOrArrayLayers:n},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT},o=e.createTexture(a),s=0;s<t.length;s++)e.queue.copyExternalImageToTexture({source:t[s],flipY:this.flipY},{texture:o,origin:[0,0,s]},[r,i]);return[o,r,i]},t.prototype.isImageBitmapOrCanvases=function(e){var t=e[0];return t instanceof ImageBitmap||t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas},t.prototype.isVideo=function(e){return e[0]instanceof HTMLVideoElement},t.prototype.setImageData=function(e,t){var n,r=this,i=this.device.device,a,o,s;if(this.isImageBitmapOrCanvases(e))n=Re(this.textureFromImageBitmapOrCanvas(i,e,this.depthOrArrayLayers),3),a=n[0],o=n[1],s=n[2];else if(this.isVideo(e))a=i.importExternalTexture({source:e[0]});else{var c=Po(this.gpuTextureformat),l=Math.ceil(this.width/c.width)*c.length;e.forEach(function(e){i.queue.writeTexture({texture:r.gpuTexture},e,{bytesPerRow:l},{width:r.width,height:r.height})})}this.width=o,this.height=s,a&&(this.gpuTexture=a),this.gpuTextureView=this.gpuTexture.createView({dimension:ro(this.dimension)})},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.gpuTexture.destroy()},t}(Fo),Jo=function(e){Ie(t,e);function t(t){var n=t.id,r=t.device,i=e.call(this,{id:n,device:r})||this;return i.type=B.RenderBundle,i.renderBundleEncoder=i.device.device.createRenderBundleEncoder({colorFormats:[i.device.swapChainFormat]}),i}return t.prototype.finish=function(){this.renderBundle=this.renderBundleEncoder.finish()},t}(Fo),Yo=function(){function e(e,t,n,r,i,a){this.swapChainWidth=0,this.swapChainHeight=0,this.swapChainTextureUsage=Qa.RENDER_ATTACHMENT|Qa.COPY_DST,this._resourceUniqueId=0,this.renderPassPool=[],this.computePassPool=[],this.frameCommandEncoderPool=[],this.featureTextureCompressionBC=!1,this.platformString=`WebGPU`,this.glslVersion=`#version 440`,this.explicitBindingLocations=!0,this.separateSamplerTextures=!0,this.viewportOrigin=tr.UPPER_LEFT,this.clipSpaceNearZ=nr.ZERO,this.supportsSyncPipelineCompilation=!1,this.supportMRT=!0,this.device=t,this.canvas=n,this.canvasContext=r,this.glsl_compile=i,this.WGSLComposer=a,this.fallbackTexture2D=this.createFallbackTexture(U.TEXTURE_2D,er.Float),this.setResourceName(this.fallbackTexture2D,`Fallback Texture2D`),this.fallbackTexture2DDepth=this.createFallbackTexture(U.TEXTURE_2D,er.Depth),this.setResourceName(this.fallbackTexture2DDepth,`Fallback Depth Texture2D`),this.fallbackTexture2DArray=this.createFallbackTexture(U.TEXTURE_2D_ARRAY,er.Float),this.setResourceName(this.fallbackTexture2DArray,`Fallback Texture2DArray`),this.fallbackTexture3D=this.createFallbackTexture(U.TEXTURE_3D,er.Float),this.setResourceName(this.fallbackTexture3D,`Fallback Texture3D`),this.fallbackTextureCube=this.createFallbackTexture(U.TEXTURE_CUBE_MAP,er.Float),this.setResourceName(this.fallbackTextureCube,`Fallback TextureCube`),this.fallbackSamplerFiltering=this.createSampler({addressModeU:Wn.REPEAT,addressModeV:Wn.REPEAT,minFilter:Gn.POINT,magFilter:Gn.POINT,mipmapFilter:Kn.NEAREST}),this.setResourceName(this.fallbackSamplerFiltering,`Fallback Sampler Filtering`),this.fallbackSamplerComparison=this.createSampler({addressModeU:Wn.REPEAT,addressModeV:Wn.REPEAT,minFilter:Gn.POINT,magFilter:Gn.POINT,mipmapFilter:Kn.NEAREST,compareFunction:zn.ALWAYS}),this.setResourceName(this.fallbackSamplerComparison,`Fallback Sampler Comparison Filtering`),this.device.features&&(this.featureTextureCompressionBC=this.device.features.has(`texture-compression-bc`)),this.device.onuncapturederror=function(e){console.error(e.error)},this.swapChainFormat=navigator.gpu.getPreferredCanvasFormat(),this.canvasContext.configure({device:this.device,format:this.swapChainFormat,usage:this.swapChainTextureUsage,alphaMode:`premultiplied`})}return e.prototype.destroy=function(){},e.prototype.configureSwapChain=function(e,t){(this.swapChainWidth!==e||this.swapChainHeight!==t)&&(this.swapChainWidth=e,this.swapChainHeight=t)},e.prototype.getOnscreenTexture=function(){var e=this.canvasContext.getCurrentTexture(),t=e.createView(),n=new qo({id:0,device:this,descriptor:{format:J.U8_RGBA_RT,width:this.swapChainWidth,height:this.swapChainHeight,depthOrArrayLayers:0,dimension:U.TEXTURE_2D,mipLevelCount:1,usage:this.swapChainTextureUsage},skipCreate:!0});return n.depthOrArrayLayers=1,n.sampleCount=1,n.gpuTexture=e,n.gpuTextureView=t,n.name=`Onscreen`,this.setResourceName(n,`Onscreen Texture`),n},e.prototype.getDevice=function(){return this},e.prototype.getCanvas=function(){return this.canvas},e.prototype.beginFrame=function(){Y(this.frameCommandEncoderPool.length===0)},e.prototype.endFrame=function(){Y(this.frameCommandEncoderPool.every(function(e){return e!==null})),this.device.queue.submit(this.frameCommandEncoderPool.map(function(e){return e.finish()})),this.frameCommandEncoderPool=[]},e.prototype.getNextUniqueId=function(){return++this._resourceUniqueId},e.prototype.createBuffer=function(e){return new Lo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createTexture=function(e){return new qo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createSampler=function(e){return new Ko({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createRenderTarget=function(e){var t=new qo({id:this.getNextUniqueId(),device:this,descriptor:Be(Be({},e),{dimension:U.TEXTURE_2D,mipLevelCount:1,depthOrArrayLayers:1,usage:Xn.RENDER_TARGET}),sampleCount:e.sampleCount});return t.depthOrArrayLayers=1,t.type=B.RenderTarget,t},e.prototype.createRenderTargetFromTexture=function(e){var t=e,n=t.format,r=t.width,i=t.height,a=t.depthOrArrayLayers,o=t.sampleCount,s=t.mipLevelCount,c=t.gpuTexture,l=t.gpuTextureView,u=t.usage;Y(!!(u&Qa.RENDER_ATTACHMENT));var d=new qo({id:this.getNextUniqueId(),device:this,descriptor:{format:n,width:r,height:i,depthOrArrayLayers:a,dimension:U.TEXTURE_2D,mipLevelCount:s,usage:u},skipCreate:!0});return d.depthOrArrayLayers=a,d.sampleCount=o,d.gpuTexture=c,d.gpuTextureView=l,d},e.prototype.createProgram=function(e){return e.vertex?.glsl&&(e.vertex.glsl=Bi(this.queryVendorInfo(),`vert`,e.vertex.glsl)),e.fragment?.glsl&&(e.fragment.glsl=Bi(this.queryVendorInfo(),`frag`,e.fragment.glsl)),new Vo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createProgramSimple=function(e){return new Vo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createTextureShared=function(e,t,n){var r={width:e.width,height:e.height,depthOrArrayLayers:e.depthOrArrayLayers},i=e.mipLevelCount,a=to(e.format),o=no(e.dimension),s=eo(e.usage);if(t.gpuTextureformat=a,t.dimension=e.dimension,t.format=e.format,t.width=e.width,t.height=e.height,t.depthOrArrayLayers=e.depthOrArrayLayers,t.mipLevelCount=i,t.usage=s,t.sampleCount=e.sampleCount,!n){var c=this.device.createTexture({size:r,mipLevelCount:i,format:a,dimension:o,sampleCount:e.sampleCount,usage:s}),l=c.createView();t.gpuTexture=c,t.gpuTextureView=l}},e.prototype.getFallbackSampler=function(e){return e.formatKind===er.Depth&&e.comparison?this.fallbackSamplerComparison:this.fallbackSamplerFiltering},e.prototype.getFallbackTexture=function(e){var t=e.dimension,n=e.formatKind;if(t===U.TEXTURE_2D)return n===er.Depth?this.fallbackTexture2DDepth:this.fallbackTexture2D;if(t===U.TEXTURE_2D_ARRAY)return this.fallbackTexture2DArray;if(t===U.TEXTURE_3D)return this.fallbackTexture3D;if(t===U.TEXTURE_CUBE_MAP)return this.fallbackTextureCube;throw Error(`whoops`)},e.prototype.createFallbackTexture=function(e,t){var n=e===U.TEXTURE_CUBE_MAP?6:1,r=t===er.Float?J.U8_RGBA_NORM:J.D24;return this.createTexture({dimension:e,format:r,usage:Xn.SAMPLED,width:1,height:1,depthOrArrayLayers:n,mipLevelCount:1})},e.prototype.createBindings=function(e){return new Io({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createInputLayout=function(e){return new Bo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createComputePipeline=function(e){return new zo({id:this.getNextUniqueId(),device:this,descriptor:e})},e.prototype.createRenderPipeline=function(e){return new Go({id:this.getNextUniqueId(),device:this,descriptor:Be({},e)})},e.prototype.createQueryPool=function(e,t){return new Ho({id:this.getNextUniqueId(),device:this,descriptor:{type:e,elemCount:t}})},e.prototype.createRenderPipelineInternal=function(e,t){if(e.gpuRenderPipeline===null){var n=e.descriptor,r=n.program,i=r.vertexStage,a=r.fragmentStage;if(i!==null&&a!==null){var o=n.megaStateDescriptor||{},s=o.stencilBack,c=o.stencilFront,l=ze(o,[`stencilBack`,`stencilFront`]),u=Lr(Br);n.megaStateDescriptor=Be(Be(Be({},u),{stencilBack:Be(Be({},u.stencilBack),s),stencilFront:Be(Be({},u.stencilFront),c)}),l);var d=n.megaStateDescriptor.attachmentsState[0];n.colorAttachmentFormats.forEach(function(e,t){n.megaStateDescriptor.attachmentsState[t]||(n.megaStateDescriptor.attachmentsState[t]=Pr(void 0,d))});var f=go(n.topology??qn.TRIANGLES,n.megaStateDescriptor),p=Co(n.colorAttachmentFormats,n.megaStateDescriptor),m=Eo(n.depthStencilAttachmentFormat,n.megaStateDescriptor),h=void 0;n.inputLayout!==null&&(h=n.inputLayout.buffers);var g=n.sampleCount,_={layout:`auto`,vertex:Be(Be({},i),{buffers:h}),primitive:f,depthStencil:m,multisample:{count:g},fragment:Be(Be({},a),{targets:p})};e.gpuRenderPipeline=this.device.createRenderPipeline(_)}}},e.prototype.createReadback=function(){return new Uo({id:this.getNextUniqueId(),device:this})},e.prototype.createRenderBundle=function(){return new Jo({id:this.getNextUniqueId(),device:this})},e.prototype.createRenderPass=function(e){var t=this.renderPassPool.pop();t===void 0&&(t=new Wo(this));var n=this.frameCommandEncoderPool.pop();return n===void 0&&(n=this.device.createCommandEncoder()),t.beginRenderPass(n,e),t},e.prototype.createComputePass=function(){var e=this.computePassPool.pop();e===void 0&&(e=new Ro);var t=this.frameCommandEncoderPool.pop();return t===void 0&&(t=this.device.createCommandEncoder()),e.beginComputePass(t),e},e.prototype.submitPass=function(e){var t=e;t instanceof Wo?(this.frameCommandEncoderPool.push(t.frameCommandEncoder),t.finish(),this.renderPassPool.push(t)):t instanceof Ro&&(this.frameCommandEncoderPool.push(t.frameCommandEncoder),t.finish(),this.computePassPool.push(t))},e.prototype.copySubTexture2D=function(e,t,n,r,i,a,o){var s=this.device.createCommandEncoder(),c=e,l=r,u={texture:l.gpuTexture,origin:[i,a,0],mipLevel:0,aspect:`all`},d={texture:c.gpuTexture,origin:[t,n,0],mipLevel:0,aspect:`all`};Y(!!(l.usage&Qa.COPY_SRC)),Y(!!(c.usage&Qa.COPY_DST)),s.copyTextureToTexture(u,d,[l.width,l.height,o||1]),this.device.queue.submit([s.finish()])},e.prototype.queryLimits=function(){return{uniformBufferMaxPageWordSize:this.device.limits.maxUniformBufferBindingSize>>>2,uniformBufferWordAlignment:this.device.limits.minUniformBufferOffsetAlignment>>>2,supportedSampleCounts:[1],occlusionQueriesRecommended:!0,computeShadersSupported:!0}},e.prototype.queryTextureFormatSupported=function(e,t,n){if(Ao(e)){if(!this.featureTextureCompressionBC)return!1;var r=jo(e);return t%r!==0||n%r!==0?!1:this.featureTextureCompressionBC}switch(e){case J.U16_RGBA_NORM:return!1;case J.F32_RGBA:return!1}return!0},e.prototype.queryPlatformAvailable=function(){return!0},e.prototype.queryVendorInfo=function(){return this},e.prototype.queryRenderPass=function(e){return e.descriptor},e.prototype.queryRenderTarget=function(e){return e},e.prototype.setResourceName=function(e,t){if(e.name=t,e.type===B.Buffer){var n=e;n.gpuBuffer.label=t}else if(e.type===B.Texture){var n=e;n.gpuTexture.label=t,n.gpuTextureView.label=t}else if(e.type===B.RenderTarget){var n=e;n.gpuTexture.label=t,n.gpuTextureView.label=t}else if(e.type===B.Sampler){var n=e;n.gpuSampler.label=t}else if(e.type===B.RenderPipeline){var n=e;n.gpuRenderPipeline!==null&&(n.gpuRenderPipeline.label=t)}},e.prototype.setResourceLeakCheck=function(e,t){},e.prototype.checkForLeaks=function(){},e.prototype.programPatched=function(e){},e.prototype.pipelineQueryReady=function(e){return e.gpuRenderPipeline!==null},e.prototype.pipelineForceReady=function(e){var t=e;this.createRenderPipelineInternal(t,!1)},e}();(function(){function e(e){this.pluginOptions=e}return e.prototype.createSwapChain=function(e){return Le(this,void 0,void 0,function(){var t,n,r,i,a,o,s,c;return Pe(this,function(l){switch(l.label){case 0:if(globalThis.navigator.gpu===void 0)return[2,null];t=null,l.label=1;case 1:return l.trys.push([1,3,,4]),n=this.pluginOptions.xrCompatible,[4,globalThis.navigator.gpu.requestAdapter({xrCompatible:n})];case 2:return t=l.sent(),[3,4];case 3:return r=l.sent(),console.log(r),[3,4];case 4:return t===null?[2,null]:(i=[`depth32float-stencil8`,`texture-compression-bc`,`float32-filterable`],a=i.filter(function(e){return t.features.has(e)}),[4,t.requestDevice({requiredFeatures:a})]);case 5:if(o=l.sent(),o&&(s=this.pluginOptions.onContextLost,o.lost.then(function(){s&&s()})),o===null||(c=e.getContext(`webgpu`),!c))return[2,null];l.label=6;case 6:return l.trys.push([6,8,,9]),[4,Za(this.pluginOptions.shaderCompilerPath)];case 7:return l.sent(),[3,9];case 8:return l.sent(),[3,9];case 9:return[2,new Yo(t,o,e,c,Ka,qa&&new qa)]}})})},e})();var Xo=e(t(((e,t)=>{t.exports=n,t.exports.default=n;function n(e,t,n){n||=2;var i=t&&t.length,o=i?t[0]*n:e.length,s=r(e,0,o,n,!0),c=[];if(!s||s.next===s.prev)return c;var l,d,f,p,m,h,g;if(i&&(s=u(e,t,s,n)),e.length>80*n){l=f=e[0],d=p=e[1];for(var _=n;_<o;_+=n)m=e[_],h=e[_+1],m<l&&(l=m),h<d&&(d=h),m>f&&(f=m),h>p&&(p=h);g=Math.max(f-l,p-d),g=g===0?0:32767/g}return a(s,c,n,l,d,g,0),c}function r(e,t,n,r,i){var a,o;if(i===M(e,t,n,r)>0)for(a=t;a<n;a+=r)o=A(a,e[a],e[a+1],o);else for(a=n-r;a>=t;a-=r)o=A(a,e[a],e[a+1],o);return o&&S(o,o.next)&&(j(o),o=o.next),o}function i(e,t){if(!e)return e;t||=e;var n=e,r;do if(r=!1,!n.steiner&&(S(n,n.next)||x(n.prev,n,n.next)===0)){if(j(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function a(e,t,n,r,u,d,f){if(e){!f&&d&&h(e,r,u,d);for(var p=e,m,g;e.prev!==e.next;)if(m=e.prev,g=e.next,d?s(e,r,u,d):o(e))t.push(m.i/n|0),t.push(e.i/n|0),t.push(g.i/n|0),j(e),e=g.next,p=g.next;else if(e=g,e===p){f?f===1?(e=c(i(e),t,n),a(e,t,n,r,u,d,2)):f===2&&l(e,t,n,r,u,d):a(i(e),t,n,r,u,d,1);break}}}function o(e){var t=e.prev,n=e,r=e.next;if(x(t,n,r)>=0)return!1;for(var i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=i<a?i<o?i:o:a<o?a:o,d=s<c?s<l?s:l:c<l?c:l,f=i>a?i>o?i:o:a>o?a:o,p=s>c?s>l?s:l:c>l?c:l,m=r.next;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&y(i,s,a,c,o,l,m.x,m.y)&&x(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function s(e,t,n,r){var i=e.prev,a=e,o=e.next;if(x(i,a,o)>=0)return!1;for(var s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=s<c?s<l?s:l:c<l?c:l,m=u<d?u<f?u:f:d<f?d:f,h=s>c?s>l?s:l:c>l?c:l,g=u>d?u>f?u:f:d>f?d:f,v=_(p,m,t,n,r),b=_(h,g,t,n,r),S=e.prevZ,C=e.nextZ;S&&S.z>=v&&C&&C.z<=b;){if(S.x>=p&&S.x<=h&&S.y>=m&&S.y<=g&&S!==i&&S!==o&&y(s,u,c,d,l,f,S.x,S.y)&&x(S.prev,S,S.next)>=0||(S=S.prevZ,C.x>=p&&C.x<=h&&C.y>=m&&C.y<=g&&C!==i&&C!==o&&y(s,u,c,d,l,f,C.x,C.y)&&x(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;S&&S.z>=v;){if(S.x>=p&&S.x<=h&&S.y>=m&&S.y<=g&&S!==i&&S!==o&&y(s,u,c,d,l,f,S.x,S.y)&&x(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;C&&C.z<=b;){if(C.x>=p&&C.x<=h&&C.y>=m&&C.y<=g&&C!==i&&C!==o&&y(s,u,c,d,l,f,C.x,C.y)&&x(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function c(e,t,n){var r=e;do{var a=r.prev,o=r.next.next;!S(a,o)&&C(a,r,r.next,o)&&D(a,o)&&D(o,a)&&(t.push(a.i/n|0),t.push(r.i/n|0),t.push(o.i/n|0),j(r),j(r.next),r=e=o),r=r.next}while(r!==e);return i(r)}function l(e,t,n,r,o,s){var c=e;do{for(var l=c.next.next;l!==c.prev;){if(c.i!==l.i&&b(c,l)){var u=k(c,l);c=i(c,c.next),u=i(u,u.next),a(c,t,n,r,o,s,0),a(u,t,n,r,o,s,0);return}l=l.next}c=c.next}while(c!==e)}function u(e,t,n,i){for(var a=[],o=0,s=t.length,c,l,u;o<s;o++)c=t[o]*i,l=o<s-1?t[o+1]*i:e.length,u=r(e,c,l,i,!1),u===u.next&&(u.steiner=!0),a.push(v(u));for(a.sort(d),o=0;o<a.length;o++)n=f(a[o],n);return n}function d(e,t){return e.x-t.x}function f(e,t){var n=p(e,t);if(!n)return t;var r=k(n,e);return i(r,r.next),i(n,n.next)}function p(e,t){var n=t,r=e.x,i=e.y,a=-1/0,o;do{if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){var s=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(s<=r&&s>a&&(a=s,o=n.x<n.next.x?n:n.next,s===r))return o}n=n.next}while(n!==t);if(!o)return null;var c=o,l=o.x,u=o.y,d=1/0,f;n=o;do r>=n.x&&n.x>=l&&r!==n.x&&y(i<u?r:a,i,l,u,i<u?a:r,i,n.x,n.y)&&(f=Math.abs(i-n.y)/(r-n.x),D(n,e)&&(f<d||f===d&&(n.x>o.x||n.x===o.x&&m(o,n)))&&(o=n,d=f)),n=n.next;while(n!==c);return o}function m(e,t){return x(e.prev,e,t.prev)<0&&x(t.next,e,e.next)<0}function h(e,t,n,r){var i=e;do i.z===0&&(i.z=_(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,g(i)}function g(e){var t,n,r,i,a,o,s,c,l=1;do{for(n=e,e=null,a=null,o=0;n;){for(o++,r=n,s=0,t=0;t<l&&(s++,r=r.nextZ,r);t++);for(c=l;s>0||c>0&&r;)s!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;n=r}a.nextZ=null,l*=2}while(o>1);return e}function _(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function v(e){var t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function y(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function b(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!E(e,t)&&(D(e,t)&&D(t,e)&&O(e,t)&&(x(e.prev,e,t.prev)||x(e,t.prev,t))||S(e,t)&&x(e.prev,e,e.next)>0&&x(t.prev,t,t.next)>0)}function x(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function S(e,t){return e.x===t.x&&e.y===t.y}function C(e,t,n,r){var i=T(x(e,t,n)),a=T(x(e,t,r)),o=T(x(n,r,e)),s=T(x(n,r,t));return!!(i!==a&&o!==s||i===0&&w(e,n,t)||a===0&&w(e,r,t)||o===0&&w(n,e,r)||s===0&&w(n,t,r))}function w(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function T(e){return e>0?1:e<0?-1:0}function E(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&C(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function D(e,t){return x(e.prev,e,e.next)<0?x(e,t,e.next)>=0&&x(e,e.prev,t)>=0:x(e,t,e.prev)<0||x(e,e.next,t)<0}function O(e,t){var n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function k(e,t){var n=new ee(e.i,e.x,e.y),r=new ee(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function A(e,t,n,r){var i=new ee(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function j(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function ee(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}n.deviation=function(e,t,n,r){var i=t&&t.length,a=i?t[0]*n:e.length,o=Math.abs(M(e,0,a,n));if(i)for(var s=0,c=t.length;s<c;s++){var l=t[s]*n,u=s<c-1?t[s+1]*n:e.length;o-=Math.abs(M(e,l,u,n))}var d=0;for(s=0;s<r.length;s+=3){var f=r[s]*n,p=r[s+1]*n,m=r[s+2]*n;d+=Math.abs((e[f]-e[m])*(e[p+1]-e[f+1])-(e[f]-e[p])*(e[m+1]-e[f+1]))}return o===0&&d===0?0:Math.abs((d-o)/o)};function M(e,t,n,r){for(var i=0,a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}n.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},r=0,i=0;i<e.length;i++){for(var a=0;a<e[i].length;a++)for(var o=0;o<t;o++)n.vertices.push(e[i][a][o]);i>0&&(r+=e[i-1].length,n.holes.push(r))}return n}}))()),Zo=c(function e(){s(this,e),this.drawcalls=[]});Zo.tag=`c-renderable-3d`;var Qo=function(){function e(){s(this,e),this.lights=[]}return c(e,[{key:`addLight`,value:function(e){this.lights.push(e),this.sortLights()}},{key:`removeLight`,value:function(e){var t=this.lights.indexOf(e);this.lights.splice(t,1),this.sortLights()}},{key:`addFog`,value:function(e){this.fog=e}},{key:`removeFog`,value:function(e){this.fog=null}},{key:`getFog`,value:function(){return this.fog}},{key:`getAllLights`,value:function(){return this.lights}},{key:`getDefines`,value:function(){var e={USE_LIGHT:!!this.lights.length};return this.lights.forEach(function(t){e[t.define]||(e[t.define]=0),e[t.define]++}),e}},{key:`sortLights`,value:function(){this.lights.sort(function(e,t){return e.order-t.order})}}])}(),$o=[`style`],es=function(e){function t(e){var n,r=e.style,a=o(e,$o);return s(this,t),n=d(this,t,[i({type:I.MESH,style:i({x:``,y:``,z:``,lineWidth:0},r)},a)]),n.cullable.enable=!1,n.style.geometry.meshes.push(n),n.style.material.meshes.push(n),n}return p(t,e),c(t,[{key:`destroy`,value:function(){ue(t,`destroy`,this,3)([]);var e=this.style.geometry.meshes,n=e.indexOf(this);e.splice(n,1),e=this.style.material.meshes,n=e.indexOf(this),e.splice(n,1)}}])}(x);es.PARSED_STYLE_LIST=new Set([].concat(l(x.PARSED_STYLE_LIST),[`x`,`y`,`z`,`geometry`,`material`]));var ts=function(){function e(){s(this,e)}return c(e,[{key:`update`,value:function(e){var t=e.x,n=t===void 0?0:t,r=e.y,i=r===void 0?0:r,a=e.z,o=a===void 0?0:a,s=e.geometry.computeBoundingBox();return{cx:n,cy:i,cz:o,hwidth:s.halfExtents[0],hheight:s.halfExtents[1],hdepth:s.halfExtents[2]}}}])}(),ns=function(){function e(){s(this,e),this.counter=0,this.id2DisplayObjectMap={}}return c(e,[{key:`getId`,value:function(e){var t=this.counter++;return this.id2DisplayObjectMap[t]=e,t}},{key:`getById`,value:function(e){return this.id2DisplayObjectMap[e]}},{key:`deleteById`,value:function(e){delete this.id2DisplayObjectMap[e]}},{key:`reset`,value:function(){this.counter=0,this.id2DisplayObjectMap={}}},{key:`decodePickingColor`,value:function(e){var t=a(e,3),n=t[0],r=t[1],i=t[2];return n+r*256+i*65536-1}},{key:`encodePickingColor`,value:function(e){return[e+1&255,e+1>>8&255,e+1>>8>>8&255]}}])}(),rs=function(){function e(){s(this,e),this.name=`(unnamed)`,this.preprocessedVert=``,this.preprocessedFrag=``,this.both=``,this.vert=``,this.frag=``,this.defines={}}return c(e,[{key:`definesChanged`,value:function(){this.preprocessedVert=``,this.preprocessedFrag=``}},{key:`setDefineString`,value:function(e,t){if(t!==null){if(this.defines[e]===t)return!1;this.defines[e]=t}else{if(Ae(this.defines[e]))return!1;delete this.defines[e]}return this.definesChanged(),!0}},{key:`setDefineBool`,value:function(e,t){return this.setDefineString(e,t?`1`:null)}},{key:`getDefineString`,value:function(e){return Sr(this.defines[e])}},{key:`getDefineBool`,value:function(e){var t=this.getDefineString(e);return t!==null&&Y(t===`1`),t!==null}}])}(),is=function(){function e(t){s(this,e),this.currentBufferWordSize=-1,this.currentWordOffset=0,this.buffer=null,this.shadowBufferF32=null,this.shadowBufferU8=null,this.device=t;var n=t.queryLimits();this.uniformBufferWordAlignment=n.uniformBufferWordAlignment,this.uniformBufferMaxPageWordSize=n.uniformBufferMaxPageWordSize}return c(e,[{key:`isSupportedUBO`,value:function(){return this.device.queryVendorInfo().platformString!==`WebGL1`}},{key:`findPageIndex`,value:function(e){return e/this.uniformBufferMaxPageWordSize|0}},{key:`allocateChunk`,value:function(e){e=Tr(e,this.uniformBufferWordAlignment),Y(e<this.uniformBufferMaxPageWordSize);var t=this.currentWordOffset;return this.findPageIndex(t)!==this.findPageIndex(t+e-1)&&(t=Tr(t,this.uniformBufferMaxPageWordSize)),this.currentWordOffset=t+e,this.ensureShadowBuffer(t,e),t}},{key:`ensureShadowBuffer`,value:function(e,t){if(this.shadowBufferU8===null||this.shadowBufferF32===null){var n=Tr(this.currentWordOffset,this.uniformBufferMaxPageWordSize);this.shadowBufferU8=new Uint8Array(n*4),this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer)}else if(e+t>=this.shadowBufferF32.length){Y(e<this.currentWordOffset&&e+t<=this.currentWordOffset);var r=Tr(Math.max(this.currentWordOffset,this.shadowBufferF32.length*2),this.uniformBufferMaxPageWordSize),i=new Uint8Array(r*4);if(i.set(this.shadowBufferU8,0),this.shadowBufferU8=i,this.shadowBufferF32=new Float32Array(this.shadowBufferU8.buffer),!(this.currentWordOffset<=r))throw Error(`Assert fail: this.currentWordOffset [${this.currentWordOffset}] <= newWordCount [${r}]`)}}},{key:`mapBufferF32`,value:function(){return fr(this.shadowBufferF32)}},{key:`prepareToRender`,value:function(){if(this.shadowBufferF32!==null){var e=fr(this.shadowBufferF32);e.length!==this.currentBufferWordSize&&(this.currentBufferWordSize=e.length,this.buffer!==null&&this.buffer.destroy(),this.buffer=this.device.createBuffer({viewOrSize:this.currentBufferWordSize*4,usage:V.UNIFORM,hint:Jn.DYNAMIC}));var t=Tr(this.currentWordOffset,this.uniformBufferMaxPageWordSize);if(!(t<=this.currentBufferWordSize))throw Error(`Assert fail: wordCount [${t}] (${this.currentWordOffset} aligned ${this.uniformBufferMaxPageWordSize}) <= this.currentBufferWordSize [${this.currentBufferWordSize}]`);this.isSupportedUBO()&&fr(this.buffer).setSubData(0,this.shadowBufferU8,0,t*4),this.currentWordOffset=0}}},{key:`destroy`,value:function(){this.buffer!==null&&this.buffer.destroy(),this.shadowBufferF32=null,this.shadowBufferU8=null}}])}();function as(e,t){return e+=t,e+=e<<10,e+=e>>>6,e>>>0}function os(e){return e+=e<<3,e^=e>>>11,e+=e<<15,e>>>0}function ss(e){return 0}var cs=c(function e(){s(this,e),this.keys=[],this.values=[]}),ls=function(){function e(t,n){s(this,e),this.buckets=new Map,this.keyEqualFunc=t,this.keyHashFunc=n}return c(e,[{key:`findBucketIndex`,value:function(e,t){for(var n=0;n<e.keys.length;n++)if(this.keyEqualFunc(t,e.keys[n]))return n;return-1}},{key:`findBucket`,value:function(e){var t=this.keyHashFunc(e);return this.buckets.get(t)}},{key:`get`,value:function(e){var t=this.findBucket(e);if(t===void 0)return null;var n=this.findBucketIndex(t,e);return n<0?null:t.values[n]}},{key:`add`,value:function(e,t){var n=this.keyHashFunc(e);this.buckets.get(n)===void 0&&this.buckets.set(n,new cs);var r=this.buckets.get(n);r.keys.push(e),r.values.push(t)}},{key:`delete`,value:function(e){var t=this.findBucket(e);if(t!==void 0){var n=this.findBucketIndex(t,e);n!==-1&&(t.keys.splice(n,1),t.values.splice(n,1))}}},{key:`clear`,value:function(){this.buckets.clear()}},{key:`size`,value:function(){var e=0,t=m(this.buckets.values()),n;try{for(t.s();!(n=t.n()).done;){var r=n.value;e+=r.values.length}}catch(e){t.e(e)}finally{t.f()}return e}},{key:`values`,value:f().mark(function e(){var t,n,r,i,a;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=m(this.buckets.values()),e.prev=1,t.s();case 2:if((n=t.n()).done){e.next=6;break}r=n.value,i=r.values.length-1;case 3:if(!(i>=0)){e.next=5;break}return e.next=4,r.values[i];case 4:i--,e.next=3;break;case 5:e.next=2;break;case 6:e.next=8;break;case 7:e.prev=7,a=e.catch(1),t.e(a);case 8:return e.prev=8,t.f(),e.finish(8);case 9:case`end`:return e.stop()}},e,this,[[1,7,8,9]])})}])}();function us(e,t){var n=t.defines===void 0?null:t.defines,r=t.both===void 0?t.vert:t.both+t.vert,i=t.both===void 0?t.frag:t.both+t.frag;return Vi(e.queryVendorInfo(),r,i,n)}function ds(e,t){return Y(e.preprocessedVert!==``&&t.preprocessedVert!==``),Y(e.preprocessedFrag!==``&&t.preprocessedFrag!==``),e.preprocessedVert===t.preprocessedVert&&e.preprocessedFrag===t.preprocessedFrag}function fs(e){return{preprocessedVert:e.preprocessedVert,preprocessedFrag:e.preprocessedFrag,vert:e.vert,frag:e.frag}}function ps(e,t){return e=as(e,t.blendMode),e=as(e,t.blendSrcFactor),e=as(e,t.blendDstFactor),e}function ms(e,t){return e=ps(e,t.rgbBlendState),e=ps(e,t.alphaBlendState),e=as(e,t.channelWriteMask),e}function hs(e,t){return e=as(e,t.r<<24|t.g<<16|t.b<<8|t.a),e}function gs(e,t){for(var n=0;n<t.attachmentsState.length;n++)e=ms(e,t.attachmentsState[n]);return e=hs(e,t.blendConstant),e=as(e,t.depthCompare),e=as(e,+!!t.depthWrite),e=as(e,t.stencilFront?.compare),e=as(e,t.stencilFront?.passOp),e=as(e,t.stencilFront?.failOp),e=as(e,t.stencilFront?.depthFailOp),e=as(e,t.stencilBack?.compare),e=as(e,t.stencilBack?.passOp),e=as(e,t.stencilBack?.failOp),e=as(e,t.stencilBack?.depthFailOp),e=as(e,+!!t.stencilWrite),e=as(e,t.cullMode),e=as(e,+!!t.frontFace),e=as(e,+!!t.polygonOffset),e}function _s(e){var t=0;t=as(t,e.program.id),e.inputLayout!==null&&(t=as(t,e.inputLayout.id)),t=gs(t,e.megaStateDescriptor);for(var n=0;n<e.colorAttachmentFormats.length;n++)t=as(t,e.colorAttachmentFormats[n]||0);return t=as(t,e.depthStencilAttachmentFormat||0),os(t)}function vs(e){for(var t=0,n=0;n<e.samplerBindings.length;n++){var r=e.samplerBindings[n];r!==null&&r.texture!==null&&(t=as(t,r.texture.id))}for(var i=0;i<e.uniformBufferBindings.length;i++){var a=e.uniformBufferBindings[i];a!==null&&a.buffer!==null&&(t=as(t,a.buffer.id),t=as(t,a.binding),t=as(t,a.offset),t=as(t,a.size))}return os(t)}var ys=function(){function e(t){s(this,e),this.bindingsCache=new ls(Xr,vs),this.renderPipelinesCache=new ls(ri,_s),this.inputLayoutsCache=new ls(oi,ss),this.programCache=new ls(ds,ss),this.samplerCache=new ls(si,ss),this.device=t}return c(e,[{key:`createBindings`,value:function(e){var t=this.bindingsCache.get(e);if(t===null){var n=di(e);n.uniformBufferBindings=n.uniformBufferBindings.filter(function(e){return e.size>0}),t=this.device.createBindings(n),this.bindingsCache.add(n,t)}return t}},{key:`createRenderPipeline`,value:function(e){var t=this.renderPipelinesCache.get(e);if(t===null){var n=fi(e);t=this.device.createRenderPipeline(i(i({},n),{},{colorAttachmentFormats:e.colorAttachmentFormats.filter(function(e){return e})})),this.renderPipelinesCache.add(n,t)}return t}},{key:`createInputLayout`,value:function(e){e.vertexBufferDescriptors=e.vertexBufferDescriptors.filter(function(e){return!!e});var t=this.inputLayoutsCache.get(e);if(t===null){var n=hi(e);t=this.device.createInputLayout(n),this.inputLayoutsCache.add(n,t)}return t}},{key:`createProgramSimple`,value:function(e){var t=e.vert,n=e.frag,r=e.preprocessedFrag,i=e.preprocessedVert,a=null;if(i&&r&&(a=this.programCache.get({vert:t,frag:n,preprocessedFrag:r,preprocessedVert:i})),a===null){var o=us(this.device,e),s=o.preprocessedVert,c=o.preprocessedFrag;e.preprocessedVert=s,e.preprocessedFrag=c;var l=fs(e);a=this.device.createProgramSimple({vertex:{glsl:s},fragment:{glsl:c}},t),this.programCache.add(l,a)}return a}},{key:`createSampler`,value:function(e){var t=this.samplerCache.get(e);return t===null&&(t=this.device.createSampler(e),this.samplerCache.add(e,t)),t}},{key:`destroy`,value:function(){var e=m(this.bindingsCache.values()),t;try{for(e.s();!(t=e.n()).done;)t.value.destroy()}catch(t){e.e(t)}finally{e.f()}var n=m(this.renderPipelinesCache.values()),r;try{for(n.s();!(r=n.n()).done;)r.value.destroy()}catch(e){n.e(e)}finally{n.f()}var i=m(this.inputLayoutsCache.values()),a;try{for(i.s();!(a=i.n()).done;)a.value.destroy()}catch(e){i.e(e)}finally{i.f()}var o=m(this.programCache.values()),s;try{for(o.s();!(s=o.n()).done;)s.value.destroy()}catch(e){o.e(e)}finally{o.f()}var c=m(this.samplerCache.values()),l;try{for(c.s();!(l=c.n()).done;)l.value.destroy()}catch(e){c.e(e)}finally{c.f()}this.bindingsCache.clear(),this.renderPipelinesCache.clear(),this.inputLayoutsCache.clear(),this.programCache.clear(),this.samplerCache.clear()}}])}(),bs=function(e){return e.NONE=`none`,e.LINEAR=`LinearToneMapping`,e.REINHARD=`ReinhardToneMapping`,e.CINEON=`OptimizedCineonToneMapping`,e.ACES_FILMIC=`ACESFilmicToneMapping`,e.CUSTOM=`CustomToneMapping`,e}({}),xs=function(e){return e[e.Color0=0]=`Color0`,e[e.Color1=1]=`Color1`,e[e.Color2=2]=`Color2`,e[e.Color3=3]=`Color3`,e[e.ColorMax=3]=`ColorMax`,e[e.DepthStencil=4]=`DepthStencil`,e}({}),Ss=function(){function e(){s(this,e),this.renderTargetIDs=[],this.renderTargetLevels=[],this.resolveTextureOutputIDs=[],this.resolveTextureOutputExternalTextures=[],this.resolveTextureOutputExternalTextureLevel=[],this.resolveTextureInputIDs=[],this.renderTargetExtraRefs=[],this.resolveTextureInputTextures=[],this.renderTargets=[],this.descriptor={colorAttachment:[],colorAttachmentLevel:[],colorResolveTo:[],colorResolveToLevel:[],colorStore:[],depthStencilAttachment:null,depthStencilResolveTo:null,depthStencilStore:!0,colorClearColor:[`load`],depthClearValue:`load`,stencilClearValue:`load`,occlusionQueryPool:null},this.viewportX=0,this.viewportY=0,this.viewportW=1,this.viewportH=1,this.execFunc=null,this.postFunc=null,this.debugThumbnails=[]}return c(e,[{key:`setDebugName`,value:function(e){this.debugName=e}},{key:`pushDebugThumbnail`,value:function(e){this.debugThumbnails[e]=!0}},{key:`setViewport`,value:function(e,t,n,r){this.viewportX=e,this.viewportY=t,this.viewportW=n,this.viewportH=r}},{key:`attachRenderTargetID`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;Y(this.renderTargetIDs[e]===void 0),this.renderTargetIDs[e]=t,this.renderTargetLevels[e]=n}},{key:`attachResolveTexture`,value:function(e){this.resolveTextureInputIDs.push(e)}},{key:`attachOcclusionQueryPool`,value:function(e){this.descriptor.occlusionQueryPool=e}},{key:`exec`,value:function(e){Y(this.execFunc===null),this.execFunc=e}},{key:`post`,value:function(e){Y(this.postFunc===null),this.postFunc=e}},{key:`addExtraRef`,value:function(e){this.renderTargetExtraRefs[e]=!0}}])}(),Cs=function(){function e(t,n){s(this,e),this.dimension=U.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.width=0,this.height=0,this.sampleCount=0,this.usage=Xn.RENDER_TARGET,this.needsClear=!0,this.texture=null,this.age=0,this.format=n.format,this.width=n.width,this.height=n.height,this.sampleCount=n.sampleCount,Y(this.sampleCount>=1),this.sampleCount>1?this.attachment=t.createRenderTarget(this):(this.texture=t.createTexture(this),this.attachment=t.createRenderTargetFromTexture(this.texture))}return c(e,[{key:`setDebugName`,value:function(e,t){this.debugName=t,this.texture!==null&&e.setResourceName(this.texture,this.debugName),e.setResourceName(this.attachment,this.debugName)}},{key:`matchesDescription`,value:function(e){return this.format===e.format&&this.width===e.width&&this.height===e.height&&this.sampleCount===e.sampleCount}},{key:`reset`,value:function(e){Y(this.matchesDescription(e)),this.age=0}},{key:`destroy`,value:function(){this.attachment.destroy()}}])}(),ws=function(){function e(t,n){s(this,e),this.dimension=U.TEXTURE_2D,this.depthOrArrayLayers=1,this.mipLevelCount=1,this.usage=Xn.RENDER_TARGET,this.width=0,this.height=0,this.age=0,this.format=n.format,this.width=n.width,this.height=n.height,this.texture=t.createTexture(this)}return c(e,[{key:`matchesDescription`,value:function(e){return this.format===e.format&&this.width===e.width&&this.height===e.height}},{key:`reset`,value:function(e){Y(this.matchesDescription(e)),this.age=0}},{key:`destroy`,value:function(){this.texture.destroy()}}])}(),Ts=c(function e(){s(this,e),this.renderTargetDescriptions=[],this.resolveTextureRenderTargetIDs=[],this.passes=[],this.renderTargetDebugNames=[]}),Es=function(){function e(t){s(this,e),this.currentPass=null,this.renderTargetDeadPool=[],this.singleSampledTextureDeadPool=[],this.currentGraph=null,this.renderTargetOutputCount=[],this.renderTargetResolveCount=[],this.resolveTextureUseCount=[],this.renderTargetAliveForID=[],this.singleSampledTextureForResolveTextureID=[],this.device=t}return c(e,[{key:`acquireRenderTargetForDescription`,value:function(e){for(var t=0;t<this.renderTargetDeadPool.length;t++){var n=this.renderTargetDeadPool[t];if(n.matchesDescription(e))return n.reset(e),this.renderTargetDeadPool.splice(t--,1),n}return new Cs(this.device,e)}},{key:`acquireSingleSampledTextureForDescription`,value:function(e){for(var t=0;t<this.singleSampledTextureDeadPool.length;t++){var n=this.singleSampledTextureDeadPool[t];if(n.matchesDescription(e))return n.reset(e),this.singleSampledTextureDeadPool.splice(t--,1),n}return new ws(this.device,e)}},{key:`beginGraphBuilder`,value:function(){Y(this.currentGraph===null),this.currentGraph=new Ts}},{key:`pushPass`,value:function(e){var t=new Ss;e(t),this.currentGraph.passes.push(t)}},{key:`createRenderTargetID`,value:function(e,t){return this.currentGraph.renderTargetDebugNames.push(t),this.currentGraph.renderTargetDescriptions.push(e)-1}},{key:`createResolveTextureID`,value:function(e){return this.currentGraph.resolveTextureRenderTargetIDs.push(e)-1}},{key:`findMostRecentPassThatAttachedRenderTarget`,value:function(e){for(var t=this.currentGraph.passes.length-1;t>=0;t--){var n=this.currentGraph.passes[t];if(n.renderTargetIDs.includes(e))return n}return null}},{key:`resolveRenderTargetPassAttachmentSlot`,value:function(e,t){var n=e;if(n.resolveTextureOutputIDs[t]===void 0){var r=n.renderTargetIDs[t],i=this.createResolveTextureID(r);n.resolveTextureOutputIDs[t]=i}return n.resolveTextureOutputIDs[t]}},{key:`findPassForResolveRenderTarget`,value:function(e){var t=fr(this.findMostRecentPassThatAttachedRenderTarget(e)),n=t.renderTargetIDs.indexOf(e);return Y(t.resolveTextureOutputExternalTextures[n]===void 0),t}},{key:`resolveRenderTarget`,value:function(e){var t=this.findPassForResolveRenderTarget(e),n=t.renderTargetIDs.indexOf(e);return this.resolveRenderTargetPassAttachmentSlot(t,n)}},{key:`resolveRenderTargetToExternalTexture`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,r=this.findPassForResolveRenderTarget(e),i=r.renderTargetIDs.indexOf(e);Y(r.resolveTextureOutputIDs[i]===void 0),r.resolveTextureOutputExternalTextures[i]=t,r.resolveTextureOutputExternalTextureLevel[i]=n}},{key:`getRenderTargetDescription`,value:function(e){return fr(this.currentGraph.renderTargetDescriptions[e])}},{key:`scheduleAddUseCount`,value:function(e,t){for(var n=0;n<t.renderTargetIDs.length;n++){var r=t.renderTargetIDs[n];r!==void 0&&(this.renderTargetOutputCount[r]++,t.renderTargetExtraRefs[n]&&this.renderTargetOutputCount[r]++)}for(var i=0;i<t.resolveTextureInputIDs.length;i++){var a=t.resolveTextureInputIDs[i];if(a!==void 0){this.resolveTextureUseCount[a]++;var o=e.resolveTextureRenderTargetIDs[a];this.renderTargetResolveCount[o]++}}}},{key:`acquireRenderTargetForID`,value:function(e,t){if(t===void 0)return null;if(Y(this.renderTargetOutputCount[t]>0),!this.renderTargetAliveForID[t]){var n=e.renderTargetDescriptions[t],r=this.acquireRenderTargetForDescription(n);r.setDebugName(this.device,e.renderTargetDebugNames[t]),this.renderTargetAliveForID[t]=r}return this.renderTargetAliveForID[t]}},{key:`releaseRenderTargetForID`,value:function(e,t){if(e===void 0)return null;var n=fr(this.renderTargetAliveForID[e]);return t?(Y(this.renderTargetOutputCount[e]>0),this.renderTargetOutputCount[e]--):(Y(this.renderTargetResolveCount[e]>0),this.renderTargetResolveCount[e]--),this.renderTargetOutputCount[e]===0&&this.renderTargetResolveCount[e]===0&&(n.needsClear=!0,this.renderTargetAliveForID[e]=void 0,this.renderTargetDeadPool.push(n)),n}},{key:`acquireResolveTextureInputTextureForID`,value:function(e,t){var n=e.resolveTextureRenderTargetIDs[t];Y(this.resolveTextureUseCount[t]>0),this.resolveTextureUseCount[t]--;var r=fr(this.releaseRenderTargetForID(n,!1));if(this.singleSampledTextureForResolveTextureID[t]!==void 0){var i=this.singleSampledTextureForResolveTextureID[t];return this.resolveTextureUseCount[t]===0&&this.singleSampledTextureDeadPool.push(i),i.texture}return fr(r.texture)}},{key:`determineResolveParam`,value:function(e,t,n){var r=t.renderTargetIDs[n],i=t.resolveTextureOutputIDs[n],a=t.resolveTextureOutputExternalTextures[n],o=i!==void 0,s=a!==void 0;Y(!(o&&s));var c=null,l=!1,u=0;if(this.renderTargetOutputCount[r]>1&&(l=!0),o){Y(e.resolveTextureRenderTargetIDs[i]===r),Y(this.resolveTextureUseCount[i]>0),Y(this.renderTargetOutputCount[r]>0);var d=fr(this.renderTargetAliveForID[r]);if(d.texture!==null&&this.renderTargetOutputCount[r]===1)c=null,l=!0;else{if(!this.singleSampledTextureForResolveTextureID[i]){var f=fr(e.renderTargetDescriptions[r]);this.singleSampledTextureForResolveTextureID[i]=this.acquireSingleSampledTextureForDescription(f),this.device.setResourceName(this.singleSampledTextureForResolveTextureID[i].texture,`${d.debugName} (Resolve ${i})`)}c=this.singleSampledTextureForResolveTextureID[i].texture}}else s?(c=a,u=t.resolveTextureOutputExternalTextureLevel[n]):c=null;return{resolveTo:c,store:l,level:u}}},{key:`schedulePass`,value:function(e,t){for(var n=t.renderTargetIDs[xs.DepthStencil],r=xs.Color0;r<=xs.ColorMax;r++){var i=t.renderTargetIDs[r],a=this.acquireRenderTargetForID(e,i);t.renderTargets[r]=a,t.descriptor.colorAttachment[r]=a===null?null:a.attachment,t.descriptor.colorAttachmentLevel[r]=t.renderTargetLevels[r];var o=this.determineResolveParam(e,t,r),s=o.resolveTo,c=o.store,l=o.level;t.descriptor.colorResolveTo[r]=s,t.descriptor.colorResolveToLevel[r]=l,t.descriptor.colorStore[r]=c,t.descriptor.colorClearColor[r]=a!==null&&a.needsClear?e.renderTargetDescriptions[i].colorClearColor:`load`}var u=this.acquireRenderTargetForID(e,n);t.renderTargets[xs.DepthStencil]=u,t.descriptor.depthStencilAttachment=u===null?null:u.attachment;var d=this.determineResolveParam(e,t,xs.DepthStencil),f=d.resolveTo,p=d.store;t.descriptor.depthStencilResolveTo=f,t.descriptor.depthStencilStore=p,t.descriptor.depthClearValue=u!==null&&u.needsClear?e.renderTargetDescriptions[n].depthClearValue:`load`,t.descriptor.stencilClearValue=u!==null&&u.needsClear?e.renderTargetDescriptions[n].stencilClearValue:`load`;for(var m=0,h=0,g=0,_=0;_<t.renderTargets.length;_++){var v=t.renderTargets[_];if(v){var y=v.width>>>t.renderTargetLevels[_],b=v.height>>>t.renderTargetLevels[_];m===0&&(m=y,h=b,g=v.sampleCount),Y(y===m),Y(b===h),Y(v.sampleCount===g),v.needsClear=!1}}m>0&&h>0&&(t.viewportX*=m,t.viewportY*=h,t.viewportW*=m,t.viewportH*=h);for(var x=0;x<t.resolveTextureInputIDs.length;x++){var S=t.resolveTextureInputIDs[x];t.resolveTextureInputTextures[x]=this.acquireResolveTextureInputTextureForID(e,S)}for(var C=0;C<t.renderTargetIDs.length;C++)this.releaseRenderTargetForID(t.renderTargetIDs[C],!0);for(var w=0;w<t.renderTargetExtraRefs.length;w++)t.renderTargetExtraRefs[w]&&this.releaseRenderTargetForID(t.renderTargetIDs[w],!0)}},{key:`scheduleGraph`,value:function(e){Y(this.renderTargetOutputCount.length===0),Y(this.renderTargetResolveCount.length===0),Y(this.resolveTextureUseCount.length===0);for(var t=0;t<this.renderTargetDeadPool.length;t++)this.renderTargetDeadPool[t].age++;for(var n=0;n<this.singleSampledTextureDeadPool.length;n++)this.singleSampledTextureDeadPool[n].age++;Cr(this.renderTargetOutputCount,e.renderTargetDescriptions.length,0),Cr(this.renderTargetResolveCount,e.renderTargetDescriptions.length,0),Cr(this.resolveTextureUseCount,e.resolveTextureRenderTargetIDs.length,0);for(var r=0;r<e.passes.length;r++)this.scheduleAddUseCount(e,e.passes[r]);for(var i=0;i<e.passes.length;i++)this.schedulePass(e,e.passes[i]);for(var a=0;a<this.renderTargetOutputCount.length;a++)Y(this.renderTargetOutputCount[a]===0);for(var o=0;o<this.renderTargetResolveCount.length;o++)Y(this.renderTargetResolveCount[o]===0);for(var s=0;s<this.resolveTextureUseCount.length;s++)Y(this.resolveTextureUseCount[s]===0);for(var c=0;c<this.renderTargetAliveForID.length;c++)Y(this.renderTargetAliveForID[c]===void 0);for(var l=1,u=0;u<this.renderTargetDeadPool.length;u++)this.renderTargetDeadPool[u].age>=l&&(this.renderTargetDeadPool[u].destroy(),this.renderTargetDeadPool.splice(u--,1));for(var d=0;d<this.singleSampledTextureDeadPool.length;d++)this.singleSampledTextureDeadPool[d].age>=l&&(this.singleSampledTextureDeadPool[d].destroy(),this.singleSampledTextureDeadPool.splice(d--,1));this.renderTargetResolveCount.length=0,this.renderTargetOutputCount.length=0,this.resolveTextureUseCount.length=0}},{key:`execPass`,value:function(e){Y(this.currentPass===null),this.currentPass=e;var t=this.device.createRenderPass(e.descriptor);t.pushDebugGroup(e.debugName),t.setViewport(e.viewportX,e.viewportY,e.viewportW,e.viewportH),e.execFunc!==null&&e.execFunc(t,this),t.popDebugGroup(),this.device.submitPass(t),e.postFunc!==null&&e.postFunc(this),this.currentPass=null}},{key:`execGraph`,value:function(e){var t=this;this.scheduleGraph(e),this.device.beginFrame(),e.passes.forEach(function(e){t.execPass(e)}),this.device.endFrame(),this.singleSampledTextureForResolveTextureID.length=0}},{key:`execute`,value:function(){var e=fr(this.currentGraph);this.execGraph(e),this.currentGraph=null}},{key:`getDebug`,value:function(){return this}},{key:`getPasses`,value:function(){return this.currentGraph.passes}},{key:`getPassDebugThumbnails`,value:function(e){return e.debugThumbnails}},{key:`getPassRenderTargetID`,value:function(e,t){return e.renderTargetIDs[t]}},{key:`getRenderTargetIDDebugName`,value:function(e){return this.currentGraph.renderTargetDebugNames[e]}},{key:`getResolveTextureForID`,value:function(e){var t=this.currentPass,n=t.resolveTextureInputIDs.indexOf(e);return Y(n>=0),fr(t.resolveTextureInputTextures[n])}},{key:`getRenderTargetAttachment`,value:function(e){var t=this.currentPass.renderTargets[e];return t?t.attachment:null}},{key:`getRenderTargetTexture`,value:function(e){var t=this.currentPass.renderTargets[e];return t?t.texture:null}},{key:`newGraphBuilder`,value:function(){return this.beginGraphBuilder(),this}},{key:`destroy`,value:function(){for(var e=0;e<this.renderTargetAliveForID.length;e++)Y(this.renderTargetAliveForID[e]===void 0);for(var t=0;t<this.singleSampledTextureForResolveTextureID.length;t++)Y(this.singleSampledTextureForResolveTextureID[t]===void 0);for(var n=0;n<this.renderTargetDeadPool.length;n++)this.renderTargetDeadPool[n].destroy();for(var r=0;r<this.singleSampledTextureDeadPool.length;r++)this.singleSampledTextureDeadPool[r].destroy()}}])}(),Ds=function(e){return e[e.BACKGROUND=0]=`BACKGROUND`,e[e.ALPHA_TEST=16]=`ALPHA_TEST`,e[e.OPAQUE=32]=`OPAQUE`,e[e.TRANSLUCENT=128]=`TRANSLUCENT`,e}({});function Os(e,t){return(e&16777215|(t&255)<<24)>>>0}function ks(e,t){return e>>>31&1?e:(e&4278190335|(t&65535)<<8)>>>0}function As(e,t){return Os(ks(0,t),e)}A(1,0,0,0,0,1,0,0,0,0,2,0,0,0,-1,1),A(1,0,0,0,0,1,0,0,0,0,.5,0,0,0,.5,1);function js(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0,a=arguments.length>5&&arguments[5]!==void 0?arguments[5]:0;return e[t+0]=n,e[t+1]=r,e[t+2]=i,e[t+3]=a,4}var Ms=function(e){return e[e.None=0]=`None`,e[e.Indexed=1]=`Indexed`,e[e.AllowSkippingIfPipelineNotReady=2]=`AllowSkippingIfPipelineNotReady`,e[e.Template=4]=`Template`,e[e.Draw=8]=`Draw`,e[e.InheritedFlags=3]=`InheritedFlags`,e}({}),Ns=function(){function e(){s(this,e),this.sortKey=0,this.debug=null,this.uniforms=[],this.bindingDescriptors=kr(1,function(){return{bindingLayout:null,samplerBindings:[],uniformBufferBindings:[]}}),this.dynamicUniformBufferByteOffsets=kr(4,function(){return 0}),this.flags=0,this.vertexBuffers=null,this.indexBuffer=null,this.drawStart=0,this.drawCount=0,this.drawInstanceCount=0,this.renderPipelineDescriptor={inputLayout:null,megaStateDescriptor:Lr(Br),program:null,topology:qn.TRIANGLES,colorAttachmentFormats:[],depthStencilAttachmentFormat:null,sampleCount:1},this.reset()}return c(e,[{key:`reset`,value:function(){this.sortKey=0,this.flags=Ms.AllowSkippingIfPipelineNotReady,this.vertexBuffers=null,this.indexBuffer=null,this.renderPipelineDescriptor.inputLayout=null}},{key:`setFromTemplate`,value:function(e){Ir(this.renderPipelineDescriptor.megaStateDescriptor,e.renderPipelineDescriptor.megaStateDescriptor),this.renderPipelineDescriptor.program=e.renderPipelineDescriptor.program,this.renderPipelineDescriptor.inputLayout=e.renderPipelineDescriptor.inputLayout,this.renderPipelineDescriptor.topology=e.renderPipelineDescriptor.topology,this.renderPipelineDescriptor.colorAttachmentFormats.length=Math.max(this.renderPipelineDescriptor.colorAttachmentFormats.length,e.renderPipelineDescriptor.colorAttachmentFormats.length);for(var t=0;t<e.renderPipelineDescriptor.colorAttachmentFormats.length;t++)this.renderPipelineDescriptor.colorAttachmentFormats[t]=e.renderPipelineDescriptor.colorAttachmentFormats[t];this.renderPipelineDescriptor.depthStencilAttachmentFormat=e.renderPipelineDescriptor.depthStencilAttachmentFormat,this.renderPipelineDescriptor.sampleCount=e.renderPipelineDescriptor.sampleCount,this.uniformBuffer=e.uniformBuffer,this.uniforms=l(e.uniforms),this.drawCount=e.drawCount,this.drawStart=e.drawStart,this.drawInstanceCount=e.drawInstanceCount,this.vertexBuffers=e.vertexBuffers,this.indexBuffer=e.indexBuffer,this.flags=this.flags&~Ms.InheritedFlags|e.flags&Ms.InheritedFlags,this.sortKey=e.sortKey;var n=this.bindingDescriptors[0],r=e.bindingDescriptors[0];this.setBindingLayout({numSamplers:r.samplerBindings?.length,numUniformBuffers:r.uniformBufferBindings?.length});for(var i=0;i<Math.min(n.uniformBufferBindings.length,r.uniformBufferBindings.length);i++)n.uniformBufferBindings[i].size=e.bindingDescriptors[0].uniformBufferBindings[i].size;this.setSamplerBindingsFromTextureMappings(r.samplerBindings);for(var a=0;a<e.dynamicUniformBufferByteOffsets.length;a++)this.dynamicUniformBufferByteOffsets[a]=e.dynamicUniformBufferByteOffsets[a]}},{key:`validate`,value:function(){for(var e=0;e<this.bindingDescriptors.length;e++)for(var t=this.bindingDescriptors[e],n=0;n<(r=t.uniformBufferBindings)?.length;n++){var r;Y(t.uniformBufferBindings[n].size>0)}Y(this.drawCount>0)}},{key:`setProgram`,value:function(e){this.renderPipelineDescriptor.program=e}},{key:`setMegaStateFlags`,value:function(e){return Ir(this.renderPipelineDescriptor.megaStateDescriptor,e),this.renderPipelineDescriptor.megaStateDescriptor}},{key:`getMegaStateFlags`,value:function(){return this.renderPipelineDescriptor.megaStateDescriptor}},{key:`setVertexInput`,value:function(e,t,n){this.vertexBuffers=t,this.indexBuffer=n,this.renderPipelineDescriptor.inputLayout=e}},{key:`setBindingLayout`,value:function(e){Y(e.numUniformBuffers<this.dynamicUniformBufferByteOffsets.length);for(var t=this.bindingDescriptors[0].uniformBufferBindings.length;t<e.numUniformBuffers;t++)this.bindingDescriptors[0].uniformBufferBindings.push({binding:t,buffer:null,size:0});for(var n=this.bindingDescriptors[0].samplerBindings.length;n<e.numSamplers;n++)this.bindingDescriptors[0].samplerBindings.push({sampler:null,texture:null})}},{key:`drawIndexes`,value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;this.flags=Or(this.flags,Ms.Indexed,!0),this.drawCount=e,this.drawStart=t,this.drawInstanceCount=1}},{key:`drawIndexesInstanced`,value:function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0;this.flags=Or(this.flags,Ms.Indexed,!0),this.drawCount=e,this.drawStart=n,this.drawInstanceCount=t}},{key:`drawPrimitives`,value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;this.flags=Or(this.flags,Ms.Indexed,!1),this.drawCount=e,this.drawStart=t,this.drawInstanceCount=1}},{key:`setUniforms`,value:function(e,t){if(t.length!==0){this.uniforms[e]=t;var n=0,r=[];t.forEach(function(e){var t=e.value;if(De(t)||Array.isArray(t)||t instanceof Float32Array){var i=De(t)?[t]:t,a=i.length>4?4:i.length,o=4-n%4;if(o!==4&&!(o>=a)){n+=o;for(var s=0;s<o;s++)r.push(0)}n+=i.length,r.push.apply(r,l(i))}});var i=4-r.length%4;if(i!==4)for(var a=0;a<i;a++)r.push(0);for(var o=this.allocateUniformBuffer(e,r.length),s=this.mapUniformBufferF32(e),c=0;c<r.length;c+=4)o+=js(s,o,r[c],r[c+1],r[c+2],r[c+3])}}},{key:`setUniformBuffer`,value:function(e){this.uniformBuffer=e}},{key:`allocateUniformBuffer`,value:function(e,t){Y(this.bindingDescriptors[0].uniformBufferBindings?.length<this.dynamicUniformBufferByteOffsets.length),this.dynamicUniformBufferByteOffsets[e]=this.uniformBuffer.allocateChunk(t)<<2;var n=this.bindingDescriptors[0].uniformBufferBindings[e];return n.size=t<<2,this.getUniformBufferOffset(e)}},{key:`getUniformBufferOffset`,value:function(e){return this.dynamicUniformBufferByteOffsets[e]>>>2}},{key:`mapUniformBufferF32`,value:function(e){return this.uniformBuffer.mapBufferF32()}},{key:`getUniformBuffer`,value:function(){return this.uniformBuffer}},{key:`setSamplerBindingsFromTextureMappings`,value:function(e){e=e.filter(function(e){return e});for(var t=0;t<this.bindingDescriptors[0].samplerBindings.length;t++){var n=this.bindingDescriptors[0].samplerBindings[t],r=e[t];r==null?(n.texture=null,n.sampler=null):(n.texture=r.texture,n.sampler=r.sampler)}}},{key:`setAllowSkippingIfPipelineNotReady`,value:function(e){this.flags=Or(this.flags,Ms.AllowSkippingIfPipelineNotReady,e)}},{key:`setAttachmentFormatsFromRenderPass`,value:function(e,t){for(var n=e.queryRenderPass(t),r=-1,i=0;i<n.colorAttachment.length;i++){var a=n.colorAttachment[i]===null?null:e.queryRenderTarget(n.colorAttachment[i]);this.renderPipelineDescriptor.colorAttachmentFormats[i]=a===null?null:a.format,a!==null&&(r===-1?r=a.sampleCount:Y(r===a.sampleCount))}var o=n.depthStencilAttachment===null?null:e.queryRenderTarget(n.depthStencilAttachment);this.renderPipelineDescriptor.depthStencilAttachmentFormat=o===null?null:o.format,o!==null&&(r===-1?r=o.sampleCount:Y(r===o.sampleCount)),Y(r>0),this.renderPipelineDescriptor.sampleCount=r}},{key:`drawOnPass`,value:function(e,t){var n=this,r=e.device;this.setAttachmentFormatsFromRenderPass(r,t);var a=e.createRenderPipeline(this.renderPipelineDescriptor);if(!r.pipelineQueryReady(a)){if(this.flags&Ms.AllowSkippingIfPipelineNotReady)return!1;r.pipelineForceReady(a)}t.setPipeline(a),t.setVertexInput(this.renderPipelineDescriptor.inputLayout,this.vertexBuffers,this.indexBuffer);for(var o=0;o<this.bindingDescriptors[0].uniformBufferBindings.length;o++)this.bindingDescriptors[0].uniformBufferBindings[o].buffer=fr(this.uniformBuffer.buffer),this.bindingDescriptors[0].uniformBufferBindings[o].offset=this.dynamicUniformBufferByteOffsets[o];this.renderPipelineDescriptor.program.gl_program&&this.uniforms.forEach(function(e){var t={};e.forEach(function(e){var n=e.name;t[n]=e.value}),n.renderPipelineDescriptor.program.setUniformsLegacy(t)});var s=e.createBindings(i(i({},this.bindingDescriptors[0]),{},{pipeline:a}));return t.setBindings(s),this.flags&Ms.Indexed?t.drawIndexed(this.drawCount,this.drawInstanceCount,this.drawStart,0,0):t.draw(this.drawCount,this.drawInstanceCount,this.drawStart,0),!0}}])}();function Ps(e,t){return e.sortKey-t.sortKey}var Fs=function(e){return e[e.Forwards=0]=`Forwards`,e[e.Backwards=1]=`Backwards`,e}({}),Is=function(){function e(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ps,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Fs.Forwards;s(this,e),this.renderInsts=[],this.usePostSort=!1,this.compareFunction=t,this.executionOrder=n}return c(e,[{key:`checkUsePostSort`,value:function(){this.usePostSort=this.compareFunction!==null&&this.renderInsts.length>=500}},{key:`insertSorted`,value:function(e){this.compareFunction===null||this.usePostSort?this.renderInsts.push(e):Dr(this.renderInsts,e,this.compareFunction),this.checkUsePostSort()}},{key:`submitRenderInst`,value:function(e){e.flags|=Ms.Draw,this.insertSorted(e)}},{key:`ensureSorted`,value:function(){this.usePostSort&&=(this.renderInsts.length!==0&&this.renderInsts.sort(this.compareFunction),!1)}},{key:`drawOnPassRendererNoReset`,value:function(e,t){if(this.ensureSorted(),this.executionOrder===Fs.Forwards)for(var n=0;n<this.renderInsts.length;n++)this.renderInsts[n].drawOnPass(e,t);else for(var r=this.renderInsts.length-1;r>=0;r--)this.renderInsts[r].drawOnPass(e,t)}},{key:`reset`,value:function(){this.renderInsts.length=0}},{key:`drawOnPassRenderer`,value:function(e,t){this.drawOnPassRendererNoReset(e,t),this.reset()}}])}(),Ls=function(){function e(){s(this,e),this.pool=[],this.allocCount=0}return c(e,[{key:`allocRenderInstIndex`,value:function(){return this.allocCount++,this.allocCount>this.pool.length&&this.pool.push(new Ns),this.allocCount-1}},{key:`popRenderInst`,value:function(){this.allocCount--}},{key:`reset`,value:function(){for(var e=0;e<this.pool.length;e++)this.pool[e].reset();this.allocCount=0}},{key:`destroy`,value:function(){this.pool.length=0,this.allocCount=0}}])}(),Rs=function(){function e(t){s(this,e),this.instPool=new Ls,this.templatePool=new Ls,this.simpleRenderInstList=new Is,this.currentRenderInstList=this.simpleRenderInstList,this.renderCache=t}return c(e,[{key:`newRenderInst`,value:function(){var e=this.templatePool.allocCount-1,t=this.instPool.allocRenderInstIndex(),n=this.instPool.pool[t];return n.debug=null,e>=0&&n.setFromTemplate(this.templatePool.pool[e]),n}},{key:`submitRenderInst`,value:function(e){(arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.currentRenderInstList).submitRenderInst(e)}},{key:`setCurrentRenderInstList`,value:function(e){Y(this.simpleRenderInstList===null),this.currentRenderInstList=e}},{key:`pushTemplateRenderInst`,value:function(){var e=this.templatePool.allocCount-1,t=this.templatePool.allocRenderInstIndex(),n=this.templatePool.pool[t];return e>=0&&n.setFromTemplate(this.templatePool.pool[e]),n.flags|=Ms.Template,n}},{key:`popTemplateRenderInst`,value:function(){this.templatePool.popRenderInst()}},{key:`getTemplateRenderInst`,value:function(){var e=this.templatePool.allocCount-1;return this.templatePool.pool[e]}},{key:`resetRenderInsts`,value:function(){this.instPool.reset(),this.simpleRenderInstList!==null&&this.simpleRenderInstList.reset(),Y(this.templatePool.allocCount===0)}},{key:`destroy`,value:function(){this.instPool.destroy(),this.renderCache.destroy()}},{key:`disableSimpleMode`,value:function(){this.simpleRenderInstList=null}},{key:`drawOnPassRenderer`,value:function(e){fr(this.simpleRenderInstList).drawOnPassRenderer(this.renderCache,e)}},{key:`drawOnPassRendererNoReset`,value:function(e){fr(this.simpleRenderInstList).drawOnPassRendererNoReset(this.renderCache,e)}}])}(),zs=function(){function e(t){s(this,e),this.parameters=t}return c(e,[{key:`getDevice`,value:function(){return this.device}},{key:`setDevice`,value:function(e){this.device=e,this.renderCache=new ys(e),this.renderGraph=new Es(this.device),this.renderInstManager=new Rs(this.renderCache),this.uniformBuffer=new is(this.device)}},{key:`pushTemplateRenderInst`,value:function(){var e=this.renderInstManager.pushTemplateRenderInst();return e.setUniformBuffer(this.uniformBuffer),e}},{key:`prepareToRender`,value:function(){this.uniformBuffer.prepareToRender()}},{key:`destroy`,value:function(){this.uniformBuffer&&this.uniformBuffer.destroy(),this.renderInstManager&&this.renderInstManager.destroy(),this.renderCache&&this.renderCache.destroy(),this.renderGraph&&this.renderGraph.destroy()}},{key:`getCache`,value:function(){return this.renderCache}},{key:`getDefines`,value:function(){return{USE_TONEMAPPING:this.parameters?.toneMapping&&this.parameters?.toneMapping!==bs.NONE,toneMapping:this.parameters?.toneMapping}}}])}(),Bs=function(){function e(t){s(this,e),this.width=0,this.height=0,this.sampleCount=0,this.colorClearColor=`load`,this.depthClearValue=`load`,this.stencilClearValue=`load`,this.format=t}return c(e,[{key:`setDimensions`,value:function(e,t,n){this.width=e,this.height=t,this.sampleCount=n}},{key:`copyDimensions`,value:function(e){this.width=e.width,this.height=e.height,this.sampleCount=e.sampleCount}}])}();function Vs(e){return{colorClearColor:e,depthClearValue:1,stencilClearValue:0}}gr(.88,.88,.88,1);var Hs=Vs(yr),Us=function(e){return e[e.None=0]=`None`,e[e.FXAA=1]=`FXAA`,e[e.MSAAx4=2]=`MSAAx4`,e}({});function Ws(e){if(e===xs.Color0)return J.U8_RGBA_RT;if(e===xs.DepthStencil)return J.D24_S8;throw Error(`whoops`)}function Gs(e){return e.antialiasingMode===Us.MSAAx4?4:1}function Ks(e,t){var n=Gs(t);e.setDimensions(t.backbufferWidth,t.backbufferHeight,n)}function qs(e,t,n){var r=new Bs(Ws(e));return Ks(r,t),n!==null&&(r.colorClearColor=n.colorClearColor,r.depthClearValue=n.depthClearValue,r.stencilClearValue=n.stencilClearValue),r}var Js=function(){function e(){s(this,e),this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}return c(e,[{key:`reset`,value:function(){this.texture=null,this.sampler=null,this.width=0,this.height=0,this.lodBias=0}},{key:`copy`,value:function(e){this.texture=e.texture,this.sampler=e.sampler,this.width=e.width,this.height=e.height,this.lodBias=e.lodBias}}])}(),Ys=[`style`],Xs=function(e){function t(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.style,r=o(e,Ys);return s(this,t),d(this,t,[i({type:t.tag,style:i({intensity:Math.PI},n)},r)])}return p(t,e),c(t)}(x);Xs.PARSED_STYLE_LIST=new Set([].concat(l(x.PARSED_STYLE_LIST),[`intensity`])),Xs.tag=`light`;var Zs=[`style`],Qs=function(e){return e[e.NONE=0]=`NONE`,e[e.EXP=1]=`EXP`,e[e.EXP2=2]=`EXP2`,e[e.LINEAR=3]=`LINEAR`,e}({}),$s=function(e){function t(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.style,r=o(e,Zs);return s(this,t),d(this,t,[i({type:t.tag,style:i({type:Qs.NONE,fill:`black`,start:1,end:1e3,density:0},n)},r)])}return p(t,e),c(t)}(x);$s.PARSED_STYLE_LIST=new Set([].concat(l(x.PARSED_STYLE_LIST),[`type`,`density`,`start`,`end`])),$s.tag=`fog`;function ec(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:Jn.STATIC,i=e.createBuffer({viewOrSize:n.byteLength,usage:t,hint:r});return i.setSubData(0,new Uint8Array(n)),i}var tc=function(e){return e.CHANGED=`changed`,e}({}),nc=function(e){function t(e){var n,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),n=d(this,t),n.drawMode=qn.TRIANGLES,n.vertexBuffers=[],n.vertices=[],n.inputLayoutDescriptor={vertexBufferDescriptors:[],indexBufferFormat:null,program:null},n.vertexCount=0,n.instancedCount=0,n.indexStart=0,n.primitiveStart=0,n.dirty=!0,n.meshes=[],n.device=e,n.props=r,n}return p(t,e),c(t,[{key:`validate`,value:function(e){return!0}},{key:`build`,value:function(e){}},{key:`computeBoundingBox`,value:function(){return new Se}},{key:`setIndexBuffer`,value:function(e){return this.indexBuffer&&this.indexBuffer.destroy(),this.indexBuffer=ec(this.device,V.INDEX,new Uint32Array(ArrayBuffer.isView(e)?e.buffer:e).buffer),this.indices=e,this.inputLayoutDescriptor.indexBufferFormat=J.U32_R,this}},{key:`setVertexBuffer`,value:function(e){var t=this,n=e.bufferIndex,r=e.byteStride,i=e.stepMode,a=e.attributes,o=e.data;this.inputLayoutDescriptor.vertexBufferDescriptors[n]={arrayStride:r,stepMode:i,attributes:[]},this.vertices[n]=o,a.forEach(function(e){var r=e.format,i=e.bufferByteOffset,a=e.location,o=e.divisor;e.byteStride;var s=t.inputLayoutDescriptor.vertexBufferDescriptors[n].attributes.find(function(e){return e.shaderLocation===a});s?(s.format=r,s.offset=i,s.divisor=o):t.inputLayoutDescriptor.vertexBufferDescriptors[n].attributes.push({format:r,offset:i,shaderLocation:a,divisor:o})}),this.vertexBuffers[n]&&this.vertexBuffers[n].destroy();var s=ec(this.device,V.VERTEX,o.buffer,Jn.DYNAMIC);return this.vertexBuffers[n]=s,this}},{key:`getVertexBuffer`,value:function(e){return this.vertexBuffers[e]}},{key:`updateVertexBuffer`,value:function(e,t,n,r){var i=this.inputLayoutDescriptor.vertexBufferDescriptors[e];if(i){var a=i.arrayStride,o=this.inputLayoutDescriptor.vertexBufferDescriptors[e].attributes.find(function(e){return e.shaderLocation===t});if(o){var s=this.getVertexBuffer(e),c=n*a;s.setSubData(o.offset+c,r)}this.emit(tc.CHANGED)}}},{key:`updateIndices`,value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return this.indexBuffer&&this.indexBuffer.setSubData(t,new Uint8Array(ArrayBuffer.isView(e)?e:new Uint32Array(e))),this}},{key:`destroy`,value:function(){this.vertexBuffers.forEach(function(e){e&&e.destroy()}),this.indexBuffer&&this.indexBuffer.destroy(),this.inputLayoutDescriptor.vertexBufferDescriptors=[],this.indexBuffer=void 0,this.vertexBuffers=[],this.indices=void 0,this.vertices=[],this.vertexCount=0,this.instancedCount=0}}])}(we),rc=`#define GLSLIFY 1
layout(location = 0) in vec2 a_Position;

out vec2 v_TexCoord;

void main() {
  v_TexCoord = 0.5 * (a_Position + 1.0);
  gl_Position = vec4(a_Position, 0., 1.);

  #ifdef VIEWPORT_ORIGIN_TL
    v_TexCoord.y = 1.0 - v_TexCoord.y;
  #endif
}`,ic=`#define GLSLIFY 1
uniform sampler2D u_Texture;
in vec2 v_TexCoord;

out vec4 outputColor;

float MonochromeNTSC(vec3 t_Color) {
  // NTSC primaries.
  return dot(t_Color.rgb, vec3(0.299, 0.587, 0.114));
}

vec4 FXAA(PD_SAMPLER_2D(t_Texture), in vec2 t_PixelCenter, in vec2 t_InvResolution) {
  // FXAA v2, based on implementations:
  // http://www.geeks3d.com/20110405/fxaa-fast-approximate-anti-aliasing-demo-glsl-opengl-test-radeon-geforce/
  // https://github.com/mitsuhiko/webgl-meincraft

  float lumaMM = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy).rgb);

  #if 1
    vec2 t_PixelTopLeft = t_PixelCenter.xy - t_InvResolution.xy * 0.5;
    float lumaNW = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelTopLeft.xy)             .rgb);
    float lumaNE = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelTopLeft.xy + vec2(1.0, 0.0)).rgb);
    float lumaSW = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelTopLeft.xy + vec2(0.0, 1.0)).rgb);
    float lumaSE = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelTopLeft.xy + vec2(1.0, 1.0)).rgb);
  #else
    // We're at the pixel center -- pixel edges are 0.5 units away.
    // NOTE(jstpierre): mitsuhiko's port seems to get this wrong?
    vec2 t_PixelSize = t_InvResolution.xy * 0.5;

    float lumaNW = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + t_PixelSize * vec2(-1.0, -1.0)).rgb);
    float lumaNE = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + t_PixelSize * vec2( 1.0, -1.0)).rgb);
    float lumaSW = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + t_PixelSize * vec2(-1.0,  1.0)).rgb);
    float lumaSE = MonochromeNTSC(texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + t_PixelSize * vec2( 1.0,  1.0)).rgb);
  #endif

  vec2 dir; 
  dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
  dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

  const float FXAA_REDUCE_MIN = 1.0/128.0;
  const float FXAA_REDUCE_MUL = 1.0/8.0;
  const float FXAA_SPAN_MAX = 8.0;

  float dirReduce = max(
      (lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),
      FXAA_REDUCE_MIN);

  float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);
  dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * u_InvResolution.xy;

  float lumaMin = min(lumaMM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
  float lumaMax = max(lumaMM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

  vec4 rgbA = (1.0/2.0) * (
      texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + dir * (1.0/3.0 - 0.5)) +
      texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + dir * (2.0/3.0 - 0.5)));
  vec4 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (
      texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + dir * (0.0/3.0 - 0.5)) +
      texture(PU_SAMPLER_2D(t_Texture), t_PixelCenter.xy + dir * (3.0/3.0 - 0.5)));
  float lumaB = MonochromeNTSC(rgbB.rgb);

  vec4 rgbOutput = ((lumaB < lumaMin) || (lumaB > lumaMax)) ? rgbA : rgbB;
  return rgbOutput;
}

void main() {
  outputColor = FXAA(PP_SAMPLER_2D(u_Texture), v_TexCoord.xy, u_InvResolution.xy);
}`,ac=function(e){function t(){var e;s(this,t);var n=[...arguments];return e=d(this,t,[].concat(n)),e.features={},e.both=`
layout(std140) uniform ub_Params {
    vec4 u_Misc[1];
};
#define u_InvResolution (u_Misc[0].xy)
`,e.vert=rc,e.frag=ic,e}return p(t,e),c(t)}(rs),oc=kr(1,function(){return new Js}),sc,cc;function lc(e,t,n,r){e.pushPass(function(i){i.setDebugName(`FXAA`),i.attachRenderTargetID(xs.Color0,r);var a=e.resolveRenderTarget(r);i.attachResolveTexture(a);var o=t.renderInstManager.newRenderInst();o.setUniformBuffer(t.uniformBuffer),o.setAllowSkippingIfPipelineNotReady(!1),o.setMegaStateFlags(Hr),o.setBindingLayout({numUniformBuffers:1,numSamplers:1}),o.drawPrimitives(3);var s=o.allocateUniformBuffer(0,4);js(o.mapUniformBufferF32(0),s,1/n.backbufferWidth,1/n.backbufferHeight);var c=new ac,l=t.renderCache.createProgramSimple(c);o.setProgram(l),sc||(sc=new nc(t.getDevice()),sc.setVertexBuffer({bufferIndex:0,byteStride:8,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:0}],data:new Float32Array([1,3,-3,-1,1,-1])}),sc.vertexCount=3,cc=t.getCache().createInputLayout(sc.inputLayoutDescriptor)),i.exec(function(e,n){oc[0].texture=n.getResolveTextureForID(a),o.setSamplerBindingsFromTextureMappings(oc),o.setVertexInput(cc,sc.vertexBuffers.map(function(e){return{buffer:e,byteOffset:0}}),null),o.drawOnPass(t.renderCache,e)})})}var uc=0,dc=function(e){return e.PROJECTION_MATRIX=`u_ProjectionMatrix`,e.VIEW_MATRIX=`u_ViewMatrix`,e.CAMERA_POSITION=`u_CameraPosition`,e.DEVICE_PIXEL_RATIO=`u_DevicePixelRatio`,e.VIEWPORT=`u_Viewport`,e.IS_ORTHO=`u_IsOrtho`,e.IS_PICKING=`u_IsPicking`,e}({}),fc=function(){function e(t,n,r,i,a){s(this,e),this.renderLists={leftEye:new Is,rightEye:new Is,picking:new Is},this.cameras=[],this.renderHelper=t,this.lightPool=n,this.texturePool=r,this.batchManager=i,this.options=a}return c(e,[{key:`getDevice`,value:function(){return this.device}},{key:`getSwapChain`,value:function(){return this.swapChain}},{key:`getRenderLists`,value:function(){return this.renderLists}},{key:`apply`,value:function(t){var n=this;this.context=t;var r=t.renderingService,a=t.renderingContext,o=t.config,s=a.root.ownerDocument.defaultView;o.disableRenderHooks=!0;var c=function(e){var t=e.target;t.nodeName===Xs.tag?n.lightPool.addLight(t):t.nodeName===$s.tag?n.lightPool.addFog(t):(t.renderable3D||=new Zo,n.batchManager.add(t))},d=function(e){var t=e.target;if(t.nodeName===Xs.tag)n.lightPool.removeLight(t);else if(t.nodeName===$s.tag)n.lightPool.removeFog(t);else{if(t.nodeName===I.MESH){var r,i;if((r=t.style.geometry)!=null&&r.meshes){var a=t.style.geometry.meshes.indexOf(t);a>-1&&t.style.geometry.meshes.splice(a,1)}if((i=t.style.material)!=null&&i.meshes){var o=t.style.material.meshes.indexOf(t);o>-1&&t.style.material.meshes.splice(o,1)}}n.swapChain&&n.batchManager.remove(t),delete t.renderable3D}},p=function(e){if(n.swapChain){var t=e.target,r=e.attrName,i=e.newValue;r===`zIndex`?t.parentNode.forEach(function(e){n.batchManager.changeRenderOrder(e,e.sortable.renderOrder)}):n.batchManager.updateAttribute(t,r,i)}},m=function(e){if(n.swapChain)for(var t=e.detail,r=0;r<t.length;r++){var i=t[r].target;(i.nodeName===I.FRAGMENT?i.childNodes:[i]).forEach(function(e){n.batchManager.updateAttribute(e,`modelMatrix`,null)})}};r.hooks.initAsync.tapPromise(e.tag,u(f().mark(function e(){var r,a,o,l;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s.addEventListener(g.MOUNTED,c),s.addEventListener(g.UNMOUNTED,d),s.addEventListener(g.ATTR_MODIFIED,p),s.addEventListener(g.BOUNDS_CHANGED,m),n.context.config.renderer.getConfig().enableDirtyRectangleRendering=!1,r=n.context.contextService.getDomElement(),a=n.context.config,o=a.width,l=a.height,n.context.contextService.resize(o,l),e.next=1,n.context.deviceContribution.createSwapChain(r);case 1:n.swapChain=e.sent,n.device=n.swapChain.getDevice(),n.renderHelper.setDevice(n.device),n.renderHelper.renderInstManager.disableSimpleMode(),n.swapChain.configureSwapChain(r.width,r.height),s.addEventListener(le.RESIZE,function(){n.swapChain.configureSwapChain(r.width,r.height)}),n.batchManager.attach(i({device:n.device},t));case 2:case`end`:return e.stop()}},e)}))),r.hooks.destroy.tap(e.tag,function(){n.renderHelper.destroy(),n.batchManager.destroy(),n.texturePool.destroy(),s.removeEventListener(g.MOUNTED,c),s.removeEventListener(g.UNMOUNTED,d),s.removeEventListener(g.ATTR_MODIFIED,p),s.removeEventListener(g.BOUNDS_CHANGED,m),n.device.destroy(),n.device.checkForLeaks(),o.disableRenderHooks=!1}),r.hooks.beginFrame.tap(e.tag,function(e){var t,r=e?.session,i=n.context.config,a=i.width,o=i.height;if(r){var s=r.renderState.baseLayer;s||=r.renderState.layers[0],n.swapChain.configureSwapChain(s.framebufferWidth,s.framebufferHeight,s.framebuffer);var c=r.referenceSpace,u=e.getViewerPose(c);u&&u.views.forEach(function(e,t){var i=r.renderState.baseLayer.getViewport(e),c=A.apply(ce,l(e.transform.matrix));c[12]*=a,c[13]*=o,c[14]*=500,c[12]+=a/2,c[13]-=o/2,c[14]+=250;var u=A.apply(ce,l(e.projectionMatrix)),d=O(N(),c);ie(d,d,M(1,-1,1));var f=e.transform.position,p=f.x,m=f.y,h=f.z;n.cameras[t]={viewport:{x:i.x/s.framebufferWidth,y:i.y/s.framebufferHeight,width:i.width/s.framebufferWidth,height:i.height/s.framebufferHeight},projectionMatrix:u,viewMatrix:d,cameraPosition:[p,m,h],isOrtho:!1}})}else{var d=n.context.camera;n.cameras=[{viewport:{x:0,y:0,width:1,height:1},projectionMatrix:d.getPerspective(),viewMatrix:d.getViewTransform(),cameraPosition:d.getPosition(),isOrtho:d.isOrtho()}]}var f=n.swapChain.getCanvas(),p=n.renderHelper.renderInstManager;n.builder=n.renderHelper.renderGraph.newGraphBuilder();var m;if(n.context.config.background===`transparent`)m=_r;else{var g=h(n.context.config.background);m=n.context.config.background?gr(Number(g.r)/255*Number(g.alpha),Number(g.g)/255*Number(g.alpha),Number(g.b)/255*Number(g.alpha),Number(g.alpha)):vr}var _={backbufferWidth:f.width,backbufferHeight:f.height,antialiasingMode:Us.None},v=qs(xs.Color0,_,Vs(m)),y=qs(xs.DepthStencil,_,Hs),b=n.builder.createRenderTargetID(v,`Main Color`),x=n.builder.createRenderTargetID(y,`Main Depth`);n.builder.pushPass(function(e){e.setDebugName(`Main Render Pass`),e.attachRenderTargetID(xs.Color0,b),e.attachRenderTargetID(xs.DepthStencil,x),e.exec(function(e,t){n.cameras.forEach(function(r,i){var a=r.viewport,o=a.x,s=a.y,c=a.width,l=a.height,u=t.currentPass,d=u.viewportW,f=u.viewportH;e.setViewport(o*d,s*f,c*d,l*f),(i===0?n.renderLists.leftEye:n.renderLists.rightEye).drawOnPassRenderer(p.renderCache,e)})})}),(t=n.options)!=null&&t.enableFXAA&&lc(n.builder,n.renderHelper,_,b),n.builder.resolveRenderTargetToExternalTexture(b,n.swapChain.getOnscreenTexture())}),r.hooks.endFrame.tap(e.tag,function(e){var t=n.renderHelper.renderInstManager,r=n.context.config,i=r.width,a=r.height;if(n.cameras.forEach(function(e,r){var o=e.viewport,s=e.cameraPosition,c=e.viewMatrix,l=e.projectionMatrix,u=e.isOrtho,d=o.width,f=o.height,p=n.renderHelper.pushTemplateRenderInst();p.setBindingLayout({numUniformBuffers:2,numSamplers:0}),p.setMegaStateFlags(Ur({depthWrite:!0,blendConstant:_r},{rgbBlendMode:Un.ADD,alphaBlendMode:Un.ADD,rgbBlendSrcFactor:Hn.SRC_ALPHA,alphaBlendSrcFactor:Hn.ONE,rgbBlendDstFactor:Hn.ONE_MINUS_SRC_ALPHA,alphaBlendDstFactor:Hn.ONE_MINUS_SRC_ALPHA})),p.setUniforms(uc,[{name:dc.PROJECTION_MATRIX,value:l},{name:dc.VIEW_MATRIX,value:c},{name:dc.CAMERA_POSITION,value:s},{name:dc.DEVICE_PIXEL_RATIO,value:n.context.contextService.getDPR()},{name:dc.VIEWPORT,value:[i*d,a*f]},{name:dc.IS_ORTHO,value:+!!u},{name:dc.IS_PICKING,value:0}]),n.batchManager.render(r===0?n.renderLists.leftEye:n.renderLists.rightEye),t.popTemplateRenderInst()}),n.renderHelper.prepareToRender(),n.renderHelper.renderGraph.execute(),t.resetRenderInsts(),n.enableCapture&&n.resolveCapturePromise){var o=n.captureOptions,s=o.type,c=o.encoderOptions,l=n.context.contextService.getDomElement().toDataURL(s,c);n.resolveCapturePromise(l),n.enableCapture=!1,n.captureOptions=void 0,n.resolveCapturePromise=void 0}})}},{key:`loadTexture`,value:function(e,t,n){return this.texturePool.getOrCreateTexture(this.device,e,t,function(e){n&&n(e)})}},{key:`toDataURL`,value:function(){var e=u(f().mark(function e(t){var n=this;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.enableCapture=!0,this.captureOptions=t,this.capturePromise=new Promise(function(e){n.resolveCapturePromise=function(t){e(t)}}),e.abrupt(`return`,this.capturePromise);case 1:case`end`:return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}])}();fc.tag=`RenderGraph`;var pc=100,mc=function(){function e(t,n,r,i){s(this,e),this.renderHelper=t,this.renderGraphPlugin=n,this.pickingIdGenerator=r,this.batchManager=i}return c(e,[{key:`apply`,value:function(t){var n=this;this.context=t;var r=t.renderingService,i=t.renderingContext.root.ownerDocument.defaultView,a=function(e){var t=e.target;t.renderable3D||=new Zo;var r=t.renderable3D,i=n.pickingIdGenerator.getId(t);r.pickingId=i,r.encodedPickingColor=n.pickingIdGenerator.encodePickingColor(i)},o=function(e){var t=e.target.renderable3D;t&&n.pickingIdGenerator.deleteById(t.pickingId)};r.hooks.init.tap(e.tag,function(){i.addEventListener(g.MOUNTED,a),i.addEventListener(g.UNMOUNTED,o)}),r.hooks.destroy.tap(e.tag,function(){i.removeEventListener(g.MOUNTED,a),i.removeEventListener(g.UNMOUNTED,o),n.pickingIdGenerator.reset()}),r.hooks.pickSync.tap(e.tag,function(e){return n.pick(e)}),r.hooks.pick.tapPromise(e.tag,function(){var e=u(f().mark(function e(t){return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt(`return`,n.pick(t));case 1:case`end`:return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}},{key:`pick`,value:function(e){var t=e.topmost,n=e.position,r=n.viewportX,i=n.viewportY,a=this.context.contextService.getDPR(),o=this.context.config.width*a,s=this.context.config.height*a,c=r*a,l=i*a;return!this.renderHelper.renderGraph||c>o||c<0||l>s||l<0?(e.picked=[],e):(e.picked=this.pickByRectangleInDepth(new fe(Ne(Math.round(c),0,o-1),Ne(Math.round(l),0,s-1),1,1),t?1:pc),e)}},{key:`pickByRectangleInDepth`,value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:pc,n=null,r=1,i=[];do if(n=this.pickByRectangle(e,n),n)r++,i.push(n);else break;while(n&&r<=t);return t>1&&this.restorePickingColor(i),i}},{key:`restorePickingColor`,value:function(e){var t=this;e.forEach(function(e){t.batchManager.updateAttribute(e,`pointerEvents`,!0,!0)})}},{key:`pickByRectangle`,value:function(e,t){var n=this,r=this.renderGraphPlugin.getDevice(),a=this.renderGraphPlugin.getRenderLists(),o=this.renderHelper.renderInstManager,s=this.renderHelper.renderGraph.newGraphBuilder(),c=_r,l=this.context.camera,u=e.x,d=e.y,f=e.width,p=e.height,m={backbufferWidth:f,backbufferHeight:p,antialiasingMode:Us.None},h=qs(xs.Color0,m,Vs(c)),g=s.createRenderTargetID(h,`Picking Color`),_=qs(xs.DepthStencil,m,Hs),v=s.createRenderTargetID(_,`Picking Depth`),y=i({},l.getView());this.renderHelper.renderGraph.renderTargetDeadPool.forEach(function(e){e.age=-1});var b;s.pushPass(function(e){e.setDebugName(`Picking Pass`),e.attachRenderTargetID(xs.Color0,g),e.attachRenderTargetID(xs.DepthStencil,v),e.exec(function(e){a.picking.drawOnPassRenderer(o.renderCache,e)}),e.post(function(e){var t=e.getRenderTargetTexture(xs.Color0),i=r.createReadback();y&&y.enabled?l.setViewOffset(y.fullWidth,y.fullHeight,y.offsetX,y.offsetY,y.width,y.height):l.clearViewOffset(),l.setEnableUpdate(!0);var a;try{a=i.readTextureSync(t,0,0,f,p,new Uint8Array(f*p*4))}catch{}var o=-1;if(a&&(a[0]!==0||a[1]!==0||a[2]!==0)&&(o=n.pickingIdGenerator.decodePickingColor(a)),o>-1){var s=n.pickingIdGenerator.getById(o);s&&s.isVisible()&&s.isInteractive()&&(b=s)}i.destroy()})});var x=this.renderHelper.pushTemplateRenderInst();x.setBindingLayout({numUniformBuffers:2,numSamplers:0}),x.setMegaStateFlags(Ur({depthWrite:!0},{rgbBlendMode:Un.ADD,rgbBlendSrcFactor:Hn.ONE,rgbBlendDstFactor:Hn.ZERO,alphaBlendMode:Un.ADD,alphaBlendSrcFactor:Hn.ONE,alphaBlendDstFactor:Hn.ZERO}));var S=this.context.config,C=S.width,w=S.height,T=this.context.contextService.getDPR();return l.setEnableUpdate(!1),l.setViewOffset(C*T,w*T,u,w*T-d,f,p),x.setUniforms(uc,[{name:dc.PROJECTION_MATRIX,value:l.getPerspective()},{name:dc.VIEW_MATRIX,value:l.getViewTransform()},{name:dc.CAMERA_POSITION,value:l.getPosition()},{name:dc.DEVICE_PIXEL_RATIO,value:this.context.contextService.getDPR()},{name:dc.VIEWPORT,value:[f,p]},{name:dc.IS_ORTHO,value:+!!l.isOrtho()},{name:dc.IS_PICKING,value:1}]),t&&this.batchManager.updateAttribute(t,`pointerEvents`,!1,!0),this.batchManager.render(a.picking,!0),o.popTemplateRenderInst(),this.renderHelper.prepareToRender(),this.renderHelper.renderGraph.execute(),o.resetRenderInsts(),b}}])}();mc.tag=`WebGLPicker`;var hc=500/1e6,gc=function(){function e(){s(this,e),this.clipPathMeshCreated=!1}return c(e,[{key:`beforeUploadUBO`,value:function(e,t){}},{key:`beforeInitMesh`,value:function(e){}},{key:`afterInitMesh`,value:function(e){}}])}();function _c(e){return!!(e&&e.type)}var vc=function(e){return e.CHANGED=`changed`,e}({}),yc=function(e){function t(e,n){var r;s(this,t),r=d(this,t),r.props={},r.meshes=[],r.defines={},r.uniforms={},r.uboBuffer=[],r.textures={},r.samplers=[],r.programDirty=!0,r.textureDirty=!0,r.geometryDirty=!0;var a=Lr(Br),o=a.cullMode,c=a.depthCompare,l=a.depthWrite,u=a.stencilFront,f=a.stencilBack,p=a.stencilWrite,m=a.frontFace,h=a.polygonOffset,g=a.attachmentsState;return r.device=e,r.props=i({cullMode:o,depthTest:!0,depthCompare:c,depthWrite:l,stencilFront:u,stencilBack:f,stencilWrite:p,frontFace:m,polygonOffset:h,attachmentsState:g,dithering:!1,wireframe:!1,wireframeColor:`black`,wireframeLineWidth:1,vertexShader:``,fragmentShader:``},n),r.compile(),r}return p(t,e),c(t,[{key:`cullMode`,get:function(){return this.props.cullMode},set:function(e){this.props.cullMode=e}},{key:`frontFace`,get:function(){return this.props.frontFace},set:function(e){this.props.frontFace=e}},{key:`blendConstant`,get:function(){return this.props.blendConstant},set:function(e){this.props.blendConstant=e}},{key:`blendEquation`,get:function(){return this.props.blendEquation},set:function(e){this.props.blendEquation=e}},{key:`blendEquationAlpha`,get:function(){return this.props.blendEquationAlpha},set:function(e){this.props.blendEquationAlpha=e}},{key:`blendSrc`,get:function(){return this.props.blendSrc},set:function(e){this.props.blendSrc=e}},{key:`blendDst`,get:function(){return this.props.blendDst},set:function(e){this.props.blendDst=e}},{key:`blendSrcAlpha`,get:function(){return this.props.blendSrcAlpha},set:function(e){this.props.blendSrcAlpha=e}},{key:`blendDstAlpha`,get:function(){return this.props.blendDstAlpha},set:function(e){this.props.blendDstAlpha=e}},{key:`depthCompare`,get:function(){return this.props.depthCompare},set:function(e){this.props.depthCompare=e}},{key:`depthTest`,get:function(){return this.props.depthTest},set:function(e){this.props.depthTest=e}},{key:`depthWrite`,get:function(){return this.props.depthWrite},set:function(e){this.props.depthWrite=e}},{key:`stencilFront`,get:function(){return this.props.stencilFront},set:function(e){this.props.stencilFront=e}},{key:`stencilBack`,get:function(){return this.props.stencilBack},set:function(e){this.props.stencilBack=e}},{key:`stencilWrite`,get:function(){return this.props.stencilWrite},set:function(e){this.props.stencilWrite=e}},{key:`stencilRef`,get:function(){return this.props.stencilRef},set:function(e){this.props.stencilRef=e}},{key:`polygonOffset`,get:function(){return this.props.polygonOffset},set:function(e){this.props.polygonOffset=e}},{key:`dithering`,get:function(){return this.props.dithering},set:function(e){this.props.dithering=e}},{key:`wireframe`,get:function(){return this.props.wireframe},set:function(e){this.props.wireframe!==e&&(this.geometryDirty=!0,this.programDirty=!0,this.props.wireframe=e,this.dispatchMutationEvent()),this.defines.USE_WIREFRAME=!!e}},{key:`wireframeColor`,get:function(){return this.props.wireframeColor},set:function(e){this.props.wireframeColor=e}},{key:`wireframeLineWidth`,get:function(){return this.props.wireframeLineWidth},set:function(e){this.props.wireframeLineWidth=e}},{key:`vertexShader`,get:function(){return this.props.vertexShader},set:function(e){this.props.vertexShader!==e&&(this.programDirty=!0,this.props.vertexShader=e,this.compile())}},{key:`fragmentShader`,get:function(){return this.props.fragmentShader},set:function(e){this.props.fragmentShader!==e&&(this.programDirty=!0,this.props.fragmentShader=e,this.compile())}},{key:`compile`,value:function(){var e=this;this.props.fragmentShader.replace(/^\s*uniform\s*sampler2D\s*(.*)\s*;$/gm,function(t,n){return e.samplers.push(n),``}),this.uniformNames=Li(this.props.fragmentShader)}},{key:`setUniforms`,value:function(e){var t=this,n=!1;Object.keys(e).forEach(function(r){var i=e[r],a=t.textures[r];a&&a!==i&&(t.textureDirty=!0),_c(i)?(t.textures[r]=i,t.textureDirty=!0,i.on(Yn.LOADED,function(){t.dispatchMutationEvent()})):(t.uniforms[r]=i,n=!0),Ae(e[r])&&(delete t.textures[r],delete t.uniforms[r])}),n&&this.dispatchMutationEvent()}},{key:`dispatchMutationEvent`,value:function(){this.emit(vc.CHANGED)}}])}(we),bc=function(e){function t(e,n){var r;return s(this,t),r=d(this,t,[e,i({},n)]),r.defines=i(i({},r.defines),{},{USE_UV:!1,USE_MAP:!1,USE_WIREFRAME:!1,USE_FOG:!1,USE_LIGHT:!1}),r}return p(t,e),c(t)}(yc);function xc(e){var t={};return Object.keys(e).forEach(function(n){typeof e[n]==`number`&&(t[n]=e[n])}),t}function Sc(e,t){var n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&n.every(function(n){return e[n]===t[n]})}var Cc=function(e){return Object.fromEntries(Object.entries(e).filter(function(e){var t=a(e,2);return t[0],t[1]!==void 0}))};function wc(e,t){return e=Ne(Math.floor(e),0,255),t=Ne(Math.floor(t),0,255),256*e+t}var Tc=1,Ec=`FillTextureMapping`,Q=function(e){return e[e.MODEL_MATRIX=0]=`MODEL_MATRIX`,e[e.PACKED_COLOR=1]=`PACKED_COLOR`,e[e.PACKED_STYLE=2]=`PACKED_STYLE`,e[e.PICKING_COLOR=3]=`PICKING_COLOR`,e[e.POSITION=4]=`POSITION`,e[e.NORMAL=5]=`NORMAL`,e[e.UV=6]=`UV`,e[e.BARYCENTRIC=7]=`BARYCENTRIC`,e[e.MAX=8]=`MAX`,e}({}),$=function(e){return e[e.MODEL_MATRIX0=0]=`MODEL_MATRIX0`,e[e.MODEL_MATRIX1=1]=`MODEL_MATRIX1`,e[e.MODEL_MATRIX2=2]=`MODEL_MATRIX2`,e[e.MODEL_MATRIX3=3]=`MODEL_MATRIX3`,e[e.PACKED_COLOR=4]=`PACKED_COLOR`,e[e.PACKED_STYLE1=5]=`PACKED_STYLE1`,e[e.PACKED_STYLE2=6]=`PACKED_STYLE2`,e[e.PICKING_COLOR=7]=`PICKING_COLOR`,e[e.POSITION=8]=`POSITION`,e[e.NORMAL=9]=`NORMAL`,e[e.UV=10]=`UV`,e[e.BARYCENTRIC=11]=`BARYCENTRIC`,e[e.MAX=12]=`MAX`,e}({}),Dc=function(){function e(t,n,r,i,a){var o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:-1,c=arguments.length>6?arguments[6]:void 0;s(this,e),this.id=Tc++,this.gradientAttributeName=`fill`,this.objects=[],this.program=new rs,this.geometryDirty=!0,this.materialDirty=!0,this.textureMappings=[],this.divisor=1,this.mergeXYZIntoModelMatrix=!1,this.checkNodeName=!0,this.maxInstances=1/0,this.inited=!1,this.renderHelper=t,this.texturePool=n,this.lightPool=r,this.drawcallCtors=a,this.index=o,this.context=c}return c(e,[{key:`instance`,get:function(){return this.objects[0]}},{key:`init`,value:function(){this.inited||(this.renderer.beforeInitMesh(this),this.material=new bc(this.context.device),this.material.defines=i(i({},xc($)),this.material.defines),this.geometry=new nc(this.context.device),this.geometry.meshes=this.objects,this.material.meshes=this.objects,this.observeGeometryChanged(),this.observeMaterialChanged(),this.inited=!0,this.renderer.afterInitMesh(this))}},{key:`observeGeometryChanged`,value:function(){var e=this;this.geometry.on(tc.CHANGED,function(){e.geometry.meshes.forEach(function(e){e.renderable.dirty=!0}),e.context.renderingService.dirty()})}},{key:`observeMaterialChanged`,value:function(){var e=this;this.material.on(vc.CHANGED,function(){e.material.meshes.forEach(function(e){e.renderable.dirty=!0}),e.context.renderingService.dirty()})}},{key:`shouldMergeColor`,value:function(e,t,n){var r=e.parsedStyle[n],i=t.parsedStyle[n];return!!(!r&&!i||j(r)&&j(i)||F(r)&&F(i)&&r.image===i.image||Array.isArray(r)&&Array.isArray(i)&&e.style[n]===t.style[n])}},{key:`shouldMerge`,value:function(e,t){return!this.instance||!(this.checkNodeName&&this.instance.nodeName!==e.nodeName||e.parsedStyle.clipPath||!this.shouldMergeColor(this.instance,e,`fill`)||!this.shouldMergeColor(this.instance,e,`stroke`))}},{key:`createGeometry`,value:function(e){var t=this,n=N(),r=N(),i=[],a=[],o=[],s=[],c=this.divisor,u=e[0]?.nodeName===I.CIRCLE||e[0]?.nodeName===I.ELLIPSE?.5:0;e.forEach(function(e){var c=e.parsedStyle,d=c.fill,f=c.stroke,p=c.opacity,m=p===void 0?1:p,h=c.fillOpacity,g=h===void 0?1:h,_=c.strokeOpacity,y=_===void 0?1:_,b=c.lineWidth,x=b===void 0?1:b,S=c.visibility,C=c.increasedLineWidthForHitTesting,T=C===void 0?0:C,E=[0,0,0,0];j(d)&&(E=[Number(d.r),Number(d.g),Number(d.b),Number(d.alpha)*255]);var D=[0,0,0,0];j(f)&&(D=[Number(f.r),Number(f.g),Number(f.b),Number(f.alpha)*255]),se(r,t.context.camera.getViewTransform(),n);var O=e.isInteractive()&&e.renderable3D?.encodedPickingColor||[0,0,0];if(t.mergeXYZIntoModelMatrix){var k=e.parsedStyle,A=k.x,ee=k.y,te=k.z;se(n,e.getWorldTransform(),w(n,M(A,ee,te)))}else v(n,e.getWorldTransform());i.push.apply(i,l(n)),a.push(wc(E[0],E[1]),wc(E[2],E[3]),wc(D[0],D[1]),wc(D[2],D[3])),o.push(m,g,y,x,S===`hidden`?0:1,u,u,T),s.push.apply(s,l(O).concat([e.sortable.renderOrder*hc]))}),this.geometry.instancedCount=e.length,this.geometry.setVertexBuffer({bufferIndex:Q.MODEL_MATRIX,byteStride:64,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:$.MODEL_MATRIX0,divisor:c},{format:J.F32_RGBA,bufferByteOffset:16,location:$.MODEL_MATRIX1,divisor:c},{format:J.F32_RGBA,bufferByteOffset:32,location:$.MODEL_MATRIX2,divisor:c},{format:J.F32_RGBA,bufferByteOffset:48,location:$.MODEL_MATRIX3,divisor:c}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:Q.PACKED_COLOR,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:$.PACKED_COLOR,divisor:c}],data:new Float32Array(a)}),this.geometry.setVertexBuffer({bufferIndex:Q.PACKED_STYLE,byteStride:32,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:$.PACKED_STYLE1,divisor:c},{format:J.F32_RGBA,bufferByteOffset:16,location:$.PACKED_STYLE2,divisor:c}],data:new Float32Array(o)}),this.geometry.setVertexBuffer({bufferIndex:Q.PICKING_COLOR,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:$.PICKING_COLOR,divisor:c}],data:new Float32Array(s)})}},{key:`destroy`,value:function(){this.geometry&&this.geometry.destroy()}},{key:`applyRenderInst`,value:function(e,t){var n=this,r=!!this.lightPool.getFog();this.clipPathTarget||this.clipPath?this.clipPathTarget?(this.material.stencilWrite=!0,this.material.depthWrite=!1,this.material.stencilFront={compare:zn.ALWAYS,passOp:Qn.REPLACE},this.material.stencilBack={compare:zn.ALWAYS,passOp:Qn.REPLACE}):(this.material.stencilWrite=!1,this.material.depthWrite=!0,this.material.stencilFront={compare:zn.EQUAL,passOp:Qn.KEEP},this.material.stencilBack={compare:zn.EQUAL,passOp:Qn.KEEP}):this.material.stencilWrite=!1,(this.materialDirty||this.material.programDirty)&&this.createMaterial(t);var a=i({},this.material.defines);if(this.material.defines.USE_FOG=r,this.material.defines=i(i(i({},this.lightPool.getDefines()),this.material.defines),this.renderHelper.getDefines()),this.material.textureDirty){this.textureMappings=[];var o=this.createFillGradientTextureMapping(t);o&&this.textureMappings.push(o),Object.keys(this.material.textures).sort(function(e,t){return n.material.samplers.indexOf(e)-n.material.samplers.indexOf(t)}).forEach(function(e){var t=new Js;t.name=e,t.texture=n.material.textures[e],n.context.device.setResourceName(t.texture,`Material Texture ${e}`),t.sampler=n.renderHelper.getCache().createSampler({addressModeU:Wn.CLAMP_TO_EDGE,addressModeV:Wn.CLAMP_TO_EDGE,minFilter:Gn.POINT,magFilter:Gn.BILINEAR,mipmapFilter:Kn.LINEAR,lodMinClamp:0,lodMaxClamp:0}),n.textureMappings.push(t)}),this.textureMappings.length?(this.material.defines.USE_UV=!0,this.material.defines.USE_MAP=!0):(this.material.defines.USE_UV=!1,this.material.defines.USE_MAP=!1),this.material.textureDirty=!1}(!Sc(a,this.material.defines)||this.material.programDirty||this.materialDirty)&&(this.material.defines=i(i({},this.material.defines),xc($)),Object.keys(this.material.defines).forEach(function(e){var t=n.material.defines[e];typeof t==`boolean`?n.program.setDefineBool(e,t):n.program.setDefineString(e,`${t}`)}),this.program.vert=this.material.vertexShader,this.program.frag=this.material.fragmentShader,this.material.programDirty=!1,this.materialDirty=!1),this.material.geometryDirty&&(this.geometryDirty=!0,this.material.geometryDirty=!1),(this.geometryDirty||this.geometry.dirty)&&(this.geometry&&this.geometry.destroy(),this.createGeometry(t),this.material.wireframe&&this.generateWireframe(this.geometry),this.geometryDirty=!1,this.geometry.dirty=!1);var s=this.renderHelper.getCache().createProgramSimple(this.program),c=this.renderHelper.getCache().createInputLayout(i(i({},this.geometry.inputLayoutDescriptor),{},{program:s})),l=!!this.geometry.indexBuffer;e.renderPipelineDescriptor.topology=this.geometry.drawMode,e.setProgram(s),e.setVertexInput(c,this.geometry.vertexBuffers.filter(function(e){return!!e}).map(function(e){return{buffer:e,byteOffset:0}}),l?{buffer:this.geometry.indexBuffer,offset:0}:null),this.renderer.beforeUploadUBO(e,this),this.uploadUBO(e),l?e.drawIndexesInstanced(this.geometry.vertexCount,this.geometry.instancedCount,this.geometry.indexStart):e.drawPrimitives(this.geometry.vertexCount,this.geometry.primitiveStart),e.sortKey=As(Ds.OPAQUE,t[0].sortable.renderOrder)}},{key:`updateBatchedAttribute`,value:function(e,t,n,r){var i=this;if(e.length!==0){var a=[`opacity`,`fillOpacity`,`strokeOpacity`,`lineWidth`,`visibility`,`anchor`,`increasedLineWidthForHitTesting`];if(n===`fill`||n===`stroke`){var o=[];e.forEach(function(e){var t=e.parsedStyle,n=t.fill,r=t.stroke,i=[0,0,0,0];j(n)&&(i=[Number(n.r),Number(n.g),Number(n.b),Number(n.alpha)*255]);var a=[0,0,0,0];j(r)&&(a=[Number(r.r),Number(r.g),Number(r.b),Number(r.alpha)*255]),o.push(wc(i[0],i[1]),wc(i[2],i[3]),wc(a[0],a[1]),wc(a[2],a[3]))}),this.geometry.updateVertexBuffer(Q.PACKED_COLOR,$.PACKED_COLOR,t,new Uint8Array(new Float32Array(o).buffer));var s=this.instance.parsedStyle.fill,c=this.textureMappings.findIndex(function(e){return e.name===Ec});if(j(s))c>=0&&(this.textureMappings.splice(c,-1),this.material.textureDirty=!0);else{var u=this.createFillGradientTextureMapping([this.instance]);c>=0&&this.textureMappings.splice(c,1,u),this.material.textureDirty=!0}}else if(a.indexOf(n)>-1){var d=[],f=e[0]?.nodeName===I.CIRCLE||e[0]?.nodeName===I.ELLIPSE?.5:0;e.forEach(function(e){var t=e.parsedStyle,n=t.opacity,r=n===void 0?1:n,i=t.fillOpacity,a=i===void 0?1:i,o=t.strokeOpacity,s=o===void 0?1:o,c=t.lineWidth,l=c===void 0?1:c,u=t.visibility,p=t.increasedLineWidthForHitTesting,m=p===void 0?0:p;d.push(r,a,s,l,u===`hidden`?0:1,f,f,m)}),this.geometry.updateVertexBuffer(Q.PACKED_STYLE,$.PACKED_STYLE1,t,new Uint8Array(new Float32Array(d).buffer))}else if(n===`modelMatrix`||this.mergeXYZIntoModelMatrix&&(n===`x`||n===`y`||n===`z`)){var p=[],m=N();e.forEach(function(e){if(i.mergeXYZIntoModelMatrix){var t=e.parsedStyle,n=t.x,r=t.y,a=t.z;se(m,e.getWorldTransform(),w(m,M(n,r,a)))}else v(m,e.getWorldTransform());p.push.apply(p,l(m))}),this.geometry.updateVertexBuffer(Q.MODEL_MATRIX,$.MODEL_MATRIX0,t,new Uint8Array(new Float32Array(p).buffer))}else if(n===`pointerEvents`){var h=[];e.forEach(function(e){var t=r&&e.isInteractive()&&e.renderable3D?.encodedPickingColor||[0,0,0];h.push.apply(h,l(t).concat([e.sortable.renderOrder*hc]))}),this.geometry.updateVertexBuffer(Q.PICKING_COLOR,$.PICKING_COLOR,t,new Uint8Array(new Float32Array(h).buffer))}}}},{key:`updateAttribute`,value:function(e,t,n,r){n===`clipPath`&&this.clipPath&&(this.geometryDirty=!0),this.geometryDirty===!0&&this.objects.length!==0&&(this.geometry&&this.geometry.destroy(),this.createGeometry(this.objects),this.geometryDirty=!1)}},{key:`changeRenderOrder`,value:function(e,t){var n=this.objects.indexOf(e),r=e.isInteractive()&&e.renderable3D?.encodedPickingColor||[0,0,0];this.geometry.updateVertexBuffer(Q.PICKING_COLOR,$.PICKING_COLOR,n,new Uint8Array(new Float32Array([].concat(l(r),[t*hc])).buffer))}},{key:`generateWireframe`,value:function(e){for(var t=e.indices,n=e.indices.length,r=e.vertices.map(function(e){return e.slice()}),i=Q.PICKING_COLOR;i<e.vertexBuffers.length;i++){var a=e.inputLayoutDescriptor.vertexBufferDescriptors[i].arrayStride;e.vertices[i]=new Float32Array(a/4*n)}for(var o=0,s=new Uint32Array(n),c=0;c<n;c++){for(var l=t[c],u=1;u<e.vertices.length;u++)for(var d=e.inputLayoutDescriptor.vertexBufferDescriptors[u].arrayStride/4,f=0;f<d;f++)e.vertices[u][o*d+f]=r[u][l*d+f];s[c]=o,o++}for(var p=Q.PICKING_COLOR+1;p<e.vertexBuffers.length;p++){var m=e.inputLayoutDescriptor.vertexBufferDescriptors[p],h=m.stepMode,g=m.arrayStride,_=e.inputLayoutDescriptor.vertexBufferDescriptors[p].attributes[0];if(_){var v=_.shaderLocation,y=_.offset,b=_.format,x=_.divisor;e.setVertexBuffer({bufferIndex:p,byteStride:g,stepMode:h,attributes:[{format:b,bufferByteOffset:y,location:v,divisor:x}],data:e.vertices[p]})}}for(var S=new Float32Array(n*3),C=0;C<n;)for(var w=0;w<3;w++){var T=s[C++];S[T*3+w]=1}e.setVertexBuffer({bufferIndex:Q.BARYCENTRIC,byteStride:12,stepMode:H.VERTEX,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:Number($.BARYCENTRIC)}],data:S}),e.setIndexBuffer(s)}},{key:`beforeUploadUBO`,value:function(e,t){}},{key:`uploadUBO`,value:function(e){var t=this,n=1,r=this.material,a=this.lightPool.getAllLights(),o=this.lightPool.getFog(),s=!!o,c=r.defines.USE_LIGHT??!!a.length,l=r.defines.USE_WIREFRAME,u=[];if(l){var d=h(r.wireframeColor);u.push({name:`u_WireframeLineColor`,value:[Number(d.r)/255,Number(d.g)/255,Number(d.b)/255]}),u.push({name:`u_WireframeLineWidth`,value:r.wireframeLineWidth})}if(s&&this.uploadFog(u,o),this.uploadMaterial(u,r),c){var f={};a.forEach(function(e){f[e.define]||(f[e.define]=-1),f[e.define]++,e.uploadUBO(u,f[e.define])})}u.sort(function(e,n){return t.material.uniformNames.indexOf(e.name)-t.material.uniformNames.indexOf(n.name)}),e.setUniforms(n,u);var p=r.depthCompare,m=r.depthWrite,g=r.stencilFront,_=r.stencilBack,v=r.stencilWrite,y=r.stencilRef,b=r.cullMode,x=r.frontFace,S=r.polygonOffset,C=r.blendConstant,w=r.blendEquation,T=r.blendEquationAlpha,E=r.blendSrc,D=r.blendDst,O=r.blendSrcAlpha,k=r.blendDstAlpha,A=Cc({blendConstant:C,depthCompare:p,depthWrite:m,stencilFront:g,stencilBack:_,stencilWrite:v,stencilRef:y,cullMode:b,frontFace:x,polygonOffset:S}),j=e.getMegaStateFlags().attachmentsState[0];e.setMegaStateFlags(i({attachmentsState:[{channelWriteMask:this.material.stencilWrite?Zn.NONE:Zn.ALL,rgbBlendState:i(i({},j.rgbBlendState),Cc({blendMode:w,blendSrcFactor:E,blendDstFactor:D})),alphaBlendState:i(i({},j.alphaBlendState),Cc({blendMode:T,blendSrcFactor:O,blendDstFactor:k}))}]},A)),e.setBindingLayout({numUniformBuffers:n,numSamplers:this.textureMappings.length}),e.setSamplerBindingsFromTextureMappings(this.textureMappings)}},{key:`uploadFog`,value:function(e,t){var n=t.parsedStyle,r=n.type,i=n.fill,a=n.start,o=n.end,s=n.density;if(j(i)){var c=[Number(i.r)/255,Number(i.g)/255,Number(i.b)/255,Number(i.alpha)];e.push({name:`u_FogInfos`,value:[r,a,o,s]}),e.push({name:`u_FogColor`,value:c})}}},{key:`uploadMaterial`,value:function(e,t){var n=Object.keys(t.uniforms).map(function(e){return{name:e,value:t.uniforms[e]}});e.push.apply(e,l(n))}},{key:`createFillGradientTextureMapping`,value:function(e){var t=this,n=e[0],r=n.parsedStyle[this.gradientAttributeName],i;if(r&&(F(r)||Array.isArray(r))){Array.isArray(r)?(this.program.setDefineBool(`USE_PATTERN`,!1),this.texturePool.getOrCreateGradient({gradients:r,width:128,height:128,instance:n})):F(r)&&(this.program.setDefineBool(`USE_PATTERN`,!0),this.texturePool.getOrCreatePattern(r,n,function(){e.forEach(function(e){e.renderable.dirty=!0}),t.material.textureDirty=!0})),i=this.texturePool.getOrCreateCanvas();var a=this.texturePool.getOrCreateTexture(this.context.device,i,$n(J.U8_RGBA_NORM,1,1,1));if(a){var o=new Js;return o.name=Ec,o.texture=a,o.texture.on(`loaded`,function(){e.forEach(function(e){e.renderable.dirty=!0}),t.material.textureDirty=!0}),this.context.device.setResourceName(o.texture,`Fill Texture${this.id}`),o.sampler=this.renderHelper.getCache().createSampler({addressModeU:Wn.CLAMP_TO_EDGE,addressModeV:Wn.CLAMP_TO_EDGE,minFilter:Gn.POINT,magFilter:Gn.BILINEAR,mipmapFilter:Kn.LINEAR,lodMinClamp:0,lodMaxClamp:0}),o}}return null}}])}(),Oc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif

in vec2 v_Data;
in vec2 v_Radius;
in vec3 v_StylePacked3;

out vec4 outputColor;
float epsilon = 0.000001;

/**
 * 2D signed distance field functions
 * @see http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
 */

float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

// @see http://www.iquilezles.org/www/articles/ellipsoids/ellipsoids.htm
float sdEllipsoidApproximated(vec2 p, vec2 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}

// @see https://www.shadertoy.com/view/4llXD7
float sdRoundedBox(vec2 p, vec2 b, float r) {
  p = abs(p) - b + r;
  return length(max(p, 0.0)) + min(max(p.x, p.y), 0.0) - r;
}

void main() {
  int shape = int(floor(v_StylePacked3.x + 0.5));

  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  bool omitStroke = v_StylePacked3.z == 1.0;

  vec2 r = (v_Radius - (omitStroke ? 0.0 : u_StrokeWidth)) / v_Radius.y;
  float wh = v_Radius.x / v_Radius.y;

  float dist = length(v_Data);
  float antialiased_blur = -fwidth(dist);

  float outer_df;
  float inner_df;
  // 'circle', 'ellipse', 'rect'
  if (shape == 0) {
    outer_df = sdCircle(v_Data, 1.0);
    inner_df = sdCircle(v_Data, r.x);
  } else if (shape == 1) {
    outer_df = sdEllipsoidApproximated(v_Data, vec2(wh, 1.0));
    inner_df = sdEllipsoidApproximated(v_Data, r);
  } else if (shape == 2) {
    bool useRadius = v_StylePacked3.y > epsilon;
    outer_df = sdRoundedBox(v_Data, vec2(wh, 1.0), useRadius ? (v_StylePacked3.y + u_StrokeWidth / 2.0) / v_Radius.y : 0.0);
    inner_df = sdRoundedBox(v_Data, r, useRadius ? (v_StylePacked3.y - u_StrokeWidth / 2.0) / v_Radius.y : 0.0);
  }

  float opacity_t = smoothstep(0.0, antialiased_blur, outer_df);

  float color_t = u_StrokeWidth < 0.01 ? 0.0 : smoothstep(
    antialiased_blur,
    0.0,
    inner_df
  );

  vec4 diffuseColor;
  vec4 strokeColor;
  if (u_IsPicking > 0.5) {
    diffuseColor = vec4(u_PickingColor, 1.0);
    strokeColor = vec4(u_PickingColor, 1.0);
  } else {
    diffuseColor = u_Color;
    strokeColor = (u_StrokeColor == vec4(0) || omitStroke) ? vec4(0.0) : u_StrokeColor;
  }

  outputColor = mix(vec4(diffuseColor.rgb, diffuseColor.a * u_FillOpacity), strokeColor * u_StrokeOpacity, color_t);
  outputColor.a = outputColor.a * u_Opacity * opacity_t;

  if (outputColor.a < epsilon)
    discard;

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
  }
}`,kc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

bool isPerspectiveMatrix(mat4 m) {
  return m[2][3] == -1.0;
}

vec4 billboard(vec2 offset, float rotation, bool isSizeAttenuation, mat4 pm, mat4 vm, mat4 mm, vec3 position) {
  vec4 mvPosition = vm * mm * vec4(position, 1.0);
  vec2 scale;
  scale.x = length(vec3(mm[0][0], mm[0][1], mm[0][2]));
  scale.y = length(vec3(mm[1][0], mm[1][1], mm[1][2]));

  if (isSizeAttenuation) {
    bool isPerspective = isPerspectiveMatrix(pm);
    if (isPerspective) {
      scale *= -mvPosition.z / 250.0;
    }
  }

  vec2 alignedPosition = offset * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y;
  rotatedPosition.y = sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;
  return pm * mvPosition;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = EXTRUDE) in vec2 a_Extrude;
// shape, radius, omitStroke, isBillboard
layout(location = PACKED_STYLE3) in vec3 a_StylePacked3;
layout(location = SIZE) in vec4 a_Size;
#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

out vec2 v_Data;
out vec2 v_Radius;
out vec3 v_StylePacked3;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif
  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  float strokeWidth;
  if (u_IsPicking > 0.5) {
    strokeWidth = u_IncreasedLineWidthForHitTesting + u_StrokeWidth;
  } else {
    strokeWidth = u_StrokeWidth;
  }

  bool omitStroke = a_StylePacked3.z == 1.0;
  vec2 radius = a_Size.xy + vec2(omitStroke ? 0.0 : strokeWidth / 2.0);
  vec2 offset = (a_Extrude + vec2(1.0) - 2.0 * u_Anchor.xy) * a_Size.xy + a_Extrude * vec2(omitStroke ? 0.0 : strokeWidth / 2.0);

  bool isBillboard = a_Size.z > 0.5;
  if (isBillboard) {
    float rotation = 0.0;
    bool isSizeAttenuation = a_Size.w > 0.5;
    gl_Position = billboard(offset, rotation, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, a_Position);
  } else {
    gl_Position = project(vec4(a_Position.xy + offset, u_ZIndex, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }
  
  v_Radius = radius;
  v_Data = vec2(a_Extrude * radius / radius.y);
  v_StylePacked3 = a_StylePacked3;
}`,Ac=function(e){return e[e.PACKED_STYLE=Q.POSITION+1]=`PACKED_STYLE`,e}(Ac||{}),jc=function(e){return e[e.PACKED_STYLE3=$.MAX]=`PACKED_STYLE3`,e[e.EXTRUDE=1+e.PACKED_STYLE3]=`EXTRUDE`,e[e.SIZE=1+e.EXTRUDE]=`SIZE`,e}(jc||{}),Mc=[I.CIRCLE,I.ELLIPSE,I.RECT],Nc=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`shouldMerge`,value:function(e,n){return!!ue(t,`shouldMerge`,this,3)([e,n])}},{key:`createMaterial`,value:function(e){this.material.vertexShader=kc,this.material.fragmentShader=Oc,this.material.defines=i(i({},this.material.defines),xc(jc))}},{key:`createGeometry`,value:function(e){var n=this;ue(t,`createGeometry`,this,3)([e]);var r=[],i=[];e.forEach(function(e,t){var a=e,o=a.parsedStyle.radius,s=n.shouldOmitStroke(a.parsedStyle),c=n.getSize(e.parsedStyle,a.nodeName),u=n.getPosition(e.parsedStyle,a.nodeName);r.push.apply(r,l(c).concat([+!!a.parsedStyle.isBillboard,+!!a.parsedStyle.isSizeAttenuation,Mc.indexOf(a.nodeName),o&&o[0]||0,+!!s])),i.push.apply(i,l(u))}),this.geometry.setIndexBuffer(new Uint32Array([0,2,1,0,3,2])),this.geometry.vertexCount=6,this.geometry.setVertexBuffer({bufferIndex:Q.UV,byteStride:16,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:jc.EXTRUDE},{format:J.F32_RG,bufferByteOffset:8,location:$.UV}],data:new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1])}),this.geometry.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:12,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.POSITION}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:Ac.PACKED_STYLE,byteStride:28,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:jc.SIZE,divisor:1},{format:J.F32_RGB,bufferByteOffset:16,location:jc.PACKED_STYLE3,divisor:1}],data:new Float32Array(r)})}},{key:`updateAttribute`,value:function(e,n,r,i){var o=this;if(e.length!==0){if(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i),r===`r`||r===`rx`||r===`ry`||r===`width`||r===`height`||r===`lineWidth`||r===`stroke`||r===`lineDash`||r===`strokeOpacity`||r===`radius`||r===`isBillboard`||r===`isSizeAttenuation`){var s=[];e.forEach(function(e){var t=e,n=o.shouldOmitStroke(t.parsedStyle),r=o.getSize(e.parsedStyle,e.nodeName),i=a(r,2),c=[i[0],i[1]];s.push.apply(s,c.concat([+!!t.parsedStyle.isBillboard,+!!t.parsedStyle.isSizeAttenuation,Mc.indexOf(e.nodeName),e.parsedStyle.radius&&e.parsedStyle.radius[0]||0,+!!n]))}),this.geometry.updateVertexBuffer(Ac.PACKED_STYLE,jc.SIZE,n,new Uint8Array(new Float32Array(s).buffer))}else if(r===`cx`||r===`cy`||r===`x`||r===`y`){var c=[];e.forEach(function(e){var t=o.getPosition(e.parsedStyle,e.nodeName),n=a(t,2),r=n[0],i=n[1];c.push(r,i)}),this.geometry.updateVertexBuffer(Q.POSITION,$.POSITION,n,new Uint8Array(new Float32Array(c).buffer))}}}},{key:`getPosition`,value:function(e,t){var n=[0,0,0];if(t===I.CIRCLE||t===I.ELLIPSE){var r=e,i=r.cx,a=i===void 0?0:i,o=r.cy,s=o===void 0?0:o,c=r.cz;n=[a,s,c===void 0?0:c]}else if(t===I.RECT){var l=e,u=l.x,d=u===void 0?0:u,f=l.y,p=f===void 0?0:f,m=l.z;n=[d,p,m===void 0?0:m]}return n}},{key:`getSize`,value:function(e,t){var n=[0,0];if(t===I.CIRCLE){var r=e.r;n=[r,r]}else if(t===I.ELLIPSE){var i=e;n=[i.rx,i.ry]}else if(t===I.RECT){var a=e,o=a.width,s=a.height;n=[o/2,s/2]}return n}},{key:`shouldOmitStroke`,value:function(e){var t=e.lineDash,n=e.stroke,r=e.strokeOpacity,i=n&&!n.isNone,a=t&&t.length&&t.every(function(e){return e!==0});return!i||i&&(a||r<1)}}])}(Dc),Pc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif

in vec4 v_Dash;
in vec2 v_Distance;

out vec4 outputColor;
float epsilon = 0.000001;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_StrokeColor;
    #ifdef USE_MAP
      outputColor = u_Color;
    #endif

    float blur;
    if (v_Distance.y < 1.0) {
      blur = smoothstep(0.0, v_Distance.y, 1.0 - abs(v_Distance.x));
    } else {
      blur = 1.0 / v_Distance.y;
    }
    float u_dash_offset = v_Dash.y;
    float u_dash_array = v_Dash.z;
    float u_dash_ratio = v_Dash.w;

    outputColor.a = outputColor.a
      * max(blur, 0.5)
      * u_Opacity * u_StrokeOpacity
      * (u_dash_array < 1.0 ? (ceil((u_dash_array * u_dash_ratio) - mod(v_Dash.x + u_dash_offset, u_dash_array))) : 1.0);

    if (outputColor.a < epsilon) {
      discard;
    }
  }
}`,Fc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = POINTA) in vec3 a_PointA;
layout(location = POINTB) in vec3 a_PointB;
layout(location = CAP) in float a_Cap;
#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif
layout(location = DASH) in vec4 a_Dash;

out vec4 v_Dash;
out vec2 v_Distance;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif
  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  float strokeWidth;
  if (u_IsPicking > 0.5) {
    strokeWidth = u_IncreasedLineWidthForHitTesting + u_StrokeWidth;
  } else {
    strokeWidth = u_StrokeWidth;
  }
  float clampedStrokeWidth = max(strokeWidth, 1.0);

  bool isSizeAttenuation = a_Dash.w > 0.5;
  if (isSizeAttenuation) {
    vec4 clip0 = project(vec4(a_PointA, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
    vec4 clip1 = project(vec4(a_PointB, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
    // screen space
    vec2 screen0 = u_Viewport * (0.5 * clip0.xy / clip0.w + 0.5);
    vec2 screen1 = u_Viewport * (0.5 * clip1.xy / clip1.w + 0.5);
    vec2 xBasis = normalize(screen1 - screen0);
    vec2 yBasis = vec2(-xBasis.y, xBasis.x);
    vec2 pt0 = screen0 + clampedStrokeWidth * (a_Position.x * xBasis + a_Position.y * yBasis);
    vec2 pt1 = screen1 + clampedStrokeWidth * (a_Position.x * xBasis + a_Position.y * yBasis);
    vec2 pt = mix(pt0, pt1, a_Position.z);
    vec4 clip = mix(clip0, clip1, a_Position.z);
    gl_Position = vec4(clip.w * (2.0 * pt / u_Viewport - 1.0), clip.z, clip.w);
  } else {
    vec2 xBasis = a_PointB.xy - a_PointA.xy;
    vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));

    vec2 point = a_PointA.xy + xBasis * a_Position.x + yBasis * clampedStrokeWidth * a_Position.y;
    point = point - u_Anchor.xy * abs(xBasis);

    // round & square
    if (a_Cap > 1.0) {
      point += sign(a_Position.x - 0.5) * normalize(xBasis) * vec2(clampedStrokeWidth / 2.0);
    }
    gl_Position = project(vec4(point, u_ZIndex, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }

  float antialiasblur = 1.0 / strokeWidth;
  v_Distance = vec2(a_Position.y * 2.0, antialiasblur);
  v_Dash = vec4(a_Position.x, a_Dash.xyz);
}`,Ic=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif

out vec4 outputColor;

void main(){
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;

    outputColor.a = outputColor.a * u_Opacity * u_FillOpacity;
  }
}`,Lc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

bool isPerspectiveMatrix(mat4 m) {
  return m[2][3] == -1.0;
}

vec4 billboard(vec2 offset, float rotation, bool isSizeAttenuation, mat4 pm, mat4 vm, mat4 mm, vec3 position) {
  vec4 mvPosition = vm * mm * vec4(position, 1.0);
  vec2 scale;
  scale.x = length(vec3(mm[0][0], mm[0][1], mm[0][2]));
  scale.y = length(vec3(mm[1][0], mm[1][1], mm[1][2]));

  if (isSizeAttenuation) {
    bool isPerspective = isPerspectiveMatrix(pm);
    if (isPerspective) {
      scale *= -mvPosition.z / 250.0;
    }
  }

  vec2 alignedPosition = offset * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y;
  rotatedPosition.y = sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;
  return pm * mvPosition;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = PACKED_STYLE3) in vec4 a_StylePacked3;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif
  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  bool isBillboard = a_StylePacked3.x > 0.5;
  if (isBillboard) {
    float rotation = a_StylePacked3.y;
    bool isSizeAttenuation = a_StylePacked3.z > 0.5;
    gl_Position = billboard(a_Position.xy, rotation, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, vec3(0.0));
  } else {
    gl_Position = project(vec4(a_Position.xy, u_ZIndex, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }
}`,Rc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif

in vec4 v_Dash;

in vec4 v_Distance;
in vec4 v_Arc;
in float v_Type;
in float v_Travel;
in float v_ScalingFactor;

out vec4 outputColor;
float epsilon = 0.000001;

void main(){
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  float alpha = 1.0;
  float lineWidth = v_Distance.w;
  if (v_Type < 0.5) {
    float left = max(v_Distance.x - 0.5, -v_Distance.w);
    float right = min(v_Distance.x + 0.5, v_Distance.w);
    float near = v_Distance.y - 0.5;
    float far = min(v_Distance.y + 0.5, 0.0);
    float top = v_Distance.z - 0.5;
    float bottom = min(v_Distance.z + 0.5, 0.0);
    alpha = max(right - left, 0.0) * max(bottom - top, 0.0) * max(far - near, 0.0);
  } else if (v_Type < 1.5) {
    float a1 = clamp(v_Distance.x + 0.5 - lineWidth, 0.0, 1.0);
    float a2 = clamp(v_Distance.x + 0.5 + lineWidth, 0.0, 1.0);
    float b1 = clamp(v_Distance.y + 0.5 - lineWidth, 0.0, 1.0);
    float b2 = clamp(v_Distance.y + 0.5 + lineWidth, 0.0, 1.0);
    alpha = a2 * b2 - a1 * b1;
  } else if (v_Type < 2.5) {
    alpha *= max(min(v_Distance.x + 0.5, 1.0), 0.0);
    alpha *= max(min(v_Distance.y + 0.5, 1.0), 0.0);
    alpha *= max(min(v_Distance.z + 0.5, 1.0), 0.0);
  } else if (v_Type < 3.5) {
    float a1 = clamp(v_Distance.x + 0.5 - lineWidth, 0.0, 1.0);
    float a2 = clamp(v_Distance.x + 0.5 + lineWidth, 0.0, 1.0);
    float b1 = clamp(v_Distance.y + 0.5 - lineWidth, 0.0, 1.0);
    float b2 = clamp(v_Distance.y + 0.5 + lineWidth, 0.0, 1.0);
    float alpha_miter = a2 * b2 - a1 * b1;
    float alpha_plane = max(min(v_Distance.z + 0.5, 1.0), 0.0);
    float d = length(v_Arc.xy);
    float circle_hor = max(min(v_Arc.w, d + 0.5) - max(-v_Arc.w, d - 0.5), 0.0);
    float circle_vert = min(v_Arc.w * 2.0, 1.0);
    float alpha_circle = circle_hor * circle_vert;
    alpha = min(alpha_miter, max(alpha_circle, alpha_plane));
  } else {
    float a1 = clamp(v_Distance.x + 0.5 - lineWidth, 0.0, 1.0);
    float a2 = clamp(v_Distance.x + 0.5 + lineWidth, 0.0, 1.0);
    float b1 = clamp(v_Distance.y + 0.5 - lineWidth, 0.0, 1.0);
    float b2 = clamp(v_Distance.y + 0.5 + lineWidth, 0.0, 1.0);
    alpha = a2 * b2 - a1 * b1;
    alpha *= max(min(v_Distance.z + 0.5, 1.0), 0.0);
  }

  float u_Dash = v_Dash.x;
  float u_Gap = v_Dash.y;
  float u_DashOffset = v_Dash.z;
  if (u_Dash + u_Gap > 1.0) {
    float travel = mod(v_Travel + u_Gap * v_ScalingFactor * 0.5 + u_DashOffset, u_Dash * v_ScalingFactor + u_Gap * v_ScalingFactor) - (u_Gap * v_ScalingFactor * 0.5);
    float left = max(travel - 0.5, -0.5);
    float right = min(travel + 0.5, u_Gap * v_ScalingFactor + 0.5);
    alpha *= max(0.0, right - left);
  }

  if (u_IsPicking > 0.5) {
    vec3 pickingColor = u_PickingColor;
    if (pickingColor.x == 0.0 && pickingColor.y == 0.0 && pickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(pickingColor, 1.0);
  } else {
    outputColor = u_StrokeColor;
    #ifdef USE_MAP
      outputColor = u_Color;
    #endif

    outputColor.a *= alpha * u_Opacity * u_StrokeOpacity;
    if (outputColor.a < epsilon) {
      discard;
    }
  }
}`,zc=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

bool isPerspectiveMatrix(mat4 m) {
  return m[2][3] == -1.0;
}

vec4 billboard(vec2 offset, float rotation, bool isSizeAttenuation, mat4 pm, mat4 vm, mat4 mm, vec3 position) {
  vec4 mvPosition = vm * mm * vec4(position, 1.0);
  vec2 scale;
  scale.x = length(vec3(mm[0][0], mm[0][1], mm[0][2]));
  scale.y = length(vec3(mm[1][0], mm[1][1], mm[1][2]));

  if (isSizeAttenuation) {
    bool isPerspective = isPerspectiveMatrix(pm);
    if (isPerspective) {
      scale *= -mvPosition.z / 250.0;
    }
  }

  vec2 alignedPosition = offset * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y;
  rotatedPosition.y = sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;
  return pm * mvPosition;
}

layout(location = PREV) in vec3 a_Prev;
layout(location = POINT1) in vec3 a_Point1;
layout(location = POINT2) in vec3 a_Point2;
layout(location = NEXT) in vec3 a_Next;
layout(location = VERTEX_JOINT) in float a_VertexJoint;
layout(location = VERTEX_NUM) in float a_VertexNum;
layout(location = TRAVEL) in float a_Travel;
#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif
layout(location = DASH) in vec4 a_Dash;
out vec4 v_Dash;

const float FILL = 1.0;
const float BEVEL = 4.0;
const float MITER = 8.0;
const float ROUND = 12.0;
const float JOINT_CAP_BUTT = 16.0;
const float JOINT_CAP_SQUARE = 18.0;
const float JOINT_CAP_ROUND = 20.0;
const float FILL_EXPAND = 24.0;
const float CAP_BUTT = 1.0;
const float CAP_SQUARE = 2.0;
const float CAP_ROUND = 3.0;
const float CAP_BUTT2 = 4.0;

const float u_Expand = 1.0;
const float u_MiterLimit = 5.0;
const float u_ScaleMode = 1.0;
const float u_Alignment = 0.5;

out vec4 v_Distance;
out vec4 v_Arc;
out float v_Type;
out float v_Travel;
out float v_ScalingFactor;

vec2 doBisect(
  vec2 norm, float len, vec2 norm2, float len2, float dy, float inner
) {
  vec2 bisect = (norm + norm2) / 2.0;
  bisect /= dot(norm, bisect);
  vec2 shift = dy * bisect;
  if (inner > 0.5) {
    if (len < len2) {
      if (abs(dy * (bisect.x * norm.y - bisect.y * norm.x)) > len) {
        return dy * norm;
      }
    } else {
      if (abs(dy * (bisect.x * norm2.y - bisect.y * norm2.x)) > len2) {
        return dy * norm;
      }
    }
  }
  return dy * bisect;
}

vec2 clip2ScreenSpace(vec4 clip) {
  return u_Viewport * (0.5 * clip.xy / clip.w + 0.5);
}

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif
  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  v_Dash = a_Dash;

  vec2 pointA;
  vec2 pointB;
  vec4 clip0;
  vec4 clip1;

  float compressed = a_Dash.w;
  float is_billboard = floor(compressed / 4.0);
  compressed -= is_billboard * 4.0;
  float is_size_attenuation = floor(compressed / 2.0);
  compressed -= is_size_attenuation * 2.0;
  float is_3d_polyline = compressed;

  bool isBillboard = is_billboard > 0.5;
  bool isSizeAttenuation = is_size_attenuation > 0.5;
  bool is3DPolyline = is_3d_polyline > 0.5;
  if (isBillboard) {
    clip0 = billboard(a_Point1.xy, 0.0, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, vec3(0.0));
    clip1 = billboard(a_Point2.xy, 0.0, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, vec3(0.0));
  } else if (is3DPolyline) {
    clip0 = project(vec4(a_Point1, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
    clip1 = project(vec4(a_Point2, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }

  if (isBillboard || is3DPolyline) {
    pointA = clip2ScreenSpace(clip0);
    pointB = clip2ScreenSpace(clip1);
  } else {
    pointA = (u_ModelMatrix * vec4(a_Point1, 1.0)).xy;
    pointB = (u_ModelMatrix * vec4(a_Point2, 1.0)).xy;
  }

  vec2 xBasis = pointB - pointA;
  float len = length(xBasis);
  vec2 forward = xBasis / len;
  vec2 norm = vec2(forward.y, -forward.x);

  float type = a_VertexJoint;

  float lineWidth;
  if (u_IsPicking > 0.5) {
    lineWidth = u_IncreasedLineWidthForHitTesting + u_StrokeWidth;
  } else {
    lineWidth = u_StrokeWidth;
  }

  if (u_ScaleMode > 2.5) {
    lineWidth *= length(u_ModelMatrix * vec4(1.0, 0.0, 0.0, 0.0));
  } else if (u_ScaleMode > 1.5) {
    lineWidth *= length(u_ModelMatrix * vec4(0.0, 1.0, 0.0, 0.0));
  } else if (u_ScaleMode > 0.5) {
    vec2 avgDiag = (u_ModelMatrix * vec4(1.0, 1.0, 0.0, 0.0)).xy;
    lineWidth *= sqrt(dot(avgDiag, avgDiag) * 0.5);
  }
  float capType = floor(type / 32.0);
  type -= capType * 32.0;
  v_Arc = vec4(0.0);
  lineWidth *= 0.5;
  float lineAlignment = 2.0 * u_Alignment - 1.0;

  vec2 pos;

  if (capType == CAP_ROUND) {
    if (a_VertexNum < 3.5) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    type = JOINT_CAP_ROUND;
    capType = 0.0;
  }

  if (type >= BEVEL) {
    float dy = lineWidth + u_Expand;
    float inner = 0.0;
    if (a_VertexNum >= 1.5) {
      dy = -dy;
      inner = 1.0;
    }

    vec2 base, next, xBasis2, bisect;
    float flag = 0.0;
    float sign2 = 1.0;
    if (a_VertexNum < 0.5 || a_VertexNum > 2.5 && a_VertexNum < 3.5) {
      if (isBillboard) {
        next = clip2ScreenSpace(billboard(a_Prev.xy, 0.0, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, vec3(0.0)));
      } else if (is3DPolyline) {
        next = clip2ScreenSpace(project(vec4(a_Prev, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix));
      } else {
        next = (u_ModelMatrix * vec4(a_Prev, 1.0)).xy;
      }

      base = pointA;
      flag = type - floor(type / 2.0) * 2.0;
      sign2 = -1.0;
    } else {
      if (isBillboard) {
        next = clip2ScreenSpace(billboard(a_Next.xy, 0.0, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, vec3(0.0)));
      } else if (is3DPolyline) {
        next = clip2ScreenSpace(project(vec4(a_Next, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix));
      } else {
        next = (u_ModelMatrix * vec4(a_Next, 1.0)).xy;
      }
      
      base = pointB;
      if (type >= MITER && type < MITER + 3.5) {
        flag = step(MITER + 1.5, type);
        // check miter limit here?
      }
    }
    xBasis2 = next - base;
    float len2 = length(xBasis2);
    vec2 norm2 = vec2(xBasis2.y, -xBasis2.x) / len2;
    float D = norm.x * norm2.y - norm.y * norm2.x;
    if (D < 0.0) {
      inner = 1.0 - inner;
    }
    norm2 *= sign2;

    if (abs(lineAlignment) > 0.01) {
      float shift = lineWidth * lineAlignment;
      pointA += norm * shift;
      pointB += norm * shift;
      if (abs(D) < 0.01) {
        base += norm * shift;
      } else {
        base += doBisect(norm, len, norm2, len2, shift, 0.0);
      }
    }

    float collinear = step(0.0, dot(norm, norm2));
    v_Type = 0.0;
    float dy2 = -1000.0;
    float dy3 = -1000.0;
    if (abs(D) < 0.01 && collinear < 0.5) {
      if (type >= ROUND && type < ROUND + 1.5) {
        type = JOINT_CAP_ROUND;
      }
      // TODO: BUTT here too
    }

    if (a_VertexNum < 3.5) {
      if (abs(D) < 0.01) {
        pos = dy * norm;
      } else {
        if (flag < 0.5 && inner < 0.5) {
          pos = dy * norm;
        } else {
          pos = doBisect(norm, len, norm2, len2, dy, inner);
        }
      }
      if (capType >= CAP_BUTT && capType < CAP_ROUND) {
        float extra = step(CAP_SQUARE, capType) * lineWidth;
        vec2 back = -forward;
        if (a_VertexNum < 0.5 || a_VertexNum > 2.5) {
          pos += back * (u_Expand + extra);
          dy2 = u_Expand;
        } else {
          dy2 = dot(pos + base - pointA, back) - extra;
        }
      }
      if (type >= JOINT_CAP_BUTT && type < JOINT_CAP_SQUARE + 0.5) {
        float extra = step(JOINT_CAP_SQUARE, type) * lineWidth;
        if (a_VertexNum < 0.5 || a_VertexNum > 2.5) {
          dy3 = dot(pos + base - pointB, forward) - extra;
        } else {
          pos += forward * (u_Expand + extra);
          dy3 = u_Expand;
          if (capType >= CAP_BUTT) {
            dy2 -= u_Expand + extra;
          }
        }
      }
    } else if (type >= JOINT_CAP_ROUND && type < JOINT_CAP_ROUND + 1.5) {
      if (inner > 0.5) {
        dy = -dy;
        inner = 0.0;
      }
      vec2 d2 = abs(dy) * forward;
      if (a_VertexNum < 4.5) {
        dy = -dy;
        pos = dy * norm;
      } else if (a_VertexNum < 5.5) {
        pos = dy * norm;
      } else if (a_VertexNum < 6.5) {
        pos = dy * norm + d2;
        v_Arc.x = abs(dy);
      } else {
        dy = -dy;
        pos = dy * norm + d2;
        v_Arc.x = abs(dy);
      }
      dy2 = 0.0;
      v_Arc.y = dy;
      v_Arc.z = 0.0;
      v_Arc.w = lineWidth;
      v_Type = 3.0;
    } else if (abs(D) < 0.01) {
      pos = dy * norm;
    } else {
      if (type >= ROUND && type < ROUND + 1.5) {
        if (inner > 0.5) {
          dy = -dy;
          inner = 0.0;
        }
        if (a_VertexNum < 4.5) {
          pos = doBisect(norm, len, norm2, len2, -dy, 1.0);
        } else if (a_VertexNum < 5.5) {
          pos = dy * norm;
        } else if (a_VertexNum > 7.5) {
          pos = dy * norm2;
        } else {
          pos = doBisect(norm, len, norm2, len2, dy, 0.0);
          float d2 = abs(dy);
          if (length(pos) > abs(dy) * 1.5) {
            if (a_VertexNum < 6.5) {
              pos.x = dy * norm.x - d2 * norm.y;
              pos.y = dy * norm.y + d2 * norm.x;
            } else {
              pos.x = dy * norm2.x + d2 * norm2.y;
              pos.y = dy * norm2.y - d2 * norm2.x;
            }
          }
        }
        vec2 norm3 = normalize(norm + norm2);
        float sign = step(0.0, dy) * 2.0 - 1.0;
        v_Arc.x = sign * dot(pos, norm3);
        v_Arc.y = pos.x * norm3.y - pos.y * norm3.x;
        v_Arc.z = dot(norm, norm3) * lineWidth;
        v_Arc.w = lineWidth;
        dy = -sign * dot(pos, norm);
        dy2 = -sign * dot(pos, norm2);
        dy3 = v_Arc.z - v_Arc.x;
        v_Type = 3.0;
      } else {
        float hit = 0.0;
        if (type >= BEVEL && type < BEVEL + 1.5) {
          if (dot(norm, norm2) > 0.0) {
            type = MITER;
          }
        }
        if (type >= MITER && type < MITER + 3.5) {
          if (inner > 0.5) {
            dy = -dy;
            inner = 0.0;
          }
          float sign = step(0.0, dy) * 2.0 - 1.0;
          pos = doBisect(norm, len, norm2, len2, dy, 0.0);
          if (length(pos) > abs(dy) * u_MiterLimit) {
            type = BEVEL;
          } else {
            if (a_VertexNum < 4.5) {
              dy = -dy;
              pos = doBisect(norm, len, norm2, len2, dy, 1.0);
            } else if (a_VertexNum < 5.5) {
              pos = dy * norm;
            } else if (a_VertexNum > 6.5) {
              pos = dy * norm2;
            }
            v_Type = 1.0;
            dy = -sign * dot(pos, norm);
            dy2 = -sign * dot(pos, norm2);
            hit = 1.0;
          }
        }
        if (type >= BEVEL && type < BEVEL + 1.5) {
          if (inner > 0.5) {
            dy = -dy;
            inner = 0.0;
          }
          float d2 = abs(dy);
          vec2 pos3 = vec2(dy * norm.x - d2 * norm.y, dy * norm.y + d2 * norm.x);
          vec2 pos4 = vec2(dy * norm2.x + d2 * norm2.y, dy * norm2.y - d2 * norm2.x);
          if (a_VertexNum < 4.5) {
            pos = doBisect(norm, len, norm2, len2, -dy, 1.0);
          } else if (a_VertexNum < 5.5) {
            pos = dy * norm;
          } else if (a_VertexNum > 7.5) {
            pos = dy * norm2;
          } else {
            if (a_VertexNum < 6.5) {
              pos = pos3;
            } else {
              pos = pos4;
            }
          }
          vec2 norm3 = normalize(norm + norm2);
          float sign = step(0.0, dy) * 2.0 - 1.0;
          dy = -sign * dot(pos, norm);
          dy2 = -sign * dot(pos, norm2);
          dy3 = (-sign * dot(pos, norm3)) + lineWidth;
          v_Type = 4.0;
          hit = 1.0;
        }
        if (hit < 0.5) {
          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }
      }
    }
    pos += base;
    v_Distance = vec4(dy, dy2, dy3, lineWidth) * u_DevicePixelRatio;
    v_Arc = v_Arc * u_DevicePixelRatio;
    v_Travel = a_Travel + dot(pos - pointA, vec2(-norm.y, norm.x));
  }

  v_ScalingFactor = sqrt(u_ModelMatrix[0][0] * u_ModelMatrix[0][0] + u_ModelMatrix[0][1] * u_ModelMatrix[0][1] + u_ModelMatrix[0][2] * u_ModelMatrix[0][2]);

  if (isBillboard || is3DPolyline) {
    vec4 clip = mix(clip0, clip1, 0.5);
    gl_Position = vec4(clip.w * (2.0 * pos / u_Viewport - 1.0), clip.z, clip.w);
  } else {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * vec4(pos, u_ZIndex, 1.0);
  }
}`,Bc=10,Vc=8,Hc=100;function Uc(e,t,n,r,i,a){for(var o=i[i.length-3],s=i[i.length-2],c=a??Ne(he(o,s,e,t,n,r)/Bc,Vc,Hc),l=0,u=0,d=1;d<=c;++d){var f=d/c;l=o+(e-o)*f,u=s+(t-s)*f,i.push(l+(e+(n-e)*f-l)*f,u+(t+(r-t)*f-u)*f,0)}}function Wc(e,t,n,r,i,a,o,s){var c=o[o.length-3],l=o[o.length-2];o.length-=3;var u=s??Ne(pe(c,l,e,t,n,r,i,a)/Bc,Vc,Hc),d=0,f=0,p=0,m=0,h=0;o.push(c,l,0);for(var g=1,_=0;g<=u;++g)_=g/u,d=1-_,f=d*d,p=f*d,m=_*_,h=m*_,o.push(p*c+3*f*_*e+3*d*m*n+h*i,p*l+3*f*_*t+3*d*m*r+h*a,0)}var Gc=0x56bc75e2d63100000,Kc=function(){function e(t,n){s(this,e);var r=t.fontSize,i=r===void 0?24:r,a=t.buffer,o=a===void 0?3:a,c=t.radius,l=c===void 0?8:c,u=t.cutoff,d=u===void 0?.25:u,f=t.fontFamily,p=f===void 0?`sans-serif`:f,m=t.fontWeight,h=m===void 0?`normal`:m,g=t.fontStyle,_=g===void 0?`normal`:g,v=t.canvas;this.buffer=o,this.cutoff=d,this.radius=l;var y=this.size=i+o*4,b=n.offscreenCanvasCreator.getOrCreateCanvas(v);b.width=y,b.height=y;var x=n.offscreenCanvasCreator.getOrCreateContext(v,{willReadFrequently:!0});this.ctx=x,x.font=`${_} ${h} ${i}px ${p}`,x.textBaseline=`alphabetic`,x.textAlign=`left`,x.fillStyle=`black`,this.gridOuter=new Float64Array(y*y),this.gridInner=new Float64Array(y*y),this.f=new Float64Array(y),this.z=new Float64Array(y+1),this.v=new Uint16Array(y)}return c(e,[{key:`draw`,value:function(e){var t=this.ctx.measureText(e),n=t.width,r=t.actualBoundingBoxAscent,i=t.actualBoundingBoxDescent,a=t.actualBoundingBoxLeft,o=t.actualBoundingBoxRight,s=Math.ceil(r),c=0,l=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(o-a))),u=Math.min(this.size-this.buffer,s+Math.ceil(i)),d=l+2*this.buffer,f=u+2*this.buffer,p=Math.max(d*f,0),m=new Uint8ClampedArray(p),h={data:m,width:d,height:f,glyphWidth:l,glyphHeight:u,glyphTop:s,glyphLeft:c,glyphAdvance:n};if(l===0||u===0)return h;var g=this.ctx,_=this.buffer,v=this.gridInner,y=this.gridOuter;g.clearRect(_,_,l,u),g.fillText(e,_,_+s);var b=g.getImageData(_,_,l,u);y.fill(Gc,0,p),v.fill(0,0,p);for(var x=0;x<u;x++)for(var S=0;S<l;S++){var C=b.data[4*(x*l+S)+3]/255;if(C!==0){var w=(x+_)*d+S+_;if(C===1)y[w]=0,v[w]=Gc;else{var T=.5-C;y[w]=T>0?T*T:0,v[w]=T<0?T*T:0}}}qc(y,0,0,d,f,d,this.f,this.v,this.z),qc(v,_,_,l,u,d,this.f,this.v,this.z);for(var E=0;E<p;E++){var D=Math.sqrt(y[E])-Math.sqrt(v[E]);m[E]=Math.round(255-255*(D/this.radius+this.cutoff))}return h}}])}();function qc(e,t,n,r,i,a,o,s,c){for(var l=t;l<t+r;l++)Jc(e,n*a+l,a,i,o,s,c);for(var u=n;u<n+i;u++)Jc(e,u*a+t,1,r,o,s,c)}function Jc(e,t,n,r,i,a,o){a[0]=0,o[0]=-Gc,o[1]=Gc,i[0]=e[t];for(var s=1,c=0,l=0;s<r;s++){i[s]=e[t+s*n];var u=s*s;do{var d=a[c];l=(i[s]-i[d]+u-d*d)/(s-d)/2}while(l<=o[c]&&--c>-1);c++,a[c]=s,o[c]=l,o[c+1]=Gc}for(var f=0,p=0;f<r;f++){for(;o[p+1]<f;)p++;var m=a[p],h=f-m;e[t+f*n]=i[m]+h*h}}var Yc=function(e){return e[e.PACKED=Q.POSITION+1]=`PACKED`,e[e.VERTEX_NUM=1+e.PACKED]=`VERTEX_NUM`,e[e.TRAVEL=1+e.VERTEX_NUM]=`TRAVEL`,e[e.DASH=1+e.TRAVEL]=`DASH`,e}(Yc||{}),Xc=function(e){return e[e.PREV=$.POSITION]=`PREV`,e[e.POINT1=1+e.PREV]=`POINT1`,e[e.POINT2=1+e.POINT1]=`POINT2`,e[e.NEXT=1+e.POINT2]=`NEXT`,e[e.VERTEX_JOINT=1+e.NEXT]=`VERTEX_JOINT`,e[e.VERTEX_NUM=1+e.VERTEX_JOINT]=`VERTEX_NUM`,e[e.TRAVEL=1+e.VERTEX_NUM]=`TRAVEL`,e[e.DASH=1+e.TRAVEL]=`DASH`,e}(Xc||{}),Zc=12;function Qc(e,t,n){return!!e*4+!!t*2+ +!!n}function $c(e){if(e.nodeName!==I.POLYLINE)return!1;var t=e.parsedStyle.points.points;return t.length&&!Ae(t[0][2])}var el=function(e){function t(e,n,r,i,a,o,c){var l;return s(this,t),l=d(this,t,[e,n,r,i,a,o,c]),l.segmentNum=-1,l.renderHelper=e,l.texturePool=n,l.lightPool=r,l.segmentNum=l.calcSegmentNum(i),l.gradientAttributeName=`stroke`,l}return p(t,e),c(t,[{key:`calcSegmentNum`,value:function(e){return il(e,!1,Zc,this.calcSubpathIndex(e)).instancedCount}},{key:`calcSubpathIndex`,value:function(e){if(e.nodeName===I.PATH){var t=this.drawcallCtors.filter(function(e){return e===dl}).length;return this.index-t}return 0}},{key:`shouldMerge`,value:function(e,n){if(!ue(t,`shouldMerge`,this,3)([e,n])||this.index!==n)return!1;var r=this.calcSegmentNum(e);return this.segmentNum===r}},{key:`createMaterial`,value:function(e){this.material.vertexShader=zc,this.material.fragmentShader=Rc,this.material.defines=i(i({},this.material.defines),xc(Xc))}},{key:`createGeometry`,value:function(e){var n=this,r=[],i=[],a=[],o=[],s=0,c=0;e.forEach(function(e){var t=il(e,!1,Zc,n.calcSubpathIndex(e)),u=t.pointsBuffer,d=t.travelBuffer,f=t.instancedCount,p=e.parsedStyle,m=p.lineDash,h=p.lineDashOffset,g=p.isBillboard,_=p.isSizeAttenuation;o.push(m&&m[0]||0,m&&m[1]||0,h||0,Qc(g,_,$c(e))),s+=f;for(var v=0;v<u.length-12;v+=4)i.push(u[v],u[v+1],u[v+2],u[v+3],u[v+4],u[v+5],u[v+6],u[v+7],u[v+8],u[v+9],u[v+10],u[v+11],u[v+12],u[v+13],u[v+14],u[v+15]);a.push.apply(a,l(d)),r.push(0+c,2+c,1+c,0+c,3+c,2+c,4+c,6+c,5+c,4+c,7+c,6+c,4+c,7+c,8+c),c+=9}),i.length&&(this.geometry.setVertexBuffer({bufferIndex:Yc.PACKED,byteStride:64,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:Xc.PREV,divisor:1},{format:J.F32_RGB,bufferByteOffset:16,location:Xc.POINT1,divisor:1},{format:J.F32_R,bufferByteOffset:28,location:Xc.VERTEX_JOINT,divisor:1},{format:J.F32_RGB,bufferByteOffset:32,location:Xc.POINT2,divisor:1},{format:J.F32_RGB,bufferByteOffset:48,location:Xc.NEXT,divisor:1}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:Yc.VERTEX_NUM,byteStride:4,stepMode:H.INSTANCE,attributes:[{format:J.F32_R,bufferByteOffset:0,byteStride:4,location:Xc.VERTEX_NUM,divisor:0}],data:new Float32Array([0,1,2,3,4,5,6,7,8])}),this.geometry.setVertexBuffer({bufferIndex:Yc.TRAVEL,byteStride:4,stepMode:H.INSTANCE,attributes:[{format:J.F32_R,bufferByteOffset:0,byteStride:4,location:Xc.TRAVEL,divisor:1}],data:new Float32Array(a)}),this.divisor=s/e.length,this.geometry.setVertexBuffer({bufferIndex:Yc.DASH,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:Xc.DASH,divisor:this.divisor}],data:new Float32Array(o)}),ue(t,`createGeometry`,this,3)([e]),this.geometry.vertexCount=15,this.geometry.instancedCount=s,this.geometry.setIndexBuffer(new Uint32Array(r)))}},{key:`updateAttribute`,value:function(e,n,r,i){var a=this;if(e.length!==0){if(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i),r===`r`||r===`rx`||r===`ry`||r===`width`||r===`height`||r===`radius`||r===`x1`||r===`y1`||r===`x2`||r===`y2`||r===`points`||r===`path`||r===`d`||r===`lineJoin`||r===`lineCap`||r===`markerStartOffset`||r===`markerEndOffset`||r===`markerStart`||r===`markerEnd`){var o=[],s=[],c=0;e.forEach(function(e){var t=il(e,!1,Zc,a.calcSubpathIndex(e)),n=t.pointsBuffer,r=t.travelBuffer;c=t.instancedCount;for(var i=0;i<n.length-12;i+=4)o.push(n[i],n[i+1],n[i+2],n[i+3],n[i+4],n[i+5],n[i+6],n[i+7],n[i+8],n[i+9],n[i+10],n[i+11],n[i+12],n[i+13],n[i+14],n[i+15]);s.push.apply(s,l(r))}),this.geometry.updateVertexBuffer(Yc.PACKED,Xc.PREV,n*c,new Uint8Array(new Float32Array(o).buffer)),this.geometry.updateVertexBuffer(Yc.TRAVEL,Xc.TRAVEL,n,new Uint8Array(new Float32Array(s).buffer))}else if(r===`lineDashOffset`||r===`lineDash`||r===`isBillboard`||r===`isSizeAttenuation`){var u=[];e.forEach(function(e){var t=e.parsedStyle,n=t.lineDash,r=t.lineDashOffset,i=t.isBillboard,a=t.isSizeAttenuation;u.push(n&&n[0]||0,n&&n[1]||0,r||0,Qc(i,a,$c(e)))}),this.geometry.updateVertexBuffer(Yc.DASH,Xc.DASH,n,new Uint8Array(new Float32Array(u).buffer))}}}}],[{key:`calcSubpathNum`,value:function(e){return e.nodeName===I.PATH?e.parsedStyle.d.absolutePath.filter(function(e){return e[0]===`M`}).length:1}}])}(Dc),tl=function(e){return e[e.NONE=0]=`NONE`,e[e.FILL=1]=`FILL`,e[e.JOINT_BEVEL=4]=`JOINT_BEVEL`,e[e.JOINT_MITER=8]=`JOINT_MITER`,e[e.JOINT_ROUND=12]=`JOINT_ROUND`,e[e.JOINT_CAP_BUTT=16]=`JOINT_CAP_BUTT`,e[e.JOINT_CAP_SQUARE=18]=`JOINT_CAP_SQUARE`,e[e.JOINT_CAP_ROUND=20]=`JOINT_CAP_ROUND`,e[e.FILL_EXPAND=24]=`FILL_EXPAND`,e[e.CAP_BUTT=32]=`CAP_BUTT`,e[e.CAP_SQUARE=64]=`CAP_SQUARE`,e[e.CAP_ROUND=96]=`CAP_ROUND`,e[e.CAP_BUTT2=128]=`CAP_BUTT2`,e}({}),nl=3,rl=4;function il(e){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],r=arguments.length>2?arguments[2]:void 0,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,o=e.parsedStyle,s=o.lineCap,c=o.lineJoin,u=e.sortable.renderOrder*hc,d=0,f=0,p=e.parsedStyle,m=p.markerStart,h=p.markerEnd,g=p.markerStartOffset,_=p.markerEndOffset,v=[],y=[];if(e.nodeName===I.POLYLINE||e.nodeName===I.POLYGON){var b=e.parsedStyle.points.points,x=b.length,S=0,w=0,T=0,E=0,D=0,O,A;m&&k(m)&&g&&(O=b[1][0]-b[0][0],A=b[1][1]-b[0][1],D=Math.atan2(A,O),S=Math.cos(D)*(g||0),w=Math.sin(D)*(g||0)),h&&k(h)&&_&&(O=b[x-2][0]-b[x-1][0],A=b[x-2][1]-b[x-1][1],D=Math.atan2(A,O),T=Math.cos(D)*(_||0),E=Math.sin(D)*(_||0));var j=e.nodeName===I.POLYLINE;if(v[0]=b.reduce(function(e,t,n){var r=0,i=0;return n===0?(r=S,i=w):n===x-1&&(r=T,i=E),e.push(t[0]+r,t[1]+i,j?t[2]||0:u),e},[]),e.nodeName===I.POLYGON){var ee;if(t)return y=(0,Xo.default)(v[0],[],3),{pointsBuffer:v[0],travelBuffer:[],triangles:y,instancedCount:Math.round(v[0].length/nl)};v[0].push(v[0][0],v[0][1],v[0][2]||u),(ee=v[0]).push.apply(ee,l(sl(v[0][0],v[0][1],v[0][2]||u,v[0][3],v[0][4],v[0][5]||u)))}}else if(e.nodeName===I.PATH||e.nodeName===I.CIRCLE||e.nodeName===I.ELLIPSE||e.nodeName===I.RECT){var M;if(e.nodeName!==I.PATH){if(M=Ce(C(e,be(N()))),e.nodeName===I.RECT){var te=e.parsedStyle,ne=te.width,re=te.height;ne<0&&(d+=M.rect.width),re<0&&(f+=M.rect.height)}}else M=e.parsedStyle.d;var ie=M,ae=ie.absolutePath,oe=ie.segments,P=0,se=0,ce=0,F=0,le=0,ue,de;if(m&&m.parentNode&&k(m)&&g){var fe=m.parentNode.getStartTangent(),pe=a(fe,2),me=pe[0],he=pe[1];ue=me[0]-he[0],de=me[1]-he[1],le=Math.atan2(de,ue),P=Math.cos(le)*(g||0),se=Math.sin(le)*(g||0)}if(h&&h.parentNode&&k(h)&&_){var ge=h.parentNode.getEndTangent(),_e=a(ge,2),ve=_e[0],ye=_e[1];ue=ve[0]-ye[0],de=ve[1]-ye[1],le=Math.atan2(de,ue),ce=Math.cos(le)*(_||0),F=Math.sin(le)*(_||0)}var xe=-1,L=-1;if(ae.forEach(function(t,i){var o=ut(t),s=o[0],c=n(o).slice(1),p=ae[i+1],m=i===0&&(P!==0||se!==0),h=(i===ae.length-1||p&&(p[0]===`M`||p[0]===`Z`))&&ce!==0&&F!==0;if(s===`M`)L++,v[L]=[],xe=v[L].length,m?v[L].push(c[0]-d+P,c[1]-f+se,u,c[0]-d,c[1]-f,u):v[L].push(c[0]-d,c[1]-f,u);else if(s===`L`)h?v[L].push(c[0]-d+ce,c[1]-f+F,u):v[L].push(c[0]-d,c[1]-f,u);else if(s===`Q`)Uc(c[0]-d,c[1]-f,c[2]-d,c[3]-f,v[L],r),h&&v[L].push(c[2]-d+ce,c[3]-f+F,u);else if(s===`A`){for(var g=a(oe[i].prePoint,2),_=g[0],y=g[1],b=je(_,y,c[0],c[1],c[2],c[3],c[4],c[5],c[6],void 0),x=0;x<b.length;x+=6)Wc(b[x]-d,b[x+1]-f,b[x+2]-d,b[x+3]-f,b[x+4]-d,b[x+5]-f,v[L],r);h&&v[L].push(c[5]-d+ce,c[6]-f+F,u)}else if(s===`C`)Wc(c[0]-d,c[1]-f,c[2]-d,c[3]-f,c[4]-d,c[5]-f,v[L],r),h&&v[L].push(c[4]-d+ce,c[5]-f+F,u);else if(s===`Z`&&(e.nodeName===I.PATH||e.nodeName===I.RECT)){var S,C=1e-4;(Math.abs(v[L][v[L].length-2]-v[L][xe])>C||Math.abs(v[L][v[L].length-1]-v[L][xe+1])>C)&&v[L].push(v[L][xe],v[L][xe+1],u),(S=v[L]).push.apply(S,l(sl(v[L][xe],v[L][xe+1],v[L][xe+2],v[L][xe+3],v[L][xe+4],v[L][xe+5])))}}),t){var Se=v[i];return y=(0,Xo.default)(Se,[],3),{pointsBuffer:Se,travelBuffer:[],triangles:y,instancedCount:Math.round(Se.length/nl)}}}var we=al(c),Te=ol(s),Ee=Te;Te===tl.CAP_ROUND&&(Ee=tl.JOINT_CAP_ROUND),Te===tl.CAP_BUTT&&(Ee=tl.JOINT_CAP_BUTT),Te===tl.CAP_SQUARE&&(Ee=tl.JOINT_CAP_SQUARE);for(var R=v[i],De=(Math.round(0/nl)+2)*rl,Oe=0,ke=[],Ae=[],Me=0;Me<R.length;Me+=nl)Me>1&&(Oe+=Math.sqrt((R[Me]-R[Me-nl])**2+(R[Me+1]-R[Me+1-nl])**2+(R[Me+2]-R[Me+2-nl])**2)),Ae.push(Oe),ke[De++]=R[Me],ke[De++]=R[Me+1],ke[De++]=R[Me+2]||0,ke[De]=we,Me===0&&Te!==tl.CAP_ROUND&&(ke[De]+=Te),Me+nl*2>=R.length?ke[De]+=Ee-we:Me+nl>=R.length&&(ke[De]=0),De++;ke[De++]=R[R.length-6],ke[De++]=R[R.length-5],ke[De++]=R[R.length-4]||u,ke[De++]=0,ke[0]=R[0],ke[1]=R[1],ke[2]=R[2]||u,ke[3]=0,ke[4]=R[3],ke[5]=R[4],ke[6]=R[5]||u,ke[7]=Te===tl.CAP_ROUND?Te:0;var Ne=Math.round(R.length/nl);return{pointsBuffer:ke,travelBuffer:Ae,triangles:y,instancedCount:Ne}}function al(e){var t;switch(e){case`bevel`:t=tl.JOINT_BEVEL;break;case`round`:t=tl.JOINT_ROUND;break;default:t=tl.JOINT_MITER}return t}function ol(e){var t;switch(e){case`square`:t=tl.CAP_SQUARE;break;case`round`:t=tl.CAP_ROUND;break;default:t=tl.CAP_BUTT}return t}function sl(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:e,i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:t,a=arguments.length>5&&arguments[5]!==void 0?arguments[5]:n,o=[r-e,i-t,a-n],s=.01;return[e+o[0]*s,t+o[1]*s,n+o[2]*s]}var cl=12,ll=function(e){return e[e.PACKED_STYLE=Q.POSITION+1]=`PACKED_STYLE`,e}(ll||{}),ul=function(e){return e[e.PACKED_STYLE3=$.MAX]=`PACKED_STYLE3`,e}(ul||{}),dl=function(e){function t(e,n,r,i,a,o,c){var l;return s(this,t),l=d(this,t,[e,n,r,i,a,o,c]),l.trianglesHash=[[],[]],l.renderHelper=e,l.texturePool=n,l.lightPool=r,l.trianglesHash=l.calcSegmentNum(i),l}return p(t,e),c(t,[{key:`calcSegmentNum`,value:function(e){var t=il(e,!0,cl,this.calcSubpathIndex(e));return[t.triangles,t.pointsBuffer]}},{key:`calcSubpathIndex`,value:function(e){return e.nodeName===I.PATH?this.index:0}},{key:`compareTrianglesHash`,value:function(e){var t=a(this.trianglesHash,2),n=t[0],r=t[1],i=a(e,2),o=i[0],s=i[1];return!(n.length!==o.length||r.length!==s.length||n.some(function(e,t){return e!==o[t]})||r.some(function(e,t){return e!==s[t]}))}},{key:`shouldMerge`,value:function(e,n){if(!ue(t,`shouldMerge`,this,3)([e,n])||this.index!==n)return!1;var r=this.calcSegmentNum(e);return this.compareTrianglesHash(r)}},{key:`createGeometry`,value:function(e){var n=this,r=[],i=[],a=[],o=0;if(e.forEach(function(e,t){var s=il(e,!0,cl,n.calcSubpathIndex(e)),c=s.triangles,u=s.pointsBuffer;if(c.length){var d=e.getGeometryBounds().halfExtents,f=[];u.forEach(function(e,t){t%3!=2&&f.push(e/d[t%3]/2)}),o+=i.length/3,i.push.apply(i,l(u)),a.push.apply(a,f),r.push.apply(r,l(c.map(function(e){return e+o})))}}),i.length){ue(t,`createGeometry`,this,3)([e]);var s=[];e.forEach(function(e){var t=e.parsedStyle,n=t.isBillboard,r=t.billboardRotation,i=t.isSizeAttenuation;s.push(+!!n,r??0,+!!i,0)}),this.geometry.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:12,stepMode:H.VERTEX,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.POSITION}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:ll.PACKED_STYLE,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:ul.PACKED_STYLE3,divisor:1}],data:new Float32Array(s)}),this.geometry.setVertexBuffer({bufferIndex:Q.UV,byteStride:8,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:$.UV}],data:new Float32Array(a)}),this.geometry.vertexCount=r.length/e.length,this.geometry.setIndexBuffer(new Uint32Array(r))}}},{key:`createMaterial`,value:function(e){this.material.vertexShader=Lc,this.material.fragmentShader=Ic,this.material.defines=i(i(i({},this.material.defines),xc(ul)),{},{INSTANCED:!0})}},{key:`updateAttribute`,value:function(e,n,r,i){if(e.length!==0&&(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i),r===`isBillboard`||r===`billboardRotation`||r===`isSizeAttenuation`)){var a=[];e.forEach(function(e){var t=e.parsedStyle,n=t.isBillboard,r=t.billboardRotation,i=t.isSizeAttenuation;a.push(+!!n,r??0,+!!i,0)}),this.geometry.updateVertexBuffer(ll.PACKED_STYLE,ul.PACKED_STYLE3,n,new Uint8Array(new Float32Array(a).buffer))}}}])}(Dc),fl=[0,-.5,0,0,0,1,-.5,1,1,0,1,.5,1,1,1,0,.5,0,0,1],pl=function(e){return e[e.POINT=Q.POSITION+1]=`POINT`,e[e.CAP=1+e.POINT]=`CAP`,e[e.DASH=1+e.CAP]=`DASH`,e}(pl||{}),ml=function(e){return e[e.POSITION=$.POSITION]=`POSITION`,e[e.UV=$.UV]=`UV`,e[e.POINTA=$.NORMAL]=`POINTA`,e[e.POINTB=$.BARYCENTRIC]=`POINTB`,e[e.CAP=$.MAX]=`CAP`,e[e.DASH=$.MAX+1]=`DASH`,e}(ml||{}),hl={butt:1,round:2,square:3},gl=function(e){function t(e,n,r,i,a,o,c){var l;return s(this,t),l=d(this,t,[e,n,r,i,a,o,c]),l.renderHelper=e,l.texturePool=n,l.lightPool=r,l.gradientAttributeName=`stroke`,l}return p(t,e),c(t,[{key:`shouldMerge`,value:function(e,n){return!!ue(t,`shouldMerge`,this,3)([e,n])}},{key:`createMaterial`,value:function(e){this.material.vertexShader=Fc,this.material.fragmentShader=Pc,this.material.defines=i(i({},this.material.defines),xc(ml))}},{key:`calcSubpathIndex`,value:function(e){if(e.nodeName===I.PATH){var t=this.drawcallCtors.filter(function(e){return e===dl}).length;return this.index-t}return 0}},{key:`createGeometry`,value:function(e){var n=this;ue(t,`createGeometry`,this,3)([e]);var r=[],i=[],a=[],o=[],s=0;e.forEach(function(e){var t,c;if(e.nodeName===I.LINE)t=e.parsedStyle,c=e.getTotalLength();else if(e.nodeName===I.POLYLINE){var l=e.parsedStyle,u=l.points.points,d=l.lineCap,f=l.lineDash,p=l.lineDashOffset,m=l.markerStart,h=l.markerEnd,g=l.markerStartOffset,_=l.markerEndOffset,v=l.isBillboard,y=l.isSizeAttenuation;t={x1:u[0][0],y1:u[0][1],x2:u[u.length-1][0],y2:u[u.length-1][1],z1:0,z2:0,lineCap:d,lineDash:f,lineDashOffset:p,isBillboard:v,isSizeAttenuation:y,markerStart:m,markerEnd:h,markerStartOffset:g,markerEndOffset:_},c=e.getTotalLength()}else if(e.nodeName===I.PATH){for(var b=e.parsedStyle,x=b.d.absolutePath,S=b.lineCap,C=b.lineDash,w=b.lineDashOffset,T=b.markerStart,E=b.markerEnd,D=b.markerStartOffset,O=b.markerEndOffset,k=b.isBillboard,A=b.isSizeAttenuation,j=0,ee=0,M=n.calcSubpathIndex(e),te=0;te<x.length;te++)if(x[te][0]===`M`){if(j===M){ee=te;break}j++}t={x1:x[ee][1],y1:x[ee][2],x2:x[ee+1][1],y2:x[ee+1][2],z1:0,z2:0,lineCap:S,lineDash:C,lineDashOffset:w,isBillboard:k,isSizeAttenuation:A,markerStart:T,markerEnd:E,markerStartOffset:D,markerEndOffset:O},c=e.getTotalLength()}var ne=t,re=ne.x1,ie=ne.y1,ae=ne.x2,N=ne.y2,oe=ne.z1,P=ne.z2,se=ne.lineCap,ce=ne.isBillboard,F=ne.isSizeAttenuation,le=n.calcOffset(t),ue=le.startOffsetX,de=le.startOffsetY,fe=le.endOffsetX,pe=le.endOffsetY,me=n.calcDash(t,c),he=me.dashOffset,ge=me.dashSegmentPercent,_e=me.dashRatioInEachSegment;i.push(hl[se]),a.push(he,ge,_e,ce||F?1:0),r.push(re+ue,ie+de,oe,ae+fe,N+pe,P),o.push(0+s,2+s,1+s,0+s,3+s,2+s),s+=4}),this.geometry.setIndexBuffer(new Uint32Array(o)),this.geometry.vertexCount=6,this.geometry.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:20,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:ml.POSITION,divisor:0},{format:J.F32_RG,bufferByteOffset:12,location:ml.UV,divisor:0}],data:new Float32Array(fl)}),this.geometry.setVertexBuffer({bufferIndex:pl.POINT,byteStride:24,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:ml.POINTA,divisor:1},{format:J.F32_RGB,bufferByteOffset:12,location:ml.POINTB,divisor:1}],data:new Float32Array(r)}),this.geometry.setVertexBuffer({bufferIndex:pl.CAP,byteStride:4,stepMode:H.INSTANCE,attributes:[{format:J.F32_R,bufferByteOffset:0,location:ml.CAP,divisor:1}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:pl.DASH,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:ml.DASH,divisor:1}],data:new Float32Array(a)})}},{key:`updateAttribute`,value:function(e,n,r,i){var a=this;if(e.length!==0){if(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i),r===`x1`||r===`y1`||r===`x2`||r===`y2`||r===`z1`||r===`z2`||r===`markerStartOffset`||r===`markerEndOffset`||r===`markerStart`||r===`markerEnd`||r===`points`||r===`d`){var o=[];e.forEach(function(e){var t;if(e.nodeName===I.LINE)t=e.parsedStyle;else if(e.nodeName===I.POLYLINE){var n=e.parsedStyle,r=n.points.points,i=n.lineCap,s=n.markerStart,c=n.markerEnd,l=n.markerStartOffset,u=n.markerEndOffset,d=n.isBillboard,f=n.isSizeAttenuation;t={x1:r[0][0],y1:r[0][1],x2:r[r.length-1][0],y2:r[r.length-1][1],z1:0,z2:0,lineCap:i,isSizeAttenuation:f,isBillboard:d,markerStart:s,markerEnd:c,markerStartOffset:l,markerEndOffset:u}}else if(e.nodeName===I.PATH){var p=e.parsedStyle,m=p.d.absolutePath,h=p.lineCap,g=p.markerStart,_=p.markerEnd,v=p.markerStartOffset,y=p.markerEndOffset,b=p.isBillboard,x=p.isSizeAttenuation;t={x1:m[0][1],y1:m[0][2],x2:m[1][1],y2:m[1][2],z1:0,z2:0,lineCap:h,isBillboard:b,isSizeAttenuation:x,markerStart:g,markerEnd:_,markerStartOffset:v,markerEndOffset:y}}var S=t,C=S.x1,w=S.y1,T=S.x2,E=S.y2,D=S.z1,O=S.z2,k=a.calcOffset(t),A=k.startOffsetX,j=k.startOffsetY,ee=k.endOffsetX,M=k.endOffsetY;o.push(C+A,w+j,D,T+ee,E+M,O)}),this.geometry.updateVertexBuffer(pl.POINT,ml.POINTA,n,new Uint8Array(new Float32Array(o).buffer))}else if(r===`lineDashOffset`||r===`lineDash`||r===`isSizeAttenuation`||r===`isBillboard`){var s=[];e.forEach(function(e){var t=e.getTotalLength(),n=a.calcDash(e.parsedStyle,t),r=n.dashOffset,i=n.dashSegmentPercent,o=n.dashRatioInEachSegment;s.push(r,i,o,e.parsedStyle.isBillboard||e.parsedStyle.isSizeAttenuation?1:0)}),this.geometry.updateVertexBuffer(pl.DASH,ml.DASH,n,new Uint8Array(new Float32Array(s).buffer))}else if(r===`lineCap`){var c=[];e.forEach(function(e){var t=e.parsedStyle.lineCap;c.push(hl[t])}),this.geometry.updateVertexBuffer(pl.CAP,ml.CAP,n,new Uint8Array(new Float32Array(c).buffer))}}}},{key:`calcOffset`,value:function(e){var t=e.x1,n=e.y1,r=e.x2,i=e.y2,a=e.markerStart,o=e.markerEnd,s=e.markerStartOffset,c=e.markerEndOffset,l=0,u=0,d=0,f=0,p=0,m,h;return a&&k(a)&&s&&(m=r-t,h=i-n,p=Math.atan2(h,m),l=Math.cos(p)*(s||0),u=Math.sin(p)*(s||0)),o&&k(o)&&c&&(m=t-r,h=n-i,p=Math.atan2(h,m),d=Math.cos(p)*(c||0),f=Math.sin(p)*(c||0)),{startOffsetX:l,startOffsetY:u,endOffsetX:d,endOffsetY:f}}},{key:`calcDash`,value:function(e,t){var n=e.lineDash,r=e.lineDashOffset,i=0,a=1,o=0;if(n&&n.length){i=(r||0)/t;var s=n.reduce(function(e,t){return e+t},0);s===0?(a=1,o=0):(a=s/t,o=n[1]/s)}return{dashOffset:i,dashSegmentPercent:a,dashRatioInEachSegment:o}}}],[{key:`isLine`,value:function(e,t){if(e.nodeName===I.PATH){for(var n=e.parsedStyle.d.absolutePath,r=0,i=0,a=0;a<n.length;a++)if(n[a][0]===`M`){if(r===t){i=a;break}r++}if(n[i][0]===`M`&&n[i+1][0]===`L`&&(n[i+2]===void 0||n[i+2][0]===`M`))return!0}else if(e.nodeName===I.POLYLINE){for(var o=e.parsedStyle.points.points,s=(o[1][0]-o[1][1])/(o[0][0]-o[0][1]),c=1;c<o.length-1;c++)if((o[c+1][0]-o[c+1][1])/(o[c][0]-o[c][1])!==s)return!1;return!0}return!1}}])}(Dc),_l=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif

out vec4 outputColor;

float epsilon = 0.000001;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }

    // TODO: pointer-events: non-transparent-pixel
    // if (u_Color.x == 0.0 && u_Color.y == 0.0 && u_Color.z == 0.0) {
    //   discard;
    // }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;

    if (outputColor.a < epsilon) {
      discard;
    }
  }
}`,vl=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

bool isPerspectiveMatrix(mat4 m) {
  return m[2][3] == -1.0;
}

vec4 billboard(vec2 offset, float rotation, bool isSizeAttenuation, mat4 pm, mat4 vm, mat4 mm, vec3 position) {
  vec4 mvPosition = vm * mm * vec4(position, 1.0);
  vec2 scale;
  scale.x = length(vec3(mm[0][0], mm[0][1], mm[0][2]));
  scale.y = length(vec3(mm[1][0], mm[1][1], mm[1][2]));

  if (isSizeAttenuation) {
    bool isPerspective = isPerspectiveMatrix(pm);
    if (isPerspective) {
      scale *= -mvPosition.z / 250.0;
    }
  }

  vec2 alignedPosition = offset * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y;
  rotatedPosition.y = sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;
  return pm * mvPosition;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = SIZE) in vec2 a_Size;
layout(location = PACKED_STYLE3) in vec4 a_StylePacked3;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  vec2 offset = (a_Uv - u_Anchor.xy) * a_Size;

  bool isBillboard = a_StylePacked3.x > 0.5;
  if (isBillboard) {
    float rotation = a_StylePacked3.y;
    bool isSizeAttenuation = a_StylePacked3.z > 0.5;
    gl_Position = billboard(offset, rotation, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, a_Position);
  } else {
    gl_Position = project(vec4(a_Position.xy + offset, u_ZIndex, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

}`,yl=function(e){return e[e.PACKED_STYLE=Q.POSITION+1]=`PACKED_STYLE`,e[e.SIZE=Q.MAX]=`SIZE`,e}(yl||{}),bl=function(e){return e[e.PACKED_STYLE3=$.MAX]=`PACKED_STYLE3`,e[e.SIZE=1+e.PACKED_STYLE3]=`SIZE`,e}(bl||{}),xl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`shouldMerge`,value:function(e,n){return!(!ue(t,`shouldMerge`,this,3)([e,n])||this.instance.parsedStyle.src!==e.parsedStyle.src)}},{key:`createMaterial`,value:function(e){var t=e[0].parsedStyle.src;this.material.defines=i(i({},this.material.defines),xc(bl)),this.material.vertexShader=vl,this.material.fragmentShader=_l;var n=this.texturePool.getOrCreateTexture(this.context.device,t,void 0);this.material.setUniforms({u_Map:n})}},{key:`createGeometry`,value:function(e){ue(t,`createGeometry`,this,3)([e]);var n=[],r=[],i=[];e.forEach(function(e,t){var a=e.parsedStyle,o=a.x,s=o===void 0?0:o,c=a.y,l=c===void 0?0:c,u=a.z,d=u===void 0?0:u,f=a.width,p=a.height,m=a.isBillboard,h=a.billboardRotation,g=a.isSizeAttenuation;n.push(s,l,d),r.push(f,p),i.push(+!!m,h??0,+!!g,0)}),this.geometry.setIndexBuffer(new Uint32Array([0,2,1,0,3,2])),this.geometry.vertexCount=6,this.geometry.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:12,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.POSITION}],data:new Float32Array(n)}),this.geometry.setVertexBuffer({bufferIndex:yl.SIZE,byteStride:8,stepMode:H.INSTANCE,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:bl.SIZE}],data:new Float32Array(r)}),this.geometry.setVertexBuffer({bufferIndex:yl.PACKED_STYLE,byteStride:16,stepMode:H.INSTANCE,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:bl.PACKED_STYLE3,divisor:1}],data:new Float32Array(i)}),this.geometry.setVertexBuffer({bufferIndex:Q.UV,byteStride:8,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:$.UV}],data:new Float32Array([0,0,1,0,1,1,0,1])})}},{key:`updateAttribute`,value:function(e,n,r,i){if(e.length!==0){if(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i),r===`x`||r===`y`||r===`z`){var a=[];e.forEach(function(e){var t=e.parsedStyle,n=t.x,r=n===void 0?0:n,i=t.y,o=i===void 0?0:i,s=t.z,c=s===void 0?0:s;a.push(r,o,c)}),this.geometry.updateVertexBuffer(Q.POSITION,$.POSITION,n,new Uint8Array(new Float32Array(a).buffer))}else if(r===`width`||r===`height`){var o=[];e.forEach(function(e){var t=e.parsedStyle,n=t.width,r=t.height;o.push(n,r)}),this.geometry.updateVertexBuffer(yl.SIZE,bl.SIZE,n,new Uint8Array(new Float32Array(o).buffer))}else if(r===`isBillboard`||r===`billboardRotation`||r===`isSizeAttenuation`){var s=[];e.forEach(function(e){var t=e.parsedStyle,n=t.isBillboard,r=t.billboardRotation,i=t.isSizeAttenuation;s.push(+!!n,r??0,+!!i,0)}),this.geometry.updateVertexBuffer(yl.PACKED_STYLE,bl.PACKED_STYLE3,n,new Uint8Array(new Float32Array(s).buffer))}else if(r===`src`){var c=this.texturePool.getOrCreateTexture(this.context.device,i);this.material.setUniforms({u_Map:c})}}}}])}(Dc),Sl=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
layout(std140) uniform ub_ObjectParams {
  vec2 u_SDFMapSize;
  float u_FontSize;
  float u_GammaScale;
  float u_StrokeBlur;
  float u_HasStroke;
};
#ifdef USE_UV
  in vec2 v_Uv;
#endif

uniform sampler2D u_SDFMap;

#define SDF_PX 8.0

out vec4 outputColor;
float epsilon = 0.000001;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}

  float dist = texture(SAMPLER_2D(u_SDFMap), v_Uv).a;

  float fontScale = u_FontSize / 24.0;
  lowp vec4 color = u_Color;
  lowp float buff = (256.0 - 64.0) / 256.0;
  float opacity = u_FillOpacity;
  if (u_HasStroke > 0.5 && u_StrokeWidth > 0.0) {
    color = u_StrokeColor;
    buff = (6.0 - u_StrokeWidth / fontScale / 2.0) / SDF_PX;
    opacity = u_StrokeOpacity;
  }

  highp float gamma_scaled = fwidth(dist);
  highp float alpha = smoothstep(buff - gamma_scaled, buff + gamma_scaled, dist);

  opacity *= alpha * u_Opacity;

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {

    if (opacity < epsilon) {
      discard;
    }

    outputColor = color;
    outputColor.a *= opacity;
  }
}`,Cl=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}

layout(std140) uniform ub_ObjectParams {
  vec2 u_SDFMapSize;
  float u_FontSize;
  float u_GammaScale;
  float u_StrokeBlur;
  float u_HasStroke;
};
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

bool isPerspectiveMatrix(mat4 m) {
  return m[2][3] == -1.0;
}

vec4 billboard(vec2 offset, float rotation, bool isSizeAttenuation, mat4 pm, mat4 vm, mat4 mm, vec3 position) {
  vec4 mvPosition = vm * mm * vec4(position, 1.0);
  vec2 scale;
  scale.x = length(vec3(mm[0][0], mm[0][1], mm[0][2]));
  scale.y = length(vec3(mm[1][0], mm[1][1], mm[1][2]));

  if (isSizeAttenuation) {
    bool isPerspective = isPerspectiveMatrix(pm);
    if (isPerspective) {
      scale *= -mvPosition.z / 250.0;
    }
  }

  vec2 alignedPosition = offset * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos(rotation) * alignedPosition.x - sin(rotation) * alignedPosition.y;
  rotatedPosition.y = sin(rotation) * alignedPosition.x + cos(rotation) * alignedPosition.y;

  mvPosition.xy += rotatedPosition;
  return pm * mvPosition;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = TEX) in vec2 a_Tex;
layout(location = OFFSET) in vec2 a_Offset;

out vec2 v_Uv;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  v_Uv = a_Tex / u_SDFMapSize;
  float fontScale = u_FontSize / 24.;

  vec2 bufferOffset = vec2(0.7, 2.0);
  vec2 offset = a_Offset * fontScale + + bufferOffset;

  bool isBillboard = a_StylePacked2.y > 0.5;
  if (isBillboard) {
    float rotation =  a_StylePacked2.w;
    bool isSizeAttenuation = a_StylePacked2.z > 0.5;
    gl_Position = billboard(offset, rotation, isSizeAttenuation, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix, a_Position );
  } else {
    gl_Position = project(vec4(a_Position.xy + offset, u_ZIndex, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);
  }
}`;function wl(e,t,n,r){var i=t.width,a=t.height;if(!r)r=new Uint8Array(i*a*n);else if(r.length!==i*a*n)throw RangeError(`mismatched image size`);return e.width=i,e.height=a,e.data=r,e}function Tl(e,t,n){var r=t.width,i=t.height;if(r!==e.width||i!==e.height){var a=wl({},{width:r,height:i},n);El(e,a,{x:0,y:0},{x:0,y:0},{width:Math.min(e.width,r),height:Math.min(e.height,i)},n),e.width=r,e.height=i,e.data=a.data}}function El(e,t,n,r,i,a){if(i.width===0||i.height===0)return t;if(i.width>e.width||i.height>e.height||n.x>e.width-i.width||n.y>e.height-i.height)throw RangeError(`out of range source coordinates for image copy`);if(i.width>t.width||i.height>t.height||r.x>t.width-i.width||r.y>t.height-i.height)throw RangeError(`out of range destination coordinates for image copy`);for(var o=e.data,s=t.data,c=0;c<i.height;c++)for(var l=((n.y+c)*e.width+n.x)*a,u=((r.y+c)*t.width+r.x)*a,d=0;d<i.width*a;d++)s[u+d]=o[l+d];return t}var Dl=function(){function e(t,n){s(this,e),wl(this,t,1,n)}return c(e,[{key:`resize`,value:function(e){Tl(this,e,1)}},{key:`clone`,value:function(){return new e({width:this.width,height:this.height},new Uint8Array(this.data))}}],[{key:`copy`,value:function(e,t,n,r,i){El(e,t,n,r,i,1)}}])}();function Ol(e){var t=0,n=0,r=m(e),i;try{for(r.s();!(i=r.n()).done;){var a=i.value;t+=a.w*a.h,n=Math.max(n,a.w)}}catch(e){r.e(e)}finally{r.f()}e.sort(function(e,t){return t.h-e.h});var o=[{x:0,y:0,w:Math.max(Math.ceil(Math.sqrt(t/.95)),n),h:1/0}],s=0,c=0,l=m(e),u;try{for(l.s();!(u=l.n()).done;)for(var d=u.value,f=o.length-1;f>=0;f--){var p=o[f];if(!(d.w>p.w||d.h>p.h)){if(d.x=p.x,d.y=p.y,c=Math.max(c,d.y+d.h),s=Math.max(s,d.x+d.w),d.w===p.w&&d.h===p.h){var h=o.pop();f<o.length&&(o[f]=h)}else d.h===p.h?(p.x+=d.w,p.w-=d.w):d.w===p.w?(p.y+=d.h,p.h-=d.h):(o.push({x:p.x+d.w,y:p.y,w:p.w-d.w,h:d.h}),p.y+=d.h,p.h-=d.h);break}}}catch(e){l.e(e)}finally{l.f()}return{w:s,h:c,fill:t/(s*c)||0}}var kl=1,Al=c(function e(t){s(this,e);var n={},r=[];for(var i in t){var a=t[i],o=n[i]={};for(var c in a){var l=a[+c];if(l&&l.bitmap.width!==0&&l.bitmap.height!==0){var u={x:0,y:0,w:l.bitmap.width+2*kl,h:l.bitmap.height+2*kl};r.push(u),o[c]={rect:u,metrics:l.metrics}}}}var d=Ol(r),f=d.w,p=d.h,m=new Dl({width:f||1,height:p||1});for(var h in t){var g=t[h];for(var _ in g){var v=g[+_];if(v&&v.bitmap.width!==0&&v.bitmap.height!==0){var y=n[h][_].rect;Dl.copy(v.bitmap,m,{x:0,y:0},{x:y.x+kl,y:y.y+kl},v.bitmap)}}}this.image=m,this.positions=n}),jl=24,Ml=3,Nl=jl,Pl=Ml,Fl=8,Il=.25;function Ll(){for(var e=[],t=32;t<128;t++)e.push(String.fromCharCode(t));return e}var Rl=function(){function e(t){s(this,e),this.sdfGeneratorCache={},this.textMetricsCache={},this.glyphMap={},this.runtime=t}return c(e,[{key:`destroy`,value:function(){this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy()}},{key:`getMap`,value:function(){return this.glyphMap}},{key:`getAtlas`,value:function(){return this.glyphAtlas}},{key:`getAtlasTexture`,value:function(){return this.glyphAtlasTexture}},{key:`layout`,value:function(e,t,n,r,i,a,o){var s=this,c=[],l=a,u=o,d=r===`right`||r===`end`?1:r===`left`||r===`start`?0:.5;return e.forEach(function(e){var r=c.length;Array.from(e).forEach(function(e){var n=s.glyphMap[t],r=e.charCodeAt(0),a=n&&n[r];a&&(c.push({glyph:r,x:l,y:u,scale:1,fontStack:t}),l+=a.metrics.advance+i)});for(var a=l-i,o=r;o<c.length;o++)c[o].x-=d*a;l=0,u+=n}),c}},{key:`generateAtlas`,value:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0,o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:``,s=arguments.length>5?arguments[5]:void 0,c=arguments.length>6?arguments[6]:void 0,l=[];this.glyphMap[n]||(l=Ll());var u=Object.keys(this.glyphMap[n]||{});if(Array.from(new Set(s.split(``))).forEach(function(e){u.indexOf(e.charCodeAt(0).toString())===-1&&l.push(e)}),l.length){var d=l.map(function(i){return t.generateSDF(e,n,r,a,o,i)}).reduce(function(e,t){return e[t.id]=t,e},{});this.glyphMap[n]=i(i({},this.glyphMap[n]),d),this.glyphAtlas=new Al(this.glyphMap);var f=this.glyphAtlas.image,p=f.width,m=f.height,h=f.data;this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy(),this.glyphAtlasTexture=c.createTexture(i(i({},$n(J.ALPHA,p,m,1)),{},{pixelStore:{unpackFlipY:!1,unpackAlignment:1}})),this.glyphAtlasTexture.setImageData([h])}}},{key:`generateSDF`,value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:``,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=arguments.length>4?arguments[4]:void 0,a=arguments.length>5?arguments[5]:void 0,o=a.charCodeAt(0),s=this.sdfGeneratorCache[t];s||=this.sdfGeneratorCache[t]=new Kc({canvas:e,fontSize:Nl,fontFamily:n,fontWeight:r,fontStyle:i,buffer:Pl,radius:Fl,cutoff:Il},this.runtime),this.textMetricsCache[t]||(this.textMetricsCache[t]={}),this.textMetricsCache[t][a]||(this.textMetricsCache[t][a]=s.ctx.measureText(a).width);var c=s.draw(a),l=c.data,u=c.width,d=c.height,f=c.glyphWidth,p=c.glyphHeight,m=c.glyphLeft,h=c.glyphTop,g=c.glyphAdvance;return{id:o,bitmap:new Dl({width:u,height:d},l),metrics:{width:f,height:p,left:m,top:h-jl+Ml,advance:g}}}}])}();function zl(e,t){for(var n=[],r=0;r<e.length;r++){var i=e[r],a=t[i.fontStack],o=a&&a[i.glyph];if(o){var s=o.rect;if(s){var c=Ml+1,l=o.metrics.advance*i.scale/2,u=[0,0],d=[i.x+l,i.y],f=(o.metrics.left-c)*i.scale-l+d[0],p=(-o.metrics.top-c)*i.scale+d[1],m=f+s.w*i.scale,h=p+s.h*i.scale,g={x:f,y:p},_={x:m,y:p},v={x:f,y:h},y={x:m,y:h};n.push({tl:g,tr:_,bl:v,br:y,tex:s,glyphOffset:u})}}}return n}var Bl=function(e){return e[e.INSTANCED=Q.POSITION+1]=`INSTANCED`,e[e.TEX=1+e.INSTANCED]=`TEX`,e}(Bl||{}),Vl=function(e){return e[e.TEX=$.MAX]=`TEX`,e[e.OFFSET=1+e.TEX]=`OFFSET`,e}(Vl||{}),Hl=function(e){return e.SDF_MAP=`u_SDFMap`,e.SDF_MAP_SIZE=`u_SDFMapSize`,e.FONT_SIZE=`u_FontSize`,e.GAMMA_SCALE=`u_GammaScale`,e.STROKE_BLUR=`u_StrokeBlur`,e.HAS_STROKE=`u_HasStroke`,e}({}),Ul=function(e){function t(e,n,r,i,a,o,c){var l;return s(this,t),l=d(this,t,[e,n,r,i,a,o,c]),l.packedBufferObjectMap=new WeakMap,l.tmpMat4=N(),l.renderHelper=e,l.texturePool=n,l.lightPool=r,l.fontHash=l.calcFontHash(i),l.glyphManager=new Rl(l.context),l}return p(t,e),c(t,[{key:`calcFontHash`,value:function(e){return e.getBounds(),e.parsedStyle.metrics.font+[`fontSize`,`fontFamily`,`fontWeight`,`textBaseline`,`letterSpacing`].reduce(function(t,n){return t+e.parsedStyle[n]},``)}},{key:`shouldMerge`,value:function(e,n){return!ue(t,`shouldMerge`,this,3)([e,n])||this.index!==n?!1:this.fontHash===this.calcFontHash(e)}},{key:`createGeometry`,value:function(e){var t=this,n=this.instance,r=n.parsedStyle,i=r.fontSize,a=i===void 0?16:i,o=r.letterSpacing,s=o===void 0?0:o,c=n.parsedStyle.textBaseline,u=c===void 0?`alphabetic`:c,d=jl/a,f=[],p=[],m=[],h=[],g=0;e.forEach(function(e){var n=e.parsedStyle,r=n.metrics,i=n.dx,a=i===void 0?0:i,o=n.dy,c=o===void 0?0:o,_=r.font,v=r.lines,y=r.height,b=r.lineHeight,x=a,S=c;u===`alphabetic`&&(u=`bottom`);var C=0;u===`middle`?C+=-y/2:u===`bottom`?C+=-y:u===`top`||u===`hanging`?C+=0:u===`ideographic`&&(C+=-y);var w=t.glyphManager.getAtlas(),T=t.buildTextBuffers({object:e,lines:v,fontStack:_,lineHeight:d*b,offsetX:d*x,offsetY:d*(C+S),letterSpacing:d*s,glyphAtlas:w,indicesOffset:g}),E=T.indicesOffset,D=T.indexBuffer,O=T.charUVOffsetBuffer,k=T.charPositionsBuffer,A=T.charPackedBuffer;g=E;var j=h.length;h.push.apply(h,l(A));var ee=h.length;t.packedBufferObjectMap.set(e,[j,ee]),m.push.apply(m,l(O)),p.push.apply(p,l(k)),f.push.apply(f,l(D))}),this.geometry.vertexCount=f.length,this.geometry.setIndexBuffer(new Uint32Array(f)),this.geometry.setVertexBuffer({bufferIndex:Bl.INSTANCED,byteStride:128,stepMode:H.VERTEX,attributes:[{format:J.F32_RGBA,bufferByteOffset:0,location:$.MODEL_MATRIX0},{format:J.F32_RGBA,bufferByteOffset:16,location:$.MODEL_MATRIX1},{format:J.F32_RGBA,bufferByteOffset:32,location:$.MODEL_MATRIX2},{format:J.F32_RGBA,bufferByteOffset:48,location:$.MODEL_MATRIX3},{format:J.F32_RGBA,bufferByteOffset:64,location:$.PACKED_COLOR},{format:J.F32_RGBA,bufferByteOffset:80,location:$.PACKED_STYLE1},{format:J.F32_RGBA,bufferByteOffset:96,location:$.PACKED_STYLE2},{format:J.F32_RGBA,bufferByteOffset:112,location:$.PICKING_COLOR}],data:new Float32Array(h)}),this.geometry.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:12,stepMode:H.VERTEX,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.POSITION}],data:new Float32Array(p)}),this.geometry.setVertexBuffer({bufferIndex:Bl.TEX,byteStride:16,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:Vl.TEX},{format:J.F32_RG,bufferByteOffset:8,location:Vl.OFFSET}],data:new Float32Array(m)})}},{key:`createMaterial`,value:function(e){this.material.vertexShader=Cl,this.material.fragmentShader=Sl,this.material.cullMode=Vn.BACK,this.material.defines=i(i({},this.material.defines),xc(Vl));var t=this.instance.parsedStyle,n=t.fontSize,a=n===void 0?16:n,o=t.fontFamily,s=o===void 0?`sans-serif`:o,c=t.fontWeight,l=c===void 0?`normal`:c,u=t.fontStyle,d=u===void 0?`normal`:u,f=t.metrics.font,p=e.map(function(e){return e.parsedStyle.text}).join(``);this.glyphManager.generateAtlas(this.texturePool.context.config.offscreenCanvas,f,s,l.toString(),d,p,this.context.device);var m=this.glyphManager.getAtlasTexture(),h=this.glyphManager.getAtlas();this.context.device.setResourceName(m,`TextSDF Texture`);var g=h.image,_=g.width,v=g.height;this.material.setUniforms(r(r(r(r(r(r({},Hl.SDF_MAP,m),Hl.SDF_MAP_SIZE,[_,v]),Hl.FONT_SIZE,a),Hl.GAMMA_SCALE,1),Hl.STROKE_BLUR,.2),Hl.HAS_STROKE,this.index))}},{key:`changeRenderOrder`,value:function(e,t){for(var n=this.geometry.vertices[Bl.INSTANCED],r=this.geometry.inputLayoutDescriptor.vertexBufferDescriptors[Bl.INSTANCED].arrayStride/4,i=this.packedBufferObjectMap.get(e),o=a(i,2),s=o[0],c=o[1],l=n.slice(s,c),u=0;u<c-s;u+=r)l[u+r-1]=t*hc;this.geometry.updateVertexBuffer(Bl.INSTANCED,$.MODEL_MATRIX0,s/r,new Uint8Array(l.buffer))}},{key:`updateAttribute`,value:function(e,n,r,i){var o=this;if(e.length!==0){if(ue(t,`updateAttribute`,this,3)([e,n,r,i]),r===`text`||r===`fontFamily`||r===`fontSize`||r===`fontWeight`||r===`fontStyle`||r===`fontVariant`||r===`textBaseline`||r===`letterSpacing`||r===`wordWrapWidth`||r===`lineHeight`||r===`wordWrap`||r===`textAlign`||r===`x`||r===`y`||r===`dx`||r===`dy`)this.material.programDirty=!0,this.material.geometryDirty=!0,this.material.textureDirty=!0;else if(r===`modelMatrix`||r===`fill`||r===`fillOpacity`||r===`stroke`||r===`strokeOpacity`||r===`opacity`||r===`lineWidth`||r===`visibility`||r===`pointerEvents`||r===`isBillboard`||r===`billboardRotation`||r===`isSizeAttenuation`){var s=this.geometry.vertices[Bl.INSTANCED],c=this.geometry.inputLayoutDescriptor.vertexBufferDescriptors[Bl.INSTANCED].arrayStride/4;e.forEach(function(e){var t=e.parsedStyle,n=t.fill,r=t.stroke,i=t.opacity,l=i===void 0?1:i,u=t.fillOpacity,d=u===void 0?1:u,f=t.strokeOpacity,p=f===void 0?1:f,m=t.lineWidth,h=m===void 0?1:m,g=t.visibility,_=t.isBillboard,y=t.billboardRotation,b=t.isSizeAttenuation,x=[0,0,0,0];j(n)&&(x=[Number(n.r),Number(n.g),Number(n.b),Number(n.alpha)*255]);var S=[0,0,0,0];j(r)&&(S=[Number(r.r),Number(r.g),Number(r.b),Number(r.alpha)*255]);for(var C=e.isInteractive()&&e.renderable3D?.encodedPickingColor||[0,0,0],w=v(o.tmpMat4,e.getWorldTransform()),T=o.packedBufferObjectMap.get(e),E=a(T,2),D=E[0],O=E[1],k=s.slice(D,O),A=0;A<O-D;A+=c)k[A+0]=w[0],k[A+1]=w[1],k[A+2]=w[2],k[A+3]=w[3],k[A+4]=w[4],k[A+5]=w[5],k[A+6]=w[6],k[A+7]=w[7],k[A+8]=w[8],k[A+9]=w[9],k[A+10]=w[10],k[A+11]=w[11],k[A+12]=w[12],k[A+13]=w[13],k[A+14]=w[14],k[A+15]=w[15],k[A+16]=wc(x[0],x[1]),k[A+17]=wc(x[2],x[3]),k[A+18]=wc(S[0],S[1]),k[A+19]=wc(S[2],S[3]),k[A+20]=l,k[A+21]=d,k[A+22]=p,k[A+23]=h,k[A+24]=g===`hidden`?0:1,k[A+25]=+!!_,k[A+26]=+!!b,k[A+27]=y??0,k[A+28]=C[0],k[A+29]=C[1],k[A+30]=C[2];o.geometry.updateVertexBuffer(Bl.INSTANCED,$.MODEL_MATRIX0,D/c,new Uint8Array(k.buffer))})}}}},{key:`buildTextBuffers`,value:function(e){var t=e.object,n=e.lines,r=e.fontStack,i=e.lineHeight,a=e.letterSpacing,o=e.offsetX,s=e.offsetY,c=e.glyphAtlas,u=e.indicesOffset,d=t.parsedStyle,f=d.textAlign,p=f===void 0?`start`:f,m=d.fill,h=d.stroke,g=d.opacity,_=g===void 0?1:g,y=d.fillOpacity,b=y===void 0?1:y,x=d.strokeOpacity,S=x===void 0?1:x,C=d.lineWidth,w=C===void 0?1:C,T=d.visibility,E=d.isBillboard,D=d.billboardRotation,O=d.isSizeAttenuation,k=d.x,A=k===void 0?0:k,ee=d.y,M=ee===void 0?0:ee,te=d.z,ne=te===void 0?0:te,re=[0,0,0,0];j(m)&&(re=[Number(m.r),Number(m.g),Number(m.b),Number(m.alpha)*255]);var ie=[0,0,0,0];j(h)&&(ie=[Number(h.r),Number(h.g),Number(h.b),Number(h.alpha)*255]);var ae=t.isInteractive()&&t.renderable3D?.encodedPickingColor||[0,0,0],N=v(this.tmpMat4,t.getWorldTransform()),oe=[],P=[],se=[],ce=[],F=u;return zl(this.glyphManager.layout(n,r,i,p,a,o,s),c.positions).forEach(function(e){var n=[];n.push.apply(n,l(N));var r=[].concat(n,[wc(re[0],re[1]),wc(re[2],re[3]),wc(ie[0],ie[1]),wc(ie[2],ie[3]),_,b,S,w,T===`hidden`?0:1,+!!E,+!!O,D??0],l(ae),[t.sortable.renderOrder*hc]);oe.push.apply(oe,l(r).concat(l(r),l(r),l(r))),P.push(e.tex.x,e.tex.y,e.tl.x,e.tl.y),P.push(e.tex.x+e.tex.w,e.tex.y,e.tr.x,e.tr.y),P.push(e.tex.x+e.tex.w,e.tex.y+e.tex.h,e.br.x,e.br.y),P.push(e.tex.x,e.tex.y+e.tex.h,e.bl.x,e.bl.y),se.push(A,M,ne,A,M,ne,A,M,ne,A,M,ne),ce.push(0+F,2+F,1+F),ce.push(2+F,0+F,3+F),F+=4}),{indexBuffer:ce,charUVOffsetBuffer:P,charPositionsBuffer:se,charPackedBuffer:oe,indicesOffset:F}}},{key:`destroy`,value:function(){ue(t,`destroy`,this,3)([]),this.glyphManager.destroy()}}])}(Dc),Wl=function(e){function t(){var e;s(this,t);var n=[...arguments];return e=d(this,t,[].concat(n)),e.mergeXYZIntoModelMatrix=!1,e}return p(t,e),c(t,[{key:`shouldMerge`,value:function(e,n){return!(!ue(t,`shouldMerge`,this,3)([e,n])||this.instance.nodeName===I.MESH&&(this.instance.parsedStyle.material!==e.parsedStyle.material||this.instance.parsedStyle.geometry!==e.parsedStyle.geometry))}},{key:`updateAttribute`,value:function(e,n,r,i){e.length!==0&&(ue(t,`updateAttribute`,this,3)([e,n,r,i]),this.updateBatchedAttribute(e,n,r,i))}},{key:`createMaterial`,value:function(e){var t=this.instance.parsedStyle.material;this.material=t,this.observeMaterialChanged()}},{key:`createGeometry`,value:function(e){var n=this.instance.parsedStyle.geometry;this.geometry=n,ue(t,`createGeometry`,this,3)([e]),this.geometry.build(e),this.observeGeometryChanged()}}])}(Dc),Gl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(e){var t=[],n=e.parsedStyle.fill;return n&&!n.isNone&&t.push(Nc),this.needDrawStrokeSeparately(e)&&t.push(el),t}},{key:`needDrawStrokeSeparately`,value:function(e){var t=e.parsedStyle,n=t.fill,r=t.stroke,i=t.lineDash,a=t.lineWidth,o=t.strokeOpacity,s=n&&!n.isNone,c=r&&!r.isNone,l=i&&i.length&&i.every(function(e){return e!==0});return!s||c&&a>0&&(o<1||l)}}])}(gc),Kl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(e){var t=e.parsedStyle,n=t.fill,r=t.stroke,i=t.opacity,a=t.strokeOpacity,o=t.lineWidth,s=r&&!r.isNone,c=el.calcSubpathNum(e),l=[];if(!(e.nodeName===I.POLYLINE||n!=null&&n.isNone))for(var u=0;u<c;u++)l.push(dl);for(var d=0;d<c;d++)a!==0&&i!==0&&o!==0&&s&&(gl.isLine(e,d)?l.push(gl):l.push(el));return l}}])}(gc),ql=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(){return[xl]}}])}(gc),Jl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(e){var t=[],n=e.parsedStyle,r=n.stroke,i=n.lineWidth,a=i===void 0?1:i;return r&&!r.isNone&&a&&t.push(Ul),t.push(Ul),t}},{key:`beforeUploadUBO`,value:function(e,t){var n=t.instance.renderable3D.drawcalls.length;t.material.setUniforms(r({},Hl.HAS_STROKE,n===1?0:1-t.index))}}])}(gc),Yl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(){return[gl]}}])}(gc),Xl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(){return[Wl]}}])}(gc),Zl=function(e){function t(){return s(this,t),d(this,t,arguments)}return p(t,e),c(t,[{key:`getDrawcallCtors`,value:function(e){var t=[],n=e.parsedStyle,r=n.fill,i=n.radius,a=i&&i.length&&i.some(function(e){return e!==i[0]});return r!=null&&r.isNone||a||t.push(Nc),a&&t.push(dl),(a||this.needDrawStrokeSeparately(e))&&t.push(el),t}},{key:`needDrawStrokeSeparately`,value:function(e){var t=e.parsedStyle,n=t.fill,r=t.stroke,i=t.lineDash,a=t.lineWidth,o=t.strokeOpacity,s=n&&!n.isNone,c=r&&!r.isNone,l=i&&i.length&&i.every(function(e){return e!==0});return!s||c&&a>0&&(o<1||l)}}])}(gc),Ql=1,$l=function(){function e(t,n,r,i){s(this,e),this.drawcalls=[],this.pendingUpdatePatches={},this.stencilRefCache={},this.renderHelper=t,this.rendererFactory=n,this.texturePool=r,this.lightPool=i}return c(e,[{key:`destroy`,value:function(){this.drawcalls.forEach(function(e){e.destroy()}),this.drawcalls=[],this.pendingUpdatePatches={}}},{key:`render`,value:function(e){var t=this,n=arguments.length>1&&arguments[1]!==void 0&&arguments[1];n||this.updatePendingPatches(),this.drawcalls.forEach(function(r){r.init();var i=r.objects;r.clipPathTarget&&(i=[r.clipPath]);var a=t.renderHelper.renderInstManager.newRenderInst();a.setAllowSkippingIfPipelineNotReady(!1),r.applyRenderInst(a,i),t.renderHelper.renderInstManager.submitRenderInst(a,e),n||r.objects.forEach(function(e){e.renderable.dirty=!1})})}},{key:`attach`,value:function(e){this.context=e}},{key:`add`,value:function(e){var t=this,n=e.renderable3D;if(n&&!n.drawcalls.length){var r=this.rendererFactory[e.nodeName];r&&r.getDrawcallCtors(e).forEach(function(i,a,o){var s=t.drawcalls.find(function(t){return i===t.constructor&&t.index===a&&t.objects.length<t.maxInstances&&t.shouldMerge(e,a)});(!s||s.key!==e.parsedStyle.batchKey)&&(s=new i(t.renderHelper,t.texturePool,t.lightPool,e,o,a,t.context),s.renderer=r,t.drawcalls.push(s),e.parsedStyle.batchKey&&(s.key=e.parsedStyle.batchKey)),s&&(s.objects.push(e),n.drawcalls[a]=s,s.geometryDirty=!0)})}}},{key:`remove`,value:function(e){var t=this,n=e.renderable3D;n&&(n.drawcalls.forEach(function(n){if(n){var r=n.objects.indexOf(e);r>-1&&(n.objects.splice(r,1),n.geometryDirty=!0),n.objects.length===0&&t.drawcalls.splice(t.drawcalls.indexOf(n),1).forEach(function(e){e.destroy()})}}),n.drawcalls=[])}},{key:`updateAttribute`,value:function(e,t,n){var r=this,i=arguments.length>3&&arguments[3]!==void 0&&arguments[3],a=e.renderable3D,o=this.rendererFactory[e.nodeName];if(o){var s=o.getDrawcallCtors(e);if(s.forEach(function(s,c,l){var u=a.drawcalls.find(function(e){return e&&e.index===c&&e.constructor===s});if(u||(u=a.drawcalls[c],u&&(u.objects.splice(u.objects.indexOf(e),1),u.geometryDirty=!0,u.objects.length===0&&r.drawcalls.splice(r.drawcalls.indexOf(u),1),a.drawcalls[a.drawcalls.indexOf(u)]=void 0),u=r.drawcalls.find(function(t){return s===t.constructor&&t.index===c&&t.objects.length<t.maxInstances&&t.shouldMerge(e,c)}),u?u.geometryDirty=!0:(u=new s(r.renderHelper,r.texturePool,r.lightPool,e,l,c,r.context),u.renderer=o,u.init(),r.drawcalls.push(u)),u.objects.push(e),a.drawcalls[c]=u),u.inited&&!u.geometryDirty){if(u.shouldMerge(e,c)){var d=u.objects.indexOf(e);if(i)e.parsedStyle[t]=n,u.updateAttribute([e],d,t,n);else{var f=u.id+t;r.pendingUpdatePatches[f]||(r.pendingUpdatePatches[f]={instance:u,objectIndices:[],name:t,value:n}),r.pendingUpdatePatches[f].objectIndices.indexOf(d)===-1&&r.pendingUpdatePatches[f].objectIndices.push(d)}}else r.remove(e),r.add(e)}else r.remove(e),r.add(e)}),a.drawcalls.length>s.length)for(var c=a.drawcalls.length-1;c>=s.length;c--){var l=a.drawcalls[c];l.objects.splice(l.objects.indexOf(e),1),l.geometryDirty=!0,l.objects.length===0&&this.drawcalls.splice(this.drawcalls.indexOf(l),1),a.drawcalls.pop()}}}},{key:`changeRenderOrder`,value:function(e,t){var n=e.renderable3D;n&&n.drawcalls.length&&n.drawcalls.forEach(function(n){n&&n.inited&&!n.geometryDirty&&n.inited&&n.changeRenderOrder(e,t)})}},{key:`getStencilRef`,value:function(e){return this.stencilRefCache[e.entity]||(this.stencilRefCache[e.entity]=Ql++),this.stencilRefCache[e.entity]}},{key:`updatePendingPatches`,value:function(){var e=this;Object.keys(this.pendingUpdatePatches).forEach(function(t){var n=e.pendingUpdatePatches[t],r=n.instance,i=n.objectIndices,a=n.name,o=n.value;i.sort(function(e,t){return e-t});var s=[];i.forEach(function(e){var t=s[s.length-1];!t||e!==t[t.length-1]+1?s.push([e]):t.push(e)}),s.forEach(function(e){r.updateAttribute(r.objects.slice(e[0],e[0]+e.length),e[0],a,o)})}),this.pendingUpdatePatches={}}}])}(),eu=function(){function e(t,n){s(this,e),this.textureCache={},this.context=t,this.runtime=n}return c(e,[{key:`getOrCreateTexture`,value:function(e,t,n,r){var a=this,o=typeof t==`string`?t:t.src||``,s;if(!o||!this.textureCache[o]){if(s=e.createTexture(i({format:J.U8_RGBA_NORM,width:1,height:1,depthOrArrayLayers:1,mipLevelCount:1,dimension:U.TEXTURE_2D,usage:Xn.SAMPLED,pixelStore:{unpackFlipY:!1}},n)),o&&(this.textureCache[o]=s),!ke(t))s.setImageData([t]),s.emit(Yn.LOADED),this.context.renderingService.dirty();else{var c=this.context.config.createImage();c&&(c.onload=function(){var e=function(e){a.textureCache[o].setImageData([e]),a.textureCache[o].emit(Yn.LOADED),a.context.renderingService.dirty(),r&&r(a.textureCache[o],e)};a.runtime.globalThis.createImageBitmap?a.runtime.globalThis.createImageBitmap(c).then(function(t){return e(t)}).catch(function(){e(c)}):e(c)},c.onerror=function(){},c.crossOrigin=`Anonymous`,c.src=t)}}else s=this.textureCache[o],s.emit(Yn.LOADED);return s}},{key:`getOrCreateCanvas`,value:function(){return this.runtime.offscreenCanvasCreator.getOrCreateCanvas(this.context.config.offscreenCanvas)}},{key:`getOrCreateGradient`,value:function(e){var t=e.instance,n=e.gradients,r=t.getGeometryBounds().halfExtents,a=r[0]*2||1,o=r[1]*2||1,s=this.context.config.offscreenCanvas,c=this.runtime.offscreenCanvasCreator.getOrCreateCanvas(s),l=this.runtime.offscreenCanvasCreator.getOrCreateContext(s);c.width=a,c.height=o;var u=this.context.imagePool;n.forEach(function(e){l.fillStyle=u.getOrCreateGradient(i(i({type:e.type},e.value),{},{width:a,height:o,min:[0,0]}),l),l.fillRect(0,0,a,o)})}},{key:`getOrCreatePattern`,value:function(e,t,n){var r=e.image,i=e.repetition,a=e.transform,o=t.getGeometryBounds().halfExtents,s=o[0]*2||1,c=o[1]*2||1,l=this.context.config.offscreenCanvas,u=this.runtime.offscreenCanvasCreator.getOrCreateCanvas(l),d=this.runtime.offscreenCanvasCreator.getOrCreateContext(l);u.width=s,u.height=c;var f=ke(r)?this.context.imagePool.getImageSync(r,t,n)?.img:r,p=f&&d.createPattern(f,i);if(a){var m=L(ye(a),new x({}));p.setTransform({a:m[0],b:m[1],c:m[4],d:m[5],e:m[12],f:m[13]})}d.fillStyle=p,d.fillRect(0,0,s,c)}},{key:`destroy`,value:function(){for(var e in this.textureCache)this.textureCache[e].destroy();this.textureCache={}}}])}(),tu=function(e){function t(){var e,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return s(this,t),e=d(this,t),e.name=`device-renderer`,e.parameters={toneMapping:bs.NONE,toneMappingExposure:1},e.options=n,e}return p(t,e),c(t,[{key:`init`,value:function(e){var t;e.geometryUpdaterFactory[I.MESH]=new ts;var n=new zs(this.parameters),i=new Qo,a=new eu(this.context,e),o=new ns,s=new Gl,c=new Kl,l=new $l(n,(t={},r(r(r(r(r(r(r(r(r(r(t,I.CIRCLE,s),I.ELLIPSE,s),I.POLYLINE,c),I.PATH,c),I.POLYGON,c),I.RECT,new Zl),I.IMAGE,new ql),I.LINE,new Yl),I.TEXT,new Jl),I.MESH,new Xl),r(r(t,I.GROUP,void 0),I.HTML,void 0)),a,i),u=new fc(n,i,a,l,this.options);this.addRenderingPlugin(u),this.addRenderingPlugin(new mc(n,u,o,l))}},{key:`destroy`,value:function(e){delete e.geometryUpdaterFactory[I.MESH]}},{key:`getRenderGraphPlugin`,value:function(){return this.plugins[0]}},{key:`getDevice`,value:function(){return this.getRenderGraphPlugin().getDevice()}},{key:`getSwapChain`,value:function(){return this.getRenderGraphPlugin().getSwapChain()}},{key:`loadTexture`,value:function(e,t,n){return this.getRenderGraphPlugin().loadTexture(e,t,n)}},{key:`toDataURL`,value:function(e){return this.getRenderGraphPlugin().toDataURL(e)}},{key:`setParameters`,value:function(e){this.parameters=i(i({},this.parameters),e)}}])}(xe),nu=function(e){function t(e){var n,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),n=d(this,t,[e,r]),n.flipYMatrix=P(N(),M(1,-1,1)),n.topology=n.createTopology(),n}return p(t,e),c(t,[{key:`applyMa4Position`,value:function(e,t){for(var n=Te(),r=0;r<t.byteLength/4;r+=3)n[0]=t[r],n[1]=t[r+1],n[2]=t[r+2],n[3]=1,ae(n,n,e),t[r]=n[0],t[r+1]=n[1],t[r+2]=n[2];this.updateVertexBuffer(Q.POSITION,$.POSITION,0,new Uint8Array(t.buffer))}},{key:`applyMa4Normal`,value:function(e,t){var n=Te(),r=v(N(),e);O(r,r),de(r,r);for(var i=0;i<t.byteLength/4;i+=3)n[0]=t[i],n[1]=t[i+1],n[2]=t[i+2],n[3]=1,ae(n,n,r),t[i]=n[0],t[i+1]=n[1],t[i+2]=n[2];this.updateVertexBuffer(Q.NORMAL,$.NORMAL,0,new Uint8Array(t.buffer))}},{key:`rebuildPosition`,value:function(){this.topology=this.createTopology();var e=Float32Array.from(this.topology.positions);this.applyMa4Position(this.flipYMatrix,e),this.dirty=!0}},{key:`applyMat4`,value:function(e){this.applyMa4Position(e,this.vertices[Q.POSITION]),this.applyMa4Normal(e,this.vertices[Q.NORMAL])}},{key:`computeBoundingBox`,value:function(){for(var e=this.topology.positions,t=-1/0,n=-1/0,r=-1/0,i=1/0,a=1/0,o=1/0,s=0;s<e.length;s+=3){var c=e[s],l=e[s+1],u=e[s+2];t=Math.max(t,c),n=Math.max(n,l),r=Math.max(r,u),i=Math.min(i,c),a=Math.min(a,l),o=Math.min(o,u)}var d=new Se;return d.setMinMax([i,a,o],[t,n,r]),d}},{key:`build`,value:function(){var e=this.topology,t=e.indices,n=e.positions,r=e.normals,i=e.uvs;this.setIndexBuffer(new Uint32Array(t)),this.vertexCount=t.length,this.setVertexBuffer({bufferIndex:Q.POSITION,byteStride:12,stepMode:H.VERTEX,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.POSITION}],data:Float32Array.from(n)}),this.setVertexBuffer({bufferIndex:Q.NORMAL,byteStride:12,stepMode:H.VERTEX,attributes:[{format:J.F32_RGB,bufferByteOffset:0,location:$.NORMAL}],data:Float32Array.from(r)}),this.setVertexBuffer({bufferIndex:Q.UV,byteStride:8,stepMode:H.VERTEX,attributes:[{format:J.F32_RG,bufferByteOffset:0,location:$.UV}],data:Float32Array.from(i)}),this.applyMat4(this.flipYMatrix),this.dirty=!0}}])}(nc),ru=4/64,iu=1-ru*2;function au(e,t,n,r,i,a){var o,s,c,l,u,d,f,p=ge(),m=ge(),h=ge(),g,v,y,b=[],x=[],S=[],C=[],w=[],T,E,D,O,k,A,j,ne,ie,ae,N;if(n>0)for(o=0;o<=r;o++)for(s=0;s<=i;s++){T=s/i*2*Math.PI-Math.PI,D=Math.sin(T),E=Math.cos(T),v=M(D*e,-n/2,E*e),g=M(D*t,n/2,E*t),te(p,v,g,o/r),re(m,ee(m,g,v)),y=M(E,0,-D),re(h,_(h,y,m)),b.push(p[0],p[1],p[2]),x.push(h[0],h[1],h[2]),d=s/i,f=o/r,S.push(d,1-f);var oe=f;f=d,d=oe,d/=3,d=d*iu+ru,f=f*iu+ru,C.push(d,1-f),o<r&&s<i&&(j=o*(i+1)+s,ne=o*(i+1)+(s+1),ie=(o+1)*(i+1)+s,ae=(o+1)*(i+1)+(s+1),w.push(j,ne,ie),w.push(ne,ae,ie))}if(a){var P,se,ce=Math.floor(i/2),F=i,le=n/2;for(P=0;P<=ce;P++)for(T=P*Math.PI*.5/ce,D=Math.sin(T),E=Math.cos(T),se=0;se<=F;se++)O=se*2*Math.PI/F-Math.PI/2,k=Math.sin(O),A=Math.cos(O),c=A*D,l=E,u=k*D,d=1-se/F,f=1-P/ce,b.push(c*t,l*t+le,u*t),x.push(c,l,u),S.push(d,1-f),d/=3,f/=3,d=d*iu+ru,f=f*iu+ru,d+=1/3,C.push(d,1-f);for(N=(r+1)*(i+1),P=0;P<ce;++P)for(se=0;se<F;++se)j=P*(F+1)+se,ne=j+F+1,w.push(N+j+1,N+ne,N+j),w.push(N+j+1,N+ne+1,N+ne);for(P=0;P<=ce;P++)for(T=Math.PI*.5+P*Math.PI*.5/ce,D=Math.sin(T),E=Math.cos(T),se=0;se<=F;se++)O=se*2*Math.PI/F-Math.PI/2,k=Math.sin(O),A=Math.cos(O),c=A*D,l=E,u=k*D,d=1-se/F,f=1-P/ce,b.push(c*t,l*t-le,u*t),x.push(c,l,u),S.push(d,1-f),d/=3,f/=3,d=d*iu+ru,f=f*iu+ru,d+=2/3,C.push(d,1-f);for(N=(r+1)*(i+1)+(F+1)*(ce+1),P=0;P<ce;++P)for(se=0;se<F;++se)j=P*(F+1)+se,ne=j+F+1,w.push(N+j+1,N+ne,N+j),w.push(N+j+1,N+ne+1,N+ne)}else{if(N=(r+1)*(i+1),e>0)for(o=0;o<i;o++)T=o/i*2*Math.PI,c=Math.sin(T),l=-n/2,u=Math.cos(T),d=1-(c+1)/2,f=(u+1)/2,b.push(c*e,l,u*e),x.push(0,-1,0),S.push(d,1-f),d/=3,f/=3,d=d*iu+ru,f=f*iu+ru,d+=1/3,C.push(d,1-f),o>1&&w.push(N,N+o,N+o-1);if(N+=i,t>0)for(o=0;o<i;o++)T=o/i*2*Math.PI,c=Math.sin(T),l=n/2,u=Math.cos(T),d=1-(c+1)/2,f=(u+1)/2,b.push(c*t,l,u*t),x.push(0,1,0),S.push(d,1-f),d/=3,f/=3,d=d*iu+ru,f=f*iu+ru,d+=2/3,C.push(d,1-f),o>1&&w.push(N,N+o-1,N+o)}return{positions:b,normals:x,uvs:S,uvs1:C,indices:w}}var ou=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({width:1,height:1,depth:1,widthSegments:1,heightSegments:1,depthSegments:1},n)])}return p(t,e),c(t,[{key:`width`,get:function(){return this.props.width},set:function(e){this.props.width!==e&&(this.props.width=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`depth`,get:function(){return this.props.depth},set:function(e){this.props.depth!==e&&(this.props.depth=e,this.rebuildPosition())}},{key:`widthSegments`,get:function(){return this.props.widthSegments},set:function(e){this.props.widthSegments!==e&&(this.props.widthSegments=e,this.build())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`depthSegments`,get:function(){return this.props.depthSegments},set:function(e){this.props.depthSegments!==e&&(this.props.depthSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.widthSegments,n=t===void 0?1:t,r=e.heightSegments,i=r===void 0?1:r,a=e.depthSegments,o=a===void 0?1:a,s=e.height,c=s===void 0?1:s,l=e.width,u=l===void 0?1:l,d=e.depth,f=d===void 0?1:d,p=n,m=i,h=o,g=u/2,_=c/2,v=f/2,y=[M(-g,-_,v),M(g,-_,v),M(g,_,v),M(-g,_,v),M(g,-_,-v),M(-g,-_,-v),M(-g,_,-v),M(g,_,-v)],b=[[0,1,3],[4,5,7],[3,2,6],[1,0,4],[1,4,2],[5,0,6]],x=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]],C={FRONT:0,BACK:1,TOP:2,BOTTOM:3,RIGHT:4,LEFT:5},w=[],T=[],E=[],D=[],O=[],k=0,A=function(e,t,n){for(var r,i,a=0,o;a<=t;a++)for(o=0;o<=n;o++){var s=ge(),c=ge(),l=ge(),u=ge();te(s,y[b[e][0]],y[b[e][1]],a/t),te(c,y[b[e][0]],y[b[e][2]],o/n),ee(l,c,y[b[e][0]]),S(u,s,l),r=a/t,i=o/n,w.push(u[0],u[1],u[2]),T.push(x[e][0],x[e][1],x[e][2]),E.push(r,1-i),r/=3,i/=3,r=r*iu+ru,i=i*iu+ru,r+=e%3/3,i+=Math.floor(e/3)/3,D.push(r,1-i),a<t&&o<n&&(O.push(k+n+1,k+1,k),O.push(k+n+1,k+n+2,k+1)),k++}};return A(C.FRONT,p,m),A(C.BACK,p,m),A(C.TOP,p,h),A(C.BOTTOM,p,h),A(C.RIGHT,h,m),A(C.LEFT,h,m),{indices:O,positions:w,normals:T,uvs:E,uv1s:D}}}])}(nu),su=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({radius:.5,latitudeBands:16,longitudeBands:16},n)])}return p(t,e),c(t,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.build())}},{key:`latitudeBands`,get:function(){return this.props.latitudeBands},set:function(e){this.props.latitudeBands!==e&&(this.props.latitudeBands=e,this.build())}},{key:`longitudeBands`,get:function(){return this.props.longitudeBands},set:function(e){this.props.longitudeBands!==e&&(this.props.longitudeBands=e,this.build())}},{key:`createTopology`,value:function(){var e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h=this.props,g=h.radius,_=g===void 0?.5:g,v=h.latitudeBands,y=v===void 0?16:v,b=h.longitudeBands,x=b===void 0?16:b,S=[],C=[],w=[],T=[];for(t=0;t<=y;t++)for(n=t*Math.PI/y,r=Math.sin(n),i=Math.cos(n),e=0;e<=x;e++)a=e*2*Math.PI/x-Math.PI/2,o=Math.sin(a),s=Math.cos(a),u=s*r,d=i,f=o*r,p=1-e/x,m=1-t/y,S.push(u*_,d*_,f*_),C.push(u,d,f),w.push(p,1-m);for(t=0;t<y;++t)for(e=0;e<x;++e)c=t*(x+1)+e,l=c+x+1,T.push(c+1,l,c),T.push(c+1,l+1,l);return{indices:T,positions:S,normals:C,uvs:w,uv1s:w}}}])}(nu),cu=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({tubeRadius:.2,ringRadius:.3,segments:30,sides:20},n)])}return p(t,e),c(t,[{key:`tubeRadius`,get:function(){return this.props.tubeRadius},set:function(e){this.props.tubeRadius!==e&&(this.props.tubeRadius=e,this.build())}},{key:`ringRadius`,get:function(){return this.props.ringRadius},set:function(e){this.props.ringRadius!==e&&(this.props.ringRadius=e,this.build())}},{key:`segments`,get:function(){return this.props.segments},set:function(e){this.props.segments!==e&&(this.props.segments=e,this.build())}},{key:`sides`,get:function(){return this.props.sides},set:function(e){this.props.sides!==e&&(this.props.sides=e,this.build())}},{key:`createTopology`,value:function(){var e,t,n,r,i,a,o,s,c,l,u=this.props,d=u.tubeRadius,f=d===void 0?.2:d,p=u.ringRadius,m=p===void 0?.3:p,h=u.segments,g=h===void 0?30:h,_=u.sides,v=_===void 0?20:_,y=f,b=m,x=[],S=[],C=[],w=[];for(c=0;c<=v;c++)for(l=0;l<=g;l++)if(e=Math.cos(2*Math.PI*l/g)*(b+y*Math.cos(2*Math.PI*c/v)),t=Math.sin(2*Math.PI*c/v)*y,n=Math.sin(2*Math.PI*l/g)*(b+y*Math.cos(2*Math.PI*c/v)),r=Math.cos(2*Math.PI*l/g)*Math.cos(2*Math.PI*c/v),i=Math.sin(2*Math.PI*c/v),a=Math.sin(2*Math.PI*l/g)*Math.cos(2*Math.PI*c/v),o=c/v,s=1-l/g,x.push(e,t,n),S.push(r,i,a),C.push(o,1-s),c<v&&l<g){var T=c*(g+1)+l,E=(c+1)*(g+1)+l,D=c*(g+1)+(l+1),O=(c+1)*(g+1)+(l+1);w.push(T,E,D),w.push(E,O,D)}return{indices:w,positions:x,normals:S,uvs:C,uv1s:C}}}])}(nu),lu=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({width:1,depth:1,widthSegments:5,depthSegments:5},n)])}return p(t,e),c(t,[{key:`width`,get:function(){return this.props.width},set:function(e){this.props.width!==e&&(this.props.width=e,this.rebuildPosition())}},{key:`depth`,get:function(){return this.props.depth},set:function(e){this.props.depth!==e&&(this.props.depth=e,this.rebuildPosition())}},{key:`widthSegments`,get:function(){return this.props.widthSegments},set:function(e){this.props.widthSegments!==e&&(this.props.widthSegments=e,this.build())}},{key:`depthSegments`,get:function(){return this.props.depthSegments},set:function(e){this.props.depthSegments!==e&&(this.props.depthSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=[],t=[],n=[],r=[],i=this.props,a=i.widthSegments,o=a===void 0?5:a,s=i.depthSegments,c=s===void 0?5:s,l=i.width,u=l===void 0?1:l,d=i.depth,f=d===void 0?1:d,p={x:u/2,y:f/2},m=o,h=c,g,_,v,y,b,x,S,C=0;for(g=0;g<=m;g++)for(_=0;_<=h;_++)v=-p.x+2*p.x*g/m,y=0,b=-(-p.y+2*p.y*_/h),x=g/m,S=_/h,e.push(v,y,b),t.push(0,1,0),n.push(x,1-S),g<m&&_<h&&(r.push(C+h+1,C+1,C),r.push(C+h+1,C+h+2,C+1)),C++;return{indices:r,positions:e,normals:t,uvs:n,uv1s:n}}}])}(nu),uu=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({radius:.5,height:1,heightSegments:5,capSegments:20},n)])}return p(t,e),c(t,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`capSegments`,get:function(){return this.props.capSegments},set:function(e){this.props.capSegments!==e&&(this.props.capSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.radius,n=e.height,r=e.heightSegments,i=e.capSegments,a=au(t,t,n,r,i,!1);return{indices:a.indices,positions:a.positions,normals:a.normals,uvs:a.uvs,uv1s:a.uvs1}}}])}(nu),du=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({baseRadius:.5,peakRadius:0,height:1,heightSegments:5,capSegments:18},n)])}return p(t,e),c(t,[{key:`baseRadius`,get:function(){return this.props.baseRadius},set:function(e){this.props.baseRadius!==e&&(this.props.baseRadius=e,this.rebuildPosition())}},{key:`peakRadius`,get:function(){return this.props.peakRadius},set:function(e){this.props.peakRadius!==e&&(this.props.peakRadius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`capSegments`,get:function(){return this.props.capSegments},set:function(e){this.props.capSegments!==e&&(this.props.capSegments=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.baseRadius,n=e.peakRadius,r=e.height,i=e.heightSegments,a=e.capSegments,o=au(t,n,r,i,a,!1);return{indices:o.indices,positions:o.positions,normals:o.normals,uvs:o.uvs,uv1s:o.uvs1}}}])}(nu),fu=function(e){function t(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return s(this,t),d(this,t,[e,i({radius:.5,height:1,heightSegments:1,sides:20},n)])}return p(t,e),c(t,[{key:`radius`,get:function(){return this.props.radius},set:function(e){this.props.radius!==e&&(this.props.radius=e,this.rebuildPosition())}},{key:`height`,get:function(){return this.props.height},set:function(e){this.props.height!==e&&(this.props.height=e,this.rebuildPosition())}},{key:`heightSegments`,get:function(){return this.props.heightSegments},set:function(e){this.props.heightSegments!==e&&(this.props.heightSegments=e,this.build())}},{key:`sides`,get:function(){return this.props.sides},set:function(e){this.props.sides!==e&&(this.props.sides=e,this.build())}},{key:`createTopology`,value:function(){var e=this.props,t=e.radius,n=e.height,r=e.heightSegments,i=e.sides,a=au(t,t,n-2*t,r,i,!0);return{indices:a.indices,positions:a.positions,normals:a.normals,uvs:a.uvs,uv1s:a.uvs1}}}])}(nu),pu=[`style`],mu=function(e){function t(){var e,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=n.style,a=o(n,pu);return s(this,t),e=d(this,t,[i({style:i({fill:`black`},r)},a)]),e.define=`NUM_AMBIENT_LIGHTS`,e.order=-1,e}return p(t,e),c(t,[{key:`uploadUBO`,value:function(e,t){var n=this.parsedStyle.fill;if(j(n)){var r=[Number(n.r)/255,Number(n.g)/255,Number(n.b)/255];e.push({name:`u_AmbientLightColor`,value:r})}}}])}(Xs),hu=[`style`],gu=function(e){function t(){var e,n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=n.style,a=o(n,hu);return s(this,t),e=d(this,t,[i({style:i({direction:M(0,-1,0)},r)},a)]),e.define=`NUM_DIR_LIGHTS`,e.order=10,e}return p(t,e),c(t,[{key:`getUniformWordCount`,value:function(){return 8}},{key:`uploadUBO`,value:function(e,t){var n=this.parsedStyle,r=n.fill,i=n.direction,a=n.intensity;if(j(r)){var o=[Number(r.r)/255,Number(r.g)/255,Number(r.b)/255];e.push({name:`directionalLights[${t}].direction`,value:i}),e.push({name:`directionalLights[${t}].intensity`,value:a}),e.push({name:`directionalLights[${t}].color`,value:o})}}}])}(Xs);gu.PARSED_STYLE_LIST=new Set([].concat(l(Xs.PARSED_STYLE_LIST),[`direction`]));var _u=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec4 u_Placeholder;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

void main() {
  // WGSL will remove unused uniforms.
  float a = u_Placeholder.x;

  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  gl_Position = project(vec4(a_Position, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,vu=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec4 u_Placeholder;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;
    vec4 diffuseColor = outputColor;

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    reflectedLight.indirectDiffuse += vec3( 1.0 );
    reflectedLight.indirectDiffuse *= outputColor.rgb;

    vec3 outgoingLight = reflectedLight.indirectDiffuse;
    
    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,yu=function(e){return e.MAP=`u_Map`,e.PLACE_HOLDER=`u_Placeholder`,e}(yu||{}),bu=function(e){function t(e,n){var a;s(this,t),a=d(this,t,[e,i({vertexShader:_u,fragmentShader:vu,cullMode:Vn.BACK},n)]),a.defines=i(i({},a.defines),{},{USE_UV:!0,USE_MAP:!1,USE_WIREFRAME:!1,USE_FOG:!1,USE_LIGHT:!1});var o=n||{},c=o.map,l=o.wireframe;return c&&(a.map=c),a.wireframe=l,a.setUniforms(r({},yu.PLACE_HOLDER,[0,0,0,0])),a}return p(t,e),c(t,[{key:`map`,get:function(){return this.props.map},set:function(e){this.props.map!==e&&(this.props.map=e,this.programDirty=!0),this.setUniforms(r({},yu.MAP,e))}},{key:`aoMap`,get:function(){return this.props.aoMap},set:function(e){this.props.aoMap=e}}])}(yc),xu=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;
  float u_Shininess;
  vec3 u_Specular;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#if defined(USE_BUMPMAP) && defined(USE_LIGHT)
  uniform sampler2D u_BumpMap;

  // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
  // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

  // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

  vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( v_Uv );
    vec2 dSTdy = dFdy( v_Uv );

    float Hll = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv ).x;
    float dBx = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdx ).x - Hll;
    float dBy = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdy ).x - Hll;

    return vec2( dBx, dBy );
  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
    vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
    vec3 vN = surf_norm;		// normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
  }
#endif
#ifdef USE_SPECULARMAP
  uniform sampler2D u_SpecularMap;
#endif
vec3 BRDF_Lambert(vec3 diffuseColor) {
  return RECIPROCAL_PI * diffuseColor;
}

vec3 F_Schlick(
  vec3 f0,
  float f90,
  float dotVH
) {
  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float G_BlinnPhong_Implicit( /* float dotNL, float dotNV */ ) {
  // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
  return 0.25;
}

float D_BlinnPhong(
  float shininess,
  float dotNH
) {
  return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

vec3 BRDF_BlinnPhong(
  vec3 lightDir,
  vec3 viewDir,
  vec3 normal,
  vec3 specularColor,
  float shininess
) {
  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( specularColor, 1.0, dotVH );

  float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

  float D = D_BlinnPhong( shininess, dotNH );

  return F * ( G * D );
}

#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

#ifdef USE_LIGHT
  void getDirectionalLightInfo(
    DirectionalLight directionalLight, 
    GeometricContext geometry,
    out IncidentLight light
  ) {
    light.color = directionalLight.color * directionalLight.intensity;
    light.direction = normalize(directionalLight.direction);
    light.visible = true;
  }

  vec3 getAmbientLightIrradiance( vec3 ambientLightColor ) {
    vec3 irradiance = ambientLightColor;
    return irradiance;
  }
#endif
struct BlinnPhongMaterial {
  vec3 diffuseColor;
  vec3 specularColor;
  float specularShininess;
  float specularStrength;
};

void RE_Direct_BlinnPhong(
  IncidentLight directLight,
  GeometricContext geometry,
  BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

  reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}

void RE_IndirectDiffuse_BlinnPhong(
  vec3 irradiance,
  GeometricContext geometry,
  BlinnPhongMaterial material,
  inout ReflectedLight reflectedLight
) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

#define RE_Direct           RE_Direct_BlinnPhong
#define RE_IndirectDiffuse  RE_IndirectDiffuse_BlinnPhong

in vec3 v_ViewPosition;
in vec3 v_Normal;

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}

  // diffusemap
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif
  // specularmap
  float specularStrength = 1.0;

#ifdef USE_SPECULARMAP
  vec4 texelSpecular = texture(SAMPLER_2D(u_SpecularMap), v_Uv);
  specularStrength = texelSpecular.r;
#endif
  // bumpmap & normalmap
  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize(v_Normal);
#ifdef USE_DOUBLESIDE
  normal = normal * faceDirection;
#endif

// #ifdef USE_TANGENT
//   vec3 tangent = normalize( vTangent );
//   vec3 bitangent = normalize( vBitangent );

//   #ifdef DOUBLE_SIDED
//     tangent = tangent * faceDirection;
//     bitangent = bitangent * faceDirection;
//   #endif

// #if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

// mat3 vTBN = mat3( tangent, bitangent, normal );

// #endif
// #endif
  #ifdef OBJECTSPACE_NORMALMAP
  // normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

  // #ifdef FLIP_SIDED
  //   normal = - normal;
  // #endif

  // #ifdef DOUBLE_SIDED
  //   normal = normal * faceDirection;
  // #endif

  // normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
  // vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
  // mapN.xy *= normalScale;

  // #ifdef USE_TANGENT
  //   normal = normalize( vTBN * mapN );
  // #else
  //   normal = perturbNormal2Arb( - v_ViewPosition, normal, mapN, faceDirection );
  // #endif

#elif defined(USE_BUMPMAP) && defined(USE_LIGHT)
  normal = perturbNormalArb( - v_ViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;

    vec4 diffuseColor = outputColor;
    ReflectedLight reflectedLight = ReflectedLight(vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ));
    vec3 totalEmissiveRadiance = u_Emissive;

    // calculate lighting accumulation
    BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = u_Specular;
material.specularShininess = u_Shininess;
material.specularStrength = specularStrength;
    GeometricContext geometry;
geometry.position = - v_ViewPosition;
geometry.normal = normal;
geometry.viewDir = u_IsOrtho == 1.0 ? vec3(0, 0, 1) : normalize(v_ViewPosition);

IncidentLight directLight;
#if defined( NUM_DIR_LIGHTS ) && ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
  DirectionalLight directionalLight;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

    directionalLight = directionalLights[ i ];

    getDirectionalLightInfo( directionalLight, geometry, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometry, material, reflectedLight );
  }
  #pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )
  vec3 iblIrradiance = vec3(0.0);
  vec3 ambient = vec3(0.0);
  #ifdef NUM_AMBIENT_LIGHTS
    ambient = u_AmbientLightColor;
  #endif
  vec3 irradiance = getAmbientLightIrradiance(ambient);

  // irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
  // #if ( NUM_HEMI_LIGHTS > 0 )
  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
  //     irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
  //   }
  //   #pragma unroll_loop_end
  // #endif
#endif

#if defined( RE_IndirectSpecular )
  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );
#endif

    #if defined( RE_IndirectDiffuse )
  RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif

#if defined( RE_IndirectSpecular )
  RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif

    vec3 outgoingLight = reflectedLight.directDiffuse +
      reflectedLight.indirectDiffuse + 
      reflectedLight.directSpecular + 
      reflectedLight.indirectSpecular + 
      totalEmissiveRadiance;

    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,Su=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;
  float u_Shininess;
  vec3 u_Specular;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = NORMAL) in vec3 a_Normal;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

out vec3 v_ViewPosition;
out vec3 v_Normal;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  vec4 position = vec4(a_Position, 1.0);

  gl_Position = project(position, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  vec4 mvPosition = u_ViewMatrix * u_ModelMatrix * position;
  v_ViewPosition = - mvPosition.xyz;

  // v_ViewPosition = vec3(mvPosition) / mvPosition.w;

  mat3 normalWorld = mat3(transposeMat3(inverseMat3(mat3(u_ViewMatrix * u_ModelMatrix))));
  v_Normal = normalize(normalWorld * a_Normal);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,Cu=function(e){return e.EMISSIVE=`u_Emissive`,e.SHININESS=`u_Shininess`,e.SPECULAR=`u_Specular`,e.BUMP_SCALE=`u_BumpScale`,e.SPECULAR_MAP=`u_SpecularMap`,e.BUMP_MAP=`u_BumpMap`,e}(Cu||{}),wu=function(e){function t(e,n){var a;s(this,t),a=d(this,t,[e,i({vertexShader:Su,fragmentShader:xu,emissive:`black`,shininess:30,specular:`#111111`,bumpScale:1,doubleSide:!1},n)]);var o=a,c=o.specularMap,l=o.bumpMap,u=o.doubleSide,f=o.emissive,p=o.shininess,m=o.specular,g=h(f),_=h(m);return a.setUniforms(r(r(r({u_Placeholder:null},Cu.EMISSIVE,[Number(g.r)/255,Number(g.g)/255,Number(g.b)/255]),Cu.SHININESS,p),Cu.SPECULAR,[Number(_.r)/255,Number(_.g)/255,Number(_.b)/255])),c&&(a.specularMap=c),l&&(a.bumpMap=l),a.doubleSide=u,a.defines=i(i({},a.defines),{},{USE_LIGHT:!0}),a}return p(t,e),c(t,[{key:`emissive`,get:function(){return this.props.emissive},set:function(e){this.props.emissive=e;var t=h(e);this.setUniforms(r({},Cu.EMISSIVE,[Number(t.r)/255,Number(t.g)/255,Number(t.b)/255]))}},{key:`shininess`,get:function(){return this.props.shininess},set:function(e){this.props.shininess=e,this.setUniforms(r({},Cu.SHININESS,e))}},{key:`specular`,get:function(){return this.props.specular},set:function(e){this.props.specular=e;var t=h(e);this.setUniforms(r({},Cu.SPECULAR,[Number(t.r)/255,Number(t.g)/255,Number(t.b)/255]))}},{key:`specularMap`,get:function(){return this.props.specularMap},set:function(e){this.props.map!==e&&(this.props.specularMap=e,this.programDirty=!0),this.defines.USE_SPECULARMAP=!!e,this.setUniforms(r({},Cu.SPECULAR_MAP,e))}},{key:`bumpMap`,get:function(){return this.props.bumpMap},set:function(e){this.props.map!==e&&(this.props.bumpMap=e,this.programDirty=!0),this.defines.USE_BUMPMAP=!!e,this.setUniforms(r(r({},Cu.BUMP_MAP,e),Cu.BUMP_SCALE,this.bumpScale))}},{key:`bumpScale`,get:function(){return this.props.bumpScale},set:function(e){this.props.bumpScale=e,this.setUniforms(r({},Cu.BUMP_SCALE,e))}},{key:`doubleSide`,get:function(){return this.props.doubleSide},set:function(e){this.props.doubleSide=e,this.defines.USE_DOUBLESIDE=e}}])}(bu),Tu=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_UV
  in vec2 v_Uv;
#endif
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#if defined(USE_BUMPMAP) && defined(USE_LIGHT)
  uniform sampler2D u_BumpMap;

  // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
  // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

  // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

  vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( v_Uv );
    vec2 dSTdy = dFdy( v_Uv );

    float Hll = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv ).x;
    float dBx = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdx ).x - Hll;
    float dBy = u_BumpScale * texture(SAMPLER_2D(u_BumpMap), v_Uv + dSTdy ).x - Hll;

    return vec2( dBx, dBy );
  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
    vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
    vec3 vN = surf_norm;		// normalized

    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );

    float fDet = dot( vSigmaX, R1 ) * faceDirection;

    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
  }
#endif
#ifdef USE_SPECULARMAP
  uniform sampler2D u_SpecularMap;
#endif
vec3 BRDF_Lambert(vec3 diffuseColor) {
  return RECIPROCAL_PI * diffuseColor;
}

vec3 F_Schlick(
  vec3 f0,
  float f90,
  float dotVH
) {
  // Original approximation by Christophe Schlick '94
  // float fresnel = pow( 1.0 - dotVH, 5.0 );

  // Optimized variant (presented by Epic at SIGGRAPH '13)
  // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float G_BlinnPhong_Implicit( /* float dotNL, float dotNV */ ) {
  // geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
  return 0.25;
}

float D_BlinnPhong(
  float shininess,
  float dotNH
) {
  return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}

vec3 BRDF_BlinnPhong(
  vec3 lightDir,
  vec3 viewDir,
  vec3 normal,
  vec3 specularColor,
  float shininess
) {
  vec3 halfDir = normalize( lightDir + viewDir );

  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );

  vec3 F = F_Schlick( specularColor, 1.0, dotVH );

  float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

  float D = D_BlinnPhong( shininess, dotNH );

  return F * ( G * D );
}

#ifdef USE_WIREFRAME
  in vec3 v_Barycentric;

  float edgeFactor() {
    vec3 d = fwidth(v_Barycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * u_WireframeLineWidth, v_Barycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
#endif

#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

#ifdef USE_LIGHT
  void getDirectionalLightInfo(
    DirectionalLight directionalLight, 
    GeometricContext geometry,
    out IncidentLight light
  ) {
    light.color = directionalLight.color * directionalLight.intensity;
    light.direction = normalize(directionalLight.direction);
    light.visible = true;
  }

  vec3 getAmbientLightIrradiance( vec3 ambientLightColor ) {
    vec3 irradiance = ambientLightColor;
    return irradiance;
  }
#endif
struct LambertMaterial {
  vec3 diffuseColor;
  float specularStrength;
};

void RE_Direct_Lambert(
  IncidentLight directLight,
  GeometricContext geometry,
  LambertMaterial material,
  inout ReflectedLight reflectedLight
) {
  float dotNL = saturate(dot(geometry.normal, directLight.direction));
  vec3 irradiance = dotNL * directLight.color;

  reflectedLight.directDiffuse += irradiance * BRDF_Lambert(material.diffuseColor);
}

void RE_IndirectDiffuse_Lambert(
  vec3 irradiance,
  GeometricContext geometry,
  LambertMaterial material,
  inout ReflectedLight reflectedLight
) {
  reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert(material.diffuseColor);
}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert

in vec3 v_ViewPosition;
in vec3 v_Normal;

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}

  // diffusemap
  #ifdef USE_MAP
  #ifdef USE_PATTERN
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #else
    vec4 texelColor = texture(SAMPLER_2D(u_Map), v_Uv);
    u_Color = texelColor;
  #endif
#endif
  // specularmap
  float specularStrength = 1.0;

#ifdef USE_SPECULARMAP
  vec4 texelSpecular = texture(SAMPLER_2D(u_SpecularMap), v_Uv);
  specularStrength = texelSpecular.r;
#endif
  // bumpmap & normalmap
  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
vec3 normal = normalize(v_Normal);
#ifdef USE_DOUBLESIDE
  normal = normal * faceDirection;
#endif

// #ifdef USE_TANGENT
//   vec3 tangent = normalize( vTangent );
//   vec3 bitangent = normalize( vBitangent );

//   #ifdef DOUBLE_SIDED
//     tangent = tangent * faceDirection;
//     bitangent = bitangent * faceDirection;
//   #endif

// #if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

// mat3 vTBN = mat3( tangent, bitangent, normal );

// #endif
// #endif
  #ifdef OBJECTSPACE_NORMALMAP
  // normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

  // #ifdef FLIP_SIDED
  //   normal = - normal;
  // #endif

  // #ifdef DOUBLE_SIDED
  //   normal = normal * faceDirection;
  // #endif

  // normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
  // vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
  // mapN.xy *= normalScale;

  // #ifdef USE_TANGENT
  //   normal = normalize( vTBN * mapN );
  // #else
  //   normal = perturbNormal2Arb( - v_ViewPosition, normal, mapN, faceDirection );
  // #endif

#elif defined(USE_BUMPMAP) && defined(USE_LIGHT)
  normal = perturbNormalArb( - v_ViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;

    vec4 diffuseColor = outputColor;
    ReflectedLight reflectedLight = ReflectedLight(vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ));
    vec3 totalEmissiveRadiance = u_Emissive;

    // calculate lighting accumulation
    LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
    GeometricContext geometry;
geometry.position = - v_ViewPosition;
geometry.normal = normal;
geometry.viewDir = u_IsOrtho == 1.0 ? vec3(0, 0, 1) : normalize(v_ViewPosition);

IncidentLight directLight;
#if defined( NUM_DIR_LIGHTS ) && ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
  DirectionalLight directionalLight;
  #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
    DirectionalLightShadow directionalLightShadow;
  #endif

  #pragma unroll_loop_start
  for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

    directionalLight = directionalLights[ i ];

    getDirectionalLightInfo( directionalLight, geometry, directLight );

    #if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
      directionalLightShadow = directionalLightShadows[ i ];
      directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
    #endif

    RE_Direct( directLight, geometry, material, reflectedLight );
  }
  #pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )
  vec3 iblIrradiance = vec3(0.0);
  vec3 ambient = vec3(0.0);
  #ifdef NUM_AMBIENT_LIGHTS
    ambient = u_AmbientLightColor;
  #endif
  vec3 irradiance = getAmbientLightIrradiance(ambient);

  // irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
  // #if ( NUM_HEMI_LIGHTS > 0 )
  //   #pragma unroll_loop_start
  //   for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
  //     irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
  //   }
  //   #pragma unroll_loop_end
  // #endif
#endif

#if defined( RE_IndirectSpecular )
  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );
#endif

    #if defined( RE_IndirectDiffuse )
  RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif

#if defined( RE_IndirectSpecular )
  RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif

    vec3 outgoingLight = reflectedLight.directDiffuse +
      reflectedLight.indirectDiffuse + 
      totalEmissiveRadiance;

    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_WIREFRAME
  vec3 color = mix(outputColor.xyz, u_WireframeLineColor, (1.0 - edgeFactor()));
  outputColor.xyz = color;
#endif
    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,Eu=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  vec3 u_Emissive;

  #ifdef USE_LIGHT
    #ifdef USE_BUMPMAP
      float u_BumpScale;
    #endif

    #ifdef NUM_AMBIENT_LIGHTS
      vec3 u_AmbientLightColor;
    #endif

    #ifdef NUM_DIR_LIGHTS
      DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
    #endif
  #endif
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;
layout(location = NORMAL) in vec3 a_Normal;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

out vec3 v_ViewPosition;
out vec3 v_Normal;

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  vec4 position = vec4(a_Position, 1.0);

  gl_Position = project(position, u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  vec4 mvPosition = u_ViewMatrix * u_ModelMatrix * position;
  v_ViewPosition = - mvPosition.xyz;

  // v_ViewPosition = vec3(mvPosition) / mvPosition.w;

  mat3 normalWorld = mat3(transposeMat3(inverseMat3(mat3(u_ViewMatrix * u_ModelMatrix))));
  v_Normal = normalize(normalWorld * a_Normal);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,Du=function(e){return e.EMISSIVE=`u_Emissive`,e.BUMP_SCALE=`u_BumpScale`,e.BUMP_MAP=`u_BumpMap`,e}(Du||{}),Ou=function(e){function t(e,n){var a;s(this,t),a=d(this,t,[e,i({vertexShader:Eu,fragmentShader:Tu,emissive:`black`,bumpScale:1,doubleSide:!1},n)]);var o=a,c=o.bumpMap,l=o.doubleSide,u=o.emissive,f=h(u);return a.setUniforms(r({u_Placeholder:null},Du.EMISSIVE,[Number(f.r)/255,Number(f.g)/255,Number(f.b)/255])),c&&(a.bumpMap=c),a.doubleSide=l,a.defines=i(i({},a.defines),{},{USE_LIGHT:!0}),a}return p(t,e),c(t,[{key:`emissive`,get:function(){return this.props.emissive},set:function(e){this.props.emissive=e;var t=h(e);this.setUniforms(r({},Du.EMISSIVE,[Number(t.r)/255,Number(t.g)/255,Number(t.b)/255]))}},{key:`bumpMap`,get:function(){return this.props.bumpMap},set:function(e){this.props.map!==e&&(this.props.bumpMap=e,this.programDirty=!0),this.defines.USE_BUMPMAP=!!e,this.setUniforms(r(r({},Du.BUMP_MAP,e),Du.BUMP_SCALE,this.bumpScale))}},{key:`bumpScale`,get:function(){return this.props.bumpScale},set:function(e){this.props.bumpScale=e,this.setUniforms(r({},Du.BUMP_SCALE,e))}},{key:`doubleSide`,get:function(){return this.props.doubleSide},set:function(e){this.props.doubleSide=e,this.defines.USE_DOUBLESIDE=e}}])}(bu),ku=`#define GLSLIFY 1
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  float u_Size;
  vec4 u_Placeholder;
};

layout(location = MODEL_MATRIX0) in vec4 a_ModelMatrix0;
layout(location = MODEL_MATRIX1) in vec4 a_ModelMatrix1;
layout(location = MODEL_MATRIX2) in vec4 a_ModelMatrix2;
layout(location = MODEL_MATRIX3) in vec4 a_ModelMatrix3;
layout(location = PACKED_COLOR) in vec4 a_PackedColor;
layout(location = PACKED_STYLE1) in vec4 a_StylePacked1;
layout(location = PACKED_STYLE2) in vec4 a_StylePacked2;
layout(location = PICKING_COLOR) in vec4 a_PickingColor;

out vec4 v_PickingResult;
out vec4 v_Color;
out vec4 v_StrokeColor;
out vec4 v_StylePacked1;
out vec4 v_StylePacked2;

#define COLOR_SCALE 1. / 255.
void setPickingColor(vec3 pickingColor) {
  v_PickingResult.rgb = pickingColor * COLOR_SCALE;
}

vec2 unpack_float(const float packedValue) {
  int packedIntValue = int(packedValue);
  int v0 = packedIntValue / 256;
  return vec2(v0, packedIntValue - v0 * 256);
}
vec4 decode_color(const vec2 encodedColor) {
  return vec4(
    unpack_float(encodedColor[0]) / 255.0,
    unpack_float(encodedColor[1]) / 255.0
  );
}
vec4 project(vec4 pos, mat4 pm, mat4 vm, mat4 mm) {
  return pm * vm * mm * pos;
}

layout(location = POSITION) in vec3 a_Position;

#ifdef USE_UV
  layout(location = UV) in vec2 a_Uv;
  out vec2 v_Uv;
#endif

#ifdef USE_WIREFRAME
  layout(location = BARYCENTRIC) in vec3 a_Barycentric;
  out vec3 v_Barycentric;
#endif

void main() {
  vec4 a_Color = decode_color(a_PackedColor.xy);
vec4 a_StrokeColor = decode_color(a_PackedColor.zw);

mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
vec4 u_StrokeColor = a_StrokeColor;
float u_Opacity = a_StylePacked1.x;
float u_FillOpacity = a_StylePacked1.y;
float u_StrokeOpacity = a_StylePacked1.z;
float u_StrokeWidth = a_StylePacked1.w;
float u_ZIndex = a_PickingColor.w;
vec2 u_Anchor = a_StylePacked2.yz;
float u_IncreasedLineWidthForHitTesting = a_StylePacked2.w;

setPickingColor(a_PickingColor.xyz);

v_Color = a_Color;
v_StrokeColor = a_StrokeColor;
v_StylePacked1 = a_StylePacked1;
v_StylePacked2 = a_StylePacked2;

// #ifdef CLIPSPACE_NEAR_ZERO
//     gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
// #endif

  gl_PointSize = u_Size;
  gl_Position = project(vec4(a_Position, 1.0), u_ProjectionMatrix, u_ViewMatrix, u_ModelMatrix);

  #ifdef USE_UV
  v_Uv = a_Uv;
#endif

  #ifdef USE_WIREFRAME
  v_Barycentric = a_Barycentric;
#endif

}`,Au=`#define GLSLIFY 1
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
  #define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( float x ) { return x*x; }
float pow3( float x ) { return x*x*x; }
float pow4( float x ) { float x2 = x*x; return x2*x2; }
float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( vec2 uv ) {
  const highp float a = 12.9898, b = 78.233, c = 43758.5453;
  highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

  return fract( sin( sn ) * c );
}

mat3 transposeMat3(mat3 inMatrix) {
  vec3 i0 = inMatrix[0];
  vec3 i1 = inMatrix[1];
  vec3 i2 = inMatrix[2];

  mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

  return outMatrix;
}

// https://github.com/glslify/glsl-inverse/blob/master/index.glsl
mat3 inverseMat3(mat3 inMatrix) {
  float a00 = inMatrix[0][0], a01 = inMatrix[0][1], a02 = inMatrix[0][2];
  float a10 = inMatrix[1][0], a11 = inMatrix[1][1], a12 = inMatrix[1][2];
  float a20 = inMatrix[2][0], a21 = inMatrix[2][1], a22 = inMatrix[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
          b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
          b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}

struct DirectionalLight {
  vec3 direction;
  float intensity;
  vec3 color;
};

struct IncidentLight {
  vec3 color;
  vec3 direction;
  bool visible;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};
layout(std140) uniform ub_SceneParams {
  mat4 u_ProjectionMatrix;
  mat4 u_ViewMatrix;
  vec3 u_CameraPosition;
  float u_DevicePixelRatio;
  vec2 u_Viewport;
  float u_IsOrtho;
  float u_IsPicking;
};
layout(std140) uniform ub_MaterialParams {
  #ifdef USE_WIREFRAME
    vec3 u_WireframeLineColor;
    float u_WireframeLineWidth;
  #endif

  #ifdef USE_FOG
    vec4 u_FogInfos;
    vec3 u_FogColor;
  #endif

  float u_Size;
  vec4 u_Placeholder;
};

in vec4 v_PickingResult;
in vec4 v_Color;
in vec4 v_StrokeColor;
in vec4 v_StylePacked1;
in vec4 v_StylePacked2;
#ifdef USE_MAP
  uniform sampler2D u_Map;
#endif
#ifdef USE_FOG
  #define FOGMODE_NONE 0.
  #define FOGMODE_EXP 1.
  #define FOGMODE_EXP2 2.
  #define FOGMODE_LINEAR 3.

  // in float v_FogDepth;

  float dBlendModeFogFactor = 1.0;

  vec3 addFog(vec3 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    // float depth = v_FogDepth;
    float fogFactor;
    float fogStart = u_FogInfos.y;
    float fogEnd = u_FogInfos.z;
    float fogDensity = u_FogInfos.w;

    if (u_FogInfos.x == FOGMODE_NONE) {
      fogFactor = 1.0;
    } else if (u_FogInfos.x == FOGMODE_EXP) {
      fogFactor = exp(-depth * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_EXP2) {
      fogFactor = exp(-depth * depth * fogDensity * fogDensity);
    } else if (u_FogInfos.x == FOGMODE_LINEAR) {
      fogFactor = (fogEnd - depth) / (fogEnd - fogStart);
    }

    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(u_FogColor * dBlendModeFogFactor, color, fogFactor);
  }
#endif

out vec4 outputColor;

void main() {
  vec4 u_Color = v_Color;
vec4 u_StrokeColor = v_StrokeColor;
float u_Opacity = v_StylePacked1.x;
float u_FillOpacity = v_StylePacked1.y;
float u_StrokeOpacity = v_StylePacked1.z;
float u_StrokeWidth = v_StylePacked1.w;
float u_Visible = v_StylePacked2.x;
vec3 u_PickingColor = v_PickingResult.xyz;

if (u_Visible < 0.5) {
    discard;
}
  #ifdef USE_MAP
  vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
	vec4 mapTexel = texture(SAMPLER_2D(u_Map), uv);
  u_Color *= mapTexel;
#endif

  if (u_IsPicking > 0.5) {
    if (u_PickingColor.x == 0.0 && u_PickingColor.y == 0.0 && u_PickingColor.z == 0.0) {
      discard;
    }
    outputColor = vec4(u_PickingColor, 1.0);
  } else {
    outputColor = u_Color;
    outputColor.a = outputColor.a * u_Opacity;
    vec4 diffuseColor = outputColor;

    vec3 outgoingLight = diffuseColor.rgb;
    
    outputColor = vec4(outgoingLight, diffuseColor.a);

    #ifdef USE_FOG
  outputColor.rgb = addFog(outputColor.rgb);
#endif
  }
}`,ju=function(e){return e.MAP=`u_Map`,e.PLACE_HOLDER=`u_Placeholder`,e.SIZE=`u_Size`,e}(ju||{}),Mu=function(e){function t(e,n){var a;s(this,t),a=d(this,t,[e,i({vertexShader:ku,fragmentShader:Au,cullMode:Vn.BACK},n)]),a.defines=i(i({},a.defines),{},{USE_UV:!0,USE_MAP:!1,USE_WIREFRAME:!1,USE_FOG:!1,USE_LIGHT:!1});var o=n||{},c=o.map,l=o.size;return c&&(a.map=c),a.setUniforms(r(r({},ju.PLACE_HOLDER,[0,0,0,0]),ju.SIZE,l||1)),a}return p(t,e),c(t,[{key:`map`,get:function(){return this.props.map},set:function(e){this.props.map!==e&&(this.props.map=e,this.programDirty=!0),this.setUniforms(r({},ju.MAP,e))}},{key:`size`,get:function(){return this.props.size},set:function(e){this.props.size=e,this.setUniforms(r({},ju.SIZE,e))}}])}(yc),Nu=function(e){function t(){var e;s(this,t);var n=[...arguments];return e=d(this,t,[].concat(n)),e.name=`3d`,e}return p(t,e),c(t,[{key:`init`,value:function(){}},{key:`destroy`,value:function(){}}])}(xe);function Pu(e){let t=Object.entries(e);if(t.some(([,e])=>typeof e==`object`))return Symbol();let n=t.sort((e,t)=>e[0].localeCompare(t[0])).map(([e,t])=>`${e}:${t}`).join(` `);return Symbol.for(n)}var Fu=class{constructor(){this.map=new Map}has(e,t){return this.map.has(e)&&this.map.get(e).has(t)}get(e,t){return this.map.get(e)?.get(t)}set(e,t,n){this.map.has(e)||this.map.set(e,new Map),this.map.get(e).set(t,n)}clear(){this.map.clear()}},Iu=`__TEXTURE_CACHE__`;function Lu(e,t){if(!t)return;let n=Ee(e,Iu);if(n||(n=new Map,Me(e,Iu,n)),n.has(t))return n.get(t);let r=e.loadTexture(t);return n.set(t,r),r}var Ru=`__MATERIAL_CACHE__`,zu={basic:bu,point:Mu,lambert:Ou,phong:wu};function Bu(e,t,n){let r=Ee(e,Ru);r||(r=new Fu,Me(e,Ru,r));let i=Pu(t);if(r.has(i,n))return r.get(i,n);let a=e.getDevice(),{type:o,map:s=n,...c}=t,l=zu[o],u=new l(a,{map:Lu(e,s),...c});return r.set(i,n,u),u}var Vu=class e extends Xe{static{this.defaultStyleProps={materialType:`basic`}}get plugin(){return this.context.canvas.getRenderer(`main`).getPlugin(`device-renderer`)}get device(){return this.plugin.getDevice()}constructor(t){super(R({},{style:e.defaultStyleProps},t)),this.type=`node-3d`}render(e,t){super.render(e,t)}getKeyStyle(e){let t=Ge(super.getKeyStyle(e),`material`),n=this.getGeometry(e),r=this.getMaterial(e);return{x:0,y:0,z:0,...t,geometry:n,material:r}}drawKeyShape(e,t=this){return this.upsert(`key`,es,this.getKeyStyle(e),t)}getMaterial(e){let{texture:t}=e,n=Ke(e,`material`);return Bu(this.plugin,n,t)}},Hu,Uu=new Map;function Wu(e,t,n,r){Hu?Hu!==t&&(Hu=t,Uu.clear()):Hu=t;let i=e+`|`+Object.entries(r).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t}`).join(`,`);if(Uu.has(i))return Uu.get(i);let a=new n(t,r);return Uu.set(i,a),a}var Gu=class e extends Vu{static{this.defaultStyleProps={size:[24,48],heightSegments:1,sides:20}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getSize(e=this.attributes){let{size:t}=e;return typeof t==`number`?[t/4,t,t]:super.getSize()}getGeometry(e){let t=this.getSize(),{radius:n=t[0],height:r=t[1],heightSegments:i,sides:a}=e;return Wu(`capsule`,this.device,fu,{radius:n,height:r,heightSegments:i,sides:a})}},Ku=class e extends Vu{static{this.defaultStyleProps={size:[24,0,48],heightSegments:5,capSegments:20}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getSize(e=this.attributes){let{size:t}=e;return typeof t==`number`?[t/2,0,t]:super.getSize()}getGeometry(e){let t=this.getSize(),{baseRadius:n=t[0],peakRadius:r=t[1],height:i=t[2],heightSegments:a,capSegments:o}=e;return Wu(`cone`,this.device,du,{baseRadius:n,peakRadius:r,height:i,heightSegments:a,capSegments:o})}},qu=class e extends Vu{static{this.defaultStyleProps={widthSegments:1,heightSegments:1,depthSegments:1}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getGeometry(e){let t=this.getSize(),{width:n=t[0],height:r=t[1],depth:i=t[2],widthSegments:a,heightSegments:o,depthSegments:s}=e;return Wu(`cube`,this.device,ou,{width:n,height:r,depth:i,widthSegments:a,heightSegments:o,depthSegments:s})}},Ju=class e extends Vu{static{this.defaultStyleProps={size:[24,48],heightSegments:5,capSegments:20}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getSize(e=this.attributes){let{size:t}=e;return typeof t==`number`?[t/2,t,0]:super.getSize()}getGeometry(e){let t=this.getSize(),{radius:n=t[0],height:r=t[1],heightSegments:i,capSegments:a}=e;return Wu(`cylinder`,this.device,uu,{radius:n,height:r,heightSegments:i,capSegments:a})}},Yu=class extends Je{getKeyPath(){return[]}getKeyStyle(e){let{sourceNode:t,targetNode:n}=this,[r,i,a]=t.getPosition(),[o,s,c]=n.getPosition(),{d:l,...u}=super.getKeyStyle(e);return{x1:r,y1:i,z1:a,x2:o,y2:s,z2:c,...u}}drawKeyShape(e=this.parsedAttributes,t=this){return this.upsert(`key`,D,this.getKeyStyle(e),t)}},Xu=class e extends Vu{static{this.defaultStyleProps={materialCullMode:Vn.NONE}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getGeometry(e){let t=this.getSize(),{width:n=t[0],depth:r=t[1],widthSegments:i,depthSegments:a}=e;return Wu(`plane`,this.device,lu,{width:n,depth:r,widthSegments:i,depthSegments:a})}},Zu=class e extends Vu{static{this.defaultStyleProps={size:24,latitudeBands:16,longitudeBands:16}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getGeometry(e){let t=this.getSize(),{radius:n=t[0]/2,latitudeBands:r,longitudeBands:i}=e;return Wu(`sphere`,this.device,su,{radius:n,latitudeBands:r,longitudeBands:i})}},Qu=class e extends Vu{static{this.defaultStyleProps={size:[8,48],segments:30,sides:20}}constructor(t){super(R({},{style:e.defaultStyleProps},t))}getSize(e=this.attributes){let{size:t}=e;return typeof t==`number`?[t/8,t/2,0]:super.getSize()}getGeometry(e){let t=this.getSize(),{tubeRadius:n=t[0],ringRadius:r=t[1],segments:i,sides:a}=e;return Wu(`torus`,this.device,cu,{tubeRadius:n,ringRadius:r,segments:i,sides:a})}},$u=class e extends He{static{this.defaultOptions={ambient:{fill:`#fff`,intensity:Math.PI*2},directional:{fill:`#fff`,direction:[-1,0,1],intensity:Math.PI*.7}}}constructor(t,n){super(t,R({},e.defaultOptions,n)),this.setLight=()=>{let{ambient:e,directional:t}=this.options;this.upsertLight(`directional`,t),this.upsertLight(`ambient`,e)},this.bindEvents()}bindEvents(){this.context.graph.on(Ye.BEFORE_DRAW,this.setLight)}unbindEvents(){this.context.graph.off(Ye.BEFORE_DRAW,this.setLight)}upsertLight(e,t){if(t){let n=this[e];if(n)n.attr(t);else{let n=new(e===`ambient`?mu:gu)({style:t});this[e]=n,this.context.canvas.appendChild(n)}}else this[e]?.remove()}destroy(){this.ambient?.remove(),this.directional?.remove(),this.unbindEvents(),super.destroy()}},ed=function(){function e(t){s(this,e),this.canvasConfig=t.config,this.deviceRendererPlugin=t.deviceRendererPlugin}return c(e,[{key:`init`,value:function(){var e=this.canvasConfig,t=e.container,n=e.canvas;if(n)this.$canvas=n,t&&n.parentElement!==t&&t.appendChild(n),this.$container=n.parentElement,this.canvasConfig.container=this.$container;else if(t&&(this.$container=ke(t)?document.getElementById(t):t,this.$container)){var r=document.createElement(`canvas`);this.$container.appendChild(r),this.$container.style.position||(this.$container.style.position=`relative`),this.$canvas=r}this.resize(this.canvasConfig.width,this.canvasConfig.height)}},{key:`getDomElement`,value:function(){return this.$canvas}},{key:`getContext`,value:function(){return this.deviceRendererPlugin.getDevice().gl}},{key:`getBoundingClientRect`,value:function(){if(this.$canvas.getBoundingClientRect)return this.$canvas.getBoundingClientRect()}},{key:`destroy`,value:function(){this.$container&&this.$canvas&&this.$canvas.parentNode&&this.$container.removeChild(this.$canvas)}},{key:`resize`,value:function(e,t){var n=this.canvasConfig.devicePixelRatio;if(this.dpr=n,this.$canvas){var r=this.getDPR();this.$canvas.width=r*e,this.$canvas.height=r*t,_e(this.$canvas,e,t)}}},{key:`getDPR`,value:function(){return this.dpr}},{key:`applyCursorStyle`,value:function(e){this.$container&&this.$container.style&&(this.$container.style.cursor=e)}},{key:`toDataURL`,value:function(){var e=u(f().mark(function e(){var t,n=arguments;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&n[0]!==void 0?n[0]:{},e.abrupt(`return`,this.deviceRendererPlugin.toDataURL(t));case 1:case`end`:return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}])}(),td=function(e){function t(e,n){var r;return s(this,t),r=d(this,t),r.name=`webgl-context-register`,r.rendererPlugin=e,r.config=n,r}return p(t,e),c(t,[{key:`init`,value:function(){this.context.ContextService=ed,this.context.deviceRendererPlugin=this.rendererPlugin;var e=this.config;this.context.deviceContribution=new Oa(i(i({},e!=null&&e.targets?{targets:e.targets}:{targets:[`webgl2`,`webgl1`]}),{},{onContextLost:e?.onContextLost,onContextRestored:e?.onContextRestored,onContextCreationError:e?.onContextCreationError}))}},{key:`destroy`,value:function(){delete this.context.ContextService}}])}(xe),nd=new b(``),rd=function(){function e(){s(this,e),this.targetRay=null}return c(e,[{key:`connect`,value:function(e){return this.dispatchEvent({type:`connected`,data:e}),this}},{key:`disconnect`,value:function(e){return this.dispatchEvent({type:`disconnected`,data:e}),this.targetRay!==null&&(this.targetRay.style.visible=!1),this}},{key:`update`,value:function(e,t,n){var r=null,i=this.targetRay;return e&&t.session.visibilityState!==`visible-blurred`&&i!==null&&(r=t.getPose(e.targetRaySpace,n),r!==null&&(i.setLocalTransform(r.transform.matrix),r.linearVelocity?(i.style.hasLinearVelocity=!0,ne(i.style.linearVelocity,r.linearVelocity)):i.style.hasLinearVelocity=!1,r.angularVelocity?(i.style.hasAngularVelocity=!0,i.style.angularVelocity.copy(r.angularVelocity)):i.style.hasAngularVelocity=!1,this.dispatchEvent({type:`move`}))),i!==null&&(i.style.visible=r!==null),this}},{key:`getTargetRaySpace`,value:function(){return this.targetRay===null&&(this.targetRay=new T,this.targetRay.style.visible=!1,this.targetRay.style.hasLinearVelocity=!1,this.targetRay.style.linearVelocity=ge(),this.targetRay.style.hasAngularVelocity=!1,this.targetRay.style.angularVelocity=ge()),this.targetRay}},{key:`dispatchEvent`,value:function(e){var t=e.type,n=e.data;return nd.type=t,nd.detail=n,this.targetRay!==null&&this.targetRay.dispatchEvent(nd),this}}])}(),id=function(){function e(t){var n=this;s(this,e),this.controllers=[],this.controllerInputSources=[],this.onSessionEnd=function(){n.session.removeEventListener(`select`,n.onSessionEvent),n.session.removeEventListener(`selectstart`,n.onSessionEvent),n.session.removeEventListener(`selectend`,n.onSessionEvent),n.session.removeEventListener(`squeeze`,n.onSessionEvent),n.session.removeEventListener(`squeezestart`,n.onSessionEvent),n.session.removeEventListener(`squeezeend`,n.onSessionEvent),n.session.removeEventListener(`end`,n.onSessionEnd),n.session.removeEventListener(`inputsourceschange`,n.onInputSourcesChange);for(var e=0;e<n.controllers.length;e++){var t=n.controllerInputSources[e];t!==null&&(n.controllerInputSources[e]=null,n.controllers[e].disconnect(t))}},this.onSessionEvent=function(e){var t=n.controllerInputSources.indexOf(e.inputSource);if(t!==-1){var r=n.controllers[t];r!==void 0&&(r.update(e.inputSource,e.frame,n.session.referenceSpace),r.dispatchEvent({type:e.type,data:e.inputSource}))}},this.onInputSourcesChange=function(e){for(var t=0;t<e.removed.length;t++){var r=e.removed[t],i=n.controllerInputSources.indexOf(r);i>=0&&(n.controllerInputSources[i]=null,n.controllers[i].disconnect(r))}for(var a=0;a<e.added.length;a++){var o=e.added[a],s=n.controllerInputSources.indexOf(o);if(s===-1){for(var c=0;c<n.controllers.length;c++)if(c>=n.controllerInputSources.length){n.controllerInputSources.push(o),s=c;break}else if(n.controllerInputSources[c]===null){n.controllerInputSources[c]=o,s=c;break}if(s===-1)break}var l=n.controllers[s];l&&l.connect(o)}},this.plugin=t}return c(e,[{key:`setSession`,value:function(){var e=u(f().mark(function e(t,n){var r,i,a;return f().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}if(this.session=n,r=this.plugin.getDevice().gl,i=r.getContextAttributes(),i.xrCompatible===!0){e.next=1;break}return e.next=1,r.makeXRCompatible();case 1:if(n.addEventListener(`select`,this.onSessionEvent),n.addEventListener(`selectstart`,this.onSessionEvent),n.addEventListener(`selectend`,this.onSessionEvent),n.addEventListener(`squeeze`,this.onSessionEvent),n.addEventListener(`squeezestart`,this.onSessionEvent),n.addEventListener(`squeezeend`,this.onSessionEvent),n.addEventListener(`end`,this.onSessionEnd),n.addEventListener(`inputsourceschange`,this.onInputSourcesChange),n.renderState.layers!==void 0){e.next=3;break}return a={antialias:i.antialias,alpha:!0,depth:i.depth,stencil:i.stencil,framebufferScaleFactor:1},this.glBaseLayer=new XRWebGLLayer(n,r,a),n.updateRenderState({baseLayer:this.glBaseLayer}),e.next=2,n.requestReferenceSpace(this.referenceSpaceType);case 2:this.referenceSpace=e.sent,n.referenceSpace=this.referenceSpace;case 3:t.requestAnimationFrame=n.requestAnimationFrame.bind(n);case 4:case`end`:return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:`setReferenceSpaceType`,value:function(e){this.referenceSpaceType=e}},{key:`getSession`,value:function(){return this.session}},{key:`getReferenceSpace`,value:function(){return this.referenceSpace}},{key:`getOrCreateController`,value:function(e){var t=this.controllers[e];return t===void 0&&(t=new rd,this.controllers[e]=t),t}},{key:`getController`,value:function(e){return this.getOrCreateController(e).getTargetRaySpace()}}])}(),ad=function(e){function t(e){var n;s(this,t),n=d(this,t,[i({enableSizeAttenuation:!1},e)]);var r=new tu(e);return n.xr=new id(r),n.registerPlugin(new td(r,e)),n.registerPlugin(new E.Plugin),n.registerPlugin(r),n.registerPlugin(new y.Plugin),n.registerPlugin(new oe.Plugin),n}return p(t,e),c(t)}(ve),od=e=>{if(e===`label`)return new Qe;let t=new ad;return e===`main`&&t.registerPlugin(new Nu),t};export{Xu as a,qu as c,Vu as d,Rn as f,Pn as g,Fn as h,Zu as i,Ku as l,In as m,$u as n,Yu as o,Ln as p,Qu as r,Ju as s,od as t,Gu as u};