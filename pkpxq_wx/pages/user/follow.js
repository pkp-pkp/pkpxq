"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_useUserList = require("../../hooks/useUserList.js");
require("../../api/user.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../stores/user.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_p_user_list2 = common_vendor.resolveComponent("p-user-list");
  _easycom_p_user_list2();
}
const _easycom_p_user_list = () => "../../components/p-user-list/p-user-list.js";
if (!Math) {
  _easycom_p_user_list();
}
const _sfc_main = {
  __name: "follow",
  setup(__props) {
    const userId = common_vendor.ref(null);
    const { list, loadStatus, getFollowList, resetList } = hooks_useUserList.useUserList();
    common_vendor.onLoad((options) => {
      let { userId: id } = options;
      userId.value = id;
      getFollowList({ userId: userId.value });
    });
    common_vendor.onPullDownRefresh(() => {
      resetList();
      getFollowList({ userId: userId.value });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: common_vendor.unref(list),
          loadStatus: common_vendor.unref(loadStatus),
          tips: "还没有关注的人哦!"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/user/follow.vue"]]);
wx.createPage(MiniProgramPage);
