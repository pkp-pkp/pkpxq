<template>
  <el-form label-width="80px">
    <el-form-item label="公告内容">
      <el-input
        v-model="notice.text"
        placeholder="请输入公告内容"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="handleNoticeUpdate">修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {_updateApp} from "@/api/system/app";

export default {
  props:{
    notice:Object,
    default:{}
  },
  methods: {
    handleNoticeUpdate(){
      _updateApp({name:'notice',value:this.notice}).then(res=>{
        this.$modal.msgSuccess(res.msg)
      })
    }
  },
}
</script>


<style scoped>

</style>
