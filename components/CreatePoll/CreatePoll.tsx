import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './CreatePoll.module.css';
import { BiImageAdd } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { useAddNewPollMutation } from '../../services/poll';
import { Option, Poll } from '../../services/types';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import event from '../../app/analytics';
import PollOption, { AddOption } from '../PollOption/PollOption';
import MainActionButton from '../ActionButton/ActionButton';
import { getReportLink } from '../../utility';
import analytics from '../../app/analytics';

const ACTIONS = {
  ADD_OPTION: 'add-option',
  REMOVE_OPTION: 'remove-option',
  CHANGE_OPTION: 'change-option'
}

function reducer(options: Option[], action: any): Option[] {
  console.log(options);
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
  const router = useRouter();
  let placeholders = ["What shoud I cover in my next video?", "Who will you vote for?", "Who will win FIFA WC 2022?", "Who will win this T20 World Cup?", "Where should we go for vacation?"];
  let [placeholder, setPlaceholder] = useState("");
  const [options, dispatch] = useReducer(reducer, [{ text: "" }, { text: "" }, { text: "" }] as Option[]);

  const [addPoll, { isLoading, data, isError, isSuccess }] = useAddNewPollMutation();
  useEffect(() => {
    if (isSuccess) {
      event.pollCreated(data?.id);
      router.push(getReportLink(data?.id));
    }

  }, [data]);

  function changeOption(text: string, index: number) {
    dispatch({ type: ACTIONS.CHANGE_OPTION, payload: { text, index } });
  }

  function deleteOption(index: number) {
    dispatch({ type: ACTIONS.REMOVE_OPTION, payload: { index } })

  }
  const quesRef: any = useRef(null);


  function handleSubmit(e: any) {
    e?.preventDefault();
    event?.createPoll('default');
    addPoll({ title: quesRef?.current?.value, options });
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
          await wait(300);
        }
        await wait(5000);

      }

    })();
  }, [])
  return (
    <div className={styles.PollContainer} >

      <form style={{
        width: '100%'
      }} autoComplete="off">


        <div className={styles.QuestionIcon}>Q</div>

        <input ref={quesRef} autoFocus className={styles.QuestionInput} type="text" id='question' placeholder={placeholder} ></input>

        <div className={styles.OptionContainer}>
          {
            options.map((option: any, i) => (
              <PollOption key={i} option={option} handleChange={(option: Option) => {
                changeOption(option.text || "", i);
              }} handleDelete={() => {
                console.log(`Deleting Option at : ${i}`);
                analytics.deleteOption();
                deleteOption(i);
              }} />
            ))
          }
          {
            (options.length < 8) ? <AddOption onClick={() => dispatch({ type: ACTIONS.ADD_OPTION })} /> : null
          }
        </div>
        <br />
        <br />
        <MainActionButton onClick={handleSubmit} progress={isLoading ? true : false} />
      </form>
    </div>


  )
}

function wait(time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(true);
    }, time);
  })
}
export default CreatePoll
