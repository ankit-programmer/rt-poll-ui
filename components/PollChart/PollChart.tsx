import React, { useEffect, useReducer, useState } from 'react'
import { Chart, ArcElement, plugins, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './PollChart.module.css'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Title);
Chart.register(Tooltip);
// Chart.register(Legend);
import { Bar } from 'react-chartjs-2'
import { useGetVoteByIdQuery } from '../../services/vote';
import { Auth, Option } from '../../services/types';
import { useGetPollByIdQuery } from '../../services/poll';
type PollReport = {
    id?: string,// Poll Id,
    options?: Option[]
}
const PollChart = (params: any) => {
    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const vote = useGetVoteByIdQuery(params?.id);
    const defaultReport: PollReport = {};
    const [pollReport, setReport] = useState(defaultReport);

    useEffect(() => {
        setReport({
            id: data?.id,
            options: data?.options?.map(option => {
                const text = option.text;
                const count = vote?.data?.options[option?.id]?.count || 0;
                return {
                    text,
                    count
                }
            })
        })
    }, [vote?.data, data]);
    return (
        <>
            <Bar style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
                {
                    labels: pollReport.options?.map((option, index) => (option?.text && option?.text.length <= 16) ? option?.text : `Option ${index + 1}`),
                    datasets: [
                        {
                            label: pollReport?.id,
                            data: pollReport?.options?.map(option => option.count),
                            backgroundColor: ["#488f31", "red", "#332FD0", "#FF78F0", "#FF8B13", "#A31ACB", "pink", "#f8bd8c"]

                        }
                    ],

                }} />
        </>
    )
}

export default PollChart;