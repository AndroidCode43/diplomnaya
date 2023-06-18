import { LayoutHeader } from '../../components/LayoutHeader/LayoutHeader';
import styles from './Planes.module.scss';
import { MdOutlineAirplaneTicket } from "react-icons/md";
import {usePlanes} from "../../stores/plane";
import {useEffect, useState} from "react";
import {Button, notification} from "antd";
import {PlaneItem} from "../../components/PlaneItem/PlaneItem";
import bg from "../../assets/svg_planet.svg";
import {shallow} from "zustand/shallow";

export const Planes = () => {

    const {isLoading, error, msg, planes, fetchPlanes, fetchCreatePlane} = usePlanes((state) => ({
        isLoading: state.isLoading,
        error: state.error,
        msg: state.msg,
        planes: state.planes,
        fetchPlanes: state.fetchPlanes,
        fetchCreatePlane: state.fetchCreatePlane
    }), shallow);

    const [createPlane, setCreatePlane] = useState({
        name: '',
        description: '',
        numbOfSeats: 0
    });

    const updateValues = (e) => {
        setCreatePlane({...createPlane, [e.target.name]: e.target.value});
        console.log(createPlane);
    }

    useEffect(() => {
        fetchPlanes();
    },[])

    useEffect(() => {
        error != null && notification.error({message: 'Произошла ошибка!', description: error, duration: 5});
    },[error]);

    useEffect(() => {
        msg != null && notification.success({message: msg, duration: 2});
    },[msg]);

    const onSubmitBtn = async () => {
        window.event.preventDefault();
        fetchCreatePlane(createPlane);
    }

    return <>
        <div className={styles.planes_container}>
            <LayoutHeader>
                <div className={styles.planes_items_container}>

                    <div className={styles.planes_create_container}>
                        <h3 className={styles.title}>Самолёты</h3>
                        <p className={styles.desc}>Тут отображаются созданные самолёты.</p>

                        <div className={styles.planes_view_container}>
                                {
                                    planes?.map((item) => {
                                        return <PlaneItem item={item} key={item.id}/>
                                    })
                                }
                        </div>

                    </div>

                    <form className={styles.planes_create_container} onSubmit={() => onSubmitBtn()}>
                        <h3 className={styles.title}>Добавление самолёта</h3>
                        <p className={styles.desc}>В данном окне вы можете добавить новый самолёт в базу.</p>

                        <div className={styles.inputs_container}>
                            <div className={styles.custom_input}>
                                <p className={styles.title}>Название самолёта</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите название' name='name' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>Описание самолёта</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите описание' name='description' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>Кол-во кресел в самолёте</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите количество' name='numbOfSeats' type='number' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>
                        </div>

                        <Button className={styles.btn_add} loading={isLoading} onClick={() => fetchCreatePlane(createPlane)}>Добавить самолёт</Button>
                    </form>

                </div>
            </LayoutHeader>

        </div>
    </>
}