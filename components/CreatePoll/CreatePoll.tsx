import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './CreatePoll.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { BsPlus, BsPlusCircle, BsPlusCircleDotted } from 'react-icons/bs';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useAddNewPollMutation } from '../../services/poll';
import { Option, Poll } from '../../services/types';
import { CircularProgress } from '@mui/material';

const ACTIONS = {
  ADD_OPTION: 'add-option',
  REMOVE_OPTION: 'remove-option',
  CHANGE_OPTION: 'change-option'
}

function reducer(options: Option[], action: any): Option[] {
  console.log(action);
  switch (action.type) {
    case ACTIONS.ADD_OPTION:
      {
        if (options.length >= 8) return options;
        return [...options, { text: "" }];
        break;
      }
    case ACTIONS.REMOVE_OPTION:
      {
        const index = action?.payload?.index;
        if (options.length <= 2) return options;
        const opt = [...options];
        opt.splice(index, 1);
        return opt;
        break;
      }
    case ACTIONS.CHANGE_OPTION:
      {
        const index = action?.payload?.index;
        const text = action?.payload?.text
        const opt = [...options]
        opt[index] = { text };
        return opt;
        break;
      }

    default:
      return options;
      break;
  }


}
const CreatePoll = () => {
  let placeholders = ["Who will you vote for?", "Who will win FIFA WC 2022?", "Who will win this T20 World Cup?", "Where should we go for vacation?"];
  let [placeholder, setPlaceholder] = useState("");
  const [options, dispatch] = useReducer(reducer, [{ text: "" }, { text: "" }] as Option[]);
  const [addPoll, { isLoading }] = useAddNewPollMutation();
  // const [options, setOption] = useState([{}, {}, {}, {}]);
  function addOption(text: string, index: number) {
    dispatch({ type: ACTIONS.CHANGE_OPTION, payload: { text, index } });
  }
  const quesRef: any = useRef(null);

  function deleteOption(index: number) {
    dispatch({ type: ACTIONS.REMOVE_OPTION, payload: { index } })

  }

  function addNewOption() {
    dispatch({ type: ACTIONS.ADD_OPTION })
  }

  function handleSubmit(event: any) {
    event?.preventDefault();
    console.log("Clicked");
    // Check if all the required inputs are provided
    console.log(quesRef?.current?.value);
    console.log(options);
    addPoll({ title: quesRef?.current?.value, options });
  }
  function handleOptionChange(event: any) {
    addOption(event?.target?.value, parseInt(event?.target?.id));
  }
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
        {/* {true ? <CircularProgress className={styles.Progress}></CircularProgress> : <></>} */}
        <form className={styles.PollContainer} autoComplete="off">


          <div className={styles.QuestionIcon}>Q</div>

          <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input>

          <div className={styles.OptionContainer}>
            {
              options.map((option: any, i) => (
                <div key={i} className={styles.Option}>
                  <div className={styles.OptionIcon}>

                    <BiImageAdd size="4em"></BiImageAdd>
                  </div>
                  <input className={styles.OptionInput} type="text" onChange={handleOptionChange} id={`${i}`} value={option.text} placeholder='Option One'></input>
                  <div className={styles.ActionContainer}>
                    <MdDeleteOutline className={styles.OptionActionButton} size="1.7em" onClick={() => deleteOption(i)} />
                    <MdAdd color="green" className={styles.OptionActionButton} size="1.7em" onClick={addNewOption} />
                  </div>
                </div>
              ))
            }


          </div>
          <button className={styles.ActionButton} onClick={handleSubmit}>
            {isLoading ? <CircularProgress size="2rem"></CircularProgress> : "Save and Share"}</button>

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
