import Head from 'next/head'
import Image from 'next/image'
import CreatePoll from '../components/CreatePoll/CreatePoll'
import NavBar from '../components/NavBar/NavBar'
import ViewPoll from '../components/ViewPoll/ViewPoll'
import { Provider, useSelector } from 'react-redux';
import { store } from '../app/store'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/firebaseApp'
import { setAuth } from '../services/auth';
import { useDispatch } from 'react-redux';
import { useGetPollsQuery } from '../services/poll';
import { useEffect } from 'react'
import PollList from '../components/PollList/PollList'
import Report from '../components/Report/Report'
export default function Home() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user: any) => {
    dispatch(setAuth({ token: user?.accessToken, email: user?.email, isAnonymous: user?.isAnonymous }))
  });
  const { token } = useSelector((state: any) => state.auth) as any;

  return (


    <div>
      <Head>
        <title>Real Time Poll</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <CreatePoll />
      {/* 
        -> Get all poll of user
        -> Render ViewPoll for all ids
      */}
      {token ? <PollList></PollList> : <>Login To View Polls</>}
      {/* <Report></Report> */}
    </div>
  )
}



