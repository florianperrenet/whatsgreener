import { data } from 'autoprefixer';
import {
    dec, timePerKm, travelTimeHours, travelTimeHoursReadable, toval, addConsumesEmits, multiply_dict_tovals,
    unwrap_plusminus,
    unwrap_plusminus_dict,
    gwp,
    chemGasLtoGasKG
} from "$lib/utils";
import { car_footprint } from "$lib/travel/cars";


function plusminus_fmt_perc(l) {
    return `${l[0]}% ± ${l[1]}%`;
}
function plusminus_fmt(l) {
    return `${l[0]} ± ${l[1]}`;
}


export const WIND_TURBINE_EFFICIENCY = dec('0.3');  // perc
export const WIND_TURBINE_MAX_EFFICIENCY = dec('0.59');  // perc
export const WIND_TURBINE_MAX_ACHIEVED_EFFICIENCY = '..'; // unknown
export const WIND_TURBINE_LIFESPAN = dec('20');  // years

function metaval(amount, unit) {
    // const is_percentage = unit === '%';
    return {
        amount,
        unit,
        // is_percentage,
    };
}

export const wind_turbine = {
    efficiency: metaval(dec("0.3"), '%'),
    max_efficiency: metaval(dec("0.59"), '%'),
    max_achieved_efficiency: metaval('unkown', '%'),
    lifespan: metaval(dec('20'), 'years'),
}

export const solar_panel = {
    efficiency: metaval(dec("0.25"), '%'),
    max_efficiency: metaval(dec("0.687"), '%'),
    max_achieved_efficiency: metaval('unknown', '%'),
    lifespan: metaval(dec('25'), 'years'),
}





const BANANA_WEIGHT = dec("100");
const APPLE_WEIGHT = dec("150");

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

export const chemicalFormulas = (() => {
    const data = {
        carbon_dioxide: {
            name: 'Carbon dioxide',
            formula: 'H2O',
        },
        methane: {
            name: 'Methane',
            formula: 'CH4',
        },
        nitrous_oxide: {
            name: 'Nitrous oxide',
            formula: 'N2O',
        },
        water: {
            name: 'Water',
            formula: 'H2O',
        },
        water_vapor: {
            name: 'Water vapor',
            formula: 'H2O',
        },
        ozone: {
            name: 'Ozone',
            formula: 'O3',
        },
        argon: {
            name: 'Argon',
            formula: 'Ar',
        },
        oxygen: {
            name: 'Oxygen',
            formula: 'O2',
        },
        hydrogen_sulfide: {
            name: 'Hydrogen sulfide',
            formula: 'H2S',
        },
        hydrogen: {
            name: 'Hydrogen',
            formula: 'H2',
        },
        methanethiol: {
            name: 'Methanethiol',
            formula: 'CH4S',
        },
        dimethylsulfide: {
            name: 'Dimethylsulfide',
            formula: '(CH3)2S',
        },
    };
    // add chemical notation to formulas
    for (const value of Object.values(data)) {
        value.formula_chem = `\\ce{${value.formula}}`;
    }
    return data;
})();


