import styles from "./CurrentFlight.module.scss";
import { LayoutHeader } from "../../components/LayoutHeader/LayoutHeader";
import { CreateFlightPreview } from "../../components/CreateFlightPreviewComponent/CreateFlightPreview";
import { Button, ConfigProvider, notification, Timeline } from "antd";
import { EconomyComponent } from "../../components/EconomyComponent/EconomyComponent";
import { PremiumComponent } from "../../components/PremiumComponent/PremiumComponent";
import { FirstComponent } from "../../components/FirstComponent/FirstComponent";
import { useFlights } from "../../stores/flights";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertDateAndTime } from "../../utils/utils";
import { useTickets } from "../../stores/tickets";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { shallow } from "zustand/shallow";

export const CurrentFlight = () => {

    const { flightId } = useParams();
    const { currentFlight, fetchGetFlightById } = useFlights((state) => ({
        currentFlight: state.currentFlight,
        fetchGetFlightById: state.fetchGetFlightById,
    }), shallow);
    
    const { selectClassTicket, fetchBuyTicket, isLoading } = useTickets((state) => ({
        selectClassTicket: state.selectClassTicket,
        fetchBuyTicket: state.fetchBuyTicket,
        isLoading: state.isLoading
    }), shallow);

    useEffect(() => {
        fetchGetFlightById(flightId);
    }, []);

    if (currentFlight == null) {
        return <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <LoadingComponent />
        </div>
    }

    const { fromCity, flightTime, arrivalTime, flightDate, intoCity,
        priceEconomy, priceBusiness, pricePremium,
        seatsEconomy, seatsBusiness, seatsPremium } = currentFlight;

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
                    <EconomyComponent price={priceEconomy} available={seatsEconomy}/>
                    <PremiumComponent price={priceBusiness} available={seatsBusiness}/>
                    <FirstComponent price={pricePremium} available={seatsPremium}/>
                    <Button className={styles.buy_ticket_btn} loading={isLoading} onClick={() => clickBuyTicketBtn()}>Купить билет за {selectClassTicket?.price}₽</Button>
                </div>
            </div>
        </LayoutHeader>
    </>
}