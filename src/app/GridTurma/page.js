'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/gridturma.css'

export default function GridTurmas() {
    const [turma, setTurma] = useState({ nometurma: '', nivelano: '', periodosid: '' });
    const [periodos, setPeriodos] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [atualizar, setAtualizar] = useState();

    function getPeriodoNome(periodoid) {
        const periodo = periodos.find(p => p.id === periodoid);

        if (periodo) {
            return periodo.nomeperiodo;
        }

        return 'Período não encontrado';
    }

    // Função para buscar os períodos
    useEffect(() => {
        axios.get("http://localhost:8080/api/periodos/")
            .then(response => {
                setPeriodos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os períodos:', error);
            });
    }, []);

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
    }, [atualizar]);

    function handleChange(event) {
        
        if (event.target.name === "periodosid") {
            setTurma({
                ...turma,
                periodos: { id: event.target.value }
            });
        } else {
            setTurma({ ...turma, [event.target.name]: event.target.value });
        }
    }

    function limpar(){
        setTurma({ nometurma: '', nivelano: '', periodosid: '' }) 
    }

    function HandleSubmit(event) {
        event.preventDefault();
        if (turma.id == undefined) {
            console.log("inserir")
            axios.post("http://localhost:8080/api/turmas/", turma).then(result => {
                alert("Turma cadastrada com sucesso")
                setAtualizar(result);

            });
        } else {
            axios.put("http://localhost:8080/api/turmas/", turma).then(result => {
                alert("Turma cadastrada com sucesso")
                setAtualizar(result);

            });
        }

        limpar();

    }

    function excluir(id){
        axios.delete("http://localhost:8080/api/turmas/"+id).then(result => {
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
                <h2>Cadastro de turma</h2>
                <form onSubmit={HandleSubmit}>
                    <div className="col-6">

                        <div>
                            <label className="form-label">Nome da Turma</label>
                            <input onChange={handleChange} value={turma.nometurma} name="nometurma" type="text" className="form-control" required />
                        </div>

                        <div>
                            <label className="form-label">Semestre</label>
                            <input onChange={handleChange} value={turma.nivelano} name="nivelano" type="text" className="form-control" required />
                        </div>
                        <div>
                            <label className="form-label">Período</label>
                            <select onChange={handleChange} name="periodosid" className="form-select" id="floatingSelectGrid" required>
                                <option value="">Selecione um período</option>
                                {periodos.map((periodo) => (
                                    <option key={periodo.id} value={periodo.id}>
                                        {periodo.nomeperiodo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <input type="submit" value="Cadastrar" className="btn btn-success"></input>

                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Semestre</th>
                            <th scope="col">Periodo</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.map(tur => (
                            <tr key={tur.id}>
                                <td>{tur.nometurma}</td>
                                <td>{tur.nivelano}</td>
                                <td>{getPeriodoNome(tur.periodos.id)}</td>
                                <td>
                                    <button onClick={() => setTurma(tur)} className="btn btn-primary">Alterar</button>&nbsp;&nbsp;
                                    <button onClick={() => excluir(tur.id)} className="btn btn-danger">Excluir</button>&nbsp;&nbsp;
                                    <button className="btn btn-warning">Cancelar</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
