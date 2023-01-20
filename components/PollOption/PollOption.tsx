import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './PollOption.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useAddNewPollMutation } from '../../services/poll';
import { Option, Poll } from '../../services/types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { textAlign, width } from '@mui/system';
import { Button } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import analytics from '../../app/analytics';
import ImageUpload from '../ImageUpload/ImageUpload';
import Image from 'next/image';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
type PollOptionProp = {
    handleChange: (option: Option) => void,
    handleDelete: any,
    option: Option,
    id: string | number
}
const PollOption = (props: PollOptionProp) => {
    const { handleChange, handleDelete, option, id } = props;
    const [imagePopup, setImagePopup] = useState(false);
    function handleOptionChange(event: any) {
        const value = event?.target?.value;
        option.text = value || "";
        handleChange(option);
    }
    function handleImageChange(imageUrl: string) {
        option.image = imageUrl;
        handleChange(option);
    }

    return (
        <>
            <ErrorBoundary>

                {imagePopup ? <ImageUpload onClose={(files: any) => {
                    console.log("Files", files);

                    const file = files.pop();
                    if (file) handleImageChange(file?.downloadUrl);
                    setImagePopup(false);
                }}></ImageUpload> : null}
            </ErrorBoundary>
            <div className={styles.Option}>
                <div onClick={() => {
                    analytics.addOptionImage();
                    setImagePopup(true);
                }} className={styles.OptionIcon}>
                    {
                        option?.image ?
                            <Image style={{
                                borderRadius: '8px'
                            }} height={100} width={100} src={option.image || ""} alt={''}></Image> :
                            <BiImageAdd style={{
                                opacity: "15%"
                            }} size="4em"></BiImageAdd>
                    }

                </div>
                <input className={styles.OptionInput} type="text" onChange={handleOptionChange} value={option.text} placeholder='Option One'></input>

                <Tooltip onClick={handleDelete} title="Delete">
                    <IconButton >
                        <MdDeleteOutline className={styles.OptionActionButton} size="1.2em" />

                    </IconButton>
                </Tooltip>

            </div>
        </>
    )
}
export const AddOption = (props: any) => {
    return (
        <>
            <StyledEngineProvider injectFirst>

                <Button {...props} className={styles.Option}>
                    <div style={{
                        flex: 1
                    }}>
                        <BsPlusCircleDotted style={{
                            display: 'inline',
                            opacity: '50%'
                        }} size="3em"></BsPlusCircleDotted>

                    </div>

                </Button>
            </StyledEngineProvider>
        </>
    )
}

export default PollOption
