"use strict";
const utils_request = require("../utils/request.js");
const _uploadPath = (filePath, type) => {
  return utils_request.uploadPath({
    url: "/upload?type=" + type,
    filePath
  });
};
const _uploadDel = (data) => {
  return utils_request.request({
    url: "/upload/del",
    method: "POST",
    data
  });
};
exports._uploadDel = _uploadDel;
exports._uploadPath = _uploadPath;
