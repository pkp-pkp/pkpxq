"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../stores/user.js");
require("../../api/user.js");
require("../../api/topic.js");
const Post = () => "./components/post.js";
const User = () => "./components/user.js";
const _sfc_main = {
  data() {
    return {
      keyword: "",
      history: common_vendor.index.getStorageSync("search") || [],
      type: "post",
      form: {
        keyword: ""
      },
      tabs: {
        current: 0,
        list: [
          { key: "post", name: "帖子" },
          { key: "user", name: "用户" }
        ]
      }
    };
  },
  components: { Post, User },
  methods: {
    getData() {
      if (this.type == "post") {
        this.getPostList();
      }
    },
    onSearch() {
      if (this.keyword == "") {
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "none"
        });
        return;
      }
      let h = this.history.filter((item) => item != this.keyword);
      h.unshift(this.keyword);
      this.history = h;
      common_vendor.index.setStorageSync("search", h);
      this.form.keyword = this.keyword;
    },
    clearHistory() {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "你确定要清空历史记录吗？",
        success: function(res) {
          if (res.confirm) {
            this.history = [];
            common_vendor.index.removeStorageSync("search");
          } else if (res.cancel)
            ;
        }
      });
    },
    async tagClick(item, v) {
      this.type = "post";
      this.keyword = item;
      this.form.keyword = item;
    },
    tabChange(item) {
      this.type = item.key;
    }
  }
};
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _component_Post = common_vendor.resolveComponent("Post");
  const _component_User = common_vendor.resolveComponent("User");
  (_easycom_uv_search2 + _easycom_uv_sticky2 + _easycom_uv_icon2 + _easycom_uv_tabs2 + _component_Post + _component_User)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_sticky = () => "../../uni_modules/uv-sticky/components/uv-sticky/uv-sticky.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uv_sticky + _easycom_uv_icon + _easycom_uv_tabs)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onSearch),
    b: common_vendor.o($options.onSearch),
    c: common_vendor.o(($event) => $data.keyword = $event),
    d: common_vendor.p({
      showAction: true,
      placeholder: "搜索帖子/用户",
      shape: "square",
      modelValue: $data.keyword
    }),
    e: !$data.form.keyword
  }, !$data.form.keyword ? {
    f: common_vendor.p({
      name: "trash",
      size: "26"
    }),
    g: common_vendor.o((...args) => $options.clearHistory && $options.clearHistory(...args)),
    h: common_vendor.f($data.history, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.tagClick(item), index)
      };
    })
  } : common_vendor.e({
    i: common_vendor.o($options.tabChange),
    j: common_vendor.p({
      list: $data.tabs.list,
      current: $data.tabs.current,
      lineWidth: "30",
      lineColor: "#f56c6c"
    }),
    k: $data.type == "post"
  }, $data.type == "post" ? {
    l: common_vendor.p({
      form: $data.form
    })
  } : {}, {
    m: $data.type == "user"
  }, $data.type == "user" ? {
    n: common_vendor.p({
      form: $data.form
    })
  } : {}));
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c10c040c"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
