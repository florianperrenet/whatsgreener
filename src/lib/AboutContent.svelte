<script>
  import Cite from "$lib/Cite.svelte";
  import Katex from "$lib/Katex.svelte";
  import Table from "$lib/Table.svelte";
  import { bibliography } from "$lib/bib";
  import {
    food,
    food_table,
    diets,
    exercises,
    exercises_air_usage_table,
    diets_table,
    diets_distribution_table,
    breathing,
    diets_footprint_table,
    exercises_table,
    airCompositionTable,
    waterGainLossesTypical,
  } from "$lib/vars";

  import katex from "katex";
  import "katex/dist/contrib/mhchem.js";

  import { dec } from "$lib/utils";

  function chem(s) {
    return katex.renderToString(`\\ce{${s}}`, {
      displayMode: false,
      throwOnError: false,
    });
  }
  function math(s, align) {
    return katex.renderToString(s, {
      displayMode: true,
      fleqn: align === "left",
      throwOnError: false,
    });
  }
  function inlinemath(s) {
    return katex.renderToString(s, {
      displayMode: false,
      throwOnError: false,
    });
  }
</script>

<div class="text-4xl font-extrabold text-slate-900">Calculations</div>

<!-- <hr /> -->
<h2>Introduction</h2>
<p>
  Impactful decisions are made daily for transportation and food consumption
  with no proper insight of their implications. Sometimes <Katex ce="CO2" />
  data is provided, but that only shows a fraction of the environmental impact. To
  make a proper decision
  <u>everything needs to be taken into the equation</u>.
</p>
<p>
  Data used for this comparison tool is referenced from best possible sources
  and is checked with common sense. There is no intention to misinform or to
  push a certain bias. The goal is to be as true and as informative as possible.
</p>
<p>
  If you find a mistake or see an improvement, please let me know by <a
    href="mailto:florian@whatsgreener.xyz">email</a
  >, via
  <a href="https://community.whatsgreener.xyz" target="_blank">community chat</a
  >
  or edit directly on
  <a href="https://github.com/florianperrenet/whatsgreener" target="_blank"
    >github</a
  >.
</p>

<!-- <h3>Thoughts</h3>
  <p>usage / km production costs usage + production costs</p> -->
<hr />
<h2>Quick deepdive</h2>

<h3>Factors to take into account</h3>
<ul>
  <li>In</li>
  <li>Outs</li>
  <li>Product lifetime</li>
  <li>Reusability (recycling)</li>
  <li>Scalability</li>
  <li>Dependence of other countries</li>
  <li>Work environment</li>
  <li>Sustainability how long can we sustain this model</li>
  <li>Scarcity of resources used</li>
  <ul>
    <li>What has already been used</li>
    <li>What is left</li>
  </ul>
  <li>Pollution</li>
  <ul>
    <li>Waste Problem</li>
    <ul>
      <li>Amount of waste</li>
      <li>Waste Pollution</li>
    </ul>
  </ul>
  <li>Other Pros</li>
  <li>Other Cons</li>
</ul>

<h3>Non-greenhouse gases</h3>
<p>
  Nitrogen {@html chem("N2")}, Oxygen {@html chem("O2")} and Argon {@html chem(
    "Ar"
  )} are not greenhouse gases because molecules containing two atoms of the same
  element such as {@html chem("N2")} and {@html chem("O2")} have no net change in
  the distribution of their electrical charges when they vibrate, and monatomic gases
  such as {@html chem("Ar")} do not have vibrational modes. Hence they are almost
  totally unaffected by infrared radiation. Some molecules containing just two atoms
  of different elements, such as carbon monoxide {@html chem("CO")} and hydrogen
  chloride {@html chem("HCl")}, do absorb infrared radiation.
</p>

<h3>Greenhouse gases</h3>
<p>
  A greenhouse gas (GHG) is a gas that absorbs and emits radiant energy within
  the thermal infrared range, causing the greenhouse effect <Cite
    to="wikipedia-greenhouse_gas"
  />. Most common greenhouse gases are <Cite
    to="wikipedia-greenhouse_gas_most_abundant"
  />:
</p>

<ul>
  <li>Water vapor, {@html chem("H2O")}</li>
  <li>Carbon dioxide, {@html chem("CO2")}</li>
  <li>Methane, {@html chem("CH4")}</li>
  <li>Nitrous oxide, {@html chem("N2O")}</li>
