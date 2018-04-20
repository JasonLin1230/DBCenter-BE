'use strict';

const Router = require('koa-router');
const router = new Router();

const Data = require('../controllers/data');
const data = new Data();

router.post('/:tableName', data.insert.bind(data));

router.delete('/:tableName', data.delete.bind(data));

router.put('/:tableName', data.update.bind(data));

router.get('/:tableName', data.query.bind(data));


module.exports = router