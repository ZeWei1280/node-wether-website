const request = require('postman-request');

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3e8afc50a95aed5fb6b9961a6b50dec6&query=' + latitude +','+ longitude +'&units=m';
    //console.log (url);
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!' ,undefined);
        }
        else if(body.error){
            callback('Unable to find location!' ,undefined);
        }
        else{
            const weatherData = {
                location: body.location.name,
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            };
            // callback(undefined, weatherData);
            const {location, description, temperature, feelslike} = weatherData;
            const rt =  location + ': ' + description + '. It is currently '+ 
            temperature + ' degrees out. It feels like ' + 
            feelslike + ' degreees out.';
            callback(undefined, rt);
        }
    })
}


module.exports = forecast;