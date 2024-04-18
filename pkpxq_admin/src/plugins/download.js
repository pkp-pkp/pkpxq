import axios from 'axios'
import {Loading, Message} from 'element-ui'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate ,getHeaderFilename} from "@/utils";

const baseURL = process.env.VUE_APP_BASE_API
let downloadLoadingInstance;

export default {
  file(filePath) {
    let url = baseURL + "/download/file?filePath=" + encodeURIComponent(filePath);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data)

      if (isBlob) {
        const filename = getHeaderFilename(res)
        const blob = new Blob([res.data])
        this.saveAs(blob, filename)
      } else {
        Message.error(res.data.msg || '下载失败');
      }
    })
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts);
  },
}

