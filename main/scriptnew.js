const UserTab=document.querySelector("[data-userWeather]");
const SearchTab=document.querySelector("[data-searchWeather]");
const UserContainer=document.querySelector(".weather-Container");

const GrantAccessContainer=document.querySelector(".grant-location-container");
const SearchFormContainer= document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector('.user-info-container');

const key= "9b62cca58176220ef7c386aa7500bc08";
// getfromSessionStorage();

// tab switching
let currentTab=UserTab;
currentTab.classList.add("current-tab");

UserTab.addEventListener('click',()=>{
  Switchtab(UserTab);
});
SearchTab.addEventListener("click",()=>{
  Switchtab(SearchTab);
});

// function for switching
function Switchtab(tab)
{
  if(currentTab!=tab)
  {
    currentTab.classList.remove("current-tab");
    currentTab=tab;
    currentTab.classList.add("current-tab");
  
  if(!SearchFormContainer.classList.contains("active"))
  {
    GrantAccessContainer.classList.remove("active");
    userInfoContainer.classList.remove("active");
    SearchFormContainer.classList.add("active");
  }
  else{
    SearchFormContainer.classList.remove("active");
    userInfoContainer.classList.remove("active");
    getfromSessionStorage();
  }
}

}


  // api=https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
 function getfromSessionStorage()
  {
    const localCoordinate= sessionStorage.getItem("user-coordinate");
    if(!localCoordinate)
    {
      GrantAccessContainer.classList.add("active");
    }else{
      const coordinates= JSON.parse(localCoordinate);
      feathuserinfo(coordinates);
    }
  }


async function feathuserinfo(coordinates)
{
  const{lat,lon }=coordinates;
  GrantAccessContainer.classList.remove("active");
  loadingScreen.classList.add("active");
  try{
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)

    const data = await response.json();
    console.log(data);
    loadingScreen.classList.remove("active")
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  }
  catch{

  }
}


function renderWeatherInfo(data)
{
  const cityName=document.querySelector("[data-city-name]");
  const weatherDiscription= document.querySelector("[data-weather-discription]");
  const temperature=document.querySelector("[data-temperature]");
  const windSpeed= document.querySelector("[data-wind-speed]");
  const humidity =document.querySelector("[data-humidity]");
  const clouds= document.querySelector("[data-clouds]");
  
  cityName.innerText  = data?.name;
  weatherDiscription.innerText = data?.weather?.[0]?.description;
  temperature.innerText = data?.main?.temp;
  windSpeed.innerText=data?.wind?.speed;
  humidity.innertext= data?.main?.humidity;
  clouds.innerText = data?.clouds?.all;

}

const grantaccessbtn=document.querySelector("[data-grantAccess]");
grantaccessbtn.addEventListener("click",getLocation);



function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position)
{
  const userCoordinate={
    lat:position.coords.latitude, 
    lon: position.coords.longitude
  }

  sessionStorage.setItem("user-coordinate",JSON.stringify(userCoordinate));
  feathuserinfo(userCoordinate);
}

const searchInput = document.querySelector("[data-search-input]");


// const searchInput=document.querySelector("[data-search-input]");

// SearchFormContainer.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     let cityname=searchInput.value;
//     if (cityname=="")
//     {
//       return;
//     }
//     else{
//       fetchSearchWeatherInfo(cityname);
//     }
// })

SearchFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityname = searchInput.value;
  if (cityname === "") {
    return;
  } else {
    fetchSearchWeatherInfo(cityname);
  }
});


// function submit()
// {
//   let cityname=searchInput.value;
//   if (cityname=="")
//   {
//     return;
//   }
//   else{
//     fetchSearchWeatherInfo(cityname);
//   }
// }


async function fetchSearchWeatherInfo(city)
{
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  GrantAccessContainer.classList.remove("active");
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      renderWeatherInfo(data);

   }
   catch(err){

    }
}  
