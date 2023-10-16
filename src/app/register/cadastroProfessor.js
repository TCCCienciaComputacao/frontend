"use client"

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/register.css';
import logo from '../assets/logo.svg';

export default function cadastroProfessor() {
    
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    tipousuario: '',
    enderecoid: '', // Agora, vamos usar isso para armazenar a cidade selecionada
    celular: '',
    datanascimento: '',
    genero: '',
  });


  const [professor, setProfessor] = useState()
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Busque as cidades do servidor assim que o componente for montado
    Axios.get('http://localhost:8080/api/enderecos/')
      .then((response) => {
        setEnderecos(response.data); // Armazene as cidades no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar as cidades:', error);
      });
  }, []);

  const validateForm = () => {
    let valid = true;

    if (usuario.nome.trim() === '') {
      setError('* Campo de nome é obrigatório');
      valid = false;
    } else if (usuario.email.trim() === '') {
      setError('* Campo email é obrigatório');
      valid = false;
    } else if (usuario.senha.trim() === '') {
      setError('* Campo senha é obrigatório');
      valid = false;
    } else if (ConfirmPassword.trim() === '') {
      setError('* Campo confirmar senha é obrigatório');
      valid = false;
    } else if (usuario.celular.trim() === '') {
      setError('* Campo celular  é obrigatório');
      valid = false;
    } else if (usuario.datanascimento.trim() === '') {
      setError('* Campo data de nascimento  é obrigatório');
      valid = false;
    } else if (usuario.enderecoid === '') {
      setError('* Campo cidade é obrigatório');
      valid = false;
    } else if (usuario.senha !== ConfirmPassword) {
      setError('* Senhas estão diferentes');
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
      nome: usuario.nome,
      senha: usuario.senha,
      email: usuario.email,
      celular: usuario.celular,
      datanascimento: usuario.datanascimento,
      enderecos: {id: usuario.enderecoid},
      tipousuario: usuario.tipousuario,
      genero: usuario.genero,
    };

    if (validateForm()) {
      Axios.post('http://localhost:8080/api/usuarios/', params)
        .then((res) => {
          console.log(res);
          alert('Usuário cadastrado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao cadastrar usuário:', error);
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
                  className={usuario.nome !== '' ? 'has-val input' : 'input'}
                  type="text"
                  value={usuario.nome}
                  onChange={(e) => handleInputChange(e, 'nome')}
                  required
                />
                <span className="focus-input" data-placeholder="Nome"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={usuario.email !== '' ? 'has-val input' : 'input'}
                  type="email"
                  value={usuario.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  required
                />
                <span className="focus-input" data-placeholder="Email"></span>
              </div>

              <div className="wrap-input">
                <input
                  type="date"
                  className='has-val input'
                  name="date"
                  value={usuario.datanascimento}
                  onChange={(e) => handleInputChange(e, 'datanascimento')}
                  required
                />
                <span className="focus-input" data-placeholder="Data de nascimento"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={usuario.senha !== '' ? 'has-val input' : 'input'}
                  type="password"
                  value={usuario.senha}
                  onChange={(e) => handleInputChange(e, 'senha')}
                  required
                />
                <span className="focus-input" data-placeholder="Senha"></span>
              </div>
              <div className="wrap-input">
                <input
                  className={ConfirmPassword !== '' ? 'has-val input' : 'input'}
                  type="password"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="focus-input" data-placeholder="Confirmar senha"></span>
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
