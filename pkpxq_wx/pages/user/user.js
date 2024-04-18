"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const stores_user = require("../../stores/user.js");
const hooks_usePostList = require("../../hooks/usePostList.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/topic.js");
require("../../api/post.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_p_post_list2 = common_vendor.resolveComponent("p-post-list");
  (_easycom_uv_navbar2 + _easycom_uv_icon2 + _easycom_uv_tabs2 + _easycom_p_post_list2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_p_post_list = () => "../../components/p-post-list/p-post-list.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_icon + _easycom_uv_tabs + _easycom_p_post_list)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const store = stores_user.useUserStore();
    const { list: postList, loadStatus, listPage, getPostList, resetList } = hooks_usePostList.usePostList();
    const userId = common_vendor.ref(null);
    const userInfo = common_vendor.ref(null);
    const tabs = common_vendor.ref({
      list: [{ tab_name: "主页" }, { tab_name: "帖子" }],
      current: 0
    });
    common_vendor.onLoad((options) => {
      let { userId: id, current = 0 } = options;
      userId.value = id ? +id : store.userInfo.id;
      getUserInfo({ userId: userId.value });
      tabChange(+current);
    });
    common_vendor.onReachBottom(() => {
      if (tabs.value.current == 1) {
        listPage.value.page++;
        getPostList({ userId: userId.value });
      }
    });
    const onBack = () => common_vendor.index.navigateBack();
    const tabChange = (e) => {
      let { tab_name, index } = e;
      if (typeof e === "number") {
        tab_name = tabs.value.list[e].tab_name;
        index = e;
      }
      tabs.value.current = index;
      if (tab_name === "帖子") {
        resetList();
        getPostList({ userId: userId.value });
      }
    };
    const getUserInfo = async () => {
      const res = await api_user._userInfoById({ id: userId.value });
      userInfo.value = res.data;
    };
    const onFollow = async () => {
      const res = await api_user._follow({ followeeId: userId.value });
      if (res.code === 200) {
        userInfo.value.isFollow = !!res.data;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onBack),
        b: common_vendor.p({
          bgColor: "unset",
          placeholder: true
        }),
        c: userInfo.value
      }, userInfo.value ? common_vendor.e({
        d: _ctx.imgPath(userInfo.value.avatar),
        e: common_vendor.t(userInfo.value.nickname),
        f: common_vendor.t(userInfo.value.followeeNum),
        g: common_vendor.t(userInfo.value.followerNum),
        h: common_vendor.t(userInfo.value.postNum),
        i: userId.value != userInfo.value.id
      }, userId.value != userInfo.value.id ? common_vendor.e({
        j: !userInfo.value.isFollow
      }, !userInfo.value.isFollow ? {
        k: common_vendor.p({
          name: "plus",
          color: "#fff"
        })
      } : userInfo.value.isFollow && userInfo.value.isFans ? {} : {}, {
        l: userInfo.value.isFollow && userInfo.value.isFans,
        m: common_vendor.o(onFollow)
      }) : {}, {
        n: common_vendor.o(tabChange),
        o: common_vendor.p({
          keyName: "tab_name",
          lineColor: "#f56c6c",
          list: tabs.value.list,
          ["is-scroll"]: false,
          current: tabs.value.current
        }),
        p: userInfo.value.sex
      }, userInfo.value.sex ? {
        q: common_vendor.t(userInfo.value.sex == "1" ? "男" : "女")
      } : {}, {
        r: userInfo.value.age
      }, userInfo.value.age ? {
        s: common_vendor.t(userInfo.value.age)
      } : {}, {
        t: common_vendor.t(userInfo.value.brief || "这个人很懒，没留下什么"),
        v: tabs.value.current === 0,
        w: common_vendor.p({
          list: common_vendor.unref(postList),
          loadStatus: common_vendor.unref(loadStatus),
          tips: "快去发布帖子吧!"
        }),
        x: tabs.value.current === 1
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
