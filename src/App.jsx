import Search from "./component/search";
import './App.css';

import CurrentWeather from "./component/current weather/current-weather";
import {WEATHER_API_URL,WEATHER_API_KEY} from "./api";
import { useState } from "react";
import Forecast from "./component/Forecast/forecast";


function App (){
  const [currentWeather,setcurrentWeather]=useState(null);
  const [forecast,setForecast]=useState(null);
  const handleOnSearchChange = (searchData )=>{
    
    const [lat,lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const currentForecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch,currentForecastFetch])
    .then (async(response) => {
        const weatherResponse=await response[0].json();
        const forecastResponse=await response[1].json();
        
        setcurrentWeather({city:searchData.label , ...weatherResponse});
        setForecast({city:searchData.label , ...forecastResponse});

    })  
    .catch((err)=>(console.log(err)));


  }
  console.log(currentWeather);
  console.log(forecast);

 
return (
  <div className="container ">
    
    <Search onSearchChange={handleOnSearchChange}></Search>
    {currentWeather &&  <CurrentWeather data={currentWeather}></CurrentWeather>}
    {forecast && <Forecast data={forecast}></Forecast>}
   n
  </div>
);


}

export default App;