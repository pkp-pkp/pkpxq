"use strict";
const utils_request = require("../utils/request.js");
const _getPostList = (data) => {
  return utils_request.request({
    url: "/post/list",
    method: "GET",
    data
  });
};
const _postAdd = (data) => {
  return utils_request.request({
    url: "/post/add",
    method: "POST",
    data
  });
};
const _postUpd = (data) => {
  return utils_request.request({
    url: "/post/upd",
    method: "POST",
    data
  });
};
const _postDel = (data) => {
  return utils_request.request({
    url: "/post/del",
    method: "POST",
    data
  });
};
const _postUpdGet = (data) => {
  return utils_request.request({
    url: "/post/upd/get",
    method: "GET",
    data
  });
};
const _getPostDetail = (data) => {
  return utils_request.request({
    url: "/post/detail",
    method: "GET",
    data
  });
};
const _getPostCategory = (data) => {
  return utils_request.request({
    url: "/post/category",
    method: "GET",
    data
  });
};
const _getPostComment = (data) => {
  return utils_request.request({
    url: "/post/comment",
    method: "GET",
    data
  });
};
const _getThumbList = (data) => {
  return utils_request.request({
    url: "/post/thumb",
    method: "GET",
    data
  });
};
const _thumbAdd = (data) => {
  return utils_request.request({
    url: "/post/thumb/add",
    method: "POST",
    data
  });
};
const _commentThumb = (data) => {
  return utils_request.request({
    url: "/post/comment/thumb",
    method: "POST",
    data
  });
};
const _commentAdd = (data) => {
  return utils_request.request({
    url: "/post/comment/add",
    method: "POST",
    data
  });
};
const _commentDel = (data) => {
  return utils_request.request({
    url: "/post/comment/del",
    method: "POST",
    data
  });
};
const _getFavourList = (data) => {
  return utils_request.request({
    url: "/post/favour",
    method: "GET",
    data
  });
};
const _favourAdd = (data) => {
  return utils_request.request({
    url: "/post/favour/add",
    method: "POST",
    data
  });
};
const _search = (data) => {
  return utils_request.request({
    url: "/post/search",
    method: "GET",
    data
  });
};
const _tagList = (data) => {
  return utils_request.request({
    url: "/post/tag/list",
    method: "GET",
    data
  });
};
exports._commentAdd = _commentAdd;
exports._commentDel = _commentDel;
exports._commentThumb = _commentThumb;
exports._favourAdd = _favourAdd;
exports._getFavourList = _getFavourList;
exports._getPostCategory = _getPostCategory;
exports._getPostComment = _getPostComment;
exports._getPostDetail = _getPostDetail;
exports._getPostList = _getPostList;
exports._getThumbList = _getThumbList;
exports._postAdd = _postAdd;
exports._postDel = _postDel;
exports._postUpd = _postUpd;
exports._postUpdGet = _postUpdGet;
exports._search = _search;
exports._tagList = _tagList;
exports._thumbAdd = _thumbAdd;
