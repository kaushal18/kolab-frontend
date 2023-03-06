# Kolab - A realtime shareable editor

Kolab is an editor that generates a unique link that can be viewed and edited by multiple people at the same time. Save time in team collaborations by just jotting down what you are thinking and sharing a real-time link with others.

[Here](https://github.com/kaushal18/kolab-backend) is the backend implementation.

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

## Features
- Unique and custom URL for your document.
- Real-time sync across all the clients accessing the link.
- Migrate your document to a custom URL.
- Add security with password protection to protect from losing data.

## Frameworks & Languages
- React.js - Front-end framework for building the UI
- Socket.io - Websocket implementation that enabled bi-directional communication between client and server.
- Json Web Tokens - Authentication and authorization.
- MaterialUI - For UI components.

## High Level Design
![Kolab Architecture](https://user-images.githubusercontent.com/32773584/222995627-662531d7-8049-4753-b6b8-e64aeb34fade.png)

Token in the diagram refers to the unique url assigned to the document. Eg - `https://kolab-frontend.onrender.com/8-8sme7_KK`, here the unique token is `8-8sme7_KK`.

Each client is connected with the backend server using a websocket this helps to send information in both the directions. \
Clients accesing the same document are placed in a 'room'. When we receive an update request to the document by any of the client the server broadcasts the updates to all other clients in the 'room'.

## How is URL uniqueness guarenteed
Before loading the document the front-end generates an URL with a length of 10. Randomly 10 characters are chosen from [a-z] [A-z] [0-9] [+,-,_]. Although, collisions can happen, i.e. we can end up randomly choosing an url which already exists. But the chances of such a case is very low, as there can be 65<sup>10</sup> (1.3 quintillion!) combinations. This number further increases exponentially as users can choose a url with an arbitary length.

## Future Work
Operational Transformation - A conflict resolution algorithm to maintain synchronization among the clients editing the same document. The algorithm carriers out some transformations to the received message from server before merging it into the document.

Each client maintains the following information:
- Last synced revision (id)
- All local changes which have not been sent to the server (Pending changes) - queue
- All local changes sent to the server but have not been acknowledged (Sent changes)
- Current document state visible to the user

The server maintains the following information:
- List of all received but have not been processed changes (Pending changes)
- Log of all processed changes (Revision log)
- State of the document on the time of last processed change

OPERATIONS \
INSERT(position p, character c) - Insert c at position p\
DELETE(position p, length L) Delete from position p, p+L

Character only cases\
Cases when transformation will be required - (left one is the local change and right is the server change)

Insert(pos1, char1) , Insert(pos2, char2)
1. If pos1 < pos2: Insert(pos2+1, char2) shift one
2. If pos1 > pos2: Insert(pos2, char2) no transform
3. If pos1 == pos2: Insert(pos2, char2) give preference to server, no transform

Ins(p1, l1) , del(p2, c2)
1. If p1 < p2: del(p2+1, l2)
2. If p1 > p2: del(p2, l2)
3. If p1 == p2: del(p2, l2)

del(p1, l1), ins(p2, c2)
1. If p1 < p2: ins(p2-1, c2)
2. If p1 > p2: ins(p2, c2)
3. If p1 == p2: ins(p2, c2)

del(p1, l1), del(p2, l2)
1. If p1 < p2: del(p2-1, l2)
2. If p1 > p2: del(p2, l2)
3. If p1 == p2: del(p2, l2)