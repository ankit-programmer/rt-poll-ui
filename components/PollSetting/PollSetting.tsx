import React, { useEffect, useRef, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styles from './PollSetting.module.css';
import { Divider, Tooltip } from '@mui/material';
import { PollSetting } from '../../services/types';
// import Snackbar from '@mui/material/Snackbar';
const ACTIONS = {
    CHANGE_PRIVACY: 'change-privacy',
    REPLACE_SETTING: 'replace-setting'
}
function reducer(setting: PollSetting, action: { type: string, payload: any }) {
    switch (action.type) {
        case ACTIONS.CHANGE_PRIVACY:

            return {
                ...setting,
                privacy: action.payload
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
const radioSx = { '&.Mui-checked': { color: '#5651e5' } };
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
                        <FormControlLabel value="public" control={<Radio sx={radioSx} />} label="Public" />
                    </Tooltip>
                    <Tooltip title="Only authenticated users can vote.">

                        <FormControlLabel value="authenticated" control={<Radio sx={radioSx} />} label="Signed-in" />
                    </Tooltip>
                    <Tooltip title="Only invited users can vote.">
                        <FormControlLabel value="invite" control={<Radio sx={radioSx} />} label="Invite Only" />
                    </Tooltip>
                </RadioGroup>
            </div>
        </div>

    )

}


export default PollSetting;

