import { useEffect, useState } from "react";
import "./CreateFlight.scss";
import { MdFlightTakeoff, MdFlightLand, MdChairAlt, MdOutlinePriceChange, MdOutlineTimelapse } from "react-icons/md";
import { Button, TimePicker } from "antd";
import dayjs from "dayjs";
import { notification } from "antd";
import { useFlights } from "../../stores/flights";
import { usePlanes } from "../../stores/plane";
import { CreateFlightPreview } from "../../components/CreateFlightPreviewComponent/CreateFlightPreview";
import { shallow } from "zustand/shallow";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";

export const CreateFlight = () => {

    const { fetchCreateFlight, isUploading } = useFlights((state) => ({
        fetchCreateFlight: state.fetchCreateFlight,
        isUploading: state.isUploading
    }), shallow);

    const { planes, fetchPlanes } = usePlanes();

    useEffect(() => {
        fetchPlanes();
    }, []);

    const [values, setValues] = useState({
        nameFlight: 'Рейс',
        fromCity: "",
        intoCity: "",
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
        setValues({ ...values, seatsAvailable: plane.numbOfSeats });
    }

    const updateFlightTime = (e) => {
        setValues({ ...values, 'flightTime': e });
    }

    const clickCreateFlight = () => {
        if (selectPlane == null) {
            notification.error({
                message: 'Необходимо выбрать самолёт!',
                description: 'Вам необходимо выбрать самолёт для создания рейса с текущими данными.',
                duration: 5
            });
            return;
        }
        fetchCreateFlight(values, selectPlane.id);
    }

    return (
        <>
            <LayoutHeader>
                <div className="create_flight_container">
                    <div className="create_flight_content_container">
                        <div className="create_flight_main_container">

                            <div className="create_flight_content">
                                <div className='preview_container'>
                                    <CreateFlightPreview item={{
                                        ...values,
                                        plane: selectPlane
                                    }} />
                                </div>

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
                                        <Button className="create_flight_save_btn" loading={isUploading} onClick={() => clickCreateFlight()}>Сохранить</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </LayoutHeader>
        </>
    );
}