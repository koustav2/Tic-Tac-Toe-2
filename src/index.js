import "./styles.css";

const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#msg");
const rstBtn = document.querySelector("#restart");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6]
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  cells.forEach((ele) => (ele.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};
//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  cells.forEach((ele) => {
    ele.innerText = "";
    ele.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};
//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter === "X") {
    status.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    status.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};
//Function for draw
const drawFunction = () => {
  disableButtons();
  status.innerHTML = "&#x1F60E; <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

rstBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

const winCheck = () => {
  for (let i in winConditions) {
    let [ele1, ele2, ele3] = [
      cells[winConditions[i][0]].innerText,
      cells[winConditions[i][1]].innerText,
      cells[winConditions[i][2]].innerText
    ];

    if (ele1 !== "" && (ele2 !== "") & (ele3 !== "")) {
      if (ele1 === ele2 && ele2 === ele3) {
        winFunction(ele1);
      }
    }
  }
};

cells.forEach((ele) => {
  ele.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      ele.innerText = "X";
      ele.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      ele.innerText = "O";
      ele.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count === 9) {
      drawFunction();
    }
    //Check for win on every click
    winCheck();
  });
});

window.onload = enableButtons;
