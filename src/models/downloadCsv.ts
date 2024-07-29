import { DataRow, ColumName } from "./models"; // Importa los tipos DataRow y ColumName desde los modelos

export async function convertCsv(data: DataRow[], columNames: ColumName): Promise<string> {
    const csvRows = []; // Array para almacenar las filas del CSV
    csvRows.push(columNames.join(',')); // Añade los nombres de las columnas como primera fila del CSV

    data.forEach(rows => {
        const values = columNames.map(column => rows[column] || ''); // Obtiene los valores de cada fila
        csvRows.push(values.join(',')); // Añade la fila al array de filas del CSV
    });

    return csvRows.join('\n'); // Une todas las filas con saltos de línea y las devuelve como cadena
}

export async function downloadCsv(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8;' }); // Crea un blob con el contenido del CSV

    const link = document.createElement('a'); // Crea un enlace

    const url = URL.createObjectURL(blob); // Crea una URL para el blob
    link.setAttribute('href', url); // Establece el href del enlace con la URL del blob
    link.setAttribute('download', fileName); // Establece el atributo de descarga con el nombre del archivo

    document.body.appendChild(link); // Añade el enlace al DOM
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    document.body.removeChild(link); // Elimina el enlace del DOM
}
