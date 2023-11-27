'use client'
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

import '../styles/todolist.css'

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [aviso, setAviso] = useState({
        nomedescricao: '',
        descricao: '',
        professoresid: ''
    });
    const [avisos, setAvisos] = useState([]);
    const [professores, setProfessores] = useState([]);
    
    useEffect(() => {
        // Buscar a lista de professores ou avisos do backend
        axios.get("http://localhost:8080/api/avisos/")
            .then(response => {
                setAvisos(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAviso({
            ...aviso,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Enviar o aviso para o backend
        axios.post("http://localhost:8080/api/avisos/", aviso)
            .then(result => {
                console.log(result);
                alert("Aviso cadastrado com sucesso");
                toggle(); // Fechar o modal após o cadastro
            })
            .catch(error => {
                console.error("Erro ao cadastrar o aviso", error);
            });
    }

    
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

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Nome tarefa</label>
                    <input
                        type="text"
                        className="form-control"
                        value={aviso.nomedescricao}
                        onChange={handleChange}
                        name="nomedescricao"
                    />
                </div>
                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        rows="5"
                        className="form-control"
                        value={aviso.descricao}
                        onChange={handleChange}
                        name="descricao"
                    />
                </div>
                <div>
                    <label className="form-group">Professores</label>
                    <select
                        onChange={handleChange}
                        name="professoresid"
                        className="form-control"
                        required
                    >
                        <option value="">Selecione professor</option>
                        {professores.map(professor => (
                            <option key={professor.id} value={professor.id}>
                                {professor.usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Create
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateTaskPopup;
