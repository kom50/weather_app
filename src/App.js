import React, { useState, useEffect } from 'react';
import './style.css';
import {
	WiCloudy,
	WiSunrise,
	WiSunset,
	WiDayHaze,
	WiDaySunny,
	WiRain,
} from 'react-icons/wi';

import { MdLocationOn } from 'react-icons/md';

const App = () => {
	// Hooks
	const [city, setCity] = useState('Patna');
	const [weatherReport, setWeatherReport] = useState({});
	const [isLoaded, setLoaded] = useState(false);
	const [Error, setError] = useState({
		cod: '',
		message: '',
	});

	const changeHandler = (event) => {
		console.log('change handler');
		setCity(event.target.value);
	};

	const fetchData = async () => {
		console.log('fetch method', city);
		setLoaded(false);
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3aa1cb8c3063d1ada082d158ed5f6275`
		);
		console.log(res);
		const data = await res.json();
		console.log(data);

		if (data.cod === '404') {
			setLoaded(true);
			console.log('error 404');
			setError(data);
		} else {
			setError({});
			setLoaded(true);
			setWeatherReport({
				city_name: data.name,
				country: data.sys.country,
				temp: data.main.temp,
				min_temp: data.main.temp_min,
				max_temp: data.main.temp_max,
				sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
				sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
				weather: { ...data.weather[0] },
				date: new Date(data.dt * 1000).toLocaleDateString(),
			});
		}
		console.log(' error ', Error);
	};

	const clickHandler = (event) => {
		console.log('button clicked');
		try {
			city !== '' && fetchData();
		} catch (err) {
			console.log('Error', err);
		}
	};

	useEffect(() => {
		city !== '' && fetchData();
	}, []);

	/* useEffect(() => {
		console.log('weather ', weatherReport);
		if (Object.keys(weatherReport).length !== 0)
			console.log('weather ', weatherReport.weather.main);
	}, [weatherReport]); */

	return (
		<div className="full_height bg row bg-light">
			<div className="full_height main  col-11 col-md-7 mx-auto ">
				{/* <div className="container-fluid "> */}
				<header className="">
					<h2 className="title">Weather App</h2>
				</header>
				<main className="">
					<form>
						<div className="form-floating my-0">
							<input
								className="form-control"
								type="text"
								name="name"
								id="city"
								placeholder="Enter city name "
								value={city}
								onChange={changeHandler}
							/>
							<label htmlFor="name">Enter city name </label>
						</div>
						<input
							className="btn btn-warning mt-1"
							type="button"
							value="Search"
							onClick={clickHandler}
						/>
					</form>
					<div className="content mt-5 ">
						<div
							className="card mx-auto"
							style={{ width: '18rem', height: '20rem' }}>
							<div className="card-body">
								{!isLoaded ? (
									<div className="loader">
										<h2 className="loading text-center ">
											{/* 7 */}
										</h2>
									</div>
								) : (
									<>
										{Error.cod === '404' ? (
											<h5 className="card-title text-center">
												Error : {Error.message}
											</h5>
										) : (
											<>
												{(() => {
													if (
														Object.keys(
															weatherReport
														).length !== 0
													) {
														switch (
															weatherReport
																.weather.main
														) {
															case 'Haze':
																return (
																	<WiDayHaze className="icons" />
																);
															case 'Clouds':
																return (
																	<WiCloudy className="icons" />
																);
															case 'Rainy':
																return (
																	<WiRain className="icons" />
																);
															default:
																return (
																	<WiDaySunny className="icons" />
																);
														}
													}
												})()}

												<h5 className="card-title text-center">
													<MdLocationOn
														style={{
															position:
																'relative',
															top: -2,
															fontSize: 24,
														}}
													/>{' '}
													{weatherReport.city_name}
													{', '}
													{weatherReport.country}
												</h5>
												<h1 className="card-title text-center">
													{weatherReport.temp}
													<small>&deg;</small>C
												</h1>
												<p className=" text-center">
													{new Date().toLocaleTimeString()}{' '}
													{','}
													{weatherReport.date}{' '}
												</p>
												<div className="d-flex justify-content-around">
													<p className="card-text">
														min :{' '}
														{weatherReport.min_temp}{' '}
														<small>&deg;</small>C
													</p>
													<p className="card-text">
														max :{' '}
														{weatherReport.max_temp}{' '}
														<small>&deg;</small>C
													</p>
												</div>
												<div className="d-flex justify-content-around">
													<p
														className="card-text"
														title="sunrise">
														<WiSunrise
															style={{
																fontSize:
																	'3rem',
															}}
														/>{' '}
														{weatherReport.sunrise}
													</p>
													<p
														className="card-text"
														title="sunset">
														<WiSunset
															style={{
																fontSize:
																	'3rem',
															}}
														/>{' '}
														{weatherReport.sunset}
													</p>
												</div>
											</>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
			{/* </div> */}
		</div>
	);
};

export default App;
