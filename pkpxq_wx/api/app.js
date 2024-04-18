"use strict";
const utils_request = require("../utils/request.js");
const _getAppHome = (data) => {
  return utils_request.request({
    url: "/app/home",
    method: "GET",
    data
  });
};
exports._getAppHome = _getAppHome;
