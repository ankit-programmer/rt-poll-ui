import Head from 'next/head'
import NavBar from '../../components/NavBar/NavBar'
import ViewPoll from '../../components/ViewPoll/ViewPoll'
import { Provider, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../app/firebaseApp'
import { setAuth } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetPollByIdQuery } from '../../services/poll';
import Report from '../../components/Report/Report';
import { Auth } from '../../services/types';

// import Report from '../components/Report/Report'
export default function PollReport() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    onAuthStateChanged(auth, (user: any) => {
        dispatch(setAuth({ token: user?.accessToken, email: user?.email, isAnonymous: user?.isAnonymous, uid: user?.uid }))
    });
    const { token } = useSelector((state: any) => state.auth) as Auth;

    return (
        <div>
            <Head>
                <title>RT Poll - Report</title>
                <meta name="description" content="Next-Gen realtime voting system!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <>
                <div className='w-full h-screen text-center'>
                    <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center'>
                        {token ? <Report key={id} id={id}></Report> : <CircularProgress></CircularProgress>}
                    </div>
                </div>
            </>
        </div>
    )
}



