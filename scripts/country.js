import {
  getJSONData,
  elementFromHtml,
  toggleThemeMode,
  retrieveTheme,
} from "./utils.js";

const content = document.querySelector(".country__content");
const flagElt = document.querySelector(".container img");
const nameElt = document.querySelector(".container h2");
const bordersElt = document.querySelector(".country__borders");
const darkModeBtn = document.querySelector(".header__dark-mode");
const backBtn = document.querySelector(".back-btn");

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
let countries = await getJSONData();
let country = await getJSONData(id);

darkModeBtn.addEventListener("click", toggleThemeMode);

retrieveTheme(darkModeBtn.firstElementChild);

backBtn.addEventListener("click", () => history.back());

const getBorderCountriesInfo = (border) => {
  return countries.filter((country) => country.alpha3Code == border)[0];
};

const showBorderCountries = (border) => {
  let id = getBorderCountriesInfo(border).numericCode;
  let borderCountriesElt = elementFromHtml(`
    <li>
      <a href="country.html?id=${id}">${getBorderCountriesInfo(border).name}</a>
    </li>
  `);
  bordersElt.append(borderCountriesElt);
};

const getCountryInfo = (country) => {
  let keys = [
    ["nativeName", "Native Name: "],
    ["population", "Population: "],
    ["region", "Region: "],
    ["subregion", "Subregion: "],
    ["capital", "Capital: "],
    ["topLevelDomain", "Top Level Domain: "],
    ["currencies", "Currencies: "],
    ["languages", "Languages: "],
  ];
  for (let i = 0; i < keys.length; i++) {
    let p = document.createElement("p");
    let key = keys[i][0];
    let text = keys[i][1];
    if (country[key]) {
      p.textContent = text + country[key]?.toLocaleString("en-US");
      p.className = `country__content__items item-${i}`;
      if (Array.isArray(country[key])) {
        p.textContent =
          text + country[key].map((prop) => prop.name ?? prop).join(", ");
      }
      content.appendChild(p);
    }
  }
};

const showCountry = (country) => {
  getCountryInfo(country);
  document.title = "Countries - " + country.name;
  flagElt.src = country.flag;
  nameElt.textContent = country.name;
  if (country.borders) {
    country.borders.map(showBorderCountries);
    bordersElt.firstElementChild.textContent = "Border Countries :";
  } else {
    bordersElt.innerHTML = "";
  }
};

showCountry(country);
