'use strict';

const Base = require('../base');

module.exports = class extends Base {
    constructor() {
        super();
    }

    async insert(ctx) {
        try {
            const table = ctx.params.table
    
            const attrData = JSON.parse(ctx.request.body.attrData)
        
            const keys = Object.keys(attrData)
        
            const values = Object.values(attrData).map((key) => {
                return `"${key}"`
            })
        
            const sql = `INSERT INTO ${table} (${keys.join(',')})
                            VALUES
                                (${values.join(',')});`
    
            const result = await this.sql(sql)
    
            console.log('inserting success')
    
            ctx.body = {
                code: 0,
                data: result.insertId
            }
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            }
        }
    }

    async delete(ctx) {
        try {
            const table = ctx.params.table
    
            const id = ctx.request.body.id
            
            const sql = `DELETE FROM ${table}
                            WHERE id=${id}`
    
            const result = await this.sql(sql)
    
            console.log('deleting success')
    
            ctx.body = {
                code: 0,
                data: 'success'
            }
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            }
        }
    }

    async update(ctx) {
        try {
            const table = ctx.params.table
    
            const { id, newAttrData } = ctx.request.body
    
            const resAttrData = Object.entries(JSON.parse(newAttrData)).map((attr) => {
                return `${attr[0]}="${attr[1]}"`
            }).join(',')
    
            const sql = `
                UPDATE ${table}
                    SET ${resAttrData}
                    WHERE id=${id};
            `
    
            const result = await this.sql(sql)
    
            console.log('updating success')
    
            ctx.body = {
                code: 0,
                data: 'success'
            }
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            }
        }
    }

    async query(ctx) {
        try {
            const table = ctx.params.table
    
            const condition = ctx.request.query.condition
    
            let resCondition = ''
    
            if (condition) {
                resCondition = 'WHERE ' + Object.entries(JSON.parse(condition)).map((item) => {
                    return `${item[0]}="${item[1]}"`
                }).join(' AND ')
            }
    
            const sql = `SELECT * from ${table} 
                            ${resCondition};`
    
            const result = await this.sql(sql)
    
            console.log('selecting success')
    
            ctx.body = {
                code: 0,
                data: result
            }
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            }
        }
    }
}