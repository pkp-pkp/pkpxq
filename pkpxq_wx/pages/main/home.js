"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_usePostList = require("../../hooks/usePostList.js");
const api_post = require("../../api/post.js");
const api_app = require("../../api/app.js");
const utils_index = require("../../utils/index.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../stores/user.js");
require("../../api/user.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_notice_bar2 = common_vendor.resolveComponent("uv-notice-bar");
  const _easycom_uv_swiper2 = common_vendor.resolveComponent("uv-swiper");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  const _easycom_p_post_list2 = common_vendor.resolveComponent("p-post-list");
  (_easycom_uv_avatar2 + _easycom_uv_input2 + _easycom_uv_navbar2 + _easycom_uv_notice_bar2 + _easycom_uv_swiper2 + _easycom_uv_tabs2 + _easycom_uv_sticky2 + _easycom_p_post_list2)();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_notice_bar = () => "../../uni_modules/uv-notice-bar/components/uv-notice-bar/uv-notice-bar.js";
const _easycom_uv_swiper = () => "../../uni_modules/uv-swiper/components/uv-swiper/uv-swiper.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_sticky = () => "../../uni_modules/uv-sticky/components/uv-sticky/uv-sticky.js";
const _easycom_p_post_list = () => "../../components/p-post-list/p-post-list.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_input + _easycom_uv_navbar + _easycom_uv_notice_bar + _easycom_uv_swiper + _easycom_uv_tabs + _easycom_uv_sticky + _easycom_p_post_list)();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const { list, loadStatus, listPage, getPostList, resetList } = hooks_usePostList.usePostList();
    const tabsStyle = common_vendor.reactive({
      activeStyle: {
        color: "#303133",
        fontWeight: "bold",
        transform: "scale(1.25)"
      },
      inactiveStyle: {
        color: "#606266",
        transform: "scale(1)"
      }
    });
    const tabs = common_vendor.ref({
      list: [{ name: "最新" }, { name: "热门" }],
      current: 0
    });
    const appConfig = common_vendor.ref({});
    common_vendor.onMounted(() => {
      getPostList();
      getCate();
      api_app._getAppHome().then((res) => {
        appConfig.value = res.data;
      });
    });
    common_vendor.onReachBottom(() => {
      listPage.value.page++;
      getPostList();
    });
    common_vendor.onPullDownRefresh(() => {
      listPage.value.page = 1;
      getPostList();
      common_vendor.index.stopPullDownRefresh();
    });
    const formatPath = common_vendor.computed(() => {
      return appConfig.value.banner && appConfig.value.banner.map((item) => utils_index.imgPath(item));
    });
    const tabChange = (e) => {
      let { name, index, cateId } = e;
      tabs.value.current = index;
      resetList();
      if (cateId !== void 0) {
        listPage.value.cateId = e.cateId;
      } else {
        let p_enum = {
          最新: ["createTime", "DESC"],
          热门: ["viewNum", "DESC"]
        };
        if (p_enum[name]) {
          let [sortField, sortOrder] = p_enum[name];
          listPage.value.sortField = sortField;
          listPage.value.sortOrder = sortOrder;
        }
      }
      getPostList();
    };
    const getCate = async () => {
      const res = await api_post._getPostCategory();
      const cateList = res.data.map((item) => {
        return {
          name: item.cateName,
          cateId: item.cateId
        };
      });
      tabs.value.list = tabs.value.list.concat(cateList);
    };
    const toNav = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: "/static/img/logo.png"
        }),
        b: common_vendor.p({
          placeholder: "搜索帖子/用户",
          prefixIcon: "search",
          disabled: true,
          shape: "circle",
          customStyle: {
            height: "30rpx"
          }
        }),
        c: common_vendor.o(($event) => toNav("/pages/search/search")),
        d: common_vendor.p({
          title: "首页",
          placeholder: true
        }),
        e: appConfig.value.notice
      }, appConfig.value.notice ? {
        f: common_vendor.p({
          text: appConfig.value.notice.text
        }),
        g: common_vendor.o(($event) => toNav(appConfig.value.notice.path))
      } : {}, {
        h: common_vendor.p({
          list: common_vendor.unref(formatPath),
          autoplay: true
        }),
        i: common_vendor.o(tabChange),
        j: common_vendor.p({
          list: tabs.value.list,
          current: tabs.value.current,
          lineWidth: "30",
          lineColor: "#f56c6c",
          activeStyle: tabsStyle.activeStyle,
          inactiveStyle: tabsStyle.inactiveStyle,
          itemStyle: "padding-left: 15px; padding-right: 15px; height: 34px;"
        }),
        k: common_vendor.p({
          customNavHeight: "64",
          zIndex: "1",
          bgColor: "#fff"
        }),
        l: common_vendor.p({
          list: common_vendor.unref(list),
          loadStatus: common_vendor.unref(loadStatus)
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-88ed50df"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/main/home.vue"]]);
wx.createComponent(Component);
