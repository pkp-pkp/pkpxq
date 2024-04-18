<template>
  <div>
    <Draggable v-model="banner" group="banner" @change="saveBanner">
      <transition-group tag="div" class="list">
        <div v-for="(item,index) in banner" :key="item" class="item">
          <ImagePreview :src="item" width="300px"></ImagePreview>
          <div class="close" @click="delItem(index)">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </transition-group>
    </Draggable>
    <div class="upload-btn">
      <ImageCropper :auto-crop-height="109" :auto-crop-width="300" @upload-success="uploadSuccess">
        <el-button type="warning" icon="el-icon-plus" circle style="font-size: 30px"></el-button>
      </ImageCropper>
    </div>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
import ImageCropper from "@/components/ImageCropper/index.vue";
import {_updateApp} from "@/api/system/app";
export default {
  components:{Draggable,ImageCropper},
  props:{
    list:Array,
  },
  data() {
    return {
      banner: []
    }
  },
  watch:{
    list(val){
      this.banner = val
    }
  },
  methods: {
    async saveBanner() {
      _updateApp({name:'banner',value:this.banner}).then(res=>{
        this.$modal.msgSuccess('修改成功')
      })
    },
    uploadSuccess({filePath}){
      this.banner.push(filePath)
      this.saveBanner()
    },
    delItem(index){
      this.banner.splice(index,1)
      this.saveBanner()
    }
  },
}
</script>


<style lang="scss" scoped>
.list{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .item{
    position: relative;
    &:hover .close {
      visibility: visible;
    }

    .close {
      visibility: hidden;
      position: absolute;
      top: 0;
      right: 10px;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }
  }
}
.upload-btn{
  position: fixed;
  right: 40px;
}
</style>
