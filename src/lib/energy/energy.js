/*

https://www.researchgate.net/publication/242403387_Life_Cycle_Assessment_of_Fossil_and_Biomass_Power_Generation_Chains
https://www.researchgate.net/publication/272130888_Final_report_on_technical_data_costs_and_life_cycle_inventories_of_advanced_fossil_power_generation_systems

*/

import { dec, timePerKm, convert_and_add_emit_score, travelTimeHours, travelTimeHoursReadable, toval, addConsumesEmits, multiply_dict_tovals } from "$lib/utils";

// https://ourworldindata.org/energy-production-consumption
export const world_energy_consumption_twh_year = dec('160_000');


// TODO random values..
export const energy_source_efficiency = {
  // https://geospatial.blogs.com/geospatial/2010/01/energy-efficiency-of-fossil-fuel-power-generation.html#:~:text=The%20average%20efficiencies%20of%20power,up%20the%20stack%22%20as%20heat.
  oil: {
    a: dec("38"),
    maximum: '?',
  },

  // Life_Cycle_Assessment_of_Fossil_and_Biomass_Power_
  // 19/74
  coal: {
    a: dec("43"), // 46<->40
    maximum: '?',
  },
  lignite: {
    a: dec("40"),
    maximum: '?',
  },
  natural_gas: {
    a: dec("59"),
    maximum: '?',
  },

  // https://en.wikipedia.org/wiki/Solar_cell_efficiency
  solar: {
    a: dec("25"), // 47.1<->12.6
    maximum: dec('68.7'), // https://en.wikipedia.org/wiki/Shockley%E2%80%93Queisser_limit
  },
  wind: {
    a: dec("30"),
    maximum: dec('59'),
  },
};


export const energy_sources_lifespan = {
  oil: 0,
  coal: 0,
  lignite: 0,
  natural_gas: 0,
  solar: 20,
  wind: 20,
};

export const energy_sources_possible_lifespan = {
  oil: 50,
  coal: 100,
  lignite: 100,
  natural_gas: 50,
  solar: 80,
  wind: 80,
};


export const energy_source_proven_reserves = {
  oil: dec("244.4"),  // thousand million tonnes
  gas: dec("188.1"),  // trillion cubic meters
  coal: dec("1074108"),  // million tonnes
  cobalt: dec("6902"),  // thousand tonnes
  lithium: dec("18955"),  // thousand tonnes
  uranium: dec("16"),  // million metric tonnes https://www.scientificamerican.com/article/how-long-will-global-uranium-deposits-last/
  graphite: dec("349503"),  // thousand tonnes
};

export const energy_source_scarcity = (() => {
  const data = {
    oil: {
      proven_reserves: energy_source_proven_reserves.oil,
      unit: 'thousand million tonnes',
      used: dec('182241').div('1000'),
      use_rate: dec('4017.5').div('1000'),  // million tonnes
      regain_rate: '?',
      left: '?',
    },
    gas: {
      proven_reserves: energy_source_proven_reserves.gas,
      unit: 'trillion cubic meters',
      used: dec('118471').div(1000),
      use_rate: dec('3822.8').div('1000'),  // billion cubic meters
      regain_rate: '?',
      left: '?',
    },
    coal: {
      proven_reserves: energy_source_proven_reserves.coal,
      unit: 'million tonnes',
      used: dec('5705').times('1_000_000_000_000').div('29.3').div(1000_000_000),
      use_rate: dec('151.42').times('1_000_000_000_000').div('29.3').div(1000_000_000),  // exajoules
      regain_rate: '?',
      left: '?',
    },
    cobalt: {
      proven_reserves: energy_source_proven_reserves.cobalt,
      unit: 'thousand tonnes',
      used: '?',
      use_rate: dec('127.7'),
      regain_rate: '?',
      left: '?',
    },
    lithium: {
      proven_reserves: energy_source_proven_reserves.lithium,
      unit: 'thousand tonnes',
      used: '?',
      use_rate: dec('86.3'),
      regain_rate: '?',
      left: '?',
    },
    uranium: {
      proven_reserves: energy_source_proven_reserves.uranium,
      unit: 'million tonnes',
      used: '?',
      use_rate: dec('66500').div('1000000'),  // tonnes https://en.wikipedia.org/wiki/Peak_uranium
      regain_rate: '?',
      left: '?',
    },
    graphite: {
      proven_reserves: energy_source_proven_reserves.graphite,
      unit: 'thousand tonnes',
      used: '?',
      use_rate: dec('906.7'),
      regain_rate: '?',
      left: '?',
    },

    // https://pubs.usgs.gov/periodicals/mcs2020/mcs2020-silver.pdf
    // https://www.silverinstitute.org/silver-supply-demand/
    // https://www.usmoneyreserve.com/blog/how-much-silver-is-in-the-world/#:~:text=How%20Much%20Silver%20Is%20Left,Russia's%20(45%2C000%20metric%20tons).
    silver: {
      proven_reserves: dec('560_000'),  // tonnes
      unit: 'tonnes',
      used: dec('1_740_000'),
      use_rate: dec('27000'),
      regain_rate: '?',
      left: '?',
    },
    // https://lisbdnet.com/when-will-we-run-out-of-metal/
    gold: {
      proven_reserves: dec('54_000'),  // tonnes
      unit: 'tonnes',
      used: dec('190_000'),
      use_rate: dec('1800'),
      regain_rate: '?',
      left: '?',
    },

    // https://www.freeingenergy.com/do-we-have-enough-materials-to-make-the-solar-panels-needed-for-a-clean-energy-future/
    // https://en.wikipedia.org/wiki/Peak_copper
    copper: {
      proven_reserves: dec('2_000_000_000'),  // tonnes
      unit: 'tonnes',
      used: '?',
      use_rate: dec('20_000_000'),
      regain_rate: '?',
      left: '?',
    },

    // https://en.wikipedia.org/wiki/List_of_countries_by_silicon_production
    // https://www.usgs.gov/centers/national-minerals-information-center/silicon-statistics-and-information
    // https://pubs.usgs.gov/periodicals/mcs2021/mcs2021-silicon.pdf
    silicon: {
      proven_reserves: dec('0'),  // tonnes
      unit: 'tonnes',
      used: '?',
      use_rate: dec('0'),
      regain_rate: '?',
      left: '?',
    },

    // https://pubs.usgs.gov/periodicals/mcs2022/mcs2022.pdf
    // aluminum
    bauxite: {
      proven_reserves: dec('55_000_000_000'),  // tonnes
      unit: 'tonnes',
      used: '?',
      use_rate: dec('0'),
      regain_rate: '?',
      left: '?',
    },

    solar: {
      proven_reserves: dec('0'),
      unit: '? year',
      used: '?',
      use_rate: dec('0'),
      regain_rate: '?',
      left: '?',
    },
    wind: {
      proven_reserves: dec('0'),
      unit: '? year',
      used: '?',
      use_rate: dec('0'),
      regain_rate: '?',
      left: '?',
    },
  };

  for (const [key, value] of Object.entries(data)) {
    value.time_till_depletion = value.proven_reserves.div(value.use_rate);
    value.time_till_depletion_readable = value.time_till_depletion.toFixed(0);
  }

  return data;
})();

