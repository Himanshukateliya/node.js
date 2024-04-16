const libExpress = require('express');
const uiRouter = libExpress.Router();

const util = require('../utils')

//index
// uiRouter.get("/name", (req, res) => {
//     res.render("index", { names: ["nisarg", "himanshu", "xyz"] })
// })

uiRouter.get('/', (req, res) => {
    util.getDBConnection((db) => {
        db.collection("movies").find().toArray().then(allMovies => {
            res.render('index', { allMovies: allMovies });
        })
    })

})

module.exports = uiRouter