</ul>

<p>
  But the abundance does not say anything about the environmental impact of a
  particular gas. In order to compare we look at their Global warming potential.
</p>

<h3>Global warming potential (GWP)</h3>
<!-- 1740 page number 1842 table 1483 water vapor ar5 vergelijken met ar6 kan ar5
  wel gequote worden? -->
<p>
  The contribution of each gas to the greenhouse effect is determined by the
  characteristics of that gas, its abundance, and any indirect effects it may
  cause. For example, the direct radiative effect of a mass of methane is about
  81 times stronger than the same mass of carbon dioxide over a 20-year time
  frame. <Cite to="wikipedia-greenhouse_gas_impacts" />
</p>
<p>
  To compare the gases, their {@html chem("CO2eq")} is calculated for different timeframes.
  Paris Rulebook suggests to use 100-year time-horizon GWP values. <!-- page 282. -->
  Which will be used as default in comparisons.
</p>

<Table
  grid={{
    align: "lrrrr",
    columns: ["Name", "Lifetime (yr)", "GWP 20", "GWP 100", "GWP 500"],
    rows: [
      ["Carbon dioxide, CO2", "-", 1, 1, 1],
      ["Methane, CH4", 11.8, 81.2, 27.9, 7.95],
      ["Nitrous oxide, N2O", 109, 273, 273, 130],
      "... Other",
    ],
  }}
  label="table:major_greenhouse_gases"
  bordered
  full>Major Greenhouse Gases AR6 (2021).</Table
>

<p>
  Carbon dioxide has a variable atmospheric lifetime, and cannot be specified
  precisely. Although more than half of the {@html chem("CO2")} emitted is removed
  from the atmosphere within a century, some fraction (about 20%) of emitted {@html chem(
    "CO2"
  )} remains in the atmosphere for many thousands of years <Cite
    to="wikipedia-greenhouse_gas_atmospheric_lifetime"
  />.
</p>

<!-- https://en.wikipedia.org/wiki/Global_warming_potential#Water_vapour -->
<h4>Water vapor</h4>
<p>
  Water vapour does contribute to anthropogenic global warming, but as the GWP
  is defined, it is negligible for H2O.
</p>
<p>
  H2O is the strongest greenhouse gas, because it has a profound infrared
  absorption spectrum with more and broader absorption bands than CO2. Its
  concentration in the atmosphere is limited by air temperature, so that
  radiative forcing by water vapour increases with global warming (positive
  feedback). But the GWP definition excludes indirect effects. GWP definition is
  also based on emissions, and anthropogenic emissions of water vapour (cooling
  towers, irrigation) are removed via precipitation within weeks, so its GWP is
  negligible.
</p>

<h4>GWP over GTP</h4>
<p>
  The Global Temperature change Potential (GTP) is another way to compare gases.
  While GWP estimates heat absorbed, GTP estimates the resulting rise in average
  surface temperature of the world, over the next 20, 50 or 100 years, caused by
  a greenhouse gas, relative to the temperature rise which the same mass of CO2
  would cause.[5] Calculation of GTP requires modeling how the world, especially
  the oceans, will absorb heat.[17] GTP is published in the same IPCC tables
  with GWP.[5]
</p>
<p>
  GWP* has been proposed to take better account of short-lived climate
  pollutants (SLCP) such as methane, relating a change in the rate of emissions
  of SLCPs to a fixed quantity of CO2.
</p>

<h3>Water</h3>
<p>
  There are three types of water footprints. <Cite
    to="waterfootprint-waterfootprint"
  />
</p>

<h4>Green water footprint</h4>
<p>
  Is water from precipitation that is stored in the root zone of the soil and
  evaporated, transpired or incorporated by plants. It is particularly relevant
  for agricultural, horticultural and forestry products.
</p>

<h4>Blue water footprint</h4>
<p>
  Is water that has been sourced from surface or groundwater resources and is
  either evaporated, incorporated into a product or taken from one body of water
  and returned to another, or returned at a different time. Irrigated
  agriculture, industry and domestic water use can each have a blue water
  footprint.
</p>

