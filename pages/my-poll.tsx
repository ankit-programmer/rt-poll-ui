import Head from 'next/head'
import { useSelector } from 'react-redux';
import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
import PollList from '../components/PollList/PollList';
import CircularProgress from '@mui/material/CircularProgress';
export default function Home() {
    const { token } = useSelector((state: any) => state.auth) as any;

    return (
        <div>
            <Head>
                <title>RT Poll - Create Poll</title>
                <meta name="description" content="Get your friends opinion in minutes!" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar></Navbar>
            <div className='w-full text-center'>
                <div className='max-w-[1240px] min-h-screen w-full mt-24 h-full mx-auto p-2 grid grid-cols-1 items-center justify-center justify-items-center'>
                    {token ? <PollList></PollList> : <CircularProgress></CircularProgress>}
                    {/* <CircularProgress></CircularProgress> */}
                </div>
            </div>
        </div>
    )
}



