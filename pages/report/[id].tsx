import Head from 'next/head'
import NavBar from '../../components/NavBar/NavBar'
import { Provider, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';

import Report from '../../components/Report/Report';
import { Auth } from '../../services/types';

// import Report from '../components/Report/Report'
export default function PollReport() {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: any) => state.auth) as Auth;

    return (
        <div>
            <Head>
                <title>RT Poll - Report</title>
                <meta name="description" content="Next-Gen realtime voting system!" />
                <link rel="icon" href="/favicon.png" />
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



