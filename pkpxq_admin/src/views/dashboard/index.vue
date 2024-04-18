<template>
  <div class="dashboard-container">
    <panel-group :info="info" @handleSetLineChartData="handleSetLineChartData"/>
    <el-row v-if="lineChartData" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" :title="title"/>
    </el-row>
  </div>
</template>

<script>
import {getDashboard, listDashboard} from "@/api/dashboard";
import PanelGroup from "@/views/dashboard/PanelGroup.vue";
import LineChart from './LineChart.vue'

export default {
  name: 'Dashboard',
  components: {PanelGroup, LineChart},
  data() {
    return {
      info: {},
      lineChartData: {},
      title:''
    }
  },
  created() {
    listDashboard().then(res => {
      this.info = res.data
    })
  },
  methods: {
    handleSetLineChartData(item) {
      this.title = item.label
      getDashboard(item.key).then(res => {
        this.lineChartData = res.data
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
