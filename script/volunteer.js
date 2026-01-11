const volunteerForm = document.getElementById("volunteerForm");
const status = document.getElementById("status");

volunteerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const volunteerData = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    zipcode: document.getElementById("codepostal").value,
    availabity: document.getElementById("disponibilites").value,
    motivation: document.getElementById("motivation").value
  };

  try {
    const response = await fetch("/api/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(volunteerData)
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi des données");
    }

    status.textContent =
      "Merci pour votre inscription en tant que bénévole ! Nous vous contacterons bientôt.";
    status.style.color = "green";

    setTimeout(() => {
      status.textContent = "";
    }, 4000);

    volunteerForm.reset();

  } catch (error) {
    console.error(error);

    status.textContent =
      " Une erreur est survenue. Veuillez réessayer.";
    status.style.color = "red";

    setTimeout(() => {
      status.textContent = "";
    }, 4000);
  }
});
