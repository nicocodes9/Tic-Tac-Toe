//  definition of elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game");
let msgWinner = document.querySelector("#msg");

let turn_O = true; // player 1 turn will be with O
let count = 0; // to track draw
let winningSound = document.querySelector("#winSound");
// to store the winning pattern in our JS we have to ake a 2d array
const winPatterns = [
  [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ],
]; // winning patterns for tic tac toe game

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    console.log("button was clicked");
    if (turn_O === true) {
      // player O
      box.textContent = "O";
      turn_O = false; // its set to false to display X for the next persons turn
    } else {
      // player X
      box.textContent = "X";
      turn_O = true; // its set to true to display O for the next persons turn
    }
    box.disabled = true;
    count++;
    checkWinner();
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw(); // if no one is winner it will call the gameDraw function
    }
  });
});
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msg.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns[0]) {
    // console.log(pattern);   here pattern is an array , that contain all the winning combinations
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;
    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        console.log(`Player ${pos1Value} wins!`);
        showWinner(pos1Value); // calling the showWinner function here
        return true; // this will return a value when the function is called
      }
    }
  }
};
//  declaring the ShowWinner function
const showWinner = () => {
  msgWinner.classList.remove("hide");
  msgWinner.textContent = "Player " + (turn_O ? "X" : "O") + " wins!";
  disableBoxes();
  playWinningSound();
};
//  winning sound play function
const playWinningSound = () => {
  const audio = new Audio("mixkit-achievement-bell-600.wav");
  audio.play();
};

//  function to disable boxes when the game is finished
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
//  function to enable boxes incase of reset buttons
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

//  reset Game functionality
const resetGame = () => {
  enableBoxes();
  turn_O = true;
  msgWinner.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame); //this mean that whenever this button will be clicked the resetGame function will be executed
resetBtn.addEventListener("click", resetGame);
