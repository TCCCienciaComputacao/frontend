'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/gridturma.css'

export default function GridTurmas() {
    const [turma, setTurma] = useState({ nometurma: '', nivelano: '', periodosid: ''});
    const [periodos, setPeriodos] = useState([]);
   

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

    function HandleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8080/api/turmas/", turma).then(result => {
            console.log(result);
            alert("Turma cadastrada com sucesso")
        });
    }

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

            <div className="container">
                <h1>Cadastro</h1>
                <form onSubmit={HandleSubmit}>
                    <div className="col-6">

                        <div>
                            <label className="form-label">Nome da Turma</label>
                            <input onChange={handleChange} value={turma.nometurma} name="nometurma" type="text" className="form-control" required/>
                        </div>

                        <div>
                            <label className="form-label">Semestre</label>
                            <input onChange={handleChange} value={turma.nivelano} name="nivelano" type="text" className="form-control" required/>
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
                        <br/>
                        <input type="submit" value="Cadastrar" className="btn btn-success"></input>

                    </div>
                </form>
            </div>
        </div>
    )
}
