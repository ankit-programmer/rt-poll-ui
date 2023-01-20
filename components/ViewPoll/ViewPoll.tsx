import React, { useEffect, useRef, useState } from 'react'
import styles from './ViewPoll.module.css';
import { useGetPollByIdQuery } from '../../services/poll';
import { useGetVoteByIdQuery, useAddVoteMutation } from '../../services/vote';
import { BiImageAdd, BiShare } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import event from '../../app/analytics';
import { getReportLink } from '../../utility';
import Image from 'next/image';
import { useRouter } from 'next/router';
const ViewPoll = (params: any) => {
    const router = useRouter();
    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const vote = useGetVoteByIdQuery(params?.id);
    const winner = getWinner(vote?.data?.options);
    const [addVote, voteStatus] = useAddVoteMutation();
    useEffect(() => {
        if (voteStatus?.isSuccess) {
            event.voteAdded(voteStatus?.originalArgs?.pollId, voteStatus?.originalArgs?.optionId);
        }
    }, [voteStatus.data])
    useEffect(() => {
        event.viewPoll(params?.id)
    }, []);
    return (
        <>
            {
                error ? (<>Something Went Wrong</>) : isLoading ? (<CircularProgress></CircularProgress>) : data ? (
                    <>
                        <form className={styles.PollContainer}>
                            <div className={styles.InfoButton}>
                                <Tooltip onClick={() => {
                                    router.push(getReportLink(params?.id));
                                }} title="Share">
                                    <IconButton >
                                        <BiShare size='1.5rem' style={{
                                            transform: 'scaleX(-1)'
                                        }} />
                                    </IconButton>
                                </Tooltip>

                            </div>
                            <div className={styles.QuestionContainer}>

                                <div className={styles.QuestionIcon}>Q</div>
                                <div className={styles.QuestionText}>{data?.title}</div>
                                {/* <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input> */}
                            </div>
                            <div className={styles.Divider}></div>
                            <div className={styles.OptionContainer}>
                                {

                                    data?.options?.map((option, i) => (
                                        <div onClick={() => {
                                            event.addVote(vote?.data?.pollId || "", option?.id);
                                            addVote({
                                                pollId: vote.data?.pollId,
                                                optionId: option.id
                                            })
                                        }} className={`${styles.Option} ${(option?.id == vote?.data?.selected) ? styles.Selected : ""}`} key={i}>

                                            <div className={styles.OptionIcon}>
                                                {option?.image ? <Image style={{
                                                    borderRadius: '8px'
                                                }} height={100} width={100} src={option?.image || ""} alt={''}></Image> :
                                                    <BiImageAdd style={{
                                                        opacity: "15%"
                                                    }} size="4em"></BiImageAdd>}
                                            </div>
                                            <div className={styles.OptionText}>{option.text}
                                                {option?.id == winner ? <GiAchievement size="1.5em" color='green'></GiAchievement> : ""}
                                            </div>
                                            <div className={styles.OptionStat}>{
                                                (((voteStatus.isLoading && (voteStatus.originalArgs?.optionId == option?.id)) || vote.isLoading) ? <CircularProgress size={'1em'}></CircularProgress> : getOptionCountView(vote, option?.id))
                                            } </div>
                                        </div>

                                    ))
                                }

                            </div>
                            {/* <IconButton onClick={() => {
                                    navigator.clipboard.writeText(getPollLink(params?.id))
                                }}>

                                    <ContentCopyIcon color='primary'></ContentCopyIcon>
                                </IconButton> */}


                            <div className={styles.TotalCount}>Total Votes : {vote?.data?.total}</div>
                            <div className={styles.BadgeContainer}>

                                <Tooltip title="Anonymous Vote: No one will be able to identify the option you voted for!">
                                    <IconButton>
                                        <AdminPanelSettingsOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Only signed in user can vote on this poll.">
                                    <IconButton>
                                        <LockOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="This poll is open for voting for limited time.">
                                    <IconButton>
                                        <AlarmOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                        </form>
                    </>
                ) : (<CircularProgress></CircularProgress>)

            }

        </>

    )

}

function dummyWait(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(true);
        }, time);
    })
}

function getOptionCountView(vote: any, optionId: string) {
    const options = vote?.data?.options;
    const optionCount = parseInt(options[optionId]?.count);
    if (vote?.total < 1000) return optionCount;
    const counts = Object.values(options)?.map((option: any) => parseInt(option?.count) as number)
    const maxCount = Math.max(...counts);
    if (maxCount < 1000) return optionCount;
    return `${((optionCount / parseInt(vote?.data?.total)) * 100).toFixed(1)}%`

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

export default ViewPoll;

