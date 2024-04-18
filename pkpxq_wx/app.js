"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const stores_index = require("./stores/index.js");
const stores_user = require("./stores/user.js");
const utils_index = require("./utils/index.js");
require("./utils/config.js");
require("./stores/app.js");
require("./api/user.js");
require("./api/topic.js");
if (!Math) {
  "./pages/main/main.js";
  "./pages/wx_api/wx_api.js";
  "./pages/api_test/api_test.js";
  "./pages/login/login.js";
  "./pages/post/detail.js";
  "./pages/user/user.js";
  "./pages/user/post_favour.js";
  "./pages/post/add.js";
  "./pages/user/fans.js";
  "./pages/user/follow.js";
  "./pages/user/edit.js";
  "./pages/search/search.js";
  "./pages/post/tag.js";
  "./pages/error/error.js";
}
const store = stores_user.useUserStore();
const _sfc_main = {
  onLaunch: async function() {
    utils_request.getNewToken().catch((e) => {
    });
    store.getTopicInfo();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/潘坤鹏/Desktop/school-wx/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$utils = { ...utils_index.utils };
  app.config.globalProperties.imgPath = utils_index.imgPath;
  app.use(stores_index.pinia);
  return {
    app,
    pinia: stores_index.pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
