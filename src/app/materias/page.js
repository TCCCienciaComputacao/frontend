'use client'

import React, { useState, useEffect } from "react";
import  NavBar from '../components/navbar';
import axios from "axios";
import '../styles/gridturma.css'
import { useNavigate } from "react-router-dom"; 

export default function GridMaterias() {
    const [materia, setMateria] = useState({ nomemateria: '', descricaomateria: '' });
    const [materias, setMaterias] = useState([]);
    const [atualizar, setAtualizar] = useState();
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    useEffect(() => {
        async function fetchTurmas() {
            try {
                const response = await axios.get('http://localhost:8080/api/materias/');
                setMaterias(response.data);
            } catch (error) {
                console.error('Erro ao buscar as materias:', error);
            }
        }

        fetchTurmas();
    }, [atualizar]);

    function handleChange(event) {
            setMateria({ ...materia, [event.target.name]: event.target.value });

    }

    function limpar(){
        setMateria({ nomemateria: '', descricaomateria: ''}) 
    }

    function HandleSubmit(event) {
        event.preventDefault();
        if (materia.id == undefined) {
            console.log("inserir")
            axios.post("http://localhost:8080/api/materias/", materia).then(result => {
                alert("Turma cadastrada com sucesso")
                setAtualizar(result);

            });
        } else {
            axios.put("http://localhost:8080/api/materias/", materia).then(result => {
                alert("Turma cadastrada com sucesso")
                setAtualizar(result);

            });
        }

        limpar();

    }

    function excluir(id){
        axios.delete("http://localhost:8080/api/materias/"+id).then(result => {
            setAtualizar(result);
        });

       
    }

    return (
        
        <div>    
            
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

            <div className="container">
                <h2>Cadastro de Matéria</h2>
                <form onSubmit={HandleSubmit}>
                    <div className="col-6">

                        <div>
                            <label className="form-label">Nome da matéria</label>
                            <input onChange={handleChange} value={materia.nomemateria} name="nomemateria" type="text" className="form-control" required />
                        </div>

                        <div>
                            <label className="form-label">Descrição</label>
                            <input onChange={handleChange} value={materia.descricaomateria} name="descricaomateria" type="text" className="form-control" required />
                        </div>
                        <br />
                        <input type="submit" value="Cadastrar" className="btn btn-success"></input>

                    </div>&nbsp;&nbsp;
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.map(mat => (
                            <tr key={mat.id}>
                                <td>{mat.nomemateria}</td>
                                <td>{mat.descricaomateria}</td>
                                <td>
                                    <button onClick={() => setMateria(mat)} className="btn btn-primary">Alterar</button>&nbsp;&nbsp;
                                    <button onClick={() => excluir(mat.id)} className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <button onClick={handleVoltar} className="btn btn-danger">
                            Voltar
                        </button>
            </div>
        </div>
    )
}
