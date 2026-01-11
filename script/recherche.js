const container = document.querySelector(".profiles-grid");
const resultsCount = document.querySelector(".results-count");
const searchForm = document.querySelector(".searchForm");
const resetLink = document.querySelector(".link-filter");


async function fetchProfils(momentValue = "", villeValue = "") {
  try {
    let url = "/api/seniors-filter";

    const params = new URLSearchParams();
    if (momentValue) params.append("activity", momentValue);
    if (villeValue) params.append("city", villeValue);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        const fallbackResp = await fetch("/profils.json");
        if (!fallbackResp.ok) {
          throw new Error("Fallback failed: " + fallbackResp.status);
        }

        const fallback = await fallbackResp.json();
        return fallback.map((p, i) => ({
          id: p.id ?? i,
          firstname: p.firstname,
          img: p.imageUrl || p.img || "",
          age: p.age,
          city: p.city,
          activity_name: p.type || p.job || ""
        }));
      }

      throw new Error("Erreur API : " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors du fetch :", error);
    return [];
  }
}

/**
 * Affichage des profils
 */
function renderProfils(profils) {
  container.innerHTML = "";

  resultsCount.textContent = `${profils.length} moment${
    profils.length > 1 ? "s" : ""
  } trouvé${profils.length > 1 ? "s" : ""}`;

  if (profils.length === 0) {
    container.innerHTML = "<p>Aucun profil trouvé.</p>";
    return;
  }

  profils.forEach((profil) => {
    const card = document.createElement("div");
    card.classList.add("search-card");

    card.innerHTML = `
      <img src="${profil.img}" alt="${profil.firstname}">
      <div class="search-info">
        <span class="activity">${profil.activity_name}</span>
        <h3 class="searchName">${profil.firstname}</h3>
        <div class="searchDetails">
          <span>${profil.age} ans • ${profil.city}</span>
        </div>
        <a href="/pages/meeting.html?seniorId=${profil.id}" class="btn btn-primary">
          Programmer un moment
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Initialisation au chargement de la page
 */
async function init() {
  try {
    const params = new URLSearchParams(window.location.search);
    const moment = params.get("moment") || "";
    const ville = params.get("ville") || "";

    document.querySelector("#momentShared").value = moment;
    document.querySelector("#localisation").value = ville;

    const profils = await fetchProfils(moment, ville);
    renderProfils(profils);
  } catch (error) {
    console.error(" Erreur init :", error);
  }
}

/**
 * Soumission du formulaire de recherche
 */
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const momentValue = document.querySelector("#momentShared").value.trim();
  const villeValue = document.querySelector("#localisation").value.trim();

  const profils = await fetchProfils(momentValue, villeValue);
  renderProfils(profils);
});

/**
 * Réinitialisation des filtres
 */
resetLink.addEventListener("click", async (e) => {
  e.preventDefault();

  document.querySelector("#momentShared").value = "";
  document.querySelector("#localisation").value = "";

  const profils = await fetchProfils();
  renderProfils(profils);
});

// Lancer au chargement
init();
