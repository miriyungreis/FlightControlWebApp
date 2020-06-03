# Project Name : "Flight Control Web Application"

# Description  
ASP.net core Web App that manages flights and present the client available flights relative to its time in UTC. the app supports flights from its own server (internal) and also external servers. 

![Alt ScreenShot](/FlightControlWeb/ClientApp/src/images/flight_screen.PNG?raw=true "ScreenShot 1")


Front - End:
-----------------------------
* React Js (16.0.0 - statefull calss components)
* Reactstrap \ Boottstrap
* Map Module - Leaflet Open Source StreetMap
* Axios - for REST API calls
* Node.js
* Java Script 6, HTML5 , CSS 3
* Webpack for bundling
* ESLint for coding conventions (Reccomended)
* Development Environment: Visual Studio Code

Back - End:
-----------------------------
* ASP.NET Core 3.1 Framework
* Web API Server with REST API (HTTP Requests)
* SQLite with EntityFramework
* Development Environment: Visual Studio
* Unit Tests using moq

Unit - Tests:
-----------------------------
* the unit tests in this project were written for the class FlightPlanController
* there are 2 tests for this class.
* the tests check and verify the behaviour in two possible cases:
	* when posting flight success - the method returns the flight plan object
	* when posting the flight by the server fails the method returns status code: 500.
* 


# System Requiremnets  
1. Supported Web Browsers: Edge, Chrome
2. NodeJS
3. Visual Studio

# Installation  
1. We bundled all the client js code into bundle.js using Webpack
2. once you run the app that shold work with no problems
3. if a problem occured please check you have all System Requirements
4. if troubled yet, please contact us


# Support  
arye.amsalem@gmail.com  
miriyungreis@gmail.com

# Roadmap  
none.

# Contributing  
none.

# Authors and acknowledgment  
Arye182, miriyungreis

# License  
MIT

# Project status  
bundled, pre release

# Git Hub Link ~ ~ for instructors 89111
https://github.com/miriyungreis/FlightControlWebApp