<h4>Grey water footprint</h4>
<p>
  Is the amount of fresh water required to assimilate pollutants to meet
  specific water quality standards. The grey water footprint considers
  point-source pollution discharged to a freshwater resource directly through a
  pipe or indirectly through runoff or leaching from the soil, impervious
  surfaces, or other diffuse sources.
</p>

<p>
  <strong>(Fresh?) water footprint</strong>
</p>

<h3>Water vapor</h3>
<p>
  It's not in GWP but what to do with it instead? Needs at least some scoring.
</p>

<hr />

<h2>Energy</h2>

<h3>Oil</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Coal</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Natural gas</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Nuclear</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Hydro</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Wind</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Solar</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Geothermal</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Tide/Wave/Ocean</h3>
<h4>Combustion</h4>
<p>Text</p>
<h3>Biofuels and waste</h3>
<h4>Combustion</h4>
<p>Text</p>

<hr />

<h2>Travel</h2>

<h3>Constants</h3>
<div class="text-sm">
  {@html math("\\textup{atmosphericTemperature (℃) = 20}", "left")}
  {@html math("\\textup{bodyTemperature (℃) = 37}", "left")}
</div>

<h3>Variables</h3>
<div class="text-sm">
  {@html math("\\textup{bodyWeight (kg) = 70}", "left")}
</div>

<h3>Exercise (Walking, Jogging, Cycling)</h3>
<p>
  Exercise is based on excess energy expenditure i.e. exercise is compared to
  being at rest (sitting).
</p>

<div id="ref-met" />
<div class="text-sm">
  {@html math(
    "\\textup{MET (metabolic equivalent of task)} = \\textup{kcal/kg/h}"
  )}
  {@html math("\\textup{mL Oxygen/kg/min} = \\textup{MET} \\cdot 3.5")}
  {@html math(
    "\\textup{oxygenDemand = L Oxygen/kg/hour} = \\textup{MET} \\cdot 3.5 / 1000 \\cdot 60"
  )}
  {@html math(
    "\\textup{deltaRest} = \\textup{oxygenDemand}(activity) - \\textup{oxygenDemand}(rest)"
  )}
</div>

<Table grid={exercises_table} label="table:energy_oxygen_usage" full
  >METs <Cite to="runningtools-energy_usage" /> and Oxygen demands <Cite
    to="wikipedia-oxygen_usage"
  />.</Table
>

<!-- plusminus &#177; -->
<!-- celcius &#8451; -->

<h4>Eating</h4>
<p>todo: body efficiency</p>
<p>food that goes in ref Food heading</p>
<div class="text-sm">
  {@html math(
    "\\textup{kcalBurned = MET} \\cdot \\textup{bodyWeight} \\cdot \\textup{hours}"
  )}
  {@html math("\\textup{1 calorie = 4.1868 J}")}
  {@html math("\\textup{1 Calorie = 1000 calories}")}
  {@html math("\\textup{heatProduction = kcalBurned } \\cdot 4186.8")}
</div>

<pre>
  {@html JSON.stringify(
    {
      in: {
        food: "kcal",
      },
      out: {
        heat: "heat",
        foodFootprint: "obj",
      },
    },
    null,
    2
  )}
</pre>

<h4>Hydrating</h4>
<p>Water consumption is about 1 L / 1000 kcal [14].</p>

<p>Based on 2500 mL/day</p>
<pre>
  {@html JSON.stringify(waterGainLossesTypical(), null, 2)}
</pre>
<p>Typical daily water gains and losses. <Cite to="quora-water_loss" /></p>

<p>
  Maar grote oorzaak kan zijn door de 3.15% water vapor difference (die
  eigenlijk gewoon stiekem 5% kan zijn!).
</p>

<p>Water consumption at rest mL/day</p>
<pre>
  {@html JSON.stringify(waterGainLossesTypical(), null, 2)}
</pre>
<p>Data based Water gains and losses.</p>

<p>
  Above values are approximations. During exercise values for ’Sweat’ and ’Ex-
  pired air’ are higher. Value for ’Expired air’ can be used from previous
  calculations. Which is quite similar to above (calculatie).
</p>

