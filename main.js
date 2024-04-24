const totalQuestions = 10;
var answers = {};

/* LEFT IS FALSE, RIGHT IS TRUE */
const questions = [
    {
        id: 1,
        text: "Where would you like to study?",
        left: "Off Campus",
        right: "On Campus",
        img: "outdoor.jpeg"
    },
    {
        id: 2,
        text: "What volume level do you prefer?",
        left: "Loud", 
        right: "Quiet",
        img: "group.jpeg"
    },
    {
        id: 3,
        text: "How busy should the space be?",
        left: "Sparse",
        right: "Busy",
        img: "busy.jpeg"
    },
    {
        id: 4,
        text: "What kind of light do you prefer?",
        left: "Artificial",
        right: "Natural",
        img: "light.jpeg"
    },
    {
        id: 5,
        text: "How bright would you like your study spot?",
        left: "Dark",
        right: "Bright",
        img: "dark.jpeg"
    },
    {
        id: 6,
        text: "Do you want to study indoors or outdoors?",
        left: "Outdoors",
        right: "Indoors",
        img: "out.jpeg"
    },
    {
        id: 7,
        text: "Do you need private cubicles?",
        left: "No",
        right: "Yes",
        img: "private.jpeg"
    },
    {
        id: 8,
        text: "Do you need desktop computers?",
        left: "No",
        right: "Yes",
        img: "comp.png"
    },
    {
        id: 9,
        text: "Do you have a Yale ID",
        left: "No",
        right: "Yes",
        img: "id.jpeg"
    },
];

const locations = {
    "HLH17": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.644023422849!2d-72.9234571!3d41.3127355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9bec7f69953%3A0x9dd15d5ee9fcfb36!2sYale%2017%20Hillhouse%20Avenue%20(HLH17)!5e0!3m2!1sen!2sus!4v1713927332844!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": true, //quiet
        "Q3": false, //busy
        "Q4": true, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": true, //desktop computers
        "Q9": true // yale id required
    },
    "SML": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.801076599505!2d-72.92851089999999!3d41.3110273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b6a8924c77%3A0xe34726675bd29432!2sSterling%20Memorial%20Library!5e0!3m2!1sen!2sus!4v1713928546378!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": true, //quiet
        "Q3": true, //busy
        "Q4": true, //natural light
        "Q5": false, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": true, //desktop computers
        "Q9": false // yale id required
    },
    "Bass": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.824098113756!2d-72.92728369999999!3d41.3107769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b3fa5f75b9%3A0x43840ab25f0c38b7!2sBass%20Library!5e0!3m2!1sen!2sus!4v1713928568382!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": true, //quiet
        "Q3": true, //busy
        "Q4": false, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": true, //private cubicles
        "Q8": true, //desktop computers
        "Q9": false // yale id required
    },
    "Steep": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.6158081251942!2d-72.92226889999999!3d41.3172208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b8766acfc3%3A0x71ed0aa35f40275a!2sSteep%20(formerly%20KBT%20Caf%C3%A9)!5e0!3m2!1sen!2sus!4v1713928584635!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": false, //quiet
        "Q3": true, //busy
        "Q4": true, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": false, //desktop computers
        "Q9": true // yale id required
    },
    "Acorn": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.766553307467!2d-72.92525739999999!3d41.311402799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b68203ab59%3A0xc27918c2bc4b4d9d!2sThe%20Silliman%20Acorn!5e0!3m2!1sen!2sus!4v1713928603054!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": true, //quiet
        "Q3": true, //busy
        "Q4": true, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": false, //desktop computers
        "Q9": true // yale id required
    },
    "Underground": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2996.8723587685595!2d-72.9286454!3d41.3116403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d99d1c93a6a3%3A0x79e7bf93c262887!2sYale%20Ivy!5e0!3m2!1sen!2sus!4v1713928620961!5m2!1sen!2sus",
        "Q1": true, //onCampus
        "Q2": false, //quiet
        "Q3": true, //busy
        "Q4": false, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": false, //desktop computers
        "Q9": false // yale id required
    },
    "Koffee": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5993.766709605242!2d-72.9217838!3d41.3114011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9c9e665970f%3A0x31104597148df2de!2sKoffee%3F!5e0!3m2!1sen!2sus!4v1713928639005!5m2!1sen!2sus",
        "Q1": false, //onCampus
        "Q2": true, //quiet
        "Q3": true, //busy
        "Q4": true, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": true, //private cubicles
        "Q8": false, //desktop computers
        "Q9": false // yale id required
    },
    "Atticus": {
        "mapLink": "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11987.533695030075!2d-72.9402378!3d41.3113996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b32318488d%3A0xa03b6d554dda11a6!2sAtticus%20Bookstore%20Cafe!5e0!3m2!1sen!2sus!4v1713928662012!5m2!1sen!2sus",
        "Q1": false, //onCampus
        "Q2": false, //quiet
        "Q3": true, //busy
        "Q4": true, //natural light
        "Q5": true, //bright
        "Q6": true, //indoors 
        "Q7": false, //private cubicles
        "Q8": false, //desktop computers
        "Q9": false // yale id required
    }
};

