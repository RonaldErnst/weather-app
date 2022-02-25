import React from 'react';
import { unitTypes, useUnits } from '../contexts/UnitContext';
import { useWeather } from '../contexts/WeatherContext';

export default function CurrentWeather() {
  const { weatherData } = useWeather();
  const currentWeather = weatherData.current;
  const { units } = useUnits();

  if(!currentWeather)
    return null;

  const description = currentWeather.weather[0].main;

  return (
    <div className='px-12 pb-4 w-1/4 bg-gradient-to-t from-white/40 to-transparent rounded-3xl'>
      <div className='flex flex-col items-center justify-center drop-shadow-3xl'>
        <div className='flex flex-col items-center gap-2 relative -top-8'>
          <div className='text-6xl '>{currentWeather.temp.toFixed(1)} {units === unitTypes.METRIC? "°C" : "°F"}</div>
          <div className='text-3xl'>{description}</div> 
        </div>
        <div className="w-full flex flex-row justify-between relative -top-4">
          <div>
            <div>
              {currentWeather.wind_speed}
            </div>
            <div>
              {currentWeather.wind_speed}
            </div>
          </div>
          <div>
            <div>
              {currentWeather.wind_speed}
            </div>
            <div>
              {currentWeather.wind_speed}
            </div>
            <div>
              {currentWeather.wind_speed}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
