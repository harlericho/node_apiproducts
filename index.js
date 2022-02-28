const app = require('./app/app');



// todo: Start the server
app.listen(app.get('port'), (err) => {
    if (err) {
        console.error(err);
    }
    console.log('Server is running on => http://localhost:' + app.get('port'));
})