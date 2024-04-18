"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
const api_user = require("../../api/user.js");
const api_topic = require("../../api/topic.js");
require("../../stores/index.js");
const stores_user = require("../../stores/user.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/app.js");
const store = stores_user.useUserStore();
const _sfc_main = {
  name: "p-post-list",
  props: {
    list: Array,
    loadStatus: String,
    tips: String
  },
  emits: ["selectAction"],
  data() {
    return {
      showAction: false,
      actionList: [],
      choosePost: "",
      chooseIndex: ""
    };
  },
  computed: {
    userInfo: () => store.userInfo,
    topic_info: () => store.topic_info
  },
  mounted() {
  },
  methods: {
    async changeThumb(id, index) {
      const { data } = await api_post._thumbAdd({
        postId: id
      });
      if (data === 1) {
        this.list[index].hasThumb = 1;
        this.list[index].thumbNum++;
      } else {
        this.list[index].hasThumb = 0;
        this.list[index].thumbNum--;
      }
      this.$emit("selectAction", e);
    },
    jump(e2) {
      common_vendor.index.navigateTo({
        url: "/pages/post/detail?id=" + e2.postId
      });
    },
    formatFromTime(time) {
      return common_vendor.hooks(time).fromNow();
    },
    toUcenter(id) {
      common_vendor.index.navigateTo({
        url: "/pages/user/user?userId=" + id
      });
    },
    onActive(post, index) {
      this.showAction = true;
      this.choosePost = post;
      this.chooseIndex = index;
      this.actionList = [];
      if (post.userInfo.id !== this.userInfo.id) {
        this.actionList.push({
          name: post.isFollow ? "取消关注" : "关注TA",
          key: "follow"
        });
        this.actionList.push({
          name: post.hasFavour ? "取消收藏" : "收藏",
          key: "favour"
        });
      } else {
        this.actionList.push({
          name: "编辑",
          key: "update"
        });
        this.actionList.push({
          name: "删除",
          color: "red",
          key: "delete"
        });
      }
      if (store.isTopicAdmin) {
        this.actionList.unshift({
          name: post.isTop ? "取消置顶" : "置顶",
          key: post.isTop ? "cancel_topic" : "topic"
        });
      }
      this.$refs.actionSheet.open();
    },
    async onFollow() {
      const res = await api_user._follow({ followeeId: this.choosePost.userInfo.id });
      common_vendor.index.showToast({ icon: "none", title: res.data ? "已关注！" : "已取关！" });
      this.list.forEach((item) => {
        if (item.userInfo.id === this.choosePost.userInfo.id) {
          item.isFollow = res.data;
        }
      });
    },
    async onFavour() {
      const res = await api_post._favourAdd({ postId: this.choosePost.postId });
      common_vendor.index.showToast({ icon: "none", title: res.data ? "收藏成功！" : "取消收藏" });
      this.choosePost.hasFavour = res.data;
    },
    async postDel() {
      await api_post._postDel({ postId: this.choosePost.postId });
      common_vendor.index.showToast({ icon: "none", title: "删除成功" });
      this.list.splice(this.chooseIndex, 1);
    },
    async actionSelect(e2) {
      let key = e2.key;
      if (key === "follow") {
        await this.onFollow();
      }
      if (key === "favour") {
        await this.onFavour();
      }
      if (key == "delete") {
        await this.postDel();
      }
      if (key == "update") {
        common_vendor.index.navigateTo({
          url: "/pages/post/add?postId=" + this.choosePost.postId
        });
      }
      if (key === "topic") {
        const json = {
          postId: this.choosePost.postId,
          topic_id: store.topic_info.id
        };
        await api_topic._addTop(json);
        common_vendor.index.showToast({ icon: "none", title: "置顶成功" });
        this.choosePost.isTop = 1;
      }
      if (key === "cancel_topic") {
        await api_topic._deleteTop(store.topic_info.id, this.choosePost.postId);
        common_vendor.index.showToast({ icon: "none", title: "取消置顶成功" });
        this.choosePost.isTop = 0;
      }
      this.$emit("selectAction", e2);
    },
    previewImage(url, urls) {
      let imgList = [];
      urls.forEach((item) => {
        imgList.push(this.$utils.imgPath(item));
      });
      common_vendor.index.previewImage({
        current: this.$utils.imgPath(url),
        // 当前显示图片的http链接
        urls: imgList
        // 需要预览的图片http链接列表
      });
    }
  }
};
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_tags2 = common_vendor.resolveComponent("uv-tags");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_action_sheet2 = common_vendor.resolveComponent("uv-action-sheet");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  (_easycom_uv_avatar2 + _easycom_uv_tags2 + _easycom_uv_icon2 + _easycom_uv_action_sheet2 + _easycom_uv_empty2 + _easycom_uv_load_more2)();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_tags = () => "../../uni_modules/uv-tags/components/uv-tags/uv-tags.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_action_sheet = () => "../../uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_tags + _easycom_uv_icon + _easycom_uv_action_sheet + _easycom_uv_empty + _easycom_uv_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.list
  }, $props.list ? {
    b: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: "af962123-0-" + i0,
        b: common_vendor.p({
          customStyle: {
            marginRight: "20rpx"
          },
          src: _ctx.imgPath(item.userInfo.avatar)
        }),
        c: common_vendor.o(($event) => $options.toUcenter(item.userInfo.id), index),
        d: item.userInfo
      }, item.userInfo ? {
        e: common_vendor.t(item.userInfo.nickname.substring(0, 12))
      } : {}, {
        f: item.userInfo.id === $options.topic_info.userId
      }, item.userInfo.id === $options.topic_info.userId ? {
        g: "af962123-1-" + i0,
        h: common_vendor.p({
          text: "圈主",
          size: "mini"
        })
      } : {}, {
        i: item.isTop
      }, item.isTop ? {
        j: "af962123-2-" + i0,
        k: common_vendor.p({
          text: "置顶",
          size: "mini",
          bgColor: "#3C9CFF",
          borderColor: "#3C9CFF"
        })
      } : {}, {
        l: common_vendor.t($options.formatFromTime(item.createTime)),
        m: common_vendor.o(($event) => $options.toUcenter(item.userInfo.id), index),
        n: common_vendor.o(($event) => $options.onActive(item, index), index),
        o: "af962123-3-" + i0,
        p: item.type == 1
      }, item.type == 1 ? {
        q: common_vendor.t(item.title)
      } : {
        r: common_vendor.t(item.content)
      }, {
        s: item.type == 2
      }, item.type == 2 ? common_vendor.e({
        t: item.media.length == 1
      }, item.media.length == 1 ? {
        v: _ctx.$utils.imgPath(item.media[0]),
        w: common_vendor.o(($event) => $options.previewImage(item.media[0], item.media), index)
      } : {}, {
        x: item.media.length == 2
      }, item.media.length == 2 ? {
        y: common_vendor.f(item.media, (mediaItem, index2, i1) => {
          return {
            a: index2,
            b: common_vendor.o(($event) => $options.previewImage(mediaItem, item.media), index2),
            c: _ctx.$utils.imgPath(mediaItem)
          };
        })
      } : {}, {
        z: item.media.length > 2
      }, item.media.length > 2 ? {
        A: common_vendor.f(item.media, (mediaItem, index2, i1) => {
          return {
            a: index2,
            b: common_vendor.o(($event) => $options.previewImage(mediaItem, item.media), index2),
            c: _ctx.$utils.imgPath(mediaItem)
          };
        })
      } : {}) : {}, {
        B: common_vendor.f(item.tags, (tag, k1, i1) => {
          return {
            a: "af962123-4-" + i0 + "-" + i1,
            b: common_vendor.p({
              text: "#" + tag,
              plain: true,
              size: "mini",
              shape: "circle",
              borderColor: "#efefef",
              color: "#000"
            }),
            c: tag
          };
        }),
        C: "af962123-5-" + i0,
        D: common_vendor.t(item.viewNum),
        E: "af962123-6-" + i0,
        F: common_vendor.t(item.commentNum),
        G: "af962123-7-" + i0,
        H: common_vendor.t(item.thumbNum),
        I: item.hasThumb,
        J: common_vendor.o(($event) => $options.changeThumb(item.postId, index), index),
        K: "af962123-8-" + i0,
        L: common_vendor.t(item.thumbNum),
        M: !item.hasThumb,
        N: common_vendor.o(($event) => $options.changeThumb(item.postId, index), index),
        O: common_vendor.o(($event) => $options.jump(item), index),
        P: index
      });
    }),
    c: common_vendor.p({
      size: 20,
      name: "more-dot-fill"
    }),
    d: common_vendor.p({
      name: "eye"
    }),
    e: common_vendor.p({
      name: "chat"
    }),
    f: common_vendor.p({
      name: "thumb-up-fill",
      color: "#cc0000"
    }),
    g: common_vendor.p({
      name: "thumb-up"
    }),
    h: common_vendor.sr("actionSheet", "af962123-9"),
    i: common_vendor.o($options.actionSelect),
    j: common_vendor.p({
      actions: $data.actionList,
      cancelText: "取消"
    })
  } : {}, {
    k: $props.list.length === 0 && $props.loadStatus == "nomore"
  }, $props.list.length === 0 && $props.loadStatus == "nomore" ? {
    l: common_vendor.p({
      text: $props.tips ? $props.tips : "暂无帖子",
      mode: "list"
    })
  } : {
    m: common_vendor.p({
      status: $props.loadStatus
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-af962123"], ["__file", "D:/潘坤鹏/Desktop/school-wx/components/p-post-list/p-post-list.vue"]]);
wx.createComponent(Component);
