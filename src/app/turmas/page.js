'use client'


import axios from "axios";
import React, { useState, useEffect } from 'react';
import '../styles/turma.css'

export default function TurmasPagina() {
    const [turmas, setTurmas] = useState([]);
  
    useEffect(() => {
      async function fetchTurmas() {
        try {
          const response = await axios.get('http://localhost:8080/api/turmas/');
          setTurmas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as turmas:', error);
        }
      }
  
      fetchTurmas();
    }, []);
  
    return (
      <div>
        <h1>Grade de Turmas</h1>
        <table className="turmas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Turma</th>
              <th>Nível/Ano</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id}>
                <td>{turma.id}</td>
                <td>{turma.nometurma}</td>
                <td>{turma.nivelano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
