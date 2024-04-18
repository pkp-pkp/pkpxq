"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const stores_index = require("../stores/index.js");
const stores_user = require("../stores/user.js");
const store = stores_user.useUserStore(stores_index.pinia);
function logout() {
  common_vendor.index.removeStorageSync("token");
}
function login(data) {
  let header = {
    "Content-type": "application/json;charset=utf-8"
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: utils_config.baseUrl + "/user/wxLogin",
      data,
      header,
      method: "POST",
      success(res) {
        try {
          if (res.data.code === 200) {
            store.setBan(false);
            resolve(res.data);
          } else if (res.data.code === 403) {
            store.setBan(true);
            logout();
            reject(res);
          } else {
            logout();
            reject(res);
          }
        } catch (e) {
          reject(e);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function checkTempTokenList(url) {
  const tempTokenList = ["/upload", "/user/update"];
  return tempTokenList.some((item) => url.indexOf(item) >= 0);
}
function request(config) {
  let {
    url = "",
    method = "GET",
    data = {},
    header = {},
    callback
  } = config;
  header["Content-type"] = "application/json;charset=utf-8";
  let token = common_vendor.index.getStorageSync("token") || "";
  if (url.indexOf("/user/wxLogin") < 0) {
    header["Authorization"] = token;
  }
  if (!token && checkTempTokenList(url)) {
    header["Authorization"] = store.tempToken;
  }
  if (store.isBan) {
    common_vendor.index.reLaunch({
      url: "/pages/error/error?text=你已被封禁，请联系管理员"
    });
    return Promise.reject("被封禁");
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: utils_config.baseUrl + url,
      data,
      header,
      method,
      success(res) {
        if (callback) {
          return callback(res.data);
        }
        if (res.data.code === 401) {
          if (token && token !== "") {
            logout();
          }
          getNewToken().then((res2) => {
            config.callback = resolve;
            request(config);
          }).catch((e) => {
            common_vendor.index.showToast({
              title: "请先注册",
              icon: "none"
            });
            reject("需要注册");
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          });
        } else if (res.data.code === 200) {
          resolve(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.msg || "你的请求被拒绝了",
            icon: "none"
          });
          reject(res);
        }
      },
      fail(err) {
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "none"
        });
      }
    });
  });
}
function getCode() {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      async success(res) {
        resolve(res.code);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function getNewToken() {
  return new Promise(async (resolve, reject) => {
    try {
      let code = await getCode();
      let loginRes = await login({
        code
      });
      if (loginRes.data.token) {
        store.login(loginRes.data);
      }
      resolve(loginRes);
    } catch (e) {
      if (e.data.data.tempToken) {
        store.tempToken = e.data.data.tempToken;
      }
      reject(e.data.msg);
    }
  });
}
function uploadPath(config) {
  let {
    url,
    method = "POST",
    header = {
      "content-type": "multipart/form-data"
    },
    filePath,
    callback,
    name = "file"
  } = config;
  let token = common_vendor.index.getStorageSync("token") || "";
  if (url.indexOf("/user/wxLogin") < 0) {
    header["Authorization"] = token;
  }
  if (!token && checkTempTokenList(url)) {
    header["Authorization"] = store.tempToken;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.uploadFile({
      //图片上传地址
      url: utils_config.baseUrl + url,
      filePath,
      name,
      header,
      success: (res) => {
        res.data = JSON.parse(res.data);
        if (callback) {
          return callback(res.data);
        }
        if (res.statusCode === 401 || res.data.code === 401) {
          if (token && token !== "") {
            logout();
          }
          getNewToken().then((res2) => {
            config.callback = resolve;
            uploadPath(config);
          });
        } else if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
exports.getCode = getCode;
exports.getNewToken = getNewToken;
exports.request = request;
exports.uploadPath = uploadPath;
