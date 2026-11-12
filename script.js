
/* =========================================
   PRIVILEGE - JAVASCRIPT COMPLETO
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================
     1. MENU MOBILE
  ======================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Chiudi menu" : "Apri menu"
      );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Apri menu");
      });
    });
  }


  /* =======================================
     2. ANNO AUTOMATICO
  ======================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================
     3. MODULO CONTATTI WHATSAPP
  ======================================= */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const interest = document.getElementById("interest")?.value || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const whatsappNumber = "393291583168";

      const whatsappMessage =
        "Ciao Marina, ti contatto dal sito PRIVILEGE.\n\n" +
        "Nome: " + name + "\n" +
        "Telefono: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Interesse: " + interest + "\n" +
        "Messaggio: " + message;

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });
  }


  /* =======================================
     4. SISTEMA CONSENSO COOKIE
  ======================================= */

  const banner = document.getElementById("cookie-banner");
  const preferences = document.getElementById("cookie-preferences");

  const acceptButton = document.getElementById("cookie-accept");
  const rejectButton = document.getElementById("cookie-reject");
  const settingsButton = document.getElementById("cookie-settings");
  const saveButton = document.getElementById("cookie-save");
  const reopenButton = document.getElementById("cookie-reopen");

  const analyticsCheckbox = document.getElementById("cookie-analytics");
  const marketingCheckbox = document.getElementById("cookie-marketing");

  const STORAGE_KEY = "privilege_cookie_consent";
  const CONSENT_VERSION = 1;

  if (!banner || !preferences) {
    console.error("PRIVILEGE: elementi del banner cookie non trovati.");
    return;
  }

  if (
    !acceptButton ||
    !rejectButton ||
    !settingsButton ||
    !saveButton ||
    !reopenButton ||
    !analyticsCheckbox ||
    !marketingCheckbox
  ) {
    console.error("PRIVILEGE: uno o più pulsanti cookie non sono presenti.");
    return;
  }


  /* Legge il consenso salvato */

  function getConsent() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return null;
      }

      const consent = JSON.parse(saved);

      if (
        consent.version !== CONSENT_VERSION ||
        typeof consent.analytics !== "boolean" ||
        typeof consent.marketing !== "boolean"
      ) {
        return null;
      }

      return consent;

    } catch (error) {
      console.error("Errore nella lettura delle preferenze cookie:", error);
      return null;
    }
  }


  /* Salva le preferenze */

  function saveConsent(analytics, marketing) {

    const consent = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: analytics,
      marketing: marketing,
      date: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));

      banner.hidden = true;
      preferences.hidden = true;

      console.log("PRIVILEGE: preferenze cookie salvate.");

    } catch (error) {
      console.error("Impossibile salvare le preferenze cookie:", error);
      alert("Non è stato possibile salvare le preferenze. Controlla le impostazioni del browser.");
    }
  }


  /* Mostra il banner iniziale */

  function showBanner() {
    preferences.hidden = true;
    banner.hidden = false;
  }


  /* Mostra la finestra di personalizzazione */

  function showPreferences() {

    const currentConsent = getConsent();

    analyticsCheckbox.checked =
      currentConsent ? currentConsent.analytics : false;

    marketingCheckbox.checked =
      currentConsent ? currentConsent.marketing : false;

    banner.hidden = true;
    preferences.hidden = false;
  }


  /* Accetta tutti i cookie facoltativi */

  acceptButton.addEventListener("click", function () {
    saveConsent(true, true);
  });


  /* Rifiuta tutti i cookie facoltativi */

  rejectButton.addEventListener("click", function () {
    saveConsent(false, false);
  });


  /* Apre le preferenze dal banner */

  settingsButton.addEventListener("click", function () {
    showPreferences();
  });


  /* Salva le preferenze personalizzate */

  saveButton.addEventListener("click", function () {

    saveConsent(
      analyticsCheckbox.checked,
      marketingCheckbox.checked
    );

  });


  /* Riapre le preferenze in qualsiasi momento */

  reopenButton.addEventListener("click", function () {
    showPreferences();
  });


  /* Visualizzazione iniziale */

  const existingConsent = getConsent();

  if (existingConsent) {
    banner.hidden = true;
    preferences.hidden = true;
  } else {
    showBanner();
  }


  /* =======================================
     5. FINE SISTEMA COOKIE
  ======================================= */

  console.log("PRIVILEGE: JavaScript caricato correttamente.");

});
