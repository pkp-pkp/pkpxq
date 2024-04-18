"use strict";
const common_vendor = require("../../../../common/vendor.js");
function pickExclude(obj, keys) {
  if (!["[object Object]", "[object File]"].includes(Object.prototype.toString.call(obj))) {
    return {};
  }
  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}
function formatImage(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["path"]),
    type: "image",
    url: item.path,
    thumb: item.path,
    size: item.size
  }));
}
function formatVideo(res) {
  return [
    {
      ...pickExclude(res, ["tempFilePath", "thumbTempFilePath", "errMsg"]),
      type: "video",
      url: res.tempFilePath,
      thumb: res.thumbTempFilePath,
      size: res.size
    }
  ];
}
function formatMedia(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["fileType", "thumbTempFilePath", "tempFilePath"]),
    type: res.type,
    url: item.tempFilePath,
    thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size
  }));
}
function formatFile(res) {
  return res.tempFiles.map((item) => ({
    ...pickExclude(item, ["path"]),
    url: item.path,
    size: item.size
  }));
}
function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount
}) {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case "image":
        common_vendor.index.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType,
          success: (res) => resolve(formatImage(res)),
          fail: reject
        });
        break;
      case "media":
        common_vendor.wx$1.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration,
          sizeType,
          camera,
          success: (res) => resolve(formatMedia(res)),
          fail: reject
        });
        break;
      case "video":
        common_vendor.index.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: (res) => resolve(formatVideo(res)),
          fail: reject
        });
        break;
      case "file":
        common_vendor.wx$1.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: (res) => resolve(formatFile(res)),
          fail: reject
        });
        break;
      default:
        common_vendor.wx$1.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: "all",
          success: (res) => resolve(formatFile(res)),
          fail: reject
        });
    }
  });
}
exports.chooseFile = chooseFile;
