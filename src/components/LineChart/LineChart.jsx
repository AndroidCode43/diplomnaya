import React, {useEffect} from "react";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
} from "chart.js";
import {useTickets} from "../../stores/tickets";
import {convertDate, convertDateChart, convertDateToLocal} from "../../utils/utils";

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
);

export const LineChart = (props) => {

    const {tickets} = props;

    return <Line data={{
        labels: tickets?.map((item) => convertDateChart(item.created_at)),
        datasets:[{
            data: tickets?.map((item) => item.price),
            backgroundColor: 'transparent',
            borderColor: '#007FFE',
            tension: 0.7,

        }]
    }} options={{
        plugins:{
            legend: true
        },
        scales:{
            x:{
                grid:{
                    display: false
                }
            },
            y:{
                grid: {
                  display: false
                },
                min: 1000,
                ticks:{
                    stepSize: 10000,
                    callback: (value) => `${value}₽`
                }
            }
        }
    }} style={{width: '100%'}}/>
}