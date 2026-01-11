console.log("meeting.js chargé");
const params = new URLSearchParams(window.location.search);
const seniorId = params.get("seniorId");

if (!seniorId) {
  alert(" Aucun senior spécifié.");
  window.location.href = "/frontend/pages/recherche.html";
}

// éléments HTML
const seniorName = document.getElementById("seniorName");
const seniorActivity = document.getElementById("seniorActivity");
const seniorCity = document.getElementById("seniorCity");

// chargement du senior
async function loadSenior() {
  try {
    const response = await fetch("http://localhost:3000/seniors");
    const data = await response.json();
const seniors = Array.isArray(data) ? data : data.rows;

    const senior = seniors.find(s => s.id == seniorId);

    if (!senior) {
      alert(" Senior introuvable.");
      return;
    }

    // affichage
    seniorName.textContent = senior.firstname;
    seniorActivity.textContent = senior.activity_name;
    seniorCity.textContent = senior.city;

  } catch (error) {
    console.error("Erreur lors du chargement du senior :", error);
  }
}

// lancement
loadSenior();
const meetingForm = document.getElementById("meetingForm");
const status = document.getElementById("status");

meetingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const meetingData = {
    seniorId,
    date: document.getElementById("meeting_date").value,
    time: document.getElementById("meeting_time").value,
    location: document.getElementById("meeting_location").value,
    firstname: document.getElementById("vol_firstname").value,
    lastname: document.getElementById("vol_lastname").value,
    email: document.getElementById("vol_email").value,
    city: document.getElementById("vol_city").value,
    zipcode: document.getElementById("vol_zipcode").value
  };

  console.log(" Données envoyées :", meetingData);

  status.textContent = " Rendez-vous pris en compte ! Nous vous contacterons rapidement.";
status.style.color = "green";

setTimeout(() => {
  status.textContent = "";
}, 4000);

meetingForm.reset();

});
