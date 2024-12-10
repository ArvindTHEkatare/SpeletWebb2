
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

//en sorts checker mechanic som kan blir true när gameover har skett men från början falskt
let isGameOver = false;

//en lista/array för alla utfall som finns för en tärning
const diceNumbers = [1,2,3,4,5,6];


function CalculationForScores() {
    if (isGameOver) {
        return;
    }

    let diceRoll = diceNumbers[Math.floor(Math.random() * diceNumbers.length)];
    diceDiv.textContent = `🎲 ${diceRoll}`;

    if (diceRoll === 1) {
        // Nollställ spelarens aktuella poäng
        currentScore = 0;
        document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: ${currentScore}`;
        
        // Byt spelare
        activePlayer = activePlayer === 0 ? 1 : 0;

        // Uppdatera UI för att visa vems tur det är
        document.getElementById('player-1').classList.toggle('active');
        document.getElementById('player-2').classList.toggle('active');
    } else {
        // Lägg till tärningsvärdet till spelarens aktuella poäng
        currentScore += diceRoll;
        document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: ${currentScore}`;
    }
}


function HoldScoreCalculation() {
    if (isGameOver) 
    {
        return;
    }
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer + 1}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 50) {
        alert(`Player ${activePlayer + 1} wins!`);
        isGameOver = true;
    } else {
        //switch player
         //switch player
         document.getElementById(`current-${activePlayer + 1}`).textContent = `Current: 0`;
         currentScore = 0;
         activePlayer = activePlayer === 0 ? 1 : 0;
         diceDiv.textContent = `🎲`;
    }
}

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


rollDiceBtn.addEventListener("click", CalculationForScores);
holdBtn.addEventListener("click", HoldScoreCalculation);
resetBtn.addEventListener("click", ResetCalculation)

