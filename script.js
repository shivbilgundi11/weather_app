// Selecting All Elements...
let input = document.querySelector("input");
let searchBtn = document.getElementById("search-btn");
let userLoc = document.getElementById("user-loc");

// Temp-data display elements...
let tempData = document.querySelectorAll(".temp-data");
let minTempData = document.querySelector(".temp-min");

let tomorrowTemp = document.querySelector(".tomorrow-temp");

let tempIcon = document.querySelector('.temp-icon img');

//Weather-Description...
let weatherDescription = document.querySelector(".weather-desc");

// Pressure...
let pressure = document.querySelector(".pressure-data");
// visibility...
let visibility = document.querySelector(".visibility-data");
// humidity...
let humidity = document.querySelector(".humidity-data");

// AQI RANGE Status...
let AQIRange = document.querySelector(".aqi-range");

//City Name...
let cityName = document.querySelectorAll(".city-name");

//Country Name...
let country = document.querySelector(".country");

//Current Day...
let currentDay = document.querySelector(".current-day");

let loader = document.getElementById("loader");

//Sunrise and Set Date...
let riseTime = document.querySelector(".rise-time");
let setTime = document.querySelector(".set-time");

//Day info elements...
let morn = document.querySelector('.morning-temp');
let mornDesc = document.querySelector('.morn-desc');
let mornIcon = document.querySelector('.morn-icon img');

let after = document.querySelector(".after-temp");
let afterDesc = document.querySelector(".after-desc");
let afterIcon = document.querySelector(".after-icon img");

let even = document.querySelector(".even-temp");
let evenDesc = document.querySelector(".even-desc");
let evenIcon = document.querySelector(".even-icon img");

let night = document.querySelector(".night-temp");
let nightDesc = document.querySelector(".night-desc");
let nightIcon = document.querySelector(".night-icon img");

//next 5 days forecast...
let Days = document.querySelectorAll('.day');


let day1Temp = document.querySelector(".day-1-temp");
let day1Icon = document.querySelector(".day-1-icon img");
let day1Desc = document.querySelector(".day-1-desc");

let day2Temp = document.querySelector(".day-2-temp");
let day2Icon = document.querySelector(".day-2-icon img");
let day2Desc = document.querySelector(".day-2-desc");

let day3Temp = document.querySelector(".day-3-temp");
let day3Icon = document.querySelector(".day-3-icon img");
let day3Desc = document.querySelector(".day-3-desc");

let day4Temp = document.querySelector(".day-4-temp");
let day4Icon = document.querySelector(".day-4-icon img");
let day4Desc = document.querySelector(".day-4-desc");

let day5Temp = document.querySelector(".day-5-temp");
let day5Icon = document.querySelector(".day-5-icon img");
let day5Desc = document.querySelector(".day-5-desc");

let key = "e8e217275f3d9ec5b89403497270d8e5";

let url = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${key}`;


//Get weather for city on pressing enter key...
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    requestApi(input.value);
  }
});
//Get weather for city on clicking search icon...
searchBtn.addEventListener('click', () => {
  requestApi(input.value);
});
//Get weather for gulbarga defualt weather loaded on page load...
window.addEventListener("load", () => {
    requestApi('mysore');
});
//Get weather for user location on clicking user loc icon...
userLoc.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(success, error);
});

//Animation...
function animation(ms){
  loader.classList.add('loading');
  main.style.display = 'none';

  setTimeout(() => {
    loader.classList.remove('loading');
    main.style.display = 'block';
  }, ms);
};


function success(posi) {
  animation(2000);
  navigator.geolocation.getCurrentPosition((position) => {
    let coords = posi.coords;
    getWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=metric`
    );
    fetchAQI(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`
    );
    fetchForecast(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}&units=metric`
    );
  });
};

function error(err){
  alert("You did not give permission to access your location...")
};

function requestApi(value) {

  animation(500);

  let api = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${key}`;

  fetch(api)
    .then((response) => response.json())
    .then((result) => {

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${key}&units=metric`;

      getWeather(url);

      fetchAQI(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${result[0].lat}&lon=${result[0].lon}&appid=${key}`
      );

      fetchForecast(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${result[0].lat}&lon=${result[0].lon}&appid=${key}&units=metric`
      );
    }).catch(() => {
      alert("Please enter a valid city name...");
    })
}



//Getting Current Data...
function getWeather(link) {
  fetch(link)
  .then((response) => response.json())
    .then((result) => {
      updateWeather(result);
    });
}
//Updating Current Data...
function updateWeather(weatherinfo) {
  for (let city in cityName) {
    cityName[city].innerText = weatherinfo.name;
    country.innerHTML = weatherinfo.sys.country;
  }

  todayIconUrl = weatherinfo;

  todayTemp = Math.round(weatherinfo.main.temp) + "°C";
  tempIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherinfo.weather[0].icon}.png`);

  morn.innerHTML = Math.round(weatherinfo.main.temp) + "°C";;
  mornDesc.innerHTML = weatherinfo.weather[0].description;
  mornIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherinfo.weather[0].icon}.png`);

  pressure.innerHTML = weatherinfo.main.pressure + "mb";

  visibility.innerHTML = weatherinfo.visibility / 1000 + "km";

  humidity.innerHTML = weatherinfo.main.humidity + "%";

  for (let t in tempData) {
    tempData[t].innerText = Math.round(weatherinfo.main.temp) + "°C";
  }

  minTempData.innerHTML = weatherinfo.main.temp_min + "°C";

  weatherDescription.innerHTML = weatherinfo.weather[0].description;

  currentDay.innerHTML = gettheDay(weatherinfo.dt);
}



