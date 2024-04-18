"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
const api_api = require("../../api/api.js");
require("../../stores/index.js");
const stores_app = require("../../stores/app.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/user.js");
require("../../api/user.js");
require("../../api/topic.js");
const store_app = stores_app.useAppStore();
const _sfc_main = {
  data() {
    return {
      postId: null,
      form: {
        title: "",
        content: "",
        type: 2,
        cateId: "",
        media: [],
        tags: []
      },
      cateList: [],
      fileList: []
    };
  },
  async onLoad(options) {
    let { postId, type } = options;
    if (postId !== void 0) {
      this.postId = postId = +postId;
      common_vendor.index.setNavigationBarTitle({
        title: "编辑"
      });
      const res = await api_post._postUpdGet({
        postId
      });
      if (res.code == 200) {
        let { title, content, cateId, type: type2, media, tags } = res.data;
        this.form = {
          ...this.form,
          title,
          content,
          cateId,
          type: type2,
          media,
          tags
        };
        this.fileList = media.map((item) => ({
          status: "success",
          url: this.$utils.imgPath(item),
          filePath: item
        }));
      }
    }
    if (type !== void 0) {
      this.form.type = type;
    }
    this.getCate();
  },
  methods: {
    radioClick(name) {
      this.cateList.map((item, index) => {
        item.checked = item.cateId === name ? true : false;
      });
    },
    openSelectTag() {
      this.$refs.tagSelect._show();
    },
    selectTag(tags) {
      this.form.tags = tags;
    },
    async getCate() {
      const res = await api_post._getPostCategory();
      this.cateList = res.data.map((item) => {
        item.checked = false;
        return item;
      });
      this.cateList[0].checked = true;
    },
    async afterRead(info) {
      let { file, name } = info;
      console.log(info, "after");
      let fileStatus = file.map((item) => {
        return {
          status: "uploading",
          url: item.url
        };
      });
      this.fileList = this.fileList.concat(fileStatus);
      for (let index in file) {
        let item = file[index];
        let res = await api_api._uploadPath(item.url, "post");
        if (res.code == 200) {
          this.fileList[index] = {
            status: "success",
            url: res.data.path,
            filePath: res.data.filePath
          };
        } else {
          this.fileList[index].status = "failed";
        }
      }
    },
    async delFile(e) {
      let { file, index } = e;
      this.fileList.splice(index, 1);
      await api_api._uploadDel({ path: file.filePath });
    },
    async release() {
      let cate = this.cateList.find((item) => item.checked);
      this.form.cateId = cate.cateId;
      this.form.media = this.fileList.map((item) => item.filePath);
      if (!this.form.title) {
        common_vendor.index.showToast({
          title: "标题不能为空",
          icon: "none"
        });
        return;
      }
      if (!this.form.content) {
        common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none"
        });
        return;
      }
      if (this.postId) {
        const res = await api_post._postUpd({ ...this.form, postId: this.postId });
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: res.msg
          });
        }
      } else {
        const res = await api_post._postAdd(this.form);
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: res.msg
          });
        }
      }
      common_vendor.index.navigateBack();
      store_app.reload.home = true;
    }
  }
};
if (!Array) {
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_tags2 = common_vendor.resolveComponent("uv-tags");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_p_tag_select2 = common_vendor.resolveComponent("p-tag-select");
  (_easycom_uv_upload2 + _easycom_uv_line2 + _easycom_uv_tags2 + _easycom_uv_button2 + _easycom_p_tag_select2)();
}
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_tags = () => "../../uni_modules/uv-tags/components/uv-tags/uv-tags.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_p_tag_select = () => "../../components/p-tag-select/p-tag-select.js";
if (!Math) {
  (_easycom_uv_upload + _easycom_uv_line + _easycom_uv_tags + _easycom_uv_button + _easycom_p_tag_select)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.form.title,
    b: common_vendor.o(($event) => $data.form.title = $event.detail.value),
    c: $data.form.content,
    d: common_vendor.o(($event) => $data.form.content = $event.detail.value),
    e: $data.form.type == 2
  }, $data.form.type == 2 ? {
    f: common_vendor.o($options.afterRead),
    g: common_vendor.o($options.delFile),
    h: common_vendor.p({
      fileList: $data.fileList,
      name: "image",
      ["size-type"]: ["original"],
      ["max-count"]: 9,
      multiple: true
    })
  } : {}, {
    i: $data.form.type == 3
  }, $data.form.type == 3 ? {
    j: common_vendor.o($options.afterRead),
    k: common_vendor.o($options.delFile),
    l: common_vendor.p({
      fileList: $data.fileList,
      name: "video",
      accept: "video",
      ["max-count"]: 1,
      multiple: true
    })
  } : {}, {
    m: common_vendor.f($data.cateList, (item, index, i0) => {
      return {
        a: common_vendor.o($options.radioClick, item.cateId),
        b: "62be1288-3-" + i0,
        c: common_vendor.p({
          text: item.cateName,
          name: item.cateId,
          shape: "circle",
          bgColor: item.checked ? "#fff" : "#F4F4F4",
          borderColor: item.checked ? "var(--theme-color)" : "#F4F4F4",
          color: item.checked ? "var(--theme-color)" : "#000"
        }),
        d: item.cateId
      };
    }),
    n: $data.form.type == 1
  }, $data.form.type == 1 ? common_vendor.e({
    o: $data.form.tags.length == 0
  }, $data.form.tags.length == 0 ? {
    p: common_vendor.o($options.openSelectTag)
  } : {}, {
    q: common_vendor.f($data.form.tags, (item, k0, i0) => {
      return {
        a: common_vendor.o($options.openSelectTag, item),
        b: "62be1288-5-" + i0,
        c: common_vendor.p({
          text: item,
          plain: true
        }),
        d: item
      };
    }),
    r: common_vendor.sr("tagSelect", "62be1288-6"),
    s: common_vendor.o($options.selectTag)
  }) : {}, {
    t: common_vendor.t($data.postId ? "编辑" : "发布"),
    v: common_vendor.o($options.release),
    w: common_vendor.p({
      type: "primary",
      shape: "circle"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62be1288"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/post/add.vue"]]);
wx.createPage(MiniProgramPage);
