import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
// import NavBar from '../NavBar/NavBar';
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
