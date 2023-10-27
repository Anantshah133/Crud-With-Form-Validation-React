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
    const [sortOption, setSortOption] = useState(''); // Initialize sorting option
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

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
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

        if (sortOption) {
            filtered.sort((a, b) => {
                if (a[sortOption] < b[sortOption]) {
                    return -1;
                }
                if (a[sortOption] > b[sortOption]) {
                    return 1;
                }
                return 0;
            });
        }

        setFilteredData(filtered);
    }, [searchText, filterGender, filterOption, sortOption, data]);

    return (
        <>
            <h1 className='color-primary mt-5 text-center fs-1'>Students List</h1>
            <div className="col-10 mx-auto mt-5 overflow-x-scroll mt-4 data-table">
                <label htmlFor="#srch"><h2 className='color-primary fs-3'>Search Students Here : </h2></label>
                <input type="text" placeholder="Search by Name, Email, Hobbies, Address, etc." value={searchText} onChange={handleSearchChange} className="form-control mb-4 search-control" id='srch' autoComplete='off' />

                <h2 className='color-primary fs-3'>Filter By Gender</h2>
                <div className="filter-controls d-flex gap-5 mb-4">
                    <div>
                        <label className='fs-5'>
                            <input type="radio" value="ALL" checked={filterGender === 'ALL'} onChange={handleGenderChange} className='me-2' />
                            ALL
                        </label>
                    </div>
                    <div>
                        <label className='fs-5'>
                            <input type="radio" value="MALE" checked={filterGender === 'MALE'} onChange={handleGenderChange} className='me-2' />
                            MALE
                        </label>
                    </div>
                    <div>
                        <label className='fs-5'>
                            <input type="radio" value="FEMALE" checked={filterGender === 'FEMALE'} onChange={handleGenderChange} className='me-2' />
                            FEMALE
                        </label>
                    </div>
                </div>
                <div className="filter-controls mb-4 col-3">
                    <label>
                        <h2 className='color-primary fs-3'>Sort by:</h2>
                    </label>
                    <select value={sortOption} onChange={handleSortChange} className='col-12'>
                        <option value="">Select</option>
                        <option value="name">Name</option>
                        <option value="address">Address</option>
                        <option value="marks">Marks</option>
                    </select>
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