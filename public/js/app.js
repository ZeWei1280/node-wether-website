console.log('Client side javascript file is loaded');


// index.hbs裡的form、input
const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');

// 顯示字
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2'); //js中要使用html的指定id時前面加#




weatherForm.addEventListener('submit', (e)=>{ //'submit':提交表單時觸發 e: event
    e.preventDefault(); //不會快速刷新page
    const location = search.value;
    //console.log(location);
    

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    //根據location查天氣
    fetch('/weather?address='+location, {method:'GET'}).then((response)=>{ 
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            }
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
    /*
    fetch( 你想訪問的url,{...一堆参數(可選)} )
        .then((response) => {
            //成功結果處理
        })
        .catch((error) => {
        //錯誤結果處理
     })
    */
    //fetch用法:對'URL'送出request，有兩個參數fetch(URL, Option)，option不寫預設是get

    
})

