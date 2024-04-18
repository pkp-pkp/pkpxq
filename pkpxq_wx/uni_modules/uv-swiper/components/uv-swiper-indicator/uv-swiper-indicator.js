"use strict";
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvSwiper_components_uvSwiperIndicator_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-swiper-indicator",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvSwiper_components_uvSwiperIndicator_props.props],
  data() {
    return {
      lineWidth: 22
    };
  },
  computed: {
    // 指示器为线型的样式
    lineStyle() {
      let style = {};
      style.width = this.$uv.addUnit(this.lineWidth);
      style.transform = `translateX(${this.$uv.addUnit(this.current * this.lineWidth)})`;
      style.backgroundColor = this.indicatorActiveColor;
      return style;
    },
    // 指示器为点型的样式
    dotStyle() {
      return (index) => {
        let style = {};
        style.backgroundColor = index === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor;
        return style;
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.indicatorMode === "line"
  }, _ctx.indicatorMode === "line" ? {
    b: common_vendor.s($options.lineStyle),
    c: common_vendor.n(`uv-swiper-indicator__wrapper--${_ctx.indicatorMode}`),
    d: _ctx.$uv.addUnit($data.lineWidth * _ctx.length),
    e: _ctx.indicatorInactiveColor
  } : {}, {
    f: _ctx.indicatorMode === "dot"
  }, _ctx.indicatorMode === "dot" ? {
    g: common_vendor.f(_ctx.length, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(index === _ctx.current && "uv-swiper-indicator__wrapper__dot--active"),
        c: common_vendor.s($options.dotStyle(index))
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-09034092"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-swiper/components/uv-swiper-indicator/uv-swiper-indicator.vue"]]);
wx.createComponent(Component);
