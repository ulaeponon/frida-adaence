const params= new URLSearchParams(window.location.search);
const seniorId= params.get("seniorId");
if (!seniorId) {
  alert("❌ Aucun senior spécifié.");
 window.location;
}