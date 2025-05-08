import wlLogo from "./images/worldline-mint-horizontal.png";
import "./header.css";


function Header() {
    return (
        <div className="header">
            <img src={wlLogo} alt="Worldline Logo" className="logo" />
            <h1 className="title">RDG Accounting Periods Calendar</h1>
        </div>
    );
}

export default Header;