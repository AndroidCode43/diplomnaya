import styles from "./Registration.module.scss";
import { LayoutHeader } from "../../../components/LayoutHeader/LayoutHeader";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../stores/auth";
import { DatePicker } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { convertDateY } from "../../../utils/utils";

export const Registration = () => {

    const navigate = useNavigate();
    const { fetchRegister, isLoggedIn } = useAuth();

    useEffect(() => {
        isLoggedIn && Navigate('/account')
    }, [isLoggedIn]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        passportNumber: '',
        dob: ''
    });

    const updateValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const updateDob = (e) => {
        return e != null ? setValues({ ...values, 'dob': convertDateY(e) })
            : setValues({ ...values, 'dob': '' });
    }

    const onSubmit = () => {
        window.event.preventDefault();
        fetchRegister(values);
    }

    useEffect(() => {
        console.log(values);
    },[values]);

    return (
        <>
            <LayoutHeader>
                <div className={styles.login_container}>

                    <div className={styles.login_auth_container}>

                        <form className={styles.auth_container} onSubmit={() => onSubmit()}>

                            <div className={styles.login_hello_container}>
                                <h1 className={styles.title}>Регистрация</h1>
                                <p className={styles.desc}>Для регистрации в системе необходимо заполнить следующие поля.</p>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>ФИО</p>
                                <div>
                                    <input placeholder='Введите ФИО' name='name' onChange={(e) => updateValues(e)} />
                                </div>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>Email</p>
                                <div>
                                    <input placeholder='Введите email' name='email' onChange={(e) => updateValues(e)} />
                                </div>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>Пароль</p>
                                <div>
                                    <input placeholder='Введите пароль' type='password' name='password' onChange={(e) => updateValues(e)} />
                                </div>
                            </div>

                            <div className={styles.custom_input}>
                                <p className={styles.title}>Серия и номер паспорта</p>
                                <div>
                                    <input placeholder='Серия и номер' maxLength={10} name='passportNumber' onChange={(e) => updateValues(e)} />
                                </div>
                            </div>

                            <div className={styles.dob_container}>
                                <p className={styles.title}>Дата рождения: </p>
                                <DatePicker placeholder={'дата'} name="dob" onChange={(e) => updateDob(e)} style={{background: 'transparent', borderColor: '#b4b4b4', borderRadius: '1rem'}}/>
                            </div>

                            <div>
                                <button>Зарегистрироваться</button>
                                <p className={styles.desc_create_acc}>Уже есть аккаунт? <span onClick={() => navigate('/login')}>Авторизоваться</span></p>
                            </div>
                        </form>
                    </div>

                </div>
            </LayoutHeader>
        </>
    );
}