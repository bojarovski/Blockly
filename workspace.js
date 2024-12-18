var demoWorkspace = Blockly.inject("blocklyDiv", {
  media: "https://blockly-demo.appspot.com/static/media/",
  toolbox: document.getElementById("toolbox"),
});
Blockly.Xml.domToWorkspace(
  document.getElementById("startBlocks"),
  demoWorkspace
);

function exportCode() {
  alert("XML izpisan v konzoli");
  console.log(Blockly.Xml.workspaceToDom(demoWorkspace));
}

function importCode() {
  Blockly.Xml.clearWorkspaceAndLoadFromXml(
    Blockly.Xml.textToDom(document.getElementById("textinput").value),
    demoWorkspace
  );
}
// var checkForColision = false;
function startAgain() {
  ry = starty;
  rx = startx;
  draw();
}

function showCode() {
  // Generate JavaScript code and display it.
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  var code = "var w = 10;\nvar h = 10;\nvar rx=0;\nvar ry=0;\n";
  code += Blockly.JavaScript.workspaceToCode(demoWorkspace);
  alert(code);
}

function runCode() {
  window.LoopTrap = 1000;
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

  try {
    eval("(async () => {" + code + "})()");
    // Print the car's coordinates after each move
  } catch (e) {
    alert(e);
  }

  draw(); // Redraw the grid after each move
}

function animateMove(startX, startY, targetX, targetY) {
  let currentX = startX;
  let currentY = startY;
  const steps = 100; // Number of animation steps
  let step = 0;

  // Define the step size (movement per frame)
  const deltaX = (targetX - startX) / steps;
  const deltaY = (targetY - startY) / steps;

  function move() {
    if (step < steps) {
      currentX += deltaX;
      currentY += deltaY;
      step++;

      // Update car's new position
      rx = Math.round(currentX);
      ry = Math.round(currentY);

      draw(); // Redraw the grid

      requestAnimationFrame(move); // Call the move function for the next frame
    } else {
      rx = targetX;
      ry = targetY;
      draw(); // Ensure the final position is set after animation
    }
  }

  move(); // Start the animation
}

// var checkForColision = false;
var w = 11; // Increased width
var h = 11; // Increased height
var rx = 0; // Player's car X position
var ry = 0; // Player's car Y position
var startx = 0;
var starty = 0;
var field = new Array(h);
const carImages = [
  "pcar1.jpg",
  "pcar2.jpg",
  "pcar3.jpg",
  "pcar4.jpg",
  "pcar5.jpg",
]; // Random car images

// Array to store static car positions
var staticCarPositions = [];
// Store car images for static positions (each static car gets a fixed image)
var staticCarImages = [];

// Initialize static car positions and assign images to them
function generateStaticCars() {
  const totalCars = 10; // Define how many cars to randomly place
  while (staticCarPositions.length < totalCars) {
    const randomX = Math.floor(Math.random() * (w - 2)) + 1; // Avoid border (1 to w-2)
    const randomY = Math.floor(Math.random() * (h - 2)) + 1; // Avoid border (1 to h-2)
    // Ensure the position is empty (no car already placed)
    if (
      !isPositionOccupied(randomX, randomY) &&
      randomX != rx &&
      randomY != ry
    ) {
      staticCarPositions.push({ x: randomX, y: randomY });
      staticCarImages.push(
        carImages[Math.floor(Math.random() * carImages.length)]
      );
    }
  }
}

// Check if the position is already occupied by a car
function isPositionOccupied(x, y) {
  for (let pos of staticCarPositions) {
    if (pos.x === x && pos.y === y) {
      return true;
    }
  }
  return false;
}

