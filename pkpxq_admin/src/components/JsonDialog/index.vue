<template>
  <el-dialog
    :visible.sync="dialogVisible"
    center
    :before-close="close">
    <div>
      <JsonViewer
        copyable
        boxed
        :value="jsonStr"
      />
    </div>
  </el-dialog>
</template>

<script>
import JsonViewer from 'vue-json-viewer';

export default {
  components: {JsonViewer},
  props:{
    callback:{
      type:Function,
      default:()=>{}
    }
  },
  data() {
    return {
      jsonStr: {},
      dialogVisible:false
    }
  },
  methods: {
    open(json) {
      this.dialogVisible= true
      this.jsonStr = json || {}
    },
    update(json){
      this.jsonStr = json || {}
    },
    close(done){
      done()
      this.callback()
    }
  }
}
</script>
