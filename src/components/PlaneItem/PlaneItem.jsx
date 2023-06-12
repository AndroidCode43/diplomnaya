import styles from "./PlaneItem.module.scss";
import { IoMdAirplane } from "react-icons/io";
import {usePlanes} from "../../stores/plane";
import { Button } from "antd";
import { useState } from "react";
import yttAxios from "../../utils/axios_settings";

export const PlaneItem = (props) => {

    const {fetchPlanes} = usePlanes();

    const {id, name, description, numbOfSeats} = props.item;

    const [state, setState] = useState({
        isLoading: false,
        msg: ''
    });

    const deletePlanet = async() => {
        setState({...state, isLoading: true});
        try {
            await yttAxios.delete(`/planes/delete/${id}`)
            .then(async() => {
                setState({...state, msg: 'Самолёт успешно удалён!', isLoading: false});
                fetchPlanes();
            });
        } catch (error) {
            alert(error.msg);
        }
    }

    return <>
        <div className={styles.plane_container}>
            <IoMdAirplane size={30} color='#1D63DC'/>
            <div className={styles.plane_fields_container}>
                <h3>{name}</h3>
                <p>{description}</p>
                <div className={styles.flex_container}>
                    <p><span>Вместимость:</span> {numbOfSeats} мест</p>
                    <div className={styles.btn_container}>
                        <Button onClick={() => deletePlanet(id)} className={styles.button_delete} loading={state.isLoading}>Удалить</Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}