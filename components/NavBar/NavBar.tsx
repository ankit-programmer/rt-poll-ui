import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai'
// import { useRouter } from 'next/router';
import NavLogo from '../../public/assets/poll.png'
import { store } from '../../app/store';
import { auth } from '../../app/firebaseApp';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Auth } from '../../services/types';
import { setUser } from '../../app/analytics';
import {  onIdTokenChanged, signInAnonymously } from 'firebase/auth';
import { setAuth } from '../../services/auth';
let lastScrollY = 0;
const Navbar = () => {
  const dispatch = useDispatch();

  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#ecf0f3');
  const [linkColor, setLinkColor] = useState('#1f2937');
  const { token, isAnonymous } = useSelector((state: any) => state.auth) as Auth;
  const [visible, setNavVisibility] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    return onIdTokenChanged(auth, (user: any) => {
      if (user) {
        console.log(user);
        setUser(user.uid, user.isAnonymous);
        dispatch(setAuth({ token: user?.accessToken, email: user?.email, isAnonymous: user?.isAnonymous, uid: user?.uid }))

        console.log("Persist User");
        console.log(user?.uid);
        console.log(user?.isAnonymous);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.log(error);
        })
      }
    })
  }, []);


  useEffect(() => {
    const controlNavBar = () => {
      if (typeof window != 'undefined') {
        if (window.scrollY >= 90) {
          setShadow(true);
        } else {
          setShadow(false);
        }
        const currentScrollPos = window.pageYOffset;
        if (lastScrollY > currentScrollPos) {
          setNavVisibility(true);
        } else {
          setNavVisibility(false);
        }
        lastScrollY = currentScrollPos;
      }
    }
    if (typeof window != 'undefined') {
      window.addEventListener('scroll', controlNavBar);
    }
    return () => {
      window.removeEventListener('scroll', controlNavBar);
    }
  }, []);

  return (

    <div
      style={{ backgroundColor: `${navBg}`, top: visible ? "0px" : "-100px" }}
      className={
        shadow
          ? 'fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300'
          : 'fixed w-full h-20 z-[100] ease-in-out duration-300'
      }
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link legacyBehavior href='/'>
          <a>
            <Image priority
              src={NavLogo}
              alt='/'
              width='100'
              height='50'
              className='cursor-pointer'
            />
          </a>
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className='hidden md:flex'>
            <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/'>Create</Link>
            </li>
            <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/my-poll'>My Poll</Link>
            </li>
            {/* <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/pricing'>Pricing</Link>
            </li> */}
            <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/feedback'>Feedback</Link>
            </li>
            <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/about'>About Us</Link>
            </li>
            <li className='ml-10 text-sm uppercase hover:border-b'>
              <Link legacyBehavior href='/privacy'>Privacy</Link>
            </li>
            <li className='ml-10 text-sm uppercase hover:border-b'>
              {
                !isAnonymous ? <Link onClick={() => {
                  auth.signOut();
                }} href={''} >Logout</Link> : <Link legacyBehavior href='/auth'>Login</Link>
              }

            </li>
          </ul>
          {/* Hamburger Icon */}
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className='md:hidden'
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? ' fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link legacyBehavior href='/'>
                <a>
                  <Image
                    src={NavLogo}
                    width='200'
                    height='100'
                    alt='/'
                  />
                </a>
              </Link>
              <div
                onClick={handleNav}
                className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer'
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4'>
                Get your team opinion in seconds!
              </p>
            </div>
          </div>
          <div className='py-4 flex flex-col'>
            <ul className='uppercase'>

              <Link legacyBehavior href='/'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Create
                </li>
              </Link>
              <Link legacyBehavior href='/my-poll'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  My Poll
                </li>
              </Link>
              {/* <Link legacyBehavior href='/pricing'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Pricing
                </li>
              </Link> */}
              <Link legacyBehavior href='/feedback'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Feedback
                </li>
              </Link>
              <Link legacyBehavior href='/about'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  About Us
                </li>
              </Link>
              <Link legacyBehavior href='/privacy'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Privacy
                </li>
              </Link>
              {
                !isAnonymous ? <Link onClick={() => {
                  auth.signOut();
                }} href={''}>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Logout
                  </li>
                </Link> : <Link legacyBehavior href='/auth'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Login
                  </li>
                </Link>
              }

            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;