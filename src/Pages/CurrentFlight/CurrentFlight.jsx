import styles from "./CurrentFlight.module.scss";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import { CreateFlightPreview } from "../../components/CreateFlightPreviewComponent/CreateFlightPreview";
import { ConfigProvider, notification, Timeline } from "antd";
import { EconomyComponent } from "../../components/EconomyComponent/EconomyComponent";
import { PremiumComponent } from "../../components/PremiumComponent/PremiumComponent";
import { FirstComponent } from "../../components/FirstComponent/FirstComponent";
import { useFlights } from "../../stores/flights";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertDateAndTime } from "../../utils/utils";
import { useTickets } from "../../stores/tickets";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const CurrentFlight = () => {

    const { flightId } = useParams();
    const { currentFlight, fetchGetFlightById } = useFlights();
    const { selectClassTicket, fetchBuyTicket, errCreateTicket } = useTickets();

    useEffect(() => {
        fetchGetFlightById(flightId);
    }, []);

    useEffect(() => {
        errCreateTicket != null && notification.error({ message: 'Ошибка!', description: errCreateTicket, duration: 5 });
    }, [errCreateTicket]);

    if (currentFlight == null) {
        return <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <LoadingComponent />
        </div>
    }

    const { fromCity, flightTime, arrivalTime, flightDate, intoCity,
        priceEconomy, priceBusiness, pricePremium } = currentFlight;

    const clickBuyTicketBtn = () => {
        if (selectClassTicket == null || selectClassTicket.type == null) {
            return notification.error({ message: 'Необходимо выбрать класс билета!', duration: 5 });
        }
        fetchBuyTicket(selectClassTicket.type, currentFlight.id);
    }

    return <>
        <LayoutHeader>
            <div className={styles.current_flight_container}>
                <div>
                    <CreateFlightPreview item={currentFlight} />

                    <div className={styles.timeline_container}>
                        <ConfigProvider theme={{
                            token: {
                                fontSize: 18
                            }
                        }}>
                            <Timeline
                                mode='alternate'
                                items={[
                                    {
                                        children: `${fromCity}`
                                    },
                                    {
                                        children: `Вылет в ${flightTime}`,
                                        color: 'gray'
                                    },
                                    {
                                        children: `Полёт: ${arrivalTime} минут`,
                                        color: 'black'
                                    },
                                    {
                                        children: `Прилёт в ${convertDateAndTime(flightDate, flightTime, arrivalTime)[1]}`,
                                        color: 'gray'
                                    },
                                    {
                                        children: `${intoCity}`
                                    },
                                ]}
                            />
                        </ConfigProvider>
                    </div>
                </div>

                <div className={styles.current_flight_class_sections}>
                    <EconomyComponent price={priceEconomy} />
                    <PremiumComponent price={priceBusiness} />
                    <FirstComponent price={pricePremium} />
                    <button className={styles.buy_ticket_btn} onClick={() => clickBuyTicketBtn()}>Купить билет за {selectClassTicket?.price}₽</button>
                </div>
            </div>
        </LayoutHeader>
    </>
}