import ElImageViewer from "@/components/ElImageViewer/index.vue";
import Vue from "vue";

const ElImageViewerConstructor = Vue.extend(ElImageViewer)

let instance
const initInstance = (options) => {
  instance = new ElImageViewerConstructor({
    el: document.createElement('div'),
    propsData: {
      ...options
    }
  });
}
export default (options) => {
  if (typeof options === 'string') {
    throw Error('传入的内容必须是一个对象或者数组')
  }

  if (!instance) {
    const op = {}
    if (Array.isArray(options)) {
      op.urlList = options
    }
    initInstance({
      ...options,

      onClose: () => {
        document.body.removeChild(instance.$el)
        instance = null
        options.onClose && options.onClose()
      },
    })
    document.body.appendChild(instance.$el);
  }
}
