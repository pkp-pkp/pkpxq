"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "tki-tree",
  props: {
    range: {
      type: Array,
      default: function() {
        return [];
      }
    },
    idKey: {
      type: String,
      default: "id"
    },
    rangeKey: {
      type: String,
      default: "label"
    },
    title: {
      type: String,
      default: ""
    },
    multiple: {
      // 是否可以多选
      type: Boolean,
      default: false
      // default: true
    },
    selectParent: {
      //是否可以选父级
      type: Boolean,
      default: false
    },
    foldAll: {
      //折叠时关闭所有已经打开的子集，再次打开时需要一级一级打开
      type: Boolean,
      default: false
    },
    confirmColor: {
      // 确定按钮颜色
      type: String,
      default: ""
      // $theme-color
    },
    cancelColor: {
      // 取消按钮颜色
      type: String,
      default: ""
      // #757575
    },
    titleColor: {
      // 标题颜色
      type: String,
      default: ""
      // #757575
    },
    currentIcon: {
      // 展开时候的ic
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEQ0QTM0MzQ1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ0QTM0MzU1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRDRBMzQzMjVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRDRBMzQzMzVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PidwepsAAAK0SURBVHja7JxbTsJAFIYHww7ciStgCeoGvGxAiOsgURegoL5720AXYLiIr0aJviq3Zx3PhIEnKG3ndtr+f3KixrSUj/ZjzjClIqUUiFm2gAAQAREQEUAEREAERAQQAREQAREBREAEREBEEqa67h9RFDWllDv0awWYlqlQHmu1WjMRRMoV1QFttA12y3xRtdNczq8EsE4/f8FumX2q77ROvNXk8UGMEKdUz6tYJHljaZAbuyUH+UR1to5BEohTuqwPCeS4pAA/qY6o/kyHOAMCeRK3owJnj+rH1jjxhqpVsstaebCz6TmnHWyXyY+xHjSBWBY/bvSgadtXBj9u9KCN3rnIfkzkQVsTEEX0Y2IP2oKo/HhMICcFAThUcwVZNGU6FdbX/XURzkbVF4+ybGhjPrFdgP66QdXNurGtSdk6Xdb9nAJ8oDo3OQlsQZzkdPw41ONBo6vI5scDefRjZg+6gpg3Pxp50CXEvPjR2IOuIXL3oxUPuobI3Y9WPOgDIlc/WvOgL4iL/vqFCcD7LH0xB4hj7cfQ/fWH9qCT+FhG0tN+DBk1PzjOM0SVllixcsBT1AvYc/kAPhc0hRg/3uvxoCgKRN9+dOrBUBB9+9GpB0NC9OVH5x4MDdG1H714kANEV3705kEOEBf9dcPi/lQnsuvLg1wgSu3Ha0v7Uh4MMgUXeuG71H407a+VBy9CPQkOdw+MtB+nGbd/D+FBbhBNxo9SjwcngJjNj0E9yBFiFj8G9SBXiGn8GNyDnCEm8SMLD3KHGOdHNh7kDjHOj2w8mAeIi/5arX+c6b/fxHz9oADEdGdjR/fXCw/OOB5oVfCOgnepz8IB14PMw03jCmTE+QBx5z0gAmKSqK9OUF+hcAeIhu/QYr4Qie8rjW83hhMBERARQAREQAREBBABERCLnH8BBgA+TQI7U4t53AAAAABJRU5ErkJggg=="
    },
    defaultIcon: {
      // 折叠时候的ic
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAACE0lEQVR4Xu3c200DMRCF4XEltJAOkEugA+ggpUAHoQMqiFMCdEAJUMEiS4mEELlIO7bPOeN9i6K1rG/952myyea1WiCtXmEuYBPR4RBMxInoIOCwhOtJLKVszWyXc/5y2BvNEq6I+/3+kFK6M7OHnPM7jcLKjbZAvD/uaZtzflm5P4rbWyJWgDcze1LPuzVihfxUz7sH4ilJ2bx7Isrm3RtRMu8RiHJ5j0SUyXs0okTeCIj0eSMh0uaNhkiZNyIiXd7IiDR5oyNS5M2ACJ83EyJs3myIkHkzIsLlzYwIkzc7IkTeCojD81ZCHJa3GuKQvBURu+etjNgtb3XELnlHQGyedyTEZnlHQ2ySd0RE97wjI7rlHR3RJe+JeIrbLOecD6ePpZQ6W1kn2epo4MUrPOKyLN8ppYq1+y1VStncOjIdGnFZlo+U0uOtWOeOY2TE12Ouq//pEA7xXL7XfvcufR8K0Svfv6CREN3yDYfYIt9QiK3yjYTYLF95xB75SiP2ylcZsVu+cogj8pVCHJWvEuKwfOkREfKlRkTJlxkRJl86RMR8qRBR82VChM0XHpEhX2hElnyREWnyhUNkzBcKkTVfJETafIcjKuQ7FFEl35GIMvl2R1TMtyuiar49EWXzbY5oZpv/hibXTF2h3+s60FRKeT6+3TjMS3nrA3ZFRD8xrfY3ER1kJ+JEdBBwWGKeRAfEH1wS5WFZSDB/AAAAAElFTkSuQmCC"
    },
    lastIcon: {
      // 没有子集的ic
      type: String,
      default: ""
    },
    border: {
      // 是否有分割线
      type: Boolean,
      default: false
    },
    maxCount: {
      // 多选最大数量
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      showTree: false,
      treeList: [],
      selectIndex: -1,
      total: 0
    };
  },
  computed: {},
  methods: {
    _show() {
      this.showTree = true;
    },
    _hide() {
      this.showTree = false;
    },
    _cancel() {
      this._hide();
      this.$emit("cancel", "");
    },
    _confirm() {
      let rt = [], obj = {};
      this.treeList.forEach((v, i) => {
        if (this.treeList[i].checked) {
          obj = {};
          obj.parents = this.treeList[i].parents;
          obj = Object.assign(obj, this.treeList[i].source);
          delete obj.children;
          rt.push(obj);
        }
      });
      this._hide();
      this.$emit("confirm", rt);
    },
    //扁平化树结构
    _renderTreeList(list = [], rank = 0, parentId = [], parents = []) {
      list.forEach((item) => {
        this.treeList.push({
          id: item[this.idKey],
          name: item[this.rangeKey],
          source: item,
          parentId,
          // 父级id数组
          parents,
          // 父级id数组
          rank,
          // 层级
          showChild: false,
          //子级是否显示
          open: false,
          //是否打开
          show: rank === 0,
          // 自身是否显示
          hideArr: [],
          orChecked: item.checked ? item.checked : false,
          checked: item.checked ? item.checked : false
        });
        if (Array.isArray(item.children) && item.children.length > 0) {
          let parentid = [...parentId], parentArr = [...parents], childrenid = [...childrenid];
          delete parentArr.children;
          parentid.push(item[this.idKey]);
          parentArr.push({
            [this.idKey]: item[this.idKey],
            [this.rangeKey]: item[this.rangeKey]
          });
          this._renderTreeList(item.children, rank + 1, parentid, parentArr);
        } else {
          this.treeList[this.treeList.length - 1].lastRank = true;
        }
      });
    },
    // 处理默认选择
    _defaultSelect() {
      this.treeList.forEach((v, i) => {
        if (v.checked) {
          this.treeList.forEach((v2, i2) => {
            if (v.parentId.toString().indexOf(v2.parentId.toString()) >= 0) {
              v2.show = true;
              if (v.parentId.includes(v2.id)) {
                v2.showChild = true;
                v2.open = true;
              }
            }
          });
        }
      });
    },
    // 点击
    _treeItemTap(item, index) {
      if (item.lastRank === true) {
        this.treeList[index].checked = !this.treeList[index].checked;
        this._fixMultiple(index);
        return;
      }
      let list = this.treeList;
      let id = item.id;
      item.showChild = !item.showChild;
      item.open = item.showChild ? true : !item.open;
      list.forEach((childItem, i) => {
        if (item.showChild === false) {
          if (!childItem.parentId.includes(id)) {
            return;
          }
          if (!this.foldAll) {
            if (childItem.lastRank !== true && !childItem.open) {
              childItem.showChild = false;
            }
            if (childItem.show) {
              childItem.hideArr[item.rank] = id;
            }
          } else {
            if (childItem.lastRank !== true) {
              childItem.showChild = false;
            }
          }
          childItem.show = false;
        } else {
          if (childItem.parentId[childItem.parentId.length - 1] === id) {
            childItem.show = true;
          }
          if (childItem.parentId.includes(id) && !this.foldAll) {
            if (childItem.hideArr[item.rank] === id) {
              childItem.show = true;
              if (childItem.open && childItem.showChild) {
                childItem.showChild = true;
              } else {
                childItem.showChild = false;
              }
              childItem.hideArr[item.rank] = null;
            }
          }
        }
      });
    },
    _treeItemSelect(item, index) {
      if (!this.treeList[index].checked) {
        if (this.total >= this.maxCount) {
          common_vendor.index.showToast({
            title: `最多只能选${this.maxCount}个哦！`,
            icon: "none"
          });
          return;
        }
        this.total++;
      } else {
        this.total--;
      }
      this.treeList[index].checked = !this.treeList[index].checked;
      this._fixMultiple(index);
    },
    // 处理单选多选
    _fixMultiple(index) {
      if (!this.multiple) {
        this.treeList.forEach((v, i) => {
          if (i != index) {
            this.treeList[i].checked = false;
          } else {
            this.treeList[i].checked = true;
          }
        });
      }
    },
    // 重置数据
    _reTreeList() {
      this.treeList.forEach((v, i) => {
        this.treeList[i].checked = v.orChecked;
      });
    },
    _initTree(range = this.range) {
      this.treeList = [];
      this._renderTreeList(range);
      this.$nextTick(() => {
        this._defaultSelect(range);
      });
    }
  },
  watch: {
    range(list) {
      this._initTree(list);
    },
    multiple() {
      if (this.range.length) {
        this._reTreeList();
      }
    },
    selectParent() {
      if (this.range.length) {
        this._reTreeList();
      }
    }
  },
  mounted() {
    this._initTree();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.showTree ? 1 : "",
    b: common_vendor.o((...args) => $options._cancel && $options._cancel(...args)),
    c: $props.cancelColor,
    d: common_vendor.o((...args) => $options._cancel && $options._cancel(...args)),
    e: common_vendor.t($props.title),
    f: $props.titleColor,
    g: $props.confirmColor,
    h: common_vendor.o((...args) => $options._confirm && $options._confirm(...args)),
    i: common_vendor.f($data.treeList, (item, index, i0) => {
      return common_vendor.e({
        a: item.lastRank ? $props.lastIcon : item.showChild ? $props.currentIcon : $props.defaultIcon,
        b: common_vendor.t(item.name),
        c: common_vendor.o(($event) => $options._treeItemTap(item, index), index),
        d: $props.selectParent ? true : item.lastRank
      }, ($props.selectParent ? true : item.lastRank) ? common_vendor.e({
        e: item.checked
      }, item.checked ? {
        f: $props.confirmColor,
        g: !$props.multiple ? 1 : "",
        h: $props.confirmColor
      } : {
        i: !$props.multiple ? 1 : "",
        j: $props.confirmColor
      }, {
        k: common_vendor.o(($event) => $options._treeItemSelect(item, index), index)
      }) : {}, {
        l: common_vendor.s({
          paddingLeft: item.rank * 15 + "px",
          zIndex: item.rank * -1 + 50
        }),
        m: item.show ? 1 : "",
        n: item.lastRank ? 1 : "",
        o: item.showChild ? 1 : "",
        p: item.open ? 1 : "",
        q: index
      });
    }),
    j: $props.border === true ? 1 : "",
    k: $data.showTree ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-86985fb3"], ["__file", "D:/潘坤鹏/Desktop/school-wx/components/tki-tree/tki-tree.vue"]]);
wx.createComponent(Component);
