
const btnSfondo = document.getElementById("btnSfondo");
const statoSfondo = document.getElementById("statoSfondo");

async function cambiaSfondo() {
    const sfondo2Attivo = board.classList.contains("sfondo2");

    const percorso = sfondo2Attivo
        ? "./img/backgroundpfp.webp"
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

        // Cambia sfondo soltanto dopo il caricamento
        board.classList.toggle("sfondo2");

        statoSfondo.textContent = "Sfondo caricato correttamente!";
    } catch (errore) {
        statoSfondo.textContent = "Errore nel caricamento dello sfondo.";
        console.error(errore);
    } finally {
        btnSfondo.disabled = false;
    }
}

btnSfondo.addEventListener("click", cambiaSfondo);


//btnSfondo.addEventListener("click", function () {
//    board.classList.toggle("sfondo2");
//});