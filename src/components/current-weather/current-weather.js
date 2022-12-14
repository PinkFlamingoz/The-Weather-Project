import React from 'react';
import './current-weather.css';

const CurrentWeather = ({ data }) => {
	return (
		<div className="weather">
			<div className="top">
				<div>
					<p className="city">
						{data.name}, {data.sys.country}
					</p>
					<p className="weather-description">{data.weather[0].description}</p>
				</div>
				<img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.svg`}></img>
			</div>
			<div className="bottom">
				<div className="bigLook">
					<p className="temperature">{Math.round(data.main.temp)}°C</p>
					<div className="parameter-row">
						<span className="parameter-label-min">Min</span>
						<span className="parameter-value-min">{Math.round(data.main.temp_min)}°C</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label-max">Max</span>
						<span className="parameter-value-max">{Math.round(data.main.temp_max)}°C</span>
					</div>
				</div>
				<div className="detales">
					<div className="parameter-row">
						<span className="parameter-label top">Detales</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Feels like</span>
						<span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Wind</span>
						<span className="parameter-value">{data.wind.speed} m/s</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Wind Direction</span>
						<span className="parameter-value">{data.wind.deg}°</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Humidity</span>
						<span className="parameter-value">{data.main.humidity} %</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Pressure</span>
						<span className="parameter-value">{data.main.pressure} hPa</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
