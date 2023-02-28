const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();


/* Define pathes for Express config */
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//console.log(__dirname);

/* Setup handlebars engine and views location */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/* Setup static directory to serve*/ 
app.use(express.static(publicDirectoryPath));


/* Render pages*/ 
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'LZW'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'LZW'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name: 'LZW'
    });
})

app.get('/weather', (req, res)=>{ 
    if(!req.query.address){ 
        return res.send({
            error: 'You must provide a valid address.'
        })
    }
    ///
    geocode(req.query.address, (error, {longitude, latitude, location}={})=>{
        if(error){
            return res.send({error});
        } 
        forecast(longitude, latitude, (error, forcastData) => { //longitude經度, latitude緯度
            if(error){     
                return res.send({error});
            } 
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            });
        })
    });
    ///
    // res.send({
    //     // address: req.query.address,
    //     // resforecast
    // });
})

app.get('/products',(req, res)=>{
    if(!req.query.searh){ //要用return，否則會send2次，但是一次操作只能一次send
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)   //req.query會抓出URL後面的參數，ex: 'http://localhost:3000/products?search=games'，用.search來access參數
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404 Error',
        errorMsg:'Help article not found!',
        name: 'LZW'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title:'404 Error',
        errorMsg:'Page not found!',
        name: 'LZW'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port:3000')
})