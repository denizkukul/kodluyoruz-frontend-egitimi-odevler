import CityContext from "../contexts/CityContext"
import OptionsContext from "../contexts/OptionsContext";
import { useContext } from "react"

const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthsTr = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Auğustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const weatherDetailsEn = ["Humidity", "Wind", "Sunrise", "Sunset", "Temperature", "Feels Like"];
const weatherDetailsTr = ["Nem", "Rüzgar", "Gündoğumu", "Günbatımı", "Sıcaklık", "Hissedilen"];
const timeOfDayTr = ["Sabah", "Öğlen", "Akşam", "Gece"];
const timeOfDayEn = ["Morning", "Afternoon", "Evening", "Night"];


function WeatherDetails({ data }) {
    const [city,] = useContext(CityContext);
    const [options,] = useContext(OptionsContext);

    let weatherDetails = options[0] === "en" ? weatherDetailsEn : weatherDetailsTr;
    let timeOfDay = options[0] === "en" ? timeOfDayEn : timeOfDayTr;
    let months = options[0] === "en" ? monthsEn : monthsTr;

    let iconID = data["weather"][0]["icon"];
    let date = new Date(data["dt"] * 1000);
    let sunriseTime = new Date(data["sunrise"] * 1000);
    let sunsetTime = new Date(data["sunset"] * 1000);
    let sunrise = `${sunriseTime.getHours()}:${sunriseTime.getMinutes() < 10 ? "0" + sunriseTime.getMinutes() : sunriseTime.getMinutes()}`
    let sunset = `${sunsetTime.getHours()}:${sunsetTime.getMinutes() < 10 ? "0" + sunsetTime.getMinutes() : sunsetTime.getMinutes()}`
    let day = date.getDate();
    let month = months[date.getMonth()];

    return (
        <div className="container weather-details">
            <div className="weather-details-header">
                <div>
                    <img className="item" src={`https://openweathermap.org/img/wn/${iconID}@2x.png`} alt="Icon" />
                </div>

                <div className="weather-description item">{`${data.weather[0].description}`}</div>
                <div className="header-info item">
                    <div>{`${weatherDetails[0]}: ${options[0] === "en" ? data["humidity"] + " %" : "% " + data["humidity"]}`}</div>
                    <div>{`${weatherDetails[1]}: ${data["wind_speed"].toFixed(2)} ${options[1] === "metric" ? "m/s" : "mph"}`}</div>
                </div>
                <div className="header-time item">
                    <div>{`${weatherDetails[2]}: ${sunrise}`}</div>
                    <div>{`${weatherDetails[3]}: ${sunset}`}</div>
                </div>
                <div className="header-date item">
                    <div>{city}</div>
                    <div>{`${day} ${month}`}</div>
                </div>
            </div>


            <div className="temperature-details">
                <div className="timeofday">
                    <div>{timeOfDay[0]}</div>
                    <div>{timeOfDay[1]}</div>
                    <div>{timeOfDay[2]}</div>
                    <div>{timeOfDay[3]}</div>
                </div>
                <div className="measured-temperature">
                    <div className="rowname">{weatherDetails[4]}</div>
                    <div>{`${data["temp"]["morn"]}\u00B0`}</div>
                    <div>{`${data["temp"]["day"]}\u00B0`}</div>
                    <div>{`${data["temp"]["eve"]}\u00B0`}</div>
                    <div>{`${data["temp"]["night"]}\u00B0`}</div>
                </div>
                <div className="felt-temperature">
                    <div className="rowname">{weatherDetails[5]}</div>
                    <div>{`${data["feels_like"]["morn"]}\u00B0`}</div>
                    <div>{`${data["feels_like"]["day"]}\u00B0`}</div>
                    <div>{`${data["feels_like"]["eve"]}\u00B0`}</div>
                    <div>{`${data["feels_like"]["night"]}\u00B0`}</div>
                </div>
            </div>

        </div>
    );
}

export default WeatherDetails;