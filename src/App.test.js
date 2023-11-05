// Import the necessary functions and utilities from the "@testing-library/react" package.
// This library provides utilities to test React components in a way that resembles how they are used by users.
import { render, screen } from '@testing-library/react';

// Import the "App" component from the local "App" module. This is the component that is being tested.
import App from './App';

// Define a test named "renders learn react link".
// The "test" function is provided by Jest, a JavaScript testing framework, and is used to define individual test cases.
test('renders learn react link', () => {
	// Render the "App" component in a virtual DOM, making it ready for testing.
	render(<App />);

	// Use the "screen" utility to query for an element with the text "learn react", ignoring the case (i.e., it can be "Learn React", "LEARN REACT", etc.).
	const linkElement = screen.getByText(/learn react/i);

	// Assert that the "linkElement" (the element with the text "learn react") is present in the document.
	// If the element isn't found, the test will fail.
	expect(linkElement).toBeInTheDocument();
});
