import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'react-bootstrap';

export default function CrudForm() {
    const [input, setInput] = useState({});
    const [data, setData] = useState(() => {
        try {
            let storedData = localStorage.getItem("userData");
            return JSON.parse(storedData) ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error("Error While Parsing data from Local storage ...");
            return [];
        }
    });
    const [errors, setErrors] = useState({});
    const formRef = useRef(null)
    useEffect(() => {
        console.log(data)
        localStorage.setItem("userData", JSON.stringify(data))
    }, [data]);
    console.log(input)

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setInput({ ...input, [e.target.name]: e.target.value.trim() });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (!input.name) {
            setErrors({ ...errors, name: "Name is required !!!" })
            return;
        }

        if (!input.email) {
            setErrors({ ...errors, email: "Email is required !!!" })
            return;
        }

        if (!input.password) {
            setErrors({ ...errors, password: "Password is required !!!" })
            return;
        }

        if (input.confirm !== input.password) {
            setErrors({ ...errors, confirm: "Password do not match" })
            return;
        }

        setData([...data, input])
        setInput({ name: '', email: '', password: '', confirm: '' })
        formRef.current.reset();
    }

    return (
        <center>
            <h1>Form here</h1>
            <form action="" onSubmit={handleSubmit} className='container' ref={formRef}>
                <br />
                <h5>Name : <input type="text" name="name" onChange={handleChange} required /></h5>
                {errors.name && <p className="text-danger">{errors.name}</p>}
                <h5>Email : <input type="email" name="email" onChange={handleChange} required /></h5>
                {errors.email && <p className="text-danger">{errors.email}</p>}
                <h5>Password : <input type="password" name="password" onChange={handleChange} required /></h5>
                {errors.password && <p className="text-danger">{errors.password}</p>}
                <h5>Confirm : <input type="password" name="confirm" onChange={handleChange} required /></h5>
                {errors.confirm && <p className="text-danger">{errors.confirm}</p>}

                <button className='btn btn-primary' type='submit'>Add Data</button>

                <Table striped bordered hover variant="dark" className='mt-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((userData, idx) => {
                            return <tr key={idx}>
                                <td>{userData.name}</td>
                                <td>{userData.email}</td>
                                <td>{userData.password}</td>
                                <td>
                                    <button type='button' className='btn btn-success me-3'>Edit</button>
                                    <button type='button' className='btn btn-danger me-3'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </form>
        </center>
    )
}
