'use client';

import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '@styles/styles';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logoalt, picture, arrow } from '@public/assets';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setToggle(false);
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

  return (
    <nav className={`${styles.paddingA} w-full flex items-center
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

            <Image
              src={arrow}
              alt='arrow'
              width={12}
              height={'auto'}
            />
          </div>
        </div>

        {/* FOR MOBILE */}
        
        <div className="md:hidden flex justify-between flex-1 items-center
          mt-3">
          <div className="flex items-center z-20">
            {toggle ? (
              <BsX
                size={40}
                className="object-contain cursor-pointer"
                style={{ color: '#fff' }}
                onClick={() => setToggle(!toggle)}
              />
            ) : (
              <HiOutlineMenuAlt3
                size={40}
                className="object-contain cursor-pointer"
                style={{ color: '#fff' }}
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
          
          <div
            ref={menuRef}
            className='p-6 bg-white absolute ss:top-8 top-20 rounded-md 
            z-10 flex-col shadow-xl'
            style={{ height: toggle ? 'auto' : 0, opacity: toggle ? 1 : 0, 
            visibility: toggle ? 'visible' : 'hidden', 
            transition: 'height 0.3s, opacity 0.3s, visibility 0.3s' }}
          >
            <ul className="list-none flex justify-end flex-col">
              {sideLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? 'bg-secondary p-2 rounded-md'
                      : 'bg-none'
                  } hover:text-secondary grow3 text-[20px] text-decoration-none 
                  cursor-pointer text-textalt list-item`}
                  onClick={() => {
                    handleSideItemClick(link);
                  }}
                >
                  <a 
                    href={link.route} 
                    className='flex gap-6 items-center'
                  >
                    {link.Icon && (
                      <span className="icon">
                        <Image src={link.Icon} 
                          alt={link.title} 
                          width={18} 
                          height={'auto'} 
                        />
                      </span>
                    )}
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;