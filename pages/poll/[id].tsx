import Head from 'next/head'
import ViewPoll from '../../components/ViewPoll/ViewPoll'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

export default function Home(props: any) {
    const router = useRouter();
    const { id } = router.query;
    const { poll } = props;
    return (


        <div>
            <Head>
                <title>Vote | RT Poll</title>
                <meta name="description" content="SHARE YOUR OPINION :)" />
                <link rel="icon" href="/favicon.png" />
                <link rel='canonical' href='https://rtpoll.com' />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8320217016148645" crossOrigin="anonymous"></script>

            </Head>
            {/* <NavBar /> */}
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