export const food = (() => {
    // todo add per_protein
    const data = {
        "bread": {
            name: "Wheat & Rye (Bread)",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("249"),
                    protein: dec("8.2"),
                    fat: dec("1.2"),
                },
            },
            eur_per_kg: dec("1.04"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("1.6"),
                            median: dec("1.3"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("3.9"),
                            median: dec("2.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("648"),
                            median: dec("419"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("33386"),
                    //         median: dec("12822"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("7.2"),
                    //         median: dec("5.4"),
                    //     },
                    // },
                },
            },
        },
        "maize": {
            name: "Maize",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("356"),
                    protein: dec("9.5"),
                    fat: dec("4.3"),
                },
            },
            eur_per_kg: dec("8.93"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("1.7"),
                            median: dec("1.2"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("2.9"),
                            median: dec("1.8"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("216"),
                            median: dec("44"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("10863"),
                    //         median: dec("350"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("4"),
                    //         median: dec("2.4"),
                    //     },
                    // },
                },
            },
        },
        "oatmeal": {
            name: "Oatmeal",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("385"),
                    protein: dec("13"),
                    fat: dec("7.5"),
                },
            },
            eur_per_kg: dec("2.54"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("2.5"),
                            median: dec("2.6"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("7.6"),
                            median: dec("7.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("482"),
                            median: dec("670"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("18786"),
                    //         median: dec("24456"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("11.2"),
                    //         median: dec("10.1"),
                    //     },
                    // },
                },
            },
        },
        "rice": {
            name: "Rice",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("280"),
                    protein: dec("6"),
                    fat: dec("1.4"),
                },
            },
            eur_per_kg: dec("1.88"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("4.5"),
                            median: dec("3.7"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("2.8"),
                            median: dec("2.2"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("2248"),
                            median: dec("1575"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("49576"),
                    //         median: dec("4626"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("35.1"),
                    //         median: dec("9.3"),
                    //     },
                    // },
                },
            },
        },
        "potatoes": {
            name: "Potatoes",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("67"),
                    protein: dec("1.6"),
                    fat: dec("0.1"),
                },
            },
            eur_per_kg: dec("2.15"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.5"),
                            median: dec("0.5"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.9"),
                            median: dec("0.8"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("59"),
                            median: dec("3"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("2754"),
                    //         median: dec("78"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("3.5"),
                    //         median: dec("4.4"),
                    //     },
                    // },
                },
            },
        },
        "peas": {
            name: "Peas",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("346"),
                    protein: dec("22.5"),
                    fat: dec("1.8"),
                },
            },
            eur_per_kg: dec("7.07"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("1"),
                            median: dec("0.8"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("7.5"),
                            median: dec("6.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("397"),
                            median: dec("0"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("27948"),
                    //         median: dec("0"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("7.5"),
                    //         median: dec("1.7"),
                    //     },
                    // },
                },
            },
        },
        "nuts": {
            name: "Nuts",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("615"),
                    protein: dec("15.5"),
                    fat: dec("56.2"),
                },
            },
            eur_per_kg: dec("11.75"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.4"),
                            median: dec("-1.3"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("13"),
                            median: dec("8.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("4134"),
                            median: dec("1823"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("229890"),
                    //         median: dec("129364"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("19.2"),
                    //         median: dec("14.5"),
                    //     },
                    // },
                },
            },
        },
        "groundnuts": {
            name: "Groundnuts",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("414"),
                    protein: dec("18.7"),
                    fat: dec("35.9"),
                },
            },
            eur_per_kg: dec("2.80"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("3.2"),
                            median: dec("3.3"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("9.1"),
                            median: dec("7.9"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("1852"),
                            median: dec("900"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("61798"),
                    //         median: dec("44352"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("14.1"),
                    //         median: dec("17.1"),
                    //     },
                    // },
                },
            },
        },
        "soymilk": {
            name: "Soymilk",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("52"),
                    protein: dec("4.47"),
                    fat: dec("1.92"),
                },
            },
            eur_per_kg: dec("1.29"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("1"),
                            median: dec("0.9"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.7"),
                            median: dec("0.6"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("28"),
                            median: dec("1"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("956"),
                    //         median: dec("6"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("1.1"),
                    //         median: dec("1.2"),
                    //     },
                    // },
                },
            },
        },
        "tofu": {
            name: "Tofu",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("85"),
                    protein: dec("8.7"),
                    fat: dec("5.2"),
                },
            },
            eur_per_kg: dec("4.03"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("3.2"),
                            median: dec("2.6"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("3.5"),
                            median: dec("3.4"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("149"),
                            median: dec("7"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("5113"),
                    //         median: dec("32"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("6.2"),
                    //         median: dec("6.6"),
                    //     },
                    // },
                },
            },
        },
        "olive_oil": {
            name: "Olive Oil",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("884"),
                    protein: dec("0"),
                    fat: dec("100"),
                },
            },
            eur_per_kg: dec("5.99"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("5.4"),
                            median: dec("5.1"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("26.3"),
                            median: dec("17.3"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("2142"),
                            median: dec("318"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("177480"),
                    //         median: dec("24396"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("37.3"),
                    //         median: dec("39.1"),
                    //     },
                    // },
                },
            },
        },
        "tomatoes": {
            name: "Tomatoes",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("17"),
                    protein: dec("0.8"),
                    fat: dec("0.2"),
                },
            },
            eur_per_kg: dec("2.92"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("2.1"),
                            median: dec("0.7"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.8"),
                            median: dec("0.2"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("370"),
                            median: dec("77"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("5336"),
                    //         median: dec("4481"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("7.5"),
                    //         median: dec("1.9"),
                    //     },
                    // },
                },
            },
        },
        "onions_leeks": {
            name: "Onions & Leeks",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("24"),
                    protein: dec("1.7"),
                    fat: dec("0.1"),
                },
            },
            eur_per_kg: dec("1.72"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.5"),
                            median: dec("0.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.4"),
                            median: dec("0.3"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("14"),
                            median: dec("2"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("932"),
                    //         median: dec("57"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("3.2"),
                    //         median: dec("1.6"),
                    //     },
                    // },
                },
            },
        },
        "root_vegetables": {
            name: "Root Vegetables",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("22"),
                    protein: dec("1.4"),
                    fat: dec("0.2"),
                },
            },
            eur_per_kg: dec("0.85"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.4"),
                            median: dec("0.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.3"),
                            median: dec("0.3"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("28"),
                            median: dec("10"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("929"),
                    //         median: dec("38"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("1.6"),
                    //         median: dec("1"),
                    //     },
                    // },
                },
            },
        },
        "brassicas": {
            name: "Brassicas",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("24"),
                    protein: dec("1.3"),
                    fat: dec("0.1"),
                },
            },
            eur_per_kg: dec("1.69"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.5"),
                            median: dec("0.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.6"),
                            median: dec("0.3"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("119"),
                            median: dec("55"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("8455"),
                    //         median: dec("2483"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("5"),
                    //         median: dec("5.7"),
                    //     },
                    // },
                },
            },
        },
        "citrus_fruit": {
            name: "Citrus Fruit",
            type: "fruit",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("26"),
                    protein: dec("0.5"),
                    fat: dec("0.2"),
                },
            },
            eur_per_kg: dec("2.39"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.4"),
                            median: dec("0.3"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.9"),
                            median: dec("0.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("83"),
                            median: dec("37"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("4663"),
                    //         median: dec("1346"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("2.2"),
                    //         median: dec("1.7"),
                    //     },
                    // },
                },
            },
        },
        "banana": {
            name: "Banana",
            type: "fruit",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("60"),
                    protein: dec("0.7"),
                    fat: dec("0.3"),
                },
            },
            eur_per_kg: dec("1.99"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.9"),
                            median: dec("0.8"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("1.9"),
                            median: dec("1.4"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("115"),
                            median: dec("1"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("662"),
                    //         median: dec("31"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("3.3"),
                    //         median: dec("2.1"),
                    //     },
                    // },
                },
            },
        },
        "apple": {
            name: "Apple",
            type: "fruit",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("48"),
                    protein: dec("0.1"),
                    fat: dec("0.3"),
                },
            },
            eur_per_kg: dec("1.79"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("0.4"),
                            median: dec("0.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("0.6"),
                            median: dec("0.5"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("180"),
                            median: dec("115"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("12949"),
                    //         median: dec("1025"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("1.5"),
                    //         median: dec("2"),
                    //     },
                    // },
                },
            },
        },
        "berries_grapes": {
            name: "Berries & Grapes",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("49"),
                    protein: dec("1"),
                    fat: dec("0.7"),
                },
            },
            eur_per_kg: dec("12.97"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("1.5"),
                            median: dec("1.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("2.4"),
                            median: dec("2.6"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("420"),
                            median: dec("404"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("21162"),
                    //         median: dec("16245"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("6.1"),
                    //         median: dec("1"),
                    //     },
                    // },
                },
            },
        },
        "bovine_meat": {
            name: "Bovine Meat (beef herd)",
            type: "meat",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("250"),
                    protein: dec("26"),
                    fat: dec("15"),
                },
            },
            eur_per_kg: dec("7.38"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("99.5"),
                            median: dec("60.4"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("326.2"),
                            median: dec("170.4"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("1451"),
                            median: dec("740"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("34733"),
                    //         median: dec("441"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("301.4"),
                    //         median: dec("320.7"),
                    //     },
                    // },
                },
            },
        },
        "lamb_mutton": {
            name: "Lamb & Mutton",
            type: "meat",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("263"),
                    protein: dec("13.5"),
                    fat: dec("22.8"),
                },
            },
            eur_per_kg: dec("38.98"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("39.7"),
                            median: dec("40.6"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("369.8"),
                            median: dec("127.4"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("1803"),
                            median: dec("461"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("141925"),
                    //         median: dec("259"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("97.1"),
                    //         median: dec("101.9"),
                    //     },
                    // },
                },
            },
        },
        "pig_meat": {
            name: "Pig Meat",
            type: "meat",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("239"),
                    protein: dec("16.1"),
                    fat: dec("18.8"),
                },
            },
            eur_per_kg: dec("15.16"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("12.3"),
                            median: dec("10.6"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("17.4"),
                            median: dec("13.4"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("1796"),
                            median: dec("1810"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("66867"),
                    //         median: dec("54243"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("76.4"),
                    //         median: dec("53.5"),
                    //     },
                    // },
                },
            },
        },
        "poultry_meat": {
            name: "Poultry Meat",
            type: "meat",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("185"),
                    protein: dec("17.1"),
                    fat: dec("12.4"),
                },
            },
            eur_per_kg: dec("9.97"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("9.9"),
                            median: dec("7.5"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("12.2"),
                            median: dec("11"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("660"),
                            median: dec("370"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("14178"),
                    //         median: dec("334"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("48.7"),
                    //         median: dec("34.5"),
                    //     },
                    // },
                },
            },
        },
        "milk": {
            name: "Milk",
            type: "diary",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("61"),
                    protein: dec("3.3"),
                    fat: dec("3.3"),
                },
            },
            eur_per_kg: dec("0.93"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("3.2"),
                            median: dec("2.7"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("9"),
                            median: dec("2.1"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("628"),
                            median: dec("197"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("19786"),
                    //         median: dec("9776"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("10.7"),
                    //         median: dec("10.7"),
                    //     },
                    // },
                },
            },
        },
        "cheese": {
            name: "Cheese",
            type: "diary",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("387"),
                    protein: dec("25"),
                    fat: dec("31"),
                },
            },
            eur_per_kg: dec("13.95"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("23.9"),
                            median: dec("18.6"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("87.8"),
                            median: dec("20.2"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("5605"),
                            median: dec("1559"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("180851"),
                    //         median: dec("80463"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("98.4"),
                    //         median: dec("99.5"),
                    //     },
                    // },
                },
            },
        },
        "egg": {
            name: "Eggs",
            type: "diary",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("139"),
                    protein: dec("10.7"),
                    fat: dec("9.8"),
                },
            },
            eur_per_kg: dec("3.32"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("4.7"),
                            median: dec("4.2"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("6.3"),
                            median: dec("5.7"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("578"),
                            median: dec("633"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("17983"),
                    //         median: dec("18621"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("21.8"),
                    //         median: dec("21.3"),
                    //     },
                    // },
                },
            },
        },
        "fish": {
            name: "Fish (farmed)",
            type: "fish",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("69"),
                    protein: dec("10.9"),
                    fat: dec("2.5"),
                },
            },
            eur_per_kg: dec("11.40"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("13.6"),
                            median: dec("7.9"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("8.4"),
                            median: dec("5.6"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("3691"),
                            median: dec("1581"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("41572"),
                    //         median: dec("8483"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("235.1"),
                    //         median: dec("243.6"),
                    //     },
                    // },
                },
            },
        },
        "crustaceans": {
            name: "Crustaceans (farmed)",
            type: "crab",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("47"),
                    protein: dec("9.3"),
                    fat: dec("0.5"),
                },
            },
            eur_per_kg: dec("71.9"),
            footprint: {
                emits: {
                    carbon_dioxide: {
                        unit: "kg",
                        state: "gas",
                        per_kg: {
                            mean: dec("26.9"),
                            median: dec("14.7"),
                        },
                    },
                },
                consumes: {
                    land: {
                        unit: "m2",
                        state: null,
                        per_kg: {
                            mean: dec("3"),
                            median: dec("0.8"),
                        },
                    },
                    water: {
                        unit: "L",
                        state: "liquid",
                        per_kg: {
                            mean: dec("3515"),
                            median: dec("1208"),
                        },
                    },
                    // weighted_water_use: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("127259"),
                    //         median: dec("48738"),
                    //     },
                    // },
                    // water_pollution: {
                    //     unit: null,
                    //     state: null,
                    //     per_kcal: {},
                    //     per_protein: {},
                    //     per_kg: {
                    //         mean: dec("227.2"),
                    //         median: dec("141.3"),
                    //     },
                    // },
                },
            },
        },
    };

    for (const value of Object.values(data)) {
        // add composition per_g
        value.composition.per_g = {};
        for (const [ckey, cvalue] of Object.entries(value.composition.per_100g)) {
            value.composition.per_g[ckey] = cvalue.div(dec("100"));
        }

        value.eur_per_g = value.eur_per_kg.div("1000");
        value.eur_per_kcal = value.eur_per_g.div(value.composition.per_g.kcal);

        // add footprint per_g
        // add footprint per_kcal
        for (const key of Object.keys(value.footprint)) {
            for (const [k, v] of Object.entries(value.footprint[key])) {
                v.per_g = {
                    mean: v.per_kg.mean.div(dec("1000")),
                    median: v.per_kg.median.div(dec("1000")),
                };

                const gkcal = value.composition.per_g.kcal;
                v.per_kcal = {
                    mean: v.per_g.mean.div(gkcal),
                    median: v.per_g.median.div(gkcal),
                };
            }
        }
    }

    return data;
})();


