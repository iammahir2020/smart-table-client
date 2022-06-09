import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const AddInformation = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  //   const [excelData, setExcelData] = useState(null);
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select files with .xlsx extension");
        setExcelFile(null);
      }
    } else {
      console.log("Please select file");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (excelFile) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetname = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetname];
      const dataList = XLSX.utils.sheet_to_json(worksheet);
      //   setExcelData(dataList);
      const { data } = await axios.post(
        "http://localhost:5000/informationBulk",
        dataList
      );
      console.log(data);
      if (data.acknowledged === true) {
        event.target.reset();
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl">Upload XLSX File</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row justify-start items-start gap-3 lg:items-center my-5"
      >
        <input type="file" onChange={handleFile} required />
        <p className="text-red-500">{excelFileError}</p>
        <input
          className="btn btn-primary"
          type="submit"
          value="Upload Information"
        />
      </form>
    </div>
  );
};

export default AddInformation;
