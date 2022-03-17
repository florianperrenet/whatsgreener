import { energy_source_proven_reserves } from "$lib/energy/energy";
import { dec } from "$lib/utils"

export const earth_resources = (() => {
  const data = {
    oil: {
      proven_reserves: energy_source_proven_reserves.oil,
      unit: 'thousand million tonnes',
      used: dec('182241').div('1000'),
      use_rate: dec('4017.5').div('1000'),  // million tonnes
      regain_rate: undefined,
      left: undefined,
    },
    gas: {
      proven_reserves: energy_source_proven_reserves.gas,
      unit: 'trillion cubic meters',
      used: dec('118471').div(1000),
      use_rate: dec('3822.8').div('1000'),  // billion cubic meters
      regain_rate: undefined,
      left: undefined,
    },
    coal: {
      proven_reserves: energy_source_proven_reserves.coal,
      unit: 'million tonnes',
      used: dec('5705').times('1_000_000_000_000').div('29.3').div(1000_000_000),
      use_rate: dec('151.42').times('1_000_000_000_000').div('29.3').div(1000_000_000),  // exajoules
      regain_rate: undefined,
      left: undefined,
    },
    cobalt: {
      proven_reserves: energy_source_proven_reserves.cobalt,
      unit: 'thousand tonnes',
      used: undefined,
      use_rate: dec('127.7'),
      regain_rate: undefined,
      left: undefined,
    },
    lithium: {
      proven_reserves: energy_source_proven_reserves.lithium,
      unit: 'thousand tonnes',
      used: undefined,
      use_rate: dec('86.3'),
      regain_rate: undefined,
      left: undefined,
    },
    uranium: {
      proven_reserves: energy_source_proven_reserves.uranium,
      unit: 'million tonnes',
      used: undefined,
      use_rate: dec('66500').div('1000000'),  // tonnes https://en.wikipedia.org/wiki/Peak_uranium
      regain_rate: undefined,
      left: undefined,
    },
    graphite: {
      proven_reserves: energy_source_proven_reserves.graphite,
      unit: 'thousand tonnes',
      used: undefined,
      use_rate: dec('906.7'),
      regain_rate: undefined,
      left: undefined,
    },

    // https://pubs.usgs.gov/periodicals/mcs2020/mcs2020-silver.pdf
    // https://www.silverinstitute.org/silver-supply-demand/
    // https://www.usmoneyreserve.com/blog/how-much-silver-is-in-the-world/#:~:text=How%20Much%20Silver%20Is%20Left,Russia's%20(45%2C000%20metric%20tons).
    silver: {
      proven_reserves: dec('560_000'),  // tonnes
      unit: 'tonnes',
      used: dec('1_740_000'),
      use_rate: dec('27000'),
      regain_rate: undefined,
      left: undefined,
    },
    // https://lisbdnet.com/when-will-we-run-out-of-metal/
    gold: {
      proven_reserves: dec('54_000'),  // tonnes
      unit: 'tonnes',
      used: dec('190_000'),
      use_rate: dec('1800'),
      regain_rate: undefined,
      left: undefined,
    },

    // https://www.freeingenergy.com/do-we-have-enough-materials-to-make-the-solar-panels-needed-for-a-clean-energy-future/
    // https://en.wikipedia.org/wiki/Peak_copper
    copper: {
      proven_reserves: dec('2_000_000_000'),  // tonnes
      unit: 'tonnes',
      used: undefined,
      use_rate: dec('20_000_000'),
      regain_rate: undefined,
      left: undefined,
    },

    // https://en.wikipedia.org/wiki/List_of_countries_by_silicon_production
    // https://www.usgs.gov/centers/national-minerals-information-center/silicon-statistics-and-information
    // https://pubs.usgs.gov/periodicals/mcs2021/mcs2021-silicon.pdf
    silicon: {
      proven_reserves: dec('0'),  // tonnes
      unit: 'tonnes',
      used: undefined,
      use_rate: dec('0'),
      regain_rate: undefined,
      left: undefined,
    },

    // https://pubs.usgs.gov/periodicals/mcs2022/mcs2022.pdf
    // aluminum
    bauxite: {
      proven_reserves: dec('55_000_000_000'),  // tonnes
      unit: 'tonnes',
      used: undefined,
      use_rate: dec('0'),
      regain_rate: undefined,
      left: undefined,
    },

    solar: {
      proven_reserves: dec('0'),
      unit: '? year',
      used: undefined,
      use_rate: dec('0'),
      regain_rate: undefined,
      left: undefined,
    },
    wind: {
      proven_reserves: dec('0'),
      unit: '? year',
      used: undefined,
      use_rate: dec('0'),
      regain_rate: undefined,
      left: undefined,
    },
  };

  for (const [key, value] of Object.entries(data)) {
    value.time_till_depletion = value.proven_reserves.div(value.use_rate);
    value.time_till_depletion_readable = value.time_till_depletion.toFixed(0);
  }

  return data;
})();