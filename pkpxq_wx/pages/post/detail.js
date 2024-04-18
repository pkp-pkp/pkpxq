"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
const api_user = require("../../api/user.js");
const stores_user = require("../../stores/user.js");
require("../../utils/request.js");
require("../../utils/config.js");
require("../../stores/index.js");
require("../../stores/app.js");
require("../../api/topic.js");
if (!Array) {
  const _easycom_uv_avatar2 = common_vendor.resolveComponent("uv-avatar");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_swiper2 = common_vendor.resolveComponent("uv-swiper");
  const _easycom_uv_divider2 = common_vendor.resolveComponent("uv-divider");
  const _easycom_zero_markdown_view2 = common_vendor.resolveComponent("zero-markdown-view");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uv_action_sheet2 = common_vendor.resolveComponent("uv-action-sheet");
  (_easycom_uv_avatar2 + _easycom_uv_button2 + _easycom_uv_swiper2 + _easycom_uv_divider2 + _easycom_zero_markdown_view2 + _easycom_uv_icon2 + _easycom_uv_load_more2 + _easycom_uv_empty2 + _easycom_uv_action_sheet2)();
}
const _easycom_uv_avatar = () => "../../uni_modules/uv-avatar/components/uv-avatar/uv-avatar.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_swiper = () => "../../uni_modules/uv-swiper/components/uv-swiper/uv-swiper.js";
const _easycom_uv_divider = () => "../../uni_modules/uv-divider/components/uv-divider/uv-divider.js";
const _easycom_zero_markdown_view = () => "../../components/zero-markdown-view/zero-markdown-view.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uv_action_sheet = () => "../../uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.js";
if (!Math) {
  (_easycom_uv_avatar + _easycom_uv_button + _easycom_uv_swiper + _easycom_uv_divider + _easycom_zero_markdown_view + _easycom_uv_icon + _easycom_uv_load_more + _easycom_uv_empty + _easycom_uv_action_sheet)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const store = stores_user.useUserStore();
    const { userInfo } = common_vendor.storeToRefs(store);
    const post = common_vendor.ref(null);
    const postId = common_vendor.ref(null);
    const cm = common_vendor.ref([]);
    const currentImg = common_vendor.ref(0);
    const ref_action = common_vendor.ref(null);
    const loadStatus = common_vendor.ref("loadmore");
    const shareList = common_vendor.ref([
      {
        key: "wechat",
        name: "发给微信好友",
        openType: "share"
      }
    ]);
    const cmInput = common_vendor.ref({
      placeholder: "",
      focus: false,
      isSubmit: false
    });
    const cmInputForm = common_vendor.ref({
      content: "",
      parentId: 0,
      reply_user_id: null,
      reply_comment_id: null
    });
    const cmPage = common_vendor.ref({
      page: 1,
      pageSize: 10,
      total: 0
    });
    common_vendor.onShareAppMessage((res) => {
      let imageUrl;
      let { media, title, postId: postId2 } = post.value;
      if (media.length > 0) {
        imageUrl = media[0];
      }
      return {
        title,
        path: "/pages/post/detail?id=" + postId2,
        imageUrl
      };
    });
    common_vendor.onShareTimeline(() => {
      let { media, title, postId: postId2 } = post.value;
      let imageUrl = media[0];
      return {
        title,
        imageUrl,
        query: "id=" + postId2
      };
    });
    common_vendor.onReachBottom(() => {
      cmPage.value.page++;
      getCommentList();
    });
    const getCommentList = async (isReAdd) => {
      loadStatus.value = "loading";
      const cm_res = await api_post._getPostComment({
        postId: postId.value,
        ...cmPage.value
      });
      let { records, total } = cm_res.data;
      if (records.length === 0 && total > 0) {
        loadStatus.value = "nomore";
      } else {
        loadStatus.value = "loadmore";
      }
      cm.value = isReAdd ? records : cm.value.concat(records);
      cmPage.value.total = total;
    };
    common_vendor.onLoad(async (options) => {
      let { id } = options;
      postId.value = id;
      const res = await api_post._getPostDetail({
        postId: id
      });
      post.value = res.data;
      await getCommentList();
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    });
    const toUcenter = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/user/user?userId=" + id
      });
    };
    const solveImgPath = common_vendor.computed(() => (urls) => urls.map((url) => proxy.$utils.imgPath(url)));
    const previewImage = (url, urls) => {
      let imgList = [];
      urls.forEach((item) => {
        imgList.push(proxy.$utils.imgPath(item));
      });
      common_vendor.index.previewImage({
        current: proxy.$utils.imgPath(url),
        // 当前显示图片的http链接
        urls: imgList
        // 需要预览的图片http链接列表
      });
    };
    const formatFromTime = (time) => common_vendor.hooks(time).fromNow();
    const changeThumb = async (postId2, index) => {
      const { data } = await api_post._thumbAdd({
        postId: postId2
      });
      if (data === 1) {
        post.value.hasThumb = 1;
        post.value.thumbNum++;
      } else {
        post.value.hasThumb = 0;
        post.value.thumbNum--;
      }
    };
    const changeFavour = async (postId2, index) => {
      const { data } = await api_post._favourAdd({ postId: postId2 });
      if (data === 1) {
        post.value.hasFavour = 1;
        post.value.favourNum++;
      } else {
        post.value.hasFavour = 0;
        post.value.favourNum--;
      }
    };
    const changeCommentThumb = async (commentId, index, index2) => {
      const { data } = await api_post._commentThumb({
        commentId
      });
      if (data === 1) {
        if (index2 !== void 0) {
          cm.value[index].children[index2].hasThumb = 1;
          cm.value[index].children[index2].thumbNum++;
        } else {
          cm.value[index].hasThumb = 1;
          cm.value[index].thumbNum++;
        }
      } else {
        if (index2 !== void 0) {
          cm.value[index].children[index2].hasThumb = 0;
          cm.value[index].children[index2].thumbNum--;
        } else {
          cm.value[index].hasThumb = 0;
          cm.value[index].thumbNum--;
        }
      }
    };
    const onShareItem = (e) => {
      e.key;
    };
    const onCopy = () => {
      common_vendor.index.setClipboardData({
        data: post.value.content,
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "none"
          });
        }
      });
    };
    const onFollow = (followeeId) => {
      api_user._follow({ followeeId }).then((res) => {
        if (res.code === 200) {
          post.value.isFollow = !!res.data;
        }
      });
    };
    const onBlur = () => {
      cmInput.value.focus = false;
      cmInput.value.placeholder = "说点什么";
      cmInput.value.parentId = 0;
    };
    const onReply = (item) => {
      let { parentId, commentId, userInfo: userInfo2 } = item;
      cmInput.value.focus = true;
      cmInput.value.placeholder = "回复：" + userInfo2.nickname;
      if (parentId === 0) {
        cmInputForm.value.parentId = commentId;
        cmInputForm.value.reply_user_id = cmInputForm.value.reply_comment_id = null;
      } else {
        cmInputForm.value.parentId = parentId;
        cmInputForm.value.reply_user_id = userInfo2.id;
        cmInputForm.value.reply_comment_id = commentId;
      }
    };
    const addComment = () => {
      cmInput.value.isSubmit = true;
      if (cmInputForm.value.content === "") {
        common_vendor.index.showToast({
          title: "评论不能为空",
          icon: "none"
        });
        cmInput.value.isSubmit = false;
        return;
      }
      common_vendor.index.showLoading({
        mask: true,
        title: "发布中"
      });
      api_post._commentAdd({ ...cmInputForm.value, postId: postId.value }).then((res) => {
        if (res.code === 200) {
          cmInputForm.value.content = "";
          common_vendor.index.showToast({
            title: "评论成功",
            icon: "none"
          });
          cmPage.value.page = 1;
          getCommentList(true);
        }
        cmInput.value.isSubmit = false;
        common_vendor.index.hideLoading();
      });
    };
    const delComment = (item, index, index2) => {
      if (item.userInfo.id !== userInfo.value.id) {
        return;
      }
      console.log(item.commentId);
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除该评论？",
        success: function(res) {
          if (res.confirm) {
            api_post._commentDel({ commentId: item.commentId }).then((res2) => {
              if (res2.code === 200) {
                if (index2 !== void 0) {
                  cm.value[index].children.splice(index2, 1);
                } else {
                  cm.value.splice(index, 1);
                }
              }
            });
          } else if (res.cancel)
            ;
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: post.value
      }, post.value ? common_vendor.e({
        b: common_vendor.p({
          src: _ctx.imgPath(post.value.userInfo.avatar),
          size: "45"
        }),
        c: common_vendor.t(post.value.userInfo.nickname),
        d: common_vendor.t(post.value.userInfo.brief),
        e: post.value.isFollow
      }, post.value.isFollow ? {
        f: common_vendor.p({
          text: "已关注",
          shape: "circle",
          customStyle: {
            width: "150rpx",
            height: "60rpx"
          }
        })
      } : {
        g: common_vendor.p({
          text: "关注",
          shape: "circle",
          type: "primary",
          customStyle: {
            width: "150rpx",
            height: "60rpx"
          }
        })
      }, {
        h: common_vendor.o(($event) => onFollow(post.value.userInfo.id)),
        i: common_vendor.o(($event) => toUcenter(post.value.userInfo.id)),
        j: post.value.media.length
      }, post.value.media.length ? common_vendor.e({
        k: post.value.type !== 3
      }, post.value.type !== 3 ? {
        l: common_vendor.t(currentImg.value + 1),
        m: common_vendor.t(post.value.media.length),
        n: common_vendor.o(($event) => previewImage(post.value.media[currentImg.value], post.value.media)),
        o: common_vendor.o((e) => currentImg.value = e.current),
        p: common_vendor.p({
          list: common_vendor.unref(solveImgPath)(post.value.media),
          height: "800rpx",
          autoplay: true,
          indicatorStyle: "right: 20px"
        })
      } : {
        q: common_vendor.p({
          list: common_vendor.unref(solveImgPath)(post.value.media),
          height: "800rpx"
        })
      }) : {}, {
        r: common_vendor.t(post.value.title),
        s: post.value.type == "1"
      }, post.value.type == "1" ? {
        t: common_vendor.p({
          markdown: post.value.content,
          themeColor: "#ea5149"
        })
      } : {
        v: common_vendor.t(post.value.content),
        w: common_vendor.o(onCopy)
      }, {
        x: post.value.hasThumb
      }, post.value.hasThumb ? {
        y: common_vendor.p({
          name: "thumb-up-fill",
          size: "22",
          color: "#cc0000"
        }),
        z: common_vendor.t(post.value.thumbNum),
        A: common_vendor.o(($event) => changeThumb(post.value.postId, _ctx.index))
      } : {
        B: common_vendor.p({
          name: "thumb-up",
          size: "22"
        }),
        C: common_vendor.t(post.value.thumbNum),
        D: common_vendor.o(($event) => changeThumb(post.value.postId, _ctx.index))
      }, {
        E: common_vendor.p({
          name: post.value.hasFavour ? "star-fill" : "star",
          color: post.value.hasFavour ? "#cc0000" : "#606266",
          size: "22"
        }),
        F: common_vendor.t(post.value.favourNum),
        G: common_vendor.o(($event) => changeFavour(post.value.postId, _ctx.index)),
        H: common_vendor.p({
          name: "share",
          size: "22"
        }),
        I: common_vendor.o(($event) => ref_action.value.open()),
        J: common_vendor.t(post.value.viewNum),
        K: cm.value
      }, cm.value ? common_vendor.e({
        L: common_vendor.t(cmPage.value.total),
        M: common_vendor.f(cm.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.o(($event) => _ctx.jumpUser(item.userInfo.id), item.commentId),
            b: "b14daf57-11-" + i0,
            c: common_vendor.p({
              src: _ctx.imgPath(item.userInfo.avatar),
              size: "35"
            }),
            d: common_vendor.t(item.userInfo.nickname),
            e: common_vendor.t(formatFromTime(item.createTime)),
            f: item.hasThumb
          }, item.hasThumb ? {
            g: common_vendor.t(item.thumbNum),
            h: "b14daf57-12-" + i0,
            i: common_vendor.p({
              size: "45rpx",
              name: "thumb-up-fill",
              color: "#e62e00"
            }),
            j: common_vendor.o(($event) => changeCommentThumb(item.commentId, index), item.commentId)
          } : {
            k: common_vendor.t(item.thumbNum),
            l: "b14daf57-13-" + i0,
            m: common_vendor.p({
              size: "45rpx",
              name: "thumb-up",
              color: "#bfbfbf"
            }),
            n: common_vendor.o(($event) => changeCommentThumb(item.commentId, index), item.commentId)
          }, {
            o: common_vendor.t(item.content),
            p: common_vendor.o(($event) => onReply(item), item.commentId),
            q: common_vendor.o(($event) => delComment(item, index), item.commentId),
            r: item.children.length > 0
          }, item.children.length > 0 ? {
            s: common_vendor.f(item.children, (item2, index2, i1) => {
              return common_vendor.e({
                a: common_vendor.o(($event) => _ctx.jumpUser(item2.userInfo.id), item2.id),
                b: "b14daf57-14-" + i0 + "-" + i1,
                c: common_vendor.p({
                  customStyle: {
                    marginRight: "10rpx"
                  },
                  size: 20,
                  src: _ctx.imgPath(item2.userInfo.avatar)
                }),
                d: common_vendor.t(item2.userInfo.nickname),
                e: item2.hasThumb
              }, item2.hasThumb ? {
                f: common_vendor.t(item2.thumbNum),
                g: "b14daf57-15-" + i0 + "-" + i1,
                h: common_vendor.p({
                  size: "45rpx",
                  name: "thumb-up-fill",
                  color: "#e62e00"
                }),
                i: common_vendor.o(($event) => changeCommentThumb(item2.commentId, index, index2), item2.id)
              } : {
                j: common_vendor.t(item2.thumbNum),
                k: "b14daf57-16-" + i0 + "-" + i1,
                l: common_vendor.p({
                  size: "45rpx",
                  name: "thumb-up",
                  color: "#bfbfbf"
                }),
                m: common_vendor.o(($event) => changeCommentThumb(item2.commentId, index, index2), item2.id)
              }, {
                n: item2.to_user
              }, item2.to_user ? {
                o: common_vendor.t(item2.to_user.nickname),
                p: common_vendor.o(($event) => _ctx.jumpUser(item2.userInfo.id), item2.id)
              } : {}, {
                q: common_vendor.t(item2.content),
                r: common_vendor.t(formatFromTime(item2.createTime)),
                s: item2.id,
                t: common_vendor.o(($event) => delComment(item2, index, index2), item2.id),
                v: common_vendor.o(($event) => onReply(item2), item2.id)
              });
            })
          } : {}, {
            t: item.commentId
          });
        }),
        N: cm.value.length > 0
      }, cm.value.length > 0 ? {
        O: common_vendor.p({
          status: loadStatus.value
        })
      } : {
        P: common_vendor.p({
          text: "暂无评论",
          mode: "message"
        })
      }) : {}, {
        Q: cmInput.value.placeholder,
        R: common_vendor.o(onBlur),
        S: cmInput.value.focus,
        T: cmInputForm.value.content,
        U: common_vendor.o(($event) => cmInputForm.value.content = $event.detail.value),
        V: common_vendor.o(addComment),
        W: common_vendor.p({
          type: "primary",
          customStyle: {
            marginLeft: "10rpx",
            width: "120rpx"
          },
          disabled: cmInput.value.isSubmit
        }),
        X: common_vendor.sr(ref_action, "b14daf57-20", {
          "k": "ref_action"
        }),
        Y: common_vendor.o(onShareItem),
        Z: common_vendor.p({
          actions: shareList.value,
          round: 10,
          cancelText: "取消"
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b14daf57"], ["__file", "D:/潘坤鹏/Desktop/school-wx/pages/post/detail.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
