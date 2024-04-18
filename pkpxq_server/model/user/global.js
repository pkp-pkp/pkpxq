const knex = require("../knex");

async function uploadLog(id,path){
    await knex('sys_upload').insert({userId:id,path})
}


module.exports = {
    uploadLog
}
