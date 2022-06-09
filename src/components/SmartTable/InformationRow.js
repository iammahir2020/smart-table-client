import React from "react";

const InformationRow = ({ information }) => {
  const { _id, name, position, office, age, salary } = information;
  return (
    <tr className="hover" key={_id}>
      <td>{name}</td>
      <td>{position}</td>
      <td>{office}</td>
      <td>{age}</td>
      <td>${salary}</td>
    </tr>
  );
};

export default InformationRow;
