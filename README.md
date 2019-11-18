# Intro to SE Point-of-Sale
The development in this app has been accomplished in Visual Studio Code. In order to run this app in development mode, consider using the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plug-in for VSCode.

## Github information
Here's the quick git commands:
```
git pull                # check for changes before making changes
# Make your changes
git add .               # add all files to be staged for commit
# OR 
git add filename.js     # add single file to be staged for commit
git commit -m "Write your message inside the quotation marks"   # Commit your changes locally
git pull                # Make sure there are no new changes
git push                # Push your changes to GitHub
```

To clone this repository, navigate to the directory you want to make this project in, and run the following command in your terminal
```
git clone https://github.com/claudiaareneee/Intro-to-SE-Point-of-Sale.git
```

## Getting started
Installations:
- Install [Node JS](https://nodejs.org/en/download/)
- Install [bower](https://bower.io/) (this is a client side installer - npm is a server side installer and is downloaded with node) using ```npm install -g bower```. *Note*: you might have to run this command with ```sudo```.
- Install [crypto-js](https://www.npmjs.com/package/crypto-js) using ```bower install crypto-js``` (NOTE: we no longer have to move the bower_components folder).
- Run ```npm install```: The package.json will auto install all of our dependencies

## To run this project
In order to start the server, run the following command:
```
node app.js
```
Or you could also run
```
npm start
```
These both provide the same function. ```npm start``` runs any commands in the ```script``` object in ```package.json```.
