const knex = require('../../../model/knex')
const {} = require("../../../utils");
const dicts = {
    'user_sex':[
        {
            remark: "性别未知",
            dictLabel: "未知",
            dictValue: "0",
            listClass:"info"
        },
        {
            remark: "性别男",
            dictLabel: "男",
            dictValue: "1",
            listClass:"primary"
        },
        {
            remark: "性别女",
            dictLabel: "女",
            dictValue: "2",
            listClass:"danger"
        },
    ],
    'user_terminal':[
        {
            remark: "微信小程序",
            dictLabel: "微信小程序",
            dictValue: "1",
            listClass:"primary"
        },
        {
            remark: "微信公众号",
            dictLabel: "微信公众号",
            dictValue: "2",
            listClass:"warning"
        },
        {
            remark: "H5",
            dictLabel: "H5",
            dictValue: "3",
            listClass:"success"
        },
        {
            remark: "苹果APP",
            dictLabel: "苹果APP",
            dictValue: "4",
            listClass:"danger"
        },
        {
            remark: "安卓APP",
            dictLabel: "苹果APP",
            dictValue: "4",
            listClass:"danger"
        },
    ]
}
class Dict {
    async list(req,res){
    }
    async detail(req,res){
        const {type} = req.params
        if(!dicts[type]){
            return res.cc('暂无此字段')
        }

        res.sc(dicts[type])
    }
}


module.exports = new Dict()
