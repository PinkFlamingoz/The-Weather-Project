// Import constants for the API's URL and its Key.
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../Api';

// Import constants for the API's URL and its options.
import { GEO_API_URL, GEO_API_OPTIONS } from '../../Api';

// This function fetches current weather data for a given latitude and longitude.
export const Fetch_Current_Weather = async (lat, lon) => {
	try {
		// Using fetch to request weather data from the API.
		// Template literals (`${}`) are used to insert the variables into the URL string.
		const response = await fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

		// Check if the fetch request was successful.
		// If the response status is not in the range 200-299, an error is thrown.
		if (!response.ok) {
			throw new Error('Failed to fetch current weather data');
		}

		// If the fetch request was successful,
		// parse the response data as JSON and return the result.
		return response.json();
	} catch (error) {
		// If there's any error during the fetch process or parsing data,
		// it will be caught here and logged to the console.
		console.error(error);
		// After logging the error, it's re-thrown to be caught and handled by the calling function or component.
		throw error;
	}
};

// This function fetches the weather forecast data for a given latitude and longitude.
export const Fetch_Forecast = async (lat, lon) => {
	try {
		// Similar to the above function, a fetch request is made to the API's forecast endpoint.
		const response = await fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

		// Check if the fetch request was successful.
		if (!response.ok) {
			throw new Error('Failed to fetch forecast data');
		}

		// Parse the response data as JSON and return the result.
		return response.json();
	} catch (error) {
		// If there's any error during the fetch or parsing process,
		// it will be caught and logged here.
		console.error(error);
		// After logging the error, it's re-thrown to be handled by the calling function or component.
		throw error;
	}
};

// This function fetches city data based on a given input value and minimum population.
export const Fetch_Cities = async (input_value, min_population = 10000, limit = 10) => {
	try {
		// Similar to the above function, a fetch request is made to the API's forecast endpoint.
		const response = await fetch(`${GEO_API_URL}/cities?minPopulation=${min_population}&limit=${limit}&sort=-population&namePrefix=${input_value}`, GEO_API_OPTIONS);

		// Check if the fetch request was successful.
		if (!response.ok) {
			throw new Error('Failed to fetch city data');
		}

		// Parse the response data as JSON and return the result.
		const data = await response.json();
		//AsyncPaginate component expects.
		// data.data: The city information is assumed to be stored inside a data property of the fetched JSON (i.e., data.data).
		// .map(): This method is used to loop through each city in the data.data array and transform it. For each city, we're creating a new object with two properties: value and label.
		// value: This property is a string that combines the city's latitude and longitude. It might be used later to fetch the weather data for that specific location.
		// label: This property is a string that displays the city's name followed by its country code. This is what the user will see in the dropdown menu when searching for a city.
		return {
			options: data.data.map((city) => ({
				value: `${city.latitude} ${city.longitude}`,
				label: `${city.name}, ${city.countryCode}`,
			})),
		};
	} catch (error) {
		// If there's any error during the fetch or parsing process,
		// it will be caught and logged here.
		console.error(error);
		// After logging the error, it's re-thrown to be handled by the calling function or component.
		throw error;
	}
};
