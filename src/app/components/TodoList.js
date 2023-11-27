'use client'

import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import '../styles/menu.css';
import { useNavigate } from "react-router-dom"; 

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const navigate = useNavigate();

    const handleCadastro = () =>{
        return navigate('/turmas')
    }
    useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    const handleTurma = () => {
        navigate('/turmas'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    const handleAssociacaoTurmas = () => {
        navigate('/associacaoProfessoresTurmas'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };
    const handleCadastroMateria = () => {
        navigate('/materias'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };
    const handleAssociacaoMaterias = () => {
        navigate('/associacaoProfessoresMaterias'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    const handleCadastroDisponibilidade = () => {
        navigate('/disponibilidade'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    const handleProfessores = () => {
        navigate('/professores'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };

    const handleGrade = () => {
        navigate('/grade'); // Navegue de volta para a página inicial ao clicar no botão "Voltar"
    };


    return (
        <>
           <div className="header text-center"></div>
            <div className="container--total">
                <div className="flex--menu">
                    
                    <div class="flex2">

                        <div class="box2">
                            <button onClick={handleTurma}  class="btn btn-secondary btn--menus">Cadastro de Turma</button>
                        </div>
                        <div class="box2">
                            <button onClick={handleAssociacaoTurmas} class="btn btn-secondary btn--menus">Associação de Turmas aos Professores</button>
                        </div>
                        <div class="box2">
                            <button onClick={handleCadastroMateria} class="btn btn-secondary btn--menus">Cadastro de Matéria</button>
                        </div>
                        <div class="box2">
                            <button onClick={handleAssociacaoMaterias} class="btn btn-secondary btn--menus">Associação de Professores e Matérias</button>
                        </div>
                    </div>

                    <div class="flex3">
                        <div class="box3">
                            <button onClick={handleCadastroDisponibilidade} class="btn btn-secondary btn--menus">Cadastro de Disponibilidade</button>
                        </div>
                        <div class="box3">
                            <button onClick={handleProfessores} class="btn btn-secondary btn--menus">Listagem de Professores</button>
                        </div>
                        <div class="box3">
                            <button class="btn btn-secondary btn--menus">Calendário</button>
                        </div>
                        <div class="box3">
                            <button onClick={handleGrade}  class="btn btn-secondary btn--menus">Criar Grade</button>
                        </div>
                    </div>
                </div>

                <div className="task-container">
                    <div className="container--btn">
                        <button className="btn btn-danger mt-2" onClick={() => setModal(true)} >Criar aviso</button>
                    </div>
                    {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
                </div>
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />

        </>
    );
};

export default TodoList;