export const food_table = (() => {
    let columns = [
        "Food", "Calories", "Protein", "Fat",
    ];
    let rows = [];

    let add_cols = true;
    for (const value of Object.values(food)) {
        // const footprint_vals = [];
        // for (const [fpkey, fpval] of Object.entries(value.footprint)) {
        //     footprint_vals.push(fpval.per_kg.median);
        //     if (add_cols) {
        //         columns.push(fpkey);
        //     }
        // }

        add_cols = false;

        rows.push([
            value.name,
            value.composition.per_100g.kcal,
            value.composition.per_100g.protein,
            value.composition.per_100g.fat,
            // ...footprint_vals,
        ]);
    }

    let align = "l";
    for (const col of columns)
        align += "r";
    return { align, columns, rows }
})();

export const diets = (() => {
    const data = {
        meat_fish: {
            name: "Meat and fish",
            footprint_per_kcal: {},
            grouped: {},
            overview: {
                breakfast: [{
                    product: "milk",
                    amount: dec("100"),
                }, {
                    product: "oatmeal",
                    amount: dec("200"),
                }],
                lunch: [{
                    product: "cheese",
                    amount: dec("50"),
                }, {
                    product: "egg",
                    amount: dec("50"),
                }, {
                    product: "bread",
                    amount: dec("75"),
                }, {
                    product: "pig_meat",
                    amount: dec("50"),
                }, {
                    product: "poultry_meat",
                    amount: dec("50"),
                }, {
                    product: "lamb_mutton",
                    amount: dec("50"),
                }, {
                    product: "fish",
                    amount: dec("50"),
                }],
                dinner: [{
                    product: "olive_oil",
                    amount: dec("10"),
                }, {
                    product: "maize",
                    amount: dec("20"),
                }, {
                    product: "brassicas",
                    amount: dec("20"),
                }, {
                    product: "potatoes",
                    amount: dec("50"),
                }, {
                    product: "rice",
                    amount: dec("20"),
                }, {
                    product: "tofu",
                    amount: dec("10"),
                }, {
                    product: "tomatoes",
                    amount: dec("20"),
                }, {
                    product: "onions_leeks",
                    amount: dec("10"),
                }, {
                    product: "root_vegetables",
                    amount: dec("20"),
                }, {
                    product: "pig_meat",
                    amount: dec("40"),
                }, {
                    product: "poultry_meat",
                    amount: dec("40"),
                }, {
                    product: "lamb_mutton",
                    amount: dec("40"),
                }, {
                    product: "fish",
                    amount: dec("20"),
                }, {
                    product: "cheese",
                    amount: dec("20"),
                }],
                snacks: [{
                    product: "banana",
                    amount: BANANA_WEIGHT,
                }, {
                    product: "apple",
                    amount: APPLE_WEIGHT,
                }, {
                    product: "groundnuts",
                    amount: dec("20"),
                }, {
                    product: "berries_grapes",
                    amount: dec("100"),
                }],
            },
        },
        meat_no_fish: {
            name: "Meat",
            footprint_per_kcal: {},
            grouped: {},
            overview: {
                breakfast: [{
                    product: "milk",
                    amount: dec("100"),
                }, {
                    product: "oatmeal",
                    amount: dec("200"),
                }],
                lunch: [{
                    product: "cheese",
                    amount: dec("50"),
                }, {
                    product: "egg",
                    amount: dec("50"),
                }, {
                    product: "bread",
                    amount: dec("75"),
                }, {
                    product: "pig_meat",
                    amount: dec("50"),
                }, {
                    product: "poultry_meat",
                    amount: dec("50"),
                }, {
                    product: "lamb_mutton",
                    amount: dec("50"),
                }],
                dinner: [{
                    product: "olive_oil",
                    amount: dec("10"),
                }, {
                    product: "maize",
                    amount: dec("20"),
                }, {
                    product: "brassicas",
                    amount: dec("20"),
                }, {
                    product: "potatoes",
                    amount: dec("50"),
                }, {
                    product: "rice",
                    amount: dec("20"),
                }, {
                    product: "tofu",
                    amount: dec("10"),
                }, {
                    product: "tomatoes",
                    amount: dec("20"),
                }, {
                    product: "onions_leeks",
                    amount: dec("10"),
                }, {
                    product: "root_vegetables",
                    amount: dec("20"),
                }, {
                    product: "pig_meat",
                    amount: dec("40"),
                }, {
                    product: "poultry_meat",
                    amount: dec("40"),
                }, {
                    product: "lamb_mutton",
                    amount: dec("40"),
                }, {
                    product: "cheese",
                    amount: dec("20"),
                }],
                snacks: [{
                    product: "banana",
                    amount: BANANA_WEIGHT,
                }, {
                    product: "apple",
                    amount: APPLE_WEIGHT,
                }, {
                    product: "groundnuts",
                    amount: dec("20"),
                }, {
                    product: "berries_grapes",
                    amount: dec("100"),
                }],

            },
        },
        fish_no_meat: {
            name: "Fish",
            footprint_per_kcal: {},
            grouped: {},
            overview: {
                breakfast: [{
                    product: "milk",
                    amount: dec("100"),
                }, {
                    product: "oatmeal",
                    amount: dec("200"),
                }],
                lunch: [{
                    product: "cheese",
                    amount: dec("100"),
                }, {
                    product: "egg",
                    amount: dec("100"),
                }, {
                    product: "bread",
                    amount: dec("100"),
                }, {
                    product: "fish",
                    amount: dec("100"),
                }],
                dinner: [{
                    product: "olive_oil",
                    amount: dec("10"),
                }, {
                    product: "maize",
                    amount: dec("20"),
                }, {
                    product: "brassicas",
                    amount: dec("100"),
                }, {
                    product: "potatoes",
                    amount: dec("100"),
                }, {
                    product: "rice",
                    amount: dec("50"),
                }, {
                    product: "tofu",
                    amount: dec("100"),
                }, {
                    product: "tomatoes",
                    amount: dec("100"),
                }, {
                    product: "onions_leeks",
                    amount: dec("100"),
                }, {
                    product: "root_vegetables",
                    amount: dec("100"),
                }, {
                    product: "fish",
                    amount: dec("20"),
                }, {
                    product: "cheese",
                    amount: dec("20"),
                }],
                snacks: [{
                    product: "banana",
                    amount: BANANA_WEIGHT,
                }, {
                    product: "apple",
                    amount: APPLE_WEIGHT,
                }, {
                    product: "groundnuts",
                    amount: dec("30"),
                }, {
                    product: "berries_grapes",
                    amount: dec("100"),
                }],
            },
        },
        vegetarian: {
            name: "Vegetarian",
            footprint_per_kcal: {},
            grouped: {},
            overview: {
                breakfast: [{
                    product: "milk",
                    amount: dec("100"),
                }, {
                    product: "oatmeal",
                    amount: dec("200"),
                }],
                lunch: [{
                    product: "cheese",
                    amount: dec("80"),
                }, {
                    product: "egg",
                    amount: dec("100"),
                }, {
                    product: "bread",
                    amount: dec("100"),
                }],
                dinner: [{
                    product: "olive_oil",
                    amount: dec("10"),
                }, {
                    product: "maize",
                    amount: dec("10"),
                }, {
                    product: "brassicas",
                    amount: dec("100"),
                }, {
                    product: "potatoes",
                    amount: dec("100"),
                }, {
                    product: "rice",
                    amount: dec("50"),
                }, {
                    product: "tofu",
                    amount: dec("100"),
                }, {
                    product: "tomatoes",
                    amount: dec("100"),
                }, {
                    product: "onions_leeks",
                    amount: dec("100"),
                }, {
                    product: "root_vegetables",
                    amount: dec("100"),
                }, {
                    product: "cheese",
                    amount: dec("50"),
                }],
                snacks: [{
                    product: "banana",
                    amount: BANANA_WEIGHT,
                }, {
                    product: "apple",
                    amount: APPLE_WEIGHT,
                }, {
                    product: "groundnuts",
                    amount: dec("50"),
                }, {
                    product: "berries_grapes",
                    amount: dec("100"),
                }],
            },
        },
        vegan: {
            name: "Vegan",
            footprint_per_kcal: {},
            grouped: {},
            overview: {
                breakfast: [{
                    product: "soymilk",
                    amount: dec("100"),
                }, {
                    product: "oatmeal",
                    amount: dec("200"),
                }],
                lunch: [{
                    product: "bread",
                    amount: dec("100"),
                }],
                dinner: [{
                    product: "olive_oil",
                    amount: dec("10"),
                }, {
                    product: "maize",
                    amount: dec("50"),
                }, {
                    product: "brassicas",
                    amount: dec("100"),
                }, {
                    product: "potatoes",
                    amount: dec("100"),
                }, {
                    product: "rice",
                    amount: dec("100"),
                }, {
                    product: "tofu",
                    amount: dec("100"),
                }, {
                    product: "tomatoes",
                    amount: dec("100"),
                }, {
                    product: "onions_leeks",
                    amount: dec("100"),
                }, {
                    product: "root_vegetables",
                    amount: dec("100"),
                }],
                snacks: [{
                    product: "banana",
                    amount: BANANA_WEIGHT,
                }, {
                    product: "apple",
                    amount: APPLE_WEIGHT,
                }, {
                    product: "groundnuts",
                    amount: dec("100"),
                }, {
                    product: "berries_grapes",
                    amount: dec("100"),
                }],
            },
        },
    };

    for (const value of Object.values(data)) {
        // add kcal to overview
        // add unit to overiew

        const grouped = {};
        let kcalsum = dec("0");


        for (const item of Object.values(value.overview)) {
            for (const i of item) {
                const product = food[i.product];
                i.kcal = product.composition.per_g.kcal.times(i.amount);
                i.unit = product.unit;


                kcalsum = kcalsum.add(i.kcal);
                // handle grouped
                if (i.product in grouped) {
                    grouped[i.product].amount = grouped[i.product].amount.add(i.amount);
                    grouped[i.product].kcal = grouped[i.product].kcal.add(i.kcal);
                } else {
                    grouped[i.product] = {
                        amount: i.amount,
                        kcal: i.kcal,
                        unit: product.unit,
                        type: product.type,
                    };
                }
            }
        }

        value.grouped = grouped;
        value.kcalsum = kcalsum;

        // footprint_per_kcal
        value.footprint_per_kcal = {
            consumes: {},
            emits: {},
        };

        let eur_per_kcal = dec("0");

        // calc percentage
        for (const [k, v] of Object.entries(value.grouped)) {
            const product = food[k];

            v.percentage = v.kcal.div(value.kcalsum);
            eur_per_kcal = eur_per_kcal.add(v.kcal.times(product.eur_per_kcal));

            for (const key of Object.keys(product.footprint)) {
                for (const [x, y] of Object.entries(product.footprint[key])) {
                    if (x in value.footprint_per_kcal[key]) {
                        value.footprint_per_kcal[key][x].mean = value.footprint_per_kcal[key][x].mean.add(product.footprint[key][x].per_kcal.mean.times(v.percentage));
                        value.footprint_per_kcal[key][x].median = value.footprint_per_kcal[key][x].median.add(product.footprint[key][x].per_kcal.median.times(v.percentage));
                    } else {
                        value.footprint_per_kcal[key][x] = {
                            mean: product.footprint[key][x].per_kcal.mean.times(v.percentage),
                            median: product.footprint[key][x].per_kcal.median.times(v.percentage),
                            unit: product.footprint[key][x].unit,
                            state: product.footprint[key][x].state,
                        };
                    }
                }
            }
        }

        value.eur_per_kcal = eur_per_kcal.div(kcalsum);
    }

    return data;
})();


