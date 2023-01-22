import Head from 'next/head'
// import NavBar from '../../components/NavBar/NavBar'
import ViewPoll from '../../components/ViewPoll/ViewPoll'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { getPollLink } from '../../utility';
import dynamic from 'next/dynamic';

export default function Home(props: any) {
    const router = useRouter();
    const { id } = router.query;
    const { token } = useSelector((state: any) => state.auth) as any;
    const { poll } = props;
    const oembedUrl = `https://api.rtpoll.com/oembed?url=${encodeURI(getPollLink(id as string))}&format=json`
    const NavBar = dynamic(() => import('../../components/NavBar/NavBar'), {
        loading: () => null
    })
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
                <div className='w-full mt-24 text-center'>
                    <div style={{
                        minHeight: "85vh"
                    }} className='max-w-[1240px] min-h-screen w-full h-full mx-auto p-2 flex justify-center items-center styles.MainContainer' >
                        <ViewPoll poll={poll} key={id} id={id}></ViewPoll>

                    </div>
                </div>

            </>
        </div >
    )
}


// export async function getServerSideProps(context: any) {
//     const { id } = context?.params;
//     const poll = await (await fetch(`https://api.rtpoll.com/poll/?id=${id}`)).json();
//     return {
//         props: {
//             ssr: true,
//             poll: poll
//         }, // will be passed to the page component as props
//     }
// }
