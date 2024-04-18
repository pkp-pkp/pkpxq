const knex = require('../../../model/knex')
const {pageSearch, pageSearchTotal, filterField, isEmpty} = require("../../../utils");
const field = []
class App {
    async getList(req,res){
        const rows = await knex('app_config')
        const data = {}

        if(rows.length===0){
            return res.sc({})
        }
        rows.forEach(item=>{
            data[item.name] = JSON.parse(item.value)
        })
        res.sc(data)
    }

    async update(req,res){
        let value = ''
        if(isEmpty(req.body.value) || isEmpty(req.body.name)){
            return res.cc('参数错误')
        }

        value = JSON.stringify(req.body.value)
        try{
            await knex('app_config').where({name:req.body.name}).update({value})
            res.cc('修改成功',200)
        }catch (e) {
            res.cc('修改失败')
        }
    }
}


module.exports = new App()
