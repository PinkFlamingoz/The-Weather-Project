// Importing the necessary modules and dependencies for the component.
import React from 'react';
import PropTypes from 'prop-types';
import './Current-Weather.css';
import { Use_Tilt_Effect } from '../hooks/Tilt';

// A utility function to round the temperature and append '°C' to the result.
const Round_Temp = (temp) => `${Math.round(temp)}°C`;

// A functional component that displays the weather header information.
const WEATHER_HEADER = React.memo(({ name, country, description, icon }) => (
	<div className="top">
		<div>
			{/* Displaying the name (city) and country. */}
			<p className="city">
				{name}, {country}
			</p>

			{/* Displaying the description of the weather (e.g., "sunny", "cloudy", etc.). */}
			<p className="weather-description">{description}</p>
		</div>

		{/* Displaying the weather icon. The icon's name is passed as a prop and used to construct the path to the SVG image. */}
		<img alt="weather" className="weather-icon" src={`icons/${icon}.svg`} />
	</div>
));

// Type checking for props of the WEATHER_HEADER component.
WEATHER_HEADER.propTypes = {
	name: PropTypes.string.isRequired, //------- 'name' is a string and is required (city name).
	country: PropTypes.string.isRequired, //---- 'country' is a string and is required (country code).
	description: PropTypes.string.isRequired, // 'description' is a string and is required (weather description).
	icon: PropTypes.string.isRequired, //------- 'icon' is a string and is required (weather icon code).
};

// A functional component to display a single weather parameter, like temperature, wind speed, etc.
const WEATHER_PARAMETER = React.memo(({ label, value = '', unit = '', custom_class = '' }) => {
	// Use template literals to create the class names
	const base_class = 'parameter';
	const is_min = custom_class.includes('min');
	const is_max = custom_class.includes('max');

	const row_class = `${base_class}-row ${custom_class}`;
	const label_class = `${base_class}-label ${is_min ? `${base_class}-label-min` : ''} ${is_max ? `${base_class}-label-max` : ''}`.trim();
	const value_class = `${base_class}-value ${is_min ? `${base_class}-value-min` : ''} ${is_max ? `${base_class}-value-max` : ''}`.trim();

	return (
		<div className={row_class}>
			<span className={label_class}>{label}</span>
			<span className={value_class}>
				{value} {unit}
			</span>
		</div>
	);
});

// Type checking for props of the WEATHER_PARAMETER component.
WEATHER_PARAMETER.propTypes = {
	label: PropTypes.string.isRequired, // 'label' is a string and is required (descriptive label for the weather parameter).
	value: PropTypes.oneOfType([
		//-------------------------------- 'value' can be either a string or a number and is optional.
		PropTypes.string,
		PropTypes.number,
	]),
	unit: PropTypes.string, //------------ 'unit' is a string and is optional (units for the value, e.g., "°C", "m/s").
	custom_class: PropTypes.string, //---- 'custom_class' is a string and is optional (additional CSS classes for styling).
};

// Default props for the WEATHER_PARAMETER component.
WEATHER_PARAMETER.defaultProps = {
	value: '',
	unit: '',
	custom_class: '',
};
// A component that displays multiple weather details such as "feels like" temperature, wind speed, etc.
const WEATHER_DETAILS = React.memo(({ main: { feels_like, humidity, pressure }, wind: { speed, deg } }) => (
	<div className="details">
		{/* Header label for the details section. */}
		<WEATHER_PARAMETER custom_class="parameter-label top" label="Details" />

		{/* Details about the weather are displayed using multiple instances of the WEATHER_PARAMETER component. */}
		<WEATHER_PARAMETER label="Feels like" value={Round_Temp(feels_like)} />
		<WEATHER_PARAMETER label="Wind" value={speed} unit="m/s" />
		<WEATHER_PARAMETER label="Wind Direction" value={deg} unit="°" />
		<WEATHER_PARAMETER label="Humidity" value={humidity} unit="%" />
		<WEATHER_PARAMETER label="Pressure" value={pressure} unit="hPa" />
	</div>
));

