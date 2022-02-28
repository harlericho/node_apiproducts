const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const router = require('./routers/router');

// todo: Init app
const app = express();

// todo: Port number to listen on for HTTP requests
const port = process.env.PORT || 9000;
app.set('port', port);

// todo: File upload configuration
app.use(fileUpload({
    createParentPath: true
}))

// todo: Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'));

// todo: Routes
app.use('/api/products/', router);

// todo: When starting the server it shows a default route
app.use('/', (req, res) => {
    res.send('<p>Welcome to the API</p>');
})



// * Export the app for testing
module.exports = app;
