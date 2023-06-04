import moment from "moment";
import 'moment/dist/locale/ru';

export const parseError = (e) => {
    const messages = JSON.parse(e.request.response).message;
    if(Array.isArray(messages)){
        return messages.join(' ');
    }
    return messages;
}

export const convertDateAndTime = (date, flightTime, min) => {
    moment.locale('ru');
    const mas = moment(`${date}T${flightTime}`).add(min,'minutes')
        .format('YYYY-MM-DD, HH:mm:ss').split(',');
    mas[0] = convertDate(mas[0]);
    return mas;
}

export const convertDate = (date) => {
    moment.locale('ru');
    return moment(date).format('MMM Do');
}

export const convertDateChart = (date) => {
    moment.locale('ru');
    return moment(date).format('Do MMM');
}

export const convertDobDate = (date) => {
    moment.locale('ru');
    return moment(date).format('Do MMMM YYYY');
}

export const convertSeatType = (seatType) =>
    seatType === 'E' ? 'Эконом' : (seatType === 'B') ? 'Бизнес' : (seatType === 'F') ? 'Первый' : 'Неизвестен';

export const convertDateToLocal = (date) => {
    moment.locale('ru');
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}