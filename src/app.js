const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engnine', 'hbs')
app.set('views', viewsPath)
hbs. registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Omkar Pandya'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Me',
        name: 'Omkar Pandya'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Omkar Pandya'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
          return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
          if(error) {
            return res.send({error})
          }
        res.send({
            Address: req.query.address,
            Location: location,
            Forecast: 'Description: ' + forecastdata.description + '\nTemperature: ' + forecastdata.temperature + '\nFeelsLike: ' + forecastdata.feelsLike})
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Omkar Pandya',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Omkar Pandya',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})