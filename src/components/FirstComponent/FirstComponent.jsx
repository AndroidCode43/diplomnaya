import styles from "./FirstComponent.module.scss";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { useTickets } from "../../stores/tickets";

export const FirstComponent = (props) => {

    const { setClassTicket } = useTickets();

    return <>
        <div className={styles.create_first_container} onClick={() => setClassTicket('F', props.price)}>
            <div className={styles.create_first_items_container}>
                <h3 className={styles.create_first_title}>Первый-класс</h3>
                <p className={styles.create_first_desc}>Кабина первого-класса</p>
                <div className={styles.create_first_options}>
                    <div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Автоматический выбор места</p>
                        </div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Бесплатная отмена билета</p>
                        </div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Всё что входит в эконом и бизнес</p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Зарядная станция</p>
                        </div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Персональный приборы</p>
                        </div>
                        <div className={styles.create_first_option_item}>
                            <HiOutlineCheckCircle />
                            <p>Бесплатная еда</p>
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className={styles.create_first_price_container}>
                        <p className={styles.create_first_price}>{props.price}₽</p>
                        <p className={styles.create_first_price_desc}>{props.price}₽ за 1 билет</p>
                    </div>

                    <div>
                        <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Доступно: <span style={{ fontWeight: '400' }}>{props.available} мест</span></p>
                    </div>
                </div>

            </div>
        </div>
    </>
}