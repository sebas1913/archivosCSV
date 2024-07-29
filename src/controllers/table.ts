import { DataTable } from "../models/models.js"; // Importa el tipo DataTable desde los modelos

export async function renderTable(arrayTable: DataTable, currentPage: number, recordsPerPage: number): Promise<string> {
    const startIndex = (currentPage - 1) * recordsPerPage; // Calcula el índice de inicio para la página actual
    const finalIndex = startIndex + recordsPerPage; // Calcula el índice final para la página actual

    const paginatedData = arrayTable.slice(startIndex, finalIndex); // Obtiene los datos paginados

    const columNames = arrayTable.length > 0 ? Object.keys(arrayTable[0]) : []; // Obtiene los nombres de las columnas desde la primera fila

    return `
        <div class="table-responsive">
            <table class="table table-success table-striped-columns">
                <thead class="bg-primary text-white">
                    <tr>
                        ${columNames.map(colName => `
                            <th scope="col" class="text-center">${colName}</th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${paginatedData.map(row => `
                        <tr>
                            ${columNames.map(colName => `
                                <td class="text-center align-middle">
                                    ${row[colName] || ''}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}
