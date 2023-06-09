import { IoCashOutline, IoCardOutline, IoCalendarOutline, IoLockClosedOutline } from "react-icons/io5";
import "./CreateTicket.scss";
import { SiS7Airlines } from "react-icons/si";
import { useEffect, useState } from "react";
import { MdPermIdentity, MdSearch } from "react-icons/md";
import { FaPassport } from "react-icons/fa";
import { TicketComponent } from "../../components/TicketComponent/TicketComponent";
import { useDebounce } from "../../hooks/debounce";
import { useFlights } from "../../stores/flights";
import { useTickets } from "../../stores/tickets";
import { Button, notification } from "antd";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import { convertDate, convertDateAndTime, convertSeatTypeToMoney } from "../../utils/utils";

export const CreateTicket = () => {

    const { flights, fetchGetFlightByCity } = useFlights();

    const { fetchCreateTicket, isLoading } = useTickets((state) => ({
        fetchCreateTicket: state.fetchCreateTicket,
        isLoading: state.isLoading
    }));

    const [isDrop, setIsDrop] = useState(false);
    const [selectFlight, setSelectFlight] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [values, setValues] = useState({
        passengerName: '',
        passengerPassport: '',
        seatType: '',
    });
    const [searchValues, setSearchValues] = useState({
        fromCity: '',
        intoCity: ''
    });

    const debounce = useDebounce(searchValues);

    useEffect(() => {
        fetchGetFlightByCity(debounce.fromCity, debounce.intoCity);
    }, [debounce]);

    useEffect(() => {
        flights.length > 0 ? setIsDrop(true) : setIsDrop(false);
    }, [flights]);

    useEffect(() => {
        console.log(selectFlight);
    }, [selectFlight]);

    const updateValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const updateSearch = (e) => {
        setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
    }

    const selectFlightClick = (flight) => {
        setSelectFlight(flight);
        setIsDrop(false);
    }

    const createTicketClick = () => {
        selectFlight != null ? fetchCreateTicket(values, selectFlight.id) :
            notification.error({ message: 'Ошибка!', description: 'Для создания билета необходимо выбрать класс!', duration: 5 });
    }

    return (
        <div className="create_ticket_main_c">
            <LayoutHeader>
                <div className="create_ticket_container">
                    <div className="create_ticket_cont">
                        <div className="create_ticket_add_container">
                            <div>
                                <div className="create_user_container">
                                    <SiS7Airlines size={35} className="create_user_img" />
                                    <h1 className="create_user_title">Оформление билета</h1>

                                    <div className="create_user_inp_container">

                                        <div className="user_flight_info_container">
                                            <div className="custom_input">
                                                <p className="title">Фио пассажира</p>
                                                <div className="input_border">
                                                    <MdPermIdentity />
                                                    <input placeholder="Введите фио" name='passengerName' maxLength={50} onChange={(e) => updateValues(e)} />
                                                </div>
                                            </div>

                                            <div className="custom_input">
                                                <p className="title">Серия и номер паспорта</p>
                                                <div className="input_border">
                                                    <FaPassport />
                                                    <input placeholder="Серия и номер" name='passengerPassport' maxLength={10} onChange={(e) => updateValues(e)} />
                                                </div>
                                            </div>

                                            <div className="dropdown_container">
                                                <div className="custom_input">
                                                    <p className="title">Место вылета</p>
                                                    <div className="input_border">
                                                        <MdSearch />
                                                        <input placeholder="Место вылета" name='fromCity' maxLength={50} onChange={(e) => updateSearch(e)} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Место прилёта</p>
                                                    <div className="input_border">
                                                        <MdSearch />
                                                        <input placeholder="Место прилёта" name='intoCity' maxLength={50} onChange={(e) => updateSearch(e)} />
                                                    </div>
                                                </div>
                                                {
                                                    isDrop && <div className="dropdown_content">
                                                        {
                                                            flights?.map((flight) => {
                                                                return <div className="dropdown_item" onClick={() => selectFlightClick(flight)}>
                                                                    <div className="flight_date">
                                                                        <div className="name">{flight.nameFlight}</div>
                                                                        
                                                                        <div className="cities">{flight.fromCity}-{flight.intoCity}</div>    
                                                                    </div>

                                                                    <div className="flight_date">
                                                                        <div className="date">{convertDate(flight.flightDate)}</div>

                                                                        <div className="date">{convertDateAndTime(flight.flightDate, flight.flightTime, flight.arrivalTime)[0]}</div>
                                                                    </div>
                                                                
                                                                    <div className="flight_date">
                                                                        <div>{flight.flightTime}</div>

                                                                        <div className="time">{flight.arrivalTime}<span>мин</span></div>

                                                                        <div>{convertDateAndTime(flight.flightDate, flight.flightTime, flight.arrivalTime)[1]}</div>
                                                                    </div>

                                                                    <div className="flight_date">
                                                                        <div className="price">{flight.priceEconomy}₽</div>
                                                                        <div className="price">{flight.priceBusiness}₽</div>
                                                                        <div className="price">{flight.pricePremium}₽</div>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                }
                                            </div>

                                            {
                                                selectFlight != null &&
                                                <div className="choice_flight_container">
                                                    <p><span>Выбран рейс:</span> {selectFlight.nameFlight}</p>
                                                </div>
                                            }
                                        </div>

                                        <div className="select_class_flight_container">
                                            <div className='item_container'>
                                                <input type='radio' name="seatType" value='E' onClick={(e) => updateValues(e)} />
                                                <h4>Эконом</h4>
                                            </div>
                                            <div className='item_container'>
                                                <input type='radio' name="seatType" value='B' onClick={(e) => updateValues(e)} />
                                                <h4>Бизнесс</h4>
                                            </div>
                                            <div className='item_container'>
                                                <input type='radio' name="seatType" value='F' onClick={(e) => updateValues(e)} />
                                                <h4>Первый</h4>
                                            </div>
                                        </div>

                                        <div className="select_payment_metod_container">
                                            <h3 className="payment_title">Методы оплаты</h3>

                                            <div className="selected_payment_container">
                                                <input type="radio" name="payment" value="payment_cash" onChange={(e) => setPaymentMethod(e.target.value)} />
                                                <p>Оплата наличными</p>
                                                <IoCashOutline size={30} className="payment_metod_icon" />
                                            </div>
                                            <div className="selected_payment_container">
                                                <input type="radio" name="payment" value="payment_card" onChange={(e) => setPaymentMethod(e.target.value)} />
                                                <p>Оплата по карте</p>
                                                <IoCardOutline size={30} className="payment_metod_icon" />
                                            </div>

                                            <div className="select_payment_total_container">
                                                <p className="total">Итог:</p>
                                                <p className="total">{convertSeatTypeToMoney(selectFlight, values.seatType)}₽</p>
                                            </div>

                                            {
                                                paymentMethod === "payment_card" &&
                                                <div className="payment_card_enter_container">
                                                    <div className="custom_input">
                                                        <p className="title">Номер карты</p>
                                                        <div className="input_border">
                                                            <IoCardOutline />
                                                            <input placeholder="0000 0000 0000" maxLength={10} />
                                                        </div>
                                                    </div>

                                                    <div className="payment_card_enter_flex">
                                                        <div className="custom_input">
                                                            <p className="title">Дата</p>
                                                            <div className="input_border">
                                                                <IoCalendarOutline />
                                                                <input placeholder="00/00" maxLength={10} />
                                                            </div>
                                                        </div>
                                                        <div className="custom_input">
                                                            <p className="title">Код</p>
                                                            <div className="input_border">
                                                                <IoLockClosedOutline />
                                                                <input placeholder="000" maxLength={10} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        </div>

                                        <Button className="create_ticket_button" loading={isLoading} onClick={() => createTicketClick()}>Оформить билет</Button>
                                    </div>
                                </div>
                            </div>

                            <TicketComponent data={{
                                ...selectFlight,
                                ...values
                            }} />

                        </div>
                    </div>
                </div>
            </LayoutHeader>
        </div>
    );
}