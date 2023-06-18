import { Spin, notification } from "antd";
import { useUsers } from "../../stores/users";
import { convertDobDate, parseError } from "../../utils/utils";
import styles from "./UserItem.module.scss";
import { SlUser, SlTrash } from "react-icons/sl";
import { shallow } from "zustand/shallow";
import { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import yttAxios from "../../utils/axios_settings";

export const UserItem = (props) => {

    const { fetchGeAllUsers } = useUsers((state) => ({
        fetchGeAllUsers: state.fetchGeAllUsers
    }), shallow);

    const { name, email, passportNumber, dob, balance, id } = props.item;

    const [deleting, setDeleting] = useState(false);

    const fetchDeleteUser = async () => {
        setDeleting(true);
        try {
            await yttAxios.delete(`/users/delete/${id}`).then(async () => {
                fetchGeAllUsers();
            });
            setDeleting(false);
        } catch (error) {
            setDeleting(false);
            notification.error({ message: 'Ошибка при удалении', description: parseError(error), duration: 5 });
        }
    }

    return <>
        <div className={styles.user_container}>
            <div className={styles.delete_container} onClick={() => fetchDeleteUser(id)}>
                <SlTrash size={20} color="white" />
            </div>

            <SlUser size={40} />

            <div className={styles.info_container}>
                <div className={styles.name}>{name}</div>
                <div className={styles.other}>{email}</div>
                <div className={styles.other}>Номер паспорта: {passportNumber}</div>
                <div className={styles.other}>{convertDobDate(dob)}</div>
                <div className={styles.other}>Баланс: {balance}₽</div>
            </div>

            {
                deleting && <div className={styles.deleting_container}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} />} />
                </div>
            }

        </div>
    </>
}