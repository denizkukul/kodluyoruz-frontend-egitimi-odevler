import OptionsContext from "../contexts/OptionsContext";
import { useContext } from "react";

function Options() {

    const [options, setOptions] = useContext(OptionsContext);

    return (
        <div className="options">
            <div className="unit-option">
                <div className={options[1] === "metric" ? "active" : ""} onClick={() => setOptions([options[0], "metric"])}>{"C\u00B0"}</div>
                <div className={options[1] === "imperial" ? "active" : ""} onClick={() => setOptions([options[0], "imperial"])}>{"F\u00B0"}</div>
            </div>
            <div className="lang-option">
                <div className={options[0] === "en" ? "active" : ""} onClick={() => setOptions(["en", options[1]])}>EN</div>
                <div className={options[0] === "tr" ? "active" : ""} onClick={() => setOptions(["tr", options[1]])}>TR</div>
            </div>
        </div>
    );
}

export default Options;