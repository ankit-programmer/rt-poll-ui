
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useGetVoteByIdQuery } from '../../services/vote';
import { Button, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetPollByIdQuery } from '../../services/poll';
import { Auth, Option } from '../../services/types';
import PollReport from '../../pages/report/[id]';
import CloseIcon from '@mui/icons-material/Close';
import { getPollLink } from '../../utility';
import { MdOutlineMail } from 'react-icons/md';
import { MdOutlineMessage } from 'react-icons/md';
import { BiShare } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';


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
    const [isCoppied, setCopied] = useState(false);
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

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopied(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    return (
        <div className='w-full h-screen text-center'>
            <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center'>
                <>
                    <div className={styles.ReportContainer}>

                        <div className={styles.ChartContainer}>
                            {
                                error ? (<>Something Went Wrong</>) : isLoading ? (<CircularProgress></CircularProgress>) : (

                                    (data?.owner != uid) ? <>You are not authorized to view report.</> :
                                        <>
                                            <h3 style={{
                                                fontSize: '1.8rem',
                                                fontWeight: 'bold'
                                            }}>{data?.title}</h3>
                                            <br></br>
                                            <br></br>
                                            <Bar style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
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
                                            {/* <Doughnut style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
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
                                        </>
                                )
                            }
                        </div>

                        <div className={styles.ShareContainer}>
                            <div style={{
                                textAlign: 'left'
                            }}>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}>LINK</h3>
                                <div>
                                    <span style={{
                                        opacity: '75%',
                                        fontSize: 'medium'
                                    }}>{getPollLink(params?.id)}</span>
                                    <IconButton onClick={() => {
                                        navigator.clipboard.writeText(getPollLink(params?.id));
                                        setCopied(true);
                                    }}>
                                        <ContentCopyIcon color='primary' />
                                    </IconButton>
                                    <Snackbar
                                        open={isCoppied}
                                        autoHideDuration={2000}
                                        onClose={handleClose}
                                        message="Link Copied"
                                        action={action}
                                    />
                                    <br />
                                    <br></br>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold'
                                    }}>SHARE</h3>
                                    <div style={{
                                        paddingBlock: '8px',
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        <IconButton>
                                            <BsWhatsapp href={`whatsapp://send?text=${data?.title}`} target="_blank" color='green' size='1.7rem' />
                                        </IconButton>
                                        <IconButton>
                                            <MdOutlineMail color='#0085FF' size='2rem' />
                                        </IconButton>
                                        <IconButton>
                                            <MdOutlineMessage color='#E18989' size='1.9rem' />
                                        </IconButton>
                                        <IconButton>
                                            <BiShare onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: data?.title,
                                                        text: data?.options?.map((value: any, index) => `${index + 1}: ${value?.text}\n`).join("\n"),
                                                        url: getPollLink(params?.id),
                                                    })
                                                        .then(() => console.log('Successful share'))
                                                        .catch((error) => console.log('Error sharing', error));
                                                } else {
                                                    console.log('Share not supported on this browser, do it the old way.');
                                                }
                                            }} size='2rem' style={{
                                                transform: 'scaleX(-1)'
                                            }} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            </div></div>
    )
}

export default Report