# GCSW Frontend UI

This is the frontend component of Greenfield Community Science Workshop Database Project, created as part of the service learning requirement for CST-462S at California State University, Monterey Bay. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[GCSW Backend](https://github.com/PedroG1018/gcsw-backend)

## Routes

### `/` Sign In Page (Unprotected Route)
The defualt route is the sign-in-page this is a page to offer two button choices to decide which route to send people down. There is also a login button for staff in the top right of the page. This page is unprotected and all pages following the volunteer and the participant buttons on this page are also unprotected. Participants shouldn't have to log in to sign in for the day. Upon entering their ID, their information gets filled out automatically if they had already been registered in the MongoDB database(Test this may not work or be impleneted currently). Participants are only allowed to sign in once per day.

### `/volunteers-first-page` Sign in page (Unprotected Route)
Volunteers first page that should have buttons to decide between first time sign in for the day and returning routes.

### `/first-time-volunteer` Sign in page (Unprotected Route)
Sign in page for volunteers. Should sign in here once per day.

### `/volunteers-homepage` Homepage for volunteers (Unprotected Route)
Homepage for volunteers. Needs to be implemented still barebones currently. Homepage is functional for time tracking log out button will record a timestamp for logout and calculate in backend time between(Test this).

### `/participants-first-page` Decision buttons page for participants (Unprotected Route)
This is another decision page for participants to decide if they are signing in for the first time today or if they are returning after signing in once today already.

### `/first-time-participant` Sign in page for participants (Unprotected Route)
Sign in page for participants. This page will lead to participants homepage on succesful submission.

### `/returning-participant` Login to participants homepage (Unprotected Route)
Login page for returning participants that have already signed in today / those wanting to get to their participant homepage. Also can signout to stop the timestamp for todays tracking of signin timestamp(Logout and hour tracking not implemented yet).

### `/participant-homepage` Participants homepage (Unprotected Route)
Homepage for participants. This page has buttons for getting to other participant related pages. This page has badges(need to be implemented functionaly). This page also need to have a sign out button added that works with backend to record signout time for participants. Remove the staff login button from homepage and all pages nested past homepage.

### Protected Routes Below

### `/participants` Participant Attendance Page (Protected Route, requires Login) (MAY NEED TO ADD BUTTON IN NAVBAR TO LINK TO THESE & THE VOLUNTEER VERSIONS)

This route leads to the participant attendance page, listing all of the participants who have signed in on the selected date through the Date Picker. Each participant entry in the table has options to edit their information, leading to the  `/edit` route, and to delete the selected entry. This page also includes a button to export a list of participants to an Excel file. 

###  `/edit/{id}` Edit Participant Page (Protected Route, requirs Login) (MAY NEED TO ADD BUTTON IN NAVBAR TO LINK TO THESE & THE VOLUNTEER VERSIONS)

This route leads to the edit participant page, allowing one to edit and update a previously registered participant's information. Changes are reflected throughout the app, included the Participant Attendance and Sign In pages. Here is where one can delete a participant permanently as well, erasing all of their sign-in entries and information from the app. The route requires the participant's Object ID from their MongoDB document to be passed in as a URL parameter.

## Authentication

This application is secured using Auth0's authentication services. To access <b>protected routes</b>, one must log in using the Log In button and provide the organization name and user credentials if part of that organization. For more information on the Auth0 side of this project, look through the following [document](https://docs.google.com/document/d/102R_epOAxuB2np7ODbP_3cnQCGlsfhtwmVeDspSDnL8/edit?usp=sharing).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

<b>Note: When running with local backend, change REACT_APP_SERVER_URL in .env file to http://localhost:6060/api</b>

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Notes for future devolopment
- continue to work on add a electronic signature
- figure out how to make it work without crashing the website
- formatte it make it work with website
- use for ref:[https://www.commoninja.com/blog/how-to-build-a-digital-signature-pad-in-react]

### Notes For MultiselectDrop
- used for ref: [https://www.npmjs.com/package/multiselect-react-dropdown]
- doesnt show up on App.js when running
- needs to fix MultiselectDrop.js 


## bug for print button
- make it  where allow multiple prints without refreshing page
 
