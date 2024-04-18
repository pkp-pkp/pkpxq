"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_post = require("../../../api/post.js");
require("../../../utils/request.js");
require("../../../utils/config.js");
require("../../../stores/index.js");
require("../../../stores/app.js");
require("../../../stores/user.js");
require("../../../api/user.js");
require("../../../api/topic.js");
const _sfc_main = {
  __name: "post",
  setup(__props) {
    const postId = common_vendor.ref("");
    const getPostList = async () => {
      await api_post._getPostList({
        page: 1,
        pageSize: 10,
        postId: postId.value
      });
    };
    const getPostComment = async () => {
      await api_post._getPostComment({
        postId: postId.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: postId.value,
        b: common_vendor.o(($event) => postId.value = $event.detail.value),
        c: common_vendor.o(getPostList),
        d: common_vendor.o(getPostComment)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/pages/api_test/components/post.vue"]]);
wx.createComponent(Component);
