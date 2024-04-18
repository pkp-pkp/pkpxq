<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择" clearable>
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tagList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="类名" align="center" prop="name" />
      <el-table-column label="状态" align="center" key="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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

    <!-- 添加或修改标签对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="80%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="类名" prop="name">
          <el-input v-model="form.name" placeholder="请输入类名" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签" prop="tagJson">
          <template v-slot="scope">
            <div v-if="form.tagJson && form.tagJson.length>0" class="scroll-y" style="max-height: 400px;overflow-y: scroll">
              <div style="display: flex;flex-wrap: wrap;gap: 5px">
                <el-tag
                  v-for="(tag,index) in form.tagJson"
                  :key="tag"
                  closable
                  disable-transitions
                  @close="tagClose(tag,index)"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-form-item>

        <el-divider/>

        <div style="padding-left: 20px">
          <el-button size="small" @click="form.tagJson=[]">
            清除所有
          </el-button>
          <el-button v-if="!showTagTextarea" size="small" @click="showTagTextarea=true">
            批量编辑
          </el-button>
          <el-input
            v-show="showTagInput"
            ref="inputRef"
            v-model="tagInputValue"
            size="small"
            style="width: 60px;margin-left: 12px"
            @blur="handleTagInputConfirm"
            @change="handleTagInputConfirm"
          />
          <el-button v-show="!showTagInput" size="small" style="margin-left: 12px" @click="onShowTagInput">
            + 新增
          </el-button>

          <div v-if="showTagTextarea" >
            <br>
            <el-input
              v-model.trim="tagTextareaValue"
              autosize
              type="textarea"
              placeholder="批量修改，使用,分割"
            />
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTag, getTag, delTag, addTag, updateTag ,changeTagStatus} from "@/api/post/tag";
import {Message} from "element-ui";

export default {
  name: "Tag",
  dicts: ['sys_normal_disable'],
  data() {
    return {
      // 标签批量编辑框
      showTagTextarea:false,
      // 标签输入框
      showTagInput:false,
      // 标签输入框值
      tagInputValue :'',
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
      // 总条数
      total: 0,
      // 标签表格数据
      tagList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        page: 1,
        pageSize: 10,
        sortOrder:'ASC',
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: '类名不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        tagJson:[{validator: this.validatePass, trigger: 'blur'}]
      }
    };
  },
  computed:{
    tagTextareaValue:{
      get(){
        return this.form.tagJson.join(',');
      },
      set(val){
        let d = val.split(',')
        this.form.tagJson = d.length>0? d:[]
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 自定义校验
    validatePass(rule,value,callback){
      const set = new Set(value)
      if(value.length===0){
        callback(new Error('标签不能为空'))
      }else if(set.size !==value.length){
        callback(new Error('存在重复的标签内容'))
      }else{
        callback()
      }
    },
    /** 查询标签列表 */
    getList() {
      this.loading = true;
      listTag(this.queryParams).then(response => {
        this.tagList = response.data.records;
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
        name: null,
        tagList: null,
        status: null,
        tagJson:[]
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加标签";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTag(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改标签";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid,obj) => {
        if (valid) {
          this.form.tagList = JSON.stringify(this.form.tagJson)
          if (this.form.id != null) {
            updateTag(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTag(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }else{
          const firstKey = Object.keys(obj)[0]
          this.$modal.msgError(obj[firstKey][0].message)
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除标签编号为"' + ids + '"的数据项？').then(function() {
        return delTag(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "禁用";
      updateTag({id:row.id,status:row.status}).then(res=>{
        this.$modal.msgSuccess(text + "成功");
      }).catch(error=>{
        row.status = row.status === "0" ? "1" : "0";
      })
    },
    // 表单标签关闭
    tagClose(tag,index){
      this.form.tagJson.splice(index,1)
    },
    // 新增标签按钮点击
    onShowTagInput(){
      this.showTagInput = true
      this.tagInputValue = ''
      this.$refs['inputRef'].focus()
    },
    // 添加标签输入框 失焦会触发两次：为解决空值失焦隐藏
    handleTagInputConfirm(){
      if(this.tagInputValue){
        const hasTag = this.form.tagJson.indexOf(this.tagInputValue)
        if(hasTag===-1){
          this.form.tagJson.push(this.tagInputValue)
          this.tagInputValue = ''
          this.showTagInput = false
        }else{
          this.$modal.msgError('该标签已存在')
        }
      }else{
        this.showTagInput = false
      }
    }
  }
};
</script>
