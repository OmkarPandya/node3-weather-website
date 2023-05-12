const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const urlWeather = 'http://api.weatherstack.com/current?access_key=4aaa436b776766bbe53dbec407b25d88&query='+longitude+','+latitude+'&units=m'

    request({url: urlWeather, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather Service!', undefined)
        } else if(body.error){
            callback('Can not find location!', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast