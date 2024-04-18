"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_usePostList = require("../../hooks/usePostList.js");
const stores_user = require("../../stores/user.js");
require("../../api/post.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/user.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_p_post_list2 = common_vendor.resolveComponent("p-post-list");
  _easycom_p_post_list2();
}
const _easycom_p_post_list = () => "../../components/p-post-list/p-post-list.js";
if (!Math) {
  _easycom_p_post_list();
}
const _sfc_main = {
  __name: "post_favour",
  setup(__props) {
    const store = stores_user.useUserStore();
    const userId = common_vendor.ref(null);
    const { list, getFavourPost, loadStatus } = hooks_usePostList.usePostList();
    common_vendor.onLoad((options) => {
      let { userId: id } = options;
      userId.value = id ? +id : store.userInfo.id;
      getFavourPost({ userId: userId.value });
      console.log(list);
    });
    common_vendor.onPullDownRefresh(() => {
      list.value = [];
      getFavourPost({ userId: userId.value }).then((res) => common_vendor.index.stopPullDownRefresh());
    });
    const selectAction = (e) => {
      if (e.key === "favour") {
        list.value = [];
        getFavourPost({ userId: userId.value });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(selectAction),
        b: common_vendor.p({
          list: common_vendor.unref(list),
          loadStatus: common_vendor.unref(loadStatus)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/user/post_favour.vue"]]);
wx.createPage(MiniProgramPage);
