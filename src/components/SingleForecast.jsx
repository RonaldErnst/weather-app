import React from "react";
import WeatherIcon from '../utils/WeatherIcon';
import { roundToDecimal } from '../utils';
import { useUnits, unitTypes } from "../contexts/UnitContext";
import moment from "moment";

import { ReactComponent as Rain} from '../assets/rain.svg';
import { ReactComponent as Wind} from '../assets/wind.svg';
import { ReactComponent as Sunset} from '../assets/sunset.svg';
import { ReactComponent as Sunrise} from '../assets/sunrise.svg';

export default function SingleForecast({ forecast }) {
  const { units } = useUnits();

  const sunriseDate = new Date(forecast.sunrise * 1000);
  const sunriseTime = sunriseDate.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const sunsetDate = new Date(forecast.sunset * 1000);
  const sunsetTime = sunsetDate.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

	console.log(forecast);

	return (
		<div className="
      w-full py-4 px-6
      bg-white shadow-3xl rounded-xl 
      flex flex-col gap-4
      justify-center items-center
      text-black text-sm
    "
    >
      <div className="text-xl">{moment(new Date(forecast.dt * 1000)).format("ddd, D MMM")}</div>
      <WeatherIcon icon={forecast.weather[0].icon} className="w-20 h-20" fill="black"/>
      <div className="w-full flex flex-row justify-between items-center">
        <div>
          High: {roundToDecimal(forecast.temp.max)}{units === unitTypes.METRIC? "°C" : "°F"}
        </div>
        <div>
          Low: {roundToDecimal(forecast.temp.min)}{units === unitTypes.METRIC? "°C" : "°F"}
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className='flex items-center gap-1'>
          <Wind className="w-6 h-6 inline-block" fill="black"/>
          {roundToDecimal(forecast.wind_speed)}{units === unitTypes.METRIC? "m/s" : "m/h"}
        </div>
        <div className='flex items-center gap-1'>
          <Rain className="w-6 h-6 inline-block" fill="black"/>
          {forecast.pop * 100}%
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <Sunset className="w-8 h-8 inline-block" fill="black"/>
          <div>
            {sunriseTime}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <Sunrise className="w-8 h-8 inline-block" fill="black"/>
          <div>
            {sunsetTime}
          </div>
        </div>
      </div>
    </div>
	);
}
