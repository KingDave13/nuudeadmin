'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@styles/styles';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logoalt, logout } from '@public/assets';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [active, setActive] = useState('requests');

  const router = useRouter();

  const handleSideItemClick = (link) => {
    setActive(link.title);
    router.push(link.route);
  };

  return (
    <div className={`${styles.paddingX} md:w-1/5 flex items-center
      font-manierRegular md:border-r-[1px] border-primaryalt 
      hidden md:flex`}
    >
      <div className="w-full flex justify-between items-center mx-auto
      py-10">
        <div className="flex flex-col items-center w-full
        h-screen">
          <Image
            src={logoalt}
            alt="logo"
            width={180}
            height={'auto'}
            className="object-contain"
          />

          <ul className="list-none flex flex-col gap-8 hidden md:flex
          mt-24 font-manierMedium">
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

            <li className='hover:text-secondary grow3 text-[20px] list-item
            text-decoration-none cursor-pointer text-textalt mt-20'>
              <a 
                href='/'
                className='flex gap-6 items-center icon'
              >
                <Image src={logout} 
                  alt='logout'
                  width={18} 
                  height={'auto'}
                />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
