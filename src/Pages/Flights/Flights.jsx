import { FlightComponent } from "../../components/FlightComponent/FlightComponent";
import { NavLeft } from "../../components/NavLeft/NavLeft";
import "./Flights.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export const Flight = () => {
    return (
        <div className="flight_container">
            <NavLeft/>

            <div className="flight_main_container">
                
                <div>

                    <div>
                        <h1>Book Flights</h1>
                        <h4 className="flight_text_desc">Book International & Domestic Flights</h4>
                    </div>

                    <div className="flights_info_container">
                        <div className="flights_display_container">

                            <div className="flight_country_container">
                                <div className="flight_from_container">
                                    <p>FROM</p>
                                    <p>23RD APR</p>
                                </div>
                                <div className="flight_from_container">
                                    <p className="bold_style">London</p>
                                    <p className="bold_style">LON</p>
                                </div>
                            </div>
                            <div className="flight_country_container">
                                <div className="flight_from_container">
                                    <p>FROM</p>
                                    <p>23RD APR</p>
                                </div>
                                <div className="flight_from_container">
                                    <p className="bold_style">London</p>
                                    <p className="bold_style">LON</p>
                                </div>
                            </div>

                        </div>

                        <div className="flight_select_class_container">
                            <p className="bold_gray">TRAVELLERS & CLASS</p>
                            <div className="flight_select_class_select_container">
                                <h4>1</h4>
                                <div className="flight_select_items">
                                    <IoIosArrowUp className="flight_select_item"/>
                                    <IoIosArrowDown className="flight_select_item"/>
                                </div>
                            </div>
                            <p className="bold_text">Эконом/Бизнес/Первый</p>
                        </div>
                    </div>

                </div>
            </div>

            <FlightComponent />
        </div>
    )
}