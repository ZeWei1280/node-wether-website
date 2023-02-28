const request = require('postman-request');

const geoCode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=24c22f0e436631d7f99867a144df35e9&query=' + address;
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to geocoding services!',undefined);
        }
        else if(body.error || body.data.length ===0){
            callback('Unable to find location!',undefined);
        }
        else{
            callback(undefined, {
                location: body.data[0].name,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            });
        }
    });
}

module.exports = geoCode;