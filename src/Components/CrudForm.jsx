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
    // console.log(errors)

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

        if (!input.phone || input.phone.length < 10) {
            setErrors({ ...errors, phone: "Please Enter A Valid Phone Number !!!" })
            return;
        }

        setData([...data, input])
        setInput({
            name: '',
            email: '',
            password: '',
            confirm: '',
            phone: '',
            degree: ''
        })
        formRef.current.reset();
    }

    return (
        <center>
            <h1>Form here</h1>
            <form action="" onSubmit={handleSubmit} className='container' ref={formRef}>
                <br />
                <div className='form-name row'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Name :</p> <input type="text" name="name" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.name && <p className="text-danger fw-bold">{errors.name}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Email :</p> <input type="email" name="email" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.email && <p className="text-danger fw-bold">{errors.email}</p>}
                    </div>
                </div>
                <div className='form-name row'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Password : </p><input type="password" name="password" className='w-100' onChange={handleChange} required /></h5>
                        {errors.password && <p className="text-danger fw-bold">{errors.password}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Confirm : </p><input type="password" name="confirm" className='w-100' onChange={handleChange} required /></h5>
                        {errors.confirm && <p className="text-danger fw-bold">{errors.confirm}</p>}
                    </div>
                </div>

                <div className='form-name row'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Mobile : </p><input type="tel" name="phone" className='w-100' onChange={handleChange} required pattern='[0-9]{10}' /></h5>
                        {errors.phone && <p className="text-danger fw-bold">{errors.phone}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'>
                            <p>Degree : </p>
                            <select name="degree" id="" className='w-100' required onChange={handleChange}>
                                <option value="">Select Your Degree Here</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </h5>
                    </div>
                </div>

                <button className='btn btn-primary mt-5' type='submit'>Add Data</button>

                <Table striped bordered hover variant="dark" className='mt-4'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Degree</th>
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