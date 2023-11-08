import React from "react";

export default function GradeHorarios({ gradeData }) {
  const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Dia da Semana</th>
          <th scope="col">Aula 1</th>
          <th scope="col">Aula 2</th>
        </tr>
      </thead>
      <tbody>
        {gradeData.map((row, index) => (
          <tr key={index}>
            <td>{diasDaSemana[index]}</td>
            {row.map((professor, subIndex) => (
              <td key={subIndex}>{professor}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
