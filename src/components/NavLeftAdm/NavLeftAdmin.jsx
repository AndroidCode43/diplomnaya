import React from "react";
import "./NavLeft.scss";
import { IoHome, IoTicketSharp, IoAirplaneSharp, IoPeople, IoLogOutOutline } from "react-icons/io5";
import vas from "../../assets/vas.jpeg";
import { Link } from "react-router-dom";

export const NavLeftAdmin = () => {
    return (
        <div>
            <div className="nav_l_container">
                <div className="nav_l_cont">
                    <div className="nav_cont_items">
                        <img src={vas} className="nav_user_icon" />

                    </div>
                    <div className="nav_cont_logout">
                        <IoLogOutOutline size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}