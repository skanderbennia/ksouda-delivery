import { Button } from "antd";
import FileSaver from "file-saver";
import React from "react";
import XLSX from "sheetjs-style";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export default function ExcelExport({ fileName, excelData }) {
  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      style={{ cursor: "pointer", fontSize: 14 }}
      type="default"
      onClick={(e) => {
        exportToExcel(fileName);
      }}
    >
      Telecharger
    </Button>
  );
}
