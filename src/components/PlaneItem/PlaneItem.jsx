import styles from "./PlaneItem.module.scss";
import { IoMdAirplane } from "react-icons/io";
import {usePlanes} from "../../stores/plane";

export const PlaneItem = (props) => {

    const {fetchDeletePlanet} = usePlanes();

    const {id, name, description, numbOfSeats} = props.item;

    return <>
        <div className={styles.plane_container}>
            <IoMdAirplane size={30} color='#1D63DC'/>
            <div className={styles.plane_fields_container}>
                <h3>{name}</h3>
                <p>{description}</p>
                <div className={styles.flex_container}>
                    <p><span>Вместимость:</span> {numbOfSeats} мест</p>
                    <div className={styles.btn_container}>
                        <button onClick={() => fetchDeletePlanet(id)}>Удалить</button>
                        <button>Редактировать</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}