import React from 'react'
import styles from './PollPreview.module.css';
import { Poll } from '../../services/types';

type PollPreviewProps = {
    poll?: Poll
}

// Read-only preview of a poll : shows the question and options without voting.
const PollPreview = (props: PollPreviewProps) => {
    const poll = props?.poll;
    if (!poll) return <></>;
    return (
        <div className={styles.PreviewContainer}>
            <div className={styles.Question}>{poll?.title}</div>
            <div>
                {poll?.options?.map((option, i) => (
                    <div className={styles.Option} key={option?.id || i}>{option?.text}</div>
                ))}
            </div>
        </div>
    )
}

export default PollPreview;