function convertTime(timestamp){
  let date = new Date(timestamp * 1000);

  let hrs = date.getHours();
  let mins = date.getMinutes();

  hrs = (hrs <= 9) ? '0' + hrs : hrs;
  mins = (mins <= 9) ? '0' + mins : mins;

  let time = `${hrs}:${mins}`;

  return time;
}

function gettheDay(dt){
  let date = new Date(dt * 1000);

  let day = date.getDay();

  switch (day) {
    case 0:
      return 'Sun'
      break;
    case 1:
      return 'Mon'
      break;
    case 2:
      return 'Tue'
      break;
    case 3:
      return 'Wed'
      break;
    case 4:
      return 'Thurs'
      break;
    case 5:
      return 'Fri'
      break;
    case 6:
      return 'Sat'
      break;
  }
}



//Getting Air Quality Data...
function fetchAQI(aqiLink) {
  fetch(aqiLink)
    .then((response) => response.json())
    .then((aqiData) => {
      updateAQI(aqiData)
    });
}
//Updating Air Quality Data...
function updateAQI(aqiData) {
  if (aqiData.list[0].main.aqi == 1) {
    document.getElementById("aqi-status-range").classList.remove('fair', 'moderate', 'poor', 'very-poor');
    document.getElementById("aqi-status-range").classList.add("good");
    document.querySelector('.aqi-code').innerHTML = 'Good';
  } else if (aqiData.list[0].main.aqi == 2) {
    document
      .getElementById("aqi-status-range")
      .classList.remove("good", "moderate", "poor", "very-poor");
    document.getElementById("aqi-status-range").classList.add("fair");
    document.querySelector(".aqi-code").innerHTML = "Fair";
  } else if (aqiData.list[0].main.aqi == 3) {
    document
      .getElementById("aqi-status-range")
      .classList.remove("fair", "good", "poor", "very-poor");
    document.getElementById("aqi-status-range").classList.add("moderate");
    document.querySelector(".aqi-code").innerHTML = "Moderate";
  } else if (aqiData.list[0].main.aqi == 4) {
    document
      .getElementById("aqi-status-range")
      .classList.remove("fair", "moderate", "good", "very-poor");
    document.getElementById("aqi-status-range").classList.add("poor");
    document.querySelector(".aqi-code").innerHTML = "Poor";
  } else if (aqiData.list[0].main.aqi == 5) {
    document
      .getElementById("aqi-status-range")
      .classList.remove("fair", "moderate", "poor", "good");
    document.getElementById("aqi-status-range").classList.add("very-poor");
    document.querySelector(".aqi-code").innerHTML = "Very Poor";
  }
}



//Getting ForeCast Data...
function fetchForecast(forecastAPI){
  fetch(forecastAPI).then(reponse => reponse.json())
  .then(data => {updateForecast(data)});
};
//Updating ForeCast Data...
function updateForecast(foreData){
  after.innerHTML = Math.round(foreData.list[0].main.temp) + "°C";
  afterDesc.innerHTML = foreData.list[0].weather[0].description;
  afterIcon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[0].weather[0].icon}.png`);

  even.innerHTML = Math.round(foreData.list[1].main.temp) + "°C";
  evenDesc.innerHTML = foreData.list[1].weather[0].description;
  evenIcon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[1].weather[0].icon}.png`);

  night.innerHTML = Math.round(foreData.list[2].main.temp) + "°C";
  nightDesc.innerHTML = foreData.list[2].weather[0].description;
  nightIcon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[2].weather[0].icon}.png`);

  riseTime.innerHTML = convertTime(foreData.city.sunrise);
  setTime.innerHTML = convertTime(foreData.city.sunset);


  function checkDay(date) {
    let datee = new Date(date * 1000);

    let day = datee.getDay();

    for(let i = 0; i < Days.length; i++){
      let dayWord
      if(day >= 0 && day <= 5){
        day++;
      }else{
        day = 0;
      }
      switch (day) {
        case 0:
          dayWord = "Sun";
          break;
        case 1:
          dayWord = "Mon";
          break;
        case 2:
          dayWord = "Tue";
          break;
        case 3:
          dayWord = "Wed";
          break;
        case 4:
          dayWord = "Thurs";
          break;
        case 5:
          dayWord = "Fri";
          break;
        case 6:
          dayWord = "Sat";
          break;
      }
      Days[i].innerHTML = dayWord;
    };
  }
  checkDay(foreData.list[1].dt);


  day1Temp.innerHTML = Math.round(foreData.list[9].main.temp) + "°C";
  tomorrowTemp.innerHTML = Math.round(foreData.list[9].main.temp) + "°C";
  day1Icon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[9].weather[0].icon}.png`);
  day1Desc.innerHTML = foreData.list[9].weather[0].description;

  day2Temp.innerHTML = Math.round(foreData.list[17].main.temp) + "°C";
  day2Icon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[17].weather[0].icon}.png`);
  day2Desc.innerHTML = foreData.list[17].weather[0].description;

  day3Temp.innerHTML = Math.round(foreData.list[25].main.temp) + "°C";
  day3Icon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[26].weather[0].icon}.png`);
  day3Desc.innerHTML = foreData.list[25].weather[0].description;

  day4Temp.innerHTML = Math.round(foreData.list[33].main.temp) + "°C";
  day4Icon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[33].weather[0].icon}.png`);
  day4Desc.innerHTML = foreData.list[33].weather[0].description;

  day5Temp.innerHTML = Math.round(foreData.list[39].main.temp) + "°C";
  day5Icon.setAttribute("src", `https://openweathermap.org/img/wn/${foreData.list[39].weather[0].icon}.png`);
  day5Desc.innerHTML = foreData.list[39].weather[0].description;
};