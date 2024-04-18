const knex = require('../../../model/knex')
const field = []
class App {
    async home(req,res){
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
}


module.exports = new App()
