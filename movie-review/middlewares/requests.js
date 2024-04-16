module.exports = function (req, res, next) {
    console.log(`[+]Incoming Request - Method : ${req.method} Path : ${req.path} `);
    next()
}