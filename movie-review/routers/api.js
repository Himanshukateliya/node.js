const libExpress = require('express');

const apiRouter = libExpress.Router()


//users
apiRouter.use("/users", require('./apiUsers'))

//movies
apiRouter.use("/movies", require('./movieApi'))

//movies
apiRouter.use("*", (req, res) => {
    res.status(404).json({ error: "Invalid API" })
})

module.exports = apiRouter