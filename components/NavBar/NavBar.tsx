import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai'
// import { useRouter } from 'next/router';
import NavLogo from '../../public/assets/poll.png'
import { store } from '../../app/store';
import { auth } from '../../app/firebaseApp';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Auth } from '../../services/types';
import { setUser } from '../../app/analytics';
import { onAuthStateChanged, onIdTokenChanged, signInAnonymously } from 'firebase/auth';
import { setAuth } from '../../services/auth';
import { useCreateUserMutation, useLazyGetUserQuery } from '../../services/user';
let lastScrollY = 0;
const Navbar = () => {
  const dispatch = useDispatch();

  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [getUserProfile, userStatus] = useLazyGetUserQuery();
  const [createUserProfile, createUserStatus] = useCreateUserMutation();
  const { token, isAnonymous } = useSelector((state: any) => state.auth) as Auth;
  const [visible, setNavVisibility] = useState(true);
  const userProfileCreated = useRef(false);
  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {

    const unsubscribeIdToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser(user.uid, user.isAnonymous);
        const token = await user.getIdToken();
        dispatch(setAuth({ token: token, email: user?.email || undefined, isAnonymous: user?.isAnonymous, uid: user?.uid }))
      } else {
        signInAnonymously(auth).catch((error) => {
          console.log(error);
        })
      }
    })

    const unsubscribeAuthState = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        await getUserProfile(user?.uid);

      }
    })
    return () => {
      unsubscribeIdToken();
      unsubscribeAuthState();
    }
  }, []);

  useEffect(() => {
    if (userStatus?.isSuccess && !userStatus?.data && !userProfileCreated.current) {
      // Create the profile once; without this guard the effect can re-fire and
      // POST /user repeatedly.
      userProfileCreated.current = true;
      const user = auth.currentUser;
      createUserProfile({
        firstName: user?.displayName as string
      })
    }
  }, [userStatus?.isSuccess, userStatus?.data])


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
      style={{ top: visible ? "0px" : "-100px" }}
      className={
        shadow
          ? 'fixed w-full h-20 z-[100] ease-in-out duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-[0_2px_16px_rgba(16,24,40,0.06)]'
          : 'fixed w-full h-20 z-[100] ease-in-out duration-300 bg-white/60 backdrop-blur-md border-b border-transparent'
      }
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link prefetch={false} legacyBehavior href='/'>
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
          <ul className='hidden md:flex text-gray-600'>
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/'>Create</Link>
            </li>
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/my-poll'>My Poll</Link>
            </li>
            {/* <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/pricing'>Pricing</Link>
            </li> */}
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/feedback'>Feedback</Link>
            </li>
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/about'>About Us</Link>
            </li>
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              <Link prefetch={false} legacyBehavior href='/privacy'>Privacy</Link>
            </li>
            <li className='ml-10 pb-1 text-xs font-semibold uppercase tracking-[0.15em] border-b-2 border-transparent transition-colors hover:text-[#5651e5] hover:border-[#5651e5]'>
              {
                !isAnonymous ? <Link prefetch={false} onClick={() => {
                  auth.signOut();
                }} href={''} >Logout</Link> : <Link prefetch={false} legacyBehavior href='/auth'>Login</Link>
              }

            </li>
          </ul>
          {/* Hamburger Icon */}
          <div
            onClick={handleNav}
            className='md:hidden p-2 -mr-2 cursor-pointer text-gray-700'
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/40 backdrop-blur-sm' : ''
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? ' fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white shadow-2xl p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link prefetch={false} legacyBehavior href='/'>
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
                className='rounded-full border border-gray-200 shadow-sm p-3 cursor-pointer hover:bg-gray-50'
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

              <Link prefetch={false} legacyBehavior href='/'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  Create
                </li>
              </Link>
              <Link prefetch={false} legacyBehavior href='/my-poll'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  My Poll
                </li>
              </Link>
              {/* <Link prefetch={false} legacyBehavior href='/pricing'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  Pricing
                </li>
              </Link> */}
              <Link prefetch={false} legacyBehavior href='/feedback'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  Feedback
                </li>
              </Link>
              <Link prefetch={false} legacyBehavior href='/about'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  About Us
                </li>
              </Link>
              <Link prefetch={false} legacyBehavior href='/privacy'>
                <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                  Privacy
                </li>
              </Link>
              {
                !isAnonymous ? <Link prefetch={false} onClick={() => {
                  auth.signOut();
                }} href={''}>
                  <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
                    Logout
                  </li>
                </Link> : <Link prefetch={false} legacyBehavior href='/auth'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm font-semibold tracking-[0.15em] text-gray-700 transition-colors hover:text-[#5651e5]'>
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