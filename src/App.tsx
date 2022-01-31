import React from 'react';
import { useWeather } from './contexts/WeatherContext';

function App() {
  const { weatherData } = useWeather();

  return (
    <div>
        {JSON.stringify(weatherData)}
    </div>
  );
}

export default App;
