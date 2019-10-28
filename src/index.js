const cloud = require('wx-server-sdk');
cloud.init()
const router = require('tcb-router');

const db = require('./db');
const format = require('./format');
const helper = require('./helper');

module.exports = {
  router,
  db,
  format,
  cloud,
  helper
}