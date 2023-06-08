import styles from "./AdminFlights.module.scss";
import {LayoutHeader} from "../../components/LayoutHeader/LayoutHeader";
import {useFlights} from "../../stores/flights";
import {useEffect, useState} from "react";
import {AdminFlightComponent} from "../../components/AdminFlightComponent/AdminFlightComponent";
import bg from "../../assets/svg_planet.svg";

export const AdminFlights = () => {

    const {fetchGetFlightsWithTickets, fetchGetFlightByDate, fetchGetValidWithTickets, flights} = useFlights();

    const [values, setValues] = useState({
        'flightDate': '',
        'activeFlights': 'all',
    });

    const updateValues = (e) => setValues({...values, [e.target.name]: e.target.value});

    useEffect(() => {
       fetchGetFlightsWithTickets();
    },[]);

    useEffect(() => {
        fetchGetFlightByDate(values.flightDate);
    },[values.flightDate]);

    useEffect(() => {
        values.activeFlights === 'active'? fetchGetValidWithTickets() : fetchGetFlightsWithTickets()
    },[values.activeFlights]);

    return(
            <>
                <div className={styles.admin_flight_container}>
                    <LayoutHeader>
                        <div className={styles.admin_items_container}>
                            <img src={bg} className={styles.img_bg}/>

                            <div className={styles.admin_items_info}>
                                <h1>Отображение рейсов по фильтру</h1>
                                <p>На данной странице можно фильтровать рейсы и искать необходимые.</p>
                            </div>

                            <div className={styles.search_flight_container}>
                                <div className={styles.search_item}>
                                    <p>Поиск по дате:</p>
                                    <input type='date' name='flightDate' onChange={(e) => updateValues(e)}/>
                                </div>
                                <div className={styles.search_item}>
                                    <input type='radio' name='activeFlights' value={'all'} onChange={(e) => updateValues(e)}/>
                                    <p>Все рейсы</p>
                                </div>
                                <div className={styles.search_item}>
                                    <input type='radio' name='activeFlights' value={'active'} onChange={(e) => updateValues(e)}/>
                                    <p>Активные рейсы</p>
                                </div>
                            </div>

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
    );
}