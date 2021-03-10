const express = require('express'); //from documentation: express is function
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();//app is an object

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use('/clients', routes.clients)

app.use('/business', routes.business)

app.use('/peers', routes.peers)

app.get('/', (req, res) => {
    res.render('homepage.ejs');
});

app.listen(3000, ()=>{
    console.log("I am listening");
});