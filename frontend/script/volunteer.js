const volunteerForm = document.getElementById('volunteerForm');
const status = document.getElementById('status');

volunteerForm.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const volunteerData = {
        firstname : document.getElementsById('firstname').value,
        lastname : document.getElementsById('lastname').value,
        email : document.getElementsById('email').value,
        city : document.getElementsById('city').value,
        zipcode : document.getElementsById('zipcode').value,
        availabity : document.getElementsById('availabity').value,
        motivation : document.getElementsById('motivation').value,
    };
    try {
        const response = await fetch ('http://localhost:3000/volunteers',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(volunteerData)
        });
        if(!response.ok){
            throw new Error ("Erreur lors de l'envoi des données");
        }
        status.textContent = "Merci pour votre inscription en tant que bénévole ! Nous vous contacterons bientôt.";
        status.style.color = "green";
        setTimeout(() => {
      status.textContent = "";
    }, 4000);

    volunteerForm.reset();
    }catch (error) {
    console.error(error);
    status.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
    status.style.color = "red";

    setTimeout(() => {
      status.textContent = "";
    }, 4000);
  }
});