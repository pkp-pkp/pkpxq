<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="公告管理" name="notice">
        <Notice :notice="appConfig.notice"/>
      </el-tab-pane>
      <el-tab-pane label="轮播图管理" name="banner">
        <Banner :list="appConfig.banner"></Banner>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import {_getAppList} from "@/api/system/app";
import Notice from "./components/notice.vue";
import Banner from "./components/banner.vue";
export default {
  components:{Notice,Banner},
  data() {
    return {
      activeName:'banner',
      appConfig:{
        notice:{},
        banner:[]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      _getAppList().then(res=>{
        this.appConfig = res.data
      })
    }
  },
}
</script>

<style scoped lang="scss">
.container{
  padding: 20px;
}
</style>
