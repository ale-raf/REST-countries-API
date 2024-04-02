import {
  getJSONData,
  elementFromHtml,
  toggleThemeMode,
  retrieveTheme,
} from "./utils.js";

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
    let id = country.numericCode;
    let capital = country.capital ? "Capital: " + country.capital : "";
    let countryElt = elementFromHtml(`
      <article class="country-card">
        <a href="./pages/country.html?id=${id}">
          <img src=${country.flag} alt=${country.name}>
          <div>
            <h2>${country.name}</h2>
            <p>Population: ${country.population.toLocaleString("en-US")}</p>
            <p>Region: ${country.region}</p>
            <p>${capital}</p>
          </div>
        </a>
      </article>
    `);
    galleryElt.appendChild(countryElt);
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
