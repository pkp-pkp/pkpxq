"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvSearch_components_uvSearch_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/test.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-search",
  emits: ["click", "input", "change", "clear", "search", "custom", "focus", "blur", "clickIcon", "update:modelValue"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvSearch_components_uvSearch_props.props],
  data() {
    return {
      keyword: "",
      showClear: false,
      // 是否显示右边的清除图标
      show: false,
      // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
      focused: this.focus
    };
  },
  created() {
    this.keyword = this.modelValue;
  },
  watch: {
    value(nVal) {
      this.keyword = nVal;
    },
    modelValue(nVal) {
      this.keyword = nVal;
    }
  },
  computed: {
    showActionBtn() {
      return !this.animation && this.showAction;
    }
  },
  methods: {
    keywordChange() {
      this.$emit("input", this.keyword);
      this.$emit("update:modelValue", this.keyword);
      this.$emit("change", this.keyword);
    },
    // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
    inputChange(e) {
      this.keyword = e.detail.value;
      this.keywordChange();
    },
    // 清空输入
    // 也可以作为用户通过this.$refs形式调用清空输入框内容
    clear() {
      this.keyword = "";
      this.$nextTick(() => {
        this.$emit("clear");
      });
      this.keywordChange();
    },
    // 确定搜索
    search(e) {
      this.$emit("search", e.detail.value);
      try {
        common_vendor.index.hideKeyboard();
      } catch (e2) {
      }
    },
    // 点击右边自定义按钮的事件
    custom() {
      this.$emit("custom", this.keyword);
      try {
        common_vendor.index.hideKeyboard();
      } catch (e) {
      }
    },
    // 获取焦点
    getFocus() {
      this.focused = true;
      if (this.animation && this.showAction)
        this.show = true;
      this.$emit("focus", this.keyword);
    },
    // 失去焦点
    blur() {
      setTimeout(() => {
        this.focused = false;
      }, 100);
      this.show = false;
      this.$emit("blur", this.keyword);
    },
    // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
    clickHandler() {
      if (this.disabled)
        this.$emit("click");
    },
    // 点击左边图标
    clickIcon() {
      this.$emit("clickIcon");
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  _easycom_uv_icon2();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  _easycom_uv_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.disabled
  }, _ctx.disabled ? {} : {}, {
    b: common_vendor.o($options.clickIcon),
    c: common_vendor.p({
      size: _ctx.searchIconSize,
      name: _ctx.searchIcon,
      color: _ctx.searchIconColor ? _ctx.searchIconColor : _ctx.color
    }),
    d: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    e: $data.keyword,
    f: common_vendor.o((...args) => $options.search && $options.search(...args)),
    g: common_vendor.o((...args) => $options.inputChange && $options.inputChange(...args)),
    h: _ctx.disabled,
    i: common_vendor.o((...args) => $options.getFocus && $options.getFocus(...args)),
    j: _ctx.focus,
    k: _ctx.maxlength,
    l: _ctx.placeholder,
    m: `color: ${_ctx.placeholderColor}`,
    n: common_vendor.s({
      textAlign: _ctx.inputAlign,
      color: _ctx.color,
      backgroundColor: _ctx.bgColor,
      height: _ctx.$uv.addUnit(_ctx.height)
    }),
    o: common_vendor.s(_ctx.inputStyle),
    p: $data.keyword && _ctx.clearabled && $data.focused
  }, $data.keyword && _ctx.clearabled && $data.focused ? {
    q: common_vendor.p({
      name: "close",
      size: "11",
      color: "#ffffff",
      customStyle: "line-height: 12px"
    }),
    r: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    s: common_vendor.s({
      backgroundColor: _ctx.bgColor,
      borderRadius: _ctx.shape == "round" ? "100px" : "4px",
      borderColor: _ctx.borderColor
    }),
    t: common_vendor.s(_ctx.$uv.addStyle(_ctx.boxStyle)),
    v: common_vendor.t(_ctx.actionText),
    w: common_vendor.s(_ctx.actionStyle),
    x: common_vendor.n(($options.showActionBtn || $data.show) && "uv-search__action--active"),
    y: common_vendor.o((...args) => $options.custom && $options.custom(...args)),
    z: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    A: common_vendor.s({
      margin: _ctx.margin
    }),
    B: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46cbdd03"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-search/components/uv-search/uv-search.vue"]]);
wx.createComponent(Component);