<div>waterConsumption (L) = excessKcal/1000</div>
<div>waterGainDrink (L) = waterConsumption ·64%</div>
<div>waterGainFood (L) = waterConsumption ·28%</div>
<div>waterGainMetabolicWater (L) = waterConsumption ·8%</div>
<div>waterLossUrine (L) = waterConsumption ·60%</div>
<div>waterLossCutaneousTranspiration (L) = waterConsumption ·16%</div>
<div>waterLossBreathing (L) = waterLossBreathing3</div>
<div>waterLossFeces (L) = waterConsumption ·8%</div>
<div>waterLossSweat (L) = iets</div>

<!-- footnotes -->
<p>
  24h air usage at rest with 70kg is 3.55 ·70 ·24 = 5964 L. Daily water loss
  from breathing would be waterLossBreathing(5964) = 0.146118 L. Which is
  somewhat similar to 300 mL from Table 8. The difference may come from that we
  used being at rest for 24h, and they may have used a slighty higher daily
  activity.
</p>

<pre>
  {@html JSON.stringify(
    {
      in: {
        drink: "water amount",
        food: "water amount",
        metabolic_water: "water amount",
      },
      out: {
        urine: "water amount",
        cutaneous_transpiration: "water amount",
        expired_air: "water amount",
        sweat: "water amount",
        feces: "water amount",
      },
    },
    null,
    2
  )}
</pre>

<h4>Breathing</h4>
<!-- <p>respiratory (air breathing) is meestal 300 mL per dag.</p> -->

<Table
  grid={airCompositionTable}
  label="table:composition_of_air_by_volume"
  full>Composition of Air by volume.</Table
>

<!-- <pre>{JSON.stringify(breathing(dec("1")), null, 2)}</pre> -->

<div class="text-sm">
  {@html math(
    "\\textup{breathingOxygenConsumption(inhaledAir) = inhaledAir} \\cdot 0.0615"
  )}
  {@html math(
    "\\textup{breathingWaterVaporEmission(exhaledAir) = exhaledAir} \\cdot 0.0315"
  )}
</div>

<p>
  <strong>Liquid water loss from breathing.</strong>
  Inhaled air is warmed and moistened by the wet, warm nasal mucosa, which consequently
  cools and dries [9]. So, how much liquid water is lost to create the expired water
  vapor?
</p>
<p>
  Water vapor as an ideal gas at atmospheric temperature (20°C) 2 = 0.025
  m3/mol. 1 m3 H2O (g) -¿ mol 1 / 0.025 = 40 mol. 40 mol water is in 1 m3 water
  vapor. 40 * 18.015 = 720.6 g. So 1000 liters water vapor contains 720.6 g
  water = ≈0.7206 L water. Which is equivelant to 0.07%
</p>

exhaledWaterVapor(inhaledAir) = inhaledAir ·0.0315
waterLossBreathing(inhaledAir) = exhaledWaterVapor(inhaledAir) ·0.0007

<!-- footnotes (as tooltip instead?) -->
No good source with composition of atmospheric humid air was not found. Calculations
use 2.5% water vapor for simplicity.2Ideal gas law was applied using the atmospheric
temperature (20°C) instead of the exhaled air temperature (37°C) for simplicity.
The difference could be 10%.

<p>
  <strong>Air usage.</strong>
  As seen in Table 9 ‘Oxygen usage’ from breathing is 6.15%. We know the ‘Oxygen
  demand’ for activies from Table 3. Combining these we can calculate the ‘Air usage’
  (L/h/kg) for an activity.
</p>

<div class="text-sm">
  {@html math("\\textup{oxygenUsage = 6.15}")}
  {@html math("\\textup{airPerLOxygen = 100/oxygenUsage}")}
  {@html math(
    "\\textup{airInhaled(activity) = L/h/kg = oxygenDemand(activity)} \\cdot \\textup{airPerLOxygen}"
  )}
</div>

<Table grid={exercises_air_usage_table} label="table:breathing_amount" full
  >Air usage.</Table
>

<div class="text-sm">
  {@html math(
    "\\textup{excessAirInhaled} = \\textup{bodyWeight} \\cdot \\textup{hours} \\cdot \\textup{airInhaled(activity)}"
  )}
</div>

<p>
  According to source <Cite to="ncbi-air_usage" /> and source <Cite
    to="bbc-air_usage"
  /> we breathe around 6000 L/h during exer- cise. Using the Air usage of Jogging
  fast would result in 51.22 ·70 (kg) = 3585.4 L/h. Our result is almost half. The
  sources either used a different bodyweight or a differ- ent exercise intensity.
  MET oxygen demand calculation does have limitations
  <Cite to="wikipedia-met_limitations" />, but even then its better to use our
  own calculations than sources that don't provide any information of used
  bodyweight and exercise intensity.
