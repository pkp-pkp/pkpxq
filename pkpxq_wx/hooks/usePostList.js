"use strict";
const common_vendor = require("../common/vendor.js");
const api_post = require("../api/post.js");
const usePostList = () => {
  const list = common_vendor.ref([]);
  const loadStatus = common_vendor.ref("loadmore");
  const listPage = common_vendor.ref({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const resetList = () => {
    listPage.value = {
      page: 1,
      pageSize: 10,
      total: 0
    };
    list.value = [];
  };
  const tool_get_post = async (methods, otherParams) => {
    loadStatus.value = "loading";
    const res = await methods({
      ...listPage.value,
      ...otherParams
    });
    let {
      records,
      total
    } = res.data;
    let dataTotal = records.length + list.value.length;
    if (records.length === 0 && total > 0 || total === 0 || dataTotal === total) {
      loadStatus.value = "nomore";
    } else {
      loadStatus.value = "loadmore";
    }
    list.value = list.value.concat(records);
    listPage.value.total = total;
  };
  const getPostList = async (otherParams) => {
    tool_get_post(api_post._getPostList, otherParams);
  };
  const getFavourPost = async (otherParams) => {
    tool_get_post(api_post._getFavourList, otherParams);
  };
  const getThumbPost = async (otherParams) => {
    tool_get_post(api_post._getThumbList, otherParams);
  };
  const toSearchPost = async (otherParams) => {
    tool_get_post(api_post._search, otherParams);
  };
  return {
    list,
    loadStatus,
    listPage,
    resetList,
    getPostList,
    getFavourPost,
    getThumbPost,
    toSearchPost
  };
};
exports.usePostList = usePostList;
