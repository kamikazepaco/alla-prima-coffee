import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '/public/img/logoSM.svg'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${styles.nav} ${show && `${styles.nav_color}`}`}>
      <div className={styles.container}>
        <div className={styles.container_logo}>
          <Link href='/'>
            <a>
              <Image
                alt='Alla Prima Logo'
                src={logo}
                width='82px'
                height='95px'
                ></Image>
            </a>
          </Link>
              <h2>Alla Prima Coffee Roasters</h2>
        </div>
        {/* <div className={styles.container_inner}> */}
        <div className={styles.container_links}>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/menu'>
            <a>Menu</a>
          </Link>
          <Link href='/contact'>
            <a>Contact</a>
          </Link>
          <Link href='/about'>
            <a>About us</a>
          </Link>
          <Link href='/cart' passHref>
            <div className={styles.container_inner}>
              <div className={styles.cart}>
                <Image src='/img/cart.png' alt='' width='30px' height='30px' />
                <div className={styles.counter}>1</div>
              </div>
            </div>
          </Link>
        </div>
        {/* </div> */}
      </div>
      {/* <Link href='/cart' passHref>
        <div className={styles.container_inner}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='' width='30px' height='30px' />
            <div className={styles.counter}>1</div>
          </div>
        </div>
      </Link> */}
    </div>
  );
}

export default Navbar