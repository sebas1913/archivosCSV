export interface DataRow { // Interfaz para representar una fila del CSV
    [key: string]: string; // Claves son los nombres de las columnas, valores son los datos de la celda
}

export type DataTable = DataRow[]; // Un DataTable es un array de DataRow

export type ColumName = string[]; // Un ColumName es un array de nombres de columnas
