
import React from 'react'
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
import { Doughnut } from 'react-chartjs-2'
const Report = () => {
    return (
        <>
            <div>Report</div>
            <Doughnut data={
                {
                    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [30, 36, 15, 18],
                            backgroundColor: ["red", "green", "blue", "pink"]

                        }
                    ]
                }} />
        </>
    )
}

export default Report