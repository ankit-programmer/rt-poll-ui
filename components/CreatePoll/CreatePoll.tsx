import React, { useEffect, useState } from 'react'
import styles from './CreatePoll.module.css';
const CreatePoll = () => {
  let placeholders = ["Who will you vote for?", "Who will win this T20 World Cup?", "Where should we go for vocation?"];
  let [placeholder, setPlaceholder] = useState("");
  useEffect(() => {
    (async () => {
      while(placeholders.length){
        let ph = placeholders.shift();
        placeholders.push(ph || "");
        let sent = "";
        let words = ph?.split(" ") || [];
        for(const word of words){
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
          
          <input className={styles.QuestionInput} type="text" id='question' placeholder={placeholder}></input>
      
          <div className={styles.OptionContainer}>
            <input className={styles.OptionInput} type="text" id='question' placeholder='Option One'></input>
            <input className={styles.OptionInput} type="text" id='question' placeholder='Option Two'></input>
            <input className={styles.OptionInput} type="text" id='question' placeholder='Option Three'></input>
            <input className={styles.OptionInput} type="text" id='question' placeholder='Option Four'></input>

          </div>

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
