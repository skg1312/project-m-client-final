import * as XLSX from "xlsx";

function ExportToExcel({ data }) {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "Reports.xlsx");
  };

  return (
    <button onClick={exportToExcel}>Export to Excel</button>
  );
}

export default ExportToExcel;