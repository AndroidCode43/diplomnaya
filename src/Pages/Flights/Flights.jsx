import {useEffect, useState} from "react";
import { FlightComponent } from "../../components/FlightComponent/FlightComponent";
import styles from "./Flights.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Navbar } from "../../components/Navbar/Navbar";
import {useFlights} from "../../stores/flights";

export const Flight = () => {

    const {flights, fetchGetFlights} = useFlights();

    useEffect(() => {
        fetchGetFlights();
    },[]);

    const [ticketInfo, setTicketInfo] = useState({
        fromCity: "Moscow",
        toCity: "Dubai",
        travelClass: 1
    });

    const updateVlalues = (e) => {
        setTicketInfo({ ...ticketInfo, [e.target.name]: e.target.value });
        console.log(ticketInfo);
    }

    return (
        <div className={styles.flight_container}>
            <Navbar />

            <div className={styles.flight_main_container}>

                <div>

                    <div className={styles.flight_hello_container}>
                        <h3>Готов к взлёту?</h3>
                    </div>

                    <div>
                        <h1>Book Flights</h1>
                        <h4 className={styles.flight_text_desc}>Book International & Domestic Flights</h4>
                    </div>

                    <div className={styles.flights_info_container}>
                        <div className={styles.flights_display_container}>

                            <div className={styles.flight_country_container}>
                                <div className={styles.flight_from_container}>
                                    <p>FROM</p>
                                    <p>23RD APR</p>
                                </div>
                                <div className={styles.flight_from_container}>
                                    <input className={styles.input_enter_city} placeholder="London" name="fromCity" onChange={(e) => updateVlalues(e)} />
                                    <p className={styles.bold_style}>LON</p>
                                </div>
                            </div>
                            <div className={styles.flight_country_container}>
                                <div className={styles.flight_from_container}>
                                    <p>TO</p>
                                    <p>23RD APR</p>
                                </div>
                                <div className={styles.flight_from_container}>
                                    <input className={styles.input_enter_city} placeholder="Dubai" name="toCity" onChange={(e) => updateVlalues(e)} />
                                    <p className={styles.bold_style}>UAE</p>
                                </div>
                            </div>

                        </div>

                        <div className={styles.flight_select_class_container}>
                            <p className={styles.bold_gray}>TRAVELLERS & CLASS</p>
                            <div className={styles.flight_select_class_select_container}>
                                <h4>{ticketInfo.travelClass}</h4>
                                <div className={styles.flight_select_items}>
                                    <IoIosArrowUp className={styles.flight_select_item} />
                                    <IoIosArrowDown className={styles.flight_select_item}/>
                                </div>
                            </div>
                            <p className={styles.bold_text}>Эконом/Бизнес/Первый</p>
                        </div>
                    </div>

                </div>

                <div className={styles.flight_view_flight_container}>
                    <h3>{flights.length} Рейса доступны</h3>

                    <div className={styles.flight_view_container}>
                        {
                            flights?.map((item) => {
                                return <FlightComponent item={item} key={item.id}/>
                            })
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}