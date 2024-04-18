"use strict";
const common_vendor = require("../common/vendor.js");
const useShare = ({ title, imageUrl }) => {
  const share = common_vendor.ref({
    title,
    imageUrl
  });
  common_vendor.watchEffect(() => {
    common_vendor.wx$1.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    common_vendor.onShareAppMessage(() => {
      console.log(share.value, 222);
      return {
        title: share.value.title,
        imageUrl: share.value.imageUrl
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: share.value.title,
        imageUrl: share.value.imageUrl
      };
    });
  });
  return {
    share,
    onShareAppMessage: common_vendor.onShareAppMessage,
    onShareTimeline: common_vendor.onShareTimeline
  };
};
exports.useShare = useShare;
