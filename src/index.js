// Import the main React library.
import React from 'react';

// Import ReactDOM from the "client" path. ReactDOM provides methods for rendering React components into the DOM.
import ReactDOM from 'react-dom/client';

// Import the main CSS file for styling.
import './index.css';

// Import the main App component, which represents the core layout or component.
import App from './App';

// Import the reportWebVitals function, which can be used to measure the performance.
import reportWebVitals from './reportWebVitals';

// Create a root for React. This line creates a concurrent root container which allows for features like Suspense.
// It points to the 'root' div in HTML where the app will be rendered.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the DOM.
// React.StrictMode is a wrapper to check potential problems in the app during the development phase.
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Invoke the reportWebVitals function.
// This is used for measuring the performance.
// If you wish to see these measurements, you can pass a function to log the results, like console.log.
// The function can also send these measurements to an analytics endpoint.
// The given link (https://bit.ly/CRA-vitals) provides more info on this.
reportWebVitals();
