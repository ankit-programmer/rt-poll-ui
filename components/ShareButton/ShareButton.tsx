import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './ShareButton.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getPollLink } from '../../utility';
import { MdOutlineMail } from 'react-icons/md';
import { MdOutlineMessage } from 'react-icons/md';
import { BiShare } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import analytics from '../../app/analytics';
import { Poll } from '../../services/types';
const ShareButton = ({ poll, method, opacity }: { poll: Poll, method?: string[], opacity?: any }) => {
    const [isCoppied, setCopied] = useState(false);
    const items = new Set(method || ['wa', 'mail', 'copy', 'other', 'sms']);
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
    return (<>
        <div className={styles.ShareButtonContainer} style={{ opacity: opacity }}>
            {items.has('wa') ? <IconButton onClick={() => {
                analytics.sharePoll(poll?.id, 'wa');
                window.open(`https://wa.me?text=${poll?.title}%0a${poll?.options?.map((value: any, index) => `${index + 1}: ${value?.text}\n`).join("%0a")}%0a%0aClick here to vote:%0a${getPollLink(poll?.id)}`, "_blank");
            }}>
                <BsWhatsapp color='green' size='1.7rem' />

            </IconButton> : <></>}
            {items.has('mail') ? <IconButton onClick={() => {
                analytics.sharePoll(poll?.id, 'mail');
                window.open(`mailto:?subject=${poll?.title}&body=${poll?.options?.map((value: any, index) => `${index + 1}: ${value?.text}\n`).join("\n%0a")}%0a%0aClick here to vote:\n%0a${getPollLink(poll?.id)}`)
            }}>


                <MdOutlineMail color='#0085FF' size='2rem' />

            </IconButton> : <></>}
            {items?.has('sms') ? <IconButton onClick={() => {
                analytics.sharePoll(poll?.id, 'sms');
                if (navigator.userAgent.match(/Android/i)) {

                    window.open(`sms:?body=${poll?.title}%0a${poll?.options?.map((value: any, index) => `${index + 1}: ${value?.text}\n`).join("%0a")}%0a%0aClick here to vote:%0a${getPollLink(poll?.id)}`, '_blank')

                }
                if (navigator.userAgent.match(/iPhone/i)) {

                    window.open(`sms:&body=${poll?.title}%0a${poll?.options?.map((value: any, index) => `${index + 1}: ${value?.text}\n`).join("%0a")}%0a%0aClick here to vote:%0a${getPollLink(poll?.id)}`, '_blank')

                }
            }}>
                <MdOutlineMessage color='#E18989' size='1.85rem' />
            </IconButton> : <></>}

            {items?.has('copy') ? <IconButton onClick={() => {
                analytics.sharePoll(poll?.id, "copy");
                navigator.clipboard.writeText(getShareMessage(poll));
                setCopied(true);
            }}>
                <ContentCopyIcon color='primary' />
            </IconButton> : <></>}

            {items.has('other') ? <IconButton onClick={() => {
                analytics.sharePoll(poll?.id, 'other');
                if (navigator.share) {
                    navigator.share({
                        title: poll?.title,
                        text: getShareMessage(poll, false),
                        url: getPollLink(poll?.id),
                    })
                        .then(() => console.log('Successful share'))
                        .catch((error) => console.log('Error sharing', error));
                }
            }}>
                <BiShare size='2rem' style={{
                    transform: 'scaleX(-1)'
                }} />
            </IconButton> : <></>}
        </div>
        <Snackbar
            open={isCoppied}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Coppied to clipboard!"
            action={action}
        />
    </>)
}

function getShareMessage(poll: Poll, link: boolean = true) {
    let message = `${poll?.title}\n`;
    poll?.options?.forEach((option, index) => {
        message = message.concat(`\n${index + 1} : ${option?.text}`);
    })
    message = message.concat(`\n\nYou can share your opinion here : \n${link ? getPollLink(poll?.id) : ""}`);

    return message;
}
export default ShareButton;
