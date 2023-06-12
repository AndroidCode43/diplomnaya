import { useEffect } from "react";
import { FlightComponent } from "../../components/FlightComponent/FlightComponent";
import styles from "./Flights.module.scss";
import { Navbar } from "../../components/Navbar/Navbar";
import { useFlights } from "../../stores/flights";
import imgBg from "../../assets/svg_planet.svg";
import { SearchFlightComponent } from "../../components/SearchFlightComponent/SearchFlightComponent";
import { shallow } from "zustand/shallow";
import {LoadingComponent} from "../../components/LoadingComponent/LoadingComponent";


export const Flight = () => {

    const { flights, fetchGetFlights, isLoading} = useFlights((state) => ({
        flights: state.flights,
        fetchGetFlights: state.fetchGetFlights,
        isLoading: state.isLoading
    }), shallow);

    useEffect(() => {
        fetchGetFlights();
    }, []);

    return (
        <div className={styles.flight_container}>
            <Navbar />

            <div className={styles.flight_main_container}>
                <img src={imgBg} className={styles.flight_bg} alt='bg' />

                <div className={styles.flight_view_flight_container}>
                    <div className={styles.flight_view_hello_container}>
                        <h1>Поиск существующих рейсов</h1>
                        <p>Летите, куда хотите!</p>
                    </div>

                    <SearchFlightComponent />

                    <div className={styles.flight_view_container}>
                        {
                        isLoading && <LoadingComponent/>
                        }
                        {
                            flights?.map((item) => {
                                return <FlightComponent item={item} key={item.id} />
                            })
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}