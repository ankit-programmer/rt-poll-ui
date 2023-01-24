import Head from 'next/head'
// import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
// import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
export default function Home() {
    const NavBar = dynamic(() => import('../components/NavBar/NavBar'), {
        loading: () => null
    });
    const PrivacyPage = dynamic(() => import('../components/StaticPage/Privacy'), {
        loading: () => null
    })
    return (
        <div>
            <Head>
                <title>Privacy Policy</title>
                <meta name="description" content="RTPoll's privacy policy is committed to protecting your personal information and your privacy. We use the information we collect to provide, maintain, and improve the Services, and to communicate with you about the Services. We will not share your personal information with third parties for their own marketing purposes without your consent." />
                <meta name='keywords' content=''></meta>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar></NavBar>
            <div className='w-full mt-24 h-screen text-center'>
                <div className='max-w-[1240px] min-h-screen w-full h-full mx-auto p-2 grid grid-cols-1 justify-center items-center'>
                    <PrivacyPage></PrivacyPage>

                </div>


            </div>
        </div>
    )
}



