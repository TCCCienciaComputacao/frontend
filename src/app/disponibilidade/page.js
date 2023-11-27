'use client'
import React, { useState } from 'react';
import '../styles/disponibilidade.css';
import { useNavigate } from "react-router-dom"; 

export default function Disponibilidade() {
    const [disponibilidades, setDisponibilidades] = useState([
        { id: Math.random(), dia: '', horario: '', ambos: false }
    ]);

    const navigate = useNavigate();
    const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };
    
    const addDisponibilidade = () => {
        setDisponibilidades([...disponibilidades, { id: Math.random(), dia: '', horario: '', ambos: false }]);
    };

    const removeDisponibilidade = (id) => {
        const updatedDisponibilidades = disponibilidades.filter((item) => item.id !== id);
        setDisponibilidades(updatedDisponibilidades);
    };

    const handleChange = (id, field, value) => {
        const updatedDisponibilidades = disponibilidades.map((item) => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setDisponibilidades(updatedDisponibilidades);
    };

    const cadastrarDisponibilidade = () => {
        console.log('Disponibilidades a serem cadastradas:', disponibilidades);
        // Implemente a lógica para enviar as disponibilidades para o servidor
    };

    return (
        <div className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

            <h2>Cadastro de disponibilidade</h2>
            {disponibilidades.map((disponibilidade, index) => (
                <div key={disponibilidade.id}>
                    <select
                        value={disponibilidade.dia}
                        onChange={(e) => handleChange(disponibilidade.id, 'dia', e.target.value)}
                        className="form-select"
                    >
                        <option value="">Selecione o dia</option>
                        {diasSemana.map((dia, idx) => (
                            <option key={idx} value={dia}>
                                {dia}
                            </option>
                        ))}
                    </select>&nbsp;&nbsp;

                    <div>
                        <label>
                            Aula 1:
                            <input
                                type="checkbox"
                                checked={disponibilidade.horario === 'horario1'}
                                onChange={(e) =>
                                    handleChange(disponibilidade.id, 'horario', e.target.checked ? 'horario1' : '')
                                }
                            />
                        </label>&nbsp;&nbsp;

                        <label>
                            Aula 2:
                            <input
                                type="checkbox"
                                checked={disponibilidade.horario === 'horario2'}
                                onChange={(e) =>
                                    handleChange(disponibilidade.id, 'horario', e.target.checked ? 'horario2' : '')
                                }
                            />
                        </label>&nbsp;&nbsp;

                        <label>
                            Ambos:
                            <input
                                type="checkbox"
                                checked={disponibilidade.ambos}
                                onChange={(e) => handleChange(disponibilidade.id, 'ambos', e.target.checked)}
                            />
                        </label>&nbsp;&nbsp;
                    </div>
                            
                    <button onClick={() => removeDisponibilidade(disponibilidade.id)} className="btn btn-danger">
                        Remover
                    </button>&nbsp;&nbsp;
                </div>
            ))}&nbsp;&nbsp;

            <button onClick={addDisponibilidade} className="btn btn-success">
                Adicionar mais disponibilidade
            </button>&nbsp;&nbsp;
            <button onClick={cadastrarDisponibilidade} className="btn btn-success">
                Cadastrar Disponibilidade
            </button>&nbsp;&nbsp;

            <button onClick={handleVoltar} className="btn btn-danger">
                            Voltar
                        </button>
        </div>
    );
}
