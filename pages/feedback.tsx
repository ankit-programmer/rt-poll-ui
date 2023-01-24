import Head from 'next/head'
// import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
// import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
import FeedbackPoll from '../components/ViewPoll/ViewPoll';
export default function Home() {
    const NavBar = dynamic(() => import('../components/NavBar/NavBar'), {
        loading: () => null
    });

    const title = "Your Input is our Power: Help us Improve RT Poll";
    const randomTitle = ["Be the Change: Your Feedback Can Make RT Poll Even Better", "Have Your Say: Your Opinion Matters to Us", "Make RT Poll Your Own: Share Your Feedback and Watch It Grow", "Your Input is our Power: Help us Improve RT Poll", "Join the Conversation: Your Feedback Can Help RT Poll Reach its Potential"];
    return (
        <div>
            <Head>
                <title>Feedback</title>
                <meta name="description" content="The feedback page is a platform where users can share their thoughts and opinions about RTPoll. It allows users to rate their experience with the app and provide suggestions for improvement. Your feedback helps us to understand your needs and improve the app to better suit your needs." />
                <meta name='keywords' content='RTPoll Feedback,Provide Feedback,Share Opinion,Rate Experience,Improve RTPoll,User Feedback,Give feedback,Rate RTPoll,Comment RTPoll,RTPoll Opinion'></meta>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar></NavBar>
            <div className='w-full mt-24 h-screen text-center'>
                <div className='max-w-[1240px] min-h-screen w-full h-full mx-auto p-2 grid grid-cols-1 justify-center items-center justify-items-center'>
                    <FeedbackPoll id={"XqS3wjksJsa5gNXZPhMw"}></FeedbackPoll>
                    <div>
                        <br></br>
                        <b>{title}</b>
                        <p><a href="mailto:feedback@rtpoll.com?subject=Feedback">feedback@rtpoll.com</a></p>
                        <br></br>
                    </div>
                </div>


            </div>
        </div>
    )
}