</p>

<h4>Sweating</h4>
<p>
  waterLossSweat = 4% ! add ref average sweat rate army nemen (was iets van
  0.3L/h?) air temperature = 20Ta, °C ambient air movement = 1 V, m/s ambient
  water vapor pressure = 1.5? Pw, kPa body surface area = 1.85? BSA, m2 body
  mass = 75 Body mass, kg mean skin temperature = 30? Tsk, °C calculated oxygen
  uptake = 2.2? Vo2, L/min sweat rate komt uit op ong. 0.7/0.8 L/h
</p>

<Table
  grid={{
    align: "lrrrr",
    columns: ["Parameter", "Value", "Unit", "State", "Reference"],
    rows: [
      // TODO: add special color to temperature
      ["water", "0.89%", "L", "fluid", "food"],
      ["sodium", "0.09%", "kg", "solid", "food"],
      ["potassium", "0.02%", "kg", "solid", "food"],
      ["calcium", "1.5e-03%", "kg", "solid", "food"],
      ["magnesium", "1.3e-04%", "kg", "solid", "food"],
      "Measurements below can vary fifteenfold.",
      ["zinc", "4e-5%", "kg", "solid", "food"],
      ["copper", "5.5e-5%", "kg", "solid", "food"],
      ["iron", "1e-4%", "kg", "solid", "food"],
      ["chromium", "1e-5%", "kg", "solid", "food"],
      ["nickel", "5e-6%", "kg", "solid", "food"],
      ["lead", "5e-7%", "kg", "solid", "food"],
    ],
  }}
  label="table:perspiration_constituents"
  full>Perspiration constituents. <Cite to="wikipedia-perspiration" /></Table
>
<h4>Peeing</h4>
<p>waterLossUrine = 60% add ref OSEc corrected Pw</p>

<Table
  grid={{
    align: "lrrrr",
    columns: ["Parameter", "Value", "Unit", "State", "Reference"],
    rows: [
      ["water", "93.5% ± 2.5%", "L", "liquid", "water"],
      ["nitrogen", "8.83%", "mg", "solid", "food"],
      ["chloride", "4.97%", "mg", "solid", "food"],
      ["sodium", "3.45%", "mg", "solid", "food"],
      ["potassium", "2.74%", "mg", "solid", "food"],
      ["sulphate", "1.5%", "mg", "solid", "food"],
      ["phosphorus", "1.4% ±0.6%", "mg", "solid", "food"],
      ["ammonium/ammonia", "0.46%", "mg", "solid", "food"],
      ["calcium", "0.23%", "mg", "solid", "food"],
      ["magnesium", "0.12%", "mg", "solid", "food"],
      ["nitrate/nitrite", "0.00006%", "mg", "solid", "food"],
    ],
  }}
  label="table:urine_constituents"
  full>Urine constituents. <Cite to="wikipedia-urine" /></Table
>

<h4>Pooping</h4>
<p>
  Humans eliminate 128 g (median value) of fresh feces per person per day. Fresh
  feces contains around 75% water and the remaining solid fraction are mostly
  organic solids.
</p>

<Table
  grid={{
    align: "lrrrr",
    columns: ["Parameter", "Value", "Reference"],
    rows: [
      ["Temperature", "37°C", "food"], // TODO: special color
      ["Calorific value", "132 kcal", "food"], // TODO: special color
      ["pH", "6.2", "—"], // TODO: special color
      ["Water", "75%", "water"],
      ["Carbohydrate", "7.03%", "food"],
      ["Protein", "4.92%", "food"],
      ["Fiber", "4.69%", "food"],
      ["Lipids", "3.2%", "food"],
      ["Nitrogen", "1.41%", "food"],
    ],
  }}
  label="table:human_feces_characteristics"
  full
  >Fresh feces characteristics. <Cite
    to="cranfield-characterization_of_feces_and_urine"
  />
  <Cite to="wikipedia-human_feces_average_chemical_characteristics" /></Table
>

