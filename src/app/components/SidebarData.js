import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Início',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },    

    {
        title: 'Chat',
        path: '/chat',
        icon: <IoIcons.IoIosChatboxes/>,
        cName: 'nav-text'
    },   
    {
        title: 'Calendário',
        path: '/calendario',
        icon: <IoIcons.IoIosCalendar/>,
        cName: 'nav-text'
    },    

    {
        title: 'Turma',
        path: '/turma',
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },   

   

    {
        title: 'Suporte',
        path: '/Suporte',
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: 'nav-text'
    },   

    {
        title: 'Configuração',
        path: '/Suporte',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text'
    },   


]
    