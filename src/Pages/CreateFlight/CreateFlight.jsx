import { useState } from "react";
import { EconomyComponent } from "../../components/EconomyComponent/EconomyComponent";
import { NavLeft } from "../../components/NavLeft/NavLeft";
import { PremiumComponent } from "../../components/PremiumComponent/PremiumComponent";
import "./CreateFlight.scss";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdFlightTakeoff, MdFlightLand, MdChairAlt, MdOutlinePriceChange, MdLocalAirport } from "react-icons/md";

export const CreateFlight = () => {

    const [values, setValues] = useState({
        aircraft: "test",
        departureFrom: "Russia",
        comingIn: "USA",
        numberOfChairs: 10,
        priceInEconomy: 300,
        priceInBissnes: 450,
        priceInFirst: 600
    });


    const inputsHandler = (e) => {

    }

    const updateValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className="create_flight_container">
            <NavLeft />
            <div className="create_flight_main_container">

                <div>
                    <div className="create_flight_preview_container">
                        <div className="create_flight_preview_header">
                            <div className="create_flight_prev_sec_one">
                                <p>{values.departureFrom}</p>
                                <p>{values.comingIn}</p>
                            </div>
                            <div className="create_flight_prev_sec_two">
                                <p>SFO</p>
                                <div className="create_flight_prev_sec_two_items">
                                    <div className="divider_flight" />
                                    <HiOutlineChevronRight />
                                    <div className="divider_flight" />
                                </div>
                                <p>DEN</p>
                            </div>
                            <div className="create_flight_prev_sec_3">
                                <p>Apr 3, 5:30am</p>
                                <p className="flight_h">2h 20m</p>
                                <p>1:34pm</p>
                            </div>
                        </div>

                        <div className="create_flight_preview_body">
                            <div className="create_flight_preview_body_container">
                                <div className="create_flight_preview_body_one">
                                    <p>Flight</p>
                                    <p>Class</p>
                                    <p>Aircraft</p>
                                    <p>Possibility</p>
                                </div>
                                <div className="create_flight_preview_body_two">
                                    <p>AR 580</p>
                                    <p>Economy</p>
                                    <p>{values.aircraft}</p>
                                    <p>Possibility</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="create_flight_inputs_container">
                        <div className="inputs_container">
                            <p className="title">Create</p>
                            <div className="inputs_flights">

                                <div className="input">
                                    <MdLocalAirport color="gray" />
                                    <input placeholder="Самолёт" name="aircraft" onChange={(e) => updateValues(e)} value={values.aircraft}/>
                                </div>
                                <div className="input">
                                    <MdFlightTakeoff color="gray" />
                                    <input placeholder="Пункт вылета" name="departureFrom" onChange={(e) => updateValues(e)} value={values.departureFrom}/>
                                </div>
                                <div className="input">
                                    <MdFlightLand color="gray" />
                                    <input placeholder="Пункт прилёта" name="comingIn" onChange={(e) => updateValues(e)} value={values.comingIn}/>
                                </div>
                                <div className="input">
                                    <MdChairAlt color="gray" />
                                    <input placeholder="Кол-во мест в самолёте" name="numberOfChairs" onChange={(e) => updateValues(e)} value={values.numberOfChairs}/>
                                </div>
                                <div className="input">
                                    <MdOutlinePriceChange color="gray" />
                                    <input placeholder="Цена в эконом классе" name="priceInEconomy" onChange={(e) => updateValues(e)} value={values.priceInEconomy}/>
                                </div>
                                <div className="input">
                                    <MdOutlinePriceChange color="gray" />
                                    <input placeholder="Цена в бизнес классе" name="priceInBissnes" onChange={(e) => updateValues(e)} value={values.priceInBissnes}/>
                                </div>
                                <div className="input">
                                    <MdOutlinePriceChange color="gray" />
                                    <input placeholder="Цена в первом классе" name="priceInFirst" onChange={(e) => updateValues(e)} value={values.priceInFirst}/>
                                </div>

                            </div>
                            <button className="create_flight_save_btn">Сохранить</button>
                        </div>
                    </div>
                </div>

                <div className="create_flight_select_options">
                    <EconomyComponent price={values.priceInEconomy} />
                    <PremiumComponent price={values.priceInBissnes} />
                    <EconomyComponent price={values.priceInEconomy} />
                </div>

            </div>
        </div>
    );
}