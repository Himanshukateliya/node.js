const chalk = require('chalk');
const libMoment = require('moment')
const { MongoClient } = require('mongodb');

//util object
const util = {}

//util chalk color picker
util.logChalkPicker = {
    "warning": chalk.yellow,
    "error": chalk.red,
    "success": chalk.green,
    "common": chalk.white,
}

//util log sign picker
util.logSignPicker = {
    "warning": "[!]",
    "error": "[-]",
    "success": "[+]",
    "common": "[*]",
}

//log printer
util.logger = (msg, type = "common") => {
    console.log(util.logChalkPicker[type](`${util.logSignPicker[type]}${libMoment().format('DD-MM-YYYY HH:mm')} : ${msg}`))
}

//db connection
util.getDBConnection = (callBackFunction) => {
    new MongoClient(process.env.MONGO_DB_SERVER).connect()
        .then(dbConnection => dbConnection.db(process.env.MONGO_DB))
        .then(db => callBackFunction(db))
        .catch((e) => {
            util.logger(e, "error")
            callBackFunction(false);
        })
}


//export util
module.exports = util