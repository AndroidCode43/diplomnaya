import "./FlightComponent.scss";
import { MdFlightTakeoff, MdFlightLand, MdSettings } from "react-icons/md";

export const FlightComponent = () => {

    //https://dribbble.com/shots/19766296-Natural-web-app-ticket-UI-design

    return (
        <div className="flight_comp_container">
            <div className="flight_comp_header">
                <img src={'https://flagcdn.com/ru.svg'} className="flight_country_icon"/>
                <div>
                    <div className="flight_comp_f_info">
                        <p className="b_text">LON</p>
                        <MdFlightTakeoff size={20} color="white" />
                        <p className="b_text">UAE</p>
                        <p className="flight_comp_hr">1:25 Hrs</p>
                    </div>
                    <p className="flight_comp_desc">Friday, 23rd Apr 23</p>
                </div>
            </div>
            <div className="flight_comp_price_container">
                <p className="flight_comp_price">$<span>191</span>.00</p>
                <div className="sep_view" />
                <div>
                    <p className="flight_comp_time">18:35-20:00</p>
                    <p className="flight_comp_desc">None-Stop</p>
                </div>
            </div>

            <div className="flight_comp_btn_settings" color="white">
                <MdSettings size={25} color="white"/>
            </div>

        </div>
    );
}