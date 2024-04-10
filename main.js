var host = "172.29.41.16:8888";

$(document).ready(function () {
    frames.start();
});


// reading sensor data and getting direction of hand point
var frames = {
    socket: null,
  
    start: function() {
      var url = "ws://" + host + "/frames";
      frames.socket = new WebSocket(url);
      frames.socket.onmessage = function (event) {
        var command = frames.get_left_wrist_command(JSON.parse(event.data));
        if (command !== null) {
          sendWristCommand(command);
        }
      }
    },
  
    get_left_wrist_command: function (frame) {
      var command = null;
      if (frame.people.length < 1) {
        return command;
      }
  
      // Normalize by subtracting the root (pelvis) joint coordinates
      var pelvis_x = frame.people[0].joints[0].position.x;
      var pelvis_y = frame.people[0].joints[0].position.y;
      var pelvis_z = frame.people[0].joints[0].position.z;
      var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
      var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
      var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;
  
      if (left_wrist_z < 100) {
        return command;
      }
  
      /*
      if (left_wrist_x < 200 && left_wrist_x > -200) {
        if (left_wrist_y > 500) {
          command = 73; // UP
        } else if (left_wrist_y < 100) {
          command = 75; // DOWN
        }
      } 
      */

      if (left_wrist_y < 500 && left_wrist_y > 100) {
        if (left_wrist_x > 200) {
          command = 76; // RIGHT
        } else if (left_wrist_x < -200) {
          command = 74; // LEFT
        }
      }
      return command;
    }
};

//------------------------------------------------------------------------------------

let direction = "none";
let choices = []; // options selected by the student so far

let optionLeft = $("#optionLeft"); // left option on screen
let optionRight = $("#optionRight"); // right option on screen
let selectedList = $("#selectedList"); // showing list of choices made so far


// Input questions
let questions = [["On or Off Campus?", "On Campus", "Off Campus"],
                 ["Volume?", "Loud", "Quiet"],
                 ["Business?", "Busy", "Sparse"],
                 ["Brightness?", "Bright", "Dark"],
                 ["Type of Light?", "Natural", "Artificial"],
                 ["Indoor or Outdoor?", "Indoor", "Outdoor"]
                ];

//------------------------------------------------------------------------------------

function sendWristCommand(command) {
    switch (command) {
      case 74:
        direction = 'left';
        break;
      case 76:
        direction = 'right';
        break;
      /*
      case 73:
        direction = 'up';
        break;
      case 75:
        direction = 'down';
        break; 
      */
    }
    console.log(direction);
  }