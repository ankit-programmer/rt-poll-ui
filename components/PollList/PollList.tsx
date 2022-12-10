import React from 'react';
import { useGetPollsQuery } from '../../services/poll';
import ViewPoll from '../ViewPoll/ViewPoll';

const PollList = () => {
    const { data, error, isLoading } = useGetPollsQuery("");

    return (<>
        {
            data?.map(({ id }) => <ViewPoll id={id}></ViewPoll>)
        }
    </>);
}

export default PollList;