(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c498d"],{"3c07":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],ref:"queryForm",attrs:{model:e.queryParams,size:"small",inline:!0,"label-width":"68px"}},[a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{staticStyle:{width:"240px"},attrs:{"value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.handleQuery}},[e._v("搜索")]),a("el-button",{attrs:{icon:"el-icon-refresh",size:"mini"},on:{click:e.resetQuery}},[e._v("重置")])],1)],1),a("el-row",{staticClass:"mb8",attrs:{gutter:10}},[a("el-col",{attrs:{span:1.5}},[a("el-button",{attrs:{type:"danger",plain:"",icon:"el-icon-delete",size:"mini",disabled:e.multiple},on:{click:e.handleDelete}},[e._v("删除 ")])],1),a("right-toolbar",{attrs:{showSearch:e.showSearch},on:{"update:showSearch":function(t){e.showSearch=t},"update:show-search":function(t){e.showSearch=t},queryTable:e.getList}})],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.uploadList},on:{"selection-change":e.handleSelectionChange,"cell-dblclick":e.cellDbClick}},[a("el-table-column",{attrs:{type:"selection",width:"50",align:"center"}}),a("el-table-column",{attrs:{label:"ID",align:"center",prop:"id"}}),a("el-table-column",{attrs:{label:"用户ID",align:"center",prop:"userId"}}),a("el-table-column",{attrs:{label:"管理员ID",align:"center",prop:"adminId"}}),a("el-table-column",{attrs:{label:"文件路径",width:"200",align:"center",prop:"path","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"创建时间",align:"center",prop:"createTime",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.parseTime(t.row.createTime,"{y}-{m}-{d}")))])]}}])}),a("el-table-column",{attrs:{label:"下载次数",align:"center",prop:"downTimes"}}),a("el-table-column",{attrs:{label:"预览",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-picture-outline"},on:{click:function(a){return e.imgPreview(t.row.path)}}},[e._v("预览")])]}}])}),a("el-table-column",{attrs:{label:"下载",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-download"},on:{click:function(a){return e.toDownLoad(t.row.path)}}},[e._v("下载")])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-delete"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除 ")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.queryParams.page,limit:e.queryParams.pageSize},on:{"update:page":function(t){return e.$set(e.queryParams,"page",t)},"update:limit":function(t){return e.$set(e.queryParams,"pageSize",t)},pagination:e.getList}})],1)},l=[],i=(a("d81d"),a("b775"));function r(e){return Object(i["a"])({url:"/upload/list",method:"get",params:e})}function o(e){return Object(i["a"])({url:"/upload/"+e,method:"delete"})}var s={name:"Upload",data:function(){return{loading:!0,ids:[],single:!0,multiple:!0,showSearch:!0,dateRange:[],total:0,uploadList:[],title:"",open:!1,queryParams:{page:1,pageSize:10,userId:null,adminId:null,path:null,createTime:null,deleteTime:null,downTimes:null,isDelete:null},form:{},rules:{path:[{required:!0,message:"文件路径不能为空",trigger:"blur"}],createTime:[{required:!0,message:"创建时间不能为空",trigger:"blur"}],downTimes:[{required:!0,message:"下载次数不能为空",trigger:"blur"}],isDelete:[{required:!0,message:"是否删除不能为空",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.loading=!0,r(this.addDateRange(this.queryParams,this.dateRange)).then((function(t){e.uploadList=t.data.records,console.log(e.uploadList),e.total=t.data.total,e.loading=!1}))},cancel:function(){this.open=!1,this.reset()},reset:function(){this.form={id:null,userId:null,adminId:null,path:null,createTime:null,deleteTime:null,downTimes:null,isDelete:null},this.resetForm("form")},handleQuery:function(){this.queryParams.page=1,this.getList()},resetQuery:function(){this.resetForm("queryForm"),this.handleQuery()},handleSelectionChange:function(e){this.ids=e.map((function(e){return e.id})),this.single=1!==e.length,this.multiple=!e.length},handleDelete:function(e){var t=this,a=e.id||this.ids;this.$modal.confirm('是否确认删除下载记录编号为"'+a+'"的数据项？').then((function(){return o(a)})).then((function(){t.getList(),t.$modal.msgSuccess("删除成功")})).catch((function(){}))},cellDbClick:function(e,t,a,n){var l=this;n.preventDefault(),"path"===t.property&&navigator.clipboard.writeText(e.path).then((function(e){l.$message.success("复制成功")})).catch((function(e){l.$message.error("复制失败")}))},imgPreview:function(e){var t=this;this.$imagePreview({urlList:[e],onError:function(){t.$message.error("图片加载失败，或文件不是图片")}})},toDownLoad:function(e){this.$download.file(e)}}},c=s,u=a("2877"),d=Object(u["a"])(c,n,l,!1,null,null,null);t["default"]=d.exports}}]);