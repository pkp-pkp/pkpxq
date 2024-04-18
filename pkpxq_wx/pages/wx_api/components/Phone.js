"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_wx = require("../../../api/wx.js");
require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/user.js");
require("../../../api/topic.js");
const _sfc_main = {
  __name: "Phone",
  setup(__props) {
    const getPhone = async (e) => {
      const { encryptedData, iv } = e.detail;
      const { code } = await common_vendor.wx$1.login();
      await api_wx._getPhoneNumber({ encryptedData, iv, code });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getPhone)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/wx_api/components/Phone.vue"]]);
wx.createComponent(Component);
