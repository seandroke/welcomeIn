# welcomeIn

## Description

This application is a more refined implementation of facial recognition in a full stack web application. It branches off from experimental work completed during the
Facial Recognition Attendance project to become a well defined project that went through 4 sprint phases.

The use cases for this project are relatively straight forward. The app exists to be a comprehensive security system with the ability to manage
door locks and light fixtures. The application was tested using a SERVO lock and LED light connected to a Rapberry Pi which acted as a beacon
connected to our development/hosting server.

A user can create a home security account and add in a set of friendly faces, who are then eligible to access the door and turn on the lights.
A succesful entry results in a log posted to the users account as well as both email and SMS notifications. An unsuccesful attempt results in similar
effects but the notification and logged face will be listed as an intruder making an illegal access attempt.

## Installation

| Dependency | Version | Details |
| :--------: | :-----: | ------- |
| Python | 3.* | The build is based off of python 3. Specifically I used Python 3.7 but most versions of python 3 should still be compatible. |
| Django | 2.2.7 | The backend is completely django based and uses its version of SQL Lite for small database utilities. Installation can be handled through the pip package manager. |
| Face Recognition | 1.2.3 | Face recognition is an open source library available on GutHub that is one of the more accurate Python recognition systems available. This is used in part to handle attendance taking. |
| NPM | Non Specific | The Node Package Manager is used to handle all of the front end dependencies associated with the React app. |

## Usage

The application has two core components, front end and back end. Both are separate applications referencing one another through API calls. The directory structure has simply labeled for these two entities.

<i>To start the front end...</i>


cd appJS

npm install

npm run dev



<i>To start the back end...</i>



cd backend

python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py runserver 0.0.0.0:8007

<b>NOTE: You may have to change some things in Settings.py as well as some of the URLS for the API's as they are platform specific to my server.</b>

## System Block Diagram

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/system-block-diagram.png)

## Screenshots

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/log-in.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/dash.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/authorized.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/auth-management.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/after-add-auth.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/footage-dash.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/picture-log.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/video-log.png)

![alt text](https://github.com/seandroke/welcomeIn/blob/master/screenshots/settings.png)
