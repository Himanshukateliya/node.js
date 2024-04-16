const libExpress = require('express');
const util = require('../utils')
const currentModuleRouter = libExpress.Router()
const { ObjectId } = require('mongodb');
//get all movies
currentModuleRouter.get("/", (req, res) => {

    util.getDBConnection((db) => {
        db.collection("movies").find().toArray().then(array => {
            res.status(200).json(array)
        })
    })

})

//specific
currentModuleRouter.get("/:id", (req, res) => {
    util.getDBConnection((db) => {
        try {
            db.collection("movies").findOne({ _id: new ObjectId(req.params.id) }).then(user => res.status(200).json(user))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })
})

//new create
currentModuleRouter.post("/", (req, res) => {
    util.getDBConnection((db) => {
        try {
            db.collection("movies").insertOne(req.body).then(ack => res.status(200).json(ack))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })

})

//edit - entire object
currentModuleRouter.put("/:id", (req, res) => {

    util.getDBConnection((db) => {
        try {
            db.collection("movies").replaceOne({ _id: new ObjectId(req.params.id) }, req.body
            ).then(ack => res.status(200).json(ack))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })


})

//edit specific feilds
currentModuleRouter.patch("/:id", (req, res) => {

    util.getDBConnection((db) => {
        try {
            db.collection("movies").updateOne({ _id: new ObjectId(req.params.id) }, {
                $set: req.body
            }).then(ack => res.status(200).json(ack))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })

})

//speicific delete
currentModuleRouter.delete("/:id", (req, res) => {

    util.getDBConnection((db) => {
        try {
            db.collection("movies").deleteOne({ _id: new ObjectId(req.params.id) }).then(ack => res.status(200).json(ack))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })

})
currentModuleRouter.delete("/", (req, res) => {

    util.getDBConnection((db) => {
        try {
            db.collection("movies").deleteMany({ name: "asdsaf" }).then(ack => res.status(200).json(ack))
        }
        catch (e) {
            util.logger(e, "error")
            return res.status(500).json({})
        }
    })

})

//unknown request
currentModuleRouter.use((req, res) => {
    res.status(404).json({ error: ":Method Not Supported" })
})

module.exports = currentModuleRouter