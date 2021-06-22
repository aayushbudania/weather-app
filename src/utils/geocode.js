request = require('request');

const geocode = (address , callback) => {
      const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYWF5dXNoYmRuIiwiYSI6ImNrcTJiZDl1dzA3bDMyd3Q0aXp6cndrcGkifQ.JtY97Ddlh2FxlbEtlFVcwA&limit=1";

      request({url:url2 , json: true},(error , response) =>{
            if(error)
                  callback('Unable to connect to network.',undefined);
            else if(response.body.features.length === 0)
                  callback('Unable to find location.',undefined);
            else{
                  callback(undefined,{
                        longitude : response.body.features[0].center[1],
                        latitude :  response.body.features[0].center[0],
                        place :  response.body.features[0].place_name
                  })
            }
      })
}

module.exports =  geocode
