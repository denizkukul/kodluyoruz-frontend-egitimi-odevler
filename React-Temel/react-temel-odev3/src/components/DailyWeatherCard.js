import DayContext from "../contexts/DayContext";
import OptionsContext from "../contexts/OptionsContext";
import { useContext } from "react";

const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const daysTr = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]

function DailyWeatherCard({ data, index }) {
    const [day, setDay] = useContext(DayContext);
    const [options,] = useContext(OptionsContext);
    let days = options[0] === "en" ? daysEn : daysTr;

    let iconID = data["weather"][0]["icon"];
    let dayname = days[new Date(data["dt"] * 1000).getDay()];
    let maxtemp = Math.round(data["temp"]["max"]);
    let mintemp = Math.round(data["temp"]["min"]);

    const handleClick = () => {
        setDay(index)
    }

    return (
        <div className={`weather-card ${day === index ? "selected" : ""}`} onClick={handleClick}>
            <div className="day">{dayname}</div>
            <img src={`https://openweathermap.org/img/wn/${iconID}@2x.png`} alt="Icon" />
            <div className="temperature">
                <div className="max-temp">{`${maxtemp}\u00B0`}</div>
                <div className="min-temp">{`${mintemp}\u00B0`}</div>
            </div>
        </div>
    );
}

export default DailyWeatherCard;