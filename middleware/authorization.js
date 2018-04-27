'use strict';

const { sql } = require('../base/mysql');

/**
 * 数据表以及数据操作权限认证
 */
module.exports = async function(ctx, next) {
    const { phone, secret } = ctx.headers;

    try {
        await sql(`USE user_${phone}`);

        const queryUser = `
            Select * From user_${phone}
                Where
                    phone="${phone}" And secret="${secret}";
        `;
        const users = await sql(queryUser);

        if (users.length) {

            await next();

        } else {
            ctx.body = {
                code: 3012,
                messsage: 'Authentication failed!'
            }
        }

    } catch (err) {
        ctx.body = {
            code: 3012,
            messsage: 'Authentication failed!'
        }

        console.error(err);
    }
}