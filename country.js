import { getJSONData } from "./utils.js";

const content = document.querySelector(".country__content");
const flagElt = document.querySelector(".container img");
const nameElt = document.querySelector(".container h2");
const bordersElt = document.querySelector(".country__borders");
const darkModeBtn = document.querySelector(".dark");
const backBtn = document.querySelector(".back");

let params = new URLSearchParams(document.location.search);
let id = params.get("id");

darkModeBtn.addEventListener("click", (e) =>
  e.target.textContent === "Dark Mode"
    ? (e.target.textContent = "Light Mode")
    : (e.target.textContent = "Dark Mode")
);

backBtn.addEventListener("click", () => history.back());

let countries = await getJSONData();

let country = await getJSONData(id);

const getBorderCountriesInfo = (border) => {
  return countries.filter((country) => country.alpha3Code == border)[0];
};

const showBorderCountries = (border) => {
  let link = document.createElement("a");
  link.href = `country.html?id=${getBorderCountriesInfo(border).population}`;
  link.textContent = getBorderCountriesInfo(border).name;
  bordersElt.append(link);
};

const showCountry = (country) => {
  document.title = country.name;
  flagElt.src = country.flag;
  nameElt.textContent = country.name;
  content.children[0].textContent = `Native Name: ${country.nativeName}`;
  content.children[1].textContent = `Population: ${country.population}`;
  content.children[2].textContent = `Region: ${country.region}`;
  content.children[3].textContent = `Sub Region: ${country.subregion}`;
  content.children[4].textContent = `Capital: ${
    country?.capital ?? content.children[4].remove()
  }`;
  content.children[5].textContent = `Top Level Domain: ${country.topLevelDomain.join()}`;
  country.currencies
    ? (content.children[6].textContent = `Currencies: ${country.currencies.map(
        (currency) => currency.name
      )}`)
    : null;
  content.children[7].textContent = `Languages: ${country.languages
    .map((language) => language.name)
    .join(", ")}`;
  country.borders
    ? country.borders.map(showBorderCountries)
    : bordersElt.firstElementChild.remove();
};

showCountry(country);
