import styles from "./Dashboard.module.scss";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import { HiOutlineTicket, HiOutlinePaperAirplane, HiOutlineCurrencyDollar, HiStatusOnline, HiUserGroup } from "react-icons/hi";
import { useTickets } from "../../stores/tickets";
import { useEffect } from "react";
import { LineChart } from "../../components/LineChart/LineChart";
import { useInfo } from "../../stores/info";
import bg from "../../assets/svg_planet.svg";
import { shallow } from 'zustand/shallow';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

export const Dashboard = () => {

    const { tickets, selectTickets, fetchGetAllTickets, fetchGetTodayTickets } = useTickets();
    const { infoData, fetchGetInfo, isLoading } = useInfo((state) => ({
        infoData: state.infoData,
        fetchGetInfo: state.fetchGetInfo,
        isLoading: state.isLoading
    }), shallow);

    useEffect(() => {
        fetchGetAllTickets();
        fetchGetTodayTickets();
        fetchGetInfo();
    }, []);

    return <>
        <LayoutHeader>
            <div className={styles.dashboard_container}>

                <img src={bg} alt={'plane'} className={styles.bg_img} />

                <div className={styles.dashboard_title_container}>
                    <h1>Информационная панель</h1>
                    <div className={styles.divider} />
                </div>

                <div className={styles.statics_dashboard}>

                    {
                        isLoading ? <Spin indicator={<LoadingOutlined style={{fontSize: 40}}/>}/> :
                            <div className={styles.statics_dashboard_container}>

                                <div className={styles.statics_item_container}>
                                    <div className={styles.statics_item_header}>
                                        <HiOutlineCurrencyDollar size={20} className={styles.img} />
                                        <h3>Прибыль</h3>
                                    </div>
                                    <div className={styles.statics_item_body}>
                                        <p>{infoData?.profit}₽</p>
                                    </div>
                                </div>

                                <div className={styles.statics_item_container}>
                                    <div className={styles.statics_item_header}>
                                        <HiOutlineTicket size={20} className={styles.img} />
                                        <h3>Продано билетов</h3>
                                    </div>
                                    <div className={styles.statics_item_body}>
                                        <p>{infoData?.ticketsSold} билетов</p>
                                    </div>
                                </div>

                                <div className={styles.statics_item_container}>
                                    <div className={styles.statics_item_header}>
                                        <HiOutlinePaperAirplane size={20} className={styles.img} />
                                        <h3>Самолёты</h3>
                                    </div>
                                    <div className={styles.statics_item_body}>
                                        <p>{infoData?.countPlanes} самолёта</p>
                                    </div>
                                </div>

                                <div className={styles.statics_item_container}>
                                    <div className={styles.statics_item_header}>
                                        <HiStatusOnline size={20} className={styles.img} />
                                        <h3>Рейсы</h3>
                                    </div>
                                    <div className={styles.statics_item_body}>
                                        <p>{infoData?.countFlights} рейсов</p>
                                    </div>
                                </div>

                                <div className={styles.statics_item_container}>
                                    <div className={styles.statics_item_header}>
                                        <HiUserGroup size={20} className={styles.img} />
                                        <h3>Пользователи</h3>
                                    </div>
                                    <div className={styles.statics_item_body}>
                                        <p>{infoData?.countUsers} человек</p>
                                    </div>
                                </div>
                            </div>
                    }

                    <div>
                        <div className={styles.chart_container}>
                            <h3 className={styles.title}>Стастистика проданных билетов за всё время</h3>
                            <LineChart tickets={tickets} />
                        </div>
                        <div className={styles.chart_container}>
                            <h3 className={styles.title}>Статистика проданных билетов за сегодня</h3>
                            <LineChart tickets={selectTickets} />
                        </div>
                    </div>

                </div>
            </div>
        </LayoutHeader>
    </>
}