'use client'

import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import '../styles/login.css'

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return(
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form">
                        <span className="login-form-title">Seja bem vindo!</span>
                        <span className="login-form-title-img">
                            <img src={logo} alt="" />
                        </span>

                        <div className="wrap-input">
                           <input className={email !== "" ? "has-val input" : "input"} type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                           <span className="focus-input" data-placeholder="email"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={password !== "" ? "has-val input" : "input"} type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                           <span className="focus-input" data-placeholder="senha"></span>
                        </div>

                        <div className='container-login-form-btn'>
                            <button className='login-form-btn'>Login</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
    
}