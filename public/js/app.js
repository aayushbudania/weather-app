
console.log('client side javascript')

const formData = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')
const msg3 = document.querySelector('#message3')
const msg4 = document.querySelector('#message4')
const msg5 = document.querySelector('#message5')
const msg6 = document.querySelector('#message6')
const msg7 = document.querySelector('#message7')

formData.addEventListener('submit',(e)=>{
      e.preventDefault() // to not refresh the browser automatically
      // console.log("Form data Submitted")

      msg1.textContent = 'Loading...'
      msg2.textContent = ''
      msg3.textContent = ''
      msg4.textContent = ''
      msg5.textContent = ''
      msg6.textContent = ''
      msg7.textContent = ''

      const location = search.value
      console.log(location)

      fetch('/weather?address='+location).then( (response) => {
      response.json().then( (data) => {
            if(data.error){
                  msg1.textContent=data.error
                  return console.log(data.error)
            }
            msg1.textContent = " "
            msg2.textContent=data.place 
            msg3.textContent="Today's Weather: "+data.weather
            msg4.textContent="Current Temperature: "+data.current_temperature+"°C"
            msg5.textContent="Apparent Temperature: "+data.apparent_temperature+"°C"
            msg6.textContent="Current Time: "+data.time+" (UTC)"
            msg7.textContent="Humidity: "+data.humidity+"%"

            // console.log(data.place)            
            // console.log(data.current_temperature)
            // console.log(data.apparent_temperature)
            // console.log(data.weather)
      })
})

})