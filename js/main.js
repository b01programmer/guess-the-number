const inputGuess = document.querySelector(".input-guess");
const showNumber = document.querySelector(".show-number");
const playAgainWindow = document.querySelector(".again-window");
const btnPlayAgain = document.querySelector(".btn-play-again");
const btnSubmit = document.querySelector(".btn-submit-guess");
const messageContainer = document.querySelector(".messages");
// scoreboard ELEMENTS
const scoreBoardContainer = document.querySelector(".score-board__cont");
const totalWinEl = document.querySelector(".score-board__win-score");
const totalLoseEl = document.querySelector(".score-board__lose-score");
const totalMatches = document.querySelector(".score-board__match-total");
const btnOpenScoreBoard = document.querySelector(".btn-score-board");

// game scores
let attempts = 0;
let won = 0;
let lose = 0;
let matches = 0;
let randomGen = 0;
// won = Number(localStorage.getItem("won"));
// lose = Number(localStorage.getItem("lose"));
// matches = Number(localStorage.getItem("matches"));
// random generator also value has set to "randomGen"
const randomGenerator = () => (randomGen = Math.trunc(Math.random() * 10) + 1);
randomGenerator();
// initializer function also reset function (Except, winning score)
const initializer = function () {
  won = Number(localStorage.getItem("won"));
  lose = Number(localStorage.getItem("lose"));
  matches = Number(localStorage.getItem("matches"));
  totalWinEl.textContent = won;
  totalLoseEl.textContent = lose;
  totalMatches.textContent = matches;
  inputGuess.value = showNumber.value = "";
  attempts = 0;
  inputGuess.focus();
};
initializer();
// celebration for 2 seconds each time wins
const showWinner = function (newScore) {
  const html = `
  <div class="winner">
    <div class="winner__text-cont">
      <div>
        <h1 class="winning-score">${newScore}</h1>
      </div>
      <h3 class="heading-tertiary">Congratulations!🥳🎊🎉🎉</h3>
      <p class="winner__text">You Finally Did it! Once again. your winning score is now ${newScore}</p>
    </div>
  </div>`;
  setTimeout(() => {
    document.body.insertAdjacentHTML("afterend", html);
    const winner = document.querySelector(".winner");

    setTimeout(() => {
      winner.remove();
    }, 2000);
  }, 0);
};
// error message/notification
const showMsg = function (err = "uncaught error", txt = "please try again") {
  const html = `
  <div class="message-box">
    <div class="message__error-code">${err}</div>
    <div class="message">${txt}</div>
  </div>`;
  // aadding a timeout function to view the error message in WebApp and dissapear after 4 seconds
  // addMsg timeout function is just to view the message
  const addMsg = setTimeout(() => {
    messageContainer.insertAdjacentHTML("afterbegin", html);
    const messageBox = document.querySelector(".message-box");
    // setting styles to center with animation
    messageBox.setAttribute(
      "style",
      `transform: translateX(0%);
      opacity: 1;`
    );
    // removeMsg is to remove the message/error
    const removeMsg = setTimeout(() => {
      messageBox.setAttribute(
        "style",
        `transform: translateX(100%);
        opacity: 0;`
      );
      messageBox.remove();
    }, 4000);
  }, 0);
};

const updateTotalMatches = function () {
  matches++;
  totalMatches.textContent = matches;
  localStorage.setItem("matches", matches);
};

const randomGuess = function (e) {
  e.preventDefault();
  // if the user has tried more then 7 times then match over
  if (attempts >= 7) {
    lose++;
    updateTotalMatches();
    totalLoseEl.textContent = lose;
    localStorage.setItem("lose", lose);
    playAgainWindow.classList.remove("fade");
    return inputGuess.blur();
  }
  // if user has pick value greater then 10 then this will return a error message to UI
  if (inputGuess.value > 10)
    return showMsg(
      "Number is too High ",
      `
      Please try to pick Number between 0,10`
    );
  // if the user guess is empty then this will return a error message to UI
  if (inputGuess.value == "")
    return showMsg("input Field Empty", "Type a number between 0,10");
  attempts++;
  if (Number(inputGuess.value) === randomGen) {
    showNumber.value = randomGen;
    won++;
    totalWinEl.textContent = won;
    updateTotalMatches();
    localStorage.setItem("won", won);
    showWinner(won);
    initializer();
    randomGenerator();
  } else {
    inputGuess.value = "";
    showNumber.value = "❌";
    // showMsg("Number Not Matched!", "Please Try Again!");
  }
};

btnSubmit.addEventListener("click", randomGuess.bind(this));

btnOpenScoreBoard.addEventListener("click", function (e) {
  e.preventDefault();
  scoreBoardContainer.classList.remove("fade");
});
