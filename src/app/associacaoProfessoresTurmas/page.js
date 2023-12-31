'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function grade() {
    const [turmaProfessor, setTurmaProfessor] = useState({ turmas: '', professores: '' })
    const [turmasProfessores, setTurmasProfessores] = useState([])
    const [turmas, setTurmas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [atualizar, setAtualizar] = useState();
    const navigate = useNavigate();
    

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    function getTurmaNome(turmaid) {
        const turma = turmas.find(t => t.id === turmaid);

        if (turma) {
            return turma.nometurma;
        }

        return 'turma não encontrada';
    }

    function preencherCampos(turPro) {
        const id = turPro.id || '';
        const turmaId = turPro.turmas ? turPro.turmas.id : '';
        const professorId = turPro.professores ? turPro.professores.id : '';
        const navigate = useNavigate();

        setTurmaProfessor({
            id: id,
            turmas: turmaId,
            professores: professorId
        });
    }

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

    useEffect(() => {
        async function fetchProfessores() {
            try {
                const response = await axios.get('http://localhost:8080/api/turmasprofessores/professores');
                setTurmasProfessores(response.data);
            } catch (error) {
                console.log('Erro ao buscar as associações de turmas e professores', error);
            }
        }

        fetchProfessores();
    }, [atualizar]);

    function handleSubmit(event) {
        event.preventDefault();

        const turmaId = turmaProfessor.turmas;
        const professorId = turmaProfessor.professores;

        if (!turmaId || !professorId) {
            console.error("ID da turma ou do professor não selecionado!");
            return;
        }

        if (turmaProfessor.id === undefined) {
            console.log("inserir");

            let params = {
                turmas: { id: turmaId },
                professores: { id: professorId }
            }

            axios
                .post(`http://localhost:8080/api/turmasprofessores/${turmaId}/${professorId}`, params)
                .then(result => {
                    alert("Associação feita com sucesso!");
                    setAtualizar(result);
                })
                .catch(error => {
                    console.error("Erro ao cadastrar associação: ", error);
                });
        } else {
            let params = {
                turmas: { id: turmaId },
                professores: { id: professorId }
            }
            axios
                .put(`http://localhost:8080/api/turmasprofessores/${turmaProfessor.id}`, params)
                .then(result => {
                    alert("Associação alterada com sucesso!");
                    setAtualizar(result);
                })
                .catch(error => {
                    console.error("Erro ao alterar associação: ", error);
                });
        }

        limpar();
    }

    function excluir(id) {
        axios.delete(`http://localhost:8080/api/turmasprofessores/${id}`)
            .then(response => {
                if (response.status === 204) {
                    setAtualizar(!atualizar);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir associação:', error);
            });
    }

    function limpar() {
        setTurmaProfessor({ turmas: '', professores: '' })
    }



    function handleChange(event) {
        const { name, value } = event.target;

        setTurmaProfessor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <div className="container">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
                <h2>Associação de turma aos professores</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-6">
                        <div>
                            <label className="form-label">Turmas</label>
                            <select
                                onChange={handleChange}
                                name="turmas"
                                className="form-select"
                                id="turmas"
                                required
                                value={turmaProfessor.turmas}
                            >
                                <option value="">Selecione uma turma</option>
                                {turmas.map((turma) => (
                                    <option key={turma.id} value={turma.id}>
                                        {turma.nometurma}
                                    </option>
                                ))}
                            </select>
                           
                            <label className="form-label">Professores</label>
                            <select
                                onChange={handleChange}
                                name="professores"
                                className="form-select"
                                id="professores"
                                required
                                value={turmaProfessor.professores}
                            >
                                <option value="">Selecione um professor</option>
                                {professores.map((professor) => (
                                    <option key={professor.id} value={professor.id}>
                                        {professor.usuario.nome}
                                    </option>
                                ))}
                            </select>
                            <br />

                            <input type="submit" value="Cadastrar" className="btn btn-success"></input>
                            <br />
                        </div>
                    </div>&nbsp;&nbsp;
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Professor</th>
                            <th scope="col">Turma</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmasProfessores.map(turPro => (
                            <tr key={turPro.id}>
                                <td>{turPro.nomeProfessor}</td>
                                <td>{turPro.nomeTurma}</td>
                                <td>
                                    <button
                                        onClick={() => preencherCampos(turPro)}
                                        className="btn btn-primary"
                                    >
                                        Alterar
                                    </button>

                                    &nbsp;&nbsp;
                                    <button onClick={() => excluir(turPro.id)} className="btn btn-danger">
                                        Excluir
                                    </button>
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
    );
}
