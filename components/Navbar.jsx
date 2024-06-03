'use client';

import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '@styles/styles';
import { HiOutlineMenuAlt3, HiLogout } from 'react-icons/hi';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logo, picture, arrow, arrowreverse } from '@public/assets';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [active, setActive] = useState('requests');
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const menuRef = useRef(null);

  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const currentPath = pathname.split('/')[1];
    const activeLink = sideLinks.find(link => link.route.includes(currentPath));
    if (activeLink) {
      setActive(activeLink.title);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setToggle(false);
          setToggle2(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleSideItemClick = (link) => {
  setActive(link.title);
  router.push(link.route)
};

const handleLogout = () => {
  signOut({ callbackUrl: 'http://localhost:3001' });
};

const handleToggleClick = () => {
  if (session) {
    setToggle(!toggle);
  }
};

  return (
    <nav className={`${styles.paddingA} flex items-center w-full
      md:py-10 ss:py-6 py-5 top-0 z-20 navsmooth font-manierRegular
      md:border-b-[1px] border-primaryalt`}
    >
      <div className="w-full flex items-center mx-auto">
        <div className='flex w-full justify-between hidden md:flex'>
          <div className="flex w-full flex-col gap-1">
            <h1 className='text-secondary font-manierMedium text-[32px]'>
              Admin Dashboard
            </h1>

            <p className='text-white text-[17px]'>
              Manage new membership requests, view info and communicate 
              with <br></br>members and more.
            </p>
          </div>

          {session?.user ? (
            <div className='flex justify-end w-full items-center gap-5'>
              <Image 
                src={picture}
                width={45}
                height={'auto'}
                alt='profilepic'
                className='object-contain'
              />

              <h1 className='text-white text-[18px]'>
                Nuude! Admin
              </h1>
            </div>
          ) : (
            ''
          )}
          
        </div>

        {/* FOR MOBILE */}
        
        <div className="md:hidden flex-1 items-center
          mt-3">
          <div className='flex justify-between w-full border-b-[1px]
          border-primaryalt pb-4'>
            <div className="flex items-center z-20">
              {toggle ? (
                <BsX
                  size={40}
                  className="object-contain cursor-pointer"
                  style={{ color: '#fff' }}
                  onClick={handleToggleClick}
                />
              ) : (
                <HiOutlineMenuAlt3
                  size={40}
                  className="object-contain cursor-pointer"
                  style={{ color: '#fff' }}
                  onClick={handleToggleClick}
                />
              )}
            </div>
            
            {session?.user ? (
              <div className='flex justify-end items-center gap-4 grow2
              cursor-pointer'
              onClick={() => setToggle2(!toggle2)}>
                <Image 
                  src={picture}
                  width={35}
                  height={'auto'}
                  alt='profilepic'
                  className='object-contain'
                />

                <Image
                  src={arrow}
                  alt='arrow'
                  width={12}
                  height={'auto'}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="flex w-full flex-col ss:mt-5 mt-5 border-b-[1px]
          border-primaryalt pb-4">
            <h1 className='text-secondary font-manierMedium ss:text-[30px]
            text-[25px]'>
              Admin Dashboard
            </h1>
            <p className='text-white ss:text-[15px] text-[13px]'>
              Manage new membership requests, view info and communicate 
              with members and more.
            </p>
          </div>

          <div
            ref={menuRef}
            className='ss:p-6 p-4 bg-white absolute ss:top-5 top-5 right-6 
            rounded-lg z-10 flex-col shadow-xl ss:mt-4 mt-3'
            style={{ height: toggle2 ? 'auto' : 0, opacity: toggle2 ? 1 : 0, 
            visibility: toggle2 ? 'visible' : 'hidden', 
            transition: 'height 0.3s, opacity 0.3s, visibility 0.3s' }}
          >
            <div className="list-none flex justify-end ss:gap-5 gap-4 
            flex-col">
              <div className='flex w-full items-center ss:gap-3 gap-3
              cursor-pointer'>
                <Image 
                  src={picture}
                  width={35}
                  height={'auto'}
                  alt='profilepic'
                  className='object-contain'
                  
                />

                <h1 className='text-primary ss:text-[20px] text-[16px]'>
                  Nuude! Admin
                </h1>

                <Image
                  src={arrowreverse}
                  alt='arrow'
                  width={12}
                  height={'auto'}
                />
              </div>
              
              <div className='hover:text-secondary grow3 ss:text-[21px] 
              text-[17px] list-item cursor-pointer text-textalt ss:mt-6
              mt-6'>
                <div className='flex ss:gap-6 gap-5 items-center'
                onClick={handleLogout}>
                  <HiLogout className='transform scale-x-[-1]'
                  />
                    Logout
                </div>
              </div>
            </div>
          </div>
          
          <div
            ref={menuRef}
            className='p-6 bg-white absolute ss:top-20 top-20 rounded-lg 
            z-10 flex-col shadow-xl ss:mt-4 mt-3'
            style={{ height: toggle ? 'auto' : 0, opacity: toggle ? 1 : 0, 
            visibility: toggle ? 'visible' : 'hidden', 
            transition: 'height 0.3s, opacity 0.3s, visibility 0.3s' }}
          >
            <ul className="list-none flex justify-end ss:gap-5 gap-4 
            flex-col">
              {sideLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? 'text-secondary'
                      : ''
                  } ss:text-[21px] text-[16px] 
                  text-decoration-none text-textalt list-item`}
                  onClick={() => {
                    handleSideItemClick(link);
                  }}
                >
                  <div className='flex ss:gap-6 gap-5 items-center'>
                    {link.Icon && <link.Icon />}
                    {link.title}
                  </div>
                </li>
              ))}
              <Image
                src={logo}
                alt='logo'
                width={100}
                height={'auto'}
                className='mt-10 mx-auto'
              />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;