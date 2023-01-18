import Head from 'next/head'
import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
export default function Home() {
  const { token } = useSelector((state: any) => state.auth) as any;
  const PollList = dynamic(() => import('../components/PollList/PollList'), {
    loading: () => null
  })
  return (
    <div>
      <Head>
        <title>RT Poll - Create Poll</title>
        <meta name="description" content="Get your friends opinion in minutes!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar></Navbar>
      <div className='w-full h-screen text-center'>
        <div className='max-w-[1240px] w-full h-full mx-auto p-2 grid grid-cols-1 justify-center items-center'>

          <CreatePoll />
          {token ? <PollList></PollList> : <></>}
        </div>


      </div>
    </div>
  )
}



