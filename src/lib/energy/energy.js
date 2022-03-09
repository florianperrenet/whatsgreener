/*

https://www.researchgate.net/publication/242403387_Life_Cycle_Assessment_of_Fossil_and_Biomass_Power_Generation_Chains
https://www.researchgate.net/publication/272130888_Final_report_on_technical_data_costs_and_life_cycle_inventories_of_advanced_fossil_power_generation_systems

*/

import { dec, timePerKm, convert_and_add_emit_score, travelTimeHours, travelTimeHoursReadable, toval, addConsumesEmits, multiply_dict_tovals } from "$lib/utils";


// TODO random values..
export const energy_source_efficiency = {
  // https://geospatial.blogs.com/geospatial/2010/01/energy-efficiency-of-fossil-fuel-power-generation.html#:~:text=The%20average%20efficiencies%20of%20power,up%20the%20stack%22%20as%20heat.
  oil: dec("38"),

  // Life_Cycle_Assessment_of_Fossil_and_Biomass_Power_
  // 19/74
  coal: dec("43"), // 46<->40
  lignite: dec("40"),
  natural_gas: dec("59"),

  // https://en.wikipedia.org/wiki/Solar_cell_efficiency
  solar: dec("25"), // 47.1<->12.6
};


export const energy_source_proven_reserves = {
  oil: 244.4,  // thousand million tonnes
  gas: 188.1,  // trillion cubic meters
  coal: 1074108,  // million tonnes
  cobalt: 6902,  // thousand tonnes
  lithium: 18955,  // thousand tonnes
  uranium: 16,  // million metric tonnes https://www.scientificamerican.com/article/how-long-will-global-uranium-deposits-last/
};


const hard_coal = (() => {
  const data = {
    in: {
      "coal_hard_unspecified_in_ground": {
        name: "coal_hard_unspecified_in_ground",
        amount: toval("coal_hard_unspecified_in_ground", dec("4.02E-01"), null, 2, 'kg', 'solid', null),
        value: {
          coal_hard_unspecified_in_ground: toval("coal_hard_unspecified_in_ground", dec("4.02E-01"), null, 2, 'kg', 'solid', null),
        },
      },
    },
    out: {
      something: {
        name: "something",
        amount: "something",
        value: {
          "arsenic": toval("arsenic", dec("1.11E-09"), null, 2, 'kg', 'gas', null),
          "cadmium": toval("cadmium", dec("4.45E-10"), null, 2, 'kg', 'gas', null),
          "carbon_dioxide": toval("carbon_dioxide", dec("7.83E-01"), null, 2, 'kg', 'gas', null),
          "chromium_vi": toval("chromium_vi", dec("9.98E-11"), null, 2, 'kg', 'gas', null),
          "dinitrogen_monoxide": toval("dinitrogen_monoxide", dec("3.27E-05"), null, 2, 'kg', 'gas', null),
          "formaldehyde": toval("formaldehyde", dec("2.87E-08"), null, 2, 'kg', 'gas', null),
          "lead": toval("lead", dec("3.88E-09"), null, 2, 'kg', 'gas', null),
          "methane": toval("methane", dec("2.22E-03"), null, 2, 'kg', 'gas', null),
          "nickel": toval("nickel", dec("1.09E-08"), null, 2, 'kg', 'gas', null),
          "nitrogen_oxides": toval("nitrogen_oxides", dec("5.11E-04"), null, 2, 'kg', 'gas', null),
          "nmvoc": toval("nmvoc", dec("6.46E-05"), null, 2, 'kg', 'gas', null),
          "sulfur_dioxide": toval("sulfur_dioxide", dec("3.01E-04"), null, 2, 'kg', 'gas', null),
          "PM2.5": toval("PM2.5", dec("1.76E-05"), null, 2, 'kg', 'gas', null),
          "PM2.5-10": toval("PM2.5-10", dec("1.79E-05"), null, 2, 'kg', 'gas', null),
        },
      },
    },
  };
  addConsumesEmits(data);
  return data;
})();

