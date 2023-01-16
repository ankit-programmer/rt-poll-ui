import React from 'react';
import { useGetPollsQuery } from '../../services/poll';
import ViewPoll from '../ViewPoll/ViewPoll';
import styles from './PollList.module.css';

const PollList = () => {
    const { data, error, isLoading } = useGetPollsQuery("");

    return (<>
       
                <div className={styles.PollContainer}>

                    {
                        data?.map(({ id }) => <ViewPoll key={id} id={id}></ViewPoll>)
                    }
                </div>

    </>);
}

export default PollList;