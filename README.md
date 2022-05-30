<h1> Chat App Project: </h1>

<p>This project was made to build a chat app for mobile devices using React Native. This app will provide users with a chat interface and options to share images and their location. </p>

<h2> Description: </h2>

<p> This project includes the use of React Native, Expo, and a Google Firestore Database. A user will be able to enter their name and choose a background color before enterting the chat. The user will also be able to send message, photos, and share geolocation once inside the chat application.  

  
<h2> Firebase: </h2>

<p> After initial setup, go to "Storage" under Project overview. Then go to "Rules." Under Rules click on "Edit Rules" and change the rules to...
  service firebase.storage {
  match /b/{bucket}/o {
  match /{allPaths=**} {
  allow read, write;
  }
  }
  }
