import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './QuestionInput.module.css';


const QuestionInput = (props: any) => {
    const { question, changeHandler } = props;
    const quesRef: any = useRef(null);
    let placeholders = ["What shoud I cover in my next video?", "Who will win FIFA WC?", "Who will win this T20 World Cup?", "Where should we go for vacation?"];
    let [placeholder, setPlaceholder] = useState("");
    function handleChange(event: any) {
        const value = event?.target?.value;
        changeHandler(value);
    }
    useEffect(() => {
        if (quesRef.current) {
            quesRef?.current?.focus();
        }
        async function showPlaceholder() {
            while (placeholders?.length) {

                let ph = placeholders.shift();
                placeholders.push(ph || "");
                let sent = "";
                let words = ph?.split(" ") || [];
                for (const word of words) {
                    sent += `${word} `;
                    setPlaceholder(sent);
                    await wait(300);
                }
                await wait(5000);
            }
        }


        showPlaceholder();
    }, [])
    return (
        <>
            <div className={styles.QuestionIcon}>Q</div>

            <input onChange={handleChange} value={question} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={!question ? placeholder : ""} ></input>
        </>
    )
}

function wait(time = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(true);
        }, time);
    })
}
export default QuestionInput
