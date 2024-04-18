"use strict";
const common_vendor = require("../common/vendor.js");
require("./app.js");
require("./user.js");
const pinia = common_vendor.createPinia();
exports.pinia = pinia;
