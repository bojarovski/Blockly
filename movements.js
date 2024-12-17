"use strict";

Blockly.defineBlocksWithJsonArray([
  {
    type: "program",
    message0: "Program",
    nextStatement: null,
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "moveRight",
    lastDummyAlign0: "CENTRE",
    message0: "Right",
    previousStatement: null,
    nextStatement: null,
    colour: 300,
    tooltip: "Move right",
    helpUrl: "",
  },
  {
    type: "moveLeft",
    lastDummyAlign0: "CENTRE",
    message0: "Left",
    previousStatement: null,
    nextStatement: null,
    colour: 300,
    tooltip: "Move left",
    helpUrl: "",
  },
  {
    type: "moveUp",
    lastDummyAlign0: "CENTRE",
    message0: "Up",
    previousStatement: null,
    nextStatement: null,
    colour: 300,
    tooltip: "Move up",
    helpUrl: "",
  },
  {
    type: "moveDown",
    lastDummyAlign0: "CENTRE",
    message0: "Down",
    previousStatement: null,
    nextStatement: null,
    colour: 300,
    tooltip: "Move down",
    helpUrl: "",
  },
  {
    type: "isColision",
    message0: "Collision when moving %1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "DIRECTION",
        options: [
          ["down", "moveDown"],
          ["up", "moveUp"],
          ["left", "moveLeft"],
          ["right", "moveRight"],
        ],
      },
      {
        type: "input_value",
        name: "PARAM",
      },
    ],
    output: "Boolean", // The block will output a boolean
    colour: 300,
    tooltip: "Checks if a collision occurs when moving in a given direction",
    helpUrl: "",
  },
]);
