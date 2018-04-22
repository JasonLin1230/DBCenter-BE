'use strict';

const { sql } = require('../base/mysql');

/**
 * 数据表以及数据操作权限认证
 */
module.exports = async function(ctx, next) {
    const { phone, secret } = ctx.headers;

    try {

        const queryUser = `
            Select * From DBCenter.user
                Where
                    phone="${phone}" And secret="${secret}";
        `;
        const users = await sql(queryUser);

        if (users.length) {

            await sql(`Use user_${phone}`);

            await next();

        } else {
            ctx.body = {
                code: 3012,
                messsage: 'Authentication failed!'
            }
        }

    } catch (err) {
        console.error(err);
    }
}