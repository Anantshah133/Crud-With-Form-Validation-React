import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { Link } from 'react-router-dom';
import "./style.css"

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
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [filterGender, setFilterGender] = useState('ALL');
    const [filterOption, setFilterOption] = useState('');
    const searchableFields = ['name', 'email', 'degree', 'state', 'city', 'hobbies', 'address'];

    useEffect(() => {
        localStorage.setItem("Student-Data", JSON.stringify(data))
    }, [data])

    const handleDelete = (e, idx) => {
        const oldData = [...data];
        oldData.splice(idx, 1);
        setData(oldData);
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setFilterGender(selectedGender);
    }

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    }

    useEffect(() => {
        const filtered = data.filter(student => {
            const isGenderMatch = filterGender === 'ALL' || student.gender.toLowerCase() === filterGender.toLowerCase();
            const isSearchMatch = searchableFields.some(field => {
                const fieldValue = student[field] ? student[field].toLowerCase() : '';
                return fieldValue.includes(searchText.trim().toLowerCase());
            });

            return isGenderMatch && isSearchMatch;
        });
        setFilteredData(filtered);
    }, [searchText, filterGender, data]);

    return (
        <>
            <h1 className='color-primary mt-5 text-center'>Students List</h1>
            <div className="col-10 mx-auto mt-5 overflow-x-scroll mt-4 data-table">
                <label htmlFor="#srch"><h3>Search Students Here : </h3></label>
                <input type="text" placeholder="Search by Name, Email, Hobbies, Address, etc." value={searchText} onChange={handleSearchChange} className="form-control mb-3 search-control" id='srch' autoComplete='off'/>

                <div className="filter-controls">
                    <div>
                        <label>
                            <input type="radio" value="ALL" checked={filterGender === 'ALL'} onChange={handleGenderChange} />
                            ALL
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="MALE" checked={filterGender === 'MALE'} onChange={handleGenderChange} />
                            MALE
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="FEMALE" checked={filterGender === 'FEMALE'} onChange={handleGenderChange} />
                            FEMALE
                        </label>
                    </div>
                </div>

                <div className="filter-controls">
                    <label>
                        Filter by:
                        <select value={filterOption} onChange={handleFilterChange}>
                            <option value="">Select</option>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                            <option value="marks">Marks</option>
                        </select>
                    </label>
                </div>

                {
                    filteredData.length > 0 ? <DataTable data={filteredData} handleDelete={handleDelete} /> : <h3 className='color-secondary text-center'>No Data Available !!!! </h3>
                }
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Link className='btn btn-primary background-primary text-center' to={'/add-student'} >Add Student Data</Link>
            </div>
        </>
    )
}