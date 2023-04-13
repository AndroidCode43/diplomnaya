import { Navbar } from "../../components/Navbar/Navbar";
import { NavLeft } from "../../components/NavLeft/NavLeft";
import { IoAirplaneSharp } from "react-icons/io5";
import "./CreateTicket.scss";
import { SiS7Airlines } from "react-icons/si";
import { useEffect, useState } from "react";
import {getCityByName} from "../../redux/slices/countriesSlice";
import bg from "../../assets/bg_create.png";
import { useDispatch, useSelector } from "react-redux";

export const CreateTicket = () => {

    const dispatch = useDispatch();
    const {countries} = useSelector((state) => state.countriesReducer);

    useEffect(() => {
        dispatch(getCityByName());
    },[]);

    const [values, setValues] = useState({
        bio: "Ivan Ivanov",
        idData: "1234 12345",
        dob: "01/01/1999",
    });

    const updateValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    if(countries.length != 0){
        console.log(countries);
    }

    return (
        <div className="create_ticket_main_c">
            <NavLeft />
            <div className="create_ticket_container">
                <div className="create_ticket_cont">
                    <Navbar title="Создание билета" date="02.02.20" />
                    <div className="create_ticket_add_container">
                        <div>
                            <div className="create_user_container">
                                <SiS7Airlines size={35} className="create_user_img" />
                                <h1 className="create_user_title">Создание билета</h1>
                                <div className="create_user_inp_container">
                                    <input value={values.bio} placeholder="Ф.И.О" className="create_user_input" name="bio" onChange={(e) => updateValues(e)} />
                                    <input value={values.idData} placeholder="Серия номер пасспорта" className="create_user_input" name="idData" onChange={(e) => updateValues(e)} />
                                    <input value={values.dob} placeholder="Дата рождения" className="create_user_input" name="dob" onChange={(e) => updateValues(e)} />
                                    <input placeholder="Страна вылета" className="create_user_input" />
                                    <input placeholder="Вылет из" className="create_user_input" />
                                    <input placeholder="Страна прилёта" className="create_user_input" />
                                    <input placeholder="Пункт назначения" className="create_user_input" />
                                    <input placeholder="Класс" className="create_user_input" />
                                </div>
                            </div>
                            <button className="create_ticket_button">Создать билет</button>
                        </div>

                        <img src={bg} className="create_ticket_bg" />

                        <div>
                            <div className="create_ticket_gen_container">
                                <h1 className="create_ticket_gen_title">Book Flight Ticket</h1>
                                <h1 className="create_ticket_gen_desc">New features for traveling during the COVID-19 (coronavisrus) outbreak.</h1>

                                <div className="create_ticket_main_cont">
                                    <div className="create_ticket_gen_cont">
                                        <div className="create_ticket">
                                            <div className="create_ticket_header">
                                                <h1 className="create_ticket_type">Economy Saver</h1>
                                                <div className="create_ticket_flight">
                                                    <h1>RU</h1>
                                                    <IoAirplaneSharp size={15} className="icon" />
                                                    <h1>UK</h1>
                                                </div>
                                            </div>
                                            <h1 className="create_ticket_count">1 Flight Ticket</h1>
                                            <div className="create_ticket_item">
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Passenger</h1>
                                                    <h1 className="desc">{values.bio}</h1>
                                                </div>
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Date</h1>
                                                    <h1 className="desc">30 Jan 2023</h1>
                                                </div>
                                            </div>
                                            <div className="create_ticket_item">
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Flight</h1>
                                                    <h1 className="desc">123131231</h1>
                                                </div>
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Gate</h1>
                                                    <h1 className="desc">77 B</h1>
                                                </div>
                                            </div>
                                            <div className="create_ticket_item">
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Class</h1>
                                                    <h1 className="desc">Economy</h1>
                                                </div>
                                                <div className="create_ticket_inform">
                                                    <h1 className="title">Seats</h1>
                                                    <h1 className="desc">17 B - 25 B</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="create_ticket_center"></div>
                                    <div className="create_ticket_barcode">
                                        <h1>BARCODE</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}