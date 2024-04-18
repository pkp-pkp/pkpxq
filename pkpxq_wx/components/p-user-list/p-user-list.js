"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../stores/user.js");
require("../../api/topic.js");
const _sfc_main = {
  name: "p-user-list",
  props: {
    list: Array,
    loadStatus: String,
    tips: String
  },
  data() {
    return {};
  },
  methods: {
    jump(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    async onFollow(userId, index) {
      const res = await api_user._follow({ followeeId: userId });
      if (res.code === 200) {
        this.list[index].isFollow = res.data;
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  (_easycom_uv_avatar2 + _easycom_uv_icon2 + _easycom_uv_empty2 + _easycom_uv_load_more2)();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_icon + _easycom_uv_empty + _easycom_uv_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.jump("/pages/user/user?userId=" + item.id), item.id),
        b: "fc53f6bd-0-" + i0,
        c: common_vendor.p({
          customStyle: {
            marginRight: "20rpx"
          },
          src: _ctx.imgPath(item.avatar),
          mode: "aspectFill"
        }),
        d: common_vendor.t(item.nickname),
        e: item.sex === 1
      }, item.sex === 1 ? {} : {}, {
        f: item.sex === 2
      }, item.sex === 2 ? {} : {}, {
        g: common_vendor.o(($event) => $options.jump("/pages/user/user?userId=" + item.id), item.id),
        h: !item.isFollow
      }, !item.isFollow ? {
        i: "fc53f6bd-1-" + i0,
        j: common_vendor.p({
          name: "plus",
          color: "#fff"
        }),
        k: common_vendor.t(item.isFans ? "回关" : "关注")
      } : item.isFollow && item.isFans ? {} : {}, {
        l: item.isFollow && item.isFans,
        m: common_vendor.o(($event) => $options.onFollow(item.id, index), item.id),
        n: item.id
      });
    }),
    b: $props.loadStatus != "none"
  }, $props.loadStatus != "none" ? common_vendor.e({
    c: $props.list.length === 0 && $props.loadStatus == "nomore"
  }, $props.list.length === 0 && $props.loadStatus == "nomore" ? {
    d: common_vendor.p({
      text: $props.tips ? $props.tips : "暂无用户",
      mode: "list"
    })
  } : {
    e: common_vendor.p({
      ["margin-bottom"]: "50",
      ["margin-top"]: "50",
      status: $props.loadStatus,
      loadingIcon: "semicircle"
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fc53f6bd"], ["__file", "D:/潘坤鹏/Desktop/school-wx/components/p-user-list/p-user-list.vue"]]);
wx.createComponent(Component);
