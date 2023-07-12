'use client'

import logo from '../assets/logo.svg'
import React, { useState } from 'react';
import '../styles/register.css'

export default function Register(){
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    return(
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form">
                        <span className="login-form-title">Cadastra-se</span>
                        <span className="login-form-title-img">
                            <img src={logo} alt="" />
                        </span>

                        <div className="wrap-input">
                            <input className={name !== "" ? "has-val input" : "input"} type='text' value={name} onChange={e => setName(e.target.value)}/>
                            <span className="focus-input" data-placeholder="Nome"></span>
                        </div>
                        <div className="wrap-input">
                            <input className={lastName !== "" ? "has-val input" : "input"} type='text' value={lastName} onChange={e => setLastName(e.target.value)}/>
                            <span className="focus-input" data-placeholder="Sobrenome"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={email !== "" ? "has-val input" : "input"} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                           <span className="focus-input" data-placeholder="email"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={password !== "" ? "has-val input" : "input"} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                           <span className="focus-input" data-placeholder="senha"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={ConfirmPassword !== "" ? "has-val input" : "input"} type="password" value={ConfirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                           <span className="focus-input" data-placeholder="Confirmar senha"></span>
                        </div>

                        <div className='container-login-form-btn'>
                            <button className='login-form-btn'>cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}