import Head from 'next/head'
import CreatePoll from '../components/CreatePoll/CreatePoll'
import NavBar from '../components/NavBar/NavBar'
import { Provider, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/firebaseApp'
import { setAuth } from '../services/auth';
import { useDispatch } from 'react-redux';
import PollList from '../components/PollList/PollList'
// import Report from '../components/Report/Report'
export default function Home() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user: any) => {
    dispatch(setAuth({ token: user?.accessToken, email: user?.email, isAnonymous: user?.isAnonymous, uid: user?.uid }))
  });
  const { token } = useSelector((state: any) => state.auth) as any;

  return (
    <div>
      <Head>
        <title>RT Poll - Create Poll</title>
        <meta name="description" content="Get your friends opinion in minutes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div>

        <CreatePoll />
        <br>
        </br>
        <br></br>
        {token ? <PollList></PollList> : <></>}
        <br></br>
        <br></br>
        <br></br>

      </div>
      {/* <Report></Report> */}
    </div>
  )
}



