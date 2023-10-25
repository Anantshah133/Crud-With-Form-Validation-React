import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DataTable({ data, handleDelete }) {
    return (
        <Table bordered hover striped variant="dark" className='text-center'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Phone</th>
                    <th>Degree</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Gender</th>
                    <th>Hobbies</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((userData, idx) => {
                    return <tr key={idx}>
                        <td>{userData.name}</td>
                        <td>{userData.email}</td>
                        <td>{userData.password}</td>
                        <td>{userData.phone}</td>
                        <td>{userData.degree}</td>
                        <td>{userData.state}</td>
                        <td>{userData.city}</td>
                        <td>{userData.gender === "male" ? "♂️ Male" : userData.gender === "female" ? "♀️ Female" : "⚧ Other"}</td>
                        <td>{userData.hobbies}</td>
                        <td>{userData.address}</td>
                        <td>
                            <Link type='button' className='action-btn btn btn-warning me-3' to={`/students/view/${idx}`}>
                                <i className="fa-solid fa-eye"></i>
                            </Link>
                            <button type='button' className='action-btn btn btn-success me-3'>
                                <i className="ri-pencil-line"></i>
                            </button>
                            <button type='button' className='action-btn btn btn-danger me-3' onClick={(e) => handleDelete(e, idx)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}
