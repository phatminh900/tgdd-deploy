import{u as h,j as s,a as r,R as i,L as c,G as _,b as d,I as m,A as u,r as g,c as y,J as O,d as v,O as E}from"./index.01cba2e9.js";const x="_active_o5hi9_23",a={"order-history__navigation":"_order-history__navigation_o5hi9_13",active:x},N=()=>{const{pathname:e}=h();return s("div",{children:[r("div",{className:`${a["order-history__navigation"]} ${(e===i.ORDER_HISTORY||e.includes(`${i.ORDER_HISTORY}/`)&&!e.includes(i.PERSONAL_INFORMATION))&&a.active}`,children:s(c,{to:i.ORDER_HISTORY,children:[r(_,{})," Danh s\xE1ch \u0111\u01A1n h\xE0ng \u0111\xE3 mua"]})}),r("div",{className:`${a["order-history__navigation"]} ${e.includes(i.PERSONAL_INFORMATION)&&a.active}`,children:s(c,{to:i.PERSONAL_INFORMATION,children:[r(_,{})," Th\xF4ng tin c\xE1 nh\xE2n"]})})]})},n={"order-history":"_order-history_17mmu_13","order-history__greeting":"_order-history__greeting_17mmu_24","order-history__greeting--small":"_order-history__greeting--small_17mmu_27","order-history__info-title":"_order-history__info-title_17mmu_42","order-history__list-box":"_order-history__list-box_17mmu_46","order-history__btn-logout":"_order-history__btn-logout_17mmu_65"},p=({user:e,auth:t})=>{const o=d();return s("div",{className:`${n["order-history__greeting"]} flex-space-between`,children:[s("h3",{children:["Ch\xE0o ",r("span",{children:e.name})," -",r("span",{children:e.email})]}),r("button",{onClick:()=>{t==null||t.removeUserHandler(),o(i.HOME_PAGE)},children:"Tho\xE1t t\xE0i kho\u1EA3n"})]})},R=({user:e,auth:t})=>{const o=d();return s("div",{className:`${n["order-history__greeting--small"]}`,children:[s("div",{className:"flex-vt-ct gap-12px",children:[r("p",{className:`${n["order-history__info-title"]} text-bold `,children:"Th\xF4ng tin c\xE1 nh\xE2n"}),s(c,{className:"color-tertiary",to:i.PERSONAL_INFORMATION,children:["Ch\u1EC9nh s\u1EEDa"," "]}),r("button",{className:`${n["order-history__btn-logout"]} color-tertiary`,onClick:()=>{t==null||t.removeUserHandler(),o(i.HOME_PAGE)},children:"\u0110\u0103ng xu\u1EA5t"})]}),s("div",{children:[s("p",{"data-testid":"user-name",className:"flex-vt-ct gap-8px",children:[r(m,{})," ",e.name]}),s("p",{"data-testid":"user-email",className:"flex-vt-ct gap-8px",children:[r(u,{})," ",e.email]})]})]})},A=e=>{const t=d(),{pathname:o}=h(),l=e==null?void 0:e.user;return g.exports.useEffect(()=>{(!l||!y.get(O))&&t(`${i.LOGIN}`,{replace:!0,state:{prevPath:o}})},[t,l,o]),l},f=()=>{const e=v(),t=A(e);return t?s("section",{"data-testid":"order-history-container",className:n["order-history"],children:[r(N,{}),s("div",{children:[r(p,{user:t,auth:e}),r(R,{user:t,auth:e}),r("div",{className:n["order-history__list-box"],children:r(E,{})})]})]}):null};export{f as default};
