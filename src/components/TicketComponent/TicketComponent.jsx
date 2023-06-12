import styles from "./TicketComponent.module.scss";
import { IoAirplaneSharp } from "react-icons/io5";
import { convertDate } from "../../utils/utils";
import Barcode from "react-barcode";

export const TicketComponent = (props) => {

    const { fromCity, intoCity, passengerName, flightDate, seatType,
        nameFlight, flightTime } = props?.data;

    return <>
        <div className={styles.create_ticket_gen_container}>
            <h1 className={styles.create_ticket_gen_title}>Предпросмотр билета</h1>
            <p className={styles.create_ticket_gen_desc}>Снизу отображается препросмотр оформляемого билета.</p>

            <div className={styles.create_ticket_main_cont}>
                <div className={styles.create_ticket_gen_cont}>
                    <div className={styles.create_ticket}>
                        <div className={styles.create_ticket_header}>
                            <h1 className={styles.create_ticket_type}>ЯттАвиаline</h1>
                            <div className={styles.create_ticket_flight}>
                                <h1>{fromCity}</h1>
                                <IoAirplaneSharp size={15} className={styles.icon} />
                                <h1>{intoCity}</h1>
                            </div>
                        </div>
                        <h1 className={styles.create_ticket_count}>1 Билет на самолёт</h1>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Пассажир</h1>
                                <h1 className={styles.desc}>{passengerName}</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Дата вылета</h1>
                                <h1 className={styles.desc}>{convertDate(flightDate)}</h1>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Рейс</h1>
                                <h1 className={styles.desc}>{nameFlight}</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Время</h1>
                                <h1 className={styles.desc}>{flightTime}</h1>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Класс</h1>
                                <h1 className={styles.desc}>{seatType}</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Место</h1>
                                <h1 className={styles.desc}>Автомат.</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.create_ticket_center}></div>
                <div className={styles.create_ticket_barcode}>
                    <Barcode value={`Ticket ${flightDate}`} background={'transparent'} width={1.2} height={30} fontSize={15} />
                </div>
            </div>
        </div>
    </>
}