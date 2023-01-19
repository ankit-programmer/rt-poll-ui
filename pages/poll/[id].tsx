import Head from 'next/head'
import NavBar from '../../components/NavBar/NavBar'
import ViewPoll from '../../components/ViewPoll/ViewPoll'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { getPollLink } from '../../utility';

export default function Home() {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: any) => state.auth) as any;
    const oembedUrl = `https://api.rtpoll.com/oembed?url=${encodeURI(getPollLink(id as string))}&format=json`
    return (


        <div>
            <Head>
                <title>RT Poll - Vote</title>

                <link rel="alternate" type="application/json+oembed"
                    href={oembedUrl} title="RT Poll - Vote" />
                <meta name="description" content="SHARE YOUR OPINION :)" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar />
            <>
                <div className='w-full h-screen text-center'>
                    <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center styles.MainContainer' >
                        {token ? <ViewPoll key={id} id={id}></ViewPoll> : <CircularProgress></CircularProgress>}

                    </div>
                </div>

            </>
        </div >
    )
}



