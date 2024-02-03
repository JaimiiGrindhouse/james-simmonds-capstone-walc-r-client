# Getting Started

The project is built on a React front end, and node.js server.

Client:
https://github.com/JaimiiGrindhouse/james-simmonds-capstone-walc-r-client

Clone this repository.

The .env will require you to have a https://www.mapbox.com/Apikey, it needs to be in the following format.

REACT_APP_MAPBOX_ACCESS_TOKEN=Your mapbox api key here (be mindful your api key is not in a string)

Server:
https://github.com/JaimiiGrindhouse/james-simmonds-capstone-walc-r-api

You will need to clone this repository from Github also.

Both projects will start with the command npm start in you IDE terminal.

The .env in the server will require an api key for https://openweathermap.org/ in the following format:

OPENWEATHERMAP_API_KEY="Your Api key here"

(be mindful, your api key does need to be in a string for this.)

# Project Title

Walc-R

## Overview

What is your app? Brief description in a couple of sentences.

Walc-R
"The walking and cycling personal tavel companion app for Londoners."
A mobility as a service (Maas) application aimed at promoting active transportation habits in the capital.

### Problem

Why is your app needed? Background information around any pain points or other reasons.

Walc-R is the second iteration of the project researched and realised for my MSc dissertation.
The use case created for this work asked the question could a well targetted walking and cycling focused application could encourage uptake in active transportation habits amongst under-represented or currently non-participating groups.
Groups were defined in several ways including:

Users not engaging currently with fitness app's such as Strava or the Map my... or similar applications.

Identifying target demographics from the UK Gov's Cycling and walking investment strategy (CWIS), that have the largest opportunity to swing transportation choice behaviour to achieve the active transportation targets within the UK Gov's Net Carbon Zero strategy.

In essence the heart of the project is to create a non elitist and accessible user experience providing an active transportation focused MaaS product.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

Cyclists, walkers, users seeking bike hire/bike sharing, users seeking bike storage facilities, users with disabilities.

Ultimately the project would be best suitable to mobile, but without experience of React native or similar it is beyond my current skillset.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

Maps:

Using a 3rd party open source Api to render a map in the project, this is isntrumental to the implementation of the overall project.

User Geolocation:

Receive user's geolocation data to centre a map to the user, use this data to affect Get requests of Api requests.

Weather information:

Whilst researching for the MSc project primary research was conducted into users decision making habits, in this research it was determined in all tested subjects that weather was then biggest determining factor on whether to make an active transportation choice. This feature is a key feature in the decision making process,and currently a potential user does this using a separate app. However I envisage not only supplying this information on a homepage, but also integrating in far deeper in the application, as an example what if when hovering over a Santander bike point plotted as a marker on a map it not only supplies the hire point data but also provides weather data for the the next hour, based on the geolocation.

Santander cycle hire finder:

Retrieving Santander bike hire point information and plotting it onto a map. Provide pop up's over the plotted markers, providing the point information and weather information.
Will initialise on the users geolocation, but also provide a user input to specify a location.

Other cycle hire providers:

Providers: lime bike/uber, human forest et al.
Provide an implementation in the same way outlined in the Santander cycle hire, ideally all on the same “page” with buttons to interface with to toggle on or off the data displayed for each provider.
Success depends on whether access to the api's can be found, at present this access has not been achieved.

Bicycle parking/storage:

Provide a test bed of data to be implemented in a similar manner to that outlined in the Santander cycle hire, with markers placed down and pop ups with information about the location.
As this as far as I can find not is represented by any current Api's I have found, will be made up of a custom test data set refinded to the Borough of Hackney, this will be an original data set constructed using Chat Gpt and Google Bard to generate information to build a data set, that will focus on public buildings, hospitals, schools.

Route planner:

A route planner to allow users to input a start and end point and to have a route suitable to their needs plotted onto a map.

Api:

