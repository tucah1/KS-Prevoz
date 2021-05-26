# KS Prevoz - Public transport web application

KSPrevoz is a web application that will provide arrival time of public transport vehicles in the
Canton Sarajevo and appropriate routes from point A to point B. It will also make schedule updating
and notification sharing easier for administration of public transport company. This web application
is a project done for CS308 Software Engineering class, Spring 2021.

The web application is created in JavaScript. The frontend was implemented using React.js (with Redux as state manager) while the backend was done using Node.js, Express, and mySQL. Web application uses Google Maps API for
routes finding, as well as Google Drive API for file storage (.csv file that contain schedule information). All schedule data shown on the website is scraped from https://gras.ba/bs/.

Check out the application by following [this link](https://ksprevoz.herokuapp.com/).
