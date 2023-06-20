import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { CgMenuLeftAlt } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import Cookies from "js-cookie";
import { Button } from "antd";

export const Navbar = () => {
    const navigate = useNavigate();

    const [nav, setNav] = useState(false);
    const [text, setText] = useState();

    const role = Cookies.get('role');
    const token = Cookies.get('token');

    const clickBtn = () => {
        if (!role || !token) {
            return navigate('/login');
        }
        Cookies.remove('role');
        Cookies.remove('token');
        navigate('/login');
    }

    useEffect(() => {
        if (!role || !token) {
            setText('Авторизоваться');
        } else {
            setText('Выйти');
        }
    }, []);

    return (
        <div>
            <div className={styles.main_table_view}>
                <div className={styles.main_table_container}>

                    <div className={nav ? styles.open_nav : styles.close_nav_menu}>
                        <div className={styles.nav_container}>
                            <div className={styles.nav_header}>
                                <div className={styles.main_table_title}>Навигация</div>
                                <MdOutlineClose size={25} style={{ cursor: 'pointer' }} onClick={() => setNav(false)} />
                            </div>

                            <div className={styles.items_container}>
                                <Link to={'/account'} className={styles.item}>Аккаунт</Link>
                                <Link to={'/flights'} className={styles.item}>Рейсы</Link>
                                {
                                    role === 'ADMIN' && <>
                                        <Link className={styles.item} to={'/admin/users'}>Люди</Link>
                                        <Link to={'/admin/tickets'} className={styles.item}>Билеты</Link>
                                        <Link to={'/admin/planes'} className={styles.item}>Самолёты</Link>
                                        <Link to={'/admin/dashboard'} className={styles.item}>Панель</Link>
                                        <Link to={'/admin/create_flight'} className={styles.item}>Создание рейса</Link>
                                        <Link to={'/admin/create_ticket'} className={styles.item}>Создание билета</Link>
                                        <Link to={'/admin/flights'} className={styles.item}>Рейсы (Админ.)</Link>
                                    </>
                                }
                            </div>

                        </div>
                    </div>

                    <div className={styles.left_item_container}>
                        <CgMenuLeftAlt size={25} onClick={() => setNav(!nav)} />
                        <Link className={styles.main_table_title} to={'/flights'}>Ятт<span>Авиаline</span></Link>
                    </div>
                    <div className={styles.right_container}>
                        <Button type="dashed" onClick={() => clickBtn()}>{text}</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}