<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="uploadList" @selection-change="handleSelectionChange" @cell-dblclick="cellDbClick">
      <el-table-column type="selection" width="50" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column label="用户ID" align="center" prop="userId"/>
      <el-table-column label="管理员ID" align="center" prop="adminId"/>
      <el-table-column label="文件路径" width="200" align="center" prop="path" show-overflow-tooltip/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载次数" align="center" prop="downTimes"/>
      <el-table-column label="预览" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-picture-outline"
            @click="imgPreview(scope.row.path)"
          >预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="下载" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="toDownLoad(scope.row.path)"
          >下载</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {listUpload, delUpload} from "@/api/system/upload";

export default {
  name: "Upload",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 日期范围
      dateRange: [],
      // 总条数
      total: 0,
      // 下载记录表格数据
      uploadList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        page: 1,
        pageSize: 10,
        userId: null,
        adminId: null,
        path: null,
        createTime: null,
        deleteTime: null,
        downTimes: null,
        isDelete: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        path: [
          {required: true, message: "文件路径不能为空", trigger: "blur"}
        ],
        createTime: [
          {required: true, message: "创建时间不能为空", trigger: "blur"}
        ],
        downTimes: [
          {required: true, message: "下载次数不能为空", trigger: "blur"}
        ],
        isDelete: [
          {required: true, message: "是否删除不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询下载记录列表 */
    getList() {
      this.loading = true;
      listUpload(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.uploadList = response.data.records;
        console.log(this.uploadList)
        this.total = response.data.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        adminId: null,
        path: null,
        createTime: null,
        deleteTime: null,
        downTimes: null,
        isDelete: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除下载记录编号为"' + ids + '"的数据项？').then(function () {
        return delUpload(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    // 双击复制
    cellDbClick(row, column, cell, event){
      event.preventDefault();
      if(column.property ==='path'){
        navigator.clipboard.writeText(row.path).then(res=>{
          this.$message.success('复制成功')
        }).catch(e=>{
          this.$message.error('复制失败')
        })
      }
    },
    // 图片预览
    imgPreview(path){
      this.$imagePreview({
        urlList:[path],
        onError:()=>{
          this.$message.error('图片加载失败，或文件不是图片',)
        }
      })
    },
    toDownLoad(path){
      this.$download.file(path)
    }
  }
};
</script>
