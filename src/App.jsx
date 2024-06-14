import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import WeatherInfo from "./components/WeatherInfo";

const key = '577d0e3a4160c9ac114e9d5d32a20583';


function App() {

  const [weather, setWeather] = useState();

  const [coords, setCoords] = useState();

  const [temp, setTemp] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios.get(url)
        .then(res => {
          const kelvin = res.data.main.temp;
          const celsius = (kelvin - 273.15).toFixed(2);
          const fahrenheit = (celsius * 9/5 + 32).toFixed(2);
          setTemp({celsius: celsius, fahrenheit: fahrenheit});
          setWeather(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }
  }, [coords]);
  
  return (
    <div className="content">
      {
        isLoading ?
         <figure className="content-img">
           <img src="https://gifdb.com/images/high/animated-stars-loading-icon-38ccjfav8iijnqrb.gif" alt="LOADING..." />
         </figure>
         :
          <WeatherInfo
           weather = {weather}
           temp = {temp}
          />
      }
    </div>
  )
    
}

export default App
