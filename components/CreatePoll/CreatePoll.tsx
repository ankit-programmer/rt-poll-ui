import React, { Dispatch, ReducerAction, useEffect, useReducer, useRef, useState } from 'react'
import styles from './CreatePoll.module.css';
import { useRouter } from 'next/router';
import { useAddNewPollMutation } from '../../services/poll';
import { Option, Poll } from '../../services/types';
import event from '../../app/analytics';
import PollOption, { AddOption } from '../PollOption/PollOption';
import MainActionButton from '../ActionButton/ActionButton';
import { getReportLink } from '../../utility';
import analytics from '../../app/analytics';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import QuestionInput from '../QuestionInput/QuestionInput';
import { useDeleteDraftMutation, useLazyGetDraftQuery, useSaveDraftMutation } from '../../services/draft';
import { useSelector } from 'react-redux';
import PollSetting from '../PollSetting/PollSetting';
import Divider from '@mui/material/Divider/Divider';

const MAX_OPTIONS = 10;
const ACTIONS = {
  ADD_OPTION: 'add-option',
  REMOVE_OPTION: 'remove-option',
  CHANGE_OPTION: 'change-option',
  REPLACE_OPTIONS: 'replace-options'
}

function reducer(options: Option[], action: any): Option[] {
  switch (action.type) {
    case ACTIONS.ADD_OPTION:
      {
        if (options.length >= MAX_OPTIONS) return options;
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
        opt[index] = { ...opt[index], text };
        return opt;
        break;
      }
    case ACTIONS.REPLACE_OPTIONS:
      {
        const opts = action?.payload?.options || [];
        return opts;
      }
    default:
      return options;
      break;
  }
}
const CreatePoll = () => {
  const router = useRouter();

  const [options, dispatch] = useReducer(reducer, [{ text: "" }, { text: "" }, { text: "" }] as Option[]);
  const [setting, setSetting] = useState({ privacy: 'public', comment: false, anonymous: false });
  const [question, setQuestion] = useState("");
  const { token, isAnonymous, uid } = useSelector((state: any) => state.auth) as any;
  const [addPoll, { isLoading, data, isError, isSuccess }] = useAddNewPollMutation();
  const [getDraft, draftStatus] = useLazyGetDraftQuery();
  const [deleteDraft, deleteStatus] = useDeleteDraftMutation();
  const [saveDraft] = useSaveDraftMutation();
  useEffect(() => {
    if (isSuccess) {
      event.pollCreated(data?.id);
      router.push(getReportLink(data?.id));
      deleteDraft(null);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      getDraft("");
    }
  }, [token]);

  useEffect(() => {
    if (draftStatus?.isSuccess) {
      const { title, options, setting } = draftStatus.data || {};
      if (title) {
        setQuestion(title);
      }
      if (options) {
        dispatch({ type: ACTIONS.REPLACE_OPTIONS, payload: { options: options?.map(option => Object.assign({}, option)) } })
      }
      if (setting) {
        setSetting(Object.assign({}, setting as any));
      }
    }
  }, [draftStatus]);

  useEffect(() => {
    // console.log("OPTIONS", options);
    if (options[0]?.text || options[0]?.image) {
      console.log("Saving draft");
      saveDraft({ title: question, options: options, setting: setting })
    }
  }, [options]);


  function changeOption(text: string, index: number) {
    dispatch({ type: ACTIONS.CHANGE_OPTION, payload: { text, index } });
  }

  function deleteOption(index: number) {
    dispatch({ type: ACTIONS.REMOVE_OPTION, payload: { index } })

  }

  function handleQuestionChange(text: string) {
    setQuestion(text);
  }

  function handleSubmit(e: any) {
    e?.preventDefault();
    event?.createPoll('default');
    const validatedOptions = options.filter(option => option.text != "");
    if (validatedOptions.length < 2) {
      // TOTO: ANKIT  Show error message
    }
 
    addPoll({ title: question, options: validatedOptions, setting: setting });
  }
  


  return (
    <div className={styles.PollContainer} >
      <ErrorBoundary>

        <form style={{
          width: '100%'
        }} autoComplete="off">



          <QuestionInput question={question} changeHandler={handleQuestionChange}></QuestionInput>
          <div className={styles.OptionContainer}>
            {
              options.map((option: any, i) => (
                <PollOption key={i} index={i} id={i} option={option} handleChange={(option: Option) => {
                  changeOption(option.text || "", i);
                }} handleDelete={() => {
                  console.log(`Deleting Option at : ${i}`);
                  analytics.deleteOption();
                  deleteOption(i);
                }} />
              ))
            }
            {
              (options.length < MAX_OPTIONS) ? <AddOption onClick={() => dispatch({ type: ACTIONS.ADD_OPTION })} /> : null
            }
          </div>
          <br />
          <Divider>SETTING</Divider>
          <PollSetting data={setting as any} handleChange={(setting: any) => setSetting(setting)}></PollSetting>
          <Divider></Divider>
          <br />
          <br />
          <MainActionButton onClick={handleSubmit} progress={isLoading ? true : false} />

        </form>

      </ErrorBoundary>
    </div>


  )
}


export default CreatePoll