Creating an Api for the project to handle generated .Json data sets, and also to route all api requests to 3rd party Api's.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

React

Node.js

Express

Cors

Git

Axios

Geolocation Api

### APIs

List any external sources of data that will be used in your app.

Maps: (under review)
Leaflet.js (Open source, no traffic limitations)
Open Street Map (Fremium, has limitations of usage)
Google maps (12 weeks free usage, limitation of data traffic)
map box

Santander cycle hire:
TFL api

Weather:
Open Weather Api

Bike Storage:
Custom data set or an Api (TBC)

Route planning:
OSRM (Open Source Routing Machine)

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Landing Page:

In essence at this stage this is acting as a landing page, but in future devlopment this would act as a login page to the application.

Home Page:

Will display site navigation buttons, the current weather based on the users geolocation, and the users step count for the day.

Santander Cycle Storage:

Provides markers plotted to a map of all the Santander bike stations in London. Pop ups on each provide data about the station, and a waether forecast for the next hour. The map centre's to the user, but a user input search on the page will allow search by location.

Route Planner:

Renders a map, and provides an input box that allows the user to select their method of transportation i.e walking or cycling, and aloows then to slect their journey start and end point.

Bicycle Storage:

Provides a map with markers of bicycle storage/parking. Markers are customeised to storage type, and pop overs on each provide information about that bike storage.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

Landing page:

![Landing Page](/public/assets/read_me/Wal-c-r%20Landing.html.png)

Home page:

![Home Page](/public/assets/read_me/Home%20page.png)

Route Planner:

![Route Planner](/public/assets/read_me/Wal-c-r%20routeplanner.html.png)

Santander Cycle Hire:

![Santander Cycle Hire](/public/assets/read_me/walcr%20cycle%20hire%20with%20buttons.png)

Local Bike Storage:

![Local Bike Storage](/public/assets/read_me/Local%20bike%20storage%20to%20me.png)

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

GET weather data based on a users geolocation:

In this example the the url takes in gelocation to return weather information for that location. This data would be dynamically input into the url, buy using the users current gelocation

https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}

![Get weather by location](/public/assets/read_me/Get%20weather%20data%20by%20geolocation.png)

GET ALL Santander bike points in London:

In this example the GET request returns all Santander bike docking staions in London, with information about how many bikes are available at that station.

https://api.tfl.gov.uk/bikepoint

Response data example:

![GET All Santander bike points](/public/assets/read_me/Get%20ALL%20bike%20points%20locations.png)

GET Santander bike point by a named location:

In this example the area is being defined as "Angel" a location in Islington, but this woul be realised dynaically with user input form a form input using ${sample location} syntax in the url.

https://api.tfl.gov.uk/BikePoint/Search?query=angel

Response data example:

![Get Santander bike point by location](/public/assets/read_me/Get%20bike%20point%20by%20location%20Angel.png)

OSRM:

GET

/{service}/{version}/{profile}/{coordinates}[.{format}]?option=value&option=value

Service:

One of the following values: route , nearest , table , match , trip , tile
version:
Version of the protocol implemented by the service. v1 for all OSRM 5.x installations.

Profile:

Mode of transportation, is determined statically by the Lua profile that is used to prepare the data using osrm-extract . Typically car , bike or foot if using one of the supplied profiles.

Coordinates:
String of format {longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...] or polyline({polyline}) or polyline6({polyline6}) .

Format:

json or flatbuffers . This parameter is optional and defaults to json .

Bike Storage/Parking locations:

GET all bike storage points

http://localhost:8088/bikestorage

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Not planned but would be considered as an addition in the future development road map.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

Ticket 1: Project file structure set up client-side (react) & server side (api) and all "known" dependencies that will be required to complete the project.

Ticket 2: Api set up and 3rd party Api keys set up. The project is highly reliant on 3rd party Api's and and developing an original set of data. Setting up the logins, getting api keys etc. Then testing the end points I wish to use in postman, to ensure I am getting the data correctly that I wish to use.

