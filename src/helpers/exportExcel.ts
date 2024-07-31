// import { saveAs } from 'file-saver';
// import ExcelJS from 'exceljs';
// import toast from 'react-hot-toast';

// interface OptionType {
//   sheetTitle: string;
//   fileName: string;
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default async function exportExcel(data: any, options?: OptionType) {
//   const toastId = toast.loading('Exporting data...');

//   try {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet(options?.sheetTitle || 'Sheet 1');

//     // Add header row
//     if (data.data.length > 0) {
//       worksheet.addRow(["No", "Nama", "Kuantitas", "Tanggal", "Tanggal Diperbarui"]);
//     }

//     const formattedData = data.data.map((item: ProductionResultType, index: number) => {
//       return {
//         id: index + 1,
//         name: item.product?.product_name,
//         quantity: item.quantity,
//         createdAt: reformatISODateTime(item.createdAt),
//         updatedAt: reformatISODateTime(item.updatedAt),
//       };
//     })

//     // Add data rows
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     formattedData.forEach((item: any) => {
//       worksheet.addRow(Object.values(item));
//     });

//     // Generate buffer
//     const excelBuffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(blob, 'hasil-produksi-genteng.xlsx');

//     toast.dismiss(toastId);
//     toast.success('Data exported successfully');
//   } catch (error) {
//     console.error('Export error:', error); // For debugging
//     toast.dismiss(toastId);
//     toast.error('Failed to export data');
//   }
// }