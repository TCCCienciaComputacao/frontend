'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Projeto TCC',
  description: 'Um projeto de gestão acadêmica',
};


import Login from "./page";
import Cadastro from "./cadastro/page";
import Turma from './turmas/page';
import Home from './home/page';
import Professores from './professores/page';
import AssociacaoProfessoresTurmas from './associacaoProfessoresTurmas/page';
import AssociacaoProfessoresMaterias from './associacaoProfessoresMaterias/page';
import Materias from './materias/page';
import Disponibilidade from './disponibilidade/page';
import Grade from './grade/page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/turmas",
    element: <Turma />
  },
  {
    path:"/home",
    element: <Home/>
  },
  {
    path:"/professores",
    element: <Professores/>
  },
  {
    path:"/associacaoProfessoresTurmas",
    element: <AssociacaoProfessoresTurmas/>
  },
  {
    path:"/associacaoProfessoresMaterias",
    element: <AssociacaoProfessoresMaterias/>
  },
  {
    path:"/materias",
    element: <Materias/>
  },
  {
    path:"/disponibilidade",
    element: <Disponibilidade/>
  },
  {
    path:"/grade",
    element: <Grade/>
  },
]);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./globals.css" />
      </head>
      <body className={inter.className}>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </body>
    </html>
  );
}
