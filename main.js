var currentQuestion = 1;
const totalQuestions = 9;
var answers = {}; // Object to store answers
const locations = {
  "HLH17": {
    "mapLink": "https://maps.app.goo.gl/hZgn5LoPdjB8nVDZ6",
    "onCampus": true,
    "quiet": true,
    "busy": false,
    "naturalLight": true,
    "bright": true,
    "indoors": true,
    "privateCubicles": false,
    "desktopComputers": true,
    "yaleIdRequired": true
  },
  "SML": {
    "mapLink": "https://maps.app.goo.gl/v6q3KBZ4EmhpJX2f7",
    "onCampus": true,
    "quiet": true,
    "busy": false,
    "naturalLight": true,
    "bright": true,
    "indoors": true,
    "privateCubicles": true,
    "desktopComputers": true,
    "yaleIdRequired": false
  },
  "Bass": {
    "mapLink": "https://maps.app.goo.gl/JnYY86DLv5qN3kez9",
    "onCampus": true,
    "quiet": true,
    "busy": false,
    "naturalLight": true,
    "bright": true,
    "indoors": true,
    "privateCubicles": true,
    "desktopComputers": true,
    "yaleIdRequired": false
  },
  "Steep": {
    "mapLink": "https://maps.app.goo.gl/AH4HYguQzwfW7NYV6",
    "onCampus": true,
    "quiet": false,
    "busy": false,
    "naturalLight": false,
    "bright": false,
    "indoors": true,
    "privateCubicles": false,
    "desktopComputers": false,
    "yaleIdRequired": true
  },
  "Acorn": {
    "mapLink": "https://maps.app.goo.gl/asTKYx6xssXtzQJM6",
    "onCampus": true,
    "quiet": false,
    "busy": false,
    "naturalLight": false,
    "bright": false,
    "indoors": true,
    "privateCubicles": false,
    "desktopComputers": false,
    "yaleIdRequired": true
  },
  "Underground": {
    "mapLink": "https://maps.app.goo.gl/WQQxiEX4ZLgj7Cib8",
    "onCampus": true,
    "quiet": false,
    "busy": false,
    "naturalLight": false,
    "bright": false,
    "indoors": true,
    "privateCubicles": false,
    "desktopComputers": false,
    "yaleIdRequired": true
  },
  "Koffee": {
    "mapLink": "https://maps.app.goo.gl/Z9aJg3HGtTXKiyyj7",
    "onCampus": false,
    "quiet": false,
    "busy": false,
    "naturalLight": true,
    "bright": true,
    "indoors": true,
    "privateCubicles": true,
    "desktopComputers": false,
    "yaleIdRequired": false
  },
  "Atticus": {
    "mapLink": "https://maps.app.goo.gl/kiN6FyCFv8h3ywbQ6",
    "onCampus": false,
    "quiet": false,
    "busy": false,
    "naturalLight": true,
    "bright": true,
    "indoors": true,
    "privateCubicles": false,
    "desktopComputers": false,
    "yaleIdRequired": false
  }
};


function getResult() {
  // Calculate the score for each location based on the answers provided
  let bestMatch = null;
  let bestMatchScore = -1;

  for (const location in locations) {
    let score = 0;

    // Compare each answer to the corresponding field in the location
    for (const question in answers) {
      const fieldName = questionToFieldName(question);
      if (fieldName && locations[location].hasOwnProperty(fieldName)) {
        const fieldValue = answers[question];
        const locationValue = locations[location][fieldName];

        // If the answer matches the location's value, increase the score
        if (fieldValue === locationValue) {
          score++;
        }
      }
    }

    // Update the best match if the current location has a higher score
    if (score > bestMatchScore) {
      bestMatch = location;
      bestMatchScore = score;
    }
  }

  return bestMatch;
}

function showResult() {
  const result = getResult();
  if (result) {
    console.log(`Your best study spot is: ${result}`);
    console.log(`Map Link: ${locations[result].mapLink}`);
  } else {
    console.log("No suitable study spot found.");
  }
}

function answerQuestion(questionNumber, answer) {
  console.log(`Answered Question ${questionNumber}: ${answer}`);

  // Store the answer in the answers object
  console.log(answers[`Q${questionNumber}`] = answer);

  showQuestion(questionNumber + 1);
}


function skipQuestion() {
  console.log("Skipped Question");
  showQuestion(currentQuestion + 1);
}

