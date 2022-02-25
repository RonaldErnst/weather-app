import React from 'react';
import { useUnits, unitTypes } from '../contexts/UnitContext';
import ThermC from '../assets/thermometer-Celsius.svg';
import ThermF from '../assets/thermometer-Fahrenheit.svg';

export default function UnitSystemPicker() {
  const { units, setUnits } = useUnits();

  function handleClick() {
    setUnits((prevUnits: string) => {
      if(prevUnits === unitTypes.METRIC)
        return unitTypes.IMPERIAL;
      else
        return unitTypes.METRIC;
    });
  }

  return (<>
    <span onClick={handleClick} className="block text-white text-md float-right">
      {units === unitTypes.METRIC? <ThermC className="w-8 h-8" fill="white"/> : <ThermF className="w-8 h-8" fill="white"/>}
    </span>
  </>);
}
