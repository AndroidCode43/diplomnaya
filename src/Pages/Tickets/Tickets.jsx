import styles from "./Tickets.module.scss";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import { useTickets } from "../../stores/tickets";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { TicketInfo } from "../../components/TicketInfo/TicketInfo";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { DatePicker, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { MdFlightTakeoff } from "react-icons/md";
import { useDebounce } from "../../hooks/debounce";

export const Tickets = () => {

    const { fetchGetAllTickets, fetchGetTicketsByParams, isLoading, tickets, clearError } = useTickets((state) => ({
        fetchGetAllTickets: state.fetchGetAllTickets,
        isLoading: state.isLoading,
        tickets: state.tickets,
        fetchGetTicketsByParams: state.fetchGetTicketsByParams,
    }), shallow);

    useEffect(() => {
        fetchGetAllTickets();
    }, []);

    const [searchValues, setSearchValues] = useState({
        userName: '',
        flightName: '',
        flightDate: ''
    });

    const debounce = useDebounce(searchValues);

    const updateValues = (e) => setSearchValues({...searchValues, [e.target.name]: e.target.value});
    const updateFlightDate = (e) => {
        return e != null ? setSearchValues({...searchValues, 'flightDate': e.$d.toLocaleDateString()}) : setSearchValues({...searchValues, 'flightDate': ''})
    };

    useEffect(() => {
        fetchGetTicketsByParams(debounce.userName, debounce.flightName, debounce.flightDate);
    },[debounce]);

    return <>
        <LayoutHeader>
            <div className={styles.tikets_container}>
                
                <div className={styles.tickets_header}>
                    <h1>Оформленные билеты</h1>
                    <p>На данной странице доступен просмотр всех оформленных билетов!</p>
                </div>

                <div className={styles.result_tickets}>
                    <h3>Поиск билета по фильтрам</h3>
                    <div className={styles.filters_container}>
                        <div className={styles.filter_container}>
                            <Input prefix={<UserOutlined />} placeholder="Поиск по ФИО" style={{ width: 'fit-content' }} name="userName" onChange={(e) => updateValues(e)}/>
                            <Input prefix={<MdFlightTakeoff />} placeholder="Название рейса" style={{ width: 'fit-content' }} name="flightName" onChange={(e) => updateValues(e)}/>
                            <DatePicker placeholder="Дата вылета" name="flightDate" onChange={(e) => updateFlightDate(e)}/>
                        </div>
                        <p>Найдено билетов: {tickets?.length}</p>
                    </div>
                </div>

                <div className={styles.tickets_container_view}>
                    {
                        isLoading && <LoadingComponent />
                    }
                    {
                        tickets?.map((item) => {
                            return <TicketInfo item={item} key={item.id}/>
                        })
                    }
                </div>
            </div>
        </LayoutHeader>
    </>
}