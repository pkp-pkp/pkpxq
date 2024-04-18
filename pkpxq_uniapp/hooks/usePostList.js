import {
	ref
} from "vue"
import {
	_getPostList,
	_getFavourList,
	_getThumbList,
	_search
} from '@/api/post'

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

	const tool_get_post = async (methods, otherParams) => {
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
	const getPostList = async (otherParams) => {
		tool_get_post(_getPostList, otherParams)
	}
	/**
	 * @param {Object} {userId}
	 */
	const getFavourPost = async (otherParams) => {
		tool_get_post(_getFavourList, otherParams)
	};
	/**
	 * @param {Object} {userId}
	 */
	const getThumbPost = async (otherParams) => {
		tool_get_post(_getThumbList, otherParams)
	};
	
	const toSearchPost = async(otherParams) => {
		tool_get_post(_search, otherParams)
	};

	return {
		list,
		loadStatus,
		listPage,
		resetList,
		getPostList,
		getFavourPost,
		getThumbPost,
		toSearchPost
	}
}