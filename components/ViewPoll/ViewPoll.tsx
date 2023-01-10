import React, { useEffect, useRef, useState } from 'react'
import styles from './ViewPoll.module.css';
import { useGetPollByIdQuery } from '../../services/poll';
import { useGetVoteByIdQuery, useAddVoteMutation } from '../../services/vote';
import { BiImageAdd } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
const ViewPoll = (params: any) => {

    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const vote = useGetVoteByIdQuery(params?.id);
    const winner = getWinner(vote?.data?.options);
    const [addVote, status] = useAddVoteMutation();

    return (
        <div className='w-full h-screen text-center'>
            <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>

                <form className={styles.PollContainer}>
                    <div> {error ? (<>Something Went Wrong</>) : isLoading ? (<>Loading</>) : data ? (<>

                        <div className={styles.QuestionContainer}>

                            <div className={styles.QuestionIcon}>Q</div>
                            <div className={styles.QuestionText}>{data?.title}</div>
                            {/* <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input> */}

                        </div>
                        <div className={styles.Divider}></div>
                        <div className={styles.OptionContainer}>
                            {
                                data ?
                                    data?.options?.map((option, i) => (
                                        <div onClick={() => {
                                            addVote({
                                                pollId: vote.data?.pollId,
                                                optionId: option.id
                                            })
                                        }} className={`${styles.Option} ${(option?.id == vote?.data?.selected) ? styles.Selected : ""}`} key={i}>

                                            <div className={styles.OptionIcon}>

                                                <BiImageAdd size="4em"></BiImageAdd>
                                            </div>
                                            <div className={styles.OptionText}>{option.text}
                                                {option?.id == winner ? <GiAchievement size="1.5em" color='green'></GiAchievement> : ""}
                                            </div>
                                            <div className={styles.OptionStat}>{vote?.data?.options[option.id]?.count} </div>
                                        </div>

                                    )) : <>Loading</>
                            }


                        </div>
                    </>) : null}</div>
                    {/* <button className={styles.ActionButton}>Save and Share</button> */}
                    <IconButton onClick={() => {
                        navigator.clipboard.writeText(getPollLink(params?.id))
                    }}>

                        <ContentCopyIcon color='primary'></ContentCopyIcon>
                    </IconButton>
                </form>

            </div>
        </div>

    )

}

function dummyWait(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(true);
        }, time);
    })
}

function getWinner(options: any) {
    if (!options) return null;
    const keys = Object.keys(options);
    keys.sort((a: any, b: any) => {
        a = options[a];
        b = options[b];
        return a?.count - b?.count;
    });
    return keys.pop();
}
function getPollLink(pollId?: string) {
    return `https://rtpoll.com/poll/${pollId}`;
}
export default ViewPoll;

