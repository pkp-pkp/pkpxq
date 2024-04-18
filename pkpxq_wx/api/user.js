"use strict";
const utils_request = require("../utils/request.js");
const _userInfo = (data) => {
  return utils_request.request({
    url: "/user/info",
    method: "POST",
    data
  });
};
const _getUsertList = (data) => {
  return utils_request.request({
    url: "/user/list",
    method: "GET",
    data
  });
};
const _userInfoById = (data) => {
  return utils_request.request({
    url: "/user/infoById",
    method: "POST",
    data
  });
};
const _updateInfo = (data) => {
  return utils_request.request({
    url: "/user/update",
    method: "POST",
    data
  });
};
const _follow = (data) => {
  return utils_request.request({
    url: "/user/follow",
    method: "POST",
    data
  });
};
const _getPhoneNumber = (data) => {
  return utils_request.request({
    url: "/wx/getPhoneNumber",
    method: "POST",
    data
  });
};
const _getFollowList = (data) => {
  return utils_request.request({
    url: "/user/list/follow",
    method: "GET",
    data
  });
};
const _getFansList = (data) => {
  return utils_request.request({
    url: "/user/list/fans",
    method: "GET",
    data
  });
};
const _updateAvatar = (filePath) => {
  return utils_request.uploadPath({
    url: "/user/avatar",
    method: "post",
    name: "avatar",
    filePath
  });
};
exports._follow = _follow;
exports._getFansList = _getFansList;
exports._getFollowList = _getFollowList;
exports._getPhoneNumber = _getPhoneNumber;
exports._getUsertList = _getUsertList;
exports._updateAvatar = _updateAvatar;
exports._updateInfo = _updateInfo;
exports._userInfo = _userInfo;
exports._userInfoById = _userInfoById;
