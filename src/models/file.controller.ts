import { DataRow, DataTable, ColumName } from "./models"; // Importa los tipos DataRow, DataTable y ColumName desde los modelos

export class FileController {
    private data: DataTable = []; // Almacena la tabla de datos
    private columNames: ColumName = []; // Almacena los nombres de las columnas

    constructor(private fileContent: string) {
        this.processFile(); // Procesa el archivo al crear una instancia de la clase
    }

    private processFile() {
        const lines: string[] = this.fileContent.split(/[\r\n]+/).filter(line => line.trim() !== ''); // Divide el contenido del archivo en líneas y elimina las líneas vacías
        if (lines.length > 0) {
            this.columNames = lines[0].split(','); // La primera línea contiene los nombres de las columnas
            this.data = lines.slice(1).map(line => {
                const values = line.split(','); // Divide cada línea en celdas
                const row: DataRow = {}; // Crea una fila vacía
                this.columNames.forEach((colName, index) => {
                    row[colName] = values[index] || ''; // Asigna los valores a la fila
                });
                return row; // Devuelve la fila
            });
        }
    }

    getData(): DataTable {
        return this.data; // Devuelve la tabla de datos
    }

    getColumNames(): ColumName {
        return this.columNames; // Devuelve los nombres de las columnas
    }
}
