import {
	ref
} from "vue"
import {
	_getFollowList,
	_getFansList,
	_getUsertList
} from '@/api/user'

export default () => {
	const list = ref([])
	const loadStatus = ref('loadmore')
	const listPage = ref({
		page: 1,
		pageSize: 10,
		total: 0
	})
	const resetList = () => {
		listPage.value = {
			page: 1,
			pageSize: 10,
			total: 0
		}
		list.value = []
	}

	const tool_get_user = async (methods, otherParams) => {
		loadStatus.value = 'loading';

		const res = await methods({
			...listPage.value,
			...otherParams
		});
		let {
			records,
			total
		} = res.data
		// 改变加载状态
		let dataTotal = records.length + list.value.length
		if (records.length === 0 && total > 0 || total === 0 || dataTotal === total) {
			loadStatus.value = 'nomore';
		} else {
			loadStatus.value = 'loadmore';
		}
		list.value = list.value.concat(records);
		listPage.value.total = total;

	}
	
	/**
	 * @param {Object} {userId}
	 */
	const getUserList = async (otherParams)=>{
		tool_get_user(_getUsertList, otherParams)
	}
	const getFollowList = async (otherParams) => {
		tool_get_user(_getFollowList, otherParams)
	};
	const getFansList = async (otherParams) => {
		tool_get_user(_getFansList, otherParams)
	}

	return {
		list,
		loadStatus,
		listPage,
		resetList,
		getUserList,
		getFollowList,
		getFansList
	}
}