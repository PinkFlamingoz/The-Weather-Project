// Importing the necessary modules and dependencies for the component.
import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './Forecast.css';

// Array defining the days of the week.
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Function that formats temperature values to rounded integers and adds the Celsius symbol.
const Format_Temp = (temp) => `${Math.round(temp)}°C`;

// Function that calculates the day of the week for the forecast using the current day index and the forecast day index.
const Get_Day_Of_Week = (current_day_index, forecast_day_index) => {
	const index = (current_day_index + forecast_day_index) % WEEK_DAYS.length;
	return WEEK_DAYS[index];
};

// Component for displaying forecast details like humidity, wind speed, etc.
// It is wrapped in React.memo for performance optimization, to prevent unnecessary re-renders.
const FORECAST_DETAIL = React.memo(({ label, value, unit = '' }) => (
	<div className="daily-details-item">
		<label>{label}:</label>
		<label>
			{value}
			{unit}
		</label>
	</div>
));

// Type checking for props of FORECAST_DETAIL component.
FORECAST_DETAIL.propTypes = {
	label: PropTypes.string.isRequired, //----------------------------------------- label must be a string and is required.
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // value can be a number or string and is required.
	unit: PropTypes.string, //----------------------------------------------------- unit is an optional string, default is an empty string.
};

// Default props for the FORECAST_DETAIL component.
FORECAST_DETAIL.defaultProps = {
	unit: '', // If no unit prop is provided, it defaults to an empty string.
};

// The main component that renders the forecast accordion.
const Forecast = ({ data }) => {
	// If data is not provided or the list property does not exist, return null to render nothing.
	if (!data || !data.list) {
		return null;
	}

	// Get the current day of the week as an index (0 for Sunday, 6 for Saturday).
	const day_in_a_week = new Date().getDay();

	return (
		// Fragment to group the list of children without adding extra nodes to the DOM.
		<>
			<label className="title">Daily</label>
			<Accordion allowZeroExpanded>
				{/* An accordion that can have all items collapsed. */}
				{
					// Map through the first 7 items of the data.list array.
					data.list.slice(0, 7).map((item, idx) => (
						<AccordionItem key={idx}>
							{/* Each item in the accordion, with a key prop for React's reconciliation process. */}
							<AccordionItemHeading>
								{/* The heading container for the accordion item. */}
								<AccordionItemButton>
									{/* The clickable button part of the heading that toggles the accordion item. */}
									<div className="daily-item">
										{/* Container for the daily weather item. */}
										<img src={`icons/${item.weather[0].icon}.svg`} className="icon" alt="weather" /> {/* Weather icon image. */}
										<label className="day">{Get_Day_Of_Week(day_in_a_week, idx)}</label> {/* Display the day of the week. */}
										<label className="description">{item.weather[0].description}</label> {/* Weather description. */}
										<label className="max">Max: {Format_Temp(item.main.temp_max)} /</label> {/* Maximum temperature. */}
										<label className="min">/ Min: {Format_Temp(item.main.temp_min)}</label> {/* Minimum temperature. */}
									</div>
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								{/* The content part of the accordion item that shows/hides on toggle. */}
								<div className="daily-details">
									{/* Container for the detailed forecast. */}
									{/* The following are details for the weather, using the FORECAST_DETAIL component to render each. */}
									<FORECAST_DETAIL label="Feels like" value={Format_Temp(item.main.feels_like)} />
									<FORECAST_DETAIL label="Clouds" value={item.clouds.all} unit="%" />
									<FORECAST_DETAIL label="Humidity" value={item.main.humidity} unit="%" />
									<FORECAST_DETAIL label="Wind speed" value={item.wind.speed} unit="m/s" />
									<FORECAST_DETAIL label="Wind direction" value={item.wind.deg} unit="°" />
									{/* Conditional rendering for gust if data is available. */}
									{item.wind.gust && <FORECAST_DETAIL label="Gust" value={item.wind.gust} unit="m/s" />}
									<FORECAST_DETAIL label="Pressure" value={item.main.pressure} unit="hPa" />
									{/* Conditional rendering for sea level if data is available. */}
									{item.main.sea_level && <FORECAST_DETAIL label="Sea level" value={item.main.sea_level} unit="m" />}
								</div>
							</AccordionItemPanel>
						</AccordionItem>
					))
				}
			</Accordion>
		</>
	);
};

// Type checking for props of the Forecast component.
Forecast.propTypes = {
	data: PropTypes.shape({
		// 'data' must be an object with a specific shape.
		list: PropTypes.arrayOf(
			// 'list' is an array with objects of a certain shape.
			PropTypes.shape({
				// Each object in 'list' must have the following properties with specific types.
				main: PropTypes.shape({
					temp_max: PropTypes.number.isRequired,
					temp_min: PropTypes.number.isRequired,
					feels_like: PropTypes.number.isRequired,
					pressure: PropTypes.number.isRequired,
					humidity: PropTypes.number.isRequired,
					sea_level: PropTypes.number, // 'sea_level' is optional.
				}).isRequired,
				weather: PropTypes.arrayOf(
					PropTypes.shape({
						description: PropTypes.string.isRequired,
						icon: PropTypes.string.isRequired,
					})
				).isRequired,
				clouds: PropTypes.shape({
					all: PropTypes.number.isRequired,
				}).isRequired,
				wind: PropTypes.shape({
					speed: PropTypes.number.isRequired,
					deg: PropTypes.number.isRequired,
					gust: PropTypes.number, // 'gust' is optional.
				}).isRequired,
			})
		).isRequired, // 'list' is required.
	}).isRequired, // The overall 'data' object is required.
};

// Exporting the Forecast component to be used in other parts of the application.
export default Forecast;
