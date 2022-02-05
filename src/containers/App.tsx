import React, { useState, useEffect } from 'react';
import Header from './Header';

const bgMax = 800;
const bgMin = 400;
const refreshInterval = 60 * 1000;


function App() {
  function getBackgroundColor() {
    const d = new Date();
    // Shift hours by 12 so 0 is at noon and 1 at midnight
    const percentage = (Math.abs(d.getHours() - 12) * 60 + d.getMinutes())/1440;
    let value = (bgMax - bgMin) * percentage + bgMin;
    value = Math.round(value / 100);

    switch(value) {
      case 400:
        return "from-blue-400";
      case 500:
        return "from-blue-500";
      case 600:
        return "from-blue-600";
      case 700:
        return "from-blue-700";
      case 800:
        return "from-blue-800";
      default: 
        return "from-blue-600";
    }
  }

  const [bgColor, setBgColor] = useState(getBackgroundColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(getBackgroundColor());
    }, refreshInterval);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className={`w-screen h-screen bg-gradient-to-b ${bgColor} to-white`}>
      <Header />
    </div>
  );
}

export default App;
