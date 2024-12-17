"use strict";

const checkDrawSleep = "draw(); \nawait sleep(300);\n";

// Function to check collision
const checkCollisionCode =
  'if (checkCollision(rx, ry)) { alert("Crash! Try Again."); init(); return; }';

// Code for 'moveRight' block
Blockly.JavaScript["moveRight"] = function (block) {
  return (
    "if (rx < w - 1) { rx = rx + 1; " +
    checkCollisionCode +
    " }\n" +
    checkDrawSleep
  );
};

// Code for 'moveLeft' block
Blockly.JavaScript["moveLeft"] = function (block) {
  return (
    "if (rx > 0) { rx = rx - 1; " + checkCollisionCode + " }\n" + checkDrawSleep
  );
};

// Code for 'moveUp' block
Blockly.JavaScript["moveUp"] = function (block) {
  return (
    "if (ry > 0) { ry = ry - 1; " + checkCollisionCode + " }\n" + checkDrawSleep
  );
};

// Code for 'moveDown' block
Blockly.JavaScript["moveDown"] = function (block) {
  return (
    "if (ry < h - 1) { ry = ry + 1; " +
    checkCollisionCode +
    " }\n" +
    checkDrawSleep
  );
};

// Blockly 'program' block remains unchanged
Blockly.JavaScript["program"] = function (block) {
  return ""; // nothing to declare
};
