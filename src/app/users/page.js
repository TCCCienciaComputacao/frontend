import React from "react";
import axios from "axios";
import {FaTrash , FaEdit} from "react-icons";
import react from "react";
import {toast} from "react-toastify";

export default function users(){
    return(
        <table className="tableUsers">
            <thead>
                <tr>
                    <th>Nome</th>
                </tr>
            </thead>
        </table>
    );
}