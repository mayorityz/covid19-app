const dropdown = document.querySelector("#locations");

// sidebar details
const stat_country = document.querySelector(".country");
const stat_cases = document.querySelector(".cases");
const stat_todaysCases = document.querySelector(".tcases");
const stat_critical = document.querySelector(".critical");
const stat_active = document.querySelector(".active_cases");
const stat_recovered = document.querySelector(".recovered");
const stat_flag = document.querySelector(".flags");

let data_ = [];
mapboxgl.accessToken =
  "pk.eyJ1IjoibWF5b3JpdHkiLCJhIjoiY2s5azVqcGtjMTAxNTNlcTZrMjNvcWFwZyJ9.TBqBLaTp9Z8jF3g30cWN4w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [8, 10],
  zoom: 2,
});

let api = async () => {
  try {
    let res = await fetch("https://corona.lmao.ninja/v2/countries");
    let results = await res.json();
    return results;
  } catch (error) {
    return `err ${error}`;
  }
};

markerColor = (cases) => {
  if (cases <= 50) {
    return "blue";
  } else if (cases > 50 && cases <= 100) {
    return "lightgreen";
  } else if (cases > 100 && cases <= 500) {
    return "white";
  } else if (cases > 500 && cases <= 1500) {
    return "pink";
  } else if (cases > 1500 && cases <= 3500) {
    return "yellow";
  } else {
    return "red";
  }
};

api().then((data) => {
  data_ = [...data];

  data
    .filter((result) => result.continent === "Africa")
    .forEach((result) => {
      const { countryInfo, country, cases } = result;
      const { lat, long } = countryInfo;

      const newElement = document.createElement("option");

      newElement.textContent = country;
      dropdown.appendChild(newElement);

      new mapboxgl.Marker({
        color: markerColor(cases),
      })
        .setLngLat([long, lat])
        .addTo(map);
    });

  displayStat(data_);
});

dropdown.addEventListener("change", ({ target }) => {
  const { value } = target;
  displayStat(data_, value);
});

let displayStat = (data, Country = "Nigeria") => {
  let result = data.filter((d) => d.country === Country);
  const {
    countryInfo,
    country,
    cases,
    tests,
    critical,
    deaths,
    todayDeaths,
    recovered,
    active,
    todayCases,
  } = result[0];

  stat_flag.setAttribute("src", countryInfo.flag);
  stat_country.textContent = country;
  stat_cases.textContent = cases;
  stat_active.textContent = active;
  stat_critical.textContent = critical;
  stat_todaysCases.textContent = todayCases;
  stat_recovered.textContent = recovered;
};
