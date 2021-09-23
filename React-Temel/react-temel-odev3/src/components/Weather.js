import CityContext from "../contexts/CityContext";
import DayContext from "../contexts/DayContext";
import OptionsContext from "../contexts/OptionsContext";

import CityCoordinates from "../contexts/CityCoordinates";
import DailyWeatherCard from "./DailyWeatherCard";
import WeatherDetails from "./WeatherDetails";

import axios from "axios";
import { useContext, useEffect, useState } from "react";


function Weather() {

    const [city,] = useContext(CityContext);
    const [options,] = useContext(OptionsContext);
    const [day,] = useContext(DayContext);
    const [weather, setWeather] = useState("");

    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/onecall?lon=${CityCoordinates[city]["lon"]}&lat=${CityCoordinates[city]["lat"]}&exclude=current,minutely,hourly,alerts&units=${options[1]}&appid=bf062a43c381ce140c07f38f07669477&lang=${options[0]}`).then(response => setWeather(response.data));
    }, [city, options])

    return (
        <>
            <div className="weather container">

                {weather && weather["daily"].map((dailyData, index) => {
                    return (
                        <DailyWeatherCard key={index} index={index} data={dailyData} />
                    )
                })}

            </div>
            {weather && <WeatherDetails data={weather["daily"][day]} />}
        </>
    );
}

export default Weather;