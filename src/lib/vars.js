import { data } from 'autoprefixer';
import Decimal from 'decimal.js';

function dec(s) {
    return new Decimal(s);
}

function timePerKm(speed_kmh) {
    return dec('60').div(speed_kmh).div(dec('60'));
}

function plusminus_fmt_perc(l) {
    return `${l[0]}% ± ${l[1]}%`;
}
function plusminus_fmt(l) {
    return `${l[0]} ± ${l[1]}`;
}


function toval(name, amount, percentage, precision, unit, state, reference) {
    // TODO: potential idea to show increase factor from _amount to amount
    const _amount = amount;
    const _percentage = percentage;

    if (percentage == null) {
        // amount = percentage;
        // percentage = dec("100");
    }
    else if (amount == null) {
        amount = percentage.div(dec("100"));
    } else {
        throw "percentage and amount cannot both be null";
    }

    return {
        _amount,  // original value
        _percentage,  // original value
        id: `${name}-${state}-${unit}`,
        name,
        amount,
        finalPrecision: precision,
        unit,
        state,
        reference,
    }
}



const BANANA_WEIGHT = dec("100");
const APPLE_WEIGHT = dec("150");

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

export const chemicalFormulas = {
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
for (const value of Object.values(chemicalFormulas)) {
    value.formula_chem = `\\ce{${value.formula}}`;
}


export const food = (() => {
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.6"),
                        median: dec("1.3"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.9"),
                        median: dec("2.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("648"),
                        median: dec("419"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("33386"),
                        median: dec("12822"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("7.2"),
                        median: dec("5.4"),
                    },
                },
            },
        },
        "maize": {
            name: "maize",
            type: "other",
            unit: "g",
            composition: {
                per_100g: {
                    kcal: dec("356"),
                    protein: dec("9.5"),
                    fat: dec("4.3"),
                },
            },
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.7"),
                        median: dec("1.2"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.9"),
                        median: dec("1.8"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("216"),
                        median: dec("44"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("10863"),
                        median: dec("350"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("4"),
                        median: dec("2.4"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.5"),
                        median: dec("2.6"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("7.6"),
                        median: dec("7.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("482"),
                        median: dec("670"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("18786"),
                        median: dec("24456"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("11.2"),
                        median: dec("10.1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("4.5"),
                        median: dec("3.7"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.8"),
                        median: dec("2.2"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2248"),
                        median: dec("1575"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("49576"),
                        median: dec("4626"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("35.1"),
                        median: dec("9.3"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.5"),
                        median: dec("0.5"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.9"),
                        median: dec("0.8"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("59"),
                        median: dec("3"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2754"),
                        median: dec("78"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.5"),
                        median: dec("4.4"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1"),
                        median: dec("0.8"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("7.5"),
                        median: dec("6.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("397"),
                        median: dec("0"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("27948"),
                        median: dec("0"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("7.5"),
                        median: dec("1.7"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.4"),
                        median: dec("-1.3"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("13"),
                        median: dec("8.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("4134"),
                        median: dec("1823"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("229890"),
                        median: dec("129364"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("19.2"),
                        median: dec("14.5"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.2"),
                        median: dec("3.3"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("9.1"),
                        median: dec("7.9"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1852"),
                        median: dec("900"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("61798"),
                        median: dec("44352"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("14.1"),
                        median: dec("17.1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1"),
                        median: dec("0.9"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.7"),
                        median: dec("0.6"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("28"),
                        median: dec("1"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("956"),
                        median: dec("6"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.1"),
                        median: dec("1.2"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.2"),
                        median: dec("2.6"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.5"),
                        median: dec("3.4"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("149"),
                        median: dec("7"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("5113"),
                        median: dec("32"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("6.2"),
                        median: dec("6.6"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("5.4"),
                        median: dec("5.1"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("26.3"),
                        median: dec("17.3"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2142"),
                        median: dec("318"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("177480"),
                        median: dec("24396"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("37.3"),
                        median: dec("39.1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.1"),
                        median: dec("0.7"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.8"),
                        median: dec("0.2"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("370"),
                        median: dec("77"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("5336"),
                        median: dec("4481"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("7.5"),
                        median: dec("1.9"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.5"),
                        median: dec("0.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.4"),
                        median: dec("0.3"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("14"),
                        median: dec("2"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("932"),
                        median: dec("57"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.2"),
                        median: dec("1.6"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.4"),
                        median: dec("0.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.3"),
                        median: dec("0.3"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("28"),
                        median: dec("10"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("929"),
                        median: dec("38"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.6"),
                        median: dec("1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.5"),
                        median: dec("0.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.6"),
                        median: dec("0.3"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("119"),
                        median: dec("55"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("8455"),
                        median: dec("2483"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("5"),
                        median: dec("5.7"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.4"),
                        median: dec("0.3"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.9"),
                        median: dec("0.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("83"),
                        median: dec("37"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("4663"),
                        median: dec("1346"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.2"),
                        median: dec("1.7"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.9"),
                        median: dec("0.8"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.9"),
                        median: dec("1.4"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("115"),
                        median: dec("1"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("662"),
                        median: dec("31"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.3"),
                        median: dec("2.1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.4"),
                        median: dec("0.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("0.6"),
                        median: dec("0.5"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("180"),
                        median: dec("115"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("12949"),
                        median: dec("1025"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.5"),
                        median: dec("2"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1.5"),
                        median: dec("1.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("2.4"),
                        median: dec("2.6"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("420"),
                        median: dec("404"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("21162"),
                        median: dec("16245"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("6.1"),
                        median: dec("1"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("99.5"),
                        median: dec("60.4"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("326.2"),
                        median: dec("170.4"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1451"),
                        median: dec("740"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("34733"),
                        median: dec("441"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("301.4"),
                        median: dec("320.7"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("39.7"),
                        median: dec("40.6"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("369.8"),
                        median: dec("127.4"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1803"),
                        median: dec("461"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("141925"),
                        median: dec("259"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("97.1"),
                        median: dec("101.9"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("12.3"),
                        median: dec("10.6"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("17.4"),
                        median: dec("13.4"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("1796"),
                        median: dec("1810"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("66867"),
                        median: dec("54243"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("76.4"),
                        median: dec("53.5"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("9.9"),
                        median: dec("7.5"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("12.2"),
                        median: dec("11"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("660"),
                        median: dec("370"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("14178"),
                        median: dec("334"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("48.7"),
                        median: dec("34.5"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3.2"),
                        median: dec("2.7"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("9"),
                        median: dec("2.1"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("628"),
                        median: dec("197"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("19786"),
                        median: dec("9776"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("10.7"),
                        median: dec("10.7"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("23.9"),
                        median: dec("18.6"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("87.8"),
                        median: dec("20.2"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("5605"),
                        median: dec("1559"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("180851"),
                        median: dec("80463"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("98.4"),
                        median: dec("99.5"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("4.7"),
                        median: dec("4.2"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("6.3"),
                        median: dec("5.7"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("578"),
                        median: dec("633"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("17983"),
                        median: dec("18621"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("21.8"),
                        median: dec("21.3"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("13.6"),
                        median: dec("7.9"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("8.4"),
                        median: dec("5.6"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3691"),
                        median: dec("1581"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("41572"),
                        median: dec("8483"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("235.1"),
                        median: dec("243.6"),
                    },
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
            footprint: {
                carbon_dioxide: {
                    unit: "kg",
                    state: "gas",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("26.9"),
                        median: dec("14.7"),
                    },
                },
                land_use: {
                    unit: "m2",
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3"),
                        median: dec("0.8"),
                    },
                },
                water_use: {
                    unit: "L",
                    state: "liquid",
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("3515"),
                        median: dec("1208"),
                    },
                },
                weighted_water_use: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("127259"),
                        median: dec("48738"),
                    },
                },
                water_pollution: {
                    unit: null,
                    state: null,
                    per_kcal: {},
                    per_protein: {},
                    per_kg: {
                        mean: dec("227.2"),
                        median: dec("141.3"),
                    },
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
        // add footprint per_g
        // add footprint per_kcal
        for (const [k, v] of Object.entries(value.footprint)) {
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

    return data;
})();


export const food_table = (() => {
    let columns = [
        "Food", "Calories", "Protein", "Fat",
    ];
    let rows = [];

    // let add_cols = true;
    // for (const value of Object.values(food)) {
    //     const footprint_vals = [];
    //     for (const [fpkey, fpval] of Object.entries(value.footprint)) {
    //         footprint_vals.push(fpval.per_kg.median);
    //         if (add_cols) {
    //             columns.push(fpkey);
    //         }
    //     }

    //     add_cols = false;

    //     rows.push([
    //         value.name,
    //         value.composition.per_100g.kcal,
    //         value.composition.per_100g.protein,
    //         value.composition.per_100g.fat,
    //         ...footprint_vals,
    //     ]);
    // }
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
        meat: {
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
        fish: {
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
        value.footprint_per_kcal = {};

        // calc percentage
        for (const [k, v] of Object.entries(value.grouped)) {
            v.percentage = v.kcal.div(value.kcalsum);

            const product = food[k];
            for (const [x, y] of Object.entries(product.footprint)) {
                if (x in value.footprint_per_kcal) {
                    value.footprint_per_kcal[x].mean = value.footprint_per_kcal[x].mean.add(product.footprint[x].per_kcal.mean.times(v.percentage));
                    value.footprint_per_kcal[x].median = value.footprint_per_kcal[x].median.add(product.footprint[x].per_kcal.median.times(v.percentage));
                } else {
                    value.footprint_per_kcal[x] = {
                        mean: product.footprint[x].per_kcal.mean.times(v.percentage),
                        median: product.footprint[x].per_kcal.median.times(v.percentage),
                        unit: product.footprint[x].unit,
                        state: product.footprint[x].state,
                    };
                }

            }
        }
    }

    return data;
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
    const columns = ["Parameter", "Mean", "Median"];
    const data = {};

    for (const [diet, dietvalue] of Object.entries(diets)) {
        data[diet] = [];
        for (const [key, value] of Object.entries(dietvalue.footprint_per_kcal)) {
            data[diet].push([
                key,
                (value.mean.times(dec("1000"))).toFixed(2),
                (value.median.times(dec("1000"))).toFixed(2),
            ]);
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
            water_vapor: plusminus(
                toval("water_vapor", null, dec("2.5"), 5, "L", 'gas'),
                toval("water_vapor", null, dec("2.5"), 5, "L", 'gas'),
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
            water_vapor: plusminus(
                toval("water_vapor", null, dec("5.65"), 5, "L", 'gas'),
                toval("water_vapor", null, dec("0.65"), 5, "L", 'gas'),
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
    // const atmosphericKeys = Object.keys(air_composition.atmospheric);
    // const exhaledKeys = Object.keys(air_composition.exhaled);
    // if (atmosphericKeys !== exhaledKeys)
    //     throw "expected to be equal";
    // for (const key of row_keys) {
    //     rows.push([
    //         key,
    //         air_composition.atmospheric[key],
    //         air_composition.exhaled[key],
    //     ]);
    // }
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

function multiply_dict_tovals(dict, factor) {
    for (const [key, value] of Object.entries(dict)) {
        dict[key].amount = value.amount.times(factor);
    }
    return dict;
}


function unwrap_plusminus(value) {
    // TODO: if speed slow isArray vs value[0] === 'plusminus'
    if (Array.isArray(value) && value[0] === 'plusminus')
        return value[1];
    return value;
}

function unwrap_plusminus_dict(dict) {
    for (const [key, value] of Object.entries(dict)) {
        dict[key] = unwrap_plusminus(value);
    }
    return dict;
}


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

function addConsumesEmits(dict) {
    const diff = {};
    const compareKeys = ["in", "out"];
    for (const compareKey of compareKeys) {
        for (const content of Object.values(dict[compareKey])) {
            for (const value of Object.values(content.value)) {
                if (value.id in diff)
                    diff[value.id].amount = diff[value.id].amount.minus(value.amount);
                else {
                    let val = value;
                    if (compareKey === "out")
                        val.amount = val.amount.times(dec("-1"));

                    // original values no longer matter so set to null
                    val._amount = null;
                    val._percentage = null;
                    diff[value.id] = val;
                }
            }
        }
    }

    const consumes = {};
    const emits = {};
    for (const [key, value] of Object.entries(diff)) {
        if (value.amount.gt(dec("0"))) {
            consumes[key] = value;
        } else if (value.amount.lt(dec("0"))) {
            value.amount = value.amount.times(dec("-1"));
            emits[key] = value;
        }
    }

    dict.consumes = consumes;
    dict.emits = emits;
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


function fpk_toval(fpk) {
    const newdict = {};
    for (const [key, value] of Object.entries(fpk)) {
        newdict[key] = toval(key, value.median, null, 5, value.unit, value.state, null);
    }

    return newdict;
}

const footprintFoodEating = (diet, kcal) => {
    let foodEmissions;

    // diet can be only a specific food
    if (diet in food) {
        const footprint = food[diet].footprint;
        const per_kcal_grouped = {};
        for (const [key, value] of Object.entries(footprint)) {
            per_kcal_grouped[key] = {
                mean: value.per_kcal.mean,
                median: value.per_kcal.median,
                unit: value.unit,
                state: value.state,
            };
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
                },
            },
        },
        out: {
            foodEmissions: {
                name: "Food emissions",
                value: multiply_dict_tovals(
                    fpk_toval(foodEmissions), kcal
                ),
            },
        },
    };
    addConsumesEmits(data);
    return data;
}


export const travel = (distance, weight, diet) => {
    function time_per_km(speed_kmh) {
        return dec('60').div(speed_kmh).div(dec('60'));
    }

    // const travel_time = exercises.walkingSlow.timePerKm * distance;
    const activities = {
        // walking: {
        //     name: 'Walking',
        //     exercise: true,
        //     distance,
        //     weight,
        //     diet,

        //     speed_kmh: exercises.walkingSlow.speed,
        //     time_km: exercises.walkingSlow.timePerKm.toFixed(5),

        //     // generate
        //     travel_time: (exercises.walkingSlow.timePerKm * distance).toFixed(2),

        //     footprint: {
        //         air: {
        //             name: 'Air',
        //             activity: 'Breathing',
        //             ...breathing(exercises.walkingSlow.airInhaledDeltaRest.times(weight).times(travel_time)),
        //         },
        //     },

        //     consumes: {/* auto calc */ },
        //     emits: {/* auto calc */ },

        //     consumes_impact: /* auto calc */ null,
        //     emits_impact: /* auto calc */ null,
        //     impact: /* auto calc */ null,
        // }
    };

    for (const [exercise_type, exercise_value] of Object.entries(exercises)) {
        // skip rest
        if (exercise_type === 'rest') continue;

        const travelTime = exercise_value.timePerKm.times(distance);
        const kcal = exercise_value.deltaMETRest.times(weight).times(travelTime);
        const waterConsumption = kcal.div("1000");

        activities[exercise_type] = {
            name: exercise_value.name,
            exercise: true,
            speedKmh: exercise_value.speed,
            met: exercise_value.met,
            timeKm: exercise_value.timePerKm.toFixed(5),
            travelTime: (travelTime).toFixed(2),
            kcal,
            footprint: {
                air: {
                    name: 'Air',
                    activity: 'Breathing',
                    ...breathing(exercise_value.airInhaledDeltaRest.times(weight).times(travelTime)),
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
            },
            consumes: {},  // calc is below
            emits: {},  // calc is below
            consumesImpact: {},  // calc is below
            emitsImpact: {},  // calc is below
            impact: 0,  // calc is below
        };
    }


    for (const activity of Object.values(activities)) {
        for (const value of Object.values(activity.footprint)) {
            const keys = ["consumes", "emits"];
            for (const k of keys) {
                for (const [key, val] of Object.entries(value[k])) {
                    if (key in activity[k]) {
                        activity[k][key].amount = activity[k][key].amount.add(val);
                    } else {
                        activity[k][key] = val;
                    }
                }
            }
        }
    }

    return activities;
};







