"use strict";(self.webpackChunk_antv_g6_site=self.webpackChunk_antv_g6_site||[]).push([[2002],{4:function(n,e,l){l.d(e,{Z:function(){return p}});var o=l(17037),t=l(81211);var r=function(n,e){return(0,t.Z)(n,e)},a=l(55826),u=l(47434);function i(n){return function(n){if(Array.isArray(n))return s(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"==typeof n)return s(n,e);var l=Object.prototype.toString.call(n).slice(8,-1);"Object"===l&&n.constructor&&(l=n.constructor.name);if("Map"===l||"Set"===l)return Array.from(n);if("Arguments"===l||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l))return s(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(n,e){(null==e||e>n.length)&&(e=n.length);for(var l=0,o=new Array(e);l<e;l++)o[l]=n[l];return o}var c=function(n){var e=n.titleSuffix,l=n.title,t=n.description,r=n.meta,s=(0,o.useLocale)().id,c=(0,o.useSiteData)().themeConfig.metas,p=(0,u.oM)(c.title,s),d=(0,u.oM)(c.description,s),m=a.useMemo((function(){var n=l||"",o="".concat(n," | ").concat(e||p),a=t||d,u=[{name:"description",content:a},{property:"og:title",content:n},{property:"og:description",content:a},{property:"og:image",content:"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:title",content:n},{name:"twitter:description",content:a},{property:"twitter:image",content:"https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"}];return{title:n,description:a,fullTitle:o,defaultMeta:u,meta:[].concat(u,i(r||[]))}}),[l,t,e,r]);return(0,a.useEffect)((function(){var n=setTimeout((function(){document.title=m.fullTitle}),100);return function(){return clearTimeout(n)}}),[m.fullTitle]),a.createElement(o.Helmet,{htmlAttributes:{lang:s},title:m.fullTitle,meta:m.meta})},p=a.memo(c,(function(n,e){return n.title===e.title&&n.description===e.description&&n.titleSuffix===e.titleSuffix&&r(n.meta,e.meta)}))},93405:function(n){var e=Object.prototype.hasOwnProperty,l=Object.prototype.toString,o=Object.defineProperty,t=Object.getOwnPropertyDescriptor,r=function(n){return"function"==typeof Array.isArray?Array.isArray(n):"[object Array]"===l.call(n)},a=function(n){if(!n||"[object Object]"!==l.call(n))return!1;var o,t=e.call(n,"constructor"),r=n.constructor&&n.constructor.prototype&&e.call(n.constructor.prototype,"isPrototypeOf");if(n.constructor&&!t&&!r)return!1;for(o in n);return void 0===o||e.call(n,o)},u=function(n,e){o&&"__proto__"===e.name?o(n,e.name,{enumerable:!0,configurable:!0,value:e.newValue,writable:!0}):n[e.name]=e.newValue},i=function(n,l){if("__proto__"===l){if(!e.call(n,l))return;if(t)return t(n,l).value}return n[l]};n.exports=function n(){var e,l,o,t,s,c,p=arguments[0],d=1,m=arguments.length,f=!1;for("boolean"==typeof p&&(f=p,p=arguments[1]||{},d=2),(null==p||"object"!=typeof p&&"function"!=typeof p)&&(p={});d<m;++d)if(null!=(e=arguments[d]))for(l in e)o=i(p,l),p!==(t=i(e,l))&&(f&&t&&(a(t)||(s=r(t)))?(s?(s=!1,c=o&&r(o)?o:[]):c=o&&a(o)?o:{},u(p,{name:l,newValue:n(f,c,t)})):void 0!==t&&u(p,{name:l,newValue:t}));return p}},81050:function(n,e,l){function o(n){if(n)throw n}l.d(e,{N:function(){return o}})},40864:function(n,e,l){function o(n,e){const l=String(n);if("string"!=typeof e)throw new TypeError("Expected character");let o=0,t=l.indexOf(e);for(;-1!==t;)o++,t=l.indexOf(e,t+e.length);return o}l.d(e,{w:function(){return o}})},57578:function(n,e,l){function o(n){const e=[],l=String(n||"");let o=l.indexOf(","),t=0,r=!1;for(;!r;){-1===o&&(o=l.length,r=!0);const n=l.slice(t,o).trim();!n&&r||e.push(n),t=o+1,o=l.indexOf(",",t)}return e}function t(n,e){const l=e||{};return(""===n[n.length-1]?[...n,""]:n).join((l.padRight?" ":"")+","+(!1===l.padLeft?"":" ")).trim()}l.d(e,{P:function(){return t},Q:function(){return o}})},758:function(n,e,l){l.d(e,{T:function(){return t}});const o=document.createElement("i");function t(n){const e="&"+n+";";o.innerHTML=e;const l=o.textContent;return(59!==l.charCodeAt(l.length-1)||"semi"===n)&&(l!==e&&l)}},34346:function(n,e,l){function o(n){if("string"!=typeof n)throw new TypeError("Expected a string");return n.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}l.d(e,{Z:function(){return o}})},89389:function(n,e,l){function o(n){if("object"!=typeof n||null===n)return!1;const e=Object.getPrototypeOf(n);return!(null!==e&&e!==Object.prototype&&null!==Object.getPrototypeOf(e)||Symbol.toStringTag in n||Symbol.iterator in n)}l.d(e,{Z:function(){return o}})},3148:function(n,e,l){l.d(e,{Z:function(){return s}});var o=l(46269),t=l(344),r=l(2495),a=l(83788),u=t.Z?t.Z.isConcatSpreadable:void 0;var i=function(n){return(0,a.Z)(n)||(0,r.Z)(n)||!!(u&&n&&n[u])};var s=function n(e,l,t,r,a){var u=-1,s=e.length;for(t||(t=i),a||(a=[]);++u<s;){var c=e[u];l>0&&t(c)?l>1?n(c,l-1,t,r,a):(0,o.Z)(a,c):r||(a[a.length]=c)}return a}},45402:function(n,e,l){var o=l(49287),t=function(){try{var n=(0,o.Z)(Object,"defineProperty");return n({},"",{}),n}catch(n){}}();e.Z=t},46262:function(n,e,l){l.d(e,{Z:function(){return r}});var o=function(n,e,l){switch(l.length){case 0:return n.call(e);case 1:return n.call(e,l[0]);case 2:return n.call(e,l[0],l[1]);case 3:return n.call(e,l[0],l[1],l[2])}return n.apply(e,l)},t=Math.max;var r=function(n,e,l){return e=t(void 0===e?n.length-1:e,0),function(){for(var r=arguments,a=-1,u=t(r.length-e,0),i=Array(u);++a<u;)i[a]=r[e+a];a=-1;for(var s=Array(e+1);++a<e;)s[a]=r[a];return s[e]=l(i),o(n,this,s)}}},97015:function(n,e,l){l.d(e,{Z:function(){return s}});var o=function(n){return function(){return n}},t=l(45402),r=l(35272),a=t.Z?function(n,e){return(0,t.Z)(n,"toString",{configurable:!0,enumerable:!1,value:o(e),writable:!0})}:r.Z,u=Date.now;var i=function(n){var e=0,l=0;return function(){var o=u(),t=16-(o-l);if(l=o,t>0){if(++e>=800)return arguments[0]}else e=0;return n.apply(void 0,arguments)}},s=i(a)},32682:function(n,e,l){function o(n){return n.length}function t(n,e){const l=e||{},t=(l.align||[]).concat(),a=l.stringLength||o,u=[],i=[],s=[],c=[];let p=0,d=-1;for(;++d<n.length;){const e=[],o=[];let t=-1;for(n[d].length>p&&(p=n[d].length);++t<n[d].length;){const r=null==(m=n[d][t])?"":String(m);if(!1!==l.alignDelimiters){const n=a(r);o[t]=n,(void 0===c[t]||n>c[t])&&(c[t]=n)}e.push(r)}i[d]=e,s[d]=o}var m;let f=-1;if("object"==typeof t&&"length"in t)for(;++f<p;)u[f]=r(t[f]);else{const n=r(t);for(;++f<p;)u[f]=n}f=-1;const g=[],h=[];for(;++f<p;){const n=u[f];let e="",o="";99===n?(e=":",o=":"):108===n?e=":":114===n&&(o=":");let t=!1===l.alignDelimiters?1:Math.max(1,c[f]-e.length-o.length);const r=e+"-".repeat(t)+o;!1!==l.alignDelimiters&&(t=e.length+t+o.length,t>c[f]&&(c[f]=t),h[f]=t),g[f]=r}i.splice(1,0,g),s.splice(1,0,h),d=-1;const b=[];for(;++d<i.length;){const n=i[d],e=s[d];f=-1;const o=[];for(;++f<p;){const t=n[f]||"";let r="",a="";if(!1!==l.alignDelimiters){const n=c[f]-(e[f]||0),l=u[f];114===l?r=" ".repeat(n):99===l?n%2?(r=" ".repeat(n/2+.5),a=" ".repeat(n/2-.5)):(r=" ".repeat(n/2),a=r):a=" ".repeat(n)}!1===l.delimiterStart||f||o.push("|"),!1===l.padding||!1===l.alignDelimiters&&""===t||!1===l.delimiterStart&&!f||o.push(" "),!1!==l.alignDelimiters&&o.push(r),o.push(t),!1!==l.alignDelimiters&&o.push(a),!1!==l.padding&&o.push(" "),!1===l.delimiterEnd&&f===p-1||o.push("|")}b.push(!1===l.delimiterEnd?o.join("").replace(/ +$/,""):o.join(""))}return b.join("\n")}function r(n){const e="string"==typeof n?n.codePointAt(0):0;return 67===e||99===e?99:76===e||108===e?108:82===e||114===e?114:0}l.d(e,{x:function(){return t}})},8603:function(n,e,l){l.d(e,{dy:function(){return y},YP:function(){return v}});class o{constructor(n,e,l){this.property=n,this.normal=e,l&&(this.space=l)}}function t(n,e){const l={},t={};let r=-1;for(;++r<n.length;)Object.assign(l,n[r].property),Object.assign(t,n[r].normal);return new o(l,t,e)}o.prototype.property={},o.prototype.normal={},o.prototype.space=null;var r=l(12148),a=l(25442);const u={}.hasOwnProperty;function i(n){const e={},l={};let t;for(t in n.properties)if(u.call(n.properties,t)){const o=n.properties[t],u=new a.I(t,n.transform(n.attributes||{},t),o,n.space);n.mustUseProperty&&n.mustUseProperty.includes(t)&&(u.mustUseProperty=!0),e[t]=u,l[(0,r.F)(t)]=t,l[(0,r.F)(u.attribute)]=t}return new o(e,l,n.space)}const s=i({space:"xlink",transform(n,e){return"xlink:"+e.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),c=i({space:"xml",transform(n,e){return"xml:"+e.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function p(n,e){return e in n?n[e]:e}function d(n,e){return p(n,e.toLowerCase())}const m=i({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:d,properties:{xmlns:null,xmlnsXLink:null}});var f=l(43137);const g=i({transform(n,e){return"role"===e?e:"aria-"+e.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:f.booleanish,ariaAutoComplete:null,ariaBusy:f.booleanish,ariaChecked:f.booleanish,ariaColCount:f.number,ariaColIndex:f.number,ariaColSpan:f.number,ariaControls:f.spaceSeparated,ariaCurrent:null,ariaDescribedBy:f.spaceSeparated,ariaDetails:null,ariaDisabled:f.booleanish,ariaDropEffect:f.spaceSeparated,ariaErrorMessage:null,ariaExpanded:f.booleanish,ariaFlowTo:f.spaceSeparated,ariaGrabbed:f.booleanish,ariaHasPopup:null,ariaHidden:f.booleanish,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:f.spaceSeparated,ariaLevel:f.number,ariaLive:null,ariaModal:f.booleanish,ariaMultiLine:f.booleanish,ariaMultiSelectable:f.booleanish,ariaOrientation:null,ariaOwns:f.spaceSeparated,ariaPlaceholder:null,ariaPosInSet:f.number,ariaPressed:f.booleanish,ariaReadOnly:f.booleanish,ariaRelevant:null,ariaRequired:f.booleanish,ariaRoleDescription:f.spaceSeparated,ariaRowCount:f.number,ariaRowIndex:f.number,ariaRowSpan:f.number,ariaSelected:f.booleanish,ariaSetSize:f.number,ariaSort:null,ariaValueMax:f.number,ariaValueMin:f.number,ariaValueNow:f.number,ariaValueText:null,role:null}}),h=i({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:d,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:f.commaSeparated,acceptCharset:f.spaceSeparated,accessKey:f.spaceSeparated,action:null,allow:null,allowFullScreen:f.boolean,allowPaymentRequest:f.boolean,allowUserMedia:f.boolean,alt:null,as:null,async:f.boolean,autoCapitalize:null,autoComplete:f.spaceSeparated,autoFocus:f.boolean,autoPlay:f.boolean,blocking:f.spaceSeparated,capture:null,charSet:null,checked:f.boolean,cite:null,className:f.spaceSeparated,cols:f.number,colSpan:null,content:null,contentEditable:f.booleanish,controls:f.boolean,controlsList:f.spaceSeparated,coords:f.number|f.commaSeparated,crossOrigin:null,data:null,dateTime:null,decoding:null,default:f.boolean,defer:f.boolean,dir:null,dirName:null,disabled:f.boolean,download:f.overloadedBoolean,draggable:f.booleanish,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:f.boolean,formTarget:null,headers:f.spaceSeparated,height:f.number,hidden:f.boolean,high:f.number,href:null,hrefLang:null,htmlFor:f.spaceSeparated,httpEquiv:f.spaceSeparated,id:null,imageSizes:null,imageSrcSet:null,inert:f.boolean,inputMode:null,integrity:null,is:null,isMap:f.boolean,itemId:null,itemProp:f.spaceSeparated,itemRef:f.spaceSeparated,itemScope:f.boolean,itemType:f.spaceSeparated,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:f.boolean,low:f.number,manifest:null,max:null,maxLength:f.number,media:null,method:null,min:null,minLength:f.number,multiple:f.boolean,muted:f.boolean,name:null,nonce:null,noModule:f.boolean,noValidate:f.boolean,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:f.boolean,optimum:f.number,pattern:null,ping:f.spaceSeparated,placeholder:null,playsInline:f.boolean,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:f.boolean,referrerPolicy:null,rel:f.spaceSeparated,required:f.boolean,reversed:f.boolean,rows:f.number,rowSpan:f.number,sandbox:f.spaceSeparated,scope:null,scoped:f.boolean,seamless:f.boolean,selected:f.boolean,shadowRootClonable:f.boolean,shadowRootDelegatesFocus:f.boolean,shadowRootMode:null,shape:null,size:f.number,sizes:null,slot:null,span:f.number,spellCheck:f.booleanish,src:null,srcDoc:null,srcLang:null,srcSet:null,start:f.number,step:null,style:null,tabIndex:f.number,target:null,title:null,translate:null,type:null,typeMustMatch:f.boolean,useMap:null,value:f.booleanish,width:f.number,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:f.spaceSeparated,axis:null,background:null,bgColor:null,border:f.number,borderColor:null,bottomMargin:f.number,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:f.boolean,declare:f.boolean,event:null,face:null,frame:null,frameBorder:null,hSpace:f.number,leftMargin:f.number,link:null,longDesc:null,lowSrc:null,marginHeight:f.number,marginWidth:f.number,noResize:f.boolean,noHref:f.boolean,noShade:f.boolean,noWrap:f.boolean,object:null,profile:null,prompt:null,rev:null,rightMargin:f.number,rules:null,scheme:null,scrolling:f.booleanish,standby:null,summary:null,text:null,topMargin:f.number,valueType:null,version:null,vAlign:null,vLink:null,vSpace:f.number,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:f.boolean,disableRemotePlayback:f.boolean,prefix:null,property:null,results:f.number,security:null,unselectable:null}}),b=i({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:p,properties:{about:f.commaOrSpaceSeparated,accentHeight:f.number,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:f.number,amplitude:f.number,arabicForm:null,ascent:f.number,attributeName:null,attributeType:null,azimuth:f.number,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:f.number,by:null,calcMode:null,capHeight:f.number,className:f.spaceSeparated,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:f.number,diffuseConstant:f.number,direction:null,display:null,dur:null,divisor:f.number,dominantBaseline:null,download:f.boolean,dx:null,dy:null,edgeMode:null,editable:null,elevation:f.number,enableBackground:null,end:null,event:null,exponent:f.number,externalResourcesRequired:null,fill:null,fillOpacity:f.number,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:f.commaSeparated,g2:f.commaSeparated,glyphName:f.commaSeparated,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:f.number,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:f.number,horizOriginX:f.number,horizOriginY:f.number,id:null,ideographic:f.number,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:f.number,k:f.number,k1:f.number,k2:f.number,k3:f.number,k4:f.number,kernelMatrix:f.commaOrSpaceSeparated,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:f.number,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:f.number,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:f.number,overlineThickness:f.number,paintOrder:null,panose1:null,path:null,pathLength:f.number,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:f.spaceSeparated,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:f.number,pointsAtY:f.number,pointsAtZ:f.number,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:f.commaOrSpaceSeparated,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:f.commaOrSpaceSeparated,rev:f.commaOrSpaceSeparated,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:f.commaOrSpaceSeparated,requiredFeatures:f.commaOrSpaceSeparated,requiredFonts:f.commaOrSpaceSeparated,requiredFormats:f.commaOrSpaceSeparated,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:f.number,specularExponent:f.number,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:f.number,strikethroughThickness:f.number,string:null,stroke:null,strokeDashArray:f.commaOrSpaceSeparated,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:f.number,strokeOpacity:f.number,strokeWidth:null,style:null,surfaceScale:f.number,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:f.commaOrSpaceSeparated,tabIndex:f.number,tableValues:null,target:null,targetX:f.number,targetY:f.number,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:f.commaOrSpaceSeparated,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:f.number,underlineThickness:f.number,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:f.number,values:null,vAlphabetic:f.number,vMathematical:f.number,vectorEffect:null,vHanging:f.number,vIdeographic:f.number,version:null,vertAdvY:f.number,vertOriginX:f.number,vertOriginY:f.number,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:f.number,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),y=t([c,s,m,g,h],"html"),v=t([c,s,m,g,b],"svg")},68569:function(n,e,l){l.d(e,{s:function(){return s}});var o=l(12148),t=l(25442),r=l(50934);const a=/^data[-\w.:]+$/i,u=/-[a-z]/g,i=/[A-Z]/g;function s(n,e){const l=(0,o.F)(e);let s=e,d=r.k;if(l in n.normal)return n.property[n.normal[l]];if(l.length>4&&"data"===l.slice(0,4)&&a.test(e)){if("-"===e.charAt(4)){const n=e.slice(5).replace(u,p);s="data"+n.charAt(0).toUpperCase()+n.slice(1)}else{const n=e.slice(4);if(!u.test(n)){let l=n.replace(i,c);"-"!==l.charAt(0)&&(l="-"+l),e="data"+l}}d=t.I}return new d(s,e)}function c(n){return"-"+n.toLowerCase()}function p(n){return n.charAt(1).toUpperCase()}},12148:function(n,e,l){function o(n){return n.toLowerCase()}l.d(e,{F:function(){return o}})},25442:function(n,e,l){l.d(e,{I:function(){return a}});var o=l(50934),t=l(43137);const r=Object.keys(t);class a extends o.k{constructor(n,e,l,o){let a=-1;if(super(n,e),u(this,"space",o),"number"==typeof l)for(;++a<r.length;){const n=r[a];u(this,r[a],(l&t[n])===t[n])}}}function u(n,e,l){l&&(n[e]=l)}a.prototype.defined=!0},50934:function(n,e,l){l.d(e,{k:function(){return o}});class o{constructor(n,e){this.property=n,this.attribute=e}}o.prototype.space=null,o.prototype.boolean=!1,o.prototype.booleanish=!1,o.prototype.overloadedBoolean=!1,o.prototype.number=!1,o.prototype.commaSeparated=!1,o.prototype.spaceSeparated=!1,o.prototype.commaOrSpaceSeparated=!1,o.prototype.mustUseProperty=!1,o.prototype.defined=!1},43137:function(n,e,l){l.r(e),l.d(e,{boolean:function(){return t},booleanish:function(){return r},commaOrSpaceSeparated:function(){return c},commaSeparated:function(){return s},number:function(){return u},overloadedBoolean:function(){return a},spaceSeparated:function(){return i}});let o=0;const t=p(),r=p(),a=p(),u=p(),i=p(),s=p(),c=p();function p(){return 2**++o}},18384:function(n,e,l){function o(n){const e=String(n||"").trim();return e?e.split(/[ \t\n\r\f]+/g):[]}function t(n){return n.join(" ").trim()}l.d(e,{P:function(){return t},Q:function(){return o}})},96659:function(n,e,l){l.d(e,{j:function(){return o}});function o(n){const e=String(n),l=/\r?\n|\r/g;let o=l.exec(e),r=0;const a=[];for(;o;)a.push(t(e.slice(r,o.index),r>0,!0),o[0]),r=o.index+o[0].length,o=l.exec(e);return a.push(t(e.slice(r),r>0,!1)),a.join("")}function t(n,e,l){let o=0,t=n.length;if(e){let e=n.codePointAt(o);for(;9===e||32===e;)o++,e=n.codePointAt(o)}if(l){let e=n.codePointAt(t-1);for(;9===e||32===e;)t--,e=n.codePointAt(t-1)}return t>o?n.slice(o,t):""}},59521:function(n,e,l){function o(){const n=[],e={run:function(...e){let l=-1;const o=e.pop();if("function"!=typeof o)throw new TypeError("Expected function as last argument, not "+o);!function t(r,...a){const u=n[++l];let i=-1;if(r)o(r);else{for(;++i<e.length;)null!==a[i]&&void 0!==a[i]||(a[i]=e[i]);e=a,u?function(n,e){let l;return o;function o(...e){const o=n.length>e.length;let a;o&&e.push(t);try{a=n.apply(this,e)}catch(n){if(o&&l)throw n;return t(n)}o||(a&&a.then&&"function"==typeof a.then?a.then(r,t):a instanceof Error?t(a):r(a))}function t(n,...o){l||(l=!0,e(n,...o))}function r(n){t(null,n)}}(u,t)(...a):o(null,...a)}}(null,...e)},use:function(l){if("function"!=typeof l)throw new TypeError("Expected `middelware` to be a function, not "+l);return n.push(l),e}};return e}l.d(e,{r:function(){return o}})}}]);