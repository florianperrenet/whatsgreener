/*

- producing and distributing the fuel used to power vehicle
- hydroflueorocarbon (HFC) emissions from leaking air conditioners.
- 
- extracting oil from the ground
- transporting it to a refinery
- refining the oil into gasoline
- transporting the gasoline to service stations


https://www.eia.gov/environment/emissions/archive/coefficients.php#tbl5


// The fuel consumption of a mid-size car increases by about 1% for every 25 kilograms of weight it carries.
// https://www.nrcan.gc.ca/energy-efficiency/transportation-alternative-fuels/personal-vehicles/fuel-efficient-driving-techniques/21038



oil to refinery
10.3g CO2eq/MJ

refinery gasoline
10.2g CO2eq/MJ

refinery diesel
5.4g CO2eq/MJ

transport to service station
1g CO2eq/MJ

Fuel gasoline
21.5g CO2eq/MJ
per litre 720g

Fuel diesel
16.7g CO2eq/MJ
per litre 640g

gasoline 1 MJ = 0.03 Liter
diesel 1 MJ = 0.026 Liter

*/

import { dec, timePerKm, travelTimeHours, travelTimeHoursReadable, toval, addConsumesEmits, multiply_dict_tovals } from "$lib/utils";


function pergallon_to_perliter(n) {
  return n.div(dec("3.78541178"));
}

function fuel_wtt_emissions(fuel_type) {
  const data = {
    extraction_and_transport_to_refinery: g_mj_to_g_l(dec("10.3"), fuel_type),
    refining: {
      gasoline: g_mj_to_g_l(dec("10.2"), fuel_type),
      diesel: g_mj_to_g_l(dec("5.4"), fuel_type),
    },
    transport_to_station: g_mj_to_g_l(dec("1"), fuel_type),
  };

  return {
    extraction_and_transport_to_refinery: data.extraction_and_transport_to_refinery.div(dec("1000")),
    refining: data.refining[fuel_type].div(dec("1000")),
    transport_to_station: data.transport_to_station.div(dec("1000")),
  };
}

function g_mj_to_g_l(g, fuel_type) {
  if (fuel_type === "gasoline") {
    return g.times(dec("1").div(dec("0.03")));
  } else if (fuel_type === "diesel") {
    return g.times(dec("1").div(dec("0.026")));
  }
}


const car_categories = {
  passenger_car: "Passenger car",
  lightduty_truck: "Light-Duty Truck",
  heavyduty_vehicle: "Heavy-Duty Vehicle",
  motorcycle: "Motorcycle",
  bus: "Bus",
};

const car_fuel_types = {
  gasoline: {
    name: "Gasoline",
    fuel_blend: "motor_gasoline",
    price_per_l: dec("2"),
    fuel_consumption: dec("0.1"),
  },
  diesel: {
    name: "Diesel",
    fuel_blend: "diesel",
    price_per_l: dec("2"),
    fuel_consumption: dec("0.066666"),
  },
  // methanol: {
  //   name: "Methanol",
  //   fuel_blend: "M85",
  //   price_per_l: dec("2"),
  //   fuel_consumption: dec("0.1"),
  // },
  // ethanol: {
  //   name: "Ethanol",
  //   fuel_blend: "E10",
  //   price_per_l: dec("2"),
  //   fuel_consumption: dec("0.1"),
  // },
  // cnc: {
  //   name: "CNC",
  //   fuel_blend: "E10",
  //   price_per_l: dec("2"),
  //   fuel_consumption: dec("0.1"),
  // },
  // lpg: {
  //   name: "LPG",
  //   fuel_blend: "E10",
  //   price_per_l: dec("2"),
  //   fuel_consumption: dec("0.1"),
  // },
  // lng: {
  //   name: "LNG",
  //   fuel_blend: "E10",
  //   price_per_l: dec("2"),
  //   fuel_consumption: dec("0.1"),
  // },
};

// carbon emissions
const car_fuel_carbon_emissions = {
  diesel: pergallon_to_perliter(dec("10.15")),
  motor_gasoline: pergallon_to_perliter(dec("8.91")),
  E100: pergallon_to_perliter(dec("0")),
  E85: pergallon_to_perliter(dec("1.34")),
  E10: pergallon_to_perliter(dec("8.02")),
  M100: pergallon_to_perliter(dec("4.11")),
  M85: pergallon_to_perliter(dec("4.83")),
};

