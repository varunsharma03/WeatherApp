
const getstate=document.querySelector('.input');
const button=document.querySelector('.btn');
let city=document.querySelector('.input').innerHTML.value;
const show=document.querySelector('.display');
const key= "9b62cca58176220ef7c386aa7500bc08";
// let para=document.querySelector('.display');
// para=showWeather();
// button.addEventListener('click',function(){
//   let x=document.querySelector('.input').value;
//   if(x){
//   city=x;
//   showWeather();
//   }
// });


// async function showWeather()
// {
//   try{
//   const response=await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);

//   const data= await response.json();
//   console.log(data);
//   // let para=document.querySelector('.display');
//   let para=document.createElement('p');
//   para.textContent=`${city}: ${data?.main?.temp.toFixed(2)}'C`;
//   document.body.appendChild(para);
// }
// catch(err){

// }
// }
// showWeather();
async function showWeather()
{
  try{
  let x = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);

  const data = await x.json();
  console.log(data);
  let para =document.createElement('p');
  // para.textContent=`${city}: ${data?.main?.temp.toFixed(2)}'C`;
  // document.body.appendChild(para);
  show.innerHTML=para.textContent=`${city}: ${data?.main?.temp.toFixed(2)}'C`;;
  }
  catch(err){
    console.log('error in city');
  }
};
