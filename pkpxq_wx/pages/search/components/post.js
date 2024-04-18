"use strict";
const common_vendor = require("../../../common/vendor.js");
const hooks_usePostList = require("../../../hooks/usePostList.js");
require("../../../api/post.js");
require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/user.js");
require("../../../api/topic.js");
if (!Array) {
  const _easycom_p_post_list2 = common_vendor.resolveComponent("p-post-list");
  _easycom_p_post_list2();
}
const _easycom_p_post_list = () => "../../../components/p-post-list/p-post-list.js";
if (!Math) {
  _easycom_p_post_list();
}
const _sfc_main = {
  __name: "post",
  props: ["form"],
  setup(__props) {
    const props = __props;
    const { list, listPage, resetList, loadStatus, toSearchPost } = hooks_usePostList.usePostList();
    common_vendor.watch(
      () => props.form,
      () => {
        resetList();
        toSearchPost(props.form);
      },
      { immediate: true, deep: true }
    );
    common_vendor.onReachBottom(() => {
      listPage.value.page++;
      toSearchPost(props.form);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: common_vendor.unref(list),
          loadStatus: common_vendor.unref(loadStatus)
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/search/components/post.vue"]]);
wx.createComponent(Component);
