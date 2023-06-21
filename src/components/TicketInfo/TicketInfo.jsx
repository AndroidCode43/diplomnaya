import styles from "./TicketInfo.module.scss";
import { IoAirplaneSharp } from "react-icons/io5";
import Barcode from "react-barcode";
import { convertDate, convertSeatType } from "../../utils/utils";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

export const TicketInfo = (props) => {

    const componentRef = useRef();

    const { passengerName, passengerPassport, seatType, seatNumber, id, price } = props.item;
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
                                <div className={styles.title}>Рейс</div>
                                <div className={styles.desc}>{nameFlight}</div>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <div className={styles.title}>Время</div>
                                <div className={styles.desc}>{flightTime}</div>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <div className={styles.title}>Класс</div>
                                <div className={styles.desc}>{convertSeatType(seatType)}</div>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <div className={styles.title}>Место</div>
                                <div className={styles.desc}>{seatNumber + seatType}</div>
                            </div>
                        </div>
                        <div className={styles.create_ticket_item}>
                            <div className={styles.create_ticket_inform}>
                                <div className={styles.title}>Цена</div>
                            </div>
                            <div className={styles.create_ticket_inform}>
                                <div className={styles.desc}>{price}₽</div>
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