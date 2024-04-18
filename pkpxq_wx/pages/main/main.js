"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
require("../../stores/index.js");
const stores_user = require("../../stores/user.js");
const stores_app = require("../../stores/app.js");
require("../../utils/config.js");
require("../../api/user.js");
require("../../api/topic.js");
const Home = () => "./home.js";
const Myself = () => "./myself.js";
const store = stores_user.useUserStore();
const store_app = stores_app.useAppStore();
const __default__ = {
  data() {
    return {
      pageCur: "home",
      bgColor: "#fff",
      bgColorList: {
        home: "#fff",
        myself: "#f5f5f5"
      }
    };
  },
  computed: {
    isLogin: () => store.isLogin,
    userInfo: () => store.userInfo
  },
  components: {
    Home,
    Myself
  },
  onLoad(options) {
    const { pageCur } = options;
    if (pageCur) {
      this.navChange({ cur: pageCur });
    }
  },
  onShow() {
    if (store_app.reload[this.pageCur]) {
      store_app.reload[this.pageCur] = false;
      let cache = this.pageCur;
      this.pageCur = "";
      this.$nextTick(() => {
        this.pageCur = cache;
      });
    }
    store.getUserInfo();
  },
  onHide() {
  },
  methods: {
    navChange({ cur }) {
      this.pageCur = cur;
      this.bgColor = this.bgColorList[cur];
    },
    showCard() {
      this.$refs.popup.open();
    },
    jump(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    onPupItem(name) {
      this.$refs.popup.close();
      common_vendor.index.navigateTo({
        url: name
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "95486a22": _ctx.bgColor
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
if (!Array) {
  const _component_Home = common_vendor.resolveComponent("Home");
  const _component_Myself = common_vendor.resolveComponent("Myself");
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_grid_item2 = common_vendor.resolveComponent("uv-grid-item");
  const _easycom_uv_grid2 = common_vendor.resolveComponent("uv-grid");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_component_Home + _component_Myself + _easycom_uv_tabbar_item2 + _easycom_uv_tabbar2 + _easycom_uv_icon2 + _easycom_uv_grid_item2 + _easycom_uv_grid2 + _easycom_uv_popup2)();
}
const _easycom_uv_tabbar_item = () => "../../uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_grid_item = () => "../../uni_modules/uv-grid/components/uv-grid-item/uv-grid-item.js";
const _easycom_uv_grid = () => "../../uni_modules/uv-grid/components/uv-grid/uv-grid.js";
const _easycom_uv_popup = () => "../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_tabbar_item + _easycom_uv_tabbar + _easycom_uv_icon + _easycom_uv_grid_item + _easycom_uv_grid + _easycom_uv_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.pageCur == "home"
  }, $data.pageCur == "home" ? {} : {}, {
    b: $data.pageCur == "myself"
  }, $data.pageCur == "myself" ? {} : {}, {
    c: common_vendor.o(($event) => $options.navChange({
      cur: "home"
    })),
    d: common_vendor.p({
      name: "home",
      text: "首页",
      icon: "home-fill"
    }),
    e: common_vendor.o($options.showCard),
    f: common_vendor.p({
      iconSize: "34",
      icon: "/static/tabbar/p_add.png"
    }),
    g: common_vendor.o(($event) => $options.navChange({
      cur: "myself"
    })),
    h: common_vendor.p({
      name: "myself",
      text: "我的",
      icon: "account-fill"
    }),
    i: common_vendor.p({
      value: $data.pageCur,
      iconSize: "26",
      activeColor: "#EA5149",
      inactiveColor: "#000"
    }),
    j: common_vendor.p({
      customStyle: {
        paddingBottom: "20rpx"
      },
      name: "/static/img/a_post.png",
      size: 40
    }),
    k: common_vendor.p({
      name: "/pages/post/add?type=2"
    }),
    l: common_vendor.p({
      customStyle: {
        paddingBottom: "20rpx"
      },
      name: "/static/img/a_notes.png",
      size: 40
    }),
    m: common_vendor.p({
      name: "/pages/post/add?type=1"
    }),
    n: common_vendor.p({
      customStyle: {
        paddingBottom: "20rpx"
      },
      name: "/static/img/a_video.png",
      size: 40
    }),
    o: common_vendor.p({
      name: "/pages/post/add?type=3"
    }),
    p: common_vendor.o($options.onPupItem),
    q: common_vendor.p({
      border: false
    }),
    r: common_vendor.sr("popup", "4f50ca8f-6"),
    s: common_vendor.p({
      zIndex: "10",
      mode: "bottom"
    }),
    t: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4f50ca8f"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/main/main.vue"]]);
wx.createPage(MiniProgramPage);
