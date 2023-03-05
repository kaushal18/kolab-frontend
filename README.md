# Kolab - A realtime shareable editor

Kolab is an editor that generates a unique link that can be viewed and edited by multiple people at the same time. Save time in team collaborations by just jotting down what you are thinking and sharing a real-time link with others.

## Motivation

There we many occasions in a team project in my undergraduation where we wanted to access and edit some information quickly which serves a single source of truth about the project. To access this information without going through the hassle of logging into Google account on shared university computer and then sending the document I decided to built this.

## How to run locally

First clone the repository into the local machine.\
Then, set the evironment variable `REACT_APP_BACKEND_URL` using following command -
```bash
$ export REACT_APP_BACKEND_URL=https://kolab-backend.onrender.com
```

Replace the `REACT_APP_BACKEND_URL` with your localhost url if you want to connect with the local backend. \
Now run the app using following commands - 

```bash
$ npm install
$ npm start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To deploy your version of app run -
```bash
$ npm run build
```
This builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. \
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
