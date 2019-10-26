const cloud = require('wx-server-sdk');

const db = cloud.database();

/**
 * 查询一条数据
 * @param  {[type]} sheet      [数据表名称]
 * @param  {Object} [where={}] [查询条件]
 */
async function item(sheet, where = {}) {
  try {
    let info = await db.collection(sheet).where(where).get();
    if (!!info.data && info.data.length >= 1) {
      return info.data[0]
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * 查询多条数据
 * @param  {[type]} sheet      [数据表名称]
 * @param  {Object} [where={}] [查询条件]
 * @param  {[type]} order      [排序]
 * @param  {[type]} page       [页码]
 * @param  {[type]} limit      [每页数量]
 */
async function list(sheet, where = {}, order = '', page = 1, limit = 20) {
  try {
    let query = await db.collection(sheet).where(where);
    if (!!order) {
      let orderList = order.split(' ', 2)
      if (orderList.length == 1) {
        orderList.push('asc')
      }
      query = query.orderBy(orderList[0], orderList[1])
    }
    if (limit !== -1) {
      query = query.skip((page - 1) * limit).limit(limit);
    }
    
    let list = query.get();
    return list.data;
  } catch (e) {
    console.error(e);
  }
}

/**
 * 查询多条数据
 * @param  {[type]} sheet      [数据表名称]
 * @param  {Object} [where={}] [查询条件]
 * @param  {[type]} order      [排序]
 */
function all (sheet, where = {}, order = '') {
  return list(sheet, where, order, 1, -1)
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
 * @param  {Object} [where={}] [条件]
 */
const edit = (sheet, params, where = {}) => {
  delete params._id;
  try {
    return db.collection(sheet).where(where).update({
      data: params
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 删除处理
 * @param  {[type]} sheet      [数据表名称]
 * @param  {Object} [where={}] [条件]
 */
const remove = (sheet, where = {}) => {
  try {
    return db.collection(sheet).where(where).remove();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
    item,
    list,
    all,
    add,
    edit,
    remove
}