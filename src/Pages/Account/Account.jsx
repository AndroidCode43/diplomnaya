import styles from "./Account.module.scss";
import {LayoutHeader} from "../../components/LayoutHeader/LayoutHeader";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake, FaPassport, FaRubleSign } from "react-icons/fa";
import {useAccount} from "../../stores/account";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TicketInfo} from "../../components/TicketInfo/TicketInfo";

export const Account = () => {

    //СДЕЛАТЬ КАСТОМНЫЙ AXIOS И ВШИТЬ ТУДА АВТОРИЗАЦИЮ
    const {accountError, accountData, fetchGetMyAccount} = useAccount();

    const navigate = useNavigate();

    useEffect(() => {
        fetchGetMyAccount();
    },[])

    useEffect(() => {
        accountError != null && navigate('/login');
        }, [accountError]);

    return <>
        <div className={styles.account_container}>
            <LayoutHeader>
                <div className={styles.items_container}>
                    <div>
                        <h1 className={styles.main_title}>Ваш аккаунт</h1>
                        <p className={styles.desc}>Ваш аккаунт полностью готов к работе, вы можете смело заказывать билеты!</p>
                    </div>
                    <div className={styles.divider}/>

                    <div className={styles.user_info_container}>
                        <div className={styles.user_info_header}>
                            <div className={styles.icon_inform}>
                                <FaRegUser size={25} />
                            </div>
                            <div>
                                <h3 className={styles.title}>Информация о вас</h3>
                                <p className={styles.desc}>Снизу отображена более детальная информация о вас и об оформленных билетах.</p>
                            </div>
                        </div>

                        <div className={styles.user_info_flex_container}>
                            <div className={styles.information_container}>
                                <div className={styles.left_container}>
                                    <div className={styles.flex_container}>
                                        <FaRegUserCircle size={15}/>
                                        <p>Фио</p>
                                    </div>

                                    <div className={styles.flex_container}>
                                        <AiOutlineMail size={15}/>
                                        <p>Email</p>
                                    </div>
                                    <div className={styles.flex_container}>
                                        <FaPassport size={15}/>
                                        <p>Серия и номер</p>
                                    </div>
                                    <div className={styles.flex_container}>
                                        <FaBirthdayCake size={15}/>
                                        <p>День рождения</p>
                                    </div>
                                    <div className={styles.flex_container}>
                                        <FaRubleSign size={15}/>
                                        <p>Баланс</p>
                                    </div>
                                </div>
                                <div className={styles.right_container}>
                                    <p>{accountData?.name}</p>
                                    <p>{accountData?.email}</p>
                                    <p>{accountData?.passportNumber}</p>
                                    <p>{accountData?.dob}</p>
                                    <p>{accountData?.balance} руб.</p>
                                </div>
                            </div>

                            <div className={styles.users_tickets_container}>
                                {
                                    accountData?.tickets?.map((ticket) => {
                                        return <TicketInfo item={ticket} />
                                    })
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </LayoutHeader>
        </div>
    </>
}