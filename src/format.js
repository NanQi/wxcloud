const success = (ctx) => {
    return {
        code: 0,
        message: 'success',
        data: ctx.data.data
    }
}

const error = (code, message, data = '') => {
    if (code === 0) {
        throw 'code错误';
    }

    return {
        code,
        message,
        data
    }
}

module.exports = {
    success,
    error
}