import { useEffect } from "react";
import { FlightComponent } from "../../components/FlightComponent/FlightComponent";
import styles from "./Flights.module.scss";
import { useFlights } from "../../stores/flights";
import { SearchFlightComponent } from "../../components/SearchFlightComponent/SearchFlightComponent";
import { shallow } from "zustand/shallow";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";


export const Flight = () => {

    const { flights, fetchGetFlights, isLoading } = useFlights((state) => ({
        flights: state.flights,
        fetchGetFlights: state.fetchGetFlights,
        isLoading: state.isLoading
    }), shallow);

    useEffect(() => {
        fetchGetFlights();
    }, []);

    return (
        <LayoutHeader>
            <div className={styles.flight_container}>

                <div className={styles.flight_main_container}>

                    <div className={styles.flight_view_flight_container}>
                        <div className={styles.flight_view_hello_container}>
                            <h1>Поиск существующих рейсов</h1>
                            <p>Летите, куда хотите!</p>
                        </div>

                        <SearchFlightComponent />

                        <div className={styles.flight_view_container}>
                            {
                                isLoading && <LoadingComponent />
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
        </LayoutHeader>
    )
}