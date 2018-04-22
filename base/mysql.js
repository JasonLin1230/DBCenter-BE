const mysql = require('mysql');
const config = require('../config');

let pool = null;

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

/**
 * 数据库初始化函数
 */
exports.init = async function() {
    try {
        // 创建连接池
        pool = mysql.createPool(config.database);

        await this.sql('Create Database If Not Exists DBCenter;');

        await this.sql('USE DBCenter');

        const createUserSql = `
            Create Table If Not Exists user (
                id Int Not Null Primary Key Auto_Increment,
                phone Char(11) Not Null Unique,
                secret Char(32) Not Null
            )Engine=InnoDB Default Charset=utf8;
        `;
        await this.sql(createUserSql);

        // const createLogSql = `
        //     Create Table If Not Exists log(
        //         id Int Not Null Primary Key Auto_Increment,
        //         user_id Int Not Null,
        //         type Enum('insert', 'delete', 'update') Not Null,
        //         date Datetime Not Null,
        //         foreign Key(user_id) references user(id)
        //     )Engine=InnoDB Default Charset=utf8;
        // `;
        // await this.sql(createLogSql)
    } catch(err) {
        console.error(err);
    }
}
