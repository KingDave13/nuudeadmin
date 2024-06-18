'use client';

import { useState, useEffect } from 'react';
import styles from '@styles/styles';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logoalt } from '@public/assets';
import { useRouter, usePathname } from 'next/navigation';
import { HiLogout } from "react-icons/hi";
import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState('');

  useEffect(() => {
    if (session) {
      const currentPath = pathname.split('/')[1];
      const activeLink = sideLinks.find(link => link.route.includes(currentPath));
      if (activeLink) {
        setActive(activeLink.title);
      }
    }
  }, [pathname, session]);

  const handleSideItemClick = (link) => {
    if (session) {
      setActive(link.title);
      router.push(link.route);
    }
  };

  const handleLogout = () => {
    if (session) {
      signOut({ callbackUrl: 'http://localhost:3001' });
    }
  };

  return (
    <div className={`${styles.paddingX} md:w-1/5 flex items-center
      font-manierRegular md:border-r-[1px] border-primaryalt 
      hidden md:flex z-20 fixed`}
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

          <ul className="list-none flex flex-col gap-3 hidden md:flex
          mt-24 font-manierMedium">
            {sideLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? 'bg-secondary rounded-md text-primary'
                    : 'bg-none text-textalt hover:text-secondary grow3'
                } ${!session ? 'opacity-50' : 'cursor-pointer'}  
                text-[19px] list-item`}
                onClick={() => {
                  handleSideItemClick(link);
                }}
              >
                <div className={`py-2 px-5 flex gap-6 items-center`}>
                  {link.Icon && <link.Icon />}
                  {link.title}
                </div>
              </li>
            ))}

            <li className={`text-[19px] list-item
            ${!session ? 'opacity-50' : 'hover:text-secondary cursor-pointer grow3'} 
            text-textalt mt-20`}>
              <div className='flex gap-6 px-5 items-center'
              onClick={handleLogout}>
                <HiLogout className='transform scale-x-[-1]'
                />
                  Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;