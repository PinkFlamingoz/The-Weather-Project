import React from 'react';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

	return (
		<>
			<label className="title">Daily</label>
			<Accordion allowZeroExpanded>
				{data.list.slice(0, 7).map((data, idx) => (
					<AccordionItem key={idx}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className="daily-item">
									<img src={`icons/${data.weather[0].icon}.svg`} className="icon" alt="weather" />
									<label className="day">{forecastDays[idx]}</label>
									<label className="description">{data.weather[0].description}</label>
									<label className="max">Max:{Math.round(data.main.temp_max)}°C /</label>
									<label className="min">/ Min:{Math.round(data.main.temp_min)}°C</label>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<div className="daily-details">
								<div className="daily-details-item">
									<label>Feels like:</label>
									<label>{Math.round(data.main.feels_like)}°C</label>
								</div>
								<div className="daily-details-item">
									<label>Clouds:</label>
									<label>{data.clouds.all} %</label>
								</div>
								<div className="daily-details-item">
									<label>Humidity:</label>
									<label>{data.main.humidity} %</label>
								</div>
								<div className="daily-details-item">
									<label>Wind speed:</label>
									<label>{data.wind.speed} m/s</label>
								</div>
								<div className="daily-details-item">
									<label>Wind direction:</label>
									<label>{data.wind.deg}°</label>
								</div>
								<div className="daily-details-item">
									<label>Gust:</label>
									<label>{data.wind.gust}</label>
								</div>
								<div className="daily-details-item">
									<label>Pressure:</label>
									<label>{data.main.pressure}P</label>
								</div>
								<div className="daily-details-item">
									<label>Sea level:</label>
									<label>{data.main.sea_level} m</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
};

export default Forecast;
