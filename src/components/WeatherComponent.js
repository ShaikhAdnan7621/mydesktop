"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherComponent() {
    const [city, setCity] = useState("surat");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        const storedCity = localStorage.getItem("city");
        if (storedCity) {
            setCity(storedCity);
        }
    }, []);

    const fetchWeather = async () => {
        try {
            let weatherData = JSON.parse(localStorage.getItem("weatherData"));
            let forecastData = JSON.parse(localStorage.getItem("forecastData"));
            let dataTime = localStorage.getItem("dataTime");

            let currentTime = new Date().getTime();
            let timeDifference = (currentTime - dataTime) / (1000 * 60 * 60); // time difference in hours

            if (!weatherData || !forecastData || timeDifference > 3) {
                const setWeatherDataresponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9cc850939787ac9c46f5ead0b833616&units=metric`
                );
                weatherData = setWeatherDataresponse.data;
                console.log(setWeatherDataresponse);

                const setForecastDataresponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a9cc850939787ac9c46f5ead0b833616&units=metric`
                );
                forecastData = setForecastDataresponse.data.list.slice(0, 20);
                console.log(setForecastDataresponse);

                // Store the fetched data and the current time in localStorage
                localStorage.setItem(
                    "weatherData",
                    JSON.stringify(weatherData)
                );
                localStorage.setItem(
                    "forecastData",
                    JSON.stringify(forecastData)
                );
                localStorage.setItem("dataTime", currentTime.toString());
            }

            setWeatherData(weatherData);
            setForecastData(forecastData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [city]);

    const getWeatherEmoji = (weather) => {
        if (weather.includes("Rain")) return "☔️";
        if (weather.includes("Clouds")) return "☁️";
        if (weather.includes("Clear")) return "☀️";
        return "❓";
    };

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white ">
            <div className="border p-3 rounded-xl shadow-lg">
                <div className="flex justify-between ">
                    <div className="pl-3 py-2 ">
                        <h1 className="text-4xl pb-2">
                            {weatherData && (
                                <span>{weatherData.main.temp}°C</span>
                            )}
                        </h1>
                        <p>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    //make date and time empty
                                    localStorage.removeItem("weatherData");
                                }}
                                placeholder="City Name"
                                className="bg-white text-xl dark:bg-black text-black dark:text-white w-28 border-gray-300 dark:border-gray-600 text-center"
                            />
                        </p>
                    </div>
                    <div className="text-6xl">
                        {weatherData && (
                            <span>
                                {getWeatherEmoji(weatherData.weather[0].main)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {forecastData && (
                <div className="border py-2 rounded-xl shadow-lg flex overflow-x-scroll mt-3 no-scrollbar snap-x">
                    {forecastData.map((data, index) => (
                        <div
                            key={index}
                            className="flex justify-around w-20 snap-center"
                        >
                            <div className="w-16 text-center p-2">
                                <h1 className="text-sm">
                                    {Math.floor(weatherData.main.temp)}°C
                                </h1>
                                <div className="text-4xl my-2">
                                    {getWeatherEmoji(data.weather[0].main)}
                                </div>
                                <p className=" ">
                                    {
                                        new Date(data.dt * 1000)
                                            .toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })
                                            .split(" ")[0]
                                    }
                                </p>
                                <p className="text-xs opacity-75">
                                    {
                                        new Date(data.dt * 1000)
                                            .toLocaleTimeString("en-US", {
                                                hour12: true,
                                            })
                                            .split(" ")[1]
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex justify-end mt-2">
                <button
                    className=""
                    onClick={() => {
                        fetchWeather();
                    }}
                >
                    Check
                </button>
            </div>
        </div>
    );
}
