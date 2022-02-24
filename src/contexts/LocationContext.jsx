import React, { useState, useEffect, useContext } from "react";
import Geocode from "react-geocode";

const LocationContext = React.createContext(null);

export function useLocation() {
	return useContext(LocationContext);
}

async function getGeoData(lat, lon) {
	try {
		const response = await Geocode.fromLatLng(
			lat.toString(),
			lon.toString()
		);
		console.log(response);

		return response;
	} catch (error) {
		return null;
	}
}

let defaultLocation = {
	lat: 28.67,
	lng: 77.22,
	geoData: null,
};

function getCurrentPosition() {
	if (navigator.geolocation) {
		return new Promise((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject)
		);
	} else {
		return new Promise((resolve) => resolve(null));
	}
}

async function getDefaultLocation() {
	let location = defaultLocation; // Default Location London

	if (navigator.geolocation) {
		const response = await getCurrentPosition();
		if (response !== null) {
			const geoData = await getGeoData(
				response.coords.latitude,
				response.coords.longitude
			);
			location = {
				lat: response.coords.latitude,
				lng: response.coords.longitude,
				geoData,
			};
		}
	}

	return location;
}

export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useState(defaultLocation);

	useEffect(() => {
		// Get inital Location
		async function getInitialLocation() {
			const location = (await getDefaultLocation());
			setLocation(location);
		}

		getInitialLocation();
	}, []);

	return (
		<LocationContext.Provider
			value={{
				location,
				setLocation,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
