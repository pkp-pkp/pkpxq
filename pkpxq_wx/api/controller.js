"use strict";
const utils_request = require("../utils/request.js");
const _getUploadDir = async (data) => {
  return utils_request.request({
    url: "/controller/getUploadDir",
    method: "POST",
    data
  });
};
const _delFile = async (data) => {
  return utils_request.request({
    url: "/controller/delUploadFile",
    method: "POST",
    data
  });
};
exports._delFile = _delFile;
exports._getUploadDir = _getUploadDir;
