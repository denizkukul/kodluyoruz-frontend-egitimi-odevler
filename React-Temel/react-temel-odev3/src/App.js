import CityContext from "./contexts/CityContext";
import DayContext from "./contexts/DayContext";
import OptionsContext from "./contexts/OptionsContext";
import CityCoordinates from "./contexts/CityCoordinates";

import Weather from "./components/Weather";
import Header from "./components/Header";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(localStorage.getItem("location") || "");
  const [day, setDay] = useState(0);
  const [options, setOptions] = useState(["en", "metric"])

  useEffect(() => {
    if (!localStorage.getItem("location")) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          axios(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=tr&key=968a1654afae4a5c8824c5a331dccf84`)
            .then(response => setCity(() => {
              let city = response.data["principalSubdivision"];
              let arr = Object.keys(CityCoordinates);
              if (arr.includes(city)) { return city }
              else { return "İstanbul" }
            }))
            .finally(() => { setLoading(false) });
        },
        ((error) => {
          setCity("İstanbul");
          setLoading(false);
        }))
    }
    else {
      setLoading(false);
    }
  }, [])

  return (
    <div className="App">
      <OptionsContext.Provider value={[options, setOptions]}>
        <CityContext.Provider value={[city, setCity]}>
          <DayContext.Provider value={[day, setDay]}>
            {!loading &&
              <>
                <Header />
                <Weather />
              </>
            }
          </DayContext.Provider>
        </CityContext.Provider>
      </OptionsContext.Provider>
    </div>
  )
}

export default App;