import { CircularProgress } from '@mui/material';
import React from 'react';
import { useGetPollsQuery } from '../../services/poll';
import ViewPoll from '../ViewPoll/ViewPoll';
import styles from './PollList.module.css';

const PollList = () => {
    const { data, error, isLoading, isSuccess } = useGetPollsQuery("");

    return (isSuccess ? <>
        {
            data?.length ? <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </> : <><p>You haven&apos;t created any poll yet!</p></>
        }
        <div className={styles.PollContainer}>
            {
                data?.map(({ id }) => <div key={id} style={{
                    minHeight: '50vh',
                    width: '95vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}><ViewPoll id={id}></ViewPoll></div>)
            }
            {
                data?.length ? <>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </> : <></>
            }
        </div>

    </> : <CircularProgress></CircularProgress>);
}

export default PollList;