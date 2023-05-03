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
 * 
 * 
 * 
 * -HABRÁ UN RANKING PARA CADA MODO, SI NO SE LE DA A NADA,LE AVISO QUE DE AUN MODO PARA QUE PUEDA IRLE BIEN EL RANKING
 * -SI LE DA A ALGUNO Y NO EXISTE LE DICE QUE "NO ENTRIES YET"
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * CHECK A MODE IS CHECKED BEFORE CLICKING THE BUTTON START
 * 
 * TENGO QUE AÑADIR LA PARTE DEL SET CARDGAMES QUE DEPENDE DEL MODO QUE HAYA ELEGIDO, SALE UNA DISPOSICIÓN U OTRA
 * 
 * 
 * HACER QUE EL MODO ELEGIDO SE QUEDE GUARDADO EN LOCALSTORAGE CUANDO VAYAMOS A VER EL RANKING Y VOLVAMOS Y EN TODOS CASOS
 * ASÍ COMO EL NOMBRE INTRODUCIDO
 * 
 * 
 * 
 * 
 * 
 * 
 * setUsersScore has to be called again to update when someone
 * completes something succesfully.
 * 
 * 
 * 
 * LOS CREO UNA VEZ, LUEGO JUEGO CON DISPLAYS Y COSAS ASÍ
 * SI ES NECESARIO TOCARLOS UN POCO Y ACTUALIZARLOS SE VUELVEN A LLAMAR.
 * LOS ÚNICOS 2 QUE HAY QUE HACER REMOVE POR SI ENTRA INFO NUEVA SON LOS DEL SETUSERSCORE
 * Y EL OTRO DE LAS CARTAS POR LA DISPOSICIÓN Y LAS FOTOS SI DA OTRA COSA QUE NO
 * SE VUELVAN A CREAR!!!
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
    //Show the first section of game settings.
    gameSS.classList.add("section-display");



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

    //Disable start game button until a game mode is selected
    const startBtn = document.querySelector(".start-game-btn");
    startBtn.disabled = true;
    //Now, we add an EventListener to the button
    startBtn.addEventListener("click", startBtnClicked);


    //See if I have the button to see users score, then it means I am on a mobile phone device.
    //If that buttons is not seen, then cool, nothing to do.
    //However, if th ebutton is shown we do have to sections from the first one to the second one.
    const scoreBtn = document.querySelector(".users-score-btn");


    //IF the button is not there, then it means we in a display, show both sections

    if (getComputedStyle(scoreBtn).display === "none") {
        //DESKTOP
        setUsersScore();
        const scoreS = document.querySelector(".users-score-section");
        scoreS.classList.add("section-display");
    } else {
        //create addEventListener for the show users scores if he wants to see it
        const showUsers = document.querySelector(".users-score-btn");

        showUsers.addEventListener("click", showScoreBtnClicked);
    }

    const inputUsername = document.querySelector("#username");
    inputUsername.addEventListener("focusout", userEntered);

    const modeSelected = document.querySelectorAll(".input-game-mode");
    modeSelected.forEach((mode) => {
        mode.addEventListener("change", gameModeClicked)
        if (localStorage.getItem("gameMode") !== null) {
            //So that it keeps checked if the apge reloads
            if (mode.getAttribute("id") === localStorage.getItem("gameMode")) {
                mode.checked = true;

                if (localStorage.getItem("username") !== null && localStorage.getItem("username").length > 2) startBtn.disabled = false;
            }
        }
    })

    //Enter the things from localStorage
    if (localStorage.getItem("username") !== null) inputUsername.value = localStorage.getItem("username");


}


//------------------------------------------------------------------------------------------------------------------------

/**
 * This function shows the ranking of players if there is any.
 * will receive an array of objects of the players from LocalStorage
 */
