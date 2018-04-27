const mysql = require('mysql');
const config = require('../config');

// 创建连接池
const pool = mysql.createPool(config.database);

/**
 * 执行sql语句
 * 
 * @param { String } sql 执行的sql语句
 * 
 * @return { Promise } sql执行结果
 */
exports.sql = function(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw '数据库连接异常!';

            connection.query(sql, (error, rows) => {
                connection.release();

                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        })
    })
}
