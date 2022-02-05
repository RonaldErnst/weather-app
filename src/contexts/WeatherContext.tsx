import React, { useState, useContext, useEffect, FC } from "react";
import { openweathermap } from "../apiKeys";
import { LocationType, useLocation } from "./LocationContext";
import { getDefaultLang, useUnits } from "./UnitContext";

const resetIntevalTime = 30 * 1000; // Fetch Weather Data every 30 secs

const WeatherContext = React.createContext<any>(null);

export const unitTypes = {
	METRIC: "metric",
	IMPERIAL: "imperial",
};

export function useWeather() {
	return useContext(WeatherContext);
}

export const WeatherProvider: FC = ({ children }) => {
	const { location } = useLocation();
	const { units } = useUnits();
	const [weatherData, setWeatherData] = useState({});

	useEffect(() => {
		// Location changed
		async function getWeather({ lat, lon } : LocationType) {
			const api_call = await fetch(
				`${openweathermap.url}onecall?lat=${lat}&lon=${lon}&lang=${getDefaultLang()}&units=${units}exclude=minutely,hourly,alerts&appid=${openweathermap.key}`
			);
			const data = await api_call.json();
			setWeatherData(data);
		}

		getWeather(location);
		// If location changed, also change update timer
		const refreshInterval = setInterval(async () => {
			getWeather(location);
		}, resetIntevalTime);

		return () => {
			clearInterval(refreshInterval);
		};
	}, [location, units]);

	return (
		<WeatherContext.Provider
			value={{
				weatherData
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};
