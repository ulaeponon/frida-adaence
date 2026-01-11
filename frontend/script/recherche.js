const container = document.querySelector(".profiles-grid");
const resultsCount = document.querySelector(".results-count");
const searchForm = document.querySelector(".searchForm");
const resetLink = document.querySelector(".link-filter");

async function fetchProfils(momentValue = "", villeValue = "") {
  try {
    let url = "http://localhost:3000/seniors/filter";

    // Construction de l’URL avec les filtres
    const params = new URLSearchParams();
    if (momentValue) params.append("activity", momentValue);
    if (villeValue) params.append("city", villeValue);

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur de chargement depuis l’API : " + response.status);
    }

    const data = await response.json();
    console.log("✅ Données reçues du backend :", data);
    return data;
  } catch (error) {
    console.error("❌ Erreur lors du fetch :", error);
    return [];
  }
}

function filterProfils(profils, momentValue, villeValue) {
  return profils.filter(profil => {
    const matchMoment = momentValue
      ? profil.activity_name.toLowerCase().includes(momentValue.toLowerCase())
      : true;
    const matchCity = villeValue
      ? profil.city.toLowerCase().includes(villeValue.toLowerCase())
      : true;
    return matchMoment && matchCity;
  });
}

function renderProfils(profils) {
  container.innerHTML = "";

  resultsCount.textContent = `${profils.length} moment${profils.length > 1 ? "s" : ""} trouvé${profils.length > 1 ? "s" : ""}`;

  if (profils.length === 0) {
    container.innerHTML = "<p>Aucun profil trouvé.</p>";
    return;
  }

  profils.forEach(profil => {
    const card = document.createElement("div");
    card.classList.add("search-card");

   card.innerHTML = `
  <img src="http://localhost:3000${profil.img}" alt="${profil.firstname}">
  <div class="search-info">
    <span class="activity">${profil.activity_name}</span>
    <h3 class="searchName">${profil.firstname}</h3>
    <div class="searchDetails">
      <span>${profil.age} ans • ${profil.city}</span>
    </div>
     <a href="/frontend/pages/meeting.html?seniorId=${profil.id}" class="btn btn-primary">Programmer un moment</a>
  </div>
`;


    container.appendChild(card);
  });
}

async function init() {
  try {
    const profils = await fetchProfils();

    const params = new URLSearchParams(window.location.search);
    const moment = params.get("moment") || "";
    const ville = params.get("ville") || "";

    document.querySelector("#momentShared").value = moment;
    document.querySelector("#localisation").value = ville;

    const filtered = filterProfils(profils, moment, ville);
    renderProfils(filtered);
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
}

// Soumission du formulaire
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const momentValue = document.querySelector("#momentShared").value.trim();
  const villeValue = document.querySelector("#localisation").value.trim();

  try {
    const profils = await fetchProfils();
    const filtered = filterProfils(profils, momentValue, villeValue);
    renderProfils(filtered);
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
});

// Réinitialisation des filtres
resetLink.addEventListener("click", async (e) => {
  e.preventDefault();
  document.querySelector("#momentShared").value = "";
  document.querySelector("#localisation").value = "";

  try {
    const profils = await fetchProfils();
    renderProfils(profils); // pas de filtres = tout afficher
  } catch (err) {
    console.error("❌ Erreur :", err);
  }
});

// Lancer au chargement
init();
