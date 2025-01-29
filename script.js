document.addEventListener("DOMContentLoaded", function() {
    const captchaCodeEl = document.getElementById("captcha-code");
    const refreshBtn = document.getElementById("refresh-btn");
    const verifyBtn = document.getElementById("verify-btn");
    const captchaInput = document.getElementById("captcha-input");
    const resultEl = document.getElementById("result");

    // Funktion, um einen zufälligen Code zu erzeugen
    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        captchaCodeEl.textContent = captcha;
    }

    // CAPTCHA neu laden
    refreshBtn.addEventListener("click", function() {
        captchaInput.value = '';
        resultEl.textContent = '';
        generateCaptcha();
    });

    // CAPTCHA überprüfen
    verifyBtn.addEventListener("click", function() {
        if (captchaInput.value === captchaCodeEl.textContent) {
            resultEl.textContent = "Erfolgreich verifiziert!";
            resultEl.style.color = "green";
            // Nach erfolgreicher Verifizierung auf Notizen-Seite weiterleiten
            setTimeout(function() {
                window.location.href = "notes.html"; // Weiterleitung zur Notizen-Seite
            }, 1500); // Warten 1,5 Sekunden bevor umgeleitet wird
        } else {
            resultEl.textContent = "Falscher Code. Bitte versuchen Sie es erneut.";
            resultEl.style.color = "red";
        }
    });

    // Initiales CAPTCHA generieren
    generateCaptcha();
});
