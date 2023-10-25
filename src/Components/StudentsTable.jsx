import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';


export default function StudentsTable() {
    const [data, setData] = useState(() => {
        try {
            let storedData = localStorage.getItem("Student-Data");
            return JSON.parse(storedData) ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error("Error While Parsing data from Local storage ...");
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("Student-Data", JSON.stringify(data))
    }, [data])
    const handleDelete = (e, idx) => {
        const oldData = [...data];
        oldData.splice(idx, 1);
        setData(oldData);
    }
    return (
        <>
            <h1 className='color-primary my-3 text-center'>Students List</h1>
            <div className="col-10 mx-auto mt-5 overflow-x-scroll mt-4 data-table">
                {
                    data.length > 0 ? <DataTable data={data} handleDelete={handleDelete} /> : <h3 className='color-primary'>No Data Available</h3>
                }
            </div>
        </>
    )
}
