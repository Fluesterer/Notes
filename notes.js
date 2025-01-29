document.addEventListener("DOMContentLoaded", function() {
    const saveBtn = document.getElementById("save-btn");
    const clearBtn = document.getElementById("clear-btn");
    const noteInput = document.getElementById("note-input");
    const notesList = document.getElementById("notes-list");

    // Lade gespeicherte Notizen
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement("li");
            li.textContent = note;
            notesList.appendChild(li);
        });
    }

    // Notiz speichern
    saveBtn.addEventListener("click", function() {
        const note = noteInput.value.trim();
        if (note !== "") {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(note);
            localStorage.setItem("notes", JSON.stringify(notes));
            noteInput.value = ''; // Leeren des Textfeldes
            loadNotes();
        }
    });

    // Alle Notizen löschen
    clearBtn.addEventListener("click", function() {
        localStorage.removeItem("notes");
        loadNotes();
    });

    // Initiale Notizen laden
    loadNotes();
});
