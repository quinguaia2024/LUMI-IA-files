    var gk_isXlsx = false;
    var gk_xlsxFileLookup = {};
    var gk_fileData = {};
    function filledCell(cell) {
        return cell !== '' && cell != null;
    }
    function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });

                var filteredData = jsonData.filter(row => row.some(filledCell));

    
                var headerRowIndex = filteredData.findIndex((row, index) =>
                    row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                    headerRowIndex = 0;
                }

                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
    }
       var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
            return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
            if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
                try {
                    var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                    var firstSheetName = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[firstSheetName];

                    // Convert sheet to JSON to filter blank rows
                    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                    // Filter out blank rows (rows where all cells are empty, null, or undefined)
                    var filteredData = jsonData.filter(row => row.some(filledCell));

                    // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                    var headerRowIndex = filteredData.findIndex((row, index) =>
                        row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                    );
                    // Fallback
                    if (headerRowIndex === -1 || headerRowIndex > 25) {
                        headerRowIndex = 0;
                    }

                    // Convert filtered JSON back to CSV
                    var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                    csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                    return csv;
                } catch (e) {
                    console.error(e);
                    return "";
                }
            }
            return gk_fileData[filename] || "";
        }

        function toggleDropdown(button) {
            const dropdown = button.parentElement;
            const isOpen = dropdown.classList.contains('open');
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                dropdown.classList.add('open');
            }
        }

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
            }
        });

        function toggleUserInfo() {
            const userInfoPanel = document.getElementById('userInfoPanel');
            userInfoPanel.classList.toggle('open');
        }

        document.addEventListener('click', function (event) {
            const profileSection = document.querySelector('.profile-section');
            const userInfoPanel = document.getElementById('userInfoPanel');
            if (!profileSection.contains(event.target) && !userInfoPanel.contains(event.target)) {
                userInfoPanel.classList.remove('open');
            }
        });

        function toggleTheme(theme) {
            document.body.className = 'flex flex-col lg:flex-row min-h-screen';
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }