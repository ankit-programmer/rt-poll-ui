import React from 'react';
import { useGetPollsQuery } from '../../services/poll';
import ViewPoll from '../ViewPoll/ViewPoll';
import styles from './PollList.module.css';

const PollList = () => {
    const { data, error, isLoading } = useGetPollsQuery("");

    return (<>
        <div className={styles.PollContainer}>
            {
                data?.length ? <>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </> : <></>
            }
            {
                data?.map(({ id }) => <ViewPoll key={id} id={id}></ViewPoll>)
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