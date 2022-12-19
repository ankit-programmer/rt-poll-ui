import React, { useEffect, useRef, useState } from 'react'
import styles from './ViewPoll.module.css';
import { useGetPollByIdQuery } from '../../services/poll';
import { BiImageAdd } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import { BsPlus, BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../services/user';
const ViewPoll = (params: any) => {
    const { data, error, isLoading } = useGetPollByIdQuery(params?.id);
    const question = "Who will you vote for? ";
    const options = ["Narendra Modi", "Rahul", "Kejriwal", "None"];
    fetch("https://s3.ap-south-1.amazonaws.com/walkover.things-of-brand.assets/05bb5640c50d9dc4e0d43b083e114a9e",{mode: "no-cors"}).then(res=>res.text()).then(value=>console.log(value))
    return (
        <div className='w-full h-screen text-center'>
            <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>

                <form className={styles.PollContainer}>
                    <div> {error ? (<>Something Went Wrong</>) : isLoading ? (<>Loading</>) : data ? (<>

                        <div className={styles.QuestionContainer}>

                            <div className={styles.QuestionIcon}>Q</div>
                            <div className={styles.QuestionText}>{data?.title || question}</div>
                            {/* <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input> */}

                        </div>
                        <div className={styles.Divider}></div>
                        <div className={styles.OptionContainer}>
                            {
                                data ?
                                    data?.options?.map((option, i) => (
                                        <div className={styles.Option} key={i}>
                                            <div className={styles.OptionIcon}>

                                                <BiImageAdd size="4em"></BiImageAdd>
                                            </div>
                                            <div className={styles.OptionText}>{option.text}
                                                {i == 0 ? <GiAchievement size="1.5em" color='green'></GiAchievement> : ""}
                                            </div>
                                            <div className={styles.OptionStat}>100% </div>
                                        </div>

                                    )) : <>Loading</>
                            }


                        </div>
                    </>) : null}</div>
                    {/* <button className={styles.ActionButton}>Save and Share</button> */}
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
export default ViewPoll;

