"use strict";
const utils_request = require("../utils/request.js");
const _getPhoneNumber = (data) => {
  return utils_request.request({
    url: "/wx/getPhoneNumber",
    method: "POST",
    data
  });
};
exports._getPhoneNumber = _getPhoneNumber;
