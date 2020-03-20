
console.log('Client Side javascript is loaded')

const searchValue = document.querySelector('input')

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('testing')
    fetch('http://localhost:3000/weather?address='+ searchValue.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
        console.log(data)

    })
})
    
})
