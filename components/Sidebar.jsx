'use client';

import { useState, useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import styles from '@styles/styles';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logoalt } from '@public/assets';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [active, setActive] = useState('requests');
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
  // router.push(`/${link.id}`)
};


  return (
    <div className={`${styles.paddingX} md:w-1/4 flex items-center fixed 
      md:py-0 ss:py-6 py-5 md:px-16 ss:px-16 px-6 top-0 z-20 
      font-manierRegular`}
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <div className="flex flex-col items-center w-full
        h-screen hidden md:flex border-r-[1px] border-primaryalt">
          <Image
            src={logoalt}
            alt="logo"
            width={180}
            height={'auto'}
            className="object-contain mt-14"
          />

          <ul className="list-none flex flex-col gap-6 hidden md:flex
          mt-24 font-manierMedium">
            {sideLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? 'bg-secondary p-2 rounded-md'
                    : 'bg-none'
                } hover:text-secondary grow3 text-[20px] text-decoration-none 
                cursor-pointer text-textalt`}
                onClick={() => {
                  handleSideItemClick(link);
                }}
              >
                <a href={`${link.id}`} className='gap-3'>
                  {/* {link.Icon} */}
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>


        {/* FOR MOBILE */}
        
        {/* <div className="md:hidden flex justify-between flex-1 items-center
        mt-3">
            <Image
              src={logoalt}
              alt="logo"
              width={130}
              height="auto"
              className="object-contain"
            />

          <div className="flex items-center z-20">
            {toggle ? (
              <BsX
                size={40}
                className="object-contain cursor-pointer"
                style={ '#fff' }
                onClick={() => setToggle(!toggle)}
              />
            ) : (
              <HiOutlineMenuAlt3
                size={40}
                className="object-contain cursor-pointer"
                style={'#fff' }
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
          
          <div
            ref={menuRef}
            className={`p-6 ss:mt-28 mt-24 bg-white absolute top-0 right-0 
            z-10 flex-col w-full shadow-xl
            ${toggle ? 'menu-slide-enter menu-slide-enter-active' 
            : 'menu-slide-exit menu-slide-exit-active'}`}
          >
            <ul className="list-none flex justify-end 
            flex-col">
              {sideLinks.map((link, index) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? 'text-secondary'
                      : 'text-primary'
                  } font-medium cursor-pointer ss:text-[20px] text-[16px] 
                  w-full
                  ${index !== sideLinks.length - 1 ? 'border-b-[1px] pb-1.5 pt-1.5' : 'pt-1.5'}`}
                  onClick={() => {
                    setToggle(!toggle);
                    handleSideItemClick(link);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