function getResult() {
    // Define weights for each criterion
    const weights = {
        "Q1": 3, // onCampus
        "Q2": 2, // quiet
        "Q3": 1, // busy
        "Q4": 2, // natural light
        "Q5": 2, // bright
        "Q6": 2, // indoors
        "Q7": 1, // private cubicles
        "Q8": 1, // desktop computers
        "Q9": 1  // yale id required
    };

    // Calculate the score for each location based on the answers provided
    let bestMatch = null;
    let bestMatchScore = -1;

    for (const location in locations) {
        let score = 0;

        // Compare each answer to the corresponding field in the location
        for (const question in answers) {
            if (question && locations[location].hasOwnProperty(question)) {
                const fieldValue = answers[question];
                const locationValue = locations[location][question];

                // If the answer matches the location's value, increase the score
                if (fieldValue === locationValue) {
                    score += weights[question];
                }
            }
        }

        // Update the best match if the current location has a higher score
        if (score > bestMatchScore) {
            bestMatch = location;
            bestMatchScore = score;
        }
    }
    console.log(`Your best match score: ${bestMatchScore}`);
    return bestMatch;
}

function updateBackButtonVisibility() {
    const backButton = $("#backButton");
    if (currentQuestion === 1) {
        backButton.hide();
    } else {
        backButton.show();
    }
}

class GestureRecognition {
    constructor(
        host, 
        rightHandCallback, 
        leftHandCallback, 
        bothHandsCallback
    ) {
        this.host = host;
        this.socket = null;
        this.rightHandCallback = rightHandCallback;
        this.leftHandCallback = leftHandCallback;
        this.bothHandsCallback = bothHandsCallback;
        this.rightHandTimer = null;
        this.leftHandTimer = null;
        this.bothHandsTimer = null;
    }

    startConnection() {
        const url = `ws://${this.host}/frames`;
        console.log(`Connecting to ${url}`);
        
        this.socket = new WebSocket(url);

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.people) {
                this.checkHandRaised(this.findClosestPerson(data.people), window.innerWidth, window.innerHeight);
            }
        }
    }

    findClosestPerson(people) {
        if (people.length === 0) {
            return null;
        }

        let closestPerson = people[0];
        let smallestDistance = Math.sqrt(closestPerson.x_pos ** 2 + closestPerson.y_pos ** 2);

        for (let i = 1; i < people.length; i++) {
            let currentPerson = people[i];
            let currentDistance = Math.sqrt(currentPerson.x_pos ** 2 + currentPerson.y_pos ** 2);
            if (currentDistance < smallestDistance) {
                smallestDistance = currentDistance;
                closestPerson = currentPerson;
            }
        }
        return closestPerson;
    }

    checkHandRaised(person, screenWidth, screenHeight) {
        if (!person) return;
    
        const normalizePosition = (position) => {
            return {
                x: position.x + screenWidth / 2,
                y: screenHeight / 2 - position.y // Invert y-axis
            };
        }
    
        const rightHand   = normalizePosition(person.joints[15].position);
        const leftHand    = normalizePosition(person.joints[8].position);
        const headHeight  = normalizePosition(person.joints[26].position);
        const rightRaised = rightHand.y > headHeight.y;
        const leftRaised  = leftHand.y > headHeight.y;

        const timeoutDuration = 2000;
        // Check both hands raised condition first
        if (rightRaised && leftRaised) {
            if (!this.bothHandsTimer) {
                this.bothHandsTimer = setTimeout(() => {
                    this.bothHandsCallback();
                    this.bothHandsTimer = null;
                }, timeoutDuration);
            }
            // Clear individual hand timers if they are set
            if (this.rightHandTimer) {
                clearTimeout(this.rightHandTimer);
                this.rightHandTimer = null;
            }
            if (this.leftHandTimer) {
                clearTimeout(this.leftHandTimer);
                this.leftHandTimer = null;
            }
        } else {
            // Clear the both hands timer if it's set
            if (this.bothHandsTimer) {
                clearTimeout(this.bothHandsTimer);
                this.bothHandsTimer = null;
            }
    
            // Check right hand raised condition if not both hands are raised
            if (rightRaised && !this.rightHandTimer) {
                this.rightHandTimer = setTimeout(() => {
                    this.rightHandCallback();
                    this.rightHandTimer = null;
                }, timeoutDuration);
            } else if (!rightRaised && this.rightHandTimer) {
                clearTimeout(this.rightHandTimer);
                this.rightHandTimer = null;
            }
    
            // Check left hand raised condition if not both hands are raised
            if (leftRaised && !this.leftHandTimer) {
                this.leftHandTimer = setTimeout(() => {
                    this.leftHandCallback();
                    this.leftHandTimer = null;
                }, timeoutDuration);
            } else if (!leftRaised && this.leftHandTimer) {
                clearTimeout(this.leftHandTimer);
                this.leftHandTimer = null;
            }
        }
    }
}
