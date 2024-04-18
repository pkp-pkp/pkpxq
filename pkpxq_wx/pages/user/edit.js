"use strict";
const utils_request = require("../../utils/request.js");
const api_user = require("../../api/user.js");
const stores_user = require("../../stores/user.js");
const common_vendor = require("../../common/vendor.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/topic.js");
const store = stores_user.useUserStore();
const _sfc_main = {
  data() {
    return {
      form: {
        avatar: "",
        nickname: ""
      },
      type: "",
      value: "",
      title: "",
      actions: [
        { key: 1, name: "男" },
        { key: 2, name: "女" },
        { key: 0, name: "保密" }
      ]
    };
  },
  computed: {
    userInfo() {
      return store.userInfo;
    }
  },
  async onLoad() {
    await store.getUserInfo();
    this.form = this.userInfo;
  },
  methods: {
    showModal(type, title) {
      this.type = type;
      this.title = title;
      this.$refs.modal.open();
    },
    showSexSelect() {
      this.$refs.sexSelect.open();
    },
    async submit(field, value) {
      let res = await api_user._updateInfo({
        [field]: value
      });
      return res;
    },
    sexSelect(e) {
      this.form.sex = e.key;
      this.submit("sex", e.key);
    },
    ageSelect(e) {
      this.submit("age", e.detail.value);
    },
    async confirm() {
      const res = await this.submit(this.type, this.value);
      if (res.code == 200) {
        this.form[this.type] = this.value;
        this.value = "";
        this.$refs.modal.close();
      }
    },
    async onChooseAvatar(e) {
      let res = await api_user._updateAvatar(e.detail.avatarUrl);
      if (res.code == 200) {
        this.form.avatar = res.data.filePath;
      }
    },
    onChangeNickName(e) {
      this.value = e;
      console.log(e);
    },
    async getPhoneNumber(e) {
      console.log(e);
      let { errMsg, encryptedData, iv } = e.detail;
      if (errMsg === "getPhoneNumber:ok") {
        let code = await utils_request.getCode();
        let res = await api_user._getPhoneNumber({ encryptedData, iv, code });
        if (res.code === 200) {
          this.submit("mobile", res.data.phoneNumber);
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  const _easycom_uv_action_sheet2 = common_vendor.resolveComponent("uv-action-sheet");
  (_easycom_uv_image2 + _easycom_uv_icon2 + _easycom_uv_input2 + _easycom_uv_modal2 + _easycom_uv_action_sheet2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
const _easycom_uv_action_sheet = () => "../../uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_icon + _easycom_uv_input + _easycom_uv_modal + _easycom_uv_action_sheet)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      src: _ctx.$utils.imgPath($data.form.avatar),
      shape: "circle",
      width: "55px",
      height: "55px",
      mode: "scaleToFill"
    }),
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: $data.form.nickname,
    d: common_vendor.o(($event) => $options.showModal("nickname", "昵称")),
    e: common_vendor.p({
      color: "#afafaf",
      name: "arrow-right",
      size: "18"
    }),
    f: $data.form.sex == 0 ? "保密" : $data.form.sex == 1 ? "男" : "女",
    g: common_vendor.p({
      color: "#afafaf",
      name: "arrow-right",
      size: "18"
    }),
    h: common_vendor.o((...args) => $options.showSexSelect && $options.showSexSelect(...args)),
    i: $data.form.age,
    j: common_vendor.o((...args) => $options.ageSelect && $options.ageSelect(...args)),
    k: common_vendor.p({
      color: "#afafaf",
      name: "arrow-right",
      size: "18"
    }),
    l: $data.form.mobile
  }, $data.form.mobile ? {
    m: common_vendor.t($data.form.mobile)
  } : {}, {
    n: common_vendor.o((...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args)),
    o: common_vendor.p({
      color: "#afafaf",
      name: "arrow-right",
      size: "18"
    }),
    p: $data.form.brief,
    q: common_vendor.o(($event) => $options.showModal("brief", "简介")),
    r: common_vendor.p({
      color: "#afafaf",
      name: "arrow-right",
      size: "18"
    }),
    s: common_vendor.o($options.onChangeNickName),
    t: common_vendor.o(($event) => $data.value = $event),
    v: common_vendor.p({
      placeholder: "请输入内容",
      border: "surround",
      type: $data.type,
      modelValue: $data.value
    }),
    w: common_vendor.sr("modal", "590d0314-6"),
    x: common_vendor.o($options.confirm),
    y: common_vendor.p({
      title: $data.title
    }),
    z: common_vendor.sr("sexSelect", "590d0314-8"),
    A: common_vendor.o($options.sexSelect),
    B: common_vendor.p({
      actions: $data.actions,
      title: "请选择性别"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-590d0314"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/user/edit.vue"]]);
wx.createPage(MiniProgramPage);
