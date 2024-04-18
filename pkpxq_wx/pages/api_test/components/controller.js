"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_controller = require("../../../api/controller.js");
require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/user.js");
require("../../../api/topic.js");
const _sfc_main = {
  __name: "controller",
  emits: ["update"],
  setup(__props, { emit: emits }) {
    const imgList = common_vendor.ref([]);
    const getAvatarFile = async () => {
      const res = await api_controller._getUploadDir({
        type: "avatar"
      });
      let arr = [];
      res.records.forEach((item) => {
        arr.push(res.baseUrl + "/" + item);
      });
      imgList.value = arr;
      emits("update");
    };
    const delFile = async (item, index) => {
      const a = item.split("/");
      imgList.value.splice(index, 1);
      await api_controller._delFile({
        type: "avatar",
        filename: a[a.length - 1]
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getAvatarFile),
        b: common_vendor.f(imgList.value, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => delFile(item, index), item),
            c: item
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ede0008c"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/api_test/components/controller.vue"]]);
wx.createComponent(Component);
