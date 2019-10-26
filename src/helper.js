const cloud = require('wx-server-sdk');

function getOpenId() {
    let { OPENID } = cloud.getWXContext()
    return OPENID;
}

module.exports = {
    getOpenId
}