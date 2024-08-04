import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

interface ExportExcelType {
    filename: string;
    sheet: string;
    header: {
        [key: string]: string;
    };
    body: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }[];
}

export default async function exportToExcel({ filename, sheet, header, body }: ExportExcelType) {
    const toastId = toast.loading('Downloading data...');

    try {
        const headerValues = Object.values(header);
        const headerKeys = Object.keys(header);
        const filteredData: (string | number)[][] = [['#', ...headerValues]];

        body.forEach((b, index) => {
            const row = [index + 1, ...headerKeys.map((key) => b[key] ?? '')];
            filteredData.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet);
        XLSX.writeFile(wb, `${filename}.xlsx`);

        toast.dismiss(toastId);
        toast.success('Data downloaded successfully');
    } catch (error) {
        console.error('Download error:', error);
        toast.dismiss(toastId);
        toast.error('Failed to download data');
    }
}