'use client'

import React, { useState } from 'react';
import logo from './assets/logo.svg';
import styles from './styles/login.css';
import Axios from "axios";

export default function Home(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(""); // Estado para a mensagem de erro
    const [showError, setShowError] = useState(false); // Estado para controlar a exibição da mensagem

    const validateForm = () => {
        let valid = true;
    
        if (email.trim() === "") {
          setError("* Campo de email é obrigatório");
          valid = false;
        } else if (password.trim() === "") {
          setError("* Campo de senha é obrigatório");
          valid = false;
        } else {
          setError(""); // Limpa a mensagem de erro se não houver erro
        }
    
        return valid;
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
        let params = {
          email: email,
          password: password,
        }
        console.log(params);

        if (validateForm()) {
          // Lógica de login aqui, redirecione ou faça o que for necessário
          Axios.post("http://localhost:3000/", params).then((res) => {
            console.log(res);
          });

          console.log("Login bem-sucedido!");
        } else {
          setShowError(true); // Exibe a mensagem de erro se houver erro
        }
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de senha
      };
    
      

    return(
        
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form" action='http://localhost:3000/home' onSubmit={handleLogin}>
                        <span className="login-form-title">Seja bem vindo!</span>
                        <span className="login-form-title-img">
                            <img src={logo} alt="" />
                        </span>

                        <div className="wrap-input">
                           <input className={email !== "" ? "has-val input" : "input"} type="email" value={email} onChange={handleEmailChange}/>
                           <span className="focus-input" data-placeholder="email"></span>
                        </div>
                        
                        <div className="wrap-input">
                           <input className={password !== "" ? "has-val input" : "input"} type="password" value={password} onChange={handlePasswordChange}/>
                           <span className="focus-input" data-placeholder="senha"></span>
                        </div>
                            
                        {showError && <span className="error-message">{error}</span>}
                        
                        <div className='container-login-form-btn'>
                            <button className='login-form-btn'>Login</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

    );
    
}