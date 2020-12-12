# React Admin Panel

Live Website link: [https://reactadminpanel.000webhostapp.com](https://reactadminpanel.000webhostapp.com)

Use demo credentials for login:
### Email `test@admin.com`
### Password `admin@123`


## Localhost setup:
1. ### Firebase Setup:

  1. Create account on firebase and login to firebase console.
  2. Choose database as Realtime Database.
  3. In rules tab edit rules replace below given rules with already given:\
      `{`\
        &nbsp;&nbsp;&nbsp;&nbsp;`"rules": {`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"employees": {`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".read": "auth != null",`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".write": "auth != null"`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"roles": {`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".read": "auth != null",`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".write": "auth != null"`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"organizations": {`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".read": "auth != null",`\
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`".write": "auth != null"`\
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`},`\
        &nbsp;&nbsp;&nbsp;&nbsp;`}`\
      `}`
  4. Enable Authentication in Authentication Panel (Email/Password).
  5. Create a user (Note these credentials later on used for login in web app);
  6. Now Create web app and copy all the keys like given below: \

        `apiKey: "API_KEY",`\
        `authDomain: "PROJECT_ID.firebaseapp.com",`\
        `databaseURL: "https://PROJECT_ID.firebaseio.com",`\
        `projectId: "PROJECT_ID",`\
        `storageBucket: "PROJECT_ID.appspot.com",`\
        `messagingSenderId: "SENDER_ID",`\
        `appId: "APP_ID",`

  7. Now replace all the above given values in the .env file on your localhost in your project directory:\

        `REACT_APP_API_KEY="API_KEY"`\
        `REACT_APP_AUTH_DOMAIN="PROJECT_ID.firebaseapp.com"`\
        `REACT_APP_DATABASEURL="https://PROJECT_ID.firebaseio.com"`\
        `REACT_APP_PROJECTID="PROJECT_ID"`\
        `REACT_APP_STORAGE_BUCKET="PROJECT_ID.appspot.com"`\
        `REACT_APP_MESSAGE_SENDERID="SENDER_ID"`\
        `REACT_APP_APPID="APP_ID"`


2. ### `npm install`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It will install all the required packages.

3. ### `npm start`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Runs the app in the development mode.\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. ### `npm run build` or `GENERATE_SOURCEMAP=false npm run build`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Builds the app for production to the `build` folder.\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It correctly bundles React in production mode and optimizes the build for the best performance.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The build is minified and the filenames include the hashes.\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your app is ready to be deployed!


### Firebase setup official link : [https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup)
