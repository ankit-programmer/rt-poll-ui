import React from 'react'
import  styles from './CreatePoll.module.css';
const CreatePoll = () => {
  return (
   <div className='w-full h-screen text-center'>
    <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center'>

        <form>
          <input  className={styles.QuestionInput} type="text" id='question' placeholder='Who will you vote for?'></input>
         <div>
         <input  className={styles.OptionInput} type="text" id='question' placeholder='Option One'></input>
          <input  className={styles.OptionInput} type="text" id='question' placeholder='Option Two'></input>
          <input  className={styles.OptionInput} type="text" id='question' placeholder='Option Three'></input>
          <input  className={styles.OptionInput} type="text" id='question' placeholder='Option Four'></input>
        
         </div>
       
         </form>
       
    </div>
   </div>
    
  )
}

export default CreatePoll
