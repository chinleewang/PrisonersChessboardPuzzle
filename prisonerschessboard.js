const modes = 
  [
    {mode:"Warden Flipping Coins",
     instructions:"Click to flip coins",
     prev:"N/A",
     next:"Switch to Setting Key",
     clickAction:"flipCoin",
     keyVisibility:true},
    {mode:"Warden Setting Key",
     instructions:"Click to set key",
     prev:"Switch to Flipping Coins",
     next:"Switch to Prisoner A",
     clickAction:"setKey",
     keyVisibility:true},
    {mode:"Prisoner A",
     instructions:"Click to flip coin",
     prev:"Switch to Warden",
     next:"Switch to Prisoner B",
     clickAction:"flipCoin",
     keyVisibility:true},
    {mode:"Prisoner B",
     instructions:"Click to identify key",
     prev:"Switch to Prisoner A",
     next:"N/A",
     clickAction:"idKey",
     keyVisibility:false}
  ];

const size = 4;

var board = [];
var mode = 0;
var clickAction = "flipCoin";
var keyVisibility = "true";
var keyLocation = {x:-1, y:-1};

var coinHeads = "<div class='pngcontainerHeads'></div>";
var coinTails = "<div class='pngcontainerTails'></div>";
var coinHeadsKey = "<div class='pngcontainerHeadsKey'></div>";
var coinTailsKey = "<div class='pngcontainerTailsKey'></div>";

function setGameBackground(bgClass) {
  gameBackground = document.getElementById("background");
  gameBackground.className = bgClass;
}

function updateSquareImage(obj) {
  if ((keyVisibility == true) && 
      (obj.dataset.x == keyLocation.x) && 
      (obj.dataset.y == keyLocation.y)) {
    if (obj.dataset.coin == "heads")
      obj.innerHTML = coinHeadsKey;
    else
      obj.innerHTML = coinTailsKey;
  }
  else {
    if (obj.dataset.coin == "heads")
      obj.innerHTML = coinHeads;
    else
      obj.innerHTML = coinTails;
  }
}

function updateAllSquareImages() {
  //let board = document.getElementById("board"); //doesn't work
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      updateSquareImage(board[i][j]);
    }
  }
}

function clickSquare(obj) {  //change name for all click actions
  if (clickAction == "flipCoin") {
    if (obj.dataset.coin == "heads") 
      obj.dataset.coin = "tails";
    else
      obj.dataset.coin = "heads";
  }
  else if (clickAction == "setKey") {
    keyLocation.x = obj.dataset.x;
    keyLocation.y = obj.dataset.y;
    updateAllSquareImages();
  }
  else if (clickAction == "idKey") {
    if ((keyLocation.x == obj.dataset.x) && (keyLocation.y == obj.dataset.y)) {
      keyVisibility = true;
      setGameBackground("bgGetOutOfJail");
      document.getElementById("mode").innerHTML="Get Out Of Jail"
    }
    else {
      setGameBackground("bgPrison");
      document.getElementById("mode").innerHTML="Go Back To Your Cell"
    }
  }
  updateSquareImage(obj);
}

function initTable() {
  let table = document.getElementById("board");
  let tabcolor2 = getComputedStyle(document.querySelector(":root")).getPropertyValue("--tabcolor2");

  for (let i = 0; i < size; i++) {
    let row = table.insertRow();
    board.push([]);
    for (let j = 0; j < size; j++) {
      let cell = row.insertCell();
      board[i].push(cell);
      cell.style.alignSelf = "center";
      cell.style.verticalAlign = "middle";
      if ((i + j) % 2 == 0) {
        cell.style.backgroundColor = tabcolor2;
      }
      cell.dataset.coin = "heads";
      cell.dataset.x = i;
      cell.dataset.y = j;
      updateSquareImage(cell);
      cell.onclick = function() {clickSquare(this)};
    }
  }
}

function setMode() {
  if (mode < 0)
    mode = 0;
  else if (mode >= modes.length)
    mode = modes.length - 1;
  let modeText = document.getElementById("mode");
  let instructionsText = document.getElementById("instructions");
  let prevText = document.getElementById("prev");
  let prevArrow = document.getElementById("prevArrow");
  let nextArrow = document.getElementById("nextArrow");
  let nextText = document.getElementById("next");
  modeText.innerHTML = modes[mode].mode;
  instructionsText.innerHTML = modes[mode].instructions;
  prevText.innerHTML = modes[mode].prev;
  if (modes[mode].prev == "N/A") {
    prevText.style.display = "none";
    prevArrow.style.display = "none";
  }
  else {
    prevText.style.display = "initial";
    prevArrow.style.display = "initial";
  }
  nextText.innerHTML = modes[mode].next;
  if (modes[mode].next == "N/A") {
    nextText.style.display = "none";
    nextArrow.style.display = "none";
  }
  else {
    nextText.style.display = "initial";
    nextArrow.style.display = "initial";
  }
  clickAction = modes[mode].clickAction;
  keyVisibility = modes[mode].keyVisibility;
  if (!keyVisibility)
    updateAllSquareImages();
  setGameBackground("bgDefault");
}

function nextMode() {
  mode++;
  setMode();
}

function prevMode() {
  mode--;
  setMode();
}
