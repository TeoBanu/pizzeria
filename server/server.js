require('babel-register');

import UserService from "./user/user.service";
import PizzaService from "./pizza/pizza.service";
import FileService from "./file/file.service";
import OrderService from "./order/order.service";
import gridfs from "./gridfs";

let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

let app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Connect to the database before starting the application server.
let dbConnection = mongoose.connect('mongodb://localhost/Pizzeria', {
    useMongoClient: true,
    /* other options */
});
dbConnection.then((database) => {
    console.log("Database connection ready");
    gridfs.init(mongoose);
    // Initialize the app.
    let server = app.listen(process.env.PORT || 8080, () => {
        let port = server.address().port;
        console.log("App now running on port", port);
    });
});

// Log in user
app.post('/api/login', UserService.findByEmail);

//Retrieve user info.
app.get('/api/users/:id', UserService.show);

// Update user information.
app.put('/api/users/:id', UserService.update);

// Create a new user.
app.post('/api/users', UserService.create);

// Retrieve all pizzas
app.get('/api/pizza', PizzaService.showAll);

// Retrieve pizza info.
app.get('/api/pizza/:id', PizzaService.show);

// Update pizza information.
app.put('/api/pizza/:id', PizzaService.update);

// Create a new pizza.
app.post('/api/pizza', PizzaService.create);

// Delete pizza
app.delete('/api/pizza/:id', PizzaService.remove);

// Retrieve file
app.get('/api/files/:fileId', FileService.show);

// Create file
app.post('/api/files/', FileService.create);

// Delete file
app.delete('/api/files/:fileId', FileService.remove);

// Create order
app.post('api/order', OrderService.create);

// Show order
app.get('api/order/:id', OrderService.show);

// Show all orders
app.get('api/order', OrderService.showAll);

// Show orders for user
app.get('api/order/:userId', OrderService.showAllByUserId);

// Update order
app.put('api/order/:id', OrderService.update);
