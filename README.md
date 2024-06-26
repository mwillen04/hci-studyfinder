# hci-studyfinder
Project for CPSC 484: Intro to Human-Computer Interaction at Yale University

**TO RUN:**

1) Open `index.html` in a Chrome web browser window.
2) Add `?ip=172.29.41.16:8888` to the end of the URL (development phase)

**PROJECT DESCRIPTION**

Our project is a study location finder that surveys users for their preferences and recommends their best fit option based on their answers to a variety of heuristics.

The problem space we are trying to address is that students have a difficult time finding a good study spot that suits their time/location/vibe needs. It is difficult to predict how crowded the space will be, what kind of seating there might be, whether it will be sufficiently quiet, and this is before taking into consideration amenities like bathrooms, private rooms, or if an id is required to access it.

The specific tasks we chose to address with our prototype are to choose a study location, to ensure access to amenitites, being able to gauge what each individual wants from a large spectrum of preferences, and finding locations that the user might not know about. We do this by setting up our quiz which evaluates the user's preferences to best match them to a spot and help them decide a location, as well as picking from a variety of locations both Yale affiliated and not. 

**CONSTRAINTS**

Our project takes input from the closest person to the screen, so the user must make sure that their kinect frame is the one closest to the sensor before using our program. There is also a maximum range, so it is recommended that they position themselves so that their head is near the center of the screen.

**COLLABORATION RECORD**

Zev: Helped build the algorithm to match user input to a study location in main.js. Helped with the asthetic deisgn and the integration of the buttons for each question and the back button. Tested the motion sensors. 





Maks: created class that handles connection with camera and detects when either right, left, or both hands have been raised for more then 2 seconds. Then uses a callback system to communicate with the frontend and add actual functionality. Created the homepage and quiz html pages. Teststed the kinetic functionality and setup the quiz question transitioning.




Michael: Fine-tuned and fixed selection algorithm, added display box for previous answers (+ relevant js/html/css), organized layout of boxes, general CSS contributions and on-site bug fixing and workshopping our project on the TV.




Eric: helped build/refactor some of the html pages, sat with Maks to troubleshoot interaction with the display, came up with some of the criteria for the heuristics, didn't touch javascript due to inexperience 
