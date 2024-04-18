<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
    :multiple="multiple"
    accept="image/*"
  >
    <slot>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </slot>
  </el-upload>
</template>
<script>
import {getToken} from "@/utils/auth";

export default {
  emits:['upload-success'],
  props:{
    imgUrl:{
      type:String,
      default:''
    },
    multiple:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    imgUrl(){
      this.imageUrl = this.imgUrl
    }
  },
  created() {
    this.imageUrl = this.imgUrl
  },
  data() {
    return {
      action: process.env.VUE_APP_BASE_API + '/upload',
      imageUrl: '',
      headers: { Authorization: 'Bearer ' + getToken() }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if(res.code==200){
        this.$emit('upload-success',res.data)
      }
    }
  }
}
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
