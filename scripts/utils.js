/**
 * récupère et retourne le tableau des données
 * @param {string} id l'id présent dans le paramètre de l'url
 * @returns {Array} le tableau complet ou filtré si l'id est donné
 */
export const getJSONData = async (id) => {
  let path = document.location.pathname;
  const res = await fetch(
    path === "/REST-countries-API/" ? "./data.json" : "../data.json"
  );
  const data = await res.json();
  let dataWithId = data.filter((d) => d.numericCode == id)[0];
  return id ? dataWithId : data;
};

/**
 * crée et retourne un template dont le contenu est passé en paramètre
 * @param {string} html le contenu html du template créé
 * @returns {Element} le premier élément issu du template
 */
export const elementFromHtml = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

/**
 * bascule le mode du thème et sauvegarde le choix dans la session
 * @param {Event} event le clic capturé par le bouton dark mode
 */
export const toggleThemeMode = (event) => {
  let target = event.target.closest("button");
  let isDarkModeOn = document.body.classList.toggle("dark-mode");
  let darkModeIcon = target.firstElementChild;
  darkModeIcon.className = isDarkModeOn
    ? "fa-solid fa-moon"
    : "fa-regular fa-moon";
  localStorage.setItem("theme_icon", darkModeIcon.className);
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("website_theme", "dark-mode");
  } else {
    localStorage.setItem("website_theme", "default");
  }
};

/**
 * récupère le mode du thème choisi
 * @param {Element} btn l'icône du bouton dark mode
 */
export const retrieveTheme = (btn) => {
  let theme = localStorage.getItem("website_theme");
  let icon = localStorage.getItem("theme_icon");
  if (theme != null) {
    document.body.classList.remove("default", "dark-mode");
    document.body.classList.add(theme);
    btn.className = icon;
  }
};
