import styles from './AdminFlightComponent.module.scss';
import {convertDate, convertDateAndTime} from "../../utils/utils";
import {MdFlightTakeoff} from "react-icons/md";
import {useState} from "react";
import {TicketInfo} from "../TicketInfo/TicketInfo";
export const AdminFlightComponent = (props) => {

    const {fromCity, intoCity, flightDate, flightTime, arrivalTime,
        priceEconomy, priceBusiness, pricePremium,
        tickets
    } = props.item;

    const [isViewTickets, setIsViewTickets] = useState(false);

    return (
        <>
            <div className={styles.flight_comp_container}>
                <div className={styles.flight_comp_sect_1}>
                    <p className={styles.ytt}>Ятт<span>Авиаline</span></p>
                </div>

                <div className={styles.flight_center_container}>
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
                    <div className={styles.flight_comp_but_container}>
                        <button onClick={() => setIsViewTickets(!isViewTickets)}>Просмотреть билеты</button>
                    </div>
                </div>

                <div className={styles.flight_comp_sect_3}>
                    <h3 className={styles.text_start_price}>Цены:</h3>
                    <div>
                        <p className={styles.start_price_ticket}>{priceEconomy}<span> руб.</span></p>
                        <p className={styles.start_price_ticket}>{priceBusiness}<span> руб.</span></p>
                        <p className={styles.start_price_ticket}>{pricePremium}<span> руб.</span></p>
                    </div>
                </div>
            </div>
            <div className={styles.ticket_info_container}>
                {
                    tickets.length > 0 && isViewTickets ? tickets.map((ticket) => {
                        return <TicketInfo item={ticket}/>
                    }) : <div></div>
                }
            </div>
        </>
    );
}
