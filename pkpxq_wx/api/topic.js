"use strict";
const utils_request = require("../utils/request.js");
const _getTopicInfo = (id) => {
  return utils_request.request({
    url: "/topic/" + id,
    method: "GET"
  });
};
const _addTop = (data) => {
  return utils_request.request({
    url: "/topic/top",
    method: "POST",
    data
  });
};
const _deleteTop = (topic_id, postId) => {
  return utils_request.request({
    url: `/topic/top/${topic_id}/${postId}`,
    method: "DELETE"
  });
};
exports._addTop = _addTop;
exports._deleteTop = _deleteTop;
exports._getTopicInfo = _getTopicInfo;
