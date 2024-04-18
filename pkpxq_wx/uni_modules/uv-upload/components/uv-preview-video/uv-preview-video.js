"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    src: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      videoSrc: "",
      show: false
    };
  },
  computed: {
    getSec() {
      return this.src || this.videoSrc;
    }
  },
  methods: {
    open(url) {
      this.videoSrc = url;
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    change(e) {
      this.show = e.show;
    }
  }
};
if (!Array) {
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  _easycom_uv_popup2();
}
const _easycom_uv_popup = () => "../../../uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  _easycom_uv_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? {
    b: $options.getSec,
    c: $props.autoplay
  } : {}, {
    d: common_vendor.sr("popup", "0e12a980-0"),
    e: common_vendor.o($options.change)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e12a980"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-upload/components/uv-preview-video/uv-preview-video.vue"]]);
wx.createComponent(Component);
