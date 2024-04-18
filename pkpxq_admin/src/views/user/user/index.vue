<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话号码" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入电话号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable>
          <el-option
            v-for="dict in dict.type.user_sex"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="注册渠道" prop="sex">
        <el-select v-model="queryParams.terminal" placeholder="请选择注册渠道" clearable>
          <el-option
            v-for="dict in dict.type.user_terminal"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="queryParams.nickname"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
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
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id"  v-if="columns[0].visible" />
      <el-table-column label="头像" align="center" prop="avatar" width="100" v-if="columns[1].visible" >
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50" border-radius="50%" />
        </template>
      </el-table-column>
      <el-table-column label="小程序用户唯一标识" align="center" prop="openid"  v-if="columns[2].visible" />
      <el-table-column label="用户名" align="center" prop="username"  v-if="columns[3].visible" />
      <el-table-column label="电话号码" align="center" prop="mobile"  v-if="columns[4].visible" />
      <el-table-column label="性别" align="center" prop="sex" v-if="columns[5].visible" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.user_sex" :value="scope.row.sex"/>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center" prop="age"  v-if="columns[6].visible" />
      <el-table-column label="昵称" align="center" prop="nickname"  v-if="columns[7].visible" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" v-if="columns[8].visible" >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" key="status" v-if="columns[9].visible" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="注册渠道" align="center" key="terminal" width="100" v-if="columns[10].visible" >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.user_terminal" :value="scope.row.terminal"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import { listUser,  delUser,changeUserStatus } from "@/api/user/user";

export default {
  name: "User",
  dicts: ['user_sex', 'sys_normal_disable','user_terminal'],
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
      // 总条数
      total: 0,
      // 用户表格数据
      userList: [],
      // 日期范围
      dateRange: [],
      // 弹出层标题
      title: "",
      // 查询参数
      queryParams: {
        page: 1,
        pageSize: 10,
        id: null,
        mobile: null,
        sex: null,
        nickname: null,
        status: null,
      },
      columns: [
        { key: 0, label: `ID`, visible: true },
        { key: 1, label: `头像`, visible: true },
        { key: 2, label: `小程序用户唯一标识`, visible: true },
        { key: 3, label: `用户名`, visible: true },
        { key: 4, label: `电话号码`, visible: true },
        { key: 5, label: `性别`, visible: true },
        { key: 6, label: `年龄`, visible: true },
        { key: 7, label: `昵称`, visible: true },
        { key: 8, label: `创建时间`, visible: true },
        { key: 9, label: `状态`, visible: true },
        { key: 9, label: `用户类别`, visible: true },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.userList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
      });
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除用户编号为"' + ids + '"的数据项？').then(function() {
        return delUser(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "白名单" : "黑名单";
      changeUserStatus(row.id,row.status).then(res=>{
        this.$modal.msgSuccess(text + "成功");
      }).catch(error=>{
        row.status = row.status === "0" ? "1" : "0";
      })
    },
  }
};
</script>
