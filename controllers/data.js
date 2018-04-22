'use strict';

const Base = require('../base');

module.exports = class extends Base {
    constructor() {
        super();
    }

    async insert(ctx) {
        try {
            const tableName = ctx.params.tableName;
    
            const attrData = JSON.parse(ctx.request.body.attrData);
        
            const keys = Object.keys(attrData);
        
            const values = Object.values(attrData).map((key) => {
                return `"${key}"`;
            });
        
            const sql = `INSERT INTO ${tableName} (${keys.join(',')})
                            VALUES
                                (${values.join(',')});`;
    
            const result = await this.sql(sql);
    
            ctx.body = {
                code: 0,
                data: result.insertId
            };
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            };
        }
    }

    async delete(ctx) {
        try {
            const table = ctx.params.tableName;
    
            const id = ctx.request.body.id;
            
            const sql = `DELETE FROM ${tableName}
                            WHERE id=${id}`;
    
            const result = await this.sql(sql);
    
            ctx.body = {
                code: 0,
                data: 'success'
            };
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            };
        }
    }

    async update(ctx) {
        try {
            const tableName = ctx.params.tableName;
    
            const { id, newAttrData } = ctx.request.body;
    
            const resAttrData = Object.entries(JSON.parse(newAttrData)).map((attr) => {
                return `${attr[0]}="${attr[1]}"`;
            }).join(',');
    
            const sql = `
                UPDATE ${tableName}
                    SET ${resAttrData}
                    WHERE id=${id};
            `
    
            const result = await this.sql(sql);
    
            ctx.body = {
                code: 0,
                data: 'success'
            };
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            };
        }
    }

    async query(ctx) {
        try {
            const tableName = ctx.params.tableName;
    
            const condition = ctx.request.query.condition;
    
            let resCondition = '';
    
            if (condition) {
                resCondition = 'WHERE ' + Object.entries(JSON.parse(condition)).map((item) => {
                    return `${item[0]}="${item[1]}"`;
                }).join(' AND ')
            }
    
            const sql = `SELECT * from ${tableName} 
                            ${resCondition};`;
    
            const result = await this.sql(sql);
    
            ctx.body = {
                code: 0,
                data: result
            };
        } catch(err) {
            ctx.body = {
                code: 2,
                message: err.message
            };
        }
    }
}