Ticket 3: Build out the Api to create get and post routes that correlate to the tested end points from sprint2. Take care of the securities, ie. .env file and .gitignore to safely store Api keys etc.

Ticket 4: Install react router build out the skeleton structure of the project in React, ie. Pages and components to help enable the visualisation of client side implementation of the project.

Ticket 5: Set us Sass, and add all variables, mixins, media queries etc.

Ticket 6: Build out the reused components that will be common throughout the project. ie. Nav/header, footer & button navigation that will feature on every “page” of the application.

Ticket 7: Build out a maps/component/page” that will render a map from the chosen mapping .Js library/Api.

Ticket 8: Implement Geolocation of the user into that page, so that the map centres on the user, by taking there lat and lon and updating the map library. (Note\*\* - when thinking about how structure the components that make this up, this could be a component on its own as it will be reused on every “page”.)

Ticket 9: Santander cycle hire build the ajax request to the Api to call a get request to api that will populate all markers on the map, with pop ups populated with data about the bike points.
Set up the ajax request that will call the openweather Api to provide data on forecast for the next hour to also add to the pop up. Provide styling to the pop ups'. Consider custom markers and pop up styling.

Ticket 10: Create a “Route Planning-page” component, initial is the geolocation/route planning component, create the route planning html, and construct the .jsx to run the route planning plugin/widget functionality. Once tested, create styling for this.

Ticket 11: Create the “homepage - page” component. Create the html structure for the page, provide some basic styling. Create the Axios request to retrieve current weather from Openweather Api., and information for a 5hour forecast.
Create date and time now function to display on the page.
Second .css session to style the data included, and to tighten up the design.
Implement Stepcounter/pedometer, to diplay the users steps for the day on the home page.

Ticket 12: Either create a small data set of gelocations in Hackney and build the Json routing in the api, or if the 3rd party Api being explored to provide bike storage proves useable. Create a custom end point that will retrieve GET all bike storage points.

Ticket 13: Create a new page component for finding bike storage, add the compoents for header, footer and button nav, and the maps compnenent.
Link the new end point for get all bike storage with Axios to the api. Create custom markers for different bike storage types. Map the data to generate the markers and their pop ups and populate the pop us with data from the data set.

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

Additional Cycle Hire providers:

This is about securing access to 3rd party private company Api's.

How far can I? :

A guide for those who dont walk often, that gives a radius to their location of an average of how far they can walk in in given amount of time.

Street level access for less abled:

Would pridie pop up on a map at junctions to show information such as the dip in the pavement, photo of the junction, surface type and any obstacles. The aim to provide a deep dive to street view that will aid people with physiacl diabilities to plan their journey's better and more safely.

Gamification/health info:

It came as part of the conclusion in my MSc work that despite moving away from the perceived elitism of applications such as Strava et al, that to engage a user to repeat using an application that including some elements of gamification, this should take the form of a pedometer in this application.

## Additional-Resources

User Persona:

![User Persona](/public/assets/read_me/Anna%20Persona%20v.2.png)

User Story:

![User Story](/public/assets/read_me/Anna%20Johnson%20story.png)

Conditions of Satisfaction:

![Conditions of Satisfaction](/public/assets/read_me/Story%20-%20anna%20Johnson%20-%20conditions%20of%20satisfaction.png)

Msc Research Project:

![Research Paper](/public/assets/read_me/James%20Simmonds%20SIM20499428%20MSc%20Major%20Project%20%20.pdf)

1st Iteration:

Screen cast of the 1st Iteration of this Project realised as multipage vanilla javascript implementation for my MSc dissertation.
This project utilised google maps, for all mapping and route planning.

Github: https://github.com/JaimiiGrindhouse/Wal-C-R-project

![1st Iteration screencast](/public/assets/read_me/James%20Simmonds%20SIM20499428%20MSc%20Project%20Screencast.mp4)
