import { getJSONData } from "./utils.js";

const galleryElt = document.querySelector(".gallery");
const searchInput = document.querySelector(".navigation input");
const searchSelect = document.querySelector(".navigation select");
const darkModeBtn = document.querySelector(".header__dark-mode");

let countries = await getJSONData();

/**
 * bascule le mode du thème et sauvegarde le choix dans la session
 */
const toggleThemeMode = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("website_theme", "dark-mode");
  } else {
    localStorage.setItem("website_theme", "default");
  }
};
darkModeBtn.addEventListener("click", toggleThemeMode);

/**
 * récupère le mode du thème choisi
 */
const retrieveTheme = () => {
  let theme = localStorage.getItem("website_theme");
  if (theme != null) {
    document.body.classList.remove("default", "dark-mode");
    document.body.classList.add(theme);
  }
};
retrieveTheme();

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
    countryLink.href = `country.html?id=${country.population}`;
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
 * @param {Element} e Le champ de recherche
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
 * @param {Element} e L'élément select avec ses options
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
