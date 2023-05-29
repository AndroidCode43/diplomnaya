import {LayoutHeader} from "../../../components/LayoutHeader/LayoutHeader";
import styles from "./Login.module.scss";
import authIcon from "../../../assets/auth_icon.png";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../stores/auth";
import {notification} from "antd";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const {fetchAuthLogin, authError, isLoggedIn} = useAuth();

    useEffect(() => {
        authError != null && notification.error({message: 'Ошибка!', description: authError, duration: 5});
    },[authError]);

    useEffect(() => {
        isLoggedIn && navigate('/account')
    }, [isLoggedIn]);

    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const updateValues = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const onSubmit = () => {
        window.event.preventDefault();
        fetchAuthLogin(value);
    }

    return <>
        <LayoutHeader>
            <div className={styles.login_container}>

                <div className={styles.login_auth_container}>

                    <form className={styles.auth_container} onSubmit={() => onSubmit()}>

                        <div className={styles.login_hello_container}>
                            <h1 className={styles.title}>Вход в аккаунт</h1>
                            <p className={styles.desc}>Для входа в личный аккаунт необходимо ввести логи и пароль в ниже указанных полях.</p>
                        </div>

                        <div className={styles.custom_input}>
                            <p className={styles.title}>Email</p>
                            <div>
                                <input placeholder='Введите email' name='email' onChange={(e) => updateValues(e)}/>
                            </div>
                        </div>

                        <div className={styles.custom_input}>
                            <p className={styles.title}>Пароль</p>
                            <div>
                                <input placeholder='Введите пароль' type='password' name='password' onChange={(e) => updateValues(e)}/>
                            </div>
                        </div>

                        <div>
                            <button>Войти</button>
                            <p className={styles.desc_create_acc}>Ещё не завели аккаунт? <span>Создайте его</span></p>
                        </div>
                    </form>
                </div>

                <div className={styles.icon_container}>
                    <img src={authIcon}/>
                </div>
            </div>
        </LayoutHeader>
    </>
}