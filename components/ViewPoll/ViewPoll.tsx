import React, { useEffect, useRef, useState } from 'react'
import styles from './ViewPoll.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useGetPollByIdQuery, useLazyGetPollByIdQuery } from '../../services/poll';
import { useAddVoteMutation, useLazyGetVoteByIdQuery } from '../../services/vote';
import { BiImageAdd, BiShare } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import event from '../../app/analytics';
import { getPollLink, getReportLink } from '../../utility';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Poll } from '../../services/types';
// import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
// import ShareButton from '../ShareButton/ShareButton';
import dynamic from 'next/dynamic';
// import Snackbar from '@mui/material/Snackbar';
const ViewPoll = (params: any) => {
    const [currentAction, setAction] = useState("share");
    const [messageStatus, setMessageStatus] = useState(false);
    const router = useRouter();
    const { token, isAnonymous, uid } = useSelector((state: any) => state.auth) as any;
    const defaultPoll: Poll = params?.poll;
    const [selectedOption, selectOption] = useState("");
    const { data = defaultPoll, error, isLoading } = useGetPollByIdQuery(params?.id);
    const [getVote, vote] = useLazyGetVoteByIdQuery();
    const winner = getWinner(vote?.data?.options);
    const imagePoll = isImagePoll(data);
    const [addVote, voteStatus] = useAddVoteMutation();
    useEffect(() => {
        async function showMessage() {
            await dummyWait(5000);
            if (vote?.isSuccess && !vote?.data?.selected) {
                setMessageStatus(true);
            }
        }
        showMessage();
        selectOption("");
    }, [vote]);
    useEffect(() => {
        if (token && selectedOption) {
            addVote({
                pollId: params?.id,
                optionId: selectedOption
            })
        }
    }, [token, selectedOption]);
    useEffect(() => {
        if (token) {

            getVote(params?.id);
        }
    }, [token]);
    useEffect(() => {
        if (voteStatus?.isSuccess) {
            event.voteAdded(uid, voteStatus?.originalArgs?.pollId, voteStatus?.originalArgs?.optionId);
        }
        if (!vote?.data?.selected && voteStatus?.isError && isAnonymous) {
            setAction("login");
            router.push(`/auth?message="You need to login in order to vote!"&redirect=${getPollLink(params?.id)}`)
        }
    }, [voteStatus])
    // useEffect(() => {
    //     if (params?.id) {

    //         getPoll(params?.id);
    //         event.viewPoll(params?.id)
    //     }
    // }, []);
    const ShareButton = dynamic(() => import('../ShareButton/ShareButton'), {
        loading: () => null
    });
    const Snackbar = dynamic(() => import('@mui/material/Snackbar'), {
        loading: () => null
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageStatus(false);
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
            {
                data ? (
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
                            <div className={`${styles.OptionContainer} ${data?.options?.some((option => option?.text?.length >= 50)) ? styles.LongOptionContainer : ''}`}>
                                {

                                    data?.options?.map((option, i) => (
                                        <div onClick={() => {
                                            event.addVote(uid, vote?.data?.pollId || "", option?.id);
                                            if (!vote?.data?.selected) {

                                                selectOption(option?.id);
                                            }
                                        }} className={`${styles.Option} ${((option?.id == vote?.data?.selected) || (option?.id == selectedOption)) ? styles.Selected : ""}`} key={i}>

                                            {imagePoll ? <div className={styles.OptionIcon}>
                                                {option?.image ? <Image style={{
                                                    borderRadius: '8px'
                                                }} height={100} width={100} src={option?.image || ""} alt={''}></Image> :
                                                    <BiImageAdd style={{
                                                        opacity: "15%"
                                                    }} size="4em"></BiImageAdd>}
                                            </div> : <></>}
                                            <div className={styles.OptionText}><span>{option.text}
                                                {option?.id == winner ? <GiAchievement style={{
                                                    display: 'inline'
                                                }} display={"inline"} size="1.5em" color='green'></GiAchievement> : ""}</span>
                                            </div>
                                            <div className={styles.OptionStat}>{
                                                (((voteStatus.isLoading && (voteStatus.originalArgs?.optionId == option?.id)) || vote.isLoading) ? <CircularProgress size={'1em'}></CircularProgress> : (vote?.isSuccess ? getOptionCountView(vote, option?.id) : ""))
                                            } </div>
                                        </div>

                                    ))
                                }

                            </div>
                            <div className={`${styles.TotalCount} ${vote?.data?.total ? null : styles.HiddenTotalCount}`}>Total Votes : {vote?.data?.total}</div>
                            <div className={styles.BadgeContainer}>
                                {(currentAction == "share") ? <ShareButton opacity={"50%"} poll={data}></ShareButton> : <></>}
                            </div>

                        </form>
                    </>
                ) : (<CircularProgress></CircularProgress>)

            }
            <Snackbar
                open={messageStatus}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Click on an Option to Vote."
                action={action}
            />
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

function isImagePoll(poll: Poll) {
    if (!poll) return false;
    const options = poll?.options;
    return options.some((option) => !!option?.image);
}

export default ViewPoll;