function setUsersScore() {

    //Example to see if it works properly. It will be erased of course, since this will be done by the LocalStorage
    let usersScore = [{ Player: "Ali", Score: 67 }, { Player: "Ali1", Score: 120 }, { Player: "Ali2", Score: 34 }, { Player: "Ali3", Score: 68 }, { Player: "Ali4", Score: 57 },
    { Player: "Ali5", Score: 110 }, { Player: "Ali6", Score: 88 }, { Player: "Ali7", Score: 340 }, { Player: "Ali8", Score: 77 }, { Player: "Ali9", Score: 65 }, { Player: "Ali10", Score: 71 },
    { Player: "Ali11", Score: 54 }, { Player: "Ali12", Score: 52 }, { Player: "Ali13", Score: 43 }, { Player: "Ali14", Score: 18 }];

    //Call this function giving the array of objects of the players as a parameter.
    let playersArray = orderArrayOfObjects(usersScore, 1);



    let htmlInserted = ``;
    //It will be appended after this section as a sibling element
    const gameSS = document.querySelector(".game-settings-section");

    // If this section existed before has to be erased, since we do not know
    // from which part is coming and its text, or the page has been restarted and now it is being created
    // from scratch. So I remove it completely
    const sectionsPage = document.querySelectorAll("main > section");

    if (sectionsPage.length > 1) {
        if (sectionsPage[1].getAttribute("class") === "users-score-section") {
            sectionsPage[1].remove();
        }
    }

    //If the array is empty, i.e, no one has finished successfully and there
    //are no records, then show the next part as "NO ENTRIES YET..."
    if (playersArray.length === 0) {
        let message = "";
        if (localStorage.getItem("gameMode") !== null) message = "NO ENTRIES YET...";
        else message = "SELECT A GAME MODE";
        htmlInserted = `
        <section class="users-score-section">
            <h2 class="score-text">HIGH SCORE TABLE</h2>
            <section class="ranking-score">
                <p>${message}</p>
            </section>
        </section>`;
        gameSS.insertAdjacentHTML("afterend", htmlInserted);
    } else {
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
        while (i < playersArray.length && i < 10) {
            let imgSrc = "";
            if (i === 0) imgSrc = "gold";
            else if (i === 1) imgSrc = "silver";
            else if (i === 2) imgSrc = "bronze";
            else imgSrc = "medal";
            divRanking = `
            <div class="player-ranking">
                <img src="assets/img/medals/${imgSrc}.png">
                <p>${playersArray[i].Player}</p>
                <p>${playersArray[i].Score} SECONDS</p>
            </div>
            `;
            rankingSection.insertAdjacentHTML("beforeend", divRanking);
            i++;
        }

    }
}
//------------------------------------------------------------------------------------------------------------------------
function setCardGame() {
    const sectionsPage = document.querySelectorAll("main > section");
    let insertedHTML = ``;
    if (sectionsPage.length > 1) {
        for (section of sectionsPage) {
            if (section.getAttribute("class") === "cards-game-section") {
                section.remove();
            }
        }
    }
    insertedHTML = `
    <section class="cards-game-section">
            <h2 class="guess-card-text">GUESS THE RIGHT CARD</h2>
            <p class="timer-cards"></p>
            <div class="cards-container">
                
            </div>
            <button class="cancel-btn">CANCEL</button>

        </section>`;

    const mainPage = document.querySelector("main");
    mainPage.insertAdjacentHTML("beforeend", insertedHTML);

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", cancelBtnClicked);


    if (["easy-mode", "no-mistakes-mode"].indexOf(localStorage.getItem("gameMode")) !== -1) {
        createTemplateCards(12);
    } else {
        createTemplateCards(18);

    }


}
//------------------------------------------------------------------------------------------------------------------------
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//------------------------------------------------------------------------------------------------------------------------
function createTemplateCards(cardNums) {
    const cardsContainer = document.querySelector(".cards-container");
    let arrayImgSrcsCards = new Array(cardNums);
    while (arrayImgSrcsCards.includes(undefined)) {

        let imgNumber = randomIntFromInterval(0, 9);
        let imgSrc = `bmw${imgNumber}`;

        if (!arrayImgSrcsCards.includes(imgSrc)) {
            let insertedImg = 0;

            while (insertedImg < 2) {

                let indexOfInsertion = randomIntFromInterval(0, cardNums - 1);

                if (arrayImgSrcsCards[indexOfInsertion] === undefined) {
                    arrayImgSrcsCards[indexOfInsertion] = imgSrc;
                    insertedImg++;
                }
            }
        }
    }
    for (img in arrayImgSrcsCards) {
        let insertedHTML = `
             <div class="flip-card ${arrayImgSrcsCards[img]} img${img}">
                 <div class="backface-card"></div>
                 <img src="assets/img/game-mode/${arrayImgSrcsCards[img]}.png" class="image-card">
             </div>`;
        cardsContainer.insertAdjacentHTML("beforeend", insertedHTML);

    }

    const cards = document.querySelectorAll(".flip-card");
    cards.forEach(card => {
        card.style.transform = `rotateX(-180deg)`;
        card.setAttribute("image-shown", "-180");
    });

    let seconds;
    if (["easy-mode", "no-mistakes-mode"].indexOf(localStorage.getItem("gameMode")) !== -1) seconds = 3000;

    else seconds = 5000;
    let hideCards = setTimeout(() => {
        cards.forEach((card) => {
            let currentDeg = parseInt(card.getAttribute("image-shown"));
            let newDeg = -180 - currentDeg;

            card.style.transform = `rotateX(${newDeg.toString()}deg)`;
            card.setAttribute("image-shown", "0");
            card.addEventListener("click", flipCard);
            if (seconds === 5000) setUpTimer();
        });
    }, seconds);


    // let currentDeg = parseInt(this.getAttribute("image-shown"));
    // let newDeg = -180 + currentDeg;
    // this.style.transform = `rotateX(${newDeg.toString()}deg)`;
    // this.setAttribute("image-shown", newDeg.toString());
    // localStorage.setItem("selectedCard", this.getAttribute("value"));
}