// nitrous_oxide and methane emissions
const car_fuel_other_emissions = {
  gasoline: {
    passenger_cars: {
      "2004_later": {
        tier: "EPA Tier 2",
        nitrous_oxide: dec("0.0022"),
        methane: dec("0.0108"),
      },
      "2000_2003": {
        tier: "Low Emission Vehicles",
        nitrous_oxide: dec("0.0093"),
        methane: dec("0.0065"),
      },
      "1995_1999": {
        tier: "EPA Tier 1",
        nitrous_oxide: dec("0.0267"),
        methane: dec("0.0168"),
      },
      "1981_1994": {
        tier: "EPA Tier 0",
        nitrous_oxide: dec("0.0402"),
        methane: dec("0.0437"),
      },
      "1975_1980": {
        tier: "Oxidation Catalyst",
        nitrous_oxide: dec("0.0313"),
        methane: dec("0.0842"),
      },
      "1973_1974": {
        tier: "Non-Catalyst",
        nitrous_oxide: dec("0.0122"),
        methane: dec("0.1054"),
      },
      "1972_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.0122"),
        methane: dec("0.1106"),
      },
    },
    lightduty_trucks: {
      "2005_later": {
        tier: "EPA Tier 2",
        nitrous_oxide: dec("0.0041"),
        methane: dec("0.0101"),
      },
      "2001_2004": {
        tier: "Low Emission Vehicles",
        nitrous_oxide: dec("0.0098"),
        methane: dec("0.0092"),
      },
      "1995_2000": {
        tier: "EPA Tier 1",
        nitrous_oxide: dec("0.0541"),
        methane: dec("0.0281"),
      },
      "1986_1994": {
        tier: "EPA Tier 0",
        nitrous_oxide: dec("0.0656"),
        methane: dec("0.0482"),
      },
      "1975_1985": {
        tier: "Oxidation Catalyst",
        nitrous_oxide: dec("0.0397"),
        methane: dec("0.0942"),
      },
      "1973_1974": {
        tier: "Non-Catalyst",
        nitrous_oxide: dec("0.0135"),
        methane: dec("0.1186"),
      },
      "1972_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.0137"),
        methane: dec("0.1258"),
      },
    },
    heavyduty_vehicles: {
      "2004_later": {
        tier: "EPA Tier 2",
        nitrous_oxide: dec("0.0083"),
        methane: dec("0.0207"),
      },
      "1998_2003": {
        tier: "Low Emission Vehicles ",
        nitrous_oxide: dec("0.0199"),
        methane: dec("0.0188"),
      },
      "1996_2003": {
        tier: "EPA Tier 1",
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.0407"),
      },
      "1996_later": {
        tier: "EPA Tier 0",
        nitrous_oxide: dec("0.1327"),
        methane: dec("0.1634"),
      },
      "1996_later": {
        tier: "Oxidation Catalyst",
        nitrous_oxide: dec("0.0818"),
        methane: dec("0.1464"),
      },
      "1985_1995": {
        tier: "Non-Catalyst Control",
        nitrous_oxide: dec("0.0294"),
        methane: dec("0.2598"),
      },
      "1984_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.0497"),
        methane: dec("0.4604"),
      },
    },
  },
  diesel: {
    passenger_cars: {
      "1996_later": {
        tier: "Advanced",
        nitrous_oxide: dec("0.0006"),
        methane: dec("0.0003"),
      },
      "1983_1995": {
        tier: "Moderate",
        nitrous_oxide: dec("0.0006"),
        methane: dec("0.0003"),
      },
      "1982_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.0008"),
        methane: dec("0.0004"),
      },
    },
    lightduty_trucks: {
      "1996_later": {
        tier: "Advanced",
        nitrous_oxide: dec("0.0009"),
        methane: dec("0.0006"),
      },
      "1983_1995": {
        tier: "Moderate",
        nitrous_oxide: dec("0.0009"),
        methane: dec("0.0006"),
      },
      "1982_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.0011"),
        methane: dec("0.0007"),
      },
    },
    heavyduty_vehicles: {
      "1996_later": {
        tier: "Advanced",
        nitrous_oxide: dec("0.030"),
        methane: dec("0.0032"),
      },
      "1983_1995": {
        tier: "Moderate",
        nitrous_oxide: dec("0.030"),
        methane: dec("0.0032"),
      },
      "1982_earlier": {
        tier: "Uncontrolled",
        nitrous_oxide: dec("0.030"),
        methane: dec("0.0032"),
      },
    },
  },
  motorcycles: {
    "1996_later": {
      tier: "Non-Catalyst Control",
      nitrous_oxide: dec("0.0043"),
      methane: dec("0.0418"),
    },
    "1995_earlier": {
      tier: "Uncontrolled",
      nitrous_oxide: dec("0.0054"),
      methane: dec("0.0559"),
    },
  },
  methanol: {
    lightduty_trucks: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.0416"),
        methane: dec("0.0112"),
      },
    },
    heavyduty_vehicles: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.0410"),
      },
    },
    buses: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.0410"),
      },
    },
  },
  cng: {
    lightduty_trucks: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.0311"),
        methane: dec("0.4580"),
      },
    },
    heavyduty_vehicles: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("1.2216"),
      },
    },
    buses: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("1.2216"),
      },
    },
  },
  lng: {
    heavyduty_vehicles: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("1.2216"),
      },
    },
  },
  lpg: {
    lightduty_trucks: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.0416"),
        methane: dec("0.0230"),
      },
    },
    heavyduty_vehicles: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.0410"),
      },
    },
  },
  ethanol: {
    lightduty_trucks: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.0416"),
        methane: dec("0.0342"),
      },
    },
    heavyduty_vehicles: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.1224"),
      },
    },
    buses: {
      "all": {
        tier: null,
        nitrous_oxide: dec("0.1087"),
        methane: dec("0.1224"),
      },
    },
  },
};


