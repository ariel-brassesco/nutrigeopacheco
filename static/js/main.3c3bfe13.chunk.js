(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{233:function(e,t,a){},256:function(e,t,a){"use strict";a.r(t);a(121),a(177);var c=a(0),r=a.n(c),s=a(57),n=a.n(s),o=a(45),i=(a(233),a(234),a(118)),l=a(8),d=a(117),h=a.n(d),u=a(1);var m=({header:e,children:t,footer:a,fullWidth:c})=>Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)("div",{className:h()("mx-auto h-full overflow-auto px-2",{"container max-w-screen-xl":!c,"w-full max-page-width":c}),children:[e&&Object(u.jsx)("div",{className:"py-4",children:e}),Object(u.jsx)("div",{className:"flex flex-col flex-1 overflow-auto pt-4",children:t})]}),a&&Object(u.jsx)(u.Fragment,{children:a})]});const j="FETCH_PLACE",p="START",O="FINISH",b="ERROR",x=e=>({type:p,payload:e}),f=e=>({type:O,payload:e}),_=(e,t="Error")=>({type:b,payload:{name:e,message:t}});var y=a(28),g=a.n(y);const v=e=>e.data,T=async e=>{throw 401===e.response.status&&window.location.reload(!0),e};const N=new class{constructor(){var e;g.a.defaults.baseURL="/api";const t=null!==(e=localStorage.getItem("token"))&&void 0!==e?e:"";this.setAuth(t)}setAuth(e){e?g.a.defaults.headers.common.authorization=`JWT ${e}`:delete g.a.defaults.headers.common.authorization}get(e,t={}){return g.a.get(e,t).then(v).catch(T)}post(e,t,a={}){return g.a.post(e,t,a).then(v).catch(T)}put(e,t,a={}){return g.a.put(e,t,a).then(v).catch(T)}patch(e,t,a={}){return g.a.patch(e,t,a).then(v).catch(T)}delete(e,t={}){return g.a.delete(e,t).then(v).catch(T)}},w="api/place/",E={place:{}},R=e=>e.place.place;var C=()=>{const e=Object(o.b)(),t=Object(o.c)(R);return Object(c.useEffect)((()=>{e((async e=>{e(x(j));try{const t=await N.get(w);e({type:j,payload:t}),e(f(j))}catch(t){e(_(j))}}))}),[e]),console.log(t),Object(u.jsxs)("div",{className:"header-main",children:[Object(u.jsx)("div",{className:"header-contact background-fruits--transparent",children:Object(u.jsx)("img",{className:"header-logo",src:t.logo,alt:""})}),Object(u.jsxs)("nav",{className:"header-nav-bar",children:[Object(u.jsxs)("div",{className:"header-menu--mobile",children:[Object(u.jsx)("span",{className:"icon header-menu-icon--mobile",children:Object(u.jsx)("i",{className:"fas fa-bars"})}),Object(u.jsx)("p",{className:"header-menu__title",children:"MENU"})]}),Object(u.jsxs)("ul",{className:"header-menu",children:[Object(u.jsx)("li",{className:"header-menu__item",children:Object(u.jsx)("a",{className:"header-menu__link",href:"\\",children:"inicio"})}),Object(u.jsx)("li",{className:"header-menu__item",children:Object(u.jsx)("a",{className:"header-menu__link",href:"\\tienda",children:"tienda"})}),Object(u.jsx)("li",{className:"header-menu__item",children:Object(u.jsx)("a",{className:"header-menu__link",href:"\\contacto",children:"contacto"})})]})]})]})};var I=()=>Object(u.jsx)(m,{header:Object(u.jsx)(C,{}),children:"Inicio"});var S=()=>Object(u.jsx)(m,{header:Object(u.jsx)(C,{}),children:"Contacto"});var A=()=>Object(u.jsx)(m,{header:Object(u.jsx)(C,{}),children:"Tienda"});class k extends c.Component{render(){return Object(u.jsx)(i.a,{children:Object(u.jsxs)(l.c,{children:[Object(u.jsx)(l.a,{exact:!0,path:"/",component:I}),Object(u.jsx)(l.a,{path:"/tienda",component:A}),Object(u.jsx)(l.a,{exact:!0,path:"/contacto",component:S})]})})}}var M=k,D=a(31),F=a(119),P=a(120);const H={loading:{},error:{}},U="FECTH_PRODUCTS",q="FECTH_PROMOTIONS",J="SHOW_PRODUCT_DETAIL",L="FILTER_BY_CATEGORY",W="FILTER_BY_PRODUCT",Y={products:[],product:{},promotions:[],categories:[],filter:{}},B="ADD_CART_ITEM",z="REMOVE_CART_ITEM",G="UPDATE_CART_ITEM",V="EMPTY_CART",$="SHOW_CART";var K=a(258);const Q={items:[],show:!1},X=Object(D.combineReducers)({ui:(e=H,{type:t,payload:a})=>{switch(t){case p:return{...e,loading:{...e.loading,[a]:!0},error:{...e.error,[a]:void 0}};case O:return{...e,loading:{...e.loading,[a]:!1},error:{...e.error,[a]:void 0}};case b:return{...e,loading:{...e.loading,[a.name]:!1},error:{...e.error,[a.name]:a.message}};default:return e}},showcase:(e=Y,{type:t,payload:a})=>{switch(t){case U:return{...e,products:a};case J:return{...e,product:a};case W:case L:return{...e,product:{},filter:a};case q:return{...e,promotions:a};default:return e}},cart:(e=Q,{type:t,payload:a})=>{switch(t){case B:let t;if(e.items.some((e=>e.id===a.id)))t=e.items.map((e=>(e.id===a.item.id&&(e.quantity+=a.item.quantity,e.quantity=e.quantity>e.stock?e.stock:e.quantity),e)));else{const c={...a,item_id:Object(K.a)()};t=e.items.concat(c)}return{...e,items:t};case z:return t=e.items.filter((({item_id:e})=>e!==a.id)),{...e,items:t};case G:return t=e.items.map((e=>e.item_id===a.item_id?{...e,...a}:e)),{...e,items:t};case V:return{...e,items:[]};case $:return{...e,...a};default:return e}},place:(e=E,{type:t,payload:a})=>{switch(t){case j:return{...e,place:a};default:return e}}});const Z=Object(D.createStore)(X,function(){try{const e=sessionStorage.getItem("storeCache");if(null==e)return;return JSON.parse(e)}catch(e){return void console.warn(e)}}(),Object(F.composeWithDevTools)(Object(D.applyMiddleware)(P.a)));Z.subscribe((()=>function(e){try{sessionStorage.setItem("storeCache",JSON.stringify(e))}catch(t){console.warn(t)}}(Z.getState())));var ee=Z;const te=document.getElementById("app");n.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(o.a,{store:ee,children:Object(u.jsx)(M,{})})}),te)}},[[256,1,2]]]);
//# sourceMappingURL=main.3c3bfe13.chunk.js.map