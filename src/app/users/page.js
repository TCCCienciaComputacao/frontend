'use client'

import react, { useEffect, useState } from "react";
import {FaTrash , FaEdit} from "react-icons";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import '../styles/users.css'
import  Form from '../users/form';
import Grid from '../users/grid'

export default function users(){
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try{
            const res = await axios.get("http://localhost:3000/users");
            setUsers(res.data.sort((a,b) => (a.nome > b.nome  ? 1 : -1)))
            console.log(res);
        }catch(error){
            toast.error(error);
        }
    };
    useEffect(() => {
        getUsers();

    }, [setUsers]);


    return(
        <div className="container">
            <h2>USUÁRIOS</h2>
            <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
            <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        </div>
        
    );
}