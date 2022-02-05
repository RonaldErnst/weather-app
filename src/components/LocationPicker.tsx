import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { useLocation } from 'contexts/LocationContext';
import { google } from 'apiKeys';
import { getDefaultLang } from 'contexts/UnitContext';

export default function LocationPicker() {
  const { location, setLocation }  = useLocation();
  const language = getDefaultLang();
  const [ geoData, setGeoData ] = useState(null);

  useEffect(() => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(google.key);
    Geocode.setLanguage(language);
  }, [language]);

  return (<>
    <span className="block text-white">
      {}
    </span>
  </>);
}
