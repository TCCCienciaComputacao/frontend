'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import GradeHorarios from "./GradeHorarios.js"; // Importe o componente GradeHorarios
import { useNavigate } from "react-router-dom"; 

export default function Grade() {
    const [turmas, setTurmas] = useState([]);
    const [gradeGerada, setGradeGerada] = useState([]);
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };
    
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

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const turmaId = event.target.turmaid.value;

        try {
            const response = await axios.get(`http://localhost:8080/aulas/${turmaId}`);
            setGradeGerada(response.data); // Armazena a grade gerada no estado
        } catch (error) {
            console.error('Erro ao gerar a grade:', error);
        }
    };

    return (
        <div className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
            <h2>Geração de grade</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-6">
                    <label className="form-label">Turmas</label>
                    <select name="turmaid" className="form-select" id="floatingSelectGrid" required>
                        <option value="">Selecione uma turma</option>
                        {turmas.map((turma) => (
                            <option key={turma.id} value={turma.id}>
                                {turma.nometurma}
                            </option>
                        ))}
                    </select>
                    <br />
                    <input type="submit" value="Gerar Grade" className="btn btn-success"></input>
                    <br />
                </div>
            </form>

            <div>
                &nbsp;&nbsp;
                <h3>Grade</h3>
                {/* Renderize a grade usando o componente GradeHorarios */}
                <GradeHorarios gradeData={convertToGradeData(gradeGerada)} />
            </div>

            <br />
            <input type="submit" value="Imprimir" className="btn btn-success"></input>


            <button onClick={handleVoltar} className="btn btn-danger">
                            Voltar
                        </button>
        </div>
    );
}

// Função para converter os dados da grade para o formato correto
function convertToGradeData(gradeGerada) {
    const gradeData = [];
    for (let i = 0; i < 5; i++) {
        gradeData.push(Array(2).fill("")); // Inicialize a matriz com valores vazios
    }
    gradeGerada.forEach((item) => {
        const periodo = item.periodo - 1;
        const hora = item.hora - 1;
        gradeData[periodo][hora] = item.professorName;
    });
    return gradeData;
}
