const libExpress = require('express');
const libBodyParser = require('body-parser');

const util = require('./utils');


const server = {}


server.app = libExpress()

//start method
server.start = () => {

    //ask express to use template engine pug
    server.app.set('view engine', 'pug');
    //static files directory
    server.app.use(libExpress.static('public'));
    //json body parsing
    server.app.use(libBodyParser.json());
    //ask to print every request with middleware
    server.app.use(require('./middlewares/requests'))
    //ask to travel into api path
    server.app.use("/api", require('./routers/api'))
    //ask to travel into ui path
    server.app.use(require('./routers/ui'))

    //set up the port to listen on, default is 3000
    //express start server
    server.app.listen(process.env.PORT, () => {
        util.logger(`Server is listening...`, "success");
    });

}


module.exports = server