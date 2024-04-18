"use strict";
const api_post = require("../../api/post.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../stores/user.js");
require("../../api/user.js");
require("../../api/topic.js");
const _sfc_main = {
  data() {
    return {
      tabs: {
        list: [{ name: "全部" }],
        current: 0
      },
      localdata: [],
      tagCate: {},
      nowTag: [],
      selectTag: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await api_post._tagList();
      const { all, tags } = res.data;
      let localdata = [];
      let keys = Object.keys(tags);
      keys.forEach((key) => {
        localdata.push({
          id: key,
          label: key,
          children: tags[key].map((item) => ({ id: key, label: item }))
        });
      });
      this.localdata = localdata;
    },
    tagSelect(...a) {
      console.log(a);
    },
    tabChange(e) {
      let { name, index } = e;
      this.nowTag = this.tagCate[name];
      tabs.value.current = index;
      if (tab_name === "帖子") {
        resetList();
        getPostList({ userId: userId.value });
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_tki_tree2 = common_vendor.resolveComponent("tki-tree");
  (_easycom_uv_tabs2 + _easycom_tki_tree2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_tki_tree = () => "../../components/tki-tree/tki-tree.js";
if (!Math) {
  (_easycom_uv_tabs + _easycom_tki_tree)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.tabChange),
    b: common_vendor.p({
      list: $data.tabs.list,
      ["is-scroll"]: false,
      current: $data.tabs.current
    }),
    c: common_vendor.o(($event) => _ctx.$refs.treePicker._show()),
    d: common_vendor.sr("treePicker", "f2b18efe-1"),
    e: common_vendor.o($options.tagSelect),
    f: common_vendor.p({
      range: $data.localdata,
      multiple: true,
      maxCount: 6
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f2b18efe"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/post/tag.vue"]]);
wx.createPage(MiniProgramPage);
