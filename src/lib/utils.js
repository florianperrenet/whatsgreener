import Decimal from "decimal.js";

export const chartColors = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];
export const redColors = ["#fff5f0", "#fee0d3", "#fdc3ac", "#fca082", "#fb7c5c", "#f5553d", "#e23028", "#c2181c", "#9b0d14", "#67000d"];
export const grayColors = ["#ffffff", "#f1f1f1", "#dedede", "#c6c6c6", "#a7a7a7", "#878787", "#686868", "#474747", "#222222", "#000000"];

export const energySourceColors = {
  oil: "#4e79a7",
  coal: "#f28e2c",
  gas: "#e15759",
  nuclear: "#76b7b2",
  hydro: "#59a14f",
  wind: "#edc949",
  solar: "#af7aa1",
};

export function descendingOnKey(key) {
  return function (a, b) {
    return b[key] - a[key];
  };
}

export function descending() {
  return function (a, b) {
    return b - a;
  };
}

export function descendingOnKey2(base, key) {
  return function (a, b) {
    return b[base][key] - a[base][key];
  };
}

export function descendingOnKey3(base, key, item) {
  return function (a, b) {
    return b[base][key][item] - a[base][key][item];
  };
}


export function dec(s) {
  return new Decimal(s);
}

export function timePerKm(speed_kmh) {
  return dec('60').div(speed_kmh).div(dec('60'));
}

export function travelTimeHours(timePerKm, distance) {
  return timePerKm.times(distance);
}

export function travelTimeHoursReadable(hours) {
  const fullhours = hours.floor();
  const minutes = hours.minus(fullhours).times(dec("60")).round();

  function withS(n) {
    if (n.eq(dec("1"))) return "";
    return "s";
  }

  const minuteStr = `${minutes} minute${withS(minutes)}`;
  const hourStr = `${fullhours} hour${withS(fullhours)}`;

  let str = "";
  let hoursadded = false;
  if (fullhours.gte(dec("1"))) {
    str += hourStr;
    hoursadded = true;
  }
  if (minutes.gte(dec("1"))) {
    if (hoursadded) str += " ";
    str += minuteStr;
  }

  return str;
}

export const gwp = {
  // Major Greenhouse Gases AR6 (2021)
  // gwp100 is default
  carbon_dioxide: {
    name: "Carbon dioxide",
    formula: "CO2",
    lifetime: dec("0"),
    gwp20: dec("1"),
    gwp100: dec("1"),
    gwp500: dec("1"),
  },
  methane: {
    name: "Methane",
    formula: "CH4",
    lifetime: dec("11.8"),
    gwp20: dec("81.2"),
    gwp100: dec("27.9"),
    gwp500: dec("7.95"),
  },
  nitrous_oxide: {
    name: "Nitrous oxide",
    formula: "N2O",
    lifetime: dec("109"),
    gwp20: dec("273"),
    gwp100: dec("273"),
    gwp500: dec("130"),
  },
};


