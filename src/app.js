const exp = require('constants')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

// paths for express configuration
const dirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//to set handlebars
app.set('view engine','hbs')
//to set views directory
app.set('views',viewPath)

//to set up partials
hbs.registerPartials(partialsPath)

//to set up static directory
app.use(express.static(dirPath))

app.get('',(req,res) => {
      res.render('index',{
            title:'weather App',
            name: 'Aayush Prakash Budania'
      })
})

app.get('/about',(req,res) => {
      res.render('about',{
            title: 'About Me',
            name: 'Aayush Prakash Budania'
      })
})

app.get('/help',(req,res) => {
      res.render('help',{
            title: 'Help Page ',
            name: 'Aayush Prakash Budania'
      })
})

app.get('/help/*',(req,res) => {
      res.render('error',{
            errorMessage: 'Help article not found'
      })
})

// app.get('/product' , (req,res) =>{
//       if(!req.query.search){
//             return res.send("ERROR: No search result available")
//       }
//       res.send({
//             product:[]
//       })
// })

app.get('/weather',(req,res) => {
      if(!req.query.address){
            return res.send({
                  error: 'No address provided'
            })
      }
      geocode(req.query.address,(error,{longitude,latitude,place} = {} ) => {
            if(error)
            return res.send({error: error})

            forecast(longitude,latitude,(error,data2) => {
                  
                  if(error)
                        return res.send({error})
                  
                  res.send({
                        place,
                        current_temperature:data2.curr_temp,
                        apparent_temperature:data2.ap_temp,
                        weather:data2.weather
                  })
                  // console.log("current temperature: "+data.curr_temp);
                  // console.log("Apparent temperature: "+data.ap_temp);
                  // console.log("Weather: ",data.weather);
            });
      })
})

app.get('*',(req,res) => {
      res.render('error',{
            errorMessage: 'Page Not Found',
            title:'404',
            name:'The page you are looking for is not available.'
      })
})

app.listen(3000,() => {
      console.log('server running on port 3000')
})