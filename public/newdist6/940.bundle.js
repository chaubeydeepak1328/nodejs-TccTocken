"use strict";(self.webpackChunkwallconn=self.webpackChunkwallconn||[]).push([[940],{940:(e,t,s)=>{s.d(t,{WalletConnectModal:()=>n});var o=s(2220);class n{constructor(e){this.openModal=o.D8.open,this.closeModal=o.D8.close,this.subscribeModal=o.D8.subscribe,this.setTheme=o.lH.setThemeConfig,o.lH.setThemeConfig(e),o.mb.setConfig(e),this.initUi()}async initUi(){if("undefined"!=typeof window){await s.e(430).then(s.bind(s,3430));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),o.IN.setIsUiLoaded(!0)}}}},2220:(e,t,s)=>{s.d(t,{mb:()=>C,Ao:()=>b,vZ:()=>y,pV:()=>K,D8:()=>J,IN:()=>w,jL:()=>m,lH:()=>Y,dC:()=>te}),Symbol();const o=Symbol(),n=Object.getPrototypeOf,a=new WeakMap,r=(e,t=!0)=>{a.set(e,t)},i=e=>"object"==typeof e&&null!==e,l=new WeakMap,c=new WeakSet,[d]=((e=Object.is,t=(e,t)=>new Proxy(e,t),s=e=>i(e)&&!c.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer),d=e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}},p=new WeakMap,u=(e,t,s=d)=>{const o=p.get(e);if((null==o?void 0:o[0])===t)return o[1];const n=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return r(n,!0),p.set(e,[t,n]),Reflect.ownKeys(e).forEach((t=>{if(Object.getOwnPropertyDescriptor(n,t))return;const o=Reflect.get(e,t),a={value:o,enumerable:!0,configurable:!0};if(c.has(o))r(o,!1);else if(o instanceof Promise)delete a.value,a.get=()=>s(o);else if(l.has(o)){const[e,t]=l.get(o);a.value=u(e,t(),s)}Object.defineProperty(n,t,a)})),Object.preventExtensions(n)},h=new WeakMap,f=[1,1],m=r=>{if(!i(r))throw new Error("object required");const d=h.get(r);if(d)return d;let p=f[0];const b=new Set,g=(e,t=++f[0])=>{p!==t&&(p=t,b.forEach((s=>s(e,t))))};let y=f[1];const v=e=>(t,s)=>{const o=[...t];o[1]=[e,...o[1]],g(o,s)},w=new Map,I=e=>{var t;const s=w.get(e);s&&(w.delete(e),null==(t=s[1])||t.call(s))},C=Array.isArray(r)?[]:Object.create(Object.getPrototypeOf(r)),W=t(C,{deleteProperty(e,t){const s=Reflect.get(e,t);I(t);const o=Reflect.deleteProperty(e,t);return o&&g(["delete",[t],s]),o},set(t,r,d,p){const u=Reflect.has(t,r),f=Reflect.get(t,r,p);if(u&&(e(f,d)||h.has(d)&&e(f,h.get(d))))return!0;var y;I(r),i(d)&&(d=(e=>e&&(a.has(e)?a.get(e):n(e)===Object.prototype||n(e)===Array.prototype))(y=d)&&y[o]||null||d);let C=d;if(d instanceof Promise)d.then((e=>{d.status="fulfilled",d.value=e,g(["resolve",[r],e])})).catch((e=>{d.status="rejected",d.reason=e,g(["reject",[r],e])}));else{!l.has(d)&&s(d)&&(C=m(d));const e=!c.has(C)&&l.get(C);e&&((e,t)=>{if(w.has(e))throw new Error("prop listener already exists");if(b.size){const s=t[3](v(e));w.set(e,[t,s])}else w.set(e,[t])})(r,e)}return Reflect.set(t,r,C,p),g(["set",[r],d,f]),!0}});h.set(r,W);const O=[C,(e=++f[1])=>(y===e||b.size||(y=e,w.forEach((([t])=>{const s=t[1](e);s>p&&(p=s)}))),p),u,e=>(b.add(e),1===b.size&&w.forEach((([e,t],s)=>{if(t)throw new Error("remove already exists");const o=e[3](v(s));w.set(s,[e,o])})),()=>{b.delete(e),0===b.size&&w.forEach((([e,t],s)=>{t&&(t(),w.set(s,[e]))}))})];return l.set(W,O),Reflect.ownKeys(r).forEach((e=>{const t=Object.getOwnPropertyDescriptor(r,e);"value"in t&&(W[e]=r[e],delete t.value,delete t.writable),Object.defineProperty(C,e,t)})),W})=>[m,l,c,e,t,s,d,p,u,h,f])();function p(e={}){return d(e)}function u(e,t,s){const o=l.get(e);let n;o||console.warn("Please use proxy object");const a=[],r=o[3];let i=!1;const c=r((e=>{a.push(e),s?t(a.splice(0)):n||(n=Promise.resolve().then((()=>{n=void 0,i&&t(a.splice(0))})))}));return i=!0,()=>{i=!1,c()}}var h=s(8287).hp;const f=p({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),m={state:f,subscribe:e=>u(f,(()=>e(f))),push(e,t){e!==f.view&&(f.view=e,t&&(f.data=t),f.history.push(e))},reset(e){f.view=e,f.history=[e]},replace(e){f.history.length>1&&(f.history[f.history.length-1]=e,f.view=e)},goBack(){if(f.history.length>1){f.history.pop();const[e]=f.history.slice(-1);f.view=e}},setData(e){f.data=e}},b={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile:()=>"undefined"!=typeof window&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)),isAndroid:()=>b.isMobile()&&navigator.userAgent.toLowerCase().includes("android"),isIos(){const e=navigator.userAgent.toLowerCase();return b.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl:e=>e.startsWith("http://")||e.startsWith("https://"),isArray:e=>Array.isArray(e)&&e.length>0,isTelegram:()=>"undefined"!=typeof window&&(Boolean(window.TelegramWebviewProxy)||Boolean(window.Telegram)||Boolean(window.TelegramWebviewProxyProto)),formatNativeUrl(e,t,s){if(b.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let o=e;return o.includes("://")||(o=e.replaceAll("/","").replaceAll(":",""),o=`${o}://`),o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s),`${o}wc?uri=${encodeURIComponent(t)}`},formatUniversalUrl(e,t,s){if(!b.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let o=e;if(o.startsWith("https://t.me")){const e=h.from(t).toString("base64").replace(/[=]/g,"");o.endsWith("/")&&(o=o.slice(0,-1)),this.setWalletConnectDeepLink(o,s);const n=new URL(o);return n.searchParams.set("startapp",e),n.toString()}return o.endsWith("/")||(o=`${o}/`),this.setWalletConnectDeepLink(o,s),`${o}wc?uri=${encodeURIComponent(t)}`},wait:async e=>new Promise((t=>{setTimeout(t,e)})),openHref(e,t){const s=this.isTelegram()?"_blank":t;window.open(e,s,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(b.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch(e){console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(b.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch(e){console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(b.WALLETCONNECT_DEEPLINK_CHOICE)}catch(e){console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{"undefined"!=typeof localStorage&&localStorage.setItem(b.WCM_VERSION,"2.7.0")}catch(e){console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=null==(e=m.state.data)?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},g=p({enabled:"undefined"!=typeof location&&(location.hostname.includes("localhost")||location.protocol.includes("https")),userSessionId:"",events:[],connectedWalletId:void 0}),y={state:g,subscribe:e=>u(g.events,(()=>e(function(e){const t=l.get(e);t||console.warn("Please use proxy object");const[s,o,n]=t;return n(s,o(),void 0)}(g.events[g.events.length-1])))),initialize(){g.enabled&&void 0!==(null==crypto?void 0:crypto.randomUUID)&&(g.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){g.connectedWalletId=e},click(e){if(g.enabled){const t={type:"CLICK",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}},track(e){if(g.enabled){const t={type:"TRACK",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}},view(e){if(g.enabled){const t={type:"VIEW",name:e.name,userSessionId:g.userSessionId,timestamp:Date.now(),data:e};g.events.push(t)}}},v=p({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),w={state:v,subscribe:e=>u(v,(()=>e(v))),setChains(e){v.chains=e},setWalletConnectUri(e){v.walletConnectUri=e},setIsCustomDesktop(e){v.isCustomDesktop=e},setIsCustomMobile(e){v.isCustomMobile=e},setIsDataLoaded(e){v.isDataLoaded=e},setIsUiLoaded(e){v.isUiLoaded=e},setIsAuth(e){v.isAuth=e}},I=p({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),C={state:I,subscribe:e=>u(I,(()=>e(I))),setConfig(e){var t,s;y.initialize(),w.setChains(e.chains),w.setIsAuth(Boolean(e.enableAuthMode)),w.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),w.setIsCustomDesktop(Boolean(null==(s=e.desktopWallets)?void 0:s.length)),b.setModalVersionInStorage(),Object.assign(I,e)}};var W=Object.defineProperty,O=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable,L=(e,t,s)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const A="https://explorer-api.walletconnect.com",k="wcm",M="js-2.7.0";async function P(e,t){const s=((e,t)=>{for(var s in t||(t={}))E.call(t,s)&&L(e,s,t[s]);if(O)for(var s of O(t))j.call(t,s)&&L(e,s,t[s]);return e})({sdkType:k,sdkVersion:M},t),o=new URL(e,A);return o.searchParams.append("projectId",C.state.projectId),Object.entries(s).forEach((([e,t])=>{t&&o.searchParams.append(e,String(t))})),(await fetch(o)).json()}const D=async e=>P("/w3m/v1/getDesktopListings",e),U=async e=>P("/w3m/v1/getMobileListings",e),S=async e=>P("/w3m/v1/getAllListings",e),N=e=>`${A}/w3m/v1/getWalletImage/${e}?projectId=${C.state.projectId}&sdkType=${k}&sdkVersion=${M}`,T=e=>`${A}/w3m/v1/getAssetImage/${e}?projectId=${C.state.projectId}&sdkType=${k}&sdkVersion=${M}`;var x=Object.defineProperty,R=Object.getOwnPropertySymbols,_=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,B=(e,t,s)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const H=b.isMobile(),V=p({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),K={state:V,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=C.state;if("NONE"===e||"ALL"===t&&!e)return V.recomendedWallets;if(b.isArray(e)){const t={recommendedIds:e.join(",")},{listings:s}=await S(t),o=Object.values(s);o.sort(((t,s)=>e.indexOf(t.id)-e.indexOf(s.id))),V.recomendedWallets=o}else{const{chains:e,isAuth:s}=w.state,o=null==e?void 0:e.join(","),n=b.isArray(t),a={page:1,sdks:s?"auth_v1":void 0,entries:b.RECOMMENDED_WALLET_AMOUNT,chains:o,version:2,excludedIds:n?t.join(","):void 0},{listings:r}=H?await U(a):await D(a);V.recomendedWallets=Object.values(r)}return V.recomendedWallets},async getWallets(e){const t=((e,t)=>{for(var s in t||(t={}))_.call(t,s)&&B(e,s,t[s]);if(R)for(var s of R(t))$.call(t,s)&&B(e,s,t[s]);return e})({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:o}=C.state,{recomendedWallets:n}=V;if("ALL"===o)return V.wallets;n.length?t.excludedIds=n.map((e=>e.id)).join(","):b.isArray(s)&&(t.excludedIds=s.join(",")),b.isArray(o)&&(t.excludedIds=[t.excludedIds,o].filter(Boolean).join(",")),w.state.isAuth&&(t.sdks="auth_v1");const{page:a,search:r}=e,{listings:i,total:l}=H?await U(t):await D(t),c=Object.values(i),d=r?"search":"wallets";return V[d]={listings:[...V[d].listings,...c],total:l,page:null!=a?a:1},{listings:c,total:l}},getWalletImageUrl:e=>N(e),getAssetImageUrl:e=>T(e),resetSearch(){V.search={listings:[],total:0,page:1}}},z=p({open:!1}),J={state:z,subscribe:e=>u(z,(()=>e(z))),open:async e=>new Promise((t=>{const{isUiLoaded:s,isDataLoaded:o}=w.state;if(b.removeWalletConnectDeepLink(),w.setWalletConnectUri(null==e?void 0:e.uri),w.setChains(null==e?void 0:e.chains),m.reset("ConnectWallet"),s&&o)z.open=!0,t();else{const e=setInterval((()=>{const s=w.state;s.isUiLoaded&&s.isDataLoaded&&(clearInterval(e),z.open=!0,t())}),200)}})),close(){z.open=!1}};var q=Object.defineProperty,Z=Object.getOwnPropertySymbols,F=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,Q=(e,t,s)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;const X=p({themeMode:"undefined"!=typeof matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),Y={state:X,subscribe:e=>u(X,(()=>e(X))),setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(X.themeMode=t),s&&(X.themeVariables=((e,t)=>{for(var s in t||(t={}))F.call(t,s)&&Q(e,s,t[s]);if(Z)for(var s of Z(t))G.call(t,s)&&Q(e,s,t[s]);return e})({},s))}},ee=p({open:!1,message:"",variant:"success"}),te={state:ee,subscribe:e=>u(ee,(()=>e(ee))),openToast(e,t){ee.open=!0,ee.message=e,ee.variant=t},closeToast(){ee.open=!1}}}}]);