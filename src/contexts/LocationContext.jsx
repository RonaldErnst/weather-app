import React, { useEffect, useContext } from "react";
import useLocalStorage from '../utils/useLocalStorage';

const LocationContext = React.createContext(null);

export function useLocation() {
	return useContext(LocationContext);
}

let defaultLocation = {
	lat: 28.67,
	lng: 77.22
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
			location = {
				lat: response.coords.latitude.toFixed(6),
				lng: response.coords.longitude.toFixed(6),
			};
		}
	}

	return location;
}

export const LocationProvider = ({ children }) => {
	const [location, setLocation] = useLocalStorage("location", null);

	useEffect(() => {
		// Get inital Location
		async function getInitialLocation() {
			console.log(location);
			if(location) // Location already set, return
				return;

			const defaultLocation = await getDefaultLocation();
			setLocation(defaultLocation);
		}

		getInitialLocation();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if(!location)
		return null;

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
