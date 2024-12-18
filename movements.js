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
  (Blockly.Blocks["controls_while_do"] = {
    init: function () {
      this.jsonInit({
        type: "controls_while_do",
        message0: "while %1 do %2",
        args0: [
          {
            type: "input_value",
            name: "CONDITION",
            check: "Boolean",
          },
          {
            type: "input_statement",
            name: "DO",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: "%{BKY_LOOPS_HUE}",
        tooltip: "Repeat the actions while the condition is true.",
        helpUrl: "",
      });
    },
  }),
  {
    type: "checkColison",
    message0: "Collision Check",
    output: "Boolean",
    colour: 300,
    tooltip: "Checks if a collision occurs when moving in a given direction",
    helpUrl: "",
  },
  {
    type: "parkingCheck",
    message0: "Parking Check",
    output: "Boolean",
    colour: 300,
    tooltip: "Checks if u are on parking place",
    helpUrl: "",
  },
]);
