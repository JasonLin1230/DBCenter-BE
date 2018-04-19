'use strict';

const getDate = require('../utils/getDate');

/**
 * 打印日志
 *      url
 *      Method
 *      Request Body
 *      From IP
 *      Date
 *      Status
 *      Response Body
 *      Time Consuming
 */
module.exports = async function({ request, response }, next) {
    const startTime = Date.now();

    let { url, method, body: reqBody, ip } = request;

    let date = `Date: ${getDate()}`;
    
    ip = `From IP: ${ip.substring(7)}\n`;

    url = `URL: ${url}\n`;

    method = `Method: ${method}\n`;

    reqBody = `Request Body: ${JSON.stringify(reqBody)}`;

    console.log(`<---\n${date}${ip}${url}${method}${reqBody}`);

    await next();

    let { status, body: resBody } = response;

    status  = `Status: ${status}\n`;

    resBody = `Response Body: ${JSON.stringify(resBody)}\n`;

    const endTime = Date.now();

    const diffTime = `Time Consuming: ${endTime - startTime}ms\n`;

    console.log(`${status}${resBody}${diffTime}--->`);
}