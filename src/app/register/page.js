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
    const [error, setError] = useState(""); // Estado para a mensagem de erro
    const [showError, setShowError] = useState(false); // Estado para controlar a exibição da mensagem

    const validateForm = () => {
        let valid = true;
    
        if (name.trim() === "") {
          setError("* Campo de nome é obrigatório");
          valid = false;
        } else if (lastName.trim() === "") {
          setError("* Campo de sobrenome é obrigatório");
          valid = false;
        }else if (email.trim() === "") {
            setError("* Campo email é obrigatório");
            valid = false;
        } else if(password.trim() === ""){
            setError("* Campo senha é obrigatório");
            valid = false;
        }   else if(ConfirmPassword.trim() === ""){
           setError("* Campo confirmar senha é obrigatório");
           valid = false;
        }  else {
          setError(""); // Limpa a mensagem de erro se não houver erro
        }
    
        return valid;
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          // Lógica de login aqui, redirecione ou faça o que for necessário
          console.log("Login bem-sucedido!");
        } else {
          setShowError(true); // Exibe a mensagem de erro se houver erro
        }
      };
    
      const handleNameChange = (e) => {
        setName(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

      const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de senha
      };

      const handleConfirmPassowordChange = (e) => {
        setConfirmPassword(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };


    return(
        <div className="container">
            <div className="container-login">
                <div className="wrap-login">
                    <form className="login-form" onSubmit={handleLogin}>
                        <span className="login-form-title">Cadastra-se</span>
                        <span className="login-form-title-img">
                            <img src={logo} alt="" />
                        </span>

                        <div className="wrap-input">
                            <input className={name !== "" ? "has-val input" : "input"} type='text' value={name} onChange={handleNameChange}/>
                            <span className="focus-input" data-placeholder="Nome"></span>
                        </div>
                        <div className="wrap-input">
                            <input className={lastName !== "" ? "has-val input" : "input"} type='text' value={lastName} onChange={handleLastNameChange}/>
                            <span className="focus-input" data-placeholder="Sobrenome"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={email !== "" ? "has-val input" : "input"} type="email" value={email} onChange={handleEmailChange}/>
                           <span className="focus-input" data-placeholder="email"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={password !== "" ? "has-val input" : "input"} type="password" value={password} onChange={handlePasswordChange}/>
                           <span className="focus-input" data-placeholder="senha"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={ConfirmPassword !== "" ? "has-val input" : "input"} type="password" value={ConfirmPassword} onChange={handleConfirmPassowordChange}/>
                           <span className="focus-input" data-placeholder="Confirmar senha"></span>
                        </div>

                        {showError && <span className="error-message">{error}</span>}

                        <div className='container-login-form-btn'>
                            <button className='login-form-btn'>cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}