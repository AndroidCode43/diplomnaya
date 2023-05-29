import React from "react";
import "./NavLeft.scss";
import { IoHome, IoTicketSharp, IoAirplaneSharp, IoPeople, IoLogOutOutline } from "react-icons/io5";
import vas from "../../assets/vas.jpeg";
import { Link } from "react-router-dom";

export const NavLeft = () => {
    return (
        <div>
            <div className="nav_l_container">
                <div className="nav_l_cont">
                    <div className="nav_cont_items">
                        <img src={vas} className="nav_user_icon" />

                        <div className="nav_cont_item">
                            <IoHome size={30} className="nav_item_icon" />
                            <h1 className="nav_title">Рейсы</h1>
                        </div>
                        <div className="nav_cont_item">
                            <IoTicketSharp size={30} className="nav_item_icon" />
                            <h1 className="nav_title">Билеты</h1>
                        </div>
                        <Link to={"/flights"}>
                            <div className="nav_cont_item">
                                <IoAirplaneSharp size={30} className="nav_item_icon" />
                                <h1 className="nav_title">Рейсы</h1>
                            </div>
                        </Link>
                        <div className="nav_cont_item">
                            <IoPeople size={30} className="nav_item_icon" />
                            <h1 className="nav_title">Люди</h1>
                        </div>
                        <div className="nav_cont_item">
                            <IoAirplaneSharp size={30} className="nav_item_icon" />
                            <h1 className="nav_title">Самолёты</h1>
                        </div>
                        
                    </div>
                    <div className="nav_cont_logout">
                        <IoLogOutOutline size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}