import { HiOutlineCheckCircle,HiCurrencyDollar } from "react-icons/hi";
import "./EconomyComponent.scss";

export const EconomyComponent = (props) => {
    return (
        <div>
            <div className="create_economy_container">
                <div className="create_economy_items_container">
                    <h3 className="create_economy_title">Economy</h3>
                    <div className="create_economy_options">
                        <div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Seat choice</p>
                            </div>
                            <div className="create_economy_option_item">
                                <HiCurrencyDollar />
                                <p>Cancellation</p>
                            </div>
                        </div>
                        <div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Charges</p>
                            </div>
                            <div className="create_economy_option_item">
                                <HiOutlineCheckCircle />
                                <p>Personal item</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="create_economy_price_container">
                        <p className="create_economy_price">${props.price}</p>
                        <p className="create_economy_price_desc">${props.price} for 1 traveler</p>
                    </div>
                </div>
            </div>
        </div>
    );
}