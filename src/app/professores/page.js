'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/gridturma.css'
import { useNavigate } from "react-router-dom"; 

export default function GridTurmas() {
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        async function fetchProfessores() {
            try {
                const response = await axios.get('http://localhost:8080/api/professores/');
                setProfessores(response.data);
            } catch (error) {
                console.log('Erro ao buscar os professores: ', error);
            }
        }

        fetchProfessores();
    }, []);

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    return (

        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

            <div className="container">
                <h2>Listagem de Professores</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Formação Acadêmica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professores.map(pro => (
                            <tr key={pro.id}>
                                <td>{pro.usuario.nome}</td>
                                <td>{pro.formacaoacademica}</td>
                            </tr>
                        ))}
                        <button onClick={handleVoltar} className="btn btn-danger">
                            Voltar
                        </button>

                    </tbody>
                </table>
            </div>

        </div>
    )
}
