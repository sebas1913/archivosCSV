export function filterData(arrayTable, searchTerm) {
    if (!searchTerm)
        return arrayTable; // Si no hay término de búsqueda, devuelve la tabla sin cambios
    const lowerCaseTerm = searchTerm.toLowerCase(); // Convierte el término de búsqueda a minúsculas
    return arrayTable.filter(row => // Filtra las filas de la tabla
     Object.values(row).some(cell => // Verifica si alguna celda en la fila contiene el término de búsqueda
     cell !== null && cell !== undefined && cell.toString().toLowerCase().includes(lowerCaseTerm) // Convierte la celda a cadena, minúsculas y verifica si incluye el término
    ));
}
