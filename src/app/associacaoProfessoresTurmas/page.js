'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";


export default function grade() {
    const [turmaProfessor, setTurmaProfessor] = useState({ turmas: '', professores: '' })
    const [turmasProfessores, setTurmasProfessores] = useState([])
    const [turmas, setTurmas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [atualizar, setAtualizar] = useState();

    function getTurmaNome(turmaid) {
        const turma = turmas.find(t => t.id === turmaid);

        if (turma) {
            return turma.nometurma;
        }

        return 'turma não encontrada';
    }

    function preencherCampos(turPro) {
        const id = turPro.id || ''; // Se `turPro.id` não existir, atribua uma string vazia para evitar erros
        const turmaId = turPro.turmas ? turPro.turmas.id : ''; // Verifique se `turPro.turmas` existe antes de acessar `id`
        const professorId = turPro.professores ? turPro.professores.id : ''; // Verifique se `turPro.professores` existe antes de acessar `id`

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

        // Obtenha os IDs da turma e do professor de alguma forma, por exemplo, do estado ou campo de entrada.
        const turmaId = turmaProfessor.turmas.id;
        const professorId = turmaProfessor.professores.id;
        const idDaAssociacao = turmaProfessor.id;

        if (turmaProfessor.id === undefined) {
            console.log("inserir");
            axios
                .post(`http://localhost:8080/api/turmasprofessores/${turmaId}/${professorId}`, turmaProfessor)
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
                    // Atualize a lista de associações após a exclusão
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
        if (event.target.name === "turmaid") {
            setTurmaProfessor({
                ...turmaProfessor,
                turmas: { id: event.target.value }
            });
        }

        if (event.target.name === "professorid") {
            setTurmaProfessor({
                ...turmaProfessor,
                professores: { id: event.target.value }
            });
        }
    }


    return (
        <div>
            <div className="container">
                <h2>Associação de turma aos professores</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-6">
                        <div>
                            <label className="form-label">Turmas</label>
                            <select
                                onChange={(event) => handleChange(event)}
                                name="turmaid"
                                className="form-select"
                                id="floatingSelectGrid"
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
                                onChange={(event) => handleChange(event)}
                                name="professorid"
                                className="form-select"
                                id="floatingSelectGrid"
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
                    </div>
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
            </div>
        </div>
    );
}

