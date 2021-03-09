const express = require('express'); //from documentation: express is function
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();//app is an object

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use('/clients', routes.clients)

// Import models
const administrators=require('./models/administrators.js');
const business=require('./models/business.js');
const changeRequests=require('./models/change-requests.js');
const ownerAprovals=require('./models/owner-aprovals.js');
const peers=require('./models/peers.js');
const ratings=require('./models/ratings.js');

app.get('/', (req, res) => {
    res.send('Hello world via express');
});

app.listen(3000, ()=>{
    console.log("I am listening");
});