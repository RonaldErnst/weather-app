import React, { useState, useEffect, useContext, FC } from "react";
import Geocode from "react-geocode";

const LocationContext = React.createContext<any>(null);

export function useLocation() {
	return useContext(LocationContext);
}

async function getGeoData(lat: number, lon: number) {
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

export type LocationType = { lat: number; lon: number; geoData: any };
let defaultLocation: LocationType = {
	lat: 28.67,
	lon: 77.22,
	geoData: null,
};

function getCurrentPosition(): Promise<GeolocationPosition | null> {
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
				lat: response.coords.latitude as number,
				lon: response.coords.longitude as number,
				geoData,
			};
		}
	}

	return location;
}

export const LocationProvider: FC = ({ children }) => {
	const [location, setLocation] = useState(defaultLocation);

	useEffect(() => {
		// Get inital Location
		async function getInitialLocation() {
			const location = (await getDefaultLocation()) as LocationType;
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
