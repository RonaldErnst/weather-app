import React from 'react';
import { unitTypes, useUnits } from '../contexts/UnitContext';
import { useWeather } from '../contexts/WeatherContext';
import { roundToDecimal, getWindDirection } from '../utils';

import { ReactComponent as Rain} from '../assets/rain.svg';
import { ReactComponent as Wind} from '../assets/wind.svg';

import WeatherIcon from "../utils/WeatherIcon";

export default function CurrentWeather() {
  const { weatherData } = useWeather();
  const { units } = useUnits();

  if(!weatherData)
    return null;

  const currentWeather = weatherData.current;
  const todayWeather = weatherData.daily[0];

  return (
    <div className='px-8 pb-4 w-1/3 bg-gradient-to-t from-white/30 to-transparent rounded-3xl relative'>
    <WeatherIcon icon={currentWeather.weather[0].icon} className="absolute -top-24 right-6 w-40 h-40 -z-10" fill="white"/>
      <div className='flex flex-col items-center justify-center  drop-shadow-3xl'>
        <div className='flex flex-col items-center gap-2 relative -top-8'>
          <div className='text-6xl '>{roundToDecimal(currentWeather.temp)}{units === unitTypes.METRIC? "°C" : "°F"}</div>
          <div className='text-3xl'>{currentWeather.weather[0].main}</div> 
        </div>
        <div className="w-full flex flex-row justify-between items-center relative -top-4 text-xl">
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Wind className="w-10 h-10 inline-block" fill="white"/>
              {roundToDecimal(currentWeather.wind_speed)}{units === unitTypes.METRIC? "m/s" : "m/h"} {getWindDirection(currentWeather.wind_deg)}
            </div>
            <div className='flex items-center gap-2'>
              <Rain className="w-10 h-10 inline-block" fill="white"/>
              {todayWeather.pop * 100}%
            </div>
          </div>
          <div className='flex flex-col gap-1 items-center'>
            <div>
              High: {roundToDecimal(todayWeather.temp.max)}{units === unitTypes.METRIC? "°C" : "°F"}
            </div>
            <div>
              Low: {roundToDecimal(todayWeather.temp.min)}{units === unitTypes.METRIC? "°C" : "°F"}
            </div>
            <div>
              Humidity: {currentWeather.humidity}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
