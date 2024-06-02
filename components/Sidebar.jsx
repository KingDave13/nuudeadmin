'use client';

import { useState, useEffect } from 'react';
import styles from '@styles/styles';
import Image from 'next/image';
import { sideLinks } from '@constants';
import { logoalt, logout } from '@public/assets';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState('requests');

  useEffect(() => {
    const currentPath = pathname.split('/')[1];
    const activeLink = sideLinks.find(link => link.route.includes(currentPath));
    if (activeLink) {
      setActive(activeLink.title);
    }
  }, [pathname]);

  const handleSideItemClick = (link) => {
    setActive(link.title);
    router.push(link.route);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: 'http://localhost:3001' });
  };

  return (
    <div className={`${styles.paddingX} md:w-1/5 flex items-center
      font-manierRegular md:border-r-[1px] border-primaryalt 
      hidden md:flex z-20`}
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
                    ? 'bg-secondary rounded-md'
                    : 'bg-none'
                } hover:text-secondary grow3 text-[19px] text-decoration-none 
                cursor-pointer text-textalt list-item`}
                onClick={() => {
                  handleSideItemClick(link);
                }}
              >
                <div className={`p-3 flex gap-6 items-center`}>
                  {link.Icon && (
                    <span className="">
                      <Image src={link.Icon} 
                        alt={link.title} 
                        width={18} 
                        height={'auto'} 
                      />
                    </span>
                  )}
                  {link.title}
                </div>
              </li>
            ))}

            <li className='hover:text-secondary grow3 text-[20px] list-item
            text-decoration-none cursor-pointer text-textalt mt-20'>
              <div className='flex gap-6 items-center'
              onClick={handleLogout}>
                <Image src={logout} 
                  alt='logout'
                  width={18} 
                  height={'auto'}
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