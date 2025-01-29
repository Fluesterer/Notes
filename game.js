document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submit-btn");
    const scoreEl = document.getElementById("score");

    submitBtn.addEventListener("click", function() {
        let score = 0;

        // Antworten der Fragen
        const answers = {
            question1: "paris",  // richtige Antwort für Frage 1
            question2: "einstein",  // richtige Antwort für Frage 2
            question3: "8"  // richtige Antwort für Frage 3
        };

        // Überprüfen der Antworten
        const question1Answer = document.getElementById("question1").value;
        const question2Answer = document.getElementById("question2").value;
        const question3Answer = document.getElementById("question3").value;

        // Punkte vergeben
        if (question1Answer === answers.question1) score++;
        if (question2Answer === answers.question2) score++;
        if (question3Answer === answers.question3) score++;

        // Anzeige der Punktzahl
        scoreEl.textContent = `Du hast ${score} von 3 Punkten erreicht!`;
    });
});
