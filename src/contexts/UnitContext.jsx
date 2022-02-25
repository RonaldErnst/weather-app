import React, { useContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";

const UnitContext = React.createContext(null);

export const unitTypes = {
	METRIC: "metric",
	IMPERIAL: "imperial",
};

export function useUnits() {
	return useContext(UnitContext);
}

export function getDefaultLang() {
	if (navigator.languages !== undefined)
        return navigator.languages[0];
	return navigator.language;
}

function getDefaultUnit() {
	const isMetric = !["en-US", "my"].includes(getDefaultLang());
	return isMetric? unitTypes.METRIC : unitTypes.IMPERIAL;
}

export const UnitProvider = ({ children }) => {
	const [units, setUnits] = useLocalStorage("units", getDefaultUnit());

	return (
		<UnitContext.Provider
			value={{
				units,
				setUnits,
			}}
		>
			{children}
		</UnitContext.Provider>
	);
};
