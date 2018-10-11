const express = require("express");
const hbs = require("hbs");
const fs = require("fs")
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set("view engine", 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('unable to connect to log ')
        }
    });
    next();
});
// app.use((req, res, next) =>{
//     res.render('maintanance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getcurrentyear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text) => {
    return text.toUpperCase();
})
app.get('/',(req, res) => {
    res.render('home.hbs',{
        pagetilte:'home page',
        welcomeMassege: 'hello and welcome'
    });

});
app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pagetilte: 'about page',
    });

});

app.listen(3000);