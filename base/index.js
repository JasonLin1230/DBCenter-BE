'use strict';

const getDate = require('./getDate');
const mysql = require('./mysql');

module.exports = class {
    constructor() {
        this.getDate = getDate;
        this.sql = mysql.sql;
    }
}