import styles from "./AdminFlights.module.scss";
import {NavLeft} from "../../components/NavLeft/NavLeft";
import {LayoutHeader} from "../../components/LayoutHeader/LayoutHeader";
import {useFlights} from "../../stores/flights";
import {useEffect} from "react";
import {AdminFlightComponent} from "../../components/AdminFlightComponent/AdminFlightComponent";

export const AdminFlights = () => {

    const {fetchGetFlightsWithTickets, errGetFlights, flights} = useFlights();

    useEffect(() => {
       fetchGetFlightsWithTickets();
    },[]);

    return <>
        <div className={styles.admin_flight_container}>
            <NavLeft/>
            <LayoutHeader>
                <div className={styles.admin_items_container}>
                    <h1>Все доступные рейсы</h1>
                    <div className={styles.admin_item_view_flight}>
                        {
                            flights?.map((flight) => {
                                return <AdminFlightComponent item={flight} key={flight.id}/>
                            })
                        }
                    </div>
                </div>
            </LayoutHeader>
        </div>
    </>
}