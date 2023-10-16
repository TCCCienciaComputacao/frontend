'use client'

import '../styles/navBar.css'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

import React, { useState } from 'react';
import Link from 'next/link'
import { SidebarData } from './SidebarData'

export default function NavBar() {
    const [sidebar, setSideBar] = useState(false);
    const showSidebar = () => setSideBar(!sidebar);

    return (
        <>
            <div className='navbar'>
                <Link href='#' className='IconMenu'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <div className='Icon-area'>
                    <div className='IconNotification'>
                        <IoIcons.IoIosNotificationsOutline />
                    </div>
                    <div className='IconContact'>
                        <IoIcons.IoIosContact />
                    </div>
                </div>


            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link href='#' className='IconMenu'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link href={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}


                </ul>
            </nav>

        </>
    );
}
