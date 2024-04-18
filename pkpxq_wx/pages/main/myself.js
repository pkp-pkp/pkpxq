"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
require("../../api/user.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_grid_item2 = common_vendor.resolveComponent("uv-grid-item");
  const _easycom_uv_grid2 = common_vendor.resolveComponent("uv-grid");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  (_easycom_uv_navbar2 + _easycom_uv_avatar2 + _easycom_uv_icon2 + _easycom_uv_button2 + _easycom_uv_grid_item2 + _easycom_uv_grid2 + _easycom_uv_image2 + _easycom_uv_modal2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_grid_item = () => "../../uni_modules/uv-grid/components/uv-grid-item/uv-grid-item.js";
const _easycom_uv_grid = () => "../../uni_modules/uv-grid/components/uv-grid/uv-grid.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_avatar + _easycom_uv_icon + _easycom_uv_button + _easycom_uv_grid_item + _easycom_uv_grid + _easycom_uv_image + _easycom_uv_modal)();
}
const _sfc_main = {
  __name: "myself",
  setup(__props) {
    const store = stores_user.useUserStore();
    const { userInfo } = common_vendor.storeToRefs(store);
    const shareQRCode = common_vendor.ref("");
    const ref_modal = common_vendor.ref(null);
    common_vendor.onBeforeMount(() => {
      store.getUserInfo();
    });
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const onClear = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "是否清除登录信息以及数据缓存?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            store.logout();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    const toNav = (name) => {
      common_vendor.index.navigateTo({
        url: name
      });
    };
    const showCode = () => {
      common_vendor.index.showShareImageMenu({
        path: "/static/share_code.jpg"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "我的",
          placeholder: true,
          leftIcon: ""
        }),
        b: common_vendor.unref(store).isLogin
      }, common_vendor.unref(store).isLogin ? {
        c: common_vendor.p({
          customStyle: {
            marginRight: "20rpx"
          },
          src: _ctx.imgPath(common_vendor.unref(userInfo).avatar)
        }),
        d: common_vendor.t(common_vendor.unref(userInfo).nickname),
        e: common_vendor.p({
          name: "arrow-right"
        }),
        f: common_vendor.o(($event) => toNav("/pages/user/edit")),
        g: common_vendor.o(($event) => toNav("/pages/user/user"))
      } : {
        h: common_vendor.o(toLogin),
        i: common_vendor.p({
          plain: true,
          type: "primary",
          shape: "circle"
        })
      }, {
        j: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        k: common_vendor.t(common_vendor.unref(userInfo).followerNum),
        l: common_vendor.p({
          name: "/pages/user/fans?userId=" + common_vendor.unref(userInfo).id
        }),
        m: common_vendor.t(common_vendor.unref(userInfo).followeeNum),
        n: common_vendor.p({
          name: "/pages/user/follow?userId=" + common_vendor.unref(userInfo).id
        }),
        o: common_vendor.t(common_vendor.unref(userInfo).postNum),
        p: common_vendor.p({
          name: "/pages/user/user?current=1&userId=" + common_vendor.unref(userInfo).id
        }),
        q: common_vendor.t(common_vendor.unref(userInfo).favourNum),
        r: common_vendor.p({
          name: "/pages/user/post_favour?userId=" + common_vendor.unref(userInfo).id
        }),
        s: common_vendor.o(toNav),
        t: common_vendor.p({
          col: 4,
          border: false
        })
      } : {}, {
        v: common_vendor.p({
          name: "/pages/user/user?current=1"
        }),
        w: common_vendor.p({
          name: "/pages/user/post_favour"
        }),
        x: common_vendor.o(toNav),
        y: common_vendor.p({
          col: 4,
          border: false
        }),
        z: common_vendor.o(showCode),
        A: common_vendor.o(onClear),
        B: common_vendor.p({
          src: shareQRCode.value,
          width: "160rpx",
          height: "160rpx"
        }),
        C: common_vendor.sr(ref_modal, "261669ce-12", {
          "k": "ref_modal"
        }),
        D: common_vendor.p({
          title: "分享二维码"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-261669ce"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/main/myself.vue"]]);
wx.createComponent(Component);
