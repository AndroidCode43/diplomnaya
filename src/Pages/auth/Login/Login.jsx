import {LayoutHeader} from "../../../components/LayoutHeader/LayoutHeader";
import styles from "./Login.module.scss";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../stores/auth";
import {notification} from "antd";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
    const navigate = useNavigate();

    const {fetchAuthLogin, authError, isLoggedIn, clearError} = useAuth();
    
    const role = Cookies.get('role');
    const token = Cookies.get('token');

    useEffect(() => {
        clearError();
    
        if(role && token){
            navigate('/account');
        }
    },[]);

    useEffect(() => {
        authError != null && notification.error({message: 'Ошибка!', description: authError, duration: 5});
    },[authError]);

    useEffect(() => {
        isLoggedIn && window.location.reload(true);
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
                            <p className={styles.desc}>Для входа в личный кабинет необходимо ввести логи и пароль в ниже указанных полях.</p>
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
                            <p className={styles.desc_create_acc}>Ещё не завели аккаунт? <span onClick={() => navigate('/registration')}>Создайте его</span></p>
                        </div>
                    </form>
                </div>

            </div>
        </LayoutHeader>
    </>
}