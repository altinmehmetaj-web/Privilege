
// MENU MOBILE

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

// Chiude il menu dopo aver cliccato un link

document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
  });
});

// ANNO AUTOMATICO

document.getElementById("year").textContent =
  new Date().getFullYear();

// FORM CONTATTI WHATSAPP

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("message").value;

  const whatsappMessage =
    `Ciao Marina, ti contatto dal sito PRIVILEGE.%0A%0A` +
    `Nome: ${encodeURIComponent(name)}%0A` +
    `Telefono: ${encodeURIComponent(phone)}%0A` +
    `Email: ${encodeURIComponent(email)}%0A` +
    `Interesse: ${encodeURIComponent(interest)}%0A` +
    `Messaggio: ${encodeURIComponent(message)}`;

  const whatsappNumber = "393291583168";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  window.open(whatsappURL, "_blank");

});
