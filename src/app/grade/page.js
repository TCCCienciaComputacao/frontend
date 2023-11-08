'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import GradeHorarios from "./GradeHorarios.js"; // Importe o componente GradeHorarios

export default function Grade() {
    const [turmas, setTurmas] = useState([]);
    const [gradeGerada, setGradeGerada] = useState([]);

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
