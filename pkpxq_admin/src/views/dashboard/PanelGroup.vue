<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-for="(item,index) in list" :key="index" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div :class="['card-panel',idx===index?'active':'' ]" @click="handleSetLineChartData(item,index)">
        <div :class="'card-panel-icon-wrapper icon-'+(index+1)">
          <svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ item.label }}
          </div>
          <count-to :start-val="0" :end-val="info[item.valueKey] || 0" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props:{
    info: {
      type: Object
    }
  },
  data() {
    return {
      idx: 0,
      list:[
        {key:'user',label:'用户量',icon:'peoples',valueKey:'user_total'},
        {key:'post',label:'帖子量',icon:'message',valueKey:'post_total'},
        {key:'topic',label:'圈子量',icon:'form',valueKey:'topic_total'},
        {key:'upload',label:'文件量',icon:'upload',valueKey:'upload_total'}
      ]
    }
  },
  created() {
    // 先显示用户
    this.handleSetLineChartData(this.list[this.idx],this.idx)
  },
  methods: {
    handleSetLineChartData(item,index) {
      this.idx =index
      this.$emit('handleSetLineChartData', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover,&.active {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-1 {
        background: #40c9c6;
      }

      .icon-2 {
        background: #36a3f7;
      }

      .icon-3 {
        background: #f4516c;
      }

      .icon-4 {
        background: #34bfa3
      }
    }


    .icon-1 {
      color: #40c9c6;
    }

    .icon-2 {
      color: #36a3f7;
    }

    .icon-3 {
      color: #f4516c;
    }

    .icon-4 {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