const lignite_coal = (() => {
  const data = {
    in: {
      "coal_brown_in_ground": {
        name: "coal_brown_in_ground",
        amount: toval("coal_brown_in_ground", dec("9.50E-01"), null, 2, 'kg', 'solid', null),
        value: {
          coal_brown_in_ground: toval("coal_brown_in_ground", dec("9.50E-01"), null, 2, 'kg', 'solid', null),
        },
      },
    },
    out: {
      something: {
        name: "something",
        amount: "something",
        value: {
          "arsenic": toval("arsenic", dec("9.03E-09"), null, 2, 'kg', 'gas', null),
          "cadmium": toval("cadmium", dec("1.29E-9"), null, 2, 'kg', 'gas', null),
          "carbon_dioxide": toval("carbon_dioxide", dec("9.21E-01"), null, 2, 'kg', 'gas', null),
          "chromium_vi": toval("chromium_vi", dec("7.45E-10"), null, 2, 'kg', 'gas', null),
          "dinitrogen_monoxide": toval("dinitrogen_monoxide", dec("2.20E-05"), null, 2, 'kg', 'gas', null),
          "formaldehyde": toval("formaldehyde", dec("5.22E-07"), null, 2, 'kg', 'gas', null),
          "lead": toval("lead", dec("1.19E-05"), null, 2, 'kg', 'gas', null),
          "methane": toval("methane", dec("2.48E-04"), null, 2, 'kg', 'gas', null),
          "nickel": toval("nickel", dec("1.98E-08"), null, 2, 'kg', 'gas', null),
          "nitrogen_oxides": toval("nitrogen_oxides", dec("7.38E-04"), null, 2, 'kg', 'gas', null),
          "nmvoc": toval("nmvoc", dec("2.17E-05"), null, 2, 'kg', 'gas', null),
          "sulfur_dioxide": toval("sulfur_dioxide", dec("1.69E-04"), null, 2, 'kg', 'gas', null),
          "PM2.5": toval("PM2.5", dec("6.47E-05"), null, 2, 'kg', 'gas', null),
          "PM2.5-10": toval("PM2.5-10", dec("1.14E-05"), null, 2, 'kg', 'gas', null),
        },
      },
    },
  };
  addConsumesEmits(data);
  return data;
})();

const natural_gas = (() => {
  const data = {
    in: {
      "gas_natural_in_ground": {
        name: "gas_natural_in_ground",
        amount: toval("gas_natural_in_ground", dec("2.67E-01"), null, 2, 'Nm3', 'gas', null),
        value: {
          gas_natural_in_ground: toval("gas_natural_in_ground", dec("2.67E-01"), null, 2, 'Nm3', 'gas', null),
        },
      },
    },
    out: {
      something: {
        name: "something",
        amount: "something",
        value: {
          "arsenic": toval("arsenic", dec("3.89E-09"), null, 2, 'kg', 'gas', null),
          "cadmium": toval("cadmium", dec("1.42E-09"), null, 2, 'kg', 'gas', null),
          "carbon_dioxide": toval("carbon_dioxide", dec("5.50E-01"), null, 2, 'kg', 'gas', null),
          "chromium_vi": toval("chromium_vi", dec("1.24E-10"), null, 2, 'kg', 'gas', null),
          "dinitrogen_monoxide": toval("dinitrogen_monoxide", dec("4.42E-05"), null, 2, 'kg', 'gas', null),
          "formaldehyde": toval("formaldehyde", dec("2.15E-08"), null, 2, 'kg', 'gas', null),
          "lead": toval("lead", dec("3.24E-07"), null, 2, 'kg', 'gas', null),
          "methane": toval("methane", dec("3.25E-03"), null, 2, 'kg', 'gas', null),
          "nickel": toval("nickel", dec("1.15E-08"), null, 2, 'kg', 'gas', null),
          "nitrogen_oxides": toval("nitrogen_oxides", dec("8.23E-04"), null, 2, 'kg', 'gas', null),
          "nmvoc": toval("nmvoc", dec("2.64E-04"), null, 2, 'kg', 'gas', null),
          "sulfur_dioxide": toval("sulfur_dioxide", dec("2.52E-04"), null, 2, 'kg', 'gas', null),
          "PM2.5": toval("PM2.5", dec("8.26E-06"), null, 2, 'kg', 'gas', null),
          "PM2.5-10": toval("PM2.5-10", dec("7.04E-06"), null, 2, 'kg', 'gas', null),
        },
      },
    },
  };
  addConsumesEmits(data);
  return data;
})();

export function energy_footprint_per_kwh() {
  const data = {
    natural_gas: {
      name: "natural_gas",
      footprint: {
        something: {
          name: "something",
          activity: "something",
          ...natural_gas,
        },
      },
    },
    coal: {
      name: "hard_coal",
      footprint: {
        something: {
          name: "something",
          activity: "something",
          ...hard_coal,
        },
      },
    },
  };


  convert_and_add_emit_score(data);

  return data;
}
