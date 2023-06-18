import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import styles from "./People.module.scss";
import { UserItem } from "../../components/UserItem/UserItem";
import { useUsers } from "../../stores/users";
import { shallow } from "zustand/shallow";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";
import { DatePicker, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { CiPassport1 } from "react-icons/ci";
import { useDebounce } from "../../hooks/debounce";
import { convertDateY } from "../../utils/utils";

export const People = () => {

    const { users, fetchGeAllUsers, fetchGetUserByParams, isLoading } = useUsers((state) => ({
        users: state.users,
        fetchGeAllUsers: state.fetchGeAllUsers,
        fetchGetUserByParams: state.fetchGetUserByParams,
        isLoading: state.isLoading,
    }), shallow);

    const [searchValues, setSearchValues] = useState({
        name: '',
        passport: '',
        dob: ''
    });

    const updateValues = (e) => setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
    const updateDob = (e) => {
        return e != null ? setSearchValues({ ...searchValues, 'dob': convertDateY(e) })
            : setSearchValues({ ...searchValues, 'dob': '' });
    };

    const debounce = useDebounce(searchValues);

    useEffect(() => {
        fetchGeAllUsers();
    }, []);

    useEffect(() => {
        console.log(debounce);
        fetchGetUserByParams(debounce.name, debounce.passport, debounce.dob);
    }, [debounce]);

    return <>
        <LayoutHeader>

            <div className={styles.people_container}>
                <div className={styles.tickets_header}>
                    <h1>Список пользователей</h1>
                    <p>На данной странице доступен просмотр всех пользователей!</p>
                </div>

                <div className={styles.result_tickets}>
                    <h3>Поиск пользователя по параметрам</h3>
                    <div className={styles.filters_container}>
                        <div className={styles.filter_container}>
                            <Input prefix={<UserOutlined />} placeholder="Поиск по ФИО" style={{ width: 'fit-content' }} name="name" onChange={(e) => updateValues(e)} />
                            <Input prefix={<CiPassport1 />} placeholder="Номер паспорта" style={{ width: 'fit-content' }} name="passport" onChange={(e) => updateValues(e)} />
                            <DatePicker placeholder="Дата рождения" name="flightDate" onChange={(e) => updateDob(e)}/>
                        </div>
                        <p>Найдено {users?.length} пользователей</p>
                    </div>
                </div>

                <div className={styles.users_container}>
                    {
                        isLoading ? <LoadingComponent /> : users?.map((item) => {
                            return <UserItem item={item} key={item.id}/>
                        })
                    }
                </div>
            </div>

        </LayoutHeader>
    </>
}