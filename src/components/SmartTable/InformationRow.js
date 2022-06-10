import React from "react";

const InformationRow = ({ information, index }) => {
  const { _id, name, position, office, age, salary } = information;
  return (
    <tr className="hover" key={_id}>
      <th>{name}</th>
      <td>{position}</td>
      <td>{office}</td>
      <td>{age}</td>
      <td>${salary}</td>
    </tr>
  );
};

export default InformationRow;
