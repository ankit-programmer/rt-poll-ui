import Head from 'next/head'
// import CreatePoll from '../components/CreatePoll/CreatePoll'
import { useSelector } from 'react-redux';
// import Navbar from '../components/NavBar/NavBar';
import dynamic from 'next/dynamic';
export default function Layout({ children }: any) {
    const NavBar = dynamic(() => import('../NavBar/NavBar'), {
        loading: () => null
    })
    return (
        <>
            <NavBar></NavBar>
            <main>
                {children}
            </main>
        </>
    )
}
