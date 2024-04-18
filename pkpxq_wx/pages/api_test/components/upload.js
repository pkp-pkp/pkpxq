"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_api = require("../../../api/api.js");
require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/user.js");
require("../../../api/topic.js");
if (!Array) {
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  _component_uni_file_picker();
}
const _sfc_main = {
  __name: "upload",
  setup(__props) {
    const filePath = common_vendor.ref("");
    const imageUrl = common_vendor.ref("");
    const files = common_vendor.ref(null);
    const select = (e) => {
      filePath.value = e.tempFilePaths[0];
    };
    const upload = async () => {
      const res = await api_api._uploadPath(filePath.value, "avatar");
      imageUrl.value = res.data.path;
      console.log(res.data.path);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(files, "778b373c-0", {
          "k": "files"
        }),
        b: common_vendor.o(select),
        c: common_vendor.p({
          ["file-mediatype"]: "image",
          mode: "grid",
          ["file-extname"]: "png,jpg",
          limit: 1,
          ["auto-upload"]: false
        }),
        d: common_vendor.o(upload),
        e: common_vendor.t(imageUrl.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/api_test/components/upload.vue"]]);
wx.createComponent(Component);
