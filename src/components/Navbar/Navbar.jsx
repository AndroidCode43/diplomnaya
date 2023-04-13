import React from "react";
import "./Navbar.scss";
import { BsCalendarDay } from "react-icons/bs";

export const Navbar = (props) => {
    return (
        <div>
            <div className="main_table_view">
                <div className="main_table_container">
                    <h1 className="main_table_title">{props.title}</h1>
                    <div className="main_table_data_block">
                        <BsCalendarDay size={30} className="main_table_icon" />
                        <h1 className="main_table_date">{props.date}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}