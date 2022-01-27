const getYieldForPlant = (corn, environmentFactors) => {
  //return plant.yield;

  const environmentFactorSun = () => {
    if (environmentFactors.sun === "high") {
      return corn.yield * ((100 + corn.factor.sun.high) / 100);
    } else if (environmentFactors.sun === "medium") {
      return corn.yield * ((100 + corn.factor.sun.medium) / 100);
    } else if (environmentFactors.sun === "low") {
      return corn.yield * ((100 + corn.factor.sun.low) / 100);
    } /*sun no influence*/ else {
      return corn.yield;
    }
  };

  const environmentFactorWind = () => {
    const factorSun = environmentFactorSun();
    if (environmentFactors.wind === "strong") {
      return factorSun * ((100 + corn.factor.wind.strong) / 100);
    } else if (environmentFactors.wind === "medium") {
      return factorSun * ((100 + corn.factor.wind.medium) / 100);
    } else if (environmentFactors.wind === "little") {
      return factorSun * ((100 + corn.factor.wind.little) / 100);
    } /*wind no influence*/ else {
      return factorSun;
    }
  };

  const environmentFactorSoil = () => {
    const factorSunWind = environmentFactorWind();
    if (environmentFactors.soil === "best") {
      return factorSunWind * ((100 + corn.factor.soil.best) / 100);
    } else if (environmentFactors.soil === "medium") {
      return factorSunWind * ((100 + corn.factor.soil.medium) / 100);
    } else if (environmentFactors.soil === "poor") {
      return factorSunWind * ((100 + corn.factor.soil.poor) / 100);
    } /*soil no influence*/ else {
      return factorSunWind;
    }
  };

  return (YieldForPlantWithEnvironmentFactors = environmentFactorSoil());
};

// getYieldForPlant();
// console.log(YieldForPlantWithEnvironmentFactors);

const getYieldForCrop = (input, environmentFactors) => {
  //const yieldForCrop = input.crop.yield * input.numCrops;
  const yieldForCrop = getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
  return yieldForCrop;
};

const getTotalYield = ({crops}, environmentFactors) => {
  let yieldFPlant = crops.map(crop => getYieldForPlant(crop.crop, environmentFactors));
  //console.log("yieldFPlant "+ yieldFPlant); //  yieldFPlant 12.25,22.68 = ok
  let getNumCrops = crops.map(crops =>crops.numCrops);
  //console.log ("numcrops " + getNumCrops); //5,2 = ok

  var result = yieldFPlant.map((v,i) => v * getNumCrops[i]).reduce((x, y) => x + y, 0)
  return result;
  };


const getCostForCrop = (costsCrop) => {
  const costForCrop = costsCrop.crop.numCrops * costsCrop.sowingCost;
  return costForCrop;
};

// const getRevenueForCrop = (revenue) => {
//   const revenueForCrop = revenue.crop.numCrops * revenue.revenueACrop;
//   return revenueForCrop;
// };

const getRevenueForCrop = (revenue, environmentFactors) => {
  const revenueForCrop = getYieldForPlant(revenue.crop, environmentFactors) * revenue.crop.numCrops * revenue.revenueACrop;
  return revenueForCrop;
};

// const getProfitForCrop = (revenue) => {
//   const profitForCrop = revenue.revenueForCrop - revenue.crop.costForCrop;
//   return profitForCrop;
// };

const getProfitForCrop = (revenue, environmentFactors) => {
  const profitForCrop = revenue.crop.costForCrop * getRevenueForCrop(revenue, environmentFactors) - revenue.revenueForCrop;
  return profitForCrop;
};


// const getTotalProfit = (crops) => {
//   const allVegetables = crops.crops;
//   const sum = (accumulator, currentValue) => {
//     return (
//       accumulator + currentValue.revenueForCrop - currentValue.crop.costForCrop
//     );
//   };
//   return allVegetables.reduce(sum, 0);
// };

// const getTotalProfit = (crops, environmentFactors) => {
//   const allVegetables = crops.crops;
//   const sum = (accumulator, currentValue) => {
//     return (
//       accumulator +  getRevenueForCrop(crops, environmentFactors) - currentValue.crop.costForCrop
//     );
//   };
//   return allVegetables.reduce(sum, 0);
// };

const getTotalProfit = ({crops}, environmentFactors) => {
  let revenueFCrop = crops.map(crops => getRevenueForCrop(crops, environmentFactors));
  console.log ("revenueFCrop "+ revenueFCrop);
  let costfCrops = crops.map(crops =>crops.crop.costForCrop);
  console.log ("costfCrops "+ costfCrops);

  var result = revenueFCrop.map((v,i) => v - costfCrops[i]).reduce((x, y) => x + y, 0)
  return result;
  };


module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};

