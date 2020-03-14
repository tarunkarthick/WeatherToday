


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#messageone')
const messagetwo=document.querySelector('#messagetwo')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    messageone.textContent='Loading...'
    messagetwo.textContent=''
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
        }
        else{
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
        }
    })
})
})