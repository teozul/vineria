"use strict";(self["webpackChunkvineria"]=self["webpackChunkvineria"]||[]).push([[276],{1276:function(e,a,n){n.r(a),n.d(a,{default:function(){return g}});n(4114);var t=n(6768),i=n(4232),s=n(144),r=n(1387),l=n(8811),u=n(6277);const o={class:"edit-wine-view"},c={key:0,class:"loading-indicator"},d={key:1,class:"error-message"},h={class:"card"};var v=(0,t.pM)({__name:"EditWineView",setup(e){const a=(0,r.rd)(),n=(0,r.lq)(),v=n.params.id,w=(0,s.KR)(null),k=(0,s.KR)(!0),g=(0,s.KR)(null);(0,t.sV)((async()=>{try{const e=await u.wj.getSheetById(v);e?w.value=e:g.value="Wine tasting sheet not found."}catch(e){console.error("Error loading wine sheet:",e),g.value="There was an error loading the wine tasting sheet."}finally{k.value=!1}}));const p=async e=>{try{await u.wj.updateSheet(e),a.push({name:"detail",params:{id:e.id}})}catch(n){console.error("Error updating wine sheet:",n),alert("There was an error updating the wine tasting sheet. Please try again.")}},y=()=>{a.back()};return(e,a)=>((0,t.uX)(),(0,t.CE)("div",o,[a[2]||(a[2]=(0,t.Lk)("div",{class:"page-header"},[(0,t.Lk)("h1",null,"Edit Wine Tasting Sheet")],-1)),k.value?((0,t.uX)(),(0,t.CE)("div",c,a[0]||(a[0]=[(0,t.Lk)("p",null,"Loading wine tasting sheet...",-1)]))):g.value?((0,t.uX)(),(0,t.CE)("div",d,[(0,t.Lk)("div",h,[a[1]||(a[1]=(0,t.Lk)("h3",null,"Error",-1)),(0,t.Lk)("p",null,(0,i.v_)(g.value),1),(0,t.Lk)("button",{onClick:y,class:"btn"},"Go Back")])])):((0,t.uX)(),(0,t.Wv)(l.A,{key:2,wineSheet:w.value,isEdit:!0,onSave:p,onCancel:y},null,8,["wineSheet"]))]))}}),w=n(1241);const k=(0,w.A)(v,[["__scopeId","data-v-f51deb2a"]]);var g=k}}]);
//# sourceMappingURL=276.2b129baa.js.map