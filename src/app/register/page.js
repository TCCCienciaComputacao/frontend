'use client'

import logo from '../assets/logo.svg'
import React, { useState } from 'react';
import Axios from "axios"
import InputMask from 'react-input-mask';
import '../styles/register.css'
import { Router } from 'react-router';

export default function Register(){
    const [nome, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [smartphone, setSmartphone] = useState("")
    const [date, setDate] = useState("")
    const [cep, setCep] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(""); // Estado para a mensagem de erro
    const [showError, setShowError] = useState(false); // Estado para controlar a exibição da mensagem

    const validateForm = () => {
        let valid = true;
    
        if (nome.trim() === "") {
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
        }else if(smartphone.trim() === ""){
          setError("* Campo celular  é obrigatório");
          valid = false;
        } else if(date.trim() === ""){
          setError("* Campo data de nascimento  é obrigatório");
          valid = false;
        }else if(cep.trim() === ""){
          setError("* Campo CEP é obrigatório");
          valid = false;
        }else if(city.trim() === ""){
          setError("* Campo cidade é obrigatório");
          valid = false;
        }else if (uf.trim() === ""){
          setError("* Campo UF  é obrigatório");
          valid = false;
        }else if(password != ConfirmPassword){
          setError("*Senhas estão Diferentes");
          valid = false;
        }
         else {
          setError(""); // Limpa a mensagem de erro se não houver erro
        }
    
        return valid;
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
        let params = {
          nome: nome,
          sobrenome: lastName,
          email: email,
          celular: smartphone,
          dataNascimento: date,
          cep: cep,
          cidade: city,
          uf:uf,
          senha: password,
        }
        console.log(params);

        if (validateForm()) {
          Axios.post("http://localhost:8080/register/", params).then((res) => {
          console.log(res);
          alert('Usuário cadastrado com Sucesso');
        })
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

      const handleSmartphoneChange = (e) => {
        setSmartphone(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

      const handleDateChange = (e) => {
        setDate(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

      const handleCepChange = (e) => {
        setCep(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

      const handleCityChange = (e) => {
        setCity(e.target.value);
        setShowError(false); // Oculta a mensagem de erro quando o usuário começa a preencher o campo de email
      };

      const handleUfChange = (e) => {
        setUf(e.target.value);
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

                      <div className='input-group'>
                        <div className="wrap-input">
                            <input className={nome !== "" ? "has-val input" : "input"} type='text' value={nome} onChange={handleNameChange} required/>
                            <span className="focus-input" data-placeholder="Nome"></span>
                        </div>
                        <div className="wrap-input">
                            <input className={lastName !== "" ? "has-val input" : "input"} type='text' value={lastName} onChange={handleLastNameChange} required/>
                            <span className="focus-input" data-placeholder="Sobrenome"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={email !== "" ? "has-val input" : "input"} type="email" value={email} onChange={handleEmailChange} required/>
                           <span className="focus-input" data-placeholder="Email"></span>
                        </div>
                        <div className="wrap-input">
                           <InputMask className={smartphone !== "" ? "has-val input" : "input"} mask="(99)99999-9999" nome="number "value={smartphone} onChange={handleSmartphoneChange} required/>
                           <span className="focus-input" data-placeholder="Celular"></span>
                        </div>
                        <div className="wrap-input">
                           <InputMask className={date !== "" ? "has-val input" : "input"} mask="9999-99-99" nome="date "value={date} onChange={handleDateChange} required/>
                           <span className="focus-input" data-placeholder="Data de nascimento"></span>
                        </div>
                        <div className="wrap-input">
                           <InputMask className={cep !== "" ? "has-val input" : "input"} mask="99999-999" nome="number "value={cep} onChange={handleCepChange} required/>
                           <span className="focus-input" data-placeholder="CEP"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={city !== "" ? "has-val input" : "input"} type="text" nome="city "value={city} onChange={handleCityChange} required/>
                           <span className="focus-input" data-placeholder="Cidade"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={uf !== "" ? "has-val input" : "input"} type="text" nome="uf "value={uf} onChange={handleUfChange} maxLength={2} required/>
                           <span className="focus-input" data-placeholder="UF"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={password !== "" ? "has-val input" : "input"} type="password" value={password} onChange={handlePasswordChange} required/>
                           <span className="focus-input" data-placeholder="Senha"></span>
                        </div>
                        <div className="wrap-input">
                           <input className={ConfirmPassword !== "" ? "has-val input" : "input"} type="password" value={ConfirmPassword} onChange={handleConfirmPassowordChange} required/>
                           <span className="focus-input" data-placeholder="Confirmar senha"></span>
                        </div>

                        </div>

                        <div className='gender-inputs'>
                          <div className='gender-title'> 
                            <h5>Gênero</h5>
                          </div>

                          < div className='gender-group'>

                            <div className='gender-input'>
                              <input id='male' type='radio' nome='gender'/>
                              <label for="male">Masculino</label>
                            </div>

                            <div className='gender-input'>
                              <input id='female' type='radio' nome='gender'/>
                              <label for="female">Feminino</label>
                            </div>

                            <div className='gender-input'>
                              <input id='others' type='radio' nome='gender'/>
                              <label for="others">Outros</label>
                            </div>

                            <div className='gender-input'>
                              <input id='none' type='radio' nome='gender'/>
                              <label for="none">Prefiro não dizer</label>
                            </div>

                          </div>

                        </div>

                        <div className='optionType-inputs'>
                          <div className='type-title'> 
                            <h5>Tipo</h5>
                          </div>

                          < div className='type-group'>

                            <div className='type-input'>
                              <input id='student' type='radio' nome='type' />
                              <label for="student">Aluno</label>
                            </div>

                            <div className='type-input'>
                              <input id='teacher' type='radio' nome='type'/>
                              <label for="teacher">Professor</label>
                            </div>

                            <div className='type-input'>
                              <input id='coordinator' type='radio' nome='type'/>
                              <label for="coordinator">Coordenador</label>
                            </div>

                            <div className='type-input'>
                              <input id='administrator' type='radio' nome='type'/>
                              <label for="administrator">administrador</label>
                            </div>

                          </div>

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