(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{233:function(e,t,a){},256:function(e,t,a){"use strict";a.r(t);a(121),a(177);var r=a(0),c=a.n(r),s=a(56),n=a.n(s),i=a(120),o=(a(233),a(234),a(117)),d=a(8),l=a(116),h=a.n(l),m=a(1);var u=({header:e,children:t,footer:a,fullWidth:r})=>Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:h()("mx-auto h-full overflow-auto px-2",{"container max-w-screen-xl":!r,"w-full max-page-width":r}),children:[e&&Object(m.jsx)("div",{className:"py-4",children:e}),Object(m.jsx)("div",{className:"flex flex-col flex-1 overflow-auto pt-4",children:t})]}),a&&Object(m.jsx)(m.Fragment,{children:a})]});var j=()=>Object(m.jsxs)("div",{className:"header-main",children:[Object(m.jsx)("div",{className:"header-contact background-fruits--transparent",children:Object(m.jsx)("img",{className:"header-logo",src:"{{logo}}",alt:""})}),Object(m.jsxs)("nav",{className:"header-nav-bar",children:[Object(m.jsxs)("div",{className:"header-menu--mobile",children:[Object(m.jsx)("span",{className:"icon header-menu-icon--mobile",children:Object(m.jsx)("i",{className:"fas fa-bars"})}),Object(m.jsx)("p",{className:"header-menu__title",children:"MENU"})]}),Object(m.jsxs)("ul",{className:"header-menu",children:[Object(m.jsx)("li",{className:"header-menu__item",children:Object(m.jsx)("a",{className:"header-menu__link",href:"\\",children:"inicio"})}),Object(m.jsx)("li",{className:"header-menu__item",children:Object(m.jsx)("a",{className:"header-menu__link",href:"\\tienda",children:"tienda"})}),Object(m.jsx)("li",{className:"header-menu__item",children:Object(m.jsx)("a",{className:"header-menu__link",href:"\\contacto",children:"contacto"})})]})]})]});var O=()=>Object(m.jsx)(u,{header:Object(m.jsx)(j,{}),children:"Inicio"});var b=()=>Object(m.jsx)(u,{header:Object(m.jsx)(j,{}),children:"Contacto"});var p=()=>Object(m.jsx)(u,{header:Object(m.jsx)(j,{}),children:"Tienda"});class x extends r.Component{render(){return Object(m.jsx)(o.a,{children:Object(m.jsxs)(d.c,{children:[Object(m.jsx)(d.a,{exact:!0,path:"/",component:O}),Object(m.jsx)(d.a,{path:"/tienda",component:p}),Object(m.jsx)(d.a,{exact:!0,path:"/contacto",component:b})]})})}}var _=x,f=a(31),g=a(118),v=a(119);const T="START",N="FINISH",w="ERROR",R={loading:{},error:{}},y="FECTH_PRODUCTS",E="FECTH_PROMOTIONS",C="SHOW_PRODUCT_DETAIL",I="FILTER_BY_CATEGORY",S="FILTER_BY_PRODUCT";var A=a(28),k=a.n(A);const M=e=>e.data,D=async e=>{throw 401===e.response.status&&window.location.reload(!0),e};new class{constructor(){var e;k.a.defaults.baseURL="/api";const t=null!==(e=localStorage.getItem("token"))&&void 0!==e?e:"";this.setAuth(t)}setAuth(e){e?k.a.defaults.headers.common.authorization=`JWT ${e}`:delete k.a.defaults.headers.common.authorization}get(e,t={}){return k.a.get(e,t).then(M).catch(D)}post(e,t,a={}){return k.a.post(e,t,a).then(M).catch(D)}put(e,t,a={}){return k.a.put(e,t,a).then(M).catch(D)}patch(e,t,a={}){return k.a.patch(e,t,a).then(M).catch(D)}delete(e,t={}){return k.a.delete(e,t).then(M).catch(D)}};const F={products:[],product:{},promotions:[],categories:[],filter:{}},P="ADD_CART_ITEM",U="REMOVE_CART_ITEM",q="UPDATE_CART_ITEM",H="EMPTY_CART",J="SHOW_CART";var W=a(258);const L={items:[],show:!1},Y=Object(f.combineReducers)({ui:(e=R,{type:t,payload:a})=>{switch(t){case T:return{...e,loading:{...e.loading,[a]:!0},error:{...e.error,[a]:void 0}};case N:return{...e,loading:{...e.loading,[a]:!1},error:{...e.error,[a]:void 0}};case w:return{...e,loading:{...e.loading,[a.name]:!1},error:{...e.error,[a.name]:a.message}};default:return e}},showcase:(e=F,{type:t,payload:a})=>{switch(t){case y:return{...e,products:a};case C:return{...e,product:a};case S:case I:return{...e,product:{},filter:a};case E:return{...e,promotions:a};default:return e}},cart:(e=L,{type:t,payload:a})=>{switch(t){case P:let t;if(e.items.some((e=>e.id===a.id)))t=e.items.map((e=>(e.id===a.item.id&&(e.quantity+=a.item.quantity,e.quantity=e.quantity>e.stock?e.stock:e.quantity),e)));else{const r={...a,item_id:Object(W.a)()};t=e.items.concat(r)}return{...e,items:t};case U:return t=e.items.filter((({item_id:e})=>e!==a.id)),{...e,items:t};case q:return t=e.items.map((e=>e.item_id===a.item_id?{...e,...a}:e)),{...e,items:t};case H:return{...e,items:[]};case J:return{...e,...a};default:return e}}});const B=Object(f.createStore)(Y,function(){try{const e=sessionStorage.getItem("storeCache");if(null==e)return;return JSON.parse(e)}catch(e){return void console.warn(e)}}(),Object(g.composeWithDevTools)(Object(f.applyMiddleware)(v.a)));B.subscribe((()=>function(e){try{sessionStorage.setItem("storeCache",JSON.stringify(e))}catch(t){console.warn(t)}}(B.getState())));var z=B;const G=document.getElementById("app");n.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(i.a,{store:z,children:Object(m.jsx)(_,{})})}),G)}},[[256,1,2]]]);
//# sourceMappingURL=main.d3cd3d4f.chunk.js.map