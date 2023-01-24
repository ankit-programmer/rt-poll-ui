import Head from 'next/head'
// import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
// import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
export default function Home() {
    const NavBar = dynamic(() => import('../components/NavBar/NavBar'), {
        loading: () => null
    })
    const AboutPage = dynamic(() => import('../components/StaticPage/About'), {
        loading: () => null
    })
    return (
        <div>
            <Head>
                <title>About Us</title>
                <meta name="description" content="" />
                <meta name='keywords' content=''></meta>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar></NavBar>
            <div className='w-full mt-24 h-screen text-center'>
                <div className='max-w-[1240px] min-h-screen w-full h-full mx-auto p-2 grid grid-cols-1 justify-center items-center'>
                    <AboutPage></AboutPage>


                </div>


            </div>
        </div>
    )
}



