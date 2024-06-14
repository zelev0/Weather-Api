import React, { useState } from 'react';
import './styles/weatherInfo.css';

const WeatherInfo = ({weather, temp}) => {

  const [isCel, setIsCel] = useState(true);

  const handleTemp = () => {
    setIsCel(!isCel);
  }


  return (
    <div className='weatherinfo'>
        <h1 className='weatherinfo-title'>weather api</h1>
        <h2 className='weatherinfo-city'>{weather?.name} {weather?.sys.country}</h2>
        <section className='weatherinfo-body'>
          <figure className='weatherinfo-img'>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="Clima img" />
          </figure>
          <article className='weatherinfo-Info'>
            <h3 className='weatherinfo-description'>"{weather?.weather[0].description}"</h3>
            <ul className='weatherinfo-list'>
              <li className='weatherinfo-item'><span>Wind Speed</span><span>{weather?.wind.speed} m/s</span></li>
              <li className='weatherinfo-item'><span>Clouds</span><span>{weather?.clouds.all} %</span></li>
              <li className='weatherinfo-item'><span>Pressure</span><span>{weather?.main.pressure} hPa</span></li>
            </ul>
          </article>
        </section>
        <h2 className='weatherinfo-temp'>
          {
           isCel ? 
           temp?.celsius + ' °C'
           : 
           temp?.fahrenheit + ' °F'
          }
        </h2>
        <button className='weatherinfo-btn' onClick={handleTemp}>
          Change to {isCel ? '°F' : '°C'}
        </button>
    </div>
  )
}

export default WeatherInfo