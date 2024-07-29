export class FileController {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.data = []; // Almacena la tabla de datos
        this.columNames = []; // Almacena los nombres de las columnas
        this.processFile(); // Procesa el archivo al crear una instancia de la clase
    }
    processFile() {
        const lines = this.fileContent.split(/[\r\n]+/).filter(line => line.trim() !== ''); // Divide el contenido del archivo en líneas y elimina las líneas vacías
        if (lines.length > 0) {
            this.columNames = lines[0].split(','); // La primera línea contiene los nombres de las columnas
            this.data = lines.slice(1).map(line => {
                const values = line.split(','); // Divide cada línea en celdas
                const row = {}; // Crea una fila vacía
                this.columNames.forEach((colName, index) => {
                    row[colName] = values[index] || ''; // Asigna los valores a la fila
                });
                return row; // Devuelve la fila
            });
        }
    }
    getData() {
        return this.data; // Devuelve la tabla de datos
    }
    getColumNames() {
        return this.columNames; // Devuelve los nombres de las columnas
    }
}
