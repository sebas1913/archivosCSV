import { FileController } from "./models/file.controller.js"; // Importa FileController desde los modelos
import { renderTable } from "./controllers/table.js"; // Importa renderTable desde los controladores
import { filterData } from "./controllers/filter.js"; // Importa filterData desde los controladores
import { ColumName, DataRow } from "./models/models.js"; // Importa ColumName y DataRow desde los modelos
import { convertCsv, downloadCsv } from "./models/downloadCsv.js"; // Importa convertCsv y downloadCsv desde los modelos

const csvForm = document.getElementById("csvForm") as HTMLFormElement; // Obtiene el formulario del CSV
const csvFile = document.getElementById("csvFile") as HTMLInputElement; // Obtiene el input del archivo CSV
const searchInput = document.getElementById("searchInput") as HTMLInputElement; // Obtiene el input de búsqueda
const downloadButton = document.getElementById("downloadCSV") as HTMLButtonElement; // Obtiene el botón de descarga
const displayArea = document.getElementById("displayArea") as HTMLDivElement; // Obtiene el área de visualización
const paginationHTML = document.getElementById("paginationControls"); // Obtiene los controles de paginación

const recordsPerPage = 15; // Define la cantidad de registros por página
let currentPage = 1; // Página actual
let finalValues: DataRow[] = []; // Valores finales del CSV
let columnNames: ColumName = []; // Nombres de las columnas

function pagination(totalRecords: number, currentPage: number, recordsPerPage: number): string {
    const totalPages = Math.ceil(totalRecords / recordsPerPage); // Calcula el total de páginas
    const maxButtons = 10; // Máximo número de botones de paginación
    let paginationHTML = '<ul class="pagination">'; // HTML para los controles de paginación

    if (currentPage > 1) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">Start</a></li>`; // Botón de inicio
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2)); // Página de inicio para los botones de paginación
    let endPage = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2)); // Página de fin para los botones de paginación

    if (endPage - startPage + 1 < maxButtons) {
        if (startPage > 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
        if (endPage < totalPages) {
            endPage = Math.min(totalPages, startPage + maxButtons - 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" data-page="${i}" href="#">${i}</a>
            </li>
        `;
    }

    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">End</a></li>`; // Botón de fin
    }

    paginationHTML += '</ul>';
    return paginationHTML; // Devuelve el HTML de los controles de paginación
}

// Renderiza la tabla
document.addEventListener('DOMContentLoaded', () => {
    csvForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();

        const csvReader = new FileReader(); // Crea un lector de archivos

        const input = csvFile.files![0]; // Obtiene el archivo CSV
        const fileName = input.name; // Obtiene el nombre del archivo
        const fileExtension = fileName.split('.').pop()?.toLowerCase(); // Obtiene la extensión del archivo

        if (fileExtension !== 'csv' && fileExtension !== 'txt') {
            alert('Selecciona un archivo .csv o .txt'); // Verifica la extensión del archivo
            return;
        }

        csvReader.onload = async function (Evt) {
            const text = Evt.target?.result as string; // Lee el contenido del archivo
            const fileController = new FileController(text); // Crea una instancia de FileController
            finalValues = fileController.getData(); // Obtiene los datos del archivo
            columnNames = fileController.getColumNames(); // Obtiene los nombres de las columnas
            await renderTableControls(); // Renderiza la tabla
        };

        csvReader.readAsText(input); // Lee el archivo como texto
    });

    downloadButton.addEventListener('click', async (e: Event) => {
        e.preventDefault();
        const filteredValues = filterData(finalValues, searchInput.value); // Filtra los datos
        const csvData = await convertCsv(filteredValues, columnNames); // Convierte los datos filtrados a CSV
        await downloadCsv(csvData, 'filtered_data.csv'); // Descarga el CSV
    });

    searchInput.addEventListener('input', async () => {
        await renderTableControls(); // Renderiza la tabla cuando el usuario escribe en el campo de búsqueda
    });
});

async function renderTableControls() {
    const searchTerm = searchInput.value; // Obtiene el término de búsqueda
    const filteredValues = filterData(finalValues, searchTerm); // Filtra los valores según el término de búsqueda

    const tableHTML = await renderTable(filteredValues, currentPage, recordsPerPage); // Renderiza la tabla
    displayArea.innerHTML = tableHTML; // Muestra la tabla en el área de visualización

    const paginationControls = pagination(filteredValues.length, currentPage, recordsPerPage); // Genera los controles de paginación
    if (paginationHTML) {
        paginationHTML.innerHTML = paginationControls; // Muestra los controles de paginación
    }

    document.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetPage = Number((e.target as HTMLElement).dataset.page); // Obtiene la página objetivo
            if (targetPage) {
                currentPage = targetPage; // Actualiza la página actual
                renderTableControls(); // Renderiza la tabla
            }
        });
    });
}