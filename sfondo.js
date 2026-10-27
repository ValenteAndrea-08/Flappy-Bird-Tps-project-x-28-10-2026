
const btnSfondo = document.getElementById("btnSfondo");
const statoSfondo = document.getElementById("statoSfondo");
let sfondoAttuale = 1;

async function cambiaSfondo() {
    const sfondo2Attivo = board.classList.contains("sfondo2");
    const prossimoSfondo = sfondoAttuale %3+1;

    const percorso = sfondo2Attivo
        ? "./img/backgroundpfp.webp"
        : prossimoSfondo ===2
            ? "./img/back2.jpeg"
            : "./img/back1.webp";

    statoSfondo.textContent = "Caricamento sfondo in corso...";
    btnSfondo.disabled = true;

    try {
        // Attende il caricamento dell'immagine
        await new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = resolve;
            img.onerror = reject;
            img.src = percorso;
        });


        board.classList.remove("sfondo2", "sfondo3");
        if (prossimoSfondo === 2) {
            board.classList.add("sfondo2");
        } else if (prossimoSfondo === 3) {
            board.classList.add("sfondo3");
        }
        sfondoAttuale = prossimoSfondo;

        statoSfondo.textContent = "Sfondo caricato correttamente!";
    } catch (errore) {
        statoSfondo.textContent = "Errore nel caricamento dello sfondo.";
        console.error(errore);
    } finally {
        btnSfondo.disabled = false;
    }
}

btnSfondo.addEventListener("click", cambiaSfondo);




let body = document.body;
let btnBackground = document.getElementById("btnBackground");

btnBackground.addEventListener("click", function () {
    body.classList.toggle("sfondo2");
});