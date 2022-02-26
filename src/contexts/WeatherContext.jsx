import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "./LocationContext";
import { getDefaultLang, useUnits } from "./UnitContext";

const resetIntevalTime = 30 * 1000; // Fetch Weather Data every 30 secs

const {
	REACT_APP_OPENWEATHERMAP_KEY,
	REACT_APP_OPENWEATHERMAP_URL
} = process.env;

const WeatherContext = React.createContext(null);

export const unitTypes = {
	METRIC: "metric",
	IMPERIAL: "imperial",
};

export function useWeather() {
	return useContext(WeatherContext);
}

export const WeatherProvider = ({ children }) => {
	const { location } = useLocation();
	const { units } = useUnits();
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		// Location changed
		async function getWeather() {
			const api_call = await fetch(
				`${REACT_APP_OPENWEATHERMAP_URL}onecall?lat=${location.lat}&lon=${location.lng}&lang=${getDefaultLang()}&units=${units}&exclude=minutely,hourly,alerts&appid=${REACT_APP_OPENWEATHERMAP_KEY}`
			);
			const data = await api_call.json();
			setWeatherData(data);
		}

		getWeather();
		// If location changed, also change update timer
		const refreshInterval = setInterval(async () => {
			getWeather();
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
			{weatherData && children}
		</WeatherContext.Provider>
	);
};
