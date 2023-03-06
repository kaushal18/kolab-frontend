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

Although we saw that the probability of a url that's generated is already taken by another user is low, if we encounter this issue it could degrade the user experience and reliability of the system. Imagine going to google docs and it opens someone else document! We certainly don't want this in our application. A way to mitigate this issue is we should regenerate a new url and try again. We should keep retrying until we don’t see failure due to the duplicate url. We should return an error to the user if the custom url they have provided is already present in our database.

Another solution of the above problem could be to run a Key Generation Service (KGS) that generates random url beforehand and stores them in a database. Whenever we want to store a new url, we will just take one of the already generated ones and use it. This approach will make
things quite simple and fast since we will not be worrying about duplications or collisions. KGS will make sure all the keys inserted in key-DB are unique.


## Client and Server Connection
A TCP/IP connection has a Time To Live (TTL) value after which the connection is closed and it does not support sending requests other way around, i.e. from server to the client. Using this TCP/IP protocol the clients would have to regularly poll the server to check if there are any updates. This would be very inefficient and lead to multiple expensive network calls. \
A better alternative are Server Sent Events (SSE) and Web Sockets. In this case Web Sockets are perfect choice as we require full-duplex connection between client and server. The client should be able to send request when there are edits in the document and the server should be able to broadcase these changes all other clients which are listening.

## How Authentication is handled
I have used Json Web Tokens (JWT) to handle authentication. If the user decides to protect the docuement with a password, after doing so the backend responds with an access token and refresh token both of which are signed with a shared private key (symmectric encryption). The access token has a short expiry time and is always maintained in the memory of frontend. 

Storing access tokens in localstorage of browser could lead to Cross Site Scripting (XSS) attacks. The refresh token is always stored in a http-only cookie as these cannot be acessed by javascript thus preventing XSS attacks. Essentialy, if you can store these tokens using javascript a hacker can also retrive these using javascript. Moreover, the refresh token needs to an expiry otherwise if a hacker manages to obtain the refresh token it could lead to indefinite access to the account.

When a user tries to access an autheticated portion of application we first verify the digital signature of the access token and the expiry. If the token is verified but expired we send the refresh token as a header to backend which then verifies it and returns a new access token. 

## Future Work
<b>Operational Transformation</b> - A conflict resolution algorithm to maintain synchronization among the clients editing the same document. The algorithm carriers out some transformations to the received message from server before merging it into the document.

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