<p>
  No study was yet found with exact relation between calorific intake and amount
  of produced feces. Water usage states 100 mL water is used per day for
  producing feces. The food relation would be more logical, but it’s something
  for now. 128 g of feces would therefore mean that 128 ∗0.75 = 96 mL water was
  used. Which is very similar to the 100/200 mL feces estimation from Table
  water usage.
</p>

<table class="table table-bordered">
  <tbody>
    <tr>
      <td rowspan="7" class="text-center text-middle">Emits</td>
      <td colspan="2" class="text-center">Heat</td>
      <td class="text-right">formula</td>
      <td class="text-right">food</td>
    </tr>
    <tr>
      <td colspan="2" class="text-center">Water</td>
      <td class="text-right">75%</td>
      <td class="text-right">water</td>
    </tr>
    <tr>
      <td rowspan="5" class="text-center text-middle">Organic solids</td>
      <td>Carbohydrate</td>
      <td class="text-right">7.03%</td>
      <td class="text-right">food</td>
    </tr>
    <tr>
      <td>Protein</td>
      <td class="text-right">4.92%</td>
      <td class="text-right">food</td>
    </tr>
    <tr>
      <td>Fiber</td>
      <td class="text-right">4.69%</td>
      <td class="text-right">food</td>
    </tr>
    <tr>
      <td>Lipids</td>
      <td class="text-right">3.2%</td>
      <td class="text-right">food</td>
    </tr>
    <tr>
      <td>Nitrogen</td>
      <td class="text-right">1.41%</td>
      <td class="text-right">food</td>
    </tr>
  </tbody>
  <caption>Emits.</caption>
  <label for="table:human_feces_characteristics" />
</table>

<h4>Farting</h4>
<p>
  Gas in the digestive tract (that is, the esophagus, stomach, small intestine,
  and large intestine) comes from two sources:
</p>
<ul>
  <li>Swallowed air.</li>
  <li>
    Normal breakdown of certain undigested foods by harmless bacteria naturally
    present in the large intestine (colon).
  </li>
</ul>
<p>
  The source of rectal gas cannot be attributed primarily to air swallowing,
  since of the five gases that constitute over 99% of intestinal gas, only
  two—nitrogen and oxygen—are present in the atmosphere in appreciable amounts.
  The other three intestinal gases—methane, hydrogen, and carbon dioxide—result
  from the metabolic processes of bacterial flora in the colon.
</p>
<p>
  My assumption, is increase of food intake would result in increase of farts.
  There- fore we use the calculation of 10% more food intake = 10% more farts
  and 10% more belches. Average volume of flatus per day is 3474 mL. Temperature
  of flatus is body temperature.
</p>

<Table
  grid={{
    align: "lr",
    columns: ["Parameter", "Percentage"],
    rows: [
      ["Hydrogen, H2", "34.3 ±17.5"],
      ["Carbon, CO2", "34.7 ±14.7"],
      ["Methane, CH4", "5.6 ±10.4"],
      ["Oxygen, O2", "3.3 ±1.9"],
      ["Nitrogen, N2", "22.2 ±12.2"],
      ["Hydrogen, Sulfide, H2S", "2.9e −3 ±4.0e −3"],
      ["Methanethiol, CH4S", "0.58e −3 ±0.67e −3"],
      ["Dimethylsulfide, (CH3)2S", "0.19e −3 ±0.2e −3"],
    ],
  }}
  label="table:human_feces_characteristics">Composition of flatus.</Table
>

<table>
  <tbody>
    <tr>
      <td rowspan="9">Emits</td>
      <td>heat</td>
      <td class="text-right">xx</td>
      <td class="text-right">food?</td>
    </tr>
    <tr>
      <td>Hydrogen, H2</td>
      <td class="text-right">34.3%</td>
      <td class="text-right" />
    </tr>
    <tr>
      <td>Carbon, CO2</td>
      <td class="text-right">34.7%</td>
      <td class="text-right" />
    </tr>
    <tr>
      <td>Methane, CH4</td>
      <td class="text-right">5.6%</td>
      <td class="text-right" />
    </tr>
    <tr>
      <td>Oxygen, O2</td>
      <td class="text-right">3.3%</td>
      <td class="text-right">breathing?</td>
    </tr>
    <tr>
      <td>Nitrogen, N2</td>
      <td class="text-right">22.2%</td>
      <td class="text-right">breathing?</td>
    </tr>
    <tr>
      <td>Hydrogen Sulfide, H2S</td>
      <td class="text-right">2.9e-3%</td>
      <td class="text-right" />
    </tr>
    <tr>
      <td>Methanethiol, CH4S</td>
      <td class="text-right">0.58e-3%</td>
      <td class="text-right" />
    </tr>
    <tr>
      <td>Dimethylsulfide, (CH3)2S</td>
      <td class="text-right">0.19e-3%</td>
      <td class="text-right" />
    </tr>
  </tbody>
  <caption>Result.</caption>
  <label for="result" />
