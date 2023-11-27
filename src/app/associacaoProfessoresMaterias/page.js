'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function grade() {
    const [materiaProfessor, setmateriaProfessor] = useState({ materias: '', professores: '' })
    const [materiasProfessores, setmateriasProfessores] = useState([])
    const [materias, setmaterias] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [atualizar, setAtualizar] = useState();
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/home'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };


    function preencherCampos(matPro) {
        const id = matPro.id || '';
        const materiaId = matPro.materias ? matPro.materias.id : '';
        const professorId = matPro.professores ? matPro.professores.id : '';

        setmateriaProfessor({
            id: id,
            materias: materiaId,
            professores: professorId
        });
    }

    useEffect(() => {
        async function fetchmaterias() {
            try {
                const response = await axios.get('http://localhost:8080/api/materias/');
                setmaterias(response.data);
            } catch (error) {
                console.error('Erro ao buscar as materias:', error);
            }
        }

        fetchmaterias();
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
                const response = await axios.get('http://localhost:8080/api/materiasprofessores/professores');
                setmateriasProfessores(response.data);
            } catch (error) {
                console.log('Erro ao buscar as associações de materias e professores', error);
            }
        }

        fetchProfessores();
    }, [atualizar]);

    function handleSubmit(event) {
        event.preventDefault();

        const materiaId = materiaProfessor.materias;
        const professorId = materiaProfessor.professores;
        const id = materiaProfessor.id;

        if (!materiaId || !professorId) {
            console.error("ID da materia ou do professor não selecionado!");
            return;
        }

        if (materiaProfessor.id === undefined) {
            console.log("inserir");
    
            let params = {
                materias: { id: materiaId },
                professores: { id: professorId }
            }

            axios
                .post(`http://localhost:8080/api/materiasprofessores/${materiaId}/${professorId}`, params)
                .then(result => {
                    alert("Associação feita com sucesso!");
                    setAtualizar(result);
                })
                .catch(error => {
                    console.error("Erro ao cadastrar associação: ", error);
                });
        } else {
            let params = {
                id: id,
                materias: { id: materiaId },
                professores: { id: professorId }
            }
            axios
                .put(`http://localhost:8080/api/materiasprofessores/${materiaProfessor.id}`, params)
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
        axios.delete(`http://localhost:8080/api/materiasprofessores/${id}`)
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
        setmateriaProfessor({ materias: '', professores: '' })
    }

    function handleChange(event) {
        const { name, value } = event.target;
    
        setmateriaProfessor(prevState => ({
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
                <h2>Associação de matéria aos professores</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-6">
                        <div>
                            
                            <select
                                onChange={handleChange}
                                name="materias"
                                className="form-select"
                                id="materias"
                                required
                                value={materiaProfessor.materias}
                            >
                                <option value="">Selecione a matéria</option>
                                {materias.map((mat) => (
                                    <option key={mat.id} value={mat.id}>
                                        {mat.nomemateria}
                                    </option>
                                ))}
                            </select>&nbsp;&nbsp;

                           
                            <select
                                onChange={handleChange}
                                name="professores"
                                className="form-select"
                                id="professores"
                                required
                                value={materiaProfessor.professores}
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
                        </div>&nbsp;&nbsp;
                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Professor</th>
                            <th scope="col">Matérias</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiasProfessores.map(matPro => (
                            <tr key={matPro.id}>
                                <td>{matPro.nomeProfessor}</td>
                                <td>{matPro.nomeMateria}</td>
                                <td>
                                    <button
                                        onClick={() => preencherCampos(matPro)}
                                        className="btn btn-primary"
                                    >
                                        Alterar
                                    </button>

                                    &nbsp;&nbsp;
                                    <button onClick={() => excluir(matPro.id)} className="btn btn-danger">
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
