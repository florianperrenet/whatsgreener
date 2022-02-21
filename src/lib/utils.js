import Decimal from "decimal.js";

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
