'use strict';

const NodeCache = require("node-cache");
const axios = require('axios');
const md5 = require('crypto-js/md5');
const Base = require('../base');
const { msgApi } = require('../config.json');

const myCache = new NodeCache( { stdTTL: 60 } );

module.exports = class extends Base {
    constructor() {
        super();
    }

    // 用户登录
    async login(ctx, next) {
        const { phone, valicode } = ctx.request.body;

        // if (myCache.get(`phonePin_${phone}`) != valicode) {
        //     ctx.body = {
        //         code: 1,
        //         messsage: '验证码错误！'
        //     };

        //     next();
        // }

        try {

            await this.sql('Use DBCenter;');

            const userData = await this.sql(`Select * From user`);
            
            let secret = '';
            
            if (userData.length) {

                secret = userData[0].secret;

            } else {
                const msg = `${phone}|${new Date().getTime()}`;

                secret = md5(msg).toString();

                const inserUserSql = `
                    Insert Into user (phone, secret)
                        Values
                            ("${phone}", "${secret}")
                `;
                await this.sql(inserUserSql);
            }

            await this.sql(`Create Database If Not Exists user_${phone}`);

            ctx.body = {
                code: 0,
                data: { phone, secret }
            };

        } catch(err) {
            throw Error(err.message);
        }
    }

    // 登陆时, 发送手机验证码
    async sendValiCode(ctx, next) {
        const phone = ctx.request.body.phone;
        
        // 短信接口配置
        const { url, auth: Authorization, skin } = msgApi;

        // 验证码
        const param = Math.floor(Math.random() * 9000 + 1000);

        // 缓存
        myCache.set(`phonePin_${phone}`, param);

        try {
            const res = await axios.get(url, {
                params: { param, phone, skin },
                headers: { Authorization }
            });

            const { Code, Message } = res.data;

            if (Code === 'OK') {
                ctx.body = { code: 0, messsage: Message };
            } else {
                ctx.body = { code: 1, messsage: Message };
            }

        } catch(err) {
            throw Error(err.message);
        }
    }
}