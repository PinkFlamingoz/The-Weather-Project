// Define a function named "reportWebVitals" that takes a callback function "onPerfEntry" as its parameter.
const reportWebVitals = (onPerfEntry) => {
	// Check if the passed callback function "onPerfEntry" is provided and is an instance of the Function object.
	if (onPerfEntry && onPerfEntry instanceof Function) {
		// Dynamically import the "web-vitals" library.
		// This allows for code splitting and only loads the library when it's needed, improving initial load times.
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			// Once the "web-vitals" library is loaded, destructure and get the required functions from it.

			// getCLS: Measures Cumulative Layout Shift. This helps understand the visual stability the page.
			getCLS(onPerfEntry);

			// getFID: Measures First Input Delay. It tells you the time it takes for the browser to respond to the user's first interaction.
			getFID(onPerfEntry);

			// getFCP: Measures First Contentful Paint. It marks the time when the first piece of DOM content is rendered on the page.
			getFCP(onPerfEntry);

			// getLCP: Measures Largest Contentful Paint. It marks the time when the largest text or image element gets visible.
			getLCP(onPerfEntry);

			// getTTFB: Measures Time to First Byte. It indicates the time at which your server sends the first byte of the response.
			getTTFB(onPerfEntry);
		});
	}
};

// Export the "reportWebVitals" function so that it can be imported and used in other parts of the application.
export default reportWebVitals;
