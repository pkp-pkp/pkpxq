<script>
import { _getTopicInfo } from '@/api/topic.js';
import { getNewToken } from '@/utils/request.js';
import {useUserStore} from '@/stores'


const store = useUserStore()
export default {
	onLaunch: async function () {
		getNewToken().catch(e=>{}) //用于获取token或判断用户是否被封禁
		// 获取官方圈主信息
		store.getTopicInfo()
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>

<style></style>
