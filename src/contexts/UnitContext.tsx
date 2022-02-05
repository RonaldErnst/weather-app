import React, { useState, useContext, FC } from "react";

const UnitContext = React.createContext<any>(null);

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

export const UnitProvider: FC = ({ children }) => {
  const isMetric = !["en-US", "my"].includes(getDefaultLang());
	const [units, setUnits] = useState(isMetric? unitTypes.METRIC : unitTypes.IMPERIAL);

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
