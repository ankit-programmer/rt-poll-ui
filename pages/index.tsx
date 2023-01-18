import Head from 'next/head'
import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
export default function Home() {
  const { token } = useSelector((state: any) => state.auth) as any;
  const Header = dynamic(() => import('../components/NavBar/NavBar'), {
    loading: () => null,
  });
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
      <Header />
      <div className='w-full h-screen text-center'>
        <div className='max-w-[1240px] w-full h-full mx-auto p-2 grid justify-center items-center'>
          <div>
            <CreatePoll />
            <br>
            </br>
            <br></br>
            {token ? <PollList></PollList> : <></>}
            <br></br>
            <br></br>
            <br></br>

          </div>
        </div>
      </div>
    </div>
  )
}



