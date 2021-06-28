const request = require('request');

const forecast = (longitude,latitude , callback) => {
      const url = 'http://api.weatherstack.com/current?access_key=e875bb38aee8727fe6986f996c79bd37&query='+longitude+','+latitude;

      request({ url , json:true},(error,response) => {
            if(error)
                  callback('Unable to connect to Network.',undefined);
            else if(response.body.error)
                  callback('Unable to find location.' , undefined);
            else{
                  callback(undefined, {
                         curr_temp : response.body.current.temperature,
                         ap_temp : response.body.current.feelslike,
                         weather : response.body.current.weather_descriptions[0],
                         time    : response.body.current.observation_time,
                         humidity : response.body.current.humidity
                  })
            }
      })
}

module.exports = forecast