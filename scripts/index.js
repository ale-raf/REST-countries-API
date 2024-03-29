import { getJSONData, toggleThemeMode, retrieveTheme } from "./utils.js";

const galleryElt = document.querySelector(".gallery");
const searchInput = document.querySelector(".navigation input");
const searchSelect = document.querySelector(".navigation select");
const darkModeBtn = document.querySelector(".header__dark-mode");
const darkModeIcon = darkModeBtn.firstElementChild;

let countries = await getJSONData();

darkModeBtn.addEventListener("click", toggleThemeMode);

retrieveTheme(darkModeIcon);

/**
 * crée et affiche les éléments associés à la liste des pays
 * @param {Array} countries La liste de tous les pays
 */
const showCountries = (countries) => {
  for (let country of countries) {
    let countryCard = document.createElement("article");
    let countryLink = document.createElement("a");
    let countryFlag = document.createElement("img");
    let countryContent = document.createElement("div");
    let countryName = document.createElement("h2");
    let countryPopulation = document.createElement("p");
    let countryRegion = document.createElement("p");
    let countryCapital = document.createElement("p");
    countryCard.className = "country-card";
    countryLink.href = `../pages/country.html?id=${country.population}`;
    countryFlag.src = country.flag;
    countryName.textContent = country.name;
    countryPopulation.textContent = `Population: ${country.population.toLocaleString(
      "en-US"
    )}`;
    countryRegion.textContent = `Region: ${country.region}`;
    countryCapital.textContent = country.capital
      ? `Capital: ${country.capital}`
      : "";
    countryContent.append(
      countryName,
      countryPopulation,
      countryRegion,
      countryCapital
    );
    countryLink.append(countryFlag, countryContent);
    countryCard.appendChild(countryLink);
    galleryElt.appendChild(countryCard);
  }
};
showCountries(countries);

/**
 * filtre les pays selon la valeur du champ
 * @param {Event} e l'événement capturé par le champ de recherche
 */
const searchCountryByName = (e) => {
  galleryElt.innerHTML = "";
  let countriesFromSearchInput = countries.filter((country) =>
    country.name.toLowerCase().includes(e.target.value)
  );
  showCountries(countriesFromSearchInput);
};
searchInput.addEventListener("input", searchCountryByName);

/**
 * filtre les pays selon la valeur de l'option sélectionnée
 * @param {Event} e l'événement capturé par l'élément select avec ses options
 */
const searchCountryByRegion = (e) => {
  galleryElt.innerHTML = "";
  if (e.target.value === "all") {
    showCountries(countries);
  } else {
    let countriesFromSearchSelect = countries.filter(
      (country) => country.region.toLowerCase() === e.target.value
    );
    showCountries(countriesFromSearchSelect);
  }
};
searchSelect.addEventListener("input", searchCountryByRegion);
