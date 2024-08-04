import { ReactNode } from 'react'
import * as XLSX from 'xlsx'

interface DownloadTableExcelType {
    children: ReactNode
    filename: string
    sheet: string
    currentTableRef: HTMLTableElement
}

export default function DownloadTableExcel({ children, filename, sheet, currentTableRef }: DownloadTableExcelType) {
    const exportToExcel = () => {
        if (!currentTableRef) {
            console.error('Table reference is null or undefined');
            return;
        }

        const table = currentTableRef;

        // Create a copy of the table without the Action column
        const filteredTable = document.createElement('table');
        const headerRow = table.tHead?.rows[0];

        if (!headerRow) {
            console.error('No header row found in the table');
            return;
        }

        // Find the index of the Action column
        const actionColumnIndex = Array.from(headerRow.cells).findIndex(
            cell => cell.textContent?.trim().toLowerCase() === 'action'
        );

        // Copy table structure and content, excluding the Action column
        const rows = Array.from(table.rows);
        rows.forEach((row) => {
            if (row) {
                const newRow = filteredTable.insertRow();
                Array.from(row.cells).forEach((cell, index) => {
                    if (index !== actionColumnIndex) {
                        const newCell = newRow.insertCell();
                        newCell.innerHTML = cell.innerHTML;
                    }
                });
            }
        });

        // Convert the filtered table to a worksheet
        const ws = XLSX.utils.table_to_sheet(filteredTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet);
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    return (
        <div onClick={exportToExcel}>{children}</div>
    )
}