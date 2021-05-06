# Cram

Ed-tech App leveraging AI & OCR to help students move past breakpoints. Currently configured to help developers learn new technologies, however, I'm working on allowing teachers to upload specific material relevant to each student's curriculum.

## **Features**

The app permits students to take a photo of a topic related to the backend, such as Koa, Node, Express, etc, with which they are currently struggling. From the photo the app fetches information related to that relevant topic, so far including: a tutorial video, bullet points and some other closely related topics. 

## **Tech Stack**
A combination of React-Native with Expo has been used to build the user interface. While on the backend the app levages GraphQL with ApolloClient to leverage queries to a seeded database containing information on each topic.

### **Front end**

React-Native
Expo
Typescript

### **Back end**

ApolloClient
GraphQL
MongoDB
Mongoose

## **System Requirements**
 
NodeJS v15 or greater
npm v7.5 or greater
 
## **Getting Started**

To get up and running it’s first necessary to install all dependencies. This will install both the client and server dependencies for you.

`git clone https://github.com/romduda/cram.git`
Run `npm i` – this will install dependencies in both the client and server folders.


### **Setting up the backend**

#### **Seeding the database**

As mentioned the backend works off of a seeded database. This is a script available in the backend. So from the server folder in terminal run:

`npm run seed`

#### **Google Vision ApiKey**

The image processing is handled by Google’s Vision API. To get this working you will have to register an account with google and obtain an apiKey. Once acquired you will have to create an apiKey.json file in the scr folder of the server to store it in.

#### **Environment variables**

PORT is the only environment variable needed on the backend. Create a .env file in the server folder and store your port number there. See `.env.example`.

#### **Running the server**

`npm run start-dev`
Once all the other steps have been completed, from the src folder in the terminal run

`node index.js` 

or, if nodemon is installed (recommended)

`npm run start dev`


### **Setting up the frontend**

#### **Environment variables**

There are two environment variables to set up on the frontend: APOLLOCLIENT_HOST and APOLLOCLIENT_PORT.
You can run `ipconfig getifaddr en0` in the terminal to find out your IP address.

#### **Running the client**

`expo start`

or 

`npm run start`


<img src="https://i.imgur.com/TC67WUb.png" alt="drawing" width="200"/>