//------------------------------------------------------------------------------------------------------------------------

//Ver que pasa si da click y la quiere guardar, es decir si previous es igual a la de ahora

function flipCard() {
    console.log("Ss");
    const cards = document.querySelectorAll(".flip-card");
    let cardsFlipped = 0;

    cards.forEach(card => {
        if (parseInt(card.getAttribute("image-shown")) % 360 !== 0) cardsFlipped += 1;
    });

    console.log(cardsFlipped);
    //Si antes había un nº par 0,2,3 quiere decir que estamos en una nueva
    //tanda, por lo que guardamos la dejamos a la vista a la espera de la segunda carta.
    let newDeg = (-180 + parseInt(this.getAttribute("image-shown"))).toString();
    this.style.transform = `rotateX(${newDeg}deg)`;
    this.setAttribute("image-shown", newDeg.toString());

    if (cardsFlipped % 2 === 0) {
        let cardClasses = this.getAttribute("class").split(" ");
        localStorage.setItem("selectedCard", `${cardClasses[1]} ${cardClasses[2]}`);
    } else {

        if (this.getAttribute("class").split(" ")[1] === localStorage.getItem("selectedCard").split(" ")[0]) {
            const equalCards = document.querySelectorAll(`.${localStorage.getItem("selectedCard").split(" ")[0]}`);
            equalCards.forEach(card => (card.removeEventListener("click", flipCard)));
            localStorage.removeItem("selectedCard");
        } else {
            let hidePairOfCards = setTimeout(() => {
                let = newDeg;
                newDeg = (-180 + parseInt(this.getAttribute("image-shown"))).toString();
                this.style.transform = `rotateX(${newDeg}deg)`;
                this.setAttribute("image-shown", newDeg);
                //CUIDAR QUE SEA JUSTO LA QUE QUEREMOS QUITAR!! PQ HAY DOS IGUALES Y COGE LA QUE HAY ANTES!!
                const previousCard = document.querySelector(`.${localStorage.getItem("selectedCard").split(" ")[0]}.${localStorage.getItem("selectedCard").split(" ")[1]}`);
                newDeg = (-180 + parseInt(previousCard.getAttribute("image-shown"))).toString();
                previousCard.style.transform = `rotateX(${newDeg}deg)`;
            }, 1500);
        }
    }


    // } else { // QUITAR Y HACER QUE SE ENSEÑE 3 SEGUNDOS AL ARRANCAR LA PÁGINA
    // console.log(this.hasAttribute("image-shown"));
    // let currentDeg = parseInt(this.getAttribute("image-shown"));
    // let newDeg = -180 + currentDeg;
    // this.style.transform = `rotateX(${newDeg.toString()}deg)`;
    // this.setAttribute("image-shown", newDeg.toString());
    // localStorage.setItem("selectedCard", this.getAttribute("value"));
    //}
}

