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
  name: "p-tag-select",
  emits: ["confirm"],
  data() {
    return {
      tagList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await api_post._tagList();
      const { all, tags } = res.data;
      let tagList = [];
      let keys = Object.keys(tags);
      keys.forEach((key) => {
        tagList.push({
          id: key,
          name: key,
          children: tags[key].map((item) => ({ id: key, name: item }))
        });
      });
      console.log(tagList, 111);
      this.tagList = tagList;
    },
    tagSelect(result) {
      const d = result.map((item) => item.name);
      this.$emit("confirm", d);
    },
    _show() {
      this.$refs.treePicker._show();
    }
  }
};
if (!Array) {
  const _easycom_tki_tree2 = common_vendor.resolveComponent("tki-tree");
  _easycom_tki_tree2();
}
const _easycom_tki_tree = () => "../tki-tree/tki-tree.js";
if (!Math) {
  _easycom_tki_tree();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("treePicker", "a1ae5ed3-0"),
    b: common_vendor.o($options.tagSelect),
    c: common_vendor.p({
      range: $data.tagList,
      title: "标签",
      rangeKey: "name",
      multiple: true,
      maxCount: 6
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1ae5ed3"], ["__file", "D:/潘坤鹏/Desktop/school-wx/components/p-tag-select/p-tag-select.vue"]]);
wx.createComponent(Component);
