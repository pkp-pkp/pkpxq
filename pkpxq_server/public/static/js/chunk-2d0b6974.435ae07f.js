(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6974"],{"1e8b":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"用户昵称",prop:"nickname"}},[n("el-input",{attrs:{maxlength:"30"},model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v("保存")]),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.close}},[e._v("关闭")])],1)],1)},i=[],o=n("c0c7"),s={props:{user:{type:Object}},data:function(){return{form:{},rules:{nickname:[{required:!0,message:"用户昵称不能为空",trigger:"blur"}]}}},watch:{user:{handler:function(e){e&&(this.form={nickname:e.nickname})},immediate:!0}},methods:{submit:function(){var e=this;this.$refs["form"].validate((function(t){t&&Object(o["i"])(e.form).then((function(t){e.$modal.msgSuccess("修改成功")}))}))},close:function(){this.$tab.closePage()}}},a=s,c=n("2877"),l=Object(c["a"])(a,r,i,!1,null,null,null);t["default"]=l.exports}}]);