# Information

Website: [https://authworria.com](https://authworria.com)
<p align="center" style="text-align: center;">            
<!-- <img alt="Discord" src="https://img.shields.io/discord/857017449743777812?logo=discord&style=flat-square">  -->
<img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/TheIIISociety?color=brightgreen&label=%40TheIIISociety&logo=twitter&style=flat-square"> 
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/TheIIISociety/Authworria?style=flat-square"> 
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/TheIIISociety/Authworria?style=flat-square">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/TheIIISociety/Authworria?style=flat-square">
</p>

The purpose of this project, which was made for the International Baccalaureate Personal Project, is to develop a website where you can not only game with each other but also socialize with them, combining the gaming experience with the experience of grabbing a cup of coffee with a mate at a cafe.

## Backstory
The word `Authworria` is defined as `the growing anxiety while completing a story before its fast-approaching deadline`. I picked this name for the project to reflect my concern about finishing it before the deadline, which is rapidly approaching.

## Explanation
This project uses Google's [Firebase](https://firebase.google.com) to host and authenticate users, this is done by
```js
var provider = new firebase.auth.GoogleAuthProvider();
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(res=>{
              // code here
                }).catch(e => {
              console.log(e);
            });
```
This line of code is essential for Firebase to authenticate users, and the '.signInWithPopup' will open a popup window prompting the user to sign in/up. We can also use a '.signInWithRedirect' to redirect visitors to a page where they would sign in from.

<!-- 
# TODO
- [ ] Task title ~3d #type @name yyyy-mm-dd  
  - [ ] Sub-task or description  
- [x] Completed task title 
-->

# TODO
- [ ] Sign In & Sign Up
  - [x] Create the login / signup page
  - [ ] Google and other methods of signing in
  - [x] Get data from the login and send to dashboard
  - [ ] Username filter
- [ ] Web-Chat
  - [ ] Validate the users identity using a token
  - [ ] Create web-chat page
  - [ ] Add a word filter to block inappropriate messages
- [ ] Multiplayer Web-Game
  - [ ] Authorize users with their token
  - [ ] Design the game
  - [ ] Add web-chat to the game