export const dietOptions = (() => {
    const options = [];
    for (const [key, value] of Object.entries(diets)) {
        options.push([key, value.name]);
    }
    options.push("divider");
    for (const [key, value] of Object.entries(food)) {
        options.push([key, value.name]);
    }
    return options;
})();


// kcal breakfast should be around 800
// kcal lunch should be around 800
// kcal dinner should be around 600
// kcal snacks should be around 300

export const diets_table = (() => {
    const align = "lrr";
    const columns = ["Product", "Amount", "kcal"];

    const data = {};

    for (const [key, value] of Object.entries(diets)) {
        data[key] = [];
        let totalkcalsum = dec("0");

        for (const [meal, mealval] of Object.entries(value.overview)) {
            const tmpdata = [];
            for (const item of mealval) {
                tmpdata.push([
                    item.product,
                    `${item.amount} ${item.unit}`,
                    item.kcal,
                ]);
            }

            let kcalsum = dec("0");
            tmpdata.map((x) => { kcalsum = kcalsum.add(x[2]) });

            data[key].push(`${capitalize(meal)} (${kcalsum}kcal)`);

            tmpdata.map((x) => data[key].push(x));

            totalkcalsum = totalkcalsum.add(kcalsum);
        }

        data[key].push(`Total ${totalkcalsum}kcal`);
    }

    return { align, columns, ...data }
})();

