// const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const port = 8000;
const app = express();

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost/dAcademyContact", { useNewUrlParser: true });

// mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS specific stuff
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());




// PUG specific stuff
app.set('view engine', 'pug');  // set the template engine as pub
app.set('veiws', path.join(__dirname, 'views'));  //set the views directory




// END-POINTS
app.get('/', (req, res) => {
    const pramas = {}
    res.status(200).render('home.pug', pramas);
})
app.get('/contact', (req, res) => {
    const pramas = {}
    res.status(200).render('contact.pug', pramas);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("item has been saved to the database");
    }).catch(()=>{
        res.status(404).send("item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})



// START the server
app.listen(port, () => {
    console.log(`the app started successfully at port ${port}`);
});