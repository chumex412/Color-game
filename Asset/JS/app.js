let max = 255;
let numBoxes = 6;
let numGuess = 3;
let guessLeft = numGuess;
let color = getRandomColor(numBoxes);
let guess = pickColor();

// UI Elements
const wrapper = document.querySelector('.wrapper'),
      navButton = document.querySelector('.nav'),
      reset = document.querySelector('.reset'),
      boxes = document.querySelectorAll('.box'),
      gameMode = document.querySelectorAll('.mode'),
      easy = document.querySelector('.easy'),
      hard = document.querySelector('.hard'),
      bgValue = document.querySelector('.bg-value'),
      header = document.querySelector('#page-header'),
      message = document.querySelector('.message');

changeColor();

//Assigning random colors to each boxes
function changeColor()  {
  for(let i = 0; i < boxes.length; i++) {
    if(color[i]) {
      boxes[i].style.display = 'block';
      boxes[i].style.backgroundColor = color[i];
    } else {
      boxes[i].style.display = 'none';
    }
  }

  bgValue.textContent = guess.toUpperCase();
}     

handleEvent();

function handleEvent () {
  wrapper.addEventListener('click', setColorChange);
  navButton.addEventListener('click', handleGameEffect);
}

// Event handler 
function setColorChange(e) {
  let target = e.target;

  // Do not nothing when its not a box
  if (!target.classList.contains('box')) return;

  // What to do when our guess is right
  if (target.style.backgroundColor === guess) {
    // Gameover, you won
    gameOver(true, 'Correct!');
  } else { // what to do when guess is wrong
    guessLeft -= 1;
    if (guessLeft === 0) {
      gameOver(false, 'Try again!');
      handleLoss();
    } else {
      showMessage(`You have ${guessLeft} trials left`, 'red');
      target.style.backgroundColor = 'rgb(17, 18, 23)';
    }
  }
}

function gameOver(won, msg) {
  let color;
  // What happens when game is won
  if(won) {
    color = 'green';
    gameWon();
  } else {// if Lost what happen
    color = 'red';
  }
  // Change the text of the reset button
  reset.textContent = 'Play Again?';
  showMessage(msg, color);
}

function gameWon() {
  // Replace the background of all boxes with the correct color
  boxes.forEach(box => {
    box.style.backgroundColor = guess;
  });
  // Replace the background of the header with correct color
  header.style.backgroundColor = guess;
}

function handleLoss() {
  boxes.forEach(box => {
    box.style.display = 'none';
  })
}

function showMessage(msg, color) {
  // Message to display
  message.textContent = msg; 
  // Color of message
  message.style.color = color;
}

function pickColor() {
  // Create a random number to be picked
  let randomChoice = Math.floor(Math.random() * color.length);
  // Choose a random color based on the array index
  return color[randomChoice];
}

function getRandomColor(num) {
  // Create an empty array for random colors
  let arr = [];

  for(let i = 0; i < num; i++){
    // Push a number of randomly generated color to the array
    arr.push(generateRandomColors());
  }
  return arr;
}

function generateRandomColors() {
  // Assign random numbers 0-255 to rgb variables
  let red = Math.floor(Math.random() * (max + 1)),
      green = Math.floor(Math.random() * (max + 1)), 
      blue = Math.floor(Math.random() * (max + 1)),
      random = 'rgb(' + red + ', ' + blue + ', ' + green + ')';

  return random;
}

function handleGameEffect (e) {
  let target = e.target;
  // When reset button is clicked
  if (target.classList.contains('reset')) {
    handleColorChange();
    target.textContent = 'New colors';
  }

  if (target.classList.contains('mode')) {
    handleMode(target);   
  }
}

function handleMode(target) {
  for(let i = 0; i < gameMode.length; i++) {
    gameMode[i].classList.remove('active');
    target.classList.add('active');
    // Number of boxes each mode contains
    if(target.textContent === 'Easy') { 
      numBoxes = 3;
      numGuess = 2;
    } else {
      numBoxes = 6;
      numGuess = 3;
    }
  }
  handleColorChange();
}

function handleColorChange() {
  header.style.backgroundColor = 'rgb(61, 69, 111)';
  // Remove message
  message.textContent = '';
  // Number of guesses left
  guessLeft = numGuess;
  // Generate random color for available number of boxes
  color = getRandomColor(numBoxes); 
  // Pick color out of the generated colors
  guess = pickColor();
  // Assign random colors to each boxes
  changeColor();
}