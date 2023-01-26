import React, { useReducer, useState } from 'react'
import styles from './Report.module.css'
import { CircularProgress, IconButton, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetPollByIdQuery } from '../../services/poll';
import { Auth, Option, Poll } from '../../services/types';
import CloseIcon from '@mui/icons-material/Close';
import { StyledEngineProvider } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ShareButton from '../ShareButton/ShareButton';

type PollReport = {
    id?: string,// Poll Id,
    options?: Option[]
}
const Report = (params: any) => {
    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const { token, uid } = useSelector((state: any) => state.auth) as Auth;
    const [isCoppied, setCopied] = useState(false);
    const PollChart = dynamic(() => import("../PollChart/PollChart"), {
        loading: () => null
    })
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

        <>
            <div className={styles.ReportContainer}>

                <div className={styles.ChartContainer}>
                    {
                        error ? (<>Something Went Wrong</>) : isLoading ? (
                            <StyledEngineProvider injectFirst>

                                <CircularProgress style={{
                                    flex: 1,
                                    alignSelf: 'center',
                                    justifySelf: 'center'
                                }}></CircularProgress>
                            </StyledEngineProvider>

                        ) : (

                            (false && (data?.owner != uid)) ? <>You are not authorized to view report.</> :
                                <>
                                    <h3 style={{
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold'
                                    }}>{data?.title}</h3>
                                    <br></br>
                                    <br></br>
                                    <PollChart {...params}></PollChart>
                                    {/* <Bar style={{ display: "inline" }} className={styles.PieChart} width={50} height={50} data={
                                        {
                                            labels: pollReport.options?.map((option, index) => (option?.text && option?.text.length <= 16) ? option?.text : `Option ${index+1}`),
                                            datasets: [
                                                {
                                                    label: pollReport?.id,
                                                    data: pollReport?.options?.map(option => option.count),
                                                    backgroundColor: ["#488f31", "red", "#332FD0", "#FF78F0", "#FF8B13", "#A31ACB", "pink", "#f8bd8c"]

                                                }
                                            ],

                                        }} /> */}

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
                                                            backgroundColor: ["green", "red", "blue", "pink", "#332FD0", "#39B5E0", "#A31ACB"]

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
                        <ShareButton poll={data as Poll}></ShareButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report