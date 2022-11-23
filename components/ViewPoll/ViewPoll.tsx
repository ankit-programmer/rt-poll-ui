import React, { useEffect, useRef, useState } from 'react'
import styles from './ViewPoll.module.css';

import { BiImageAdd } from 'react-icons/bi';
import { GiAchievement } from 'react-icons/gi';
import { BsPlus, BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
const ViewPoll = () => {
    const question = "Who will you vote for? ";
    const options = ["Narendra Modi", "Rahul", "Kejriwal", "None"];

    return (
        <div className='w-full h-screen text-center'>
            <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>

                <form className={styles.PollContainer}>

                    <div className={styles.QuestionContainer}>

                    <div className={styles.QuestionIcon}>Q</div>
                    <div className={styles.QuestionText}>{question}</div>
                    {/* <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input> */}

                    </div>
                    <div className={styles.Divider}></div>
                    <div className={styles.OptionContainer}>
                        {
                            options.map((option, i) => (
                                <div className={styles.Option}>
                                    <div className={styles.OptionIcon}>
                                        
                                        <BiImageAdd size="4em"></BiImageAdd>
                                    </div>
                                    <div className={styles.OptionText}>{option}
                                        {i == 0 ? <GiAchievement size="1.5em" color='green'></GiAchievement> : ""}
                                    </div>
                                    <div className={styles.OptionStat}>100% </div>
                                </div>

                            ))
                        }


                    </div>
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

