import { HiOutlineCheckCircle } from "react-icons/hi";
import "./EconomyComponent.scss";
import {useTickets} from "../../stores/tickets";

export const EconomyComponent = (props) => {

    const {setClassTicket} = useTickets();

    return (
        <>
            <div className="create_economy_container" onClick={() => setClassTicket('E', props.price)}>
                <div className="create_economy_items_container">
                    <h3 className="create_economy_title">Эконом-класс</h3>
                    <div className="create_economy_options">
                        <div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Автоматический выбор места</p>
                            </div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Бесплатная отмена билета</p>
                            </div>
                        </div>
                        <div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Зарядная станция</p>
                            </div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Персональный приборы</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="create_economy_price_container">
                        <p className="create_economy_price">{props.price}₽</p>
                        <p className="create_economy_price_desc">{props.price}₽ за 1 билет</p>
                    </div>
                </div>
            </div>
        </>
    );
}