
/* =========================================
   PRIVILEGE - SCRIPT COMPLETO
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
      menuButton.setAttribute("aria-label", isOpen ? "Chiudi menu" : "Apri menu");
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
     3. MODULO CONTATTI - FORMSPREE
     NON APRE WHATSAPP
  ======================================= */

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

      event.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (!submitButton || submitButton.disabled) {
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "INVIO IN CORSO...";

      formStatus.className = "form-status";
      formStatus.textContent = "";

      try {

        const response = await fetch(
          "https://formspree.io/f/xppdwpyg",
          {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
              "Accept": "application/json"
            }
          }
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            result.errors?.map(error => error.message).join(", ") ||
            "Invio non riuscito."
          );
        }

        formStatus.className = "form-status success";

        formStatus.textContent =
          "Grazie per aver contattato PRIVILEGE! " +
          "Abbiamo ricevuto la tua richiesta. " +
          "Marina ti ricontatterà al più presto.";

        contactForm.reset();

      } catch (error) {

        console.error("Errore Formspree:", error);

        formStatus.className = "form-status error";

        formStatus.textContent =
          "Non siamo riusciti a inviare la richiesta. " +
          "Controlla la connessione e riprova.";

      } finally {

        submitButton.disabled = false;
        submitButton.textContent = "INVIA RICHIESTA";

      }

    });

  } else {
    console.error("PRIVILEGE: modulo o messaggio di conferma non trovato.");
  }


  /* =======================================
     4. GESTIONE COOKIE
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

  if (
    banner &&
    preferences &&
    acceptButton &&
    rejectButton &&
    settingsButton &&
    saveButton &&
    reopenButton &&
    analyticsCheckbox &&
    marketingCheckbox
  ) {

    function getConsent() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return null;

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
        console.error("Errore lettura cookie:", error);
        return null;
      }
    }


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

      } catch (error) {
        console.error("Errore salvataggio cookie:", error);
        alert("Impossibile salvare le preferenze cookie.");
      }
    }


    function showBanner() {
      preferences.hidden = true;
      banner.hidden = false;
    }


    function showPreferences() {
      const consent = getConsent();

      analyticsCheckbox.checked = consent ? consent.analytics : false;
      marketingCheckbox.checked = consent ? consent.marketing : false;

      banner.hidden = true;
      preferences.hidden = false;
    }


    acceptButton.addEventListener("click", function () {
      saveConsent(true, true);
    });


    rejectButton.addEventListener("click", function () {
      saveConsent(false, false);
    });


    settingsButton.addEventListener("click", showPreferences);


    saveButton.addEventListener("click", function () {
      saveConsent(
        analyticsCheckbox.checked,
        marketingCheckbox.checked
      );
    });


    reopenButton.addEventListener("click", showPreferences);


    if (getConsent()) {
      banner.hidden = true;
      preferences.hidden = true;
    } else {
      showBanner();
    }

  } else {
    console.error("PRIVILEGE: elementi del sistema cookie non trovati.");
  }


  console.log("PRIVILEGE: JavaScript caricato correttamente.");

});
