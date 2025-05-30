export function initInteractiveTable(tableElement) {
    if (!tableElement) {
        console.error("Interactive table element not found.");
        return null;
    }

    const headers = tableElement.querySelectorAll("th.sortable-header");
    const tbody = tableElement.querySelector("tbody");

    if (!tbody) {
        console.error("Table body not found for interactive table.");
        return null;
    }

    const sortRows = (columnIndex, direction) => {
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll("td")[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll("td")[columnIndex].textContent.trim();

            // Attempt to convert to numbers for numeric sorting
            const numA = parseFloat(cellA.replace(/[^\d.-]/g, '')); // Remove currency symbols, commas etc.
            const numB = parseFloat(cellB.replace(/[^\d.-]/g, ''));

            let comparison = 0;

            if (!isNaN(numA) && !isNaN(numB)) {
                comparison = numA - numB;
            } else {
                comparison = cellA.localeCompare(cellB, undefined, { sensitivity: 'base' });
            }

            return direction === 'asc' ? comparison : -comparison;
        });

        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
    };

    const handleHeaderClick = (event) => {
        const header = event.currentTarget;
        const columnIndex = parseInt(header.dataset.columnIndex, 10);
        let currentDirection = header.dataset.sortDirection;

        // Reset indicators for other headers
        headers.forEach(th => {
            if (th !== header) {
                th.dataset.sortDirection = 'none';
                th.querySelector(".sort-indicator").textContent = '';
            }
        });

        if (currentDirection === 'asc') {
            currentDirection = 'desc';
            header.querySelector(".sort-indicator").textContent = ' ▼'; // Down arrow
        } else {
            currentDirection = 'asc';
            header.querySelector(".sort-indicator").textContent = ' ▲'; // Up arrow
        }
        header.dataset.sortDirection = currentDirection;

        sortRows(columnIndex, currentDirection);
    };

    headers.forEach(header => {
        header.addEventListener("click", handleHeaderClick);
    });

    // Initial sort for the first column (optional)
    // if (headers.length > 0) {
    //     headers[0].click();
    // }

    // Return a cleanup function
    return () => {
        console.log(`Cleaning up interactive table: ${tableElement.id}`);
        headers.forEach(header => {
            header.removeEventListener("click", handleHeaderClick);
        });
    };
}