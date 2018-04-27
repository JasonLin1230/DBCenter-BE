'use strict';

const Base = require('../base');

/**
 * js数据类型格式化mysql数据类型
 * 
 * @param { String } type string|number
 * 
 * @return { String } VARCHAR(255)|FLOAT(32, 5)
 */
function formatType(type) {
    switch (type) {
        case 'string':
            return 'VARCHAR(255)'
        
        case 'number':
            return 'FLOAT(32, 5)'
    }
}

/**
 * mysql数据类型解析为js数据类型
 * 
 */
function parseType(type) {
    switch (type) {
        case 'varchar':
            return 'String';
        
        case 'float':
            return 'Number';
    }
}

module.exports = class extends Base {
    constructor() {
        super();
    }

    // 添加数据表
    async insert(ctx) {
        const { tableName, attrs } = ctx.request.body

        let attrSql = '( id INT AUTO_INCREMENT PRIMARY KEY,'

        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];

            let name = `\`${attr.name}\``;

            let type = formatType(attr.type);

            let notNull = attr.notNull ? 'NOT NULL' : '';

            let unique = attr.unique ? 'UNIQUE' : '';

            let attrDefault = '';
            if (attr.default) {
                attrDefault = attr.type === 'string' ? `default "${attr.default}"` : `default ${attr.default}`;
            }

            let symbol = i === attrs.length - 1 ? ')' : ',';

            attrSql += `${name} ${type} ${notNull} ${unique} ${attrDefault} ${symbol}`;
        }

        const sql = `CREATE TABLE ${tableName} ${attrSql} ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

        await this.sql(sql)

        ctx.body = {
            code: 0,
            message: 'success!'
        }
    }

    // 删除数据表
    async delete(ctx) {
        const tableName = ctx.params.tableName;
    
        if (!tableName) {
            ctx.body = {
                code: 1,
                message: 'tableName is not defined'
            };
        }

        const result = await this.sql(`DROP TABLE ${tableName};`);
    
        ctx.body = {
            code: 0,
            message: 'success!'
        };
    }

    // 查询租户下所有数据表
    async query(ctx) {

        const result = await this.sql('SHOW TABLES;');

        const tables = result.map((item) => {
            return Object.values(item)[0];
        }).filter((item) => {
            const { phone } = ctx.headers;
            return item !== `user_${phone}`
        })

        ctx.body = {
            code: 0,
            data: tables
        }
    }

    // 查询数据表详细信息
    async findOne(ctx) {
        const tableName = ctx.params.tableName;

        let result;

        try {
            result = await this.sql(`desc ${tableName}`);
        } catch(err) {
            ctx.body = {
                code: 1,
                message: err.message
            }

            return;
        }

        result = result.map((item) => {
            let type = item.Type.split('(')[0]

            if (item.Key === 'PRI') {
                type = 'id';
            } else {
                type = parseType(type);
            }

            let def = item.Default

            if (type === 'Number') def = parseFloat(item.Default)


            return {
                name: item.Field,
                type: type,
                default: def,
                notNull: item.Null === 'NO',
                unique: item.Key === 'UNI' || item.Key === 'PRI'
            }
        })

        ctx.body = {
            code: 0,
            data: result
        }
    }

}
