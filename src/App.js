import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import React, { useState } from 'react';
import Forecast from './components/forecast/forecast';
import LinksToSocials from './components/links/linksToSocial';

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForcast] = useState(null);
	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(' ');
		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);
		const forcastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		Promise.all([currentWeatherFetch, forcastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forcastResponse = await response[1].json();
				setCurrentWeather({ city: searchData.lable, ...weatherResponse });
				setForcast({ city: searchData.lable, ...forcastResponse });
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="container">
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather} />}
			{forecast && <Forecast data={forecast} />}
			<LinksToSocials></LinksToSocials>
		</div>
	);
}

export default App;
