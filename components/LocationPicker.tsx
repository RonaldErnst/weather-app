import React, { useEffect, useState } from "react";
import { useLocation } from "../contexts/LocationContext";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import MapPicker from "react-google-map-picker";

export default function LocationPicker() {
	const { location, setLocation } = useLocation();
  const [defaultLocation, setDefaultLocation] = useState(location);
	const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  }, []);

	function openLocationPicker() {
		setShowModal(true);
	}

	function closeLocationPicker() {
		setShowModal(false);
	}

	function handleChangeLocation(lat: any, lng: any) {
		setLocation({ lat: lat, lng: lng });
	}

	return (
		<>
			<span className="block text-white" onClick={openLocationPicker}>
				<LocationMarkerIcon className="w-8 h-8 inline-block mr-2"/>
				{`${location.lat}, ${location.lng}`}
					{/* <MapPicker
						apiKey="AIzaSyBBZ-EL1GINm8gOU6R-ndFca9yY6_Q1l_s"
            style={{height: "100%"}}
            onChangeLocation={handleChangeLocation} 
						defaultLocation={defaultLocation}
					/> */}
			</span>
		</>
	);
}
