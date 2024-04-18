import {
	ref,watchEffect
} from 'vue'
import { onShareAppMessage,onShareTimeline } from '@dcloudio/uni-app';

export default ({title,imageUrl})=>{
	const share = ref({
		title,
		imageUrl
	})
	
	watchEffect(()=>{
		//#ifdef MP-WEIXIN
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		//#endif
		onShareAppMessage(() =>{
			console.log(share.value,222);
			return {
				title: share.value.title,
				imageUrl: share.value.imageUrl,
			}
		})
		onShareTimeline(() =>{
			return {
				title: share.value.title,
				imageUrl: share.value.imageUrl,
			}
		})
	})
	
	return {
		share,
		onShareAppMessage,
		onShareTimeline
	}
}