import React from "react";
import styles from "./Navbar.module.scss";
import { CgShoppingBag, CgLogIn } from "react-icons/cg";

export const Navbar = () => {

    return (
        <div>
            <div className={styles.main_table_view}>
                <div className={styles.main_table_container}>
                    <h1 className={styles.main_table_title}>Ятт<span>Авиаline</span></h1>

                    <div className={styles.right_container}>
                        <div className={styles.bag_container}>
                            <CgShoppingBag size={20} />
                            <div className={styles.count}>
                                <p>1</p>
                            </div>
                        </div>

                        <div className={styles.bag_container}>
                            <CgLogIn size={20}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}