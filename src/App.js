// Importing required CSS and components for the application.
import './App.css';
import './index.css';
import SEARCH from './components/search/Search';
import CURRENT_WEATHER from './components/current-weather/Current_Weather';
import FORECAST from './components/forecast/Forecast';
import LINKS_TO_SOCIALS from './components/links/Links_To_Social';

// Fetch functions to get the current weather and forecast from an API.
import { Fetch_Current_Weather, Fetch_Forecast } from './components/weather-service/Weather_Service';

// Importing required React hooks and React itself.
import React, { useState, useCallback } from 'react';

function App() {
	// These useState hooks are essential for React's functional components. They help manage the local state of the component.
	// current_weather holds the current weather details.
	const [current_weather, Set_Current_Weather] = useState(null);

	// forecast holds the weather forecast details.
	const [forecast, Set_Forecast] = useState(null);

	// error holds any error messages that might arise, e.g., if data fetching fails.
	const [error, Set_Error] = useState(null);

	// loading indicates whether data is being fetched. This helps in showing/hiding a loading spinner or message.
	const [loading, Set_Loading] = useState(false);

	// This function is triggered when a user searches for a location.
	const Handle_On_Search_Change = useCallback(async ({ value, label }) => {
		// Splitting the provided value to extract latitude and longitude. the search input returns a value in "lat lon" format.
		const [lat, lon] = value.split(' ');

		// Before initiating the API calls, we set loading to true. This can be used to show a loading spinner to the user.
		Set_Loading(true);

		// Resetting any previous errors. This ensures old errors don't persist when making a new search.
		Set_Error(null);

		try {
			// Using Promise.all allows us to make multiple API calls concurrently. This can reduce the overall time taken if these API calls are independent.
			const [weather_data, forecast_data] = await Promise.all([Fetch_Current_Weather(lat, lon), Fetch_Forecast(lat, lon)]);

			// Once the data is fetched, it's set to the component's state. This will trigger a re-render and the new data will be displayed.
			Set_Current_Weather({ city: label, ...weather_data });
			Set_Forecast({ city: label, ...forecast_data });
		} catch (err) {
			// If there's an error during the fetching, we set an error message to inform the user.
			Set_Error('Failed to fetch weather data. Please try again later.');

			// Additionally, we log the error to the console for debugging purposes.
			console.error(err);
		} finally {
			// Regardless of success or failure, we set loading to false after the API calls are done. This can hide the loading spinner.
			Set_Loading(false);
		}
		// Using useCallback ensures this function doesn't get re-created every time the App component re-renders. The empty array means this function never re-creates based on any dependencies.
	}, []);

	// The rendered JSX of the App component.
	return (
		<div className="container">
			<header>
				{/* The SEARCH component allows users to input their desired location. */}
				<SEARCH On_Search_Change={Handle_On_Search_Change} />

				{/* If the loading state is true, this displays a loading message. */}
				{loading && <div className="loading-message">Loading...</div>}

				{/* If there's an error message in the state, it's displayed to the user. */}
				{error && <div className="error-message">{error}</div>}
			</header>

			<main>
				{/* If current_weather has data, the CURRENT_WEATHER component displays it. */}
				{current_weather && <CURRENT_WEATHER data={current_weather} />}

				{/* Similarly, if forecast has data, the FORECAST component displays it. */}
				{forecast && <FORECAST data={forecast} />}
			</main>

			<footer>
				{/* The LINKS_TO_SOCIALS component is always rendered, displaying social media links. */}
				<LINKS_TO_SOCIALS />
			</footer>
		</div>
	);
}

export default App;
