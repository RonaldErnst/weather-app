import React from 'react';
import SingleForecast from '../components/SingleForecast';
import { useWeather } from "../contexts/WeatherContext";

export default function Forecasts() {
  const { weatherData } = useWeather();

  if(!weatherData)
    return null;

  const dailyForecasts = weatherData.daily;

  return (
    <div className="flex flex-row justify-center items-center gap-2 w-full p-12">
      {
        dailyForecasts.map(forecast => <SingleForecast key={forecast.dt} forecast={forecast}/>)
      }
    </div>
  )
}
