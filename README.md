This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Mortgage Quotes

This project is used to provide sample mortgage quotes for the given criteria (loan size, credit score, occupancy, property type).
Provide the API key in the local storage under key 'dev-auth'. This serves as the authentication mechanism.
Based on the input criteria the sample rates would be displayed. If none match the criteria, then no results would be displayed.
Input validation and value changes are guarded and network request is made if at least one criteria change.

Future enchancements would be caching the server responses for previously searched criteria.

## Installation

- Clone this repo https://github.com/ganesh-arumugam/mortgage-rates.git
- Go to application folder `cd rates-mockup`
- Install dependencies with `yarn install`
- Start the project from terminal with `yarn start`

### Compatibility

Project works on the latest chrome browser and with lastest React 17 version.

## Use Cases

- Input criteria filled up and produces a sample rates table.
- Input criteria not filled up, provide user validation.
- Same criteria used to fetch rates, stop multiple rate fetches.
- If no rates are available, provide a gracious error to user.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
