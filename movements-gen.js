"use strict";

const checkDrawSleep = "draw(); \nawait sleep(300);\n";

// Function to check collision
const checkCollisionCode = (direction) =>
  `
console.log("===============", checkCollision(rx, ry, '${direction}'));
if (checkCollision(rx, ry, '${direction}') === true) { 
  alert("Crash! Try Again.");
  startAgain();
  return true; 
} else if (checkCollision(rx, ry, '${direction}') === 'stop') { 
  return false; 
}
`;

Blockly.JavaScript["checkColison"] = function (block) {
  return ["checkForColision(true)", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript["parkingCheck"] = function (block) {
  return ["checkForParking(true)", Blockly.JavaScript.ORDER_ATOMIC];
};
// Code for 'moveRight' block
Blockly.JavaScript["moveRight"] = function (block) {
  return (
    "if (rx < w - 1) { rx = rx + 1; " +
    checkCollisionCode("moveRight") +
    " }\n" +
    checkDrawSleep
  );
};

// Code for 'moveLeft' block
Blockly.JavaScript["moveLeft"] = function (block) {
  return (
    "if (rx > 0) { rx = rx - 1; " +
    checkCollisionCode("moveLeft") +
    " }\n" +
    checkDrawSleep
  );
};

// Code for 'moveUp' block
Blockly.JavaScript["moveUp"] = function (block) {
  return (
    "if (ry > 0) { ry = ry - 1; " +
    checkCollisionCode("moveUp") +
    " }\n" +
    checkDrawSleep
  );
};

// Code for 'moveDown' block
Blockly.JavaScript["moveDown"] = function (block) {
  return (
    "if (ry < h - 1) { ry = ry + 1; " +
    checkCollisionCode("moveDown") +
    " }\n" +
    checkDrawSleep
  );
};

// Blockly 'program' block remains unchanged
Blockly.JavaScript["program"] = function (block) {
  return ""; // nothing to declare
};

Blockly.JavaScript["controls_while_do"] = function (block) {
  // Get the condition from the input
  var condition =
    Blockly.JavaScript.valueToCode(
      block,
      "CONDITION",
      Blockly.JavaScript.ORDER_NONE
    ) || "false";

  // Get the statements inside the loop
  var statements = Blockly.JavaScript.statementToCode(block, "DO");

  // Generate the JavaScript code for the while loop
  var code = `while (${condition}) {\n${statements}}\n`;
  return code;
};
