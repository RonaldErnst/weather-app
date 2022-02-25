import { LocationProvider } from './LocationContext';
import { UnitProvider } from './UnitContext';
import { WeatherProvider } from './WeatherContext';
import { combineComponents } from '../utils/combineComponents';

const providers = [
  LocationProvider,
  UnitProvider,
  WeatherProvider,
];

export const AppContextProvider = combineComponents(...providers);