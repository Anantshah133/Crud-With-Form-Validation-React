import React from 'react';
import { Table } from 'react-bootstrap';

export default function DataTable({ data, handleEdit, isEdit }) {
    return (
        <Table striped bordered hover variant="dark">
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
                        <td>{userData.gender === "male" ? "♂️ Male" : userData.gender === "female" ? "♀️ Female" : "X Other"}</td>
                        <td>{userData.hobbies}</td>
                        <td>{userData.address}</td>
                        <td>
                            <button type='button' className='btn btn-success me-3' onClick={(e) => handleEdit(e, idx)}>Edit</button>
                            <button type='button' className='btn btn-danger me-3' disabled={isEdit}>Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
}
