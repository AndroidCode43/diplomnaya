import {useEffect, useState} from "react";
import { FlightComponent } from "../../components/FlightComponent/FlightComponent";
import styles from "./Flights.module.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Navbar } from "../../components/Navbar/Navbar";
import {useFlights} from "../../stores/flights";
import imgBg from "../../assets/svg_planet.svg";
import { SearchFlightComponent } from "../../components/SearchFlightComponent/SearchFlightComponent";

export const Flight = () => {

    const {flights, fetchGetFlights} = useFlights();

    useEffect(() => {
        fetchGetFlights();
    },[]);

    return (
        <div className={styles.flight_container}>
            <Navbar />

            <div className={styles.flight_main_container}>
                <img src={imgBg} className={styles.flight_bg} alt='bg'/>

                <div className={styles.flight_view_flight_container}>
                    <div className={styles.flight_view_hello_container}>
                        <h1>Поиск существующих рейсов</h1>
                        <p>Летите, куда хотите!</p>
                    </div>
                    <SearchFlightComponent/>

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