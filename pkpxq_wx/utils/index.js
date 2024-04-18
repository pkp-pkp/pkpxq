"use strict";
const utils_config = require("./config.js");
const imgPath = (url) => {
  if (!url)
    return;
  if (url.includes("http://") || url.includes("https://")) {
    return url;
  } else {
    return utils_config.fileUrl + url;
  }
};
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  imgPath
}, Symbol.toStringTag, { value: "Module" }));
exports.imgPath = imgPath;
exports.utils = utils;
