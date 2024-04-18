"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_function_test = require("../../../uv-ui-tools/libs/function/test.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const uni_modules_uvUpload_components_uvUpload_utils = require("./utils.js");
const uni_modules_uvUpload_components_uvUpload_mixin = require("./mixin.js");
const uni_modules_uvUpload_components_uvUpload_props = require("./props.js");
require("../../../uv-ui-tools/libs/function/index.js");
require("../../../uv-ui-tools/libs/function/digit.js");
require("../../../uv-ui-tools/libs/util/route.js");
require("../../../uv-ui-tools/libs/function/debounce.js");
require("../../../uv-ui-tools/libs/function/throttle.js");
const _sfc_main = {
  name: "uv-upload",
  emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin, uni_modules_uvUpload_components_uvUpload_mixin.mixin_accept, uni_modules_uvUpload_components_uvUpload_props.props],
  data() {
    return {
      lists: [],
      isInCount: true
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      deep: true,
      immediate: true,
      handler() {
        this.formatFileList();
      }
    },
    deletable(newVal) {
      if (!newVal) {
        this.lists.map((item) => {
          item.deletable = this.deletable;
        });
      }
    }
  },
  methods: {
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map(
        (item) => Object.assign(Object.assign({}, item), {
          // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
          isImage: this.accept === "image" || uni_modules_uvUiTools_libs_function_test.image(item.url || item.thumb),
          isVideo: this.accept === "video" || uni_modules_uvUiTools_libs_function_test.video(item.url || item.thumb),
          deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
        })
      );
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const {
          maxCount,
          multiple,
          lists,
          disabled
        } = this;
        if (disabled)
          return;
        let capture;
        try {
          capture = uni_modules_uvUiTools_libs_function_test.array(this.capture) ? this.capture : this.capture.split(",");
        } catch (e) {
          capture = [];
        }
        uni_modules_uvUpload_components_uvUpload_utils.chooseFile(
          Object.assign({
            accept: this.accept,
            multiple: this.multiple,
            capture,
            compressed: this.compressed,
            maxDuration: this.maxDuration,
            sizeType: this.sizeType,
            camera: this.camera
          }, {
            maxCount: maxCount - lists.length
          })
        ).then((res) => {
          this.onBeforeRead(multiple ? res : res[0]);
        }).catch((error) => {
          this.$emit("error", error);
        });
      }, 100);
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = true;
      if (uni_modules_uvUiTools_libs_function_test.func(beforeRead)) {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            "beforeRead",
            Object.assign(Object.assign({
              file
            }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject();
              }
            })
          );
        });
      }
      if (!res) {
        return;
      }
      if (uni_modules_uvUiTools_libs_function_test.promise(res)) {
        res.then((data) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },
    onAfterRead(file) {
      const {
        maxSize,
        afterRead
      } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        this.$emit("oversize", Object.assign({
          file
        }, this.getDetail()));
        return;
      }
      if (typeof afterRead === "function") {
        afterRead(file, this.getDetail());
      }
      this.$emit("afterRead", Object.assign({
        file
      }, this.getDetail()));
    },
    deleteItem(index) {
      this.$emit(
        "delete",
        Object.assign(Object.assign({}, this.getDetail(index)), {
          file: this.fileList[index]
        })
      );
    },
    // 预览图片
    onPreviewImage(item, index) {
      const lists = this.$uv.deepClone(this.lists);
      lists.map((i, j) => {
        if (j == index) {
          i.current = true;
        }
      });
      const filters = lists.filter((i) => i.isImage);
      const findIndex = filters.findIndex((i) => i.current);
      this.onClickPreview(item, index);
      if (!item.isImage || !this.previewFullImage)
        return;
      common_vendor.index.previewImage({
        // 先filter找出为图片的item，再返回filter结果中的图片url
        urls: this.lists.filter((item2) => this.accept === "image" || uni_modules_uvUiTools_libs_function_test.image(item2.url || item2.thumb)).map((item2) => item2.url || item2.thumb),
        current: findIndex,
        fail() {
          this.$uv.toast("预览图片失败");
        }
      });
    },
    onPreviewVideo(item, index) {
      this.onClickPreview(item, index);
      if (!this.previewFullVideo || !item.isVideo)
        return;
      this.$refs.previewVideo.open(item.url);
    },
    onClickPreview(item, index) {
      this.$emit(
        "clickPreview",
        Object.assign(Object.assign({}, item), this.getDetail(index))
      );
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_loading_icon2 = common_vendor.resolveComponent("uv-loading-icon");
  const _easycom_uv_preview_video2 = common_vendor.resolveComponent("uv-preview-video");
  (_easycom_uv_icon2 + _easycom_uv_loading_icon2 + _easycom_uv_preview_video2)();
}
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_loading_icon = () => "../../../uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js";
const _easycom_uv_preview_video = () => "../uv-preview-video/uv-preview-video.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_loading_icon + _easycom_uv_preview_video)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.previewImage
  }, _ctx.previewImage ? {
    b: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e({
        a: item.isImage || item.type && item.type === "image"
      }, item.isImage || item.type && item.type === "image" ? {
        b: item.thumb || item.url,
        c: _ctx.imageMode,
        d: common_vendor.o(($event) => $options.onPreviewImage(item, index), index),
        e: common_vendor.s({
          width: _ctx.$uv.addUnit(_ctx.width),
          height: _ctx.$uv.addUnit(_ctx.height)
        })
      } : {
        f: "822c46b5-0-" + i0,
        g: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
        }),
        h: common_vendor.t(item.isVideo || item.type && item.type === "video" ? "视频" : "文件"),
        i: common_vendor.o(($event) => $options.onPreviewVideo(item, index), index),
        j: common_vendor.s({
          width: _ctx.$uv.addUnit(_ctx.width),
          height: _ctx.$uv.addUnit(_ctx.height)
        })
      }, {
        k: item.status === "uploading" || item.status === "failed"
      }, item.status === "uploading" || item.status === "failed" ? common_vendor.e({
        l: item.status === "failed"
      }, item.status === "failed" ? {
        m: "822c46b5-1-" + i0,
        n: common_vendor.p({
          name: "close-circle",
          color: "#ffffff",
          size: "25"
        })
      } : {
        o: "822c46b5-2-" + i0,
        p: common_vendor.p({
          size: "22",
          mode: "circle"
        })
      }, {
        q: item.message
      }, item.message ? {
        r: common_vendor.t(item.message)
      } : {}) : {}, {
        s: item.status !== "uploading" && (_ctx.deletable || item.deletable)
      }, item.status !== "uploading" && (_ctx.deletable || item.deletable) ? {
        t: "822c46b5-3-" + i0,
        v: common_vendor.p({
          name: "close",
          color: "#ffffff",
          size: "10"
        }),
        w: common_vendor.o(($event) => $options.deleteItem(index), index)
      } : {}, {
        x: item.status === "success"
      }, item.status === "success" ? {
        y: "822c46b5-4-" + i0,
        z: common_vendor.p({
          name: "checkmark",
          color: "#ffffff",
          size: "12"
        })
      } : {}, {
        A: index
      });
    })
  } : {}, {
    c: $data.isInCount
  }, $data.isInCount ? common_vendor.e({
    d: common_vendor.p({
      name: _ctx.uploadIcon,
      size: "26",
      color: _ctx.uploadIconColor
    }),
    e: _ctx.uploadText
  }, _ctx.uploadText ? {
    f: common_vendor.t(_ctx.uploadText)
  } : {}, {
    g: !_ctx.disabled ? "uv-upload__button--hover" : "",
    h: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    i: common_vendor.n(_ctx.disabled && "uv-upload__button--disabled"),
    j: common_vendor.s({
      width: _ctx.$uv.addUnit(_ctx.width),
      height: _ctx.$uv.addUnit(_ctx.height)
    }),
    k: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  }) : {}, {
    l: common_vendor.sr("previewVideo", "822c46b5-6"),
    m: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-822c46b5"], ["__file", "D:/潘坤鹏/Desktop/school-wx/uni_modules/uv-upload/components/uv-upload/uv-upload.vue"]]);
wx.createComponent(Component);
