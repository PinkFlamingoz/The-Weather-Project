// Import required modules and components.
import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import './Search.css';
import { Fetch_Cities } from '../weather-service/Weather_Service';

// Define constants.
const MIN_POPULATION = 10000; // The minimum population for the cities to fetch.
const LIMIT = 10; //------------ Maximum number of cities to fetch at once.
const DEBOUNCE_TIMEOUT = 600; // Time delay (in ms) before a search action takes place after user input.

// Define the Search component.
const Search = ({ On_Search_Change }) => {
	// Initialize state variables.
	const [search, Set_Search] = useState(null); //------------------ Holds the current city selection.
	const [is_icon_visible, Set_Icon_Visibility] = useState(true); // Determines whether an icon is visible.
	const [error, Set_Error] = useState(null); //-------------------- Holds error messages, if any.

	// Function to load city options based on user input.
	const Load_Options = async (input_value) => {
		// Reset any previous error messages.
		Set_Error(null);

		try {
			// Fetch city data based on the input value.
			const city_data = await Fetch_Cities(input_value, MIN_POPULATION, LIMIT);

			return city_data;
		} catch (err) {
			// If there's an error during the fetching, we set an error message to inform the user.
			Set_Error('Failed to fetch city data. Please try again.');

			// Additionally, we log the error to the console for debugging purposes.
			console.error('Failed to fetch city data:', err);

			// Return an empty list as a fallback.
			return { options: [] };
		}
	};

	// Handle the change in dropdown selection.
	const Handle_On_Change = (search_data) => {
		Set_Search(search_data); //------ Update the search state.
		On_Search_Change(search_data); // Call the external handler, if provided.
	};

	// The rendered JSX of the Search component.
	return (
		<div>
			{/* Display error messages, if any.*/}
			{error && <div className="error-message">{error}</div>}

			{/* Display an icon if it's set to be visible. */}
			{is_icon_visible && <img alt="weather" className="all-weather-icons" src="icons/unknown.svg" />}

			<AsyncPaginate
				onMenuOpen={() => Set_Icon_Visibility(false)} // Hide the icon when the dropdown menu is opened.
				placeholder="Search for city" //---------------- Placeholder text in the search box.
				debounceTimeout={DEBOUNCE_TIMEOUT} //----------- Delay after which the search will be triggered post user input.
				value={search} //------------------------------- Current value of the dropdown.
				onChange={Handle_On_Change} //------------------ Function to call when the dropdown value changes.
				loadOptions={Load_Options} //------------------- Function to fetch the dropdown options.
			/>
		</div>
	);
};

// Export the Search component to be used in other parts of the app.
export default Search;