</table>

<h4>Burping</h4>
<p>
  Belching comes from swallowing air from food or frood drinking soda. Burping
  is usually caused by swallowing air when eating or drinking and subse- quently
  expelling it, in which case the expelled gas is mainly a mixture of nitrogen
  and oxygen.[2] Burps can be caused by drinking beverages containing carbon
  dioxide, such as beer and soft drinks, in which case the expelled gas is
  mainly carbon dioxide.
</p>

<!-- 2.4 Public transport
2.5 Car
2.5.1 Petrol
2.5.2 Electric
2.5.3 Hydrogen
2.6 Plane
3 Food
3.1 Composition
kcal per kg -->

<h3>Car</h3>
Car used for comparisons: or only do weight instead of specific car..?

<h4>Petrol</h4>
<h4>Diesel</h4>
<h4>LPG</h4>
<h4>Electric</h4>
<h4>Hydrogen</h4>

<h3>Plane</h3>

<hr />
<h2>Food</h2>
<h3>Composition and Footprint</h3>
<Table grid={food_table} bordered full label="" overflow />

<h3>Diets</h3>
<p>no statistics used no sources used</p>

{#each Object.entries(diets) as [diet, value]}
  <h4>{value.name}</h4>
  <Table
    grid={{
      align: diets_table.align,
      columns: diets_table.columns,
      rows: diets_table[diet],
    }}
    bordered
    full
    label="">Typical daily {diet} consumption</Table
  >
  <Table
    grid={{
      align: diets_distribution_table.align,
      columns: diets_distribution_table.columns,
      rows: diets_distribution_table[diet],
    }}
    bordered
    full
    label="">{diet} kcal distribution</Table
  >

  <Table
    grid={{
      align: diets_footprint_table.align,
      columns: diets_footprint_table.columns,
      rows: diets_footprint_table[diet],
    }}
    bordered
    full
    label="">{diet} footprint per 1000 kcal</Table
  >
{/each}

<!-- interesting foods highly purchased in supermarkets - appel - banaan - avocado - peer
  - kosten per kg - afstand (location of growth) - kcal - voedingswaarde - uitstoot
  - gebruik - transport, packaging -->

<!-- bibliography -->

<hr />
<h2>Impact score</h2>
<p>
  WhatsGreenerImpact (WGI) WGIS / WGI - Water usage (blauw, groen, of grijs) -
  Water emission (blauw, groen of grijs) - Fuel used (food, benzine etc) - Heat
  emitted - CO2-eq emitted - does atmosphere matter (airplane?) - Water vapor
  emitted - Other emissions (solid vanuit poep ofzo, rubber van wielen auto’s) -
  land use (materiaal gebruik?) water score impact
</p>

<h2>Solutions to compensate footprint</h2>
<p>ladida</p>

<h2>Cost to compensate</h2>
<p>Ladiddad</p>

<h2>Cost to travel</h2>
<p>Ladiddad</p>

<hr />
<h2>References</h2>
{#each Object.entries(bibliography) as [key, item]}
  <div id="bib-{key}" class="mb-4 text-base truncate">
    <span>[{item.index}]</span>
    <span>"{item.title}"</span>
    <br />
    <span
      ><a href={item.url} class="text-blue-500" target="_blank">{item.url}</a
      ></span
    >
  </div>
{/each}

<style>
  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    scroll-margin-top: 80px;
  } */

  /* .bib-item {
    margin-bottom: 10px;
    scroll-margin-top: 80px;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  } */

  /* p {
    font-size: 18px;
    line-height: 1.3;
  } */

  /* a {
    text-decoration: none;
  } */

  /* h1.introduction {
		font-size: 40px;
	} */
</style>
