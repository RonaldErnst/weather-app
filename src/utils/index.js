export function roundToDecimal(value, decimal = 1) {
  return Math.round((value + Number.EPSILON) * 10**decimal) / 10**decimal;
}

export function getWindDirection(wind_deg) {
  const compassSector = ["North", "NNE", "NE", "ENE", "East", "ESE", "SE", "SSE", "South", "SSW", "SW", "WSW", "West", "WNW", "NW", "NNW", "North"];
  const windDirection = compassSector[Math.floor(wind_deg / 22.5 + 0.5) % 16];
  return windDirection;
}