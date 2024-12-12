// ARVIND
//referens till html dokumentet, referar till players scores och lagrar score i p1 och p2 scores respektivt 
let p1Score = document.getElementById("score-1");
let p2Score = document.getElementById("score-2");
//referens till p1, p2 current, dvs poängräkningar osv JUST NU.
let p1Current = document.getElementById("current-1");
let p2Current = document.getElementById("current-2");
//referenser till alla olika knappar som finns, det finns från början en för roll dice, en för holdscore och en för reset allting
let rollDiceBtn = document.getElementById("roll-dice");
let holdBtn = document.getElementById("hold");
let resetBtn = document.getElementById("reset");
//referensen till diven, dice. 
let diceDiv = document.getElementById("dice");
//en array, som har 2 indxes,[0,1] respektivt och scores kommer vara lagrad här då.
let scores = [0, 0];
//2 olika variabler, en för currentscore och en för active player.
let currentScore = 0;
let activePlayer = 0;

// ARVIND
// skapar h1 element diceValue
let diceValue = document.createElement("h1");
diceValue.id = "dice-value"; //ger h1, en id som är dice-value
diceValue.textContent = "Dice Value 🎲: -"; //text från början
diceValue.style.color = "black"; // sätter färgen som svart, passar utseende

// ARVIND
// skapar header variabeln och appendar diceValue till det, så det är synligt på Skärmen
let header = document.querySelector("header");
header.appendChild(diceValue);

// ARVIND
//en sorts checker mechanic som kan blir true när gameover har skett men från början falskt
let isGameOver = false;

// ARVIND
//en lista/array för alla utfall som finns för en tärning
const diceNumbers = [1,2,3,4,5,6];

// ARVIND
//funktionen som gör alla beräkningar kan man säga
function CalculationForScores() {
    //en sorts checker mekanik, om det är sant, returnera bara (så koden under kommer inte ta plats)
    if (isGameOver) {
        return;
    }

    //spara/lagra dice value från 1-6. Använder indexering här
    let diceRoll = diceNumbers[Math.floor(Math.random() * diceNumbers.length)];
    
    diceDiv.textContent = `🎲 ${diceRoll}`;
    //visa det tärning värde som player 1 eller 2 fick
    diceValue.textContent = `Dice Value 🎲 : ${diceRoll}`;

    //en if statement, 3 st = jamför både datatyp och 
    if (diceRoll === 1) {
        // Nollställ spelarens aktuella poäng.
        currentScore = 0;
        // uppdatera aktuell poäng för den aktiva spelaren i UI
        document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: ${currentScore}`;
        
        // Byt spelare
        activePlayer = 1 - activePlayer;

        // Uppdatera UI för att visa vems tur det är
        // växla "active"-klassen mellan spelare för att markera vems tur det är
        document.getElementById('player-1').classList.toggle('active');
        document.getElementById('player-2').classList.toggle('active');
    } else {
        // Lägg till tärningsvärdet till spelarens aktuella poäng
        currentScore += diceRoll;
        // updatera aktuell poäng för den aktiva spelaren i UI
        document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: ${currentScore}`;
    }
}

// OMID
//funktionen som gör alla tar plats om man trycker på hold
function HoldScoreCalculation() {
    //en sorts checker mekanik, om det är sant, returnera bara (så koden under kommer inte ta plats)
    if (isGameOver) 
    {
        return;
    }
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer + 1}`).textContent = scores[activePlayer];
    //om score of active player (inte current score) är lika med eller över 50,
    if (scores[activePlayer] >= 50) {
        //player 1 eller 2 vinner.
        alert(`Player ${activePlayer + 1} wins!`);
        //nu borde isGameOver bli sant eftersom spelet har tagit slut
        isGameOver = true;
        //resetar alla värde.
        ResetCalculation();
    } else {
         //switch player
         // sätter aktuell poäng till 0 för den aktiva spelaren i UI
         document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: 0`;
         //current score blir ju 0
         currentScore = 0;
        //byt spelare genom att växla mellan 0 och 1 (modulo 2)
         activePlayer = (activePlayer + 1) % 2;
         diceDiv.textContent = `🎲`;
    }
}
// MAJD
function ResetCalculation() {
    // Återställ alla variabler till startvärden
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isGameOver = false;

    // Återställ poäng i HTML
    p1Score.textContent = "0";
    p2Score.textContent = "0";
    p1Current.textContent = "Current: 0";
    p2Current.textContent = "Current: 0";

    // Återställ tärningsvisningen
    diceDiv.textContent = "🎲";

    // Eventuellt återställ andra UI-element om du har lagt till något
    alert("Spelet har återställts!");
}

//adderar event listener, i vår fall arguement 1 är click och 2 är den funktion som är ansvarig.
rollDiceBtn.addEventListener("click", CalculationForScores);
holdBtn.addEventListener("click", HoldScoreCalculation);
resetBtn.addEventListener("click", ResetCalculation)

