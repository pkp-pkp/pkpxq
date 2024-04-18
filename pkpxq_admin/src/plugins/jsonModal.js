import JsonDialog from "@/components/JsonDialog/index.vue";
import Vue from "vue";

const JsonDialogConstructor = Vue.extend(JsonDialog)

let instance
const initInstance = (options)=>{
  instance = new JsonDialogConstructor({
    el: document.createElement('div'),
    propsData:{
      ...options
    }
  });
}
export default {
  open(json){
    if(!instance){
      initInstance({
        callback:()=>{
          document.body.removeChild(instance.$el)
          instance = null
        }
      })
      document.body.appendChild(instance.$el);
    }

    instance.open(json)
  }
}
