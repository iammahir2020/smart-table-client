import React, { useEffect, useState } from "react";
// import AddInformation from "./AddInformation";
import InformationRow from "./InformationRow";

const SmartTable = () => {
  const [informations, setInformations] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [type, setType] = useState("name");
  const [input, setInput] = useState("");

  useEffect(() => {
    const url = `https://smart-data-table.herokuapp.com/informationCount?type=${type}&input=${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const count = parseInt(data.informations.length);
        const pages = Math.ceil(count / size);
        setPageCount(pages);
      });
  }, [size, type, input]);

  useEffect(() => {
    const url = `https://smart-data-table.herokuapp.com/informationBulk?page=${page}&size=${size}&type=${type}&input=${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setInformations(data));
  }, [page, size, type, input]);

  return (
    <div>
      <h2 className="text-center text-xl lg:text-2xl">
        Technical Assesment Task for Web Developer Intern
      </h2>
      <h2 className="text-center text-2xl lg:text-4xl font-semibold">
        Smart Data Table
      </h2>
      {/* <AddInformation></AddInformation> */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-left lg:items-center">
        <div className="flex gap-5 items-center my-5">
          <span>Show</span>
          <select
            onChange={(e) => setSize(e.target.value)}
            className="select bg-gray-200"
          >
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>Entries</span>
        </div>
        <div className="flex gap-5 items-center my-5">
          <span>Search By :</span>
          <span>
            <select
              onChange={(e) => setType(e.target.value)}
              className="select bg-gray-200"
            >
              <option value="name" selected>
                Name
              </option>
              <option value="position">Position</option>
              <option value="office">Office</option>
            </select>
          </span>
          <input
            type="text"
            name="name"
            onKeyUp={(e) => setInput(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-lg">Name</th>
              <th className="text-lg">Position</th>
              <th className="text-lg">Office</th>
              <th className="text-lg">Age</th>
              <th className="text-lg">Salary</th>
            </tr>
          </thead>
          <tbody>
            {pageCount === 0 ? (
              <tr>
                <td className="text-center" colSpan="5">
                  No matching records found
                </td>
              </tr>
            ) : (
              informations?.map((information, index) => (
                <InformationRow
                  key={information._id}
                  information={information}
                  index={index}
                ></InformationRow>
              ))
            )}
            {/* {informations?.map((information, index) => (
              <InformationRow
                key={information._id}
                information={information}
                index={index}
              ></InformationRow>
            ))} */}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-lg">Name</th>
              <th className="text-lg">Position</th>
              <th className="text-lg">Office</th>
              <th className="text-lg">Age</th>
              <th className="text-lg">Salary</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="btn-group">
          {[...Array(pageCount).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={`btn btn-md ${page === number && "btn-active"}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartTable;
