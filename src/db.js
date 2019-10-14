const cloud = require('wx-server-sdk');

const db = cloud.database();

/**
 * 查询处理
 * @param  {[type]} sheet      [数据表名称]
 * @param  {Object} [limit={}] [查询条件]
 */
const get = (sheet, limit = {}) => {
  try {
    return db.collection(sheet).where(limit.where).get();
  } catch (e) {
    console.error(e);
  }
}

/**
 * 新增处理
 * @param  {[type]} sheet  [数据表名称]
 * @param  {[type]} params [参数]
 */
const add = (sheet, params) => {
  try {
    return db.collection(sheet).add({
      data: params
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 编辑处理
 * @param  {[type]} sheet      [数据表名称]
 * @param  {[type]} params     [参数]
 * @param  {Object} [limit={}] [条件]
 */
const edit = (sheet, params, limit = {}) => {
  delete params._id;
  try {
    return db.collection(sheet).where(limit.where).update({
      data: params
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 删除处理
 * @param  {[type]} sheet      [数据表名称]
 * @param  {[type]} params     [参数]
 * @param  {Object} [limit={}] [条件]
 */
const remove = (sheet, params, limit = {}) => {
  try {
    return db.collection(sheet).where(limit.where).remove();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
    get,
    add,
    edit,
    remove
}