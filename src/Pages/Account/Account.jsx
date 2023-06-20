import styles from "./Account.module.scss";
import {LayoutHeader} from "../../components/LayoutHeader/LayoutHeader";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake, FaPassport, FaRubleSign } from "react-icons/fa";
import {useAccount} from "../../stores/account";
import {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {TicketInfo} from "../../components/TicketInfo/TicketInfo";
import {IoCalendarOutline, IoCardOutline, IoLockClosedOutline} from "react-icons/io5";
import {shallow} from "zustand/shallow";
import {notification} from "antd";
import {convertDobDate} from "../../utils/utils";

export const Account = () => {

    const navigate = useNavigate();

    const {accountError, accountData, fetchGetMyAccount, fetchAddBalance,
        paymentError, paymentSuccess, clearState} = useAccount((state) => ({
        accountError: state.accountError,
        paymentError: state.paymentError,
        paymentSuccess: state.paymentSuccess,

        accountData: state.accountData,
        fetchGetMyAccount: state.fetchGetMyAccount,
        fetchAddBalance: state.fetchAddBalance,
        clearState: state.clearState
    }), shallow);

    const [values, setValues] = useState({
        cardNumber: '',
        date: '',
        cvv: '',
        amount: 0
    });

    const updateValues = (e) => setValues({...values, [e.target.name]: e.target.value});

    useEffect(() => {
        clearState();
        fetchGetMyAccount();
    },[]);

    useEffect(() => {
        // accountError != null && navigate('/login'); вывести ошибку
        }, [accountError]);

    useEffect(() => {
        paymentError != null && notification.error({message: 'Ошибка при оплате!', description: paymentError, duration: 5});
    },[paymentError]);

    useEffect(() => {
        paymentSuccess != null && notification.success({message: paymentSuccess, duration: 2});
    },[paymentSuccess]);

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
                            <div>

                                <div className={styles.information_container}>
                                    <table>
                                        <tr>
                                            <th className={styles.th_black}>
                                                <div className={styles.flex_container}>
                                                    <FaRegUserCircle size={15}/>
                                                    <p>Фио</p>
                                                </div></th>
                                            <th>{accountData?.name}</th>
                                        </tr>
                                        <tr>
                                            <th className={styles.th_black}>
                                                <div className={styles.flex_container}>
                                                    <AiOutlineMail size={15}/>
                                                    <p>Email</p>
                                                </div>
                                            </th>
                                            <th>{accountData?.email}</th>
                                        </tr>
                                        <tr>
                                            <th className={styles.th_black}>
                                                <div className={styles.flex_container}>
                                                    <FaPassport size={15}/>
                                                    <p>Серия и номер</p>
                                                </div>
                                            </th>
                                            <th>{accountData?.passportNumber}</th>
                                        </tr>
                                        <tr>
                                            <th className={styles.th_black}>
                                                <div className={styles.flex_container}>
                                                    <FaBirthdayCake size={15}/>
                                                    <p>День рождения</p>
                                                </div>
                                            </th>
                                            <th>{convertDobDate(accountData?.dob)}</th>
                                        </tr>
                                        <tr>
                                            <th className={styles.th_black}>
                                                    <div className={styles.flex_container}>
                                                        <FaRubleSign size={15}/>
                                                        <p>Баланс</p>
                                                    </div>
                                            </th>
                                            <th>{accountData?.balance}₽</th>
                                        </tr>
                                    </table>

                                </div>

                                <div className={styles.payment_card_enter_container}>

                                    <h3>Пополнение баланса</h3>

                                    <div className={styles.custom_input}>
                                        <p className={styles.title}>Номер карты</p>
                                        <div>
                                            <IoCardOutline />
                                            <input placeholder="0000 0000 0000" maxLength={10} name='cardNumber' onChange={(e) => updateValues(e)}/>
                                        </div>
                                    </div>

                                    <div className={styles.payment_card_enter_flex}>
                                        <div className={styles.custom_input}>
                                            <p className={styles.title}>Дата</p>
                                            <div className={styles.input_border}>
                                                <IoCalendarOutline />
                                                <input placeholder="00/00" maxLength={10} name='date' onChange={(e) => updateValues(e)}/>
                                            </div>
                                        </div>
                                        <div className={styles.custom_input}>
                                            <p className={styles.title}>Код</p>
                                            <div className={styles.input_border}>
                                                <IoLockClosedOutline />
                                                <input placeholder="000" maxLength={10} name='cvv' onChange={(e) => updateValues(e)}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.custom_input}>
                                        <p className={styles.title}>Пополнить баланс</p>
                                        <div>
                                            <FaRubleSign/>
                                            <input placeholder="1000 рублей" maxLength={10} name='amount' onChange={(e) => updateValues(e)}/>
                                        </div>
                                    </div>

                                    <button className={styles.add_fund_btn} onClick={() => fetchAddBalance(values)}>Пополнить</button>

                                </div>
                            </div>

                            <div className={styles.users_tickets_container}>
                                {
                                    accountData?.tickets?.map((ticket) => {
                                        return <TicketInfo item={ticket} key={ticket.id}/>
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