//------------------------------------------------------------------------------------------------------------------------
function cancelBtnClicked() {
    changeSection(".cards-game-section", ".game-settings-section");
}
//------------------------------------------------------------------------------------------------------------------------
function setUpTimer() {
    let counter = 89;
    const pTimerCards = document.querySelector(".timer-cards");
    pTimerCards.innerText = "1:30";
    let timerCards = setInterval(() => {
        if (counter >= 0) {
            let min = Math.trunc(counter / 60);
            let sec = counter-- % 60;
            if (sec > 9) pTimerCards.innerText = `${min}:${sec}`;
            else pTimerCards.innerText = `${min}:0${sec}`;

        } else {
            stopInterval(timerCards);
        }
    }, 1000);
}

function stopInterval(interval) {
    clearInterval(interval);
}
//------------------------------------------------------------------------------------------------------------------------

/**
 * Called from gameModeClick(), after clicking in a game mode
 */
function startBtnClicked() {
    setCardGame();
    changeSection(".game-settings-section", ".cards-game-section");
}
//------------------------------------------------------------------------------------------------------------------------

function showScoreBtnClicked() {
    //Add new section of the users score so that it can be changes
    setUsersScore();
    changeSection(".game-settings-section", ".users-score-section");
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", backBtnClicked);
}
//------------------------------------------------------------------------------------------------------------------------
function backBtnClicked() {
    changeSection(".users-score-section", ".game-settings-section");
}
//------------------------------------------------------------------------------------------------------------------------
function gameModeClicked() {
    const startBtn = document.querySelector(".start-game-btn");
    const modeSelected = document.querySelectorAll(".input-game-mode");
    const inputUsername = document.querySelector("#username");
    for (mode of modeSelected) {
        if (mode.checked) {
            localStorage.setItem("gameMode", mode.getAttribute("id"));
            if (inputUsername.value !== "" && inputUsername.value.length > 2) {
                startBtn.disabled = false;

                break;
            }
        } else startBtn.disabled = true;
    }

}
//------------------------------------------------------------------------------------------------------------------------
function userEntered() {
    const startBtn = document.querySelector(".start-game-btn");
    const modeSelected = document.querySelectorAll(".input-game-mode");
    const inputUsername = document.querySelector("#username");
    localStorage.setItem("username", inputUsername.value);
    for (mode of modeSelected) {
        if (mode.checked && inputUsername.value !== "" && inputUsername.value.length > 2) {
            startBtn.disabled = false;
            //Now, we add an EventListener to the button
            startBtn.addEventListener("click", startBtnClicked);
            break;
        } else startBtn.disabled = true;
    }
}

//------------------------------------------------------------------------------------------------------------------------
function changeSection(selectorPrevious, selectorNext) {
    const showUsersBtn = document.querySelector(".users-score-btn");
    const gameSS = document.querySelector(".game-settings-section");

    const userSection = document.querySelector(".users-score-section");
    //When going from first section to the card one when we are on the desktop
    // since in that instance both sections are showed and the selector previous is just the first one.
    if (selectorPrevious === ".game-settings-section" && userSection !== null) {
        if (userSection.classList.contains("section-display")) userSection.classList.remove("section-display");
    } else if (selectorPrevious === ".cards-game-section" && getComputedStyle(showUsersBtn).display === "none") {
        userSection.classList.add("section-display");
    }
    const previous = document.querySelector(selectorPrevious);
    const next = document.querySelector(selectorNext);
    previous.classList.remove("section-display");
    next.classList.add("section-display");

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





