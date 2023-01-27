import Head from 'next/head'
// import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
// import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
export default function Home() {
  const { token } = useSelector((state: any) => state.auth) as any;
  const CreatePoll = dynamic(() => import('../components/CreatePoll/CreatePoll'), {
    loading: () => null
  })
  const NavBar = dynamic(() => import('../components/NavBar/NavBar'), {
    loading: () => null
  })
  return (
    <div>
      <Head>
        <title>Create Poll | Get Your Friends/Team Opinion in seconds!</title>
        <meta name="description" content="Are you tired of long and tedious meetings just to reach a decision? Introduce RTPoll to your team! Our real-time online poll app makes decision-making easy and efficient. With RTPoll, you can create polls with multiple choice questions, invite your team members to participate, and view results in real-time. No more waiting for responses or trying to schedule meetings that work for everyone. With RTPoll, your team will be more engaged and decisions will be made faster. Visit our website now to learn more and start using RTPoll today!" />
        <meta name='keywords' content='Real-time poll, Team decision making, Online poll app, Free poll app, Ad-free poll app, Image poll, Intuitive UI poll, Social media sharing, Poll result graph, Group decision making app, Team opinion poll, Online survey tool, Easy to use poll app, Decision making tool, Team engagement, Group opinion poll, Free survey app, Real-time survey'></meta>
        <link rel="icon" href="/favicon.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8320217016148645" crossOrigin="anonymous"></script>
      </Head>
      <NavBar></NavBar>
      <div className='w-full h-screen text-center'>
        <div className='max-w-[1240px] w-full h-full mx-auto p-2 grid grid-cols-1 justify-center items-center'>

          <CreatePoll />
          {/* {token ? <PollList></PollList> : <></>} */}
        </div>


      </div>
    </div>
  )
}



