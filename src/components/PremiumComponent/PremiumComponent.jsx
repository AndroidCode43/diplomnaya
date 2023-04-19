import { HiOutlineCheckCircle, HiCurrencyDollar } from "react-icons/hi";
import "./PremiumComponent.scss";

export const PremiumComponent = (props) => {
    return (
        <div>
            <div className="create_premium_container">
                <div className="create_premium_items_container">
                    <h3 className="create_premium_title">Premium Economy</h3>
                    <h4 className="create_premium_desc">Cabin: Economy</h4>
                    <div>
                        <div className="create_premium_options">
                            <div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Seat choice</p>
                                </div>
                                <div className="create_premium_option_item">
                                    <HiCurrencyDollar />
                                    <p>Cancellation</p>
                                </div>
                            </div>
                            <div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Charges</p>
                                </div>
                                <div className="create_premium_option_item">
                                    <HiOutlineCheckCircle />
                                    <p>Personal item</p>
                                </div>
                            </div>
                        </div>
                        <div className="create_premium_includes">
                            <div className="create_premium_left">
                                <p>Carry-on:</p>
                                <p>1st checked bag:</p>
                                <p>2nd checked bag:</p>
                            </div>
                            <div className="create_premium_right">
                                <p>Included</p>
                                <p>$35 up to 23 kg</p>
                                <p>$45 up to 24kg</p>
                            </div>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="create_premium_price_container">
                        <p className="create_premium_price">{props.price}₽</p>
                        <p className="create_premium_price_desc">{props.price}₽ за 1 пассажира</p>
                    </div>
                </div>
            </div>
        </div>
    );
}