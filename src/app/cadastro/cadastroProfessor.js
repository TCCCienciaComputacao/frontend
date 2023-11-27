"use client"

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/register.css';
import logo from '../assets/logo.svg';

export default function cadastroProfessor() {

  const [professor, setProfessor] = useState({formacaoacademica: '', datacontratacao: ''});
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);


  const validateForm = () => {
    let valid = true;

    if (professor.formacaoacademica.trim() === '') {
      setError('* Campo de formação academica é obrigatório');
      valid = false;
    } else if (professor.datacontratacao.trim() === '') {
      setError('* Campo data de contratação é obrigatório');
      valid = false;
    } else {
      setError('');
    }
    return valid;
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

  };


  const handleLogin = (e) => {
    e.preventDefault();
    let params = {
      formacaoacademica: professor.formacaoacademica,
      datacontratacao: professor.datacontratacao,
    };

    if (validateForm()) {
      Axios.post('http://localhost:8080/api/professores/', params)
        .then((res) => {
          console.log(res);
          alert('Professor cadastrado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao cadastrar professor:', error);
          setShowError(true);
        });
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-form-title">Cadastra-se</span>
            <span className="login-form-title-img">
              <img src={logo} alt="" />
            </span>

            <div className="input-group">
              <div className="wrap-input">
                <input
                  className={professor.formacaoacademica !== '' ? 'has-val input' : 'input'}
                  type="email"
                  value={professor.formacaoacademica}
                  onChange={(e) => handleInputChange(e, 'formacaoacademica')}
                  required
                />
                <span className="focus-input" data-placeholder="Formação acadêmica"></span>
              </div>

              <div className="wrap-input">
                <input
                  type="date"
                  className='has-val input'
                  name="date"
                  value={professor.datacontratacao}
                  onChange={(e) => handleInputChange(e, 'datacontratacao')}
                  required
                />
                <span className="focus-input" data-placeholder="Data de contratação"></span>
              </div>
        
            </div>

            {showError && <span className="error-message">{error}</span>}

            <div className="container-login-form-btn">
              <button className="login-form-btn">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