// Type checking for props of the WEATHER_DETAILS component.
WEATHER_DETAILS.propTypes = {
	main: PropTypes.shape({
		//----------------------------------------- 'main' is an object containing several required weather parameters.
		feels_like: PropTypes.number.isRequired, // 'feels_like' is a number and is required (temperature feeling).
		humidity: PropTypes.number.isRequired, //-- 'humidity' is a number and is required (humidity percentage).
		pressure: PropTypes.number.isRequired, //-- 'pressure' is a number and is required (atmospheric pressure).
	}).isRequired,
	wind: PropTypes.shape({
		//----------------------------------------- 'wind' is an object containing wind-related parameters.
		speed: PropTypes.number.isRequired, //----- 'speed' is a number and is required (wind speed).
		deg: PropTypes.number.isRequired, //------- 'deg' is a number and is required (wind direction in degrees).
	}).isRequired,
};

// The main component that integrates all the above components to display the current weather information.
const Current_Weather = ({ data }) => {
	// Use the custom hook to get a ref with the tilt effect
	const card_tilt_ref = Use_Tilt_Effect();

	// Checking if necessary data exists. If not, render nothing.
	if (!data || !data.main || !data.weather) {
		return null;
	}

	// Destructuring the data prop to extract the required information, so we don't use the data prefix constantly.
	const {
		name,
		sys: { country },
		weather,
		main,
		wind,
	} = data;

	return (
		<div className="container-of-weather">
			<div className="weather" ref={card_tilt_ref}>
				{/* Displaying the header of the weather card. */}
				<WEATHER_HEADER name={name} country={country} description={weather[0].description} icon={weather[0].icon} />

				<div className="bottom">
					<div>
						{/* Displaying the main temperature. */}
						<p className="temperature">{Round_Temp(main.temp)}</p>

						{/* Displaying the minimum and maximum temperatures. */}
						<WEATHER_PARAMETER custom_class="parameter-row-min" label="Min" value={Round_Temp(main.temp_min)} />
						<WEATHER_PARAMETER custom_class="parameter-row-max" label="Max" value={Round_Temp(main.temp_max)} />
					</div>

					{/* Displaying the detailed weather parameters. */}
					<WEATHER_DETAILS main={main} wind={wind} />
				</div>
			</div>
		</div>
	);
};

// Type checking for props of the Current_Weather component.
Current_Weather.propTypes = {
	data: PropTypes.shape({
		//--------------------------------------- 'data' is an object containing all the weather data and is required.
		name: PropTypes.string, //--------------- 'name' is a string and represents the city name.
		sys: PropTypes.shape({
			//----------------------------------- 'sys' is an object containing system parameters.
			country: PropTypes.string, //-------- 'country' is a string and represents the country code.
		}),
		weather: PropTypes.arrayOf(
			//----------------------------------- 'weather' is an array of objects representing weather conditions.
			PropTypes.shape({
				description: PropTypes.string, // 'description' is a string and represents the weather condition text.
				icon: PropTypes.string, //------- 'icon' is a string and represents the weather icon code.
			})
		),
		main: PropTypes.shape({
			//----------------------------------- 'main' is an object containing main weather parameters.
			temp: PropTypes.number, //----------- 'temp' is a number representing the temperature.
			temp_min: PropTypes.number, //------- 'temp_min' is a number representing the minimum temperature.
			temp_max: PropTypes.number, //------- 'temp_max' is a number representing the maximum temperature.
			feels_like: PropTypes.number, //----- 'feels_like' is a number representing the temperature it feels like.
			humidity: PropTypes.number, //------- 'humidity' is a number representing the humidity percentage.
			pressure: PropTypes.number, //------- 'pressure' is a number representing the atmospheric pressure.
		}),
		wind: PropTypes.shape({
			//----------------------------------- 'wind' is an object containing wind-related parameters.
			speed: PropTypes.number, //---------- 'speed' is a number representing the wind speed.
			deg: PropTypes.number, //------------ 'deg' is a number representing the wind direction in degrees.
		}),
	}).isRequired,
};

// Export the Current Weather component to be used in other parts of the app.
export default Current_Weather;
