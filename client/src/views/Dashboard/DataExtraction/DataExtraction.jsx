import React from 'react'

export default function DataExtraction() {

    const token = localStorage.getItem("token");



    async function downloadCSV() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/employees/csv`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'text/csv'
                },
            });


            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'employees.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading the CSV file', error);
        }
    }


    return (
        <div>
            <button className='f-black' onClick={downloadCSV}>
                Employees data Extraction
            </button>
        </div>
    )
}
