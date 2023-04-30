/**
 * CUANDO EL BOTÓN DE SHOW SCORE ESTÁ EN DISPLAY
 * QUIERE DECIR QUE QUE ESTAMOS EN MÓVIL!!!!
 * ESTUDIAR ESOOO
 */

const cards = document.querySelectorAll(".flip-card");
cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
    if (!this.hasAttribute("imageShown")) {
        console.log("llego");
        this.style.transform = "rotateX(-180deg)";
        this.setAttribute("imageShown", "-180");
        console.log("180");
    } else {
        let currentDeg = parseInt(this.getAttribute("imageShown"));
        let newDeg = -180 + currentDeg;
        console.log(newDeg);
        this.style.transform = `rotateX(${newDeg.toString()}deg)`;
        this.setAttribute("imageShown", newDeg.toString());
    }
}