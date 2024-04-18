const {database} = require('../utils/config')
const moment = require('moment')
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        ...database,
        typeCast:function (field,next){
            if(field.type ==='DATETIME'){
                const value = field.string()
                if(!value){
                    return null
                }
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
            return next()
        }
    },
    version: '8.0.12',
})

knex().select(knex.raw('1=1')).then(data=>{
    console.log('数据库连接成功')
}).catch(error=>{
    console.log(error,'Error:数据库连接失败，请检查数据库服务是否开启或密码配置是否正确')
})

module.exports = knex
