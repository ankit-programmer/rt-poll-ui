import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
// import NavBar from '../NavBar/NavBar';
// Module scope: calling dynamic() inside the component body creates a new
// component type every render, remounting NavBar (and its auth listeners) on
// each navigation.
const NavBar = dynamic(() => import('../NavBar/NavBar'), {
    loading: () => null
})
export default function Layout({ children }: any) {
    return (
        <>
            <NavBar></NavBar>
            <main>
                {children}
            </main>
        </>
    )
}