function showQuestion(questionNumber) {
  const questions = document.querySelectorAll('.question-container');
  questions.forEach(question => question.style.display = 'none');
  const targetQuestion = document.getElementById(`question${questionNumber}`);
  if (targetQuestion) {
    targetQuestion.style.display = 'block';
    currentQuestion = questionNumber;
    updateBackButtonVisibility();
  }
}

function updateBackButtonVisibility() {
  const backButton = $("#backButton");
  if (currentQuestion === 1) {
    backButton.hide();
  } else {
    backButton.show();
  }
}

$(document).ready(function () {
  showQuestion(1);
  $("#backButton").hide(); // Initially hide the back button
  $('#backButton').click(function () {
    if (currentQuestion > 1) {
      showQuestion(currentQuestion - 1);
    }
  });
});


var frames = {
  socket: null,

  start: function () {
    var ip = window.location.search;
    ip = ip.split('ip=')[1];
    console.log(`connecting to ${ip}`);
    // websocket connection location
    var url = "ws://" + ip + "/frames";

    // canvas object
    var c = document.getElementById("draw");
    var ctx = c.getContext("2d");
    // all real-world units are in mm unless denoted by CM
    var personRadiusCM = 30;
    // origin (x,y)
    var origin = [c.width / 2, 0];

    // subscribe to the /frames data
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      console.log("HASDS")
      let data = JSON.parse(event.data);
      // clear the canvas
      ctx.clearRect(0, 0, c.width, c.height);

      // draw the camera on the top of the screen
      drawEnv(ctx, origin);

      // draw each person as a circle
      var i = 0;
      if (data.people) {
        var num_people = Object.keys(data.people).length;
        $('.people_counter').text(`I see ${num_people} people`);
        //console.log(num_people);
        for (const [idx, person] of Object.entries(data.people)) {
          // we want the data on the x,z plane from the camera's frame, so use indicies and 0 (x), 2 (Z)
          // see: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#arcs
          // function definition is: arc(x, y, radius, startAngle, endAngle, counterclockwise)
          ctx.strokeStyle = ctx.fillStyle = colors[i++];
          ctx.beginPath();
          let person_x = -1 * toCM(person.avg_position[0]) + origin[0]
          let person_y = toCM(person.avg_position[2]) + origin[1]
          ctx.arc(person_x, person_y, personRadiusCM, 0, 2 * Math.PI);
          ctx.stroke();
          // draw an arrow for the person, if we have detected an angle
          if (person.theta) {
            ctx.beginPath();
            let th = person.theta;
            let arrow_x = person_x + Math.cos(th) * personRadiusCM;
            let arrow_y = person_y - Math.sin(th) * personRadiusCM;
            //console.log(arrow_x);
            //console.log(arrow_y);
            canvas_arrow(ctx, person_x, person_y, arrow_x, arrow_y);
            ctx.stroke();
          }
        }
      }
    }
  }
};


// Helper Functions

// Convert MM to CM
function toCM(mm) {
  return mm / 10;
}

// Draw an arrow
// from: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag#answer-6333775
function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

// Setup an array of colors
var tc = tinycolor({
  r: Math.floor(Math.random() * 0xFF),
  g: Math.floor(Math.random() * 0xFF),
  b: Math.floor(Math.random() * 0xFF)
});
colors = [];
var parts = 2 + Math.floor(Math.random() * 5);
for (var i = 0; i < parts; i++) {
  tc = tc.spin(360 / parts);
  colors.push('#' + tc.toHex());
}

// Draw the environment
function drawEnv(ctx, origin) {
  var cameraSizeCM = [15, 5];

  ctx.strokeStyle = ctx.fillStyle = '#333333';
  ctx.fillRect(origin[0], origin[1] - cameraSizeCM[1] / 2, cameraSizeCM[0], cameraSizeCM[1])

  ctx.font = "25px Arial";
  ctx.fillText("x", 90, 20);
  ctx.fillText("y", 8, 100);
  ctx.beginPath();
  canvas_arrow(ctx, 14, 14, 14, 80);
  canvas_arrow(ctx, 14, 14, 80, 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = '#0000FF';
  canvas_arrow(ctx, origin[0] + cameraSizeCM[0] / 2, 1.5, origin[0] + cameraSizeCM[0] / 2, 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = '#FF0000';
  canvas_arrow(ctx, origin[0] + cameraSizeCM[0] / 2, 1.5, origin[0] + cameraSizeCM[0] / 2 - 20, 1.5);
  ctx.stroke();
}