(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20fe0d"],{b603:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],ref:"queryForm",attrs:{model:e.queryParams,size:"small",inline:!0,"label-width":"68px"}},[a("el-form-item",{attrs:{label:"用户ID",prop:"id"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.id,callback:function(t){e.$set(e.queryParams,"id",t)},expression:"queryParams.id"}})],1),a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.username,callback:function(t){e.$set(e.queryParams,"username",t)},expression:"queryParams.username"}})],1),a("el-form-item",{attrs:{label:"电话号码",prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入电话号码",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.mobile,callback:function(t){e.$set(e.queryParams,"mobile",t)},expression:"queryParams.mobile"}})],1),a("el-form-item",{attrs:{label:"性别",prop:"sex"}},[a("el-select",{attrs:{placeholder:"请选择性别",clearable:""},model:{value:e.queryParams.sex,callback:function(t){e.$set(e.queryParams,"sex",t)},expression:"queryParams.sex"}},e._l(e.dict.type.user_sex,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"注册渠道",prop:"sex"}},[a("el-select",{attrs:{placeholder:"请选择注册渠道",clearable:""},model:{value:e.queryParams.terminal,callback:function(t){e.$set(e.queryParams,"terminal",t)},expression:"queryParams.terminal"}},e._l(e.dict.type.user_terminal,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",{attrs:{label:"昵称",prop:"nickname"}},[a("el-input",{attrs:{placeholder:"请输入昵称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleQuery(t)}},model:{value:e.queryParams.nickname,callback:function(t){e.$set(e.queryParams,"nickname",t)},expression:"queryParams.nickname"}})],1),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{"value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.queryParams.status,callback:function(t){e.$set(e.queryParams,"status",t)},expression:"queryParams.status"}},e._l(e.dict.type.sys_normal_disable,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),a("el-row",{staticClass:"mb8",attrs:{gutter:10}},[a("el-col",{attrs:{span:1.5}},[a("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("删除")])],1),a("right-toolbar",{attrs:{showSearch:e.showSearch,columns:e.columns},on:{"update:showSearch":function(t){e.showSearch=t},"update:show-search":function(t){e.showSearch=t},queryTable:e.getList}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.userList},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e.columns[0].visible?a("el-table-column",{attrs:{label:"ID",align:"center",prop:"id"}}):e._e(),e.columns[1].visible?a("el-table-column",{attrs:{label:"头像",align:"center",prop:"avatar",width:"100"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("image-preview",{attrs:{src:e.row.avatar,width:50,height:50,"border-radius":"50%"}})]}}],null,!1,3836311820)}):e._e(),e.columns[2].visible?a("el-table-column",{attrs:{label:"小程序用户唯一标识",align:"center",prop:"openid"}}):e._e(),e.columns[3].visible?a("el-table-column",{attrs:{label:"用户名",align:"center",prop:"username"}}):e._e(),e.columns[4].visible?a("el-table-column",{attrs:{label:"电话号码",align:"center",prop:"mobile"}}):e._e(),e.columns[5].visible?a("el-table-column",{attrs:{label:"性别",align:"center",prop:"sex"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("dict-tag",{attrs:{options:e.dict.type.user_sex,value:t.row.sex}})]}}],null,!1,826873645)}):e._e(),e.columns[6].visible?a("el-table-column",{attrs:{label:"年龄",align:"center",prop:"age"}}):e._e(),e.columns[7].visible?a("el-table-column",{attrs:{label:"昵称",align:"center",prop:"nickname"}}):e._e(),e.columns[8].visible?a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"createTime",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.parseTime(t.row.createTime,"{y}-{m}-{d}")))])]}}],null,!1,3484357996)}):e._e(),e.columns[9].visible?a("el-table-column",{key:"status",attrs:{label:"状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":"0","inactive-value":"1"},on:{change:function(a){return e.handleStatusChange(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}],null,!1,3955094654)}):e._e(),e.columns[10].visible?a("el-table-column",{key:"terminal",attrs:{label:"注册渠道",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("dict-tag",{attrs:{options:e.dict.type.user_terminal,value:t.row.terminal}})]}}],null,!1,1962066061)}):e._e(),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.queryParams.page,limit:e.queryParams.pageSize},on:{"update:page":function(t){return e.$set(e.queryParams,"page",t)},"update:limit":function(t){return e.$set(e.queryParams,"pageSize",t)},pagination:e.getList}})],1)},n=[],r=(a("d81d"),a("b775"));function s(e){return Object(r["a"])({url:"/user/list",method:"get",params:e})}function i(e,t){return Object(r["a"])({url:"/user/changeStatus",method:"put",data:{userId:e,status:t}})}function u(e){return Object(r["a"])({url:"/user/"+e,method:"delete"})}var o={name:"User",dicts:["user_sex","sys_normal_disable","user_terminal"],data:function(){return{loading:!0,ids:[],single:!0,multiple:!0,showSearch:!0,total:0,userList:[],dateRange:[],title:"",queryParams:{page:1,pageSize:10,id:null,mobile:null,sex:null,nickname:null,status:null},columns:[{key:0,label:"ID",visible:!0},{key:1,label:"头像",visible:!0},{key:2,label:"小程序用户唯一标识",visible:!0},{key:3,label:"用户名",visible:!0},{key:4,label:"电话号码",visible:!0},{key:5,label:"性别",visible:!0},{key:6,label:"年龄",visible:!0},{key:7,label:"昵称",visible:!0},{key:8,label:"创建时间",visible:!0},{key:9,label:"状态",visible:!0},{key:9,label:"用户类别",visible:!0}]}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.loading=!0,s(this.addDateRange(this.queryParams,this.dateRange)).then((function(t){e.userList=t.data.records,e.total=t.data.total,e.loading=!1}))},handleQuery:function(){this.queryParams.page=1,this.getList()},resetQuery:function(){this.resetForm("queryForm"),this.handleQuery()},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.id})),this.single=1!==e.length,this.multiple=!e.length},handleDelete:function(e){var t=this,a=e.id||this.ids;this.$modal.confirm('是否确认删除用户编号为"'+a+'"的数据项？').then((function(){return u(a)})).then((function(){t.getList(),t.$modal.msgSuccess("删除成功")})).catch((function(){}))},handleStatusChange:function(e){var t=this,a="0"===e.status?"白名单":"黑名单";i(e.id,e.status).then((function(e){t.$modal.msgSuccess(a+"成功")})).catch((function(t){e.status="0"===e.status?"1":"0"}))}}},c=o,m=a("2877"),d=Object(m["a"])(c,l,n,!1,null,null,null);t["default"]=d.exports}}]);