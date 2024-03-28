import React from 'react'
import styles from '../../styles/styles';
import { navItems } from '../../static/data';
import { Link } from 'react-router-dom';

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
        {
            navItems?.map((item,index) => (
                <div>
                    <Link to = {item.url} key={index}
                        className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[20px] 800px:pb-0  font-[500] px-6 cursor-pointer"}`}
                    >
                        {item.title}
                    </Link>
                </div>

            ))
        }
    </div>
  )
}

export default Navbar;