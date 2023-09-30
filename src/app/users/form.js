import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import '../styles/usersForm.css'

export default function Form({ getUsers, onEdit, setOnEdit }) {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.name;
            user.sobrenome.value = onEdit.lastName;
            user.email.value = onEdit.email;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = ref.current;

        if (!user.nome.value || !user.sobrenome.value || !user.email.value) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios.put("http://localhost:3000/users/" + onEdit.id, {
                nome: user.nome.value,
                lastName: user.sobrenome.value,
                email: user.email.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        user.nome.value = "";
        user.sobrenome.value = "";
        user.email.value = "";

        setOnEdit(null);
        getUsers();
    }

    return (
        <form className="formContainer" ref={ref} onSubmit={handleSubmit}>
            <div className="inputArea">
                <label>Nome</label>
                <input name="nome" />
            </div>
            <div className="inputArea">
                <label>Sobrenome</label>
                <input name="sobrenome" />
            </div>
            <div className="inputArea">
                <label>Email</label>
                <input name="email" type="email" />
            </div>

            <button type="submit">SALVAR</button>
        </form>
    )
}