export const diets_distribution_table = (() => {
    const align = "lrrr";
    const columns = ["Product", "Amount", "kcal", "Percentage"];

    const data = {};

    for (const [key, value] of Object.entries(diets)) {
        data[key] = [];

        const type_grouped = {};
        for (const [gkey, gvalue] of Object.entries(value.grouped)) {
            const val = [
                gkey,
                `${gvalue.amount} ${gvalue.unit}`,
                gvalue.kcal,
                (gvalue.percentage.times(dec("100"))).toFixed(2),
            ];
            if (gvalue.type in type_grouped) {
                type_grouped[gvalue.type].push(val);
            } else {
                type_grouped[gvalue.type] = [val];
            }
        }
        let kcal_total = dec("0");
        for (const [k, v] of Object.entries(type_grouped)) {
            // if (!v.length) continue;
            let kcal_group = dec("0");
            v.map((x) => kcal_group = kcal_group.add(x[2]));
            // console.log(v)
            data[key].push(`${capitalize(k)} (${kcal_group}kcal)`);
            data[key].push(...v);

            kcal_total = kcal_total.add(kcal_group);
        }

        data[key].push(`Total ${kcal_total}kcal`)
    }
    return { align, columns, ...data };
})();

export const diets_footprint_table = (() => {
    const align = "lrr";
    const columns = ["Side", "Parameter", "Mean", "Median"];
    const data = {};

    for (const [diet, dietvalue] of Object.entries(diets)) {
        data[diet] = [];

        for (const side of Object.keys(dietvalue.footprint_per_kcal)) {
            for (const [key, value] of Object.entries(dietvalue.footprint_per_kcal[side])) {
                // console.log(key, value)
                data[diet].push([
                    side,
                    key,
                    (value.mean.times(dec("1000"))).toFixed(2),
                    (value.median.times(dec("1000"))).toFixed(2),
                ]);
            }
        }
    }
    return { align, columns, ...data };
})();

// function between(v1, v2) {
//     return [v1, v2];
// }

function plusminus(v1, v2) {
    return ["plusminus", v1, v2];
}

export const airComposition = () => {
    return {
        atmospheric: {
            temperature: toval("temperature", dec("20"), null, 5, "celcius", "Joule"),
            nitrogen: toval("nitrogen", null, dec("78"), 5, "L", 'gas'),
            oxygen: toval("oxygen", null, dec("20.95"), 5, "L", 'gas'),
            argon: toval("argon", null, dec("0.93"), 5, "L", 'gas'),
            carbon_dioxide: toval("carbon_dioxide", null, dec("0.0004"), 5, "L", 'gas'),
            water: plusminus(
                toval("water", null, dec("2.5"), 5, "L", 'gas'),
                toval("water", null, dec("2.5"), 5, "L", 'gas'),
            ),
        },
        exhaled: {
            temperature: toval("temperature", dec("37"), null, 5, "celcius", "Joule"),
            nitrogen: toval("nitrogen", null, dec("79"), 5, "L", 'gas'),
            oxygen: plusminus(
                toval("oxygen", null, dec("14.8"), 5, "L", 'gas'),
                toval("oxygen", null, dec("12"), 5, "L", 'gas'),
            ),
            argon: toval("argon", null, dec("1"), 5, "L", 'gas'),
            carbon_dioxide: plusminus(
                toval("carbon_dioxide", null, dec("4.65"), 5, "L", 'gas'),
                toval("carbon_dioxide", null, dec("0.65"), 5, "L", 'gas'),
            ),
            water: plusminus(
                toval("water", null, dec("5.65"), 5, "L", 'gas'),
                toval("water", null, dec("0.65"), 5, "L", 'gas'),
            ),
        },
    }
};



export const airCompositionTable = (() => {
    const align = "lrr";
    const columns = [
        "Parameter",
        "Atmospheric air",
        "Exhaled air",
    ];
    const rows = [];

    const aircomposition = airComposition();
    const keys = ["temperature", "nitrogen", "oxygen", 'argon', 'carbon_dioxide', 'water'];
    for (const key of keys) {
        // console.log(key)
        rows.push([
            key,
            aircomposition.atmospheric[key]._percentage,
            aircomposition.exhaled[key]._percentage,
        ]);
    }
    return { align, columns, rows };
})();




// function unwrap_plusminus(dict) {
//     const newdict = {};
//     for (const [key, value] of Object.entries(dict)) {
//         if (Array.isArray(value))
//             newdict[key] = value[0];
//         else
//             newdict[key] = value;
//     }
//     return newdict;
// }




// function calcdiffs(d) {
//     const diff = {};
//     const consumes = {};
//     const emits = {};

//     for (const [key, value] of Object.entries(d)) {
//         for (const [k, v] of Object.entries(value)) {
//             for (const [x, y] of Object.entries(v.value)) {
//                 if (x in diff) {
//                     diff[x] = diff[x].minus(y);
//                 } else {
//                     diff[x] = y;
//                 }
//             }
//         }
//     }

//     for (const [key, value] of Object.entries(diff)) {
//         if (value.gt(dec("0"))) {
//             consumes[key] = value;
//         } else if (value.lt(dec("0"))) {
//             emits[key] = value.times(dec("-1"));
//         }
//     }

