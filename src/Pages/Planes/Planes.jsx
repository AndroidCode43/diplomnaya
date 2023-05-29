import { LayoutHeader } from '../../components/LayoutHeader/LayoutHeader';
import { NavLeft } from '../../components/NavLeft/NavLeft';
import styles from './Planes.module.scss';
import { MdOutlineAirplaneTicket } from "react-icons/md";
import {usePlanes} from "../../stores/plane";
import {useEffect, useState} from "react";
import {notification} from "antd";


//УДАЛИТЬ REDUX И REACT-QUERY

export const Planes = () => {

    const {loading, error, msg, planes, fetchPlanes, fetchCreatePlane, fetchDeletePlanet} = usePlanes();

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

    const onSubmitBtn = async () => {
        window.event.preventDefault()
        fetchCreatePlane(createPlane);
    }

    const deletePlaneBtn = (id) => {
        fetchDeletePlanet(id);
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    {
        error != null && notification.error({message: 'Произошла ошибка!', description: error, duration: 2});
    }

    return <>
        <div className={styles.planes_container}>
            <NavLeft />

            <LayoutHeader>
                <div className={styles.planes_items_container}>

                    <div className={styles.planes_create_container}>
                        <h3 className={styles.title}>Самолёты</h3>
                        <p className={styles.desc}>Тут отображаются созданные самолёты.</p>

                        <div className={styles.planes_view_container}>
                            {/* переделать в компонент юзер, а не самолёт */}
                            {/* <ItemPlaneComponent/> */}

                            <table>
                                <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Вместимоть</th>
                                        <th>Описание</th>
                                        <th>Возможности</th>
                                    </tr>
                                </thead>

                                {
                                    planes.map((item) => {
                                        return(
                                            <tr>
                                                <td className={styles.name_plane}>{item.name}</td>
                                                <td>{item.numbOfSeats}</td>
                                                <td className={styles.table_desc}>{item.description}</td>
                                                <td className={styles.table_future_container}>
                                                    <button onClick={() => deletePlaneBtn(item.id)}>Удаление</button>
                                                    <button>Редактирование</button>
                                                </td>
                                            </tr>
                                            )
                                    })
                                }

                            </table>

                        </div>

                    </div>

                    <form className={styles.planes_create_container} onSubmit={() => onSubmitBtn()}>
                        <h3 className={styles.title}>Добавление самолёта</h3>
                        <p className={styles.desc}>В данном окне вы можете добавить новый самолёт в базу.</p>

                        <div className={styles.inputs_container}>
                            <div className={styles.input}>
                                <p className={styles.title}>Название самолёта</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите название' name='name' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>

                            <div className={styles.input}>
                                <p className={styles.title}>Описание самолёта</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите описание (не обязательно)' name='description' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>

                            <div className={styles.input}>
                                <p className={styles.title}>Кол-во кресел в самолёте</p>
                                <div>
                                    <MdOutlineAirplaneTicket className={styles.icon} />
                                    <input placeholder='Введите количество' name='numbOfSeats' type='number' onChange={(e) => updateValues(e)}/>
                                </div>
                            </div>
                        </div>

                        <button className={styles.btn_add}>Добавить самолёт</button>
                    </form>

                </div>
            </LayoutHeader>

        </div>
    </>
}