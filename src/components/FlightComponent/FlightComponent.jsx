import styles from "./FlightComponent.module.scss";
import { MdFlightTakeoff } from "react-icons/md";
import 'moment/locale/ru';
import {convertDate, convertDateAndTime} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

export const FlightComponent = (props) => {
    const navigate = useNavigate();

    const {fromCity, intoCity, flightDate, flightTime, arrivalTime,
        priceEconomy, priceBusiness, pricePremium, id} = props.item;

    return (
        <>
            <div className={styles.flight_comp_container} onClick={() => navigate(`/flight/${id}`)}>
                <div className={styles.flight_comp_sect_1}>
                    <p className={styles.ytt}>Ятт<span>Авиаline</span></p>
                </div>

                <div className={styles.flight_comp_sect_2}>
                    <div className={styles.about_flight_container}>
                        <div className={styles.about}>
                            <h3 className={styles.title}>{convertDate(flightDate)}</h3>
                            <p className={styles.text_time}>{flightTime} <span>МСК.</span></p>
                            <p className={styles.text_city}>{fromCity}</p>
                        </div>
                        <div className={styles.about_center}>
                            <h3 className={styles.title}>Время полёта: <span>{arrivalTime} мин.</span></h3>
                            <div className={styles.about_center_icon_container}>
                                <MdFlightTakeoff className={styles.about_center_icon}/>
                            </div>
                            <p className={styles.desc}>ЯттАвиаline</p>
                        </div>
                        <div className={styles.about}>
                            <h3 className={styles.title}>{convertDateAndTime(flightDate, flightTime, arrivalTime)[0]}</h3>
                            <p className={styles.text_time}>{convertDateAndTime(flightDate, flightTime, arrivalTime)[1]} <span>МСК.</span></p>
                            <p className={styles.text_city}>{intoCity}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.flight_comp_sect_3}>
                    <div className={styles.flex_container}>
                        <h3 className={styles.text_start_price}>Эконом-класс:</h3>
                        <p className={styles.start_price_ticket}>{priceEconomy}<span> руб.</span></p>
                    </div>
                    <div className={styles.flex_container}>
                        <h3 className={styles.text_start_price}>Бизнес-класс:</h3>
                        <p className={styles.start_price_ticket}>{priceBusiness}<span> руб.</span></p>
                    </div>
                    <div className={styles.flex_container}>
                        <h3 className={styles.text_start_price}>Первый-класс:</h3>
                        <p className={styles.start_price_ticket}>{pricePremium}<span> руб.</span></p>
                    </div>
                    <button className={styles.btn_view} onClick={() => navigate(`/flight/${id}`)}>Подробнее</button>
                </div>
            </div>
        </>
    );
}