//     d.consumes = consumes;
//     d.emits = emits;
// }

function excludeKeys(dict, array) {
    const newdict = {};
    for (const [key, value] of Object.entries(dict)) {
        if (array.includes(key))
            continue
        newdict[key] = value;
    }
    return newdict;
}


export const breathing = (airInhaled) => {
    // amount airInhaled === amount airExhaled
    const composition = airComposition();
    const atmospheric = excludeKeys(composition.atmospheric, ["temperature"]);
    const exhaled = excludeKeys(composition.exhaled, ["temperature"]);
    const data = {
        in: {
            air_inhaled: {
                name: 'Air inhaled',
                amount: airInhaled,
                value: multiply_dict_tovals(
                    unwrap_plusminus_dict(atmospheric),
                    airInhaled,
                ),
            },
        },
        out: {
            air_exhaled: {
                name: 'Air exhaled',
                amount: airInhaled,
                value: multiply_dict_tovals(
                    unwrap_plusminus_dict(exhaled),
                    airInhaled,
                ),
            },
        },
    };
    addConsumesEmits(data);
    // TODO: add heat emission from breathing
    data.emits.heat = toval("heat", dec("100"), null, 2, "Joule", null, null);
    data.emits.heat._amount = null;
    return data;
};

export const exercises = (() => {
    const data = {
        rest: {
            name: "Rest",
            speed: dec("0"),
            met: dec("1.04"),
        },
        walkingSlow: {
            name: "Walking slow",
            speed: dec("3"),
            met: dec("2.5"),
        },
        walkingFast: {
            name: "Walking fast",
            speed: dec("6"),
            met: dec("5"),
        },
        joggingSlow: {
            name: "Jogging slow",
            speed: dec("10"),
            met: dec("10"),
        },
        joggingFast: {
            name: "Jogging fast",
            speed: dec("15"),
            met: dec("15"),
        },
        cyclingSlow: {
            name: "Cycling slow",
            speed: dec("20"),
            met: dec("8"),
        },
        cyclingFast: {
            name: "Cycling fast",
            speed: dec("30"),
            met: dec("13"),
        },
    };

    for (const value of Object.values(data)) {
        /* calc oxygenDemand
        mL Oxygen/kg/min = MET * 3.5
        L Oxygen/kg/h = MET * 3.5 / 1000 * 60
        */
        value.oxygenDemand = value.met.times(dec("3.5")).div("1000").times("60");
        value.oxygenDemandDeltaRest = value.oxygenDemand.minus(data.rest.oxygenDemand);

        // calc timePerKm
        value.timePerKm = timePerKm(value.speed);

        // calc airUsage
        // TODO: ref oxygenUsage from breathing
        const oxygenUsage = dec("0.0615");
        const airPerLOxygen = dec("1").div(oxygenUsage);
        value.airInhaled = value.oxygenDemand.times(airPerLOxygen);
        value.airInhaledDeltaRest = value.airInhaled.minus(data.rest.airInhaled);


        value.deltaMETRest = value.met.minus(data.rest.met);

        // calc excessAirInhaled
        // value.excessAirInhaled = bodyWeight * hours *
    }
    return data;
})();

export const exercises_table = (() => {
    const align = "lcccc";
    const columns = [
        "Activity",
        "km/h",
        // "Time per km (minutes)",
        "MET",
        "METDelta",
        "oxygenDemand",
        "deltaRest",
    ];
    const rows = [];

    for (const exercise of Object.values(exercises)) {
        rows.push([
            exercise.name,
            exercise.speed,
            // exercise.timePerKm * dec("60"),
            exercise.met,
            exercise.deltaMETRest,
            exercise.oxygenDemand,
            exercise.oxygenDemandDeltaRest,
        ]);
    }
    return { align, columns, rows };
})();

export const exercises_air_usage_table = (() => {
    const align = "lccc";
    const columns = [
        "Activity",
        "km/h",
        "airInhaled",
        "deltaRest"
    ];
    const rows = [];
    for (const exercise of Object.values(exercises)) {
        rows.push([
            exercise.name,
            exercise.speed,
            exercise.airInhaled.toFixed(2),
            exercise.airInhaledDeltaRest.toFixed(2),
        ]);
    }
    return { align, columns, rows };
})();



const waterHydration = (waterConsumption) => {
    const data = {
        in: {
            waterIn: {
                name: 'Water in',
                amount: waterConsumption,
                value: multiply_dict_tovals({
                    drink: toval("water", null, dec("64"), 2, "L", "liquid", null),
                    food: toval("water", null, dec("28"), 2, "L", "liquid", null),
                    metabolicWater: toval("water", null, dec("8"), 2, "L", "liquid", null),
                }, waterConsumption),
            },
        },
        out: {
            waterOut: {
                name: 'Water out',
                amount: waterConsumption,  // todo is this correct
                value: multiply_dict_tovals({
                    urine: toval("water", null, dec("10"), 2, "L", "liquid", null),
                    cutaneousTranspiration: toval("water", null, dec("10"), 2, "L", "liquid", null),
                    expiredAir: toval("water", null, dec("10"), 2, "L", "liquid", null), // todo as equation
                    sweat: toval("water", null, dec("5"), 2, "L", "liquid", null),
                    feces: toval("water", null, dec("5"), 2, "L", "liquid", null), // todo as equation
                }, waterConsumption),
            },
        },
    };

    addConsumesEmits(data);
    return data;
}



function sweating(waterConsumption, waterLossSweatPerc) {
    const amount = waterConsumption.times(waterLossSweatPerc);

    const data = {
        in: {
            waterIn: {
                name: 'Water in: sweat',
                amount,
                value: {
                    water: toval("water", waterConsumption, waterLossSweatPerc, 2, "L", "liquid", null),
                },
            },
        },
        out: {
            sweat: {
                name: 'Sweat',
                amount,
                value: multiply_dict_tovals({
                    water: toval("water", null, dec("89"), 5, "L", "liquid", null),
                    sodium: toval("sodium", null, dec("0.09"), 5, "kg", "solid", null),
                    potassium: toval("potassium", null, dec("0.02"), 5, "kg", "solid", null),
                    calcium: toval("calcium", null, dec("0.0015"), 5, "kg", "solid", null),
                    magnesium: toval("magnesium", null, dec("0.00013"), 5, "kg", "solid", null),
                    zinc: toval("zinc", null, dec("0.00004"), 5, "kg", "solid", null),
                    copper: toval("copper", null, dec("0.000055"), 5, "kg", "solid", null),
                    iron: toval("iron", null, dec("0.0001"), 5, "kg", "solid", null),
                    chromium: toval("chromium", null, dec("0.00001"), 5, "kg", "solid", null),
                    nickel: toval("nickel", null, dec("0.000005"), 5, "kg", "solid", null),
                    lead: toval("lead", null, dec("0.0000005"), 5, "kg", "solid", null),
                }, amount),
            },
        },
    };

    addConsumesEmits(data);
    // sweating doesn't really consume water does it?
    // and if so water "consume" is already accounted for in hydration..
    data.consumes = {};
    return data;
}

