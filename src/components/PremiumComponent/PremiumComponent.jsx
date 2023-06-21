import { HiOutlineCheckCircle } from "react-icons/hi";
import "./PremiumComponent.scss";
import { useTickets } from "../../stores/tickets";

export const PremiumComponent = (props) => {

    const { setClassTicket } = useTickets();

    return (
        <>
            <div className="create_premium_container" onClick={() => setClassTicket('B', props.price)}>
                <div className="create_premium_items_container">
                    <h3 className="create_premium_title">Бизнес-класс</h3>
                    <p className="create_premium_desc">Кабина бизнес-класса</p>
                    <div>
                        <div className="create_premium_options">
                            <div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Автоматический выбор места</p>
                                </div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Бесплатная отмена билета</p>
                                </div>
                            </div>
                            <div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Зарядная станция</p>
                                </div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Персональный приборы</p>
                                </div>
                            </div>
                        </div>
                        <div className="create_premium_includes">
                            <div className="create_premium_left">
                                <p>Ручная кладь:</p>
                                <p>1-я зарегистрированная сумка:</p>
                                <p>2-я зарегистрированная сумка::</p>
                            </div>
                            <div className="create_premium_right">
                                <p>Включено</p>
                                <p>до 15 кг</p>
                                <p>до 10 кг</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="create_premium_price_container">
                            <p className="create_premium_price">{props.price}₽</p>
                            <p className="create_premium_price_desc">{props.price}₽ за 1 пассажира</p>
                        </div>

                        <div>
                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Доступно: <span style={{ fontWeight: '400' }}>{props.available} мест</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}