const express = require('express'); //from documentation: express is function
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();//app is an object

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use('/clients', routes.clients)

app.get('/', (req, res) => {
    res.send('Hello world via express');
});

app.listen(3000, ()=>{
    console.log("I am listening");
});