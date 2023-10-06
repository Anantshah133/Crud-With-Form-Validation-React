import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import cityData from './cityData';
import "../Components/style.css"

export default function CrudForm() {
    const [isSelected, setIsSelected] = useState(false)
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
    const [cities, setCities] = useState([])
    const [selectedState, setSelectedState] = useState('');
    const [errors, setErrors] = useState({});
    const formRef = useRef(null)

    useEffect(() => {
        console.log(data)
        localStorage.setItem("userData", JSON.stringify(data))
    }, [data]);
    useEffect(() => {
        setCities(cityData[selectedState] || [])
        // setInput({ ...input, state: selectedState }) occuring warning
        setInput((prevInput) => ({ ...prevInput, state: selectedState }));
    }, [selectedState]);

    console.log(input)
    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setInput({ ...input, [e.target.name]: e.target.value.trim() });
    }
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setIsSelected(e.target.value === '' ? false : true)
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

        if (!input.address) {
            setErrors({ ...errors, address: "Please Enter Your Address !!!" })
            return;
        }

        if (!input.hobbies) {
            setErrors({ ...errors, hobbies: "Please Enter your Hobbies !!!" })
            return;
        }

        setData([...data, input])
        setInput({})
        formRef.current.reset();
    }

    const stateList = Object.keys(cityData);
    // console.log(isSelected);
    return (
        <center>
            <h1>Form here</h1>
            <form action="" onSubmit={handleSubmit} className='container' ref={formRef}>
                <br />
                {/* --------------------- name & email ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Name :</p> <input type="text" name="name" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.name && <p className="text-danger fw-bold">{errors.name}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Email :</p> <input type="email" name="email" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.email && <p className="text-danger fw-bold">{errors.email}</p>}
                    </div>
                </div>

                {/* --------------------- Password & Confirm Password ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Password : </p><input type="password" name="password" className='w-100' onChange={handleChange} required /></h5>
                        {errors.password && <p className="text-danger fw-bold">{errors.password}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Confirm : </p><input type="password" name="confirm" className='w-100' onChange={handleChange} required /></h5>
                        {errors.confirm && <p className="text-danger fw-bold">{errors.confirm}</p>}
                    </div>
                </div>

                {/* --------------------- Phone & Degree ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Mobile : </p><input type="tel" name="phone" className='w-100' onChange={handleChange} required pattern='[0-9]{10}' /></h5>
                        {errors.phone && <p className="text-danger fw-bold">{errors.phone}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'>
                            <p>Degree : </p>
                            <select name="degree" className='w-100' required onChange={handleChange}>
                                <option value="">Select Your Degree Here</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                                <option value="PHD">PHD</option>
                            </select>
                        </h5>
                    </div>
                </div>

                {/* --------------------- State City & Gender ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-6'>
                        <h5 className='text-start'>
                            <p>Select State & City : </p>
                            <div className='d-flex'>
                                <div className="w-50 pe-3">
                                    <select name="state" className='w-100' required onChange={handleStateChange}>
                                        <option value="">Select Your State</option>
                                        {stateList.map((state, idx) =>
                                            (<option value={state} key={idx}>{state}</option>)
                                        )}
                                    </select>
                                </div>
                                <div className="w-50">
                                    <select name="city" className='w-100' required onChange={handleChange} value={input.city || ''} disabled={!isSelected}>
                                        <option value="">Select Your City</option>
                                        {cities.map((city, idx) =>
                                            (<option value={city} key={idx}>{city}</option>)
                                        )}
                                    </select>
                                </div>
                            </div>
                        </h5>
                    </div>

                    <div className="col-6">
                        <h5 className='text-start'>
                            <p>Gender : </p>
                            <input type="radio" name="gender" value="male" onClick={(e)=> input.gender = e.target.value} required/>
                            <label className='mx-3' htmlFor="gender">Male</label>
                            <input type="radio" name="gender" value="female" onClick={(e)=> input.gender = e.target.value} required/>
                            <label className='mx-3' htmlFor="gender">Female</label>
                            <input type="radio" name="gender" value="other" onClick={(e)=> input.gender = e.target.value} required/>
                            <label className='mx-3' htmlFor="gender">Other</label>
                        </h5>
                    </div>
                </div>

                {/* --------------------- Address & Hobbie ----------------------- */}                            
                <div className='form-name row mt-2 align-items-center'>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Address : </p> <textarea name="address" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.address && <p className="text-danger fw-bold">{errors.address}</p>}
                    </div>
                    <div className='col-6'>
                        <h5 className='text-start'><p>Hobbies : </p> <input type="text" name="hobbies" className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.hobbies && <p className="text-danger fw-bold">{errors.hobbies}</p>}
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