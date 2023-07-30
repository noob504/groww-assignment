import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useSelector } from 'react-redux';

import styles from './NavBar.module.css';

import Logo from '../../../public/assets/icons/logo.png'

const NavBar = () => {
  // const currentUser = useSelector((state) => state.currentUser);
  const currentUser = { username: 'test' };

  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              // width={80}
              // height={80}
            />
          </Link>
      </div>
      
      <div className={styles.name}>
        SocialSeedlings
      </div>
      
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link href="/">
                Home
              </Link>
            </li>
              {/* <li>
                <Link href={`me`}>
                  Profile
                </Link>
              </li> */}
          </ul>
        </div>
    </nav>
  );
};

export default NavBar;
