import styles from "./TicketComponent.module.scss";
import { IoAirplaneSharp } from "react-icons/io5";

export const TicketComponent = () => {
    return <>
        <div className={styles.create_ticket_gen_container}>
            <h1 className={styles.create_ticket_gen_title}>Book Flight Ticket</h1>
            <h1 className={styles.create_ticket_gen_desc}>New features for traveling during the COVID-19 (coronavisrus) outbreak.</h1>

            <div className={styles.create_ticket_main_cont}>
                <div className={styles.create_ticket_gen_cont}>
                    <div className={styles.create_ticket}>
                        <div className={styles.create_ticket_header}>
                            <h1 className={styles.create_ticket_type}>Economy Saver</h1>
                            <div className={styles.create_ticket_flight}>
                                <h1>RU</h1>
                                <IoAirplaneSharp size={15} className={styles.icon} />
                                <h1>UK</h1>
                            </div>
                        </div>
                        <h1 className={styles.create_ticket_count}>1 Билет на самолёт</h1>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Пассажир</h1>
                                <h1 className={styles.desc}>IVAN IVANOV</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Дата вылета</h1>
                                <h1 className={styles.desc}>30 Jan 2023</h1>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Рейс</h1>
                                <h1 className={styles.desc}>123131231</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Gate</h1>
                                <h1 className={styles.desc}>77 B</h1>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Класс</h1>
                                <h1 className={styles.desc}>Economy</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Место</h1>
                                <h1 className={styles.desc}>17 B - 25 B</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.create_ticket_center}></div>
                <div className={styles.create_ticket_barcode}>
                    <h1>BARCODE</h1>
                </div>
            </div>
        </div>
    </>
}