// Define the options for making requests to the geo API.
// These options include the HTTP method and headers to be sent along with the request.
export const GEO_API_OPTIONS = {
	// Specifies the HTTP method for the request.
	method: 'GET',

	// Specifies the headers to be included with the request.
	headers: {
		// This is an API key for authentication with the RapidAPI service.
		// It lets the API provider know which user (or application) is making the request.
		'X-RapidAPI-Key': '211b0bb48emsh16c384f013f7492p174a19jsncf2070f8f3e3',

		// This header specifies which RapidAPI endpoint (or host) you're trying to access.
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
	},
};

// The base URL for the geo API endpoint provided by RapidAPI.
// It is prefixed to endpoint-specific paths to create the full URL for API requests.
export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

// The base URL for the OpenWeatherMap API.
// Like the GEO_API_URL, it's prefixed to endpoint-specific paths to create the full URL for API requests.
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// This is the API key for authentication with the OpenWeatherMap API service.
// It is used to let the OpenWeatherMap API provider know which user (or application) is making the request.
export const WEATHER_API_KEY = '6320c7e31e56836a9255922d66b4f052';
