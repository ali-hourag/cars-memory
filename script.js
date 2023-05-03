/**
 * hey
 * CAMBIAR LA FUNCIÓN DE SETSCORE APRA HACER QUE LO VAYA 
 * ORDENANDO A MEDIDA QUE SE METE UN USUARIO, ES DECIR, QUE SE META ORDENADO YA
 * Y NO HAYA QUE IMPLEMENTAR LA FUNCIÓN DE ORDENAR
 * 
 * GUARDAR EN EL LOCALSTORAGE PRIMERO QUE MODO HA ELEGIDO DESPUÉS DE DARLO CLICK A ALGUNO
 * 
 * VER CÓMO SALEN LAS COSAS EN EL MÓVIL TRAS DARLE AL BOTÓN DE SHOW USERS SCORES
 * 
 * FUNCIONALIDADES FUTURAS: 
 * -BOTON SHOWUSERS SCORES
 * -TRAS DARLE EL BOTÓN DE START GUARDAR EL MODO ELEGIDO Y EL NOMBRE POR SI SE METE DESPUÉS, 
 * SIN EMBARGO NO LO AÑADIMOS AL ARRAY NI NADA
 * -PREPARA EL BOTÓN DE VOLVER ATRÁS
 * -GUARDAR EN EL LOCALSTORAGE PRIMERO QUE MODO HA ELEGIDO DESPUÉS DE DARLO CLICK A ALGUNO
 * - CAMBIAR LA FUNCIÓN DE SETSCORE APRA HACER QUE LO VAYA ORDENANDO A MEDIDA QUE SE METE UN USUARIO, ES DECIR, QUE SE META ORDENADO YA
 * Y NO HAYA QUE IMPLEMENTAR LA FUNCIÓN DE ORDENAR. ESO SE HARÁ TRAS PASAR A LA ÚLTIMA SECCIÓN Y HAYA ACABADO DE MANERA EFECTIVA.
 * 
 * -HABRÁ UN RANKING PARA CADA MODO, SI NO SE LE DA A NADA,LE AVISO QUE DE AUN MODO PARA QUE PUEDA IRLE BIEN EL RANKING
 * -SI LE DA A ALGUNO Y NO EXISTE LE DICE QUE "NO ENTRIES YET"
 * 
 * 
 * 
 * 
 * 
 * 
 */
//eventListener to the web page when loading
const webLoaded = window.addEventListener('load', gameLoaded);

/**
 * Function with no arguments or returns.
 * Called when the page is loaded.
 */
function gameLoaded() {
    setGameSettings(); //prepares first section of username and mode selection


    const gameSS = document.querySelector(".game-settings-section");
    const scoreBtn = document.querySelector(".users-score-btn");
    const scoreS = document.querySelector(".users-score-section");

    //Show the first section of game settings.
    gameSS.classList.toggle("section-display");

    //If the button is not showing it means, we are in a desktop device,
    //so the second section of players ranking will be shown
    if (getComputedStyle(scoreBtn).display === "none") {
        scoreS.classList.toggle("section-display");

    }
}
//------------------------------------------------------------------------------------------------------------------------
/**
 * Function that does not receive or return nothing.
 * It sets the settings parts and shows it on the display.
 */
function setGameSettings() {
    //It will be appended to the main element.
    const mainPage = document.querySelector("main");

    //Piece of HTML that will be inserted.
    let htmlInserted = `
    <section class="game-settings-section">
        <img class="bmw-logo" src="assets/img/bmw-logo.png">
        <h2 class="choice-uname-text">CHOSE A USERNAME</h2>
        <input type="text" id="username" placeholder="user name" class="input-username">

        <h2 class="choice-game-mode">SELECT A GAME MODE</h2>
            <!--Game modes-->
        <form class="modes-container">
            <fieldset>
                <input id="easy-mode" type="radio" name="game-modes" value="easy-mode" class="input-game-mode">
                <label for="easy-mode" class="label-game-mode mode1">EASY</label>
            </fieldset>
            <fieldset>
                <input id="hard-mode" type="radio" name="game-modes" value="hard-mode" class="input-game-mode">
                <label for="hard-mode" class="label-game-mode mode2">HARD</label>
            </fieldset>
            <fieldset>
                <input id="no-mistakes-mode" type="radio" name="game-modes" value="no-mistakes-mode"
                    class="input-game-mode">
                <label for="no-mistakes-mode" class="label-game-mode mode3">NO MISTAKES</label>
            </fieldset>
            <fieldset>
                <input id="pro-mode" type="radio" name="game-modes" value="pro-mode" class="input-game-mode">
                <label for="pro-mode" class="label-game-mode mode4">PRO</label>
            </fieldset>
        </form>
        <button class="users-score-btn">SHOW USERS SCORES</button>
        <button class="start-game-btn">START</button>
    </section>`;

    //Insert it as the first child of main
    mainPage.insertAdjacentHTML("afterbegin", htmlInserted);

    //Example to see if it works properly. It will be erased of course, since this will be done by the LocalStorage
    let usersScore = [{ Player: "Ali", Score: 67 }, { Player: "Ali1", Score: 120 }, { Player: "Ali2", Score: 34 }, { Player: "Ali3", Score: 68 }, { Player: "Ali4", Score: 57 },
    { Player: "Ali5", Score: 110 }, { Player: "Ali6", Score: 88 }, { Player: "Ali7", Score: 340 }, { Player: "Ali8", Score: 77 }, { Player: "Ali9", Score: 65 }, { Player: "Ali10", Score: 71 },
    { Player: "Ali11", Score: 54 }, { Player: "Ali12", Score: 52 }, { Player: "Ali13", Score: 43 }, { Player: "Ali14", Score: 18 }];
    let usersScore1 = [{ Player: "Ali", Score: 67 }, { Player: "Ali1", Score: 120 }];
    //Call this function giving the array of objects of the players as a parameter.
    setUsersScore(orderArrayOfObjects(usersScore, 1));

}


