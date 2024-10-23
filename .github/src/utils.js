export const formatPower = (watts) => {
  const absWatts = Math.abs(watts);
  return absWatts >= 1000 
    ? `${(absWatts/1000).toFixed(1)} kW` 
    : `${Math.round(absWatts)} W`;
};

export const formatEnergy = (kWh) => {
  return `${Number(kWh).toFixed(1)} kWh`;
};
