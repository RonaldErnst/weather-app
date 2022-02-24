import React, { useEffect, useState } from "react";
import { useLocation } from "../contexts/LocationContext";
import { GeoAltFill } from "react-bootstrap-icons";
import Modal from "react-modal";
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

	function handleChangeLocation(lat, lng) {
		setLocation({ lat: lat, lng: lng });
	}

	return (
		<>
			<span className="text-white flex flex-row justify-center items-center" onClick={openLocationPicker}>
				<GeoAltFill className="w-6 h-6 inline-block mr-2"/>
				{`${location.lat}, ${location.lng}`}
					{/* <MapPicker
						apiKey="AIzaSyBBZ-EL1GINm8gOU6R-ndFca9yY6_Q1l_s"
            style={{height: "100%"}}
            onChangeLocation={handleChangeLocation} 
						defaultLocation={defaultLocation}
					/> */}
			</span>

			<Modal className="">

			</Modal>
		</>
	);
}