export function car_footprint(distance, vehicle_category, construction_year, fuel_type, extra_weight) {
  const data = {};

  for (const [key, value] of Object.entries(car_fuel_types)) {
    const id = `car_${key}`;
    data[id] = {
      name: `Car ${key}`,
      fuel_blend: value.fuel_blend,
      fuel_consumption: value.fuel_consumption,
      price_per_l: value.price_per_l,
    };
  }

  // add motorcycle
  // data["motorcycle"] = {
  //   name: "Motorcycle",
  //   fuel_blend: "motor_gasoline",
  //   fuel_consumption: dec("0.044"),
  //   price_per_l: dec("2"),
  // };


  for (const [key, value] of Object.entries(data)) {
    value.exercise = false;
    value.speedKmh = dec("100");
    value.timeKm = timePerKm(value.speedKmh);
    value.travelTime = travelTimeHours(value.timeKm, distance);
    value.travelTimeReadable = travelTimeHoursReadable(value.travelTime);

    const fuel_demand = value.fuel_consumption.times(distance);
    const fuel_carbon_emissions = car_fuel_carbon_emissions[value.fuel_blend].times(fuel_demand);
    const cat = car_fuel_other_emissions[fuel_type][vehicle_category];
    const fuel_other_emissions = cat[Object.keys(cat)[0]];


    const extraction_and_transport_to_refinery_footprint = {
      in: {},
      out: {
        extraction_and_transport_to_refinery: {
          name: fuel_type + " extraction and transport to refinery emissions",
          amount: fuel_demand,
          value: {
            carbon_eq: toval("carbon_eq", fuel_wtt_emissions(fuel_type).extraction_and_transport_to_refinery.times(fuel_demand), null, 2, "kg", "gas", null),
          },
        },
      },
    };
    addConsumesEmits(extraction_and_transport_to_refinery_footprint);

    const refining_footprint = {
      in: {},
      out: {
        refining: {
          name: fuel_type + " refining emissions",
          amount: fuel_demand,
          value: {
            carbon_eq: toval("carbon_eq", fuel_wtt_emissions(fuel_type).refining.times(fuel_demand), null, 2, "kg", "gas", null),
          },
        },
      },
    };
    addConsumesEmits(refining_footprint);

    const transport_to_station_footprint = {
      in: {},
      out: {
        transport_to_station: {
          name: fuel_type + " transport to station emissions",
          amount: fuel_demand,
          value: {
            carbon_eq: toval("carbon_eq", fuel_wtt_emissions(fuel_type).transport_to_station.times(fuel_demand), null, 2, "kg", "gas", null),
          },
        },
      },
    };
    addConsumesEmits(transport_to_station_footprint);


    const combust_footprint = {
      in: {
        // oxygen
        fuel_type: {
          name: fuel_type,
          amount: fuel_demand,
          value: {
            fuel_type: toval(fuel_type, fuel_demand, null, 2, "L", "fluid", null),
          },
        },
      },
      out: {
        combust_emissions: {
          name: fuel_type + " combust emissions",
          amount: fuel_demand,
          value: {
            carbon_dioxide: toval("carbon_dioxide", fuel_carbon_emissions, null, 2, "kg", "gas", null),
            nitrous_oxide: toval("nitrous_oxide", fuel_other_emissions.nitrous_oxide.times(fuel_demand), null, 5, "kg", "gas", null),
            methane: toval("methane", fuel_other_emissions.methane.times(fuel_demand), null, 5, "kg", "gas", null),
          },
        },
        // heat
      },
    };

    addConsumesEmits(combust_footprint);


    value.footprint = {
      extraction_and_transport_to_refinery: {
        name: "extraction_and_transport_to_refinery",
        activity: "extraction_and_transport_to_refinery",
        ...extraction_and_transport_to_refinery_footprint,
      },
      refining: {
        name: "refining_footprint",
        activity: "refining_footprint",
        ...refining_footprint,
      },
      transport_to_station: {
        name: "transport_to_station_footprint",
        activity: "transport_to_station_footprint",
        ...transport_to_station_footprint,
      },
      combustion: {
        name: "Combustion",
        activity: "Combusting",
        ...combust_footprint,
      },
    };

    value.ctt = fuel_demand.times(value.price_per_l);
  }

  return data;
}

