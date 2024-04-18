"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvSwiper_components_uvSwiper_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-swiper",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvSwiper_components_uvSwiper_props.props],
  emits: ["click", "change"],
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {
    current(val, preVal) {
      if (val === preVal)
        return;
      this.currentIndex = val;
    }
  },
  computed: {
    itemStyle() {
      return (index) => {
        const style = {};
        if (this.nextMargin && this.previousMargin) {
          style.borderRadius = this.$uv.addUnit(this.radius);
          if (index !== this.currentIndex)
            style.transform = "scale(0.92)";
        }
        return style;
      };
    }
  },
  methods: {
    getItemType(item) {
      if (typeof item === "string")
        return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
      if (typeof item === "object" && this.keyName) {
        if (!item.type)
          return this.$uv.test.video(this.getSource(item)) ? "video" : "image";
        if (item.type === "image")
          return "image";
        if (item.type === "video")
          return "video";
        return "image";
      }
    },
    // 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
    getSource(item) {
      if (typeof item === "string")
        return item;
      if (typeof item === "object" && this.keyName)
        return item[this.keyName];
      else
        this.$uv.error("请按格式传递列表参数");
      return "";
    },
    // 轮播切换事件
    change(e) {
      const {
        current
      } = e.detail;
      this.pauseVideo(this.currentIndex);
      this.currentIndex = current;
      this.$emit("change", e.detail);
    },
    // 切换轮播时，暂停视频播放
    pauseVideo(index) {
      const lastItem = this.getSource(this.list[index]);
      if (this.$uv.test.video(lastItem)) {
        const video = common_vendor.index.createVideoContext(`video-${index}`, this);
        video.pause();
      }
    },
    // 当一个轮播item为视频时，获取它的视频海报
    getPoster(item) {
      return typeof item === "object" && item.poster ? item.poster : "";
    },
    // 点击某个item
    clickHandler(index) {
      this.$emit("click", index);
    }
  }
};
if (!Array) {
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  const _easycom_uv_swiper_indicator2 = common_vendor.resolveComponent("uv-swiper-indicator");
  (_easycom_uv_loading_icon2 + _easycom_uv_swiper_indicator2)();
}
const _easycom_uv_loading_icon = () => "../../../uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
const _easycom_uv_swiper_indicator = () => "../uv-swiper-indicator/uv-swiper-indicator.js";
if (!Math) {
  (_easycom_uv_loading_icon + _easycom_uv_swiper_indicator)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? {
    b: common_vendor.p({
      mode: "circle"
    })
  } : {
    c: common_vendor.f(_ctx.list, (item, index, i0) => {
      return common_vendor.e({
        a: $options.getItemType(item) === "image"
      }, $options.getItemType(item) === "image" ? {
        b: $options.getSource(item),
        c: _ctx.imgMode,
        d: common_vendor.o(($event) => $options.clickHandler(index), index),
        e: _ctx.$uv.addUnit(_ctx.height),
        f: _ctx.$uv.addUnit(_ctx.radius)
      } : {}, {
        g: $options.getItemType(item) === "video"
      }, $options.getItemType(item) === "video" ? {
        h: `video-${index}`,
        i: $options.getSource(item),
        j: $options.getPoster(item),
        k: _ctx.showTitle && _ctx.$uv.test.object(item) && item.title ? item.title : "",
        l: _ctx.$uv.addUnit(_ctx.height),
        m: common_vendor.o(($event) => $options.clickHandler(index), index)
      } : {}, {
        n: _ctx.showTitle && _ctx.$uv.test.object(item) && item.title
      }, _ctx.showTitle && _ctx.$uv.test.object(item) && item.title ? {
        o: common_vendor.t(item.title),
        p: common_vendor.s(_ctx.$uv.addStyle(_ctx.titleStyle))
      } : {}, {
        q: common_vendor.s($options.itemStyle(index)),
        r: index
      });
    }),
    d: _ctx.$uv.addUnit(_ctx.height),
    e: common_vendor.o((...args) => $options.change && $options.change(...args)),
    f: _ctx.circular,
    g: _ctx.vertical,
    h: _ctx.interval,
    i: _ctx.duration,
    j: _ctx.autoplay,
    k: _ctx.current,
    l: _ctx.currentItemId,
    m: _ctx.$uv.addUnit(_ctx.previousMargin),
    n: _ctx.$uv.addUnit(_ctx.nextMargin),
    o: _ctx.acceleration,
    p: _ctx.displayMultipleItems,
    q: _ctx.easingFunction
  }, {
    r: !_ctx.loading && _ctx.indicator && !_ctx.showTitle
  }, !_ctx.loading && _ctx.indicator && !_ctx.showTitle ? {
    s: common_vendor.p({
      indicatorActiveColor: _ctx.indicatorActiveColor,
      indicatorInactiveColor: _ctx.indicatorInactiveColor,
      length: _ctx.list.length,
      current: $data.currentIndex,
      indicatorMode: _ctx.indicatorMode
    })
  } : {}, {
    t: common_vendor.s(_ctx.$uv.addStyle(_ctx.indicatorStyle)),
    v: _ctx.bgColor,
    w: _ctx.$uv.addUnit(_ctx.height),
    x: _ctx.$uv.addUnit(_ctx.radius)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7522af0b"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-swiper/components/uv-swiper/uv-swiper.vue"]]);
wx.createComponent(Component);
