import React, { useState, useContext, useEffect, FC } from 'react';
import { openweathermap } from '../apiKeys';


const resetIntevalTime = 30 * 1000; // Fetch Weather Data every 30 secs

const WeatherContext = React.createContext<any>(null);

export const unitTypes = {
    METRIC: "metric",
    IMPERIAL: "imperial"
};

export function useWeather() {
    return useContext(WeatherContext);
}

type LocationType = {lat: number, lon: number};

function getCurrentPosition() : Promise<GeolocationPosition | null> {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    } else {
      return new Promise(
        resolve => resolve(null)
      );
    }
  }

async function getDefaultLocation() {
    let location: LocationType = {
        lat: 28.67,
        lon: 77.22
    }; // Default Location London

    if (navigator.geolocation) {
        const response = await getCurrentPosition();
        if(response !== null)
            location = {
                lat: response.coords.latitude as number,
                lon: response.coords.longitude as number
            };
    }

    return location;
}

export const WeatherProvider: FC = ({children}) => {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState({lat: 28.67, lon: 77.22});
    const [tempUnit, setTempUnit] = useState(unitTypes.METRIC);

    useEffect(() => {
        // Location changed
        async function getWeather({lat, lon} : LocationType) {
            const api_call = await fetch(
                `${openweathermap.url}onecall?lat=${lat}&lon=${lon}&appid=${openweathermap.key}`
            );
            const data = await api_call.json();
            setWeatherData(data);
        };

        getWeather(location);

        // If location changed, also change update timer
        const refreshInterval = setInterval(async () => {
            getWeather(location);
        }, resetIntevalTime);

        return () => {
            clearInterval(refreshInterval);
        }
    }, [location]);

    useEffect(() => {
        // Get inital Location
        async function getInitialLocation() {
            const location = await getDefaultLocation() as LocationType;
            setLocation(location);
        };

        getInitialLocation();
    }, []);


    return (
        <WeatherContext.Provider value={{
            location,
            weatherData,
            tempUnit,
            setLocation,
            setTempUnit
        }}>
            {children}
        </WeatherContext.Provider>
    )
}