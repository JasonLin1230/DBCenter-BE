'use strict';

const Router = require('koa-router');
const router = new Router();

const Table = require('../controllers/table');
const table = new Table();

router.post('/', table.insert.bind(table));

router.delete('/:tableName', table.delete.bind(table));

router.get('/', table.query.bind(table));

router.get('/:tableName', table.findOne.bind(table));


module.exports = router