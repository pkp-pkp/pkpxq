const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField} = require("../../../utils");
const field = []

async function getTotal(tableName, whereParams = {isDelete: 0, status: 0}) {
    return await knex(tableName).count('* as count').where(whereParams).first().then(row => row.count)
}

// 获取几天的数据
function formatEChartData(dateResult,day) {

    const currentDate = new Date(); // 当前日期
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(currentDate.getDate() - day);
    // 构建结果数组
    const xData = [];
    const yData = []
    const dateMap = new Map();

    // 初始化日期映射
    for (let i = 0; i < day; i++) {
        const date = new Date(oneWeekAgo);
        date.setDate(date.getDate() + i);
        dateMap.set(date.toISOString().slice(0, 10), 0);
    }
    // 将查询结果中的数据量添加到对应的日期
    dateResult.forEach(row => {
        const date = row.date.toISOString().slice(0, 10);
        if (dateMap.has(date)) {
            dateMap.set(date, row.count);
        }
    });

    // 按日期顺序构建结果数组
    dateMap.forEach((count, date) => {
        xData.push(date)
        yData.push(count);
    });
    return {xData,yData}

}

class Dashboard {
    async list(req, res) {
        // 查帖子总数量
        let post_total = await getTotal('post')
        let topic_total = await getTotal('topic')
        let user_total = await getTotal('user')
        let upload_total = await getTotal('sys_upload', {isDelete: 0})
        res.sc({post_total, topic_total, user_total, upload_total})

    }

    async getData(req, res) {
        const keys = [
            {key: 'user', table: 'user'},
            {key: 'post', table: 'post'},
            {key: 'upload', table: 'sys_upload'},
            {key: 'topic', table: 'topic'},
        ]
        const key = req.params.key
        const index = keys.findIndex(item => item.key === key)
        if (index === -1) return res.cc('不存在此key')

        const day = 7 // 查七天内的数据
        // 获取7天前的日期时间
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(new Date().getDate() - day);

        // 查询数据量
        const [result] = await knex.raw(`
            SELECT DATE(createTime) as date, COUNT(*) as count
            FROM ${keys[index].table}
            WHERE createTime >= ?
            GROUP BY DATE(createTime)
          `, [oneWeekAgo])
        const {xData,yData} = formatEChartData(result,day)
        res.sc({
            xAxisData:xData,
            yAxisData:yData
        })
    }
}


module.exports = new Dashboard()
