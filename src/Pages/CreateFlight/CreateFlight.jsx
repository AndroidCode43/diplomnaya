import {useEffect, useState} from "react";
import { NavLeft } from "../../components/NavLeft/NavLeft";
import "./CreateFlight.scss";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdFlightTakeoff, MdFlightLand, MdChairAlt, MdOutlinePriceChange, MdOutlineTimelapse } from "react-icons/md";
import { Navbar } from "../../components/Navbar/Navbar";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import {notification} from "antd";
import {useFlights} from "../../stores/flights";
import {usePlanes} from "../../stores/plane";
import {useAuth} from "../../stores/auth";
import {useNavigate} from "react-router-dom";
import {CreateFlightPreview} from "../../components/CreateFlightPreviewComponent/CreateFlightPreview";

export const CreateFlight = () => {

    const navigate = useNavigate();

    const {errUploading, fetchCreateFlight} = useFlights();
    const {planes, fetchPlanes} = usePlanes();
    const {fetchIsAdmin, authError, admin} = useAuth();

    useEffect(() => {
        fetchIsAdmin();
    },[]);

    useEffect(() => {
        admin && fetchPlanes();
    },[admin])

    //если обнаружены ошибки в авторизации делаем редирект на главную страницу
    useEffect(() => {
        authError && navigate('/');
    },[authError]);

    useEffect(() => {
        errUploading != null && notification.error({message: 'Произошла ошибка!', description: errUploading, duration: 5});
    },[errUploading])

    const [values, setValues] = useState({
        nameFlight:'Рейс 1',
        fromCity: "Яранск",
        intoCity: "Киров",
        flightDate: "",
        flightTime: "",
        arrivalTime: 0,
        priceEconomy: 0,
        priceBusiness: 0,
        pricePremium: 0,
        seatsEconomy: 0,
        seatsBusiness: 0,
        seatsPremium: 0,
        seatsAvailable: 0
    });

    const [selectPlane, setSelectPlane] = useState(null);

    const updateValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const choicePlane = (plane) => {
        setSelectPlane(plane);
        setValues({...values, seatsAvailable: plane.numbOfSeats});
    }

    const updateFlightTime = (e) => {
        setValues({ ...values, 'flightTime': e });
    }

    const clickCreateFlight = () => {
        if(selectPlane == null){
            notification.error({
                message: 'Необходимо выбрать самолёт!',
                description: 'Вам необходимо выбрать самолёт для создания рейса с текущими данными.',
                duration: 5});
            return;
        }
        fetchCreateFlight(values, selectPlane.id);
    }

    return (
        <>
            <div className="create_flight_container">
                <NavLeft />
                <div className="create_flight_content_container">
                    <Navbar />
                    <div className="create_flight_main_container">
                        <div className="create_flight_content">
                            <CreateFlightPreview item={{
                                ...values,
                                plane: selectPlane
                            }}/>

                            <div className="create_flight_inputs_container">
                                <div className="inputs_container">
                                    <p className="title">Создание рейса</p>
                                    <div className="inputs_flights">

                                        <div>
                                            <p className="availible_plane_text">Доступные самолёты</p>
                                            <div>

                                                <div className="create_flight_plane_container">
                                                    {
                                                        planes.map((item) => {
                                                            return <div key={item.id}
                                                                        className="item_plane"
                                                                        onClick={() => choicePlane(item)}>
                                                                <p>{item.name}</p>
                                                            </div>
                                                            }
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="inputs_flights_section_container">
                                            <div>
                                                <div className="custom_input">
                                                    <p className="title">Название рейса</p>
                                                    <div>
                                                        <MdFlightTakeoff color="gray" />
                                                        <input placeholder="Пункт вылета" name="nameFlight" onChange={(e) => updateValues(e)} value={values.nameFlight} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Вылет из</p>
                                                    <div>
                                                        <MdFlightTakeoff color="gray" />
                                                        <input placeholder="Пункт вылета" name="fromCity" onChange={(e) => updateValues(e)} value={values.fromCity} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Дата вылета</p>
                                                    <div>
                                                        <MdOutlineTimelapse color="gray" />
                                                        <input type="date" placeholder="Пункт вылета" name="flightDate" onChange={(e) => updateValues(e)} value={values.flightDate} />
                                                    </div>
                                                </div>

                                                <div className="input_without_border">
                                                    <p className="title">Время вылета</p>

                                                    <TimePicker defaultValue={dayjs('00:00', 'HH:mm')} format={'HH:mm'} className="picker" placeholder="Выберите время"
                                                        onSelect={(e) => updateFlightTime(e.$d.toLocaleTimeString())} />
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Прилёт в</p>
                                                    <div>
                                                        <MdFlightLand color="gray" />
                                                        <input placeholder="Пункт прилёта" name="intoCity" onChange={(e) => updateValues(e)} value={values.intoCity} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Примерное время полёта(минуты)</p>
                                                    <div>
                                                        <MdOutlineTimelapse color="gray" />
                                                        <input type='number' placeholder="Время полёта" name="arrivalTime" onChange={(e) => updateValues(e)} value={values.arrivalTime} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Всего мест в самолёте</p>
                                                    <div>
                                                        <MdChairAlt color="gray" />
                                                        <input type='number' placeholder="Кол-во мест в самолёте" name="seatsAvailable" onChange={(e) => updateValues(e)} value={values.seatsAvailable} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="custom_input">
                                                    <p className="title">Кол-во мест в эконом-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Кол-во мест" name="seatsEconomy" onChange={(e) => updateValues(e)} value={values.seatsEconomy} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Кол-во мест в бизнесс-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Кол-во мест" name="seatsBusiness" onChange={(e) => updateValues(e)} value={values.seatsBusiness} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Кол-во мест в первом-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Кол-во мест" name="seatsPremium" onChange={(e) => updateValues(e)} value={values.seatsPremium} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="custom_input">
                                                    <p className="title">Цена в эконом-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Цена в эконом классе" name="priceEconomy" onChange={(e) => updateValues(e)} value={values.priceEconomy} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Цена в бизнесс-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Цена в бизнес классе" name="priceBusiness" onChange={(e) => updateValues(e)} value={values.priceBusiness} />
                                                    </div>
                                                </div>
                                                <div className="custom_input">
                                                    <p className="title">Цена в первом-классе</p>
                                                    <div>
                                                        <MdOutlinePriceChange color="gray" />
                                                        <input type='number' placeholder="Цена в первом классе" name="pricePremium" onChange={(e) => updateValues(e)} value={values.pricePremium} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <button className="create_flight_save_btn" onClick={() => clickCreateFlight()}>Сохранить</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}