function peeing(waterConsumption, waterLossUrinePerc) {
    const amount = waterConsumption.times(waterLossUrinePerc);

    const data = {
        in: {
            waterIn: {
                name: 'Water in: urine',
                amount,
                value: {
                    water: toval("water", waterConsumption, waterLossUrinePerc, 2, "L", "liquid", null),
                },
            },
        },
        out: {
            urine: {
                name: 'Urine',
                amount,
                value: multiply_dict_tovals(unwrap_plusminus_dict({
                    water: plusminus(
                        toval("water", null, dec("93.5"), 5, "L", "liquid", null),
                        toval("water", null, dec("2.5"), 5, "L", "liquid", null),
                    ),
                    nitrogen: toval("nitrogen", null, dec("0.883"), 5, "kg", "solid", null),
                    chloride: toval("chloride", null, dec("0.497"), 5, "kg", "solid", null),
                    sodium: toval("sodium", null, dec("0.345"), 5, "kg", "solid", null),
                    potassium: toval("potassium", null, dec("0.274"), 5, "kg", "solid", null),
                    sulphate: toval("sulphate", null, dec("0.15"), 5, "kg", "solid", null),
                    phosphorus: plusminus(
                        toval("phosphorus", null, dec("0.14"), 5, "kg", "solid", null),
                        toval("phosphorus", null, dec("0.06"), 5, "kg", "solid", null),
                    ),
                    ammonium_ammonia: toval("ammonium_ammonia", null, dec("0.046"), 5, "kg", "solid", null),
                    calcium: toval("calcium", null, dec("0.023"), 5, "kg", "solid", null),
                    magnesium: toval("magnesium", null, dec("0.012"), 5, "kg", "solid", null),
                    nitrate_nitrite: toval("nitrate_nitrite", null, dec("0.000006"), 5, "kg", "solid", null),
                }), amount),
            },
        },
    };

    addConsumesEmits(data);
    // peeing doesn't really consume water does it?
    // and if so water "consume" is already accounted for in hydration..
    data.consumes = {};
    return data;
}


function pooping(waterConsumption, waterLossPoopPerc) {
    const amount = waterConsumption.times(waterLossPoopPerc);

    const data = {
        in: {
            waterIn: {
                name: 'Water in: poop',
                amount,
                value: {
                    water: toval("water", waterConsumption, waterLossPoopPerc, 2, "L", "liquid", null),
                },
            },
        },
        out: {
            poop: {
                name: 'poop',
                amount,
                value: multiply_dict_tovals(unwrap_plusminus_dict({
                    water: toval("water", null, dec("75"), 5, "L", "liquid", null),
                    carbohydrate: toval("carbohydrate", null, dec("7.03"), 5, "kg", "solid", null),
                    protein: toval("protein", null, dec("4.92"), 5, "kg", "solid", null),
                    fiber: toval("fiber", null, dec("4.69"), 5, "kg", "solid", null),
                    lipids: toval("lipids", null, dec("3.2"), 5, "kg", "solid", null),
                    nitrogen: toval("nitrogen", null, dec("1.41"), 5, "kg", "solid", null),
                }), amount),
            },
        },
    };

    addConsumesEmits(data);
    // pooping doesn't really consume water does it?
    // and if so water "consume" is already accounted for in hydration..
    data.consumes = {};
    return data;
}




function fpk_toval(fpk) {
    const newdict = {};
    for (const [key, value] of Object.entries(fpk)) {
        newdict[key] = toval(key, value.median, null, 5, value.unit, value.state, null);
    }
    return newdict;
}

const dietEurPerKcal = (diet) => {
    if (diet in food) {
        return food[diet].eur_per_kcal;
    } else if (diet in diets) {
        return diets[diet].eur_per_kcal;
    } else {
        throw "diet not found";
    }
};

const footprintFoodEating = (diet, kcal) => {
    let foodEmissions;

    // diet can be only a specific food
    if (diet in food) {
        const footprint = food[diet].footprint;
        const per_kcal_grouped = {
            consumes: {},
            emits: {},
        };

        const keys = ['consumes', 'emits'];
        for (const k of keys) {
            for (const [key, value] of Object.entries(footprint[k])) {
                per_kcal_grouped[k][key] = {
                    mean: value.per_kcal.mean,
                    median: value.per_kcal.median,
                    unit: value.unit,
                    state: value.state,
                };
            }
        }
        foodEmissions = per_kcal_grouped;
    } else if (diet in diets) {
        foodEmissions = diets[diet].footprint_per_kcal;
    }

    const data = {
        in: {
            kcalIn: {
                name: 'Kcal in',
                amount: kcal,
                value: {
                    kcal: toval("kcal", kcal, null, 2, null, null, null),
                    ...multiply_dict_tovals(fpk_toval(foodEmissions.consumes), kcal),
                },
            },
        },
        out: {
            foodEmissions: {
                name: "Food emissions",
                value: multiply_dict_tovals(
                    fpk_toval(foodEmissions.emits), kcal
                ),
            },
        },
    };
    addConsumesEmits(data);
    return data;
}







function cars_footprint() {
    // per gallon
    const data = {
        car_petrol: {
            E100: {},
            E85: {
                carbon_dioxide: 1.34,
            },
            E10: {
                carbon_dioxide: 8.02,
            },
        },
        car_diesel: {
        },
        car_lpg: {
        },
        car_electric: {
        },
        car_hydrogen: {
        },
    };
}





function cars(distance, weight, diet) {
    const data = {
        car_gasoline: {
            name: 'Car gasoline',
            speedKmh: dec("100"),
        },
        car_diesel: {
            name: 'Car diesel',
            speedKmh: dec("100"),
        },
        car_lpg: {
            name: 'Car lpg',
            speedKmh: dec("100"),
        },
        car_electric: {
            name: 'Car electric',
            speedKmh: dec("100"),
        },
        car_hydrogen: {
            name: 'Car hydrogen',
            speedKmh: dec("100"),
        },
    };

    for (const [key, value] of Object.entries(data)) {
        value.exercise = false;
        value.timeKm = timePerKm(value.speedKmh);
        value.travelTime = travelTimeHours(value.timeKm, distance);
        value.travelTimeReadable = travelTimeHoursReadable(value.travelTime);

        value.footprint = {};
        value.consumes = {};
        value.emits = {};
        value.consumesImpact = {};
        value.emitsImpact = {};
        value.impact = dec("0");
        value.ctt = dec("1");
        value.ctc = dec("1");
    }

    return data;
}

function exerciseDict(distance, weight, diet) {
    const data = {};

    for (const [key, value] of Object.entries(exercises)) {
        // skip rest
        if (key === 'rest') continue;

        const travelTime = travelTimeHours(value.timePerKm, distance);
        const kcal = value.deltaMETRest.times(weight).times(travelTime);
        const waterConsumption = kcal.div("1000");

        data[key] = {
            name: value.name,
            exercise: true,
            speedKmh: value.speed,
            met: value.met,
            timeKm: value.timePerKm.toFixed(5),
            travelTime: travelTime,
            travelTimeReadable: travelTimeHoursReadable(travelTime),
            kcal,
            footprint: {
                air: {
                    name: 'Air',
                    activity: 'Breathing',
                    ...breathing(value.airInhaledDeltaRest.times(weight).times(travelTime)),
                },
                water: {
                    name: 'Water',
                    activity: 'Hydration',
                    ...waterHydration(waterConsumption),
                },
                food: {
                    name: 'Food',
                    activity: 'Eating',
                    ...footprintFoodEating(diet, kcal),
                },
                sweat: {
                    name: 'Sweat',
                    activity: 'Sweating',
                    ...sweating(waterConsumption, dec("0.04")),
                },
                urine: {
                    name: 'Urine',
                    activity: 'Peeing',
                    ...peeing(waterConsumption, dec("0.6")),
                },
                feces: {
                    name: 'Feces',
                    activity: 'Pooping',
                    ...pooping(waterConsumption, dec("0.04")),
                },
            },
            ctt: kcal.times(dietEurPerKcal(diet)),
        };
    }

    return data;
}



