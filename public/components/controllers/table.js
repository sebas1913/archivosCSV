var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function renderTable(arrayTable, currentPage, recordsPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
