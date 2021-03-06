import React, { useState, useEffect } from "react";
import LocationPicker from "../components/LocationPicker";
import UnitSystemPicker from "../components/UnitSystemPicker";
import { getDefaultLang } from "../contexts/UnitContext";

export default function Header() {
	const [language, setLanguage] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		setLanguage(getDefaultLang());

		// const interval = setInterval(() => {
		// 	setCurrentTime(new Date());
		// }, 1000);

		return () => {
			// clearInterval(interval);
		};
	}, []);

	if(!language)
		return null;
		
	return (
		<div className="w-full flex justify-between px-6 py-4 text-xl drop-shadow-3xl">
			<div>
				<span className="block p-2 rounded-full">
          {new Intl.DateTimeFormat(language, { dateStyle: 'full' }).format(currentTime)}
        </span>
				<span className="block p-2 rounded-full">
					{new Intl.DateTimeFormat(language, {hour: "2-digit", minute: "2-digit"}).format(currentTime)}
				</span>
			</div>

			<div>
				<LocationPicker />
				<UnitSystemPicker />
			</div>
		</div>
	);
}