export function toval(name, amount, percentage, precision, unit, state, reference) {
  // TODO: potential idea to show increase factor from _amount to amount
  const _amount = amount;
  const _percentage = percentage;

  if (amount == null)
    amount = percentage.div(dec("100"))

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

export function addConsumesEmits(dict) {
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


export function multiply_dict_tovals(dict, factor) {
  for (const [key, value] of Object.entries(dict)) {
    dict[key].amount = value.amount.times(factor);
  }
  return dict;
}


export function unwrap_plusminus(value) {
  // TODO: if speed slow isArray vs value[0] === 'plusminus'
  if (Array.isArray(value) && value[0] === 'plusminus')
    return value[1];
  return value;
}

export function unwrap_plusminus_dict(dict) {
  for (const [key, value] of Object.entries(dict)) {
    dict[key] = unwrap_plusminus(value);
  }
  return dict;
}


export function chemGasLtoGasKG(dict) {
  const newdict = {};
  for (const [key, value] of Object.entries(dict)) {
    if (key === 'carbon_dioxide-gas-L') {
      const val = value.amount.div(dec("500"));
      if ('carbon_dioxide-gas-kg' in newdict) {
        newdict['carbon_dioxide-gas-kg'].amount = newdict['carbon_dioxide-gas-kg'].amount.add(val);
      } else {
        newdict['carbon_dioxide-gas-kg'] = toval('carbon_dioxide', val, null, 2, 'kg', 'gas', null);
      }
    } else {
      if (key in newdict) {
        newdict[key].amount = newdict[key].amount.add(value.amount);
      } else {
        newdict[key] = value;
      }
    }
  }
  return newdict;
}

export function convert_and_add_emit_score(data) {
  const impacts = [];

  for (const [key, value] of Object.entries(data)) {
    value.consumes = {};
    value.emits = {};
    value.consumesImpact = dec("0");
    value.emitsImpact = dec("0");
    value.impact = dec("0");

    value.consumesEq = {};
    value.emitsEq = {};

    for (const footprint_value of Object.values(value.footprint)) {
      const keys = ["consumes", "emits"];
      for (const k of keys) {
        for (const [footprint_value_key, footprint_value_value] of Object.entries(footprint_value[k])) {
          if (footprint_value_key in value[k]) {
            value[k][footprint_value_key].amount = value[k][footprint_value_key].amount.add(footprint_value_value.amount);
          } else {
            value[k][footprint_value_key] = footprint_value_value;
          }
        }
      }
    }

    value.consumesConv = chemGasLtoGasKG(value.consumes);
    value.emitsConv = chemGasLtoGasKG(value.emits);

    const keys = ["consumes", "emits"];
    for (const k of keys) {
      let carbon_eq_sum = dec("0");
      for (const [akey, avalue] of Object.entries(value[k + "Conv"])) {
        if (avalue.name in gwp) {
          // calc equivalent
          carbon_eq_sum = carbon_eq_sum.add(avalue.amount.times(gwp[avalue.name].gwp100));
        } else if (avalue.name === "carbon_eq") {
          carbon_eq_sum = carbon_eq_sum.add(avalue.amount);
        } else {
          value[k + "Eq"][akey] = avalue;
        }
      }
      if (carbon_eq_sum.gt(dec("0"))) {
        value[k + "Eq"]["carbon_eq-gas-kg"] = toval("carbon_eq", carbon_eq_sum, null, 2, "kg", "gas");
      }
    }

    // TODO actual impact calculation
    let impact = dec("0");
    const cdL = value.emitsEq;

    if ("carbon_eq-gas-kg" in cdL && 'amount' in cdL["carbon_eq-gas-kg"])
      impact = impact.add(cdL["carbon_eq-gas-kg"].amount);
    value.impact = impact;

    impacts.push([key, impact]);

  }





  // const impacts = [];
  // for (const [activitykey, activity] of Object.entries(data)) {
  //   activity.consumes = {};
  //   activity.emits = {};
  //   activity.consumesImpact = {};
  //   activity.emitsImpact = {};
  //   activity.impact = dec("0");
  //   activity.ctc = dec("0");

  //   for (const value of Object.values(activity.footprint)) {
  //     const keys = ["consumes", "emits"];
  //     for (const k of keys) {
  //       for (const [key, val] of Object.entries(value[k])) {
  //         if (key in activity[k]) {
  //           activity[k][key].amount = activity[k][key].amount.add(val.amount);
  //         } else {
  //           activity[k][key] = val;
  //         }
  //       }
  //     }
  //   }

  //   activity.consumesConv = chemGasLtoGasKG(activity.consumes);
  //   activity.emitsConv = chemGasLtoGasKG(activity.emits);


  //   activity.consumesEq = {};
  //   activity.emitsEq = {};

  //   const keys = ["consumes", "emits"];
  //   for (const k of keys) {
  //     let carbon_eq_sum = dec("0");
  //     for (const [key, value] of Object.entries(activity[k + "Conv"])) {
  //       if (value.name in gwp) {
  //         // calc equivalent
  //         carbon_eq_sum = carbon_eq_sum.add(value.amount.times(gwp[value.name].gwp100));
  //       } else if (value.name === "carbon_eq") {
  //         carbon_eq_sum = carbon_eq_sum.add(value.amount);
  //       } else {
  //         activity[k + "Eq"][key] = value;
  //       }
  //     }
  //     if (carbon_eq_sum.gt(dec("0"))) {
  //       activity[k + "Eq"]["carbon_eq-gas-kg"] = toval("carbon_eq", carbon_eq_sum, null, 2, "kg", "gas");
  //     }
  //   }

  //   // TODO actual impact calculation
  //   let impact = dec("0");
  //   const cdL = activity.emitsEq;

  //   if ("carbon_eq-gas-kg" in cdL && 'amount' in cdL["carbon_eq-gas-kg"])
  //     impact = impact.add(cdL["carbon_eq-gas-kg"].amount);
  //   activity.impact = impact;

  //   impacts.push([activitykey, impact]);
  // }
}