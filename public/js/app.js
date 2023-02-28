console.log('Client side javascript file is loaded');


// index.hbs裡的form、input
const weatherForm = document.querySelector('form');     
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




weatherForm.addEventListener('submit', (e)=>{ // e: event
    e.preventDefault(); //不會快速刷新page
    const location = search.value;
    //console.log(location);
    

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //根據location查天氣
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        }
        else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast
        }
    })
})
})

