import styles from "./TicketInfo.module.scss";
import { IoAirplaneSharp } from "react-icons/io5";
import Barcode from "react-barcode";
import { convertDate, convertSeatType } from "../../utils/utils";
import { Button } from "antd";
import { type } from "@testing-library/user-event/dist/type";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

export const TicketInfo = (props) => {

    const componentRef = useRef();

    const { passengerName, passengerPassport, seatType, seatNumber, id } = props.item;
    const { fromCity, intoCity, flightDate, nameFlight, flightTime } = props.item.flight;

    return <>
        <div>
            <div ref={componentRef}>
                <div className={styles.create_ticket_gen_cont}>
                    <div className={styles.create_ticket}>
                        <div className={styles.create_ticket_header}>
                            <h1 className={styles.create_ticket_type}>ЯттАвиаline</h1>
                            <div className={styles.create_ticket_flight}>
                                <h1>{fromCity}</h1>
                                <IoAirplaneSharp size={10} className={styles.icon} />
                                <h1>{intoCity}</h1>
                            </div>
                        </div>
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
                                <h1 className={styles.desc}>{convertSeatType(seatType)}</h1>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <h1 className={styles.title}>Место</h1>
                                <h1 className={styles.desc}>{seatNumber + seatType}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.create_ticket_center}></div>
                <div className={styles.create_ticket_barcode}>
                    <div className={styles.create_ticket_barcode_container}>
                        <Barcode value={`Ticket ${id}`} background={'transparent'} width={1.3} height={30} fontSize={15} />
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ReactToPrint
                    trigger={() => <Button style={{ width: 'fit-content', marginTop: '0.7rem' }} type='primary'>Напечатать</Button>}
                    content={() => componentRef.current}
                />
            </div>
        </div>
    </>
}