import React, { useEffect, useRef, useState } from 'react'
import styles from './CreatePoll.module.css';
import { BiImageAdd } from 'react-icons/bi';
const CreatePoll = () => {
  let placeholders = ["Who will you vote for?", "Who will win this T20 World Cup?", "Where should we go for vacation?"];
  let [placeholder, setPlaceholder] = useState("");
  const quesRef: any = useRef(null);
  useEffect(() => {
    if (quesRef.current) {
      quesRef?.current?.focus();
    }
    (async () => {
      while (placeholders.length) {
        let ph = placeholders.shift();
        placeholders.push(ph || "");
        let sent = "";
        let words = ph?.split(" ") || [];
        for (const word of words) {
          sent += `${word} `;
          setPlaceholder(sent);
          await dummyWait(300);
        }
        await dummyWait(5000);

      }

    })();
  }, [])
  return (
    <div className='w-full h-screen text-center'>
      <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>

        <form className={styles.PollContainer}>


          <div className={styles.QuestionIcon}>Q</div>

          <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input>

          <div className={styles.OptionContainer}>
            <div className={styles.Option}>
              <div className={styles.OptionIcon}>

                <BiImageAdd size="2em"></BiImageAdd>
              </div>
              <input className={styles.OptionInput} type="text" placeholder='Option One'></input>

            </div>
            <div className={styles.Option}>
              <div className={styles.OptionIcon}>

                <BiImageAdd size="2em"></BiImageAdd>
              </div>
              <input className={styles.OptionInput} type="text" placeholder='Option Two'></input>

            </div>
            <div className={styles.Option}>
              <div className={styles.OptionIcon}>

                <BiImageAdd size="2em"></BiImageAdd>
              </div>
              <input className={styles.OptionInput} type="text" placeholder='Option Three'></input>

            </div>
            <div className={styles.Option}>
              <div className={styles.OptionIcon}>

                <BiImageAdd size="2em"></BiImageAdd>
              </div>
              <input className={styles.OptionInput} type="text" placeholder='Option Four'></input>

            </div>

          </div>
          <button className={styles.ActionButton}>Save and Share</button>
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
export default CreatePoll