function draw() {
  let table = document.getElementById("field");
  table.innerHTML = ""; // Clear children
  for (let y = 0; y < h; ++y) {
    let row = document.createElement("tr");
    for (let x = 0; x < w; ++x) {
      let col = document.createElement("td");

      // Set the background image for the border using border.jpg
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
        let bg = document.createElement("img");
        bg.src = "border.jpg"; // Border image
        col.appendChild(bg);
      } else {
        // Set the background image based on field value
        let bg = document.createElement("img");
        if (field[y][x] === 1) bg.src = "parking.jpg"; // Parking spot
        else bg.src = "bg.jpg"; // Regular background
        col.appendChild(bg);
      }

      // Place static cars from staticCarPositions with fixed images
      for (let i = 0; i < staticCarPositions.length; i++) {
        let carPos = staticCarPositions[i];
        if (carPos.x === x && carPos.y === y) {
          let car = document.createElement("img");
          car.src = staticCarImages[i]; // Use pre-determined image
          col.appendChild(car);
        }
      }

      // Check if the position is for the player's car (ensure it's not occupied)
      if (y === ry && x === rx) {
        // Ensure the player's car is not placed on an occupied space
        if (field[y][x] === 0 && !isPositionOccupied(x, y)) {
          let car = document.createElement("img");
          car.src = "myCar.jpg";
          col.appendChild(car);
        }
      }

      row.appendChild(col);
    }

    table.appendChild(row);
  }
}
function isPositionOccupied(x, y) {
  // Check if the position is occupied by a static car
  for (let pos of staticCarPositions) {
    if (pos.x === x && pos.y === y) {
      return true;
    }
  }

  // Check if the position is the parking spot
  if (field[y][x] === 1) {
    return true; // Parking spot is considered occupied
  }

  return false; // Position is not occupied
}

function init() {
  field = new Array(h);
  for (let i = 0; i < h; ++i) {
    field[i] = new Array(w);
    for (let j = 0; j < w; ++j) field[i][j] = 0; // Initialize the grid with 0s (empty spaces)
  }

  // Place a parking spot (1)
  ry = Math.floor(Math.random() * (h - 2)) + 1; // Avoid border
  rx = Math.floor(Math.random() * (w - 2)) + 1; // Avoid border
  field[ry][rx] = 1; // Set one parking spot

  // Ensure no car is placed on the parking spot by setting a random starting position for the player
  while (field[ry][rx] !== 0) {
    starty = ry = Math.floor(Math.random() * (h - 2)) + 1; // Avoid border
    startx = rx = Math.floor(Math.random() * (w - 2)) + 1; // Avoid border
  }

  // Generate random static car positions and assign images to them
  generateStaticCars();

  draw(); // Draw the grid with static car positions
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var checkColison = false;
function checkForColision(boolean) {
  checkColison = boolean;
  return boolean;
}

// Check if there's a collision with another car
function checkCollision(newX, newY, direction) {
  if (checkColison) {
    console.log("ENABLE AUTO PILOT", newX, newY);

    // Correct movement logic inside the switch
    // switch (direction) {
    //   case "moveDown":
    //     newY += 1; // Move down
    //     break;
    //   case "moveUp":
    //     newY -= 1; // Move up
    //     break;
    //   case "moveLeft":
    //     newX -= 1; // Move left
    //     break;
    //   case "moveRight":
    //     newX += 1; // Move right
    //     break;
    //   default:
    //     console.log("Unknown direction");
    // }
  }

  // Check for border collision
  if (newX <= 0 || newX >= w - 1 || newY <= 0 || newY >= h - 1) {
    if (checkColison) {
      console.log("You need to stop, you will crash into a wall.");

      return "stop";
    }
    return true; // Border collision detected
  }

  // Check for collision with static cars
  for (let carPos of staticCarPositions) {
    if (carPos.x === newX && carPos.y === newY) {
      if (checkColison) {
        console.log("You need to stop, you will crash into a car.");

        return "stop";
      }
      return true; // Static car collision detected
    }
  }
  return false; // No collision (either border or static car)
}

// Check if the player's car is at the parking spot
function isSuccess() {
  return ry === starty && rx === startx;
}

document.onload = init();
