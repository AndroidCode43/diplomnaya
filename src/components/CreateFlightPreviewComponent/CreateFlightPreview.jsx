import styles from "./CreateFlightPreview.module.scss";
import {HiOutlineChevronRight} from "react-icons/hi";
import {convertDate, convertDateAndTime} from "../../utils/utils";
import {useTickets} from "../../stores/tickets";

export const CreateFlightPreview = (props) => {

    const {plane, nameFlight, fromCity, intoCity, arrivalTime, flightDate, flightTime} = props.item;
    const {selectClassTicket} = useTickets();

    return <>
        <div className={styles.create_flight_preview_container}>
            <div className={styles.create_flight_preview_header}>
                <div className={styles.create_flight_prev_sec_one}>
                    <p>{convertDate(flightDate)}</p>
                    <p className={styles.flight_h}>{arrivalTime} мин.</p>
                    <p>{convertDateAndTime(flightDate, flightTime, arrivalTime)[0]}</p>
                </div>
                <div className={styles.create_flight_prev_sec_two}>
                    <p>{fromCity}</p>
                    <div className={styles.create_flight_prev_sec_two_items}>
                        <div className={styles.divider_flight} />
                        <HiOutlineChevronRight />
                        <div className={styles.divider_flight} />
                    </div>
                    <p>{intoCity}</p>
                </div>
                <div className={styles.create_flight_prev_sec_3}>
                    <p>{flightTime}</p>
                    {/*<p className={styles.flight_h}>{arrivalTime} мин.</p>*/}
                    <p>{convertDateAndTime(flightDate, flightTime, arrivalTime)[1]}</p>
                </div>
            </div>

            <div className={styles.create_flight_preview_body}>
                <div className={styles.create_flight_preview_body_container}>
                    <div className={styles.create_flight_preview_body_one}>
                        <p>Рейс</p>
                        <p>Классы</p>
                        <p>Самолёт</p>
                    </div>
                    <div className={styles.create_flight_preview_body_two}>
                        <p>{nameFlight}</p>
                        <p>Выбран: {selectClassTicket?.type}</p>
                        <p>{plane?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}