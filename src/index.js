const router = require('tcb-router');
const cloud = require('wx-server-sdk');

cloud.init()

const db = require('./db');
const format = require('./format');

module.exports = {
  router,
  db,
  format,
  cloud
}