var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function convertCsv(data, columNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const csvRows = []; // Array para almacenar las filas del CSV
        csvRows.push(columNames.join(',')); // Añade los nombres de las columnas como primera fila del CSV
        data.forEach(rows => {
            const values = columNames.map(column => rows[column] || ''); // Obtiene los valores de cada fila
            csvRows.push(values.join(',')); // Añade la fila al array de filas del CSV
        });
        return csvRows.join('\n'); // Une todas las filas con saltos de línea y las devuelve como cadena
    });
}
export function downloadCsv(csvContent, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8;' }); // Crea un blob con el contenido del CSV
        const link = document.createElement('a'); // Crea un enlace
        const url = URL.createObjectURL(blob); // Crea una URL para el blob
        link.setAttribute('href', url); // Establece el href del enlace con la URL del blob
        link.setAttribute('download', fileName); // Establece el atributo de descarga con el nombre del archivo
        document.body.appendChild(link); // Añade el enlace al DOM
        link.click(); // Simula un clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Elimina el enlace del DOM
    });
}