// total energy supply
export const energy_source_tes = (() => {

  const data = {
    oil: {
      proven_reserves: energy_source_proven_reserves.oil,
      unit: energy_source_scarcity.oil.unit,
    },
    gas: {
      proven_reserves: energy_source_proven_reserves.gas,
      unit: energy_source_scarcity.gas.unit,
    },
    coal: {
      proven_reserves: energy_source_proven_reserves.coal,
      unit: energy_source_scarcity.coal.unit,
    },
    "uranium*": {
      proven_reserves: energy_source_proven_reserves.uranium,
      unit: energy_source_scarcity.uranium.unit,
    },
    solar: {
      proven_reserves: 'xx',
      unit: '? year',
      twh: dec('0'),
    },
    wind: {
      proven_reserves: 'xx',
      unit: '? year',
      twh: dec('0'),
    },
  };

  // const oil_giga_joules = data.oil.proven_reserves.times(1000_000).times(1000).times('0.38');
  // const oil_gwh = oil_giga_joules.times('0.000277777778');
  // data.oil.twh = oil_gwh.div(1000);

  const oil_kwh = data.oil.proven_reserves.times(1000).times(1000_000).times(1000).times(11.63);
  const oil_twh = oil_kwh.times(0.000_000_001);
  data.oil.twh = oil_twh;

  const gas_kwh = data.gas.proven_reserves.times(1000_000_000_000).times('10.55');
  const gas_twh = gas_kwh.times('0.000_000_001')
  data.gas.twh = gas_twh;

  const coal_kwh = data.coal.proven_reserves.times(1000_000).times(1000).times(8);
  const coal_twh = coal_kwh.times('0.000_000_001')
  data.coal.twh = coal_twh;

  const uranium_kwh = data["uranium*"].proven_reserves.times(1000_000).times(1000).times(24_000_000).times(0.0077);
  const uranium_twh = uranium_kwh.times('0.000_000_001')
  data["uranium*"].twh = uranium_twh;

  let max = dec(0);
  for (const [key, value] of Object.entries(data)) {
    if (value.twh.gt(max)) {
      max = value.twh;
    }
  }
  for (const [key, value] of Object.entries(data)) {
    value.twh_rel = value.twh.div(max).times(100);
  }

  return data;
})();


export const resource_world_consumption = (() => {
  const data = {
    combined: dec("0"),
    values: {},
  };

  for (const [key, value] of Object.entries(energy_source_tes)) {
    data.values[key] = value.twh.div(world_energy_consumption_twh_year);
    data.combined = data.combined.add(value.twh);
  }

  data.combined = data.combined.div(world_energy_consumption_twh_year);

  console.log(data)

  return data;
})();


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
