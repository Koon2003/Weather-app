import React, { useState, useEffect } from 'react';
import Search from './search';

export default function Weather() {
    const [search, setSearch] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    {/* Search Weather Of Place */}
    async function fetchWeatherData(place) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`);
            const data = await response.json();
            if(data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    async function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-us", {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    useEffect(() => {
        fetchWeatherData('hanoi');
    }, []);

    return (
        <div>
            <Search 
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div>
                    {/* City Name */}
                    <div className='city-name'>
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    {/* Current Date */}
                    <div className='date'>
                        <span>{getCurrentDate()}</span>
                    </div>
                    {/* Temperature */}
                    <div className='temp'>{weatherData?.main?.temp}</div>
                    {/* Description */}
                    <p className='description'>
                        {weatherData && weatherData.weather && weatherData.weather[0]
                        ? weatherData.weather[0].description : ""}
                    </p>
                    {/* Weather Info */}
                    <div className='weather-info'>
                        <div className='column'>
                            <div>
                                <p className='wind'>{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className='column'>
                            <div>
                                <p className='humidity'>{weatherData?.main?.humidity}</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}