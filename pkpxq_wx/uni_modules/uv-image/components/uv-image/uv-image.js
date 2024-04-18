"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvImage_components_uvImage_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-image",
  emits: ["click", "load", "error"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvImage_components_uvImage_props.props],
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {},
      // 用于fade模式的控制组件显示与否
      show: false,
      // 是否开启图片出现在可视范围进行加载（另一种懒加载）
      observeShow: !this.observeLazyLoad,
      elIndex: "",
      // 因为props的值无法修改，故需要一个中间值
      imgWidth: this.width,
      // 因为props的值无法修改，故需要一个中间值
      imgHeight: this.height,
      thresholdValue: 50
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.isError = true;
        } else {
          this.isError = false;
          this.loading = true;
        }
      }
    },
    width(newVal) {
      this.show = false;
      this.$uv.sleep(2).then((res) => {
        this.show = true;
      });
      this.imgWidth = newVal;
    },
    height(newVal) {
      this.show = false;
      this.$uv.sleep(2).then((res) => {
        this.show = true;
      });
      this.imgHeight = newVal;
    }
  },
  computed: {
    wrapStyle() {
      let style = {};
      if (this.mode !== "heightFix") {
        style.width = this.$uv.addUnit(this.imgWidth);
      }
      if (this.mode !== "widthFix") {
        style.height = this.$uv.addUnit(this.imgHeight);
      }
      style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
      style.overflow = this.radius > 0 ? "hidden" : "visible";
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    imageStyle() {
      let style = {};
      style.borderRadius = this.shape == "circle" ? "10000px" : this.$uv.addUnit(this.radius);
      return style;
    }
  },
  created() {
    this.elIndex = this.$uv.guid();
    this.observer = {};
    this.observerName = "lazyLoadContentObserver";
  },
  mounted() {
    this.show = true;
    this.$nextTick(() => {
      if (this.observeLazyLoad)
        this.observerFn();
    });
  },
  methods: {
    // 点击图片
    onClick() {
      this.$emit("click");
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit("error", err);
    },
    // 图片加载完成，标记loading结束
    onLoadHandler(event) {
      if (this.mode == "widthFix")
        this.imgHeight = "auto";
      if (this.mode == "heightFix")
        this.imgWidth = "auto";
      this.loading = false;
      this.isError = false;
      this.$emit("load", event);
      this.removeBgColor();
    },
    // 移除图片的背景色
    removeBgColor() {
      this.backgroundStyle = {
        backgroundColor: "transparent"
      };
    },
    // 观察图片是否在可见视口
    observerFn() {
      this.$nextTick(() => {
        common_vendor.index.$once("onLazyLoadReachBottom", () => {
          if (!this.observeShow)
            this.observeShow = true;
        });
      });
      setTimeout(() => {
        this.disconnectObserver(this.observerName);
        const contentObserver = common_vendor.index.createIntersectionObserver(this);
        contentObserver.relativeToViewport({
          bottom: this.thresholdValue
        }).observe(`.uv-image--${this.elIndex}`, (res) => {
          if (res.intersectionRatio > 0) {
            this.observeShow = true;
            this.disconnectObserver(this.observerName);
          }
        });
        this[this.observerName] = contentObserver;
      }, 50);
    },
    disconnectObserver(observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  (_easycom_uv_icon2 + _easycom_uv_transition2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_transition = () => "../../../uv-transition/components/uv-transition/uv-transition.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: !$data.isError && $data.observeShow
  }, !$data.isError && $data.observeShow ? {
    c: _ctx.src,
    d: _ctx.mode,
    e: common_vendor.o((...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
    f: common_vendor.o((...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
    g: _ctx.showMenuByLongpress,
    h: _ctx.lazyLoad,
    i: common_vendor.s($options.imageStyle),
    j: _ctx.webp
  } : {}, {
    k: _ctx.showLoading && $data.loading
  }, _ctx.showLoading && $data.loading ? {
    l: common_vendor.p({
      name: _ctx.loadingIcon,
      width: _ctx.width,
      height: _ctx.height
    }),
    m: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
    n: _ctx.bgColor,
    o: _ctx.$uv.addUnit(_ctx.width),
    p: _ctx.$uv.addUnit(_ctx.height)
  } : {}, {
    q: _ctx.showError && $data.isError && !$data.loading
  }, _ctx.showError && $data.isError && !$data.loading ? {
    r: common_vendor.p({
      name: _ctx.errorIcon,
      width: _ctx.width,
      height: _ctx.height
    }),
    s: _ctx.shape == "circle" ? "50%" : _ctx.$uv.addUnit(_ctx.radius),
    t: _ctx.$uv.addUnit(_ctx.width),
    v: _ctx.$uv.addUnit(_ctx.height)
  } : {}, {
    w: common_vendor.n(`uv-image--${$data.elIndex}`),
    x: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    y: common_vendor.s($options.wrapStyle),
    z: common_vendor.s($data.backgroundStyle),
    A: common_vendor.p({
      show: $data.show,
      mode: "fade",
      duration: _ctx.fade ? _ctx.duration : 0,
      ["cell-child"]: _ctx.cellChild,
      ["custom-style"]: $options.wrapStyle
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8fe9e33e"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-image/components/uv-image/uv-image.vue"]]);
wx.createComponent(Component);