//------------------------------------------------------------------------------------------------------------------------

/**
 * This function shows the ranking of players if there is any.
 * @param receives an array of objects of the players
 */
function setUsersScore(scoresArray) {

    let htmlInserted = ``;
    //It will be appended after this section as a sibling element
    const gameSS = document.querySelector(".game-settings-section");

    //If the array is empty, i.e, no one has finished successfully and there
    //are no records, then show the next part as "NO ENTRIES YET..."
    if (scoresArray.length === 0) {
        htmlInserted = `
        <section class="users-score-section">
            <h2 class="score-text">HIGH SCORE TABLE</h2>
            <section class="ranking-score">
                <p>NO ENTRIES YET...</p>
            </section>
        </section>`;
        gameSS.insertAdjacentHTML("afterend", htmlInserted);
    } else {

        //Borramos la sección por si existía anteriormente, ya que puede ser diferente a como la tenemos ahora mismo
        //Y nos puede dar problemas.
        //Select direct child of main that are sections, 
        const sectionsPage = document.querySelectorAll("main > section");

        //Nos da una lista de las secciones que tenemos en la página.
        //Si tiene una longitud > 1, significa que esta sección fue creadad
        //anteriormente y debemos eliminar lo que había
        if (sectionsPage.length > 1) sectionsPage[1].remove();

        //Aquí abajo lo volvemos a meter.
        //La realidad es que habrá ranking diferentes y quizás tengamos la entrada primera de que
        // "NO ENTRIES YET"
        //Meto html de la sección, para más tarde poder meter los divs que contienen
        //la información de cada player.
        htmlInserted = `
        <section class="users-score-section">
            <h2 class="score-text">HIGH SCORE TABLE</h2>
            <section class="ranking-score">

                
            </section>
            <button class="back-btn">GO BACK</button>
        </section>`;
        //Lo insertamos después de la primera sección.
        gameSS.insertAdjacentHTML("afterend", htmlInserted);


        let divRanking = ``;
        const rankingSection = document.querySelector(".ranking-score");

        let i = 0;
        while (i < scoresArray.length && i < 10) {
            let imgSrc = "";
            if (i === 0) imgSrc = "gold";
            else if (i === 1) imgSrc = "silver";
            else if (i === 2) imgSrc = "bronze";
            else imgSrc = "medal";
            divRanking = `
            <div class="player-ranking">
                <img src="assets/img/medals/${imgSrc}.png">
                <p>${scoresArray[i].Player}</p>
                <p>${scoresArray[i].Score} SECONDS</p>
            </div>
            `;
            rankingSection.insertAdjacentHTML("beforeend", divRanking);
            i++;
        }

    }
}



//------------------------------------------------------------------------------------------------------------------------
/**
 * This function adds the first elem of the array.
 * Then it keeps comparing the rest of the elements. Each element is compared what we already have in the array,
 * if it is smaller than the element in the array, then it keeps advancing until it finds a smaller number or
 * when the array finishes which means that elem is the smallest.
 * @param {*} arrayReceived Array of objects to order it in the basis of parameterCompared
 * @param {*} parameterCompared //Index of the parameter that stores the value that is compared. Must be a number
 * @returns returns the array ordered from the biggest to the smallest.
 * This can be changed with the reverse method.
 */
function orderArrayOfObjects(arrayReceived, indexParamCompared) {
    let arrayOrdered = []; //Array which will store the elements ordered
    for (let elem in arrayReceived) {
        //if elem == "=", the we push the first elem to the array (else)
        //Otherwise, enter in the if sentence
        if (elem != "0") {
            let i = 0;
            //access the value with the Objects.value method which return a string of values,
            //and we select the value by taking it with its index
            while (i < arrayOrdered.length && Object.values(arrayReceived[elem])[indexParamCompared] < Object.values(arrayOrdered[i])[indexParamCompared]) {
                i++;
            }
            //Enter the element in its due place
            arrayOrdered.splice(i, 0, arrayReceived[elem]);
        }
        else arrayOrdered.push(arrayReceived[elem]);
    }
    return arrayOrdered;
}



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