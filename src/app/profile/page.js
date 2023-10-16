'use client'

import '../styles/profile.css'
import NavBar from '../navBar/page';
// import Logo from '../assets/user.png';
import React, { useState, Image } from 'react';
import { FaIdCard } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


export default function Home() {

    return (

        <body >
            <NavBar></NavBar>
            <div className="title-bar">
                <h1>DADOS DO CADASTRO</h1>
            </div>
            <div className='content-area'>

                <div className="container">
                    <div className="container-elemento">
                        <img src={"https://perfil.napratica.org.br/assets/v2020/testepersonalidade-77d5e996bbe11f2e3429c0bd09753cb6d74d0c8fd29b4840653848a32c93c1da.png"} className='img' alt="logo do perfil" />
                        <h1>NOME teste ALUNO</h1>
                        <p><FaIdCard /> R555742</p>
                        <p><FaInfo /> ATIVO</p>
                        <p><FaUniversity /> ARARAQUARA</p>
                        <p><FaUsers /> 08/CC8P52</p>
                    </div>

                    <div className="elemento">
                        <p>Nome: Nome Completo Aluno</p>
                        <p>Curso: Ciencia da Computacao</p>
                        <p>Campus: Araraquara</p>
                        <p>Situacao: Ativo</p>
                        <p>Serie/Turma: 08/CC8P52</p>
                        <p>Ingresso: Vestibular</p>
                        <p>Matriculado em: 10/07/2023</p>
                        <p>Sexo: Masculino</p>
                        <p>Data Nascimento: 31/12/1999</p>
                        <p>UF Nascimento: SP</p>
                        <p>Naturalidade: Araraquara</p>
                    </div>
                </div>
            </div>


        </body>
    )
}