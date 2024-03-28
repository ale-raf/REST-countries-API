import { getJSONData } from "./utils.js";

const galleryElt = document.querySelector(".gallery");
const searchInput = document.querySelector(".navigation input");
const searchSelect = document.querySelector(".navigation select");

let countries = await getJSONData();

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
    countryPopulation.textContent = `Population: ${country.population}`;
    countryRegion.textContent = `Region: ${country.region}`;
    countryCapital.textContent = `Capital: ${country.capital}`;
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

const searchCountryByName = (e) => {
  let countriesFromSearch = countries.filter((country) =>
    country.name.toLowerCase().includes(e.target.value)
  );
  galleryElt.innerHTML = "";
  showCountries(countriesFromSearch);
};

const searchCountryByRegion = (e) => {
  galleryElt.innerHTML = "";
  if (e.target.value === "all") {
    showCountries(countries);
  } else {
    let countriesFromSearch = countries.filter(
      (country) => country.region.toLowerCase() === e.target.value
    );
    showCountries(countriesFromSearch);
  }
};

searchInput.addEventListener("input", searchCountryByName);

searchSelect.addEventListener("input", searchCountryByRegion);
