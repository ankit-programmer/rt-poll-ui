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

// import Report from '../components/Report/Report'
export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (user: any) => {
        dispatch(setAuth({ token: user?.accessToken, email: user?.email, isAnonymous: user?.isAnonymous, uid: user?.uid }))
    });
    const { token } = useSelector((state: any) => state.auth) as any;

    return (


        <div>
            <Head>
                <title>RT Poll - Vote</title>
                <meta name="description" content="SHARE YOUR OPINION :)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <>
                <div className='w-full h-screen text-center'>
                    <div className='max-w-[1240px] w-full h-full mx-auto p-5 flex justify-center items-center styles.MainContainer' >
                        {token ? <ViewPoll key={id} id={id}></ViewPoll> : <CircularProgress></CircularProgress>}

                    </div>
                </div>

            </>
        </div>
    )
}



