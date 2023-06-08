import { useState } from "react";
import styles from "./SearchFlightComponent.module.scss";
import { useFlights } from "../../stores/flights";
import { shallow } from "zustand/shallow";

export const SearchFlightComponent = () => {

    const {fetchGetFlightByParams} = useFlights((state) => ({
        fetchGetFlightByParams: state.fetchGetFlightByParams
    }),shallow );

    const [values, setValues] = useState({
        date: '',
        fromCity: '',
        intoCity: ''
    });

    const updateValues = (e) => setValues({...values, [e.target.name]: e.target.value});

    return <>
        <div className={styles.search_container}>
            <div className={styles.item_left_container}>
                <input placeholder="Откуда" name='fromCity' onChange={(e) => updateValues(e)}/>
            </div>
            <div className={styles.item_container}>
                <input placeholder="Куда" name='intoCity' onChange={(e) => updateValues(e)}/>
            </div>
            <div className={styles.item_container}>
                <input placeholder="Когда" type={'date'} name='date' onChange={(e) => updateValues(e)}/>
            </div>
            <div className={styles.item_right_container}>
                <button className={styles.search_button} onClick={() => fetchGetFlightByParams(values.date, values.fromCity, values.intoCity)}>Найти</button>
            </div>
        </div>
    </>
}