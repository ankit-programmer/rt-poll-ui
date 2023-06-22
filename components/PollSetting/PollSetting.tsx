import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import styles from './PollSetting.module.css';
import { Divider, Tooltip } from '@mui/material';
import { PollSetting } from '../../services/types';
// import Snackbar from '@mui/material/Snackbar';
const ACTIONS = {
    CHANGE_PRIVACY: 'change-privacy',
    SET_COMMENT: 'set-comment',
    SET_ANONYMOUS: 'set-anonymous',
    REPLACE_SETTING: 'replace-setting'
}
function reducer(setting: PollSetting, action: { type: string, payload: any }) {
    switch (action.type) {
        case ACTIONS.CHANGE_PRIVACY:

            return {
                ...setting,
                privacy: action.payload
            }

        case ACTIONS.SET_COMMENT:

            return {
                ...setting,
                comment: !setting.comment
            }

        case ACTIONS.SET_ANONYMOUS:
            return {
                ...setting,
                anonymous: !setting.anonymous
            }
        case ACTIONS.REPLACE_SETTING:
            return action.payload;
        default:
            return setting;
    }
}
type PollSettingProps = {
    handleChange: (setting: PollSetting) => void,
    data?: PollSetting
}
const PollSetting = (props: PollSettingProps) => {
    const [setting, dispatch] = React.useReducer(reducer, props?.data);
    useEffect(() => {
        dispatch({ type: ACTIONS.REPLACE_SETTING, payload: props?.data })
    }, [props?.data])
    useEffect(() => {
        if (props.handleChange) {
            props.handleChange(setting);
        }
    }, [setting]);
    return (
        <div className={styles.SettingContainer}>
            <div>
                <div className={styles.SettingName}>Who Can Vote?</div>
                <RadioGroup value={setting.privacy} onChange={(event, value) => {
                    dispatch({ type: ACTIONS.CHANGE_PRIVACY, payload: value });
                }} row>
                    <Tooltip title="Anyone with link can vote.">
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                    </Tooltip>
                    <Tooltip title="Only authenticated users can vote.">

                        <FormControlLabel value="authenticated" control={<Radio />} label="Signed-in" />
                    </Tooltip>
                    <Tooltip title="Only invited users can vote.">
                        <FormControlLabel value="invite" control={<Radio />} label="Invite Only" />
                    </Tooltip>
                </RadioGroup>
            </div>
            <div>
                <div className={styles.SettingName}>Other</div>
                <Tooltip title="Once activated, the voting results will be anonymous.">

                    <FormControlLabel control={<Switch checked={setting.anonymous} onChange={(event, checked) => {
                        dispatch({ type: ACTIONS.SET_ANONYMOUS, payload: checked })
                    }} />} label="Anonymous" />
                </Tooltip>
                <Tooltip title="Allow users to leave comments.">

                    <FormControlLabel control={<Switch checked={setting.comment} onChange={(event, checked) => {
                        dispatch({ type: ACTIONS.SET_COMMENT, payload: checked })
                    }} />} label="Allow Comment" />
                </Tooltip>

            </div>
        </div>

    )

}


export default PollSetting;

