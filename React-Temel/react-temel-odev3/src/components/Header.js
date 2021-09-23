import CitySelect from "./CitySelect";
import Options from "./Options";

function Header() {
    return (
        <div className="main-header">
            <div className="container header">
                <CitySelect />
                <Options />
            </div>
        </div>
    );
}

export default Header;