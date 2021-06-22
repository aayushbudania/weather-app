
console.log('client side javascript')

const formData = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')
const msg3 = document.querySelector('#message3')
const msg4 = document.querySelector('#message4')
const msg5 = document.querySelector('#message5')

formData.addEventListener('submit',(e)=>{
      e.preventDefault()
      // console.log("Form data Submitted")

      msg1.textContent = 'Loading...'
      msg2.textContent = ''
      msg3.textContent = ''
      msg4.textContent = ''
      msg5.textContent = ''

      const location = search.value
      console.log(location)

      fetch('http://localhost:3000/weather?address='+location).then( (response) => {
      response.json().then( (data) => {
            if(data.error){
                  msg1.textContent=data.error
                  return console.log(data.error)
            }
            msg1.textContent = " "
            msg2.textContent=data.place 
            msg3.textContent="Today's Weather: "+data.weather
            msg4.textContent="Current Temperature: "+data.current_temperature+"°C"
            msg5.textContent="Apparent Temperatur: "+data.apparent_temperature+"°C"

            // console.log(data.place)            
            // console.log(data.current_temperature)
            // console.log(data.apparent_temperature)
            // console.log(data.weather)
      })
})

})