export const travel = (distance, weight, diet) => {
    const impacts = [];
    const traveltimes = [];

    function time_per_km(speed_kmh) {
        return dec('60').div(speed_kmh).div(dec('60'));
    }

    const activities = {
        ...exerciseDict(distance, weight, diet),
        ...car_footprint(distance, "passenger_cars", dec("2021"), "gasoline", weight),
    };

    activities['Airplane'] = {
        name: 'Airplane',
        exercise: false,
        speedKmh: dec("1000"),
        timeKm: dec("100").toFixed(5),
        travelTime: dec("100"),
        footprint: {
        },
        ctt: dec("1").times(dec("0.005")),
    };


    for (const [activitykey, activity] of Object.entries(activities)) {
        activity.consumes = {};
        activity.emits = {};
        activity.consumesImpact = {};
        activity.emitsImpact = {};
        activity.impact = dec("0");
        activity.ctc = dec("0");

        for (const value of Object.values(activity.footprint)) {
            const keys = ["consumes", "emits"];
            for (const k of keys) {
                for (const [key, val] of Object.entries(value[k])) {
                    if (key in activity[k]) {
                        activity[k][key].amount = activity[k][key].amount.add(val.amount);
                    } else {
                        activity[k][key] = val;
                    }
                }
            }
        }

        activity.consumesConv = chemGasLtoGasKG(activity.consumes);
        activity.emitsConv = chemGasLtoGasKG(activity.emits);


        activity.consumesEq = {};
        activity.emitsEq = {};

        const keys = ["consumes", "emits"];
        for (const k of keys) {
            let carbon_eq_sum = dec("0");
            for (const [key, value] of Object.entries(activity[k + "Conv"])) {
                if (value.name in gwp) {
                    // calc equivalent
                    carbon_eq_sum = carbon_eq_sum.add(value.amount.times(gwp[value.name].gwp100));
                } else if (value.name === "carbon_eq") {
                    carbon_eq_sum = carbon_eq_sum.add(value.amount);
                } else {
                    activity[k + "Eq"][key] = value;
                }
            }
            if (carbon_eq_sum.gt(dec("0"))) {
                activity[k + "Eq"]["carbon_eq-gas-kg"] = toval("carbon_eq", carbon_eq_sum, null, 2, "kg", "gas");
            }
        }


        // activity.consumesEq = activity.consumes;
        // activity.emitsEq = activity.emits;

        // // convertToCorrectUnits
        // const removeKeys = [];
        // for (const [key, value] of Object.entries(activity.emits)) {
        //     if (value.state === 'gas' && value.unit !== 'L') {
        //         // add if possible then remove
        //     }
        // }


        // TODO actual impact calculation
        let impact = dec("0");
        const cdL = activity.emitsEq;

        // carbon_eq-gas-L to carbon_eq-solid-kg            


        if ("carbon_eq-gas-kg" in cdL && 'amount' in cdL["carbon_eq-gas-kg"])
            impact = impact.add(cdL["carbon_eq-gas-kg"].amount);
        activity.impact = impact;

        activity.rwgi = {};
        activity.rtt = {};

        impacts.push([activitykey, impact]);
        traveltimes.push([activitykey, activity.travelTime]);

        activity.ctc = impact;

        // activity.ctt = dec("2");
    }

    // calculate the RelativeWhatsGreenerImpact
    for (const [curkey, curvalue] of impacts) {
        // loop over every item except itself
        for (const [cmpkey, cmpvalue] of impacts) {
            if (cmpkey === curkey) continue;
            activities[curkey].rwgi[cmpkey] = cmpvalue.div(curvalue);
        }
    }
    // calculate the RelativeTravelTime
    for (const [curkey, curvalue] of traveltimes) {
        // loop over every item except itself
        for (const [cmpkey, cmpvalue] of traveltimes) {
            if (cmpkey === curkey) continue;
            activities[curkey].rtt[cmpkey] = cmpvalue.div(curvalue);
        }
    }

    return activities;
};



export const waterGainLossesTypical = () => {
    // based on 2.5 L/day
    return {
        in: {
            drink: toval("water", dec("1.6"), dec("64"), 2, "L", "liquid", null),
            food: toval("water", dec("0.7"), dec("28"), 2, "L", "liquid", null),
            metabolic_water: toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
        },
        out: {
            urine: toval("water", dec("1.5"), dec("60"), 2, "L", "liquid", null),
            cutaneous_transpiration: toval("water", dec("0.4"), dec("16"), 2, "L", "liquid", null),
            expired_air: toval("water", dec("0.3"), dec("12"), 2, "L", "liquid", null),
            sweat: plusminus(
                toval("water", dec("0.1"), dec("4"), 2, "L", "liquid", null),
                toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
            ),
            feces: plusminus(
                toval("water", dec("0.1"), dec("4"), 2, "L", "liquid", null),
                toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
            ),
        },
    };
};


const airPerLOxygen = dec("100").div(dec("6.15"));


export const oxygenDemandDeltaRest = (activity) => {
    return activities[activity].oxygenDemandDeltaRest;
};

export const inhaledAir = (activity) => {
    // L / h / kg
    return oxygenDemandDeltaRest(activity).times(airPerLOxygen);
};


export const breathingOxygenConsumption = (inhaledAir) => {
    return inhaledAir.times(dec("0.0615"));
};

export const breathingWaterVaporEmission = (exhaledAir) => {
    return exhaledAir.times(dec("0.0315"));
};


export function exhaledWaterVapor(inhaledAir) {
    return inhaledAir.times(dec("0.0315"));
}

export function waterLossBreathing(inhaledAir) {
    return exhaledWaterVapor(inhaledAir).times(dec("0.0007"));
}




export const waterGainLosses = (activity) => {
    const inhaled = inhaledAir(activity);
    const waterLoss = waterLossBreathing(inhaled);

    return {
        in: {
            drink: toval("water", dec("1.6"), dec("64"), 2, "L", "liquid", null),
            food: toval("water", dec("0.7"), dec("28"), 2, "L", "liquid", null),
            metabolic_water: toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
        },
        out: {
            urine: toval("water", dec("1.5"), dec("60"), 2, "L", "liquid", null),
            cutaneous_transpiration: toval("water", dec("0.4"), dec("16"), 2, "L", "liquid", null),
            expired_air: toval("water", waterLoss, null, 2, "L", "liquid", null),
            sweat: plusminus(
                toval("water", dec("0.1"), dec("4"), 2, "L", "liquid", null),
                toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
            ),
            feces: plusminus(
                toval("water", dec("0.1"), dec("4"), 2, "L", "liquid", null),
                toval("water", dec("0.2"), dec("8"), 2, "L", "liquid", null),
            ),
        },
    };
};

