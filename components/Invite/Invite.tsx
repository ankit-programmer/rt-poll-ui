import React, { useState } from 'react';
import { Button, Chip, CircularProgress, TextField, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './Invite.module.css';
import { useAddInvitesMutation, useDeleteInviteMutation, useGetInvitesQuery } from '../../services/invite';
import { Invite } from '../../services/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_COLOR = {
    pending: 'default',
    sent: 'primary',
    voted: 'success'
} as const;

const STATUS_LEGEND: { key: keyof typeof STATUS_COLOR, label: string, dot: string }[] = [
    { key: 'pending', label: 'Pending', dot: '#98a2b3' },
    { key: 'sent', label: 'Sent', dot: 'var(--brand)' },
    { key: 'voted', label: 'Voted', dot: 'var(--success)' },
];

type InviteProps = {
    pollId: string
}

const InviteUsers = (props: InviteProps) => {
    const [emails, setEmails] = useState([] as string[]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const { data: invites, isLoading } = useGetInvitesQuery(props?.pollId, { skip: !props?.pollId });
    const [addInvites, addStatus] = useAddInvitesMutation();
    const [deleteInvite] = useDeleteInviteMutation();

    const addEmails = (value: string) => {
        if (!value) return;
        const parts = value.split(',').map(part => part.trim()).filter(part => part.length);
        const invalid = parts.filter(part => !EMAIL_REGEX.test(part));
        if (invalid.length) {
            setError(`Invalid email : ${invalid.join(', ')}`);
            return;
        }
        setError('');
        setEmails((prevEmails) => Array.from(new Set([...prevEmails, ...parts])));
        setInputValue('');
    };

    const handleInputKeyDown = (event: any) => {
        if ((event.key === 'Enter' || event.key === ',') && inputValue) {
            event.preventDefault();
            addEmails(inputValue);
        }
    };

    const handleChipDelete = (email: string) => {
        setEmails((prevEmails) => prevEmails.filter((item) => item !== email));
    };

    const handleSend = async () => {
        let pendingEmails = emails;
        // Include whatever is still typed in the input box.
        if (inputValue) {
            const parts = inputValue.split(',').map(part => part.trim()).filter(part => part.length);
            if (parts.some(part => !EMAIL_REGEX.test(part))) {
                setError(`Invalid email : ${parts.filter(part => !EMAIL_REGEX.test(part)).join(', ')}`);
                return;
            }
            pendingEmails = Array.from(new Set([...emails, ...parts]));
        }
        if (!pendingEmails.length) {
            setError('Please add at least one email.');
            return;
        }
        setError('');
        const result: any = await addInvites({ pollId: props?.pollId, emails: pendingEmails });
        if (result?.error) {
            setError(result?.error?.data?.message || 'Failed to send invites. Please try again.');
        } else {
            setEmails([]);
            setInputValue('');
        }
    };

    const invitedList = invites || [];

    return (
        <div className={styles.Invite}>
            <div className={styles.Label}>Invite by email</div>

            <div className={styles.Field}>
                <TextField
                    placeholder="name@example.com — press Enter to add more"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    onBlur={() => addEmails(inputValue)}
                    error={!!error}
                    helperText={error || ' '}
                    fullWidth
                />

                {emails.length ? (
                    <div className={styles.Chips}>
                        {emails.map((email) => (
                            <Chip
                                key={email}
                                label={email}
                                onDelete={() => handleChipDelete(email)}
                                color="primary"
                                size="small"
                            />
                        ))}
                    </div>
                ) : null}

                <div className={styles.SendRow}>
                    <Button
                        variant="contained"
                        disableElevation
                        className={styles.SendButton}
                        endIcon={addStatus?.isLoading ? <CircularProgress size={'1em'} color='inherit' /> : <SendIcon />}
                        disabled={addStatus?.isLoading || (!emails.length && !inputValue)}
                        onClick={handleSend}
                    >
                        Send Invites
                    </Button>
                </div>
            </div>

            <hr className={styles.Divider} />

            <div className={styles.InvitedHeader}>
                <div className={styles.Label} style={{ marginBottom: 0 }}>Invited</div>
                {invitedList.length ? <span className={styles.Count}>{invitedList.length}</span> : null}
            </div>

            {isLoading ? (
                <CircularProgress size={'1.5em'} />
            ) : invitedList.length ? (
                <>
                    <div className={styles.Chips}>
                        {invitedList.map((invite: Invite) => (
                            <Tooltip key={invite?.id || invite?.email} title={invite?.status}>
                                <Chip
                                    label={invite?.email}
                                    variant="outlined"
                                    size="small"
                                    color={STATUS_COLOR[invite?.status] || 'default'}
                                    onDelete={(invite?.status !== 'voted' && invite?.id) ? () => {
                                        deleteInvite({ pollId: props?.pollId, inviteId: invite.id as string });
                                    } : undefined}
                                />
                            </Tooltip>
                        ))}
                    </div>
                    <div className={styles.Legend}>
                        {STATUS_LEGEND.map((item) => (
                            <span key={item.key} className={styles.LegendItem}>
                                <span className={styles.Dot} style={{ backgroundColor: item.dot }} />
                                {item.label}
                            </span>
                        ))}
                    </div>
                </>
            ) : (
                <div className={styles.Empty}>No one invited yet. Add emails above to get started.</div>
            )}
        </div>
    );
};

export default InviteUsers;
