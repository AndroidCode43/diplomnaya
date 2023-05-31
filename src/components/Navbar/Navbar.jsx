import React from "react";
import styles from "./Navbar.module.scss";
import { CgLogIn } from "react-icons/cg";
import {Link} from "react-router-dom";

export const Navbar = () => {

    return (
        <div>
            <div className={styles.main_table_view}>
                <div className={styles.main_table_container}>
                    <Link className={styles.main_table_title} to={'/flights'}>Ятт<span>Авиаline</span></Link>

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