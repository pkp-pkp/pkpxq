"use strict";
const common_vendor = require("../common/vendor.js");
const api_user = require("../api/user.js");
const useUserList = () => {
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
  const tool_get_user = async (methods, otherParams) => {
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
  const getUserList = async (otherParams) => {
    tool_get_user(api_user._getUsertList, otherParams);
  };
  const getFollowList = async (otherParams) => {
    tool_get_user(api_user._getFollowList, otherParams);
  };
  const getFansList = async (otherParams) => {
    tool_get_user(api_user._getFansList, otherParams);
  };
  return {
    list,
    loadStatus,
    listPage,
    resetList,
    getUserList,
    getFollowList,
    getFansList
  };
};
exports.useUserList = useUserList;
