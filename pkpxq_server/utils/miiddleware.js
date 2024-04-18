module.exports = {
    utils: function (req, res, next) {
        res.cc = function (err, code = 400) {
            res.send({
                code,
                msg: err || '错误',
            })
        }
        res.sc = function (data, msg='操作成功', code = 200) {
            res.send({
                code,
                data,
                msg
            })
        }
        next()
    },
    error_401: function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                code: 401,
                msg: '没有权限访问'
            });
        } else {
            next(err);
        }
    },
    error_handle: function (err, req, res, next) {
        console.log(err)
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.render('error');
    }
}
