import{a as h,s as R,S as I,r as m,i as M,b as V,u as Y,l as T,j as P,k as W}from"./index.01cba2e9.js";const de=({links:e})=>h("div",{"data-testid":"product-header",className:R.header,children:h(I,{links:e,isLink:!0,usingDots:!0,autoScroll:!0,className:R.slider,maxSlideLength:e.length})});let q=!0;const fe=(e,t,r)=>{const c=()=>{switch(t){case"phone":return e;case"laptop":return e;default:return t}},[o,n]=m.exports.useState(c()),[i,s]=m.exports.useState(e.slug),a=l=>s(l);return m.exports.useEffect(()=>{if(q){q=!1;return}(async()=>{const p=await M(o.category,i);!p||!p.length||p&&n(p[0])})()},[i,o.category]),{currentProduct:o,changeCurrentStorage:a,setCurrentUrl:s}};var D={exports:{}},B="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",H=B,A=H;function U(){}function N(){}N.resetWarningCache=U;var X=function(){function e(c,o,n,i,s,a){if(a!==A){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}e.isRequired=e;function t(){return e}var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:N,resetWarningCache:U};return r.PropTypes=r,r};D.exports=X();var z=function(t,r,c,o){var n=c?c.call(o,t,r):void 0;if(n!==void 0)return!!n;if(t===r)return!0;if(typeof t!="object"||!t||typeof r!="object"||!r)return!1;var i=Object.keys(t),s=Object.keys(r);if(i.length!==s.length)return!1;for(var a=Object.prototype.hasOwnProperty.bind(r),l=0;l<i.length;l++){var p=i[l];if(!a(p))return!1;var _=t[p],y=r[p];if(n=c?c.call(o,_,y,p):void 0,n===!1||n===void 0&&_!==y)return!1}return!0};function Q(e){return e&&typeof e=="object"&&"default"in e?e.default:e}var $=m.exports,G=Q($),J=Q(z);function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function K(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var Z=!!(typeof window<"u"&&window.document&&window.document.createElement);function ee(e,t,r){if(typeof e!="function")throw new Error("Expected reducePropsToState to be a function.");if(typeof t!="function")throw new Error("Expected handleStateChangeOnClient to be a function.");if(typeof r<"u"&&typeof r!="function")throw new Error("Expected mapStateOnServer to either be undefined or a function.");function c(o){return o.displayName||o.name||"Component"}return function(n){if(typeof n!="function")throw new Error("Expected WrappedComponent to be a React component.");var i=[],s;function a(){s=e(i.map(function(p){return p.props})),l.canUseDOM?t(s):r&&(s=r(s))}var l=function(p){K(_,p);function _(){return p.apply(this,arguments)||this}_.peek=function(){return s},_.rewind=function(){if(_.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var d=s;return s=void 0,i=[],d};var y=_.prototype;return y.shouldComponentUpdate=function(d){return!J(d,this.props)},y.componentWillMount=function(){i.push(this),a()},y.componentDidUpdate=function(){a()},y.componentWillUnmount=function(){var d=i.indexOf(this);i.splice(d,1),a()},y.render=function(){return G.createElement(n,this.props)},_}($.Component);return C(l,"displayName","SideEffect("+c(n)+")"),C(l,"canUseDOM",Z),l}}var te=ee,j=m.exports,re=D.exports,ne=te;function oe(e){var t=e[e.length-1];if(t)return t.title}function ie(e){var t=e||"";t!==document.title&&(document.title=t)}function O(){}O.prototype=Object.create(j.Component.prototype);O.displayName="DocumentTitle";O.propTypes={title:re.string.isRequired};O.prototype.render=function(){return this.props.children?j.Children.only(this.props.children):null};var ye=ne(oe,ie)(O);const ce="_active_1ljei_22",f={"product-filter__list":"_product-filter__list_1ljei_13",active:ce,"product-filter__item":"_product-filter__item_1ljei_25","product-filter__btn":"_product-filter__btn_1ljei_49","product-filter__firm-btn":"_product-filter__firm-btn_1ljei_49","product-filter":"_product-filter_1ljei_13","product-filter__list-child":"_product-filter__list-child_1ljei_67","product-filter__options":"_product-filter__options_1ljei_104","product-filter__actions":"_product-filter__actions_1ljei_104","product-filter__firms":"_product-filter__firms_1ljei_123"},L={keys:[],values:[],query:[]},se=(e,t)=>{const{type:r,payload:c}=t;switch(r){case"ADD_QUERY":return{...e,values:[...e.values,c.value],keys:[...e.keys,c.key],query:[...e.query,{[c.key]:c.value}]};case"REMOVE_QUERY":const o=e.keys,n=e.values;return o.splice(o.indexOf(t.payload.key),1),n.splice(n.indexOf(t.payload.value),1),{query:e.query.filter(i=>i[c.key]!==c.value),keys:o,values:n};case"CREATE_QUERY":return{...e};default:return L}},ae=e=>{const t=V(),{pathname:r}=Y(),[c,o]=m.exports.useState(!1),[n,i]=m.exports.useReducer(se,L),[s,a]=m.exports.useState("");return{isOpenFilterBox:c,setIsOpenFilterBox:o,currentFilterBox:s,setCurrentFilterBox:a,addToFilterQuery:y=>{var g,v,w,b,F;const u=y.target,d={...(g=u.closest("button"))==null?void 0:g.dataset};n.query.some((k,x)=>Object.keys(d).length===2?T.isEqual({...k,...n.query[x+1]},d):T.isEqual(k,d))?((v=u.closest("button"))==null||v.classList.remove(f.active),(w=u.closest("li"))==null||w.classList.remove(f.active)):((b=u.closest("button"))==null||b.classList.add(f.active),(F=u.closest("li"))==null||F.classList.add(f.active)),Object.entries(d).forEach(k=>{const[x,S]=k;if(n.query&&n.values.includes(S)&&n.keys.includes(x))return i({type:"REMOVE_QUERY",payload:{key:x,value:S}});i({type:"ADD_QUERY",payload:{key:x,value:S}})})},unQueryFilter:y=>{var E,g;const u=(g=(E=y.target.parentElement)==null?void 0:E.parentElement)==null?void 0:g.querySelectorAll(`.${f["product-filter__btn"]}`);[...u].map(v=>Object.entries(v.dataset)).forEach(v=>{const[w,b]=v[0];i({type:"REMOVE_QUERY",payload:{key:w,value:b}})}),o(!1),u.forEach(v=>v.classList.remove(f.active))},queryFilter:async()=>{const y=n.keys.reduce((u,d,E)=>["lt","gte","gt","lte"].includes(d)?u+=`&price[${d}]=${n.values[E]}`:u+=`&${d}=${n.values[E]}`,"");o(!1),t({pathname:r,search:y})}}},ue=({isOpenFilterBox:e,currentFilterBox:t,filter:r,setIsOpenFilterBox:c,setCurrentFilterBox:o,addToFilterQuery:n,unQueryFilter:i,queryFilter:s})=>P("li",{className:`${f["product-filter__item"]} ${e&&t===r.title?f.active:""} `,children:[P("button",{onClick:()=>{c(a=>!a),o(r.title)},className:`${f["product-filter__btn"]} product-filter__btn-box flex-vt-ct`,children:[r.title," ",h(W,{})]}),P("ul",{className:f["product-filter__list-child"],children:[h("div",{className:`${f["product-filter__options"]}  flex-vt-ct gap-12px`,children:r.content&&r.content.map(a=>{const{content:l,id:p,..._}=a;return m.exports.createElement("button",{..._,key:p,onClick:n,className:`${f["product-filter__btn"]} `},a.content)})}),P("div",{className:`${f["product-filter__actions"]} flex-both-ct gap-12px`,children:[h("button",{onClick:i,children:"B\u1ECF ch\u1ECDn"}),h("button",{onClick:s,children:"Xem k\u1EBFt qu\u1EA3"})]})]})]},r.id),le=({filterList:e,isOpenFilterBox:t,currentFilterBox:r,setIsOpenFilterBox:c,setCurrentFilterBox:o,addToFilterQuery:n,unQueryFilter:i,queryFilter:s})=>h("ul",{className:`${f["product-filter__list"]} flex-vt-ct gap-12px`,children:e.map(a=>h(ue,{filter:a,setCurrentFilterBox:o,queryFilter:s,unQueryFilter:i,addToFilterQuery:n,isOpenFilterBox:t,currentFilterBox:r,setIsOpenFilterBox:c},a.id))}),_e=({filterList:e,resource:t})=>{const{isOpenFilterBox:r,setIsOpenFilterBox:c,currentFilterBox:o,setCurrentFilterBox:n,addToFilterQuery:i,unQueryFilter:s,queryFilter:a}=ae();return h("div",{className:f["product-filter"],children:h(le,{filterList:e,setCurrentFilterBox:n,queryFilter:a,unQueryFilter:s,addToFilterQuery:i,isOpenFilterBox:r,currentFilterBox:o,setIsOpenFilterBox:c})})};export{de as P,_e as a,ye as r,fe as u};
