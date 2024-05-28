const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");

const updateExchangeRate= async ()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval=== " " || amtval < 1){
      amtval = 1;
      amount.value = "1";
    }
    console.log(fromCurr.value,toCurr.value);
    const URL=`https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json(); 
    let rate = data.rates[toCurr.value];
   
    let finalAmount= amtval*rate;
    msg.innerText =`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode=="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
  let currCode = element.value;
  let countryCode = countryList[currCode]; 
  let newsrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src=newsrc;
};

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();//refresh nhi krne k lea
  updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});