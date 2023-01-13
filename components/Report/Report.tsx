
import React, { useReducer, useState } from 'react'
import { Chart, ArcElement, plugins, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Report.module.css'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
// Chart.register(Title);
Chart.register(Tooltip);
Chart.register(Legend);
import { Doughnut, Bar } from 'react-chartjs-2'
import { useGetVoteByIdQuery } from '../../services/vote';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetPollByIdQuery } from '../../services/poll';
import { Auth, Option } from '../../services/types';
import PollReport from '../../pages/report/[id]';
type PollReport = {
    id?: string,// Poll Id,
    options?: Option[]
}
const Report = (params: any) => {
    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const vote = useGetVoteByIdQuery(params?.id);
    const defaultReport: PollReport = {};
    const [pollReport, setReport] = useState(defaultReport);
    const { token, uid } = useSelector((state: any) => state.auth) as Auth;

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
        <div className='w-full h-screen text-center'>
            <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>
                <>
                    <div className={styles.ReportContainer}>
                        {
                            error ? (<>Something Went Wrong</>) : isLoading ? (<CircularProgress></CircularProgress>) : (

                                (data?.owner != uid) ? <>You are not authorized to view report.</> :
                                    <>
                                        <h2>{data?.title}</h2>
                                        {/* <Bar style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
                                            {
                                                labels: pollReport.options?.map(option => option?.text),
                                                datasets: [
                                                    {
                                                        label: pollReport?.id,
                                                        data: pollReport?.options?.map(option => option.count),
                                                        backgroundColor: ["green", "red", "blue", "pink"]

                                                    }
                                                ],

                                            }} /> */}
                                        <br />
                                        <br />
                                        <br />
                                        <Doughnut style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
                                            {
                                                labels: pollReport.options?.map(option => option?.text),
                                                datasets: [
                                                    {
                                                        label: pollReport?.id,
                                                        data: pollReport?.options?.map(option => option.count),
                                                        backgroundColor: ["green", "red", "blue", "pink"]

                                                    }
                                                ],


                                            }} />
                                        <br />
                                        <br />
                                        <br />
                                    </>
                            )
                        }
                    </div>


                </>

            </div></div>
    )
}

export default Report