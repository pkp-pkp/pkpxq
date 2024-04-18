"use strict";
var _a, _b;
const common_vendor = require("../../../../common/vendor.js");
const props = {
  props: {
    // item标签的名称，作为与uv-tabbar的value参数匹配的标识符
    name: {
      type: [String, Number, null],
      default: null
    },
    // uv-ui内置图标或者绝对路径的图片
    icon: {
      icon: String,
      default: ""
    },
    // 图标大小，默认uv-tabbar的iconSize=20
    iconSize: {
      type: [String, Number],
      default: ""
    },
    // 右上角的角标提示信息
    badge: {
      type: [String, Number, null],
      default: null
    },
    // 是否显示圆点，将会覆盖badge参数
    dot: {
      type: Boolean,
      default: false
    },
    // 描述文本
    text: {
      type: String,
      default: ""
    },
    // 控制徽标的位置，对象或者字符串形式，可以设置top和right属性
    badgeStyle: {
      type: [Object, String],
      default: "top: 6px;right:2px;"
    },
    ...(_b = (_a = common_vendor.index.$uv) == null ? void 0 : _a.props) == null ? void 0 : _b.tabbarItem
  }
};
exports.props = props;
