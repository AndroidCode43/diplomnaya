import React from "react";
import { NavLeft } from "../../components/NavLeft/NavLeft";
import "./Main.scss";
import { CreateTask } from "../../components/CreateTask/CreateTask";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

export const Main = () => {

    // https://dribbble.com/shots/20700334-KASA-POS-Dashboard-Cashier

    return (
        <div>
            <div className="main_container">
                <NavLeft />

                <div className="main_container_view">

                    <Navbar title="Главная" date="01.01.23" />

                    <div className="main_task_container">
                        <div className="main_task_cont_items">
                            <Link to={"/create_ticket"}>
                                <CreateTask text="Создание билета" />
                            </Link>
                            <CreateTask text="Проверка рейса" />
                            <CreateTask text="Проверка личности пассажира" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}