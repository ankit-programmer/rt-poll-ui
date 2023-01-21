import React from 'react';
import { useGetPollsQuery } from '../../services/poll';
import ViewPoll from '../ViewPoll/ViewPoll';
import styles from './PollList.module.css';

const PollList = () => {
    const { data, error, isLoading } = useGetPollsQuery("");

    return (<>
        {
            data?.length ? <>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </> : <></>
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

    </>);
}

export default PollList;