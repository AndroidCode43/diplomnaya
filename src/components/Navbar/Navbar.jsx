import React, {useState} from "react";
import styles from "./Navbar.module.scss";
import { CgLogIn } from "react-icons/cg";
import {Link} from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";

export const Navbar = () => {

    const [nav,setNav] = useState(false);

    return (
        <div>
            <div className={styles.main_table_view}>
                <div className={styles.main_table_container}>

                    <div className={nav ? styles.open_nav : styles.close_nav_menu}>
                        <div className={styles.nav_container}>
                            <div className={styles.main_table_title}>Ятт<span>Авиаline</span></div>

                            <div className={styles.items_container}>
                                <Link>Билеты</Link>
                                <Link to={'/flights'}>Рейсы</Link>
                                <Link>Люди</Link>
                                <Link to={'/admin/planes'}>Самолёты</Link>
                                <Link to={'/admin/dashboard'}>Панель</Link>
                                <Link to={'/admin/create_flight'}>Создание рейса</Link>
                                <Link to={'/admin/create_ticket'}>Создание билета</Link>
                                <Link to={'/account'}>Аккаунт</Link>
                                <Link to={'/flights'}>Рейсы</Link>
                                <Link to={'/login'}>Вход</Link>
                            </div>
                        </div>
                    </div>

                    <div className={styles.left_item_container}>
                        <CgMenuLeftAlt size={25} onClick={() => setNav(!nav)}/>
                        <Link className={styles.main_table_title} to={'/flights'}>Ятт<span>Авиаline</span></Link>
                    </div>
                    <div className={styles.right_container}>
                        <div className={styles.bag_container}>
                            <CgLogIn size={20}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}