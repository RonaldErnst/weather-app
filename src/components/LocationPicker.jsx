import React, { useEffect, useState } from "react";
import { useLocation } from "../contexts/LocationContext";
import { GeoAltFill } from "react-bootstrap-icons";
import Modal from "react-modal";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LocationPicker() {
	const { location } = useLocation();
	const [center, setCenter] = useState(null);
	const [isOpen, setShowOpen] = useState(false);

	useEffect(() => {
		setCenter(location);
	}, [location]);

	return (
		<>
			<span
				className="text-white flex flex-row justify-center items-center cursor-pointer rounded-full p-2 hover:bg-white/10"
				onClick={() => setShowOpen(true)}
			>
				<GeoAltFill className="w-6 h-6 inline-block mr-2" />
				{`${location.lat}, ${location.lng}`}
			</span>

			<Modal
				isOpen={isOpen}
				onDismiss={() => setShowOpen(false)}
				onRequestClose={() => setShowOpen(false)}
				overlayClassName="ReactModalOverlay"
				className="
					w-full md:w-9/12 h-full md:h-5/6 bg-white m-6 
					rounded-2xl border border-slate-300 
					shadow-md relative
					flex justify-center items-center
					p-4 focus:outline-none
					"
			>
				<MapContainer
					center={center}
					zoom={6}
					style={{ width: "100%", height: "100%" }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<CustomMarker />
				</MapContainer>
			</Modal>
		</>
	);
}

function CustomMarker() {
	const { location, setLocation } = useLocation();
	useMapEvents({
		click(e) {
			const newLocation = {
				lat: e.latlng.lat.toFixed(6),
				lng: e.latlng.lng.toFixed(6)
			};

			setLocation(newLocation);
		},
	});

	return (
		<Marker position={location} interactive={false}>
			<Popup>Get Weather from this location</Popup>
		</Marker>
	);
}
