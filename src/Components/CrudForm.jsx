import React, { useEffect, useState, useRef } from 'react';
import cityData from './cityData';
import "../Components/style.css";
// import DataTable from './DataTable';

export default function CrudForm() {
    // const [editId, setEditId] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    // const [isEdit, setIsEdit] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedGender, setSelectedGender] = useState('')
    const [cities, setCities] = useState([])
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);
    const [input, setInput] = useState({
        name: '', email: '', password: '', confirm: '', phone: '', degree: '',
        state: '', city: '', gender: '', address: '', hobbies: '',
    });
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
    }, [data]);
    useEffect(() => {
        // setInput({ ...input, state: selectedState }) // occuring warning
        setCities(cityData[selectedState] || [])
        setInput((prevInput) => ({ ...prevInput, state: selectedState }));
    }, [selectedState]);

    const handleReset = () => {
        setInput({
            name: '', email: '', password: '', confirm: '', phone: '', degree: '',
            state: '', city: '', gender: '', address: '', hobbies: '',
        });
        setSelectedGender('');
        setSelectedState('');
        setErrors({});
    }
    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.name]: '' });
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setIsSelected(e.target.value === '' ? false : true)
    }
    // const handleEdit = (e, idx) => {
    //     setEditId(idx)
    //     setIsEdit(true);
    //     setInput(data[idx])
    //     setSelectedGender(data[idx].gender)
    //     setSelectedState(data[idx].state)
    //     setIsSelected(true);
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!input.name.trim()) {
            validationErrors.name = "Name is required !!!!";
        }
        if (!input.password.trim()) {
            validationErrors.password = "Password is required !!!";
        }
        if (input.confirm !== input.password) {
            validationErrors.confirm = "Password do not match";
        }
        if (!input.address.trim()) {
            validationErrors.address = "Please Enter Your Address !!!";
        }
        if (!input.hobbies.trim()) {
            validationErrors.hobbies = "Please Enter your Hobbies !!!";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length > 0){
            return;
        }

        // if (isEdit) {
        //     const newList = data.map((user, idx) => {
        //         if (editId === idx) {
        //             return input;
        //         }
        //         return user;
        //     })
        //     setData(newList);
        //     handleReset();
        //     setIsEdit(false);
        //     setIsSelected(false);
        //     setSelectedState('');
        // } else {
        setData([...data, input])
        // }

        handleReset()
        formRef.current.reset();
    }

    const stateList = Object.keys(cityData);
    return (
        <center>
            <h1 className='my-3 color-primary'>Add Student Data</h1>
            <br />
            <form action="" onSubmit={handleSubmit} className='container' ref={formRef}>
                {/* --------------------- name & email ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Name :</p> <input type="text" name="name" value={input.name || ''} className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.name && <p className="text-danger fw-bold">{errors.name}</p>}
                    </div>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Email :</p> <input type="email" name="email" value={input.email || ''} className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.email && <p className="text-danger fw-bold">{errors.email}</p>}
                    </div>
                </div>

                {/* --------------------- Password & Confirm Password ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Password : </p><input type="password" name="password" value={input.password || ''} className='w-100' onChange={handleChange} required /></h5>
                        {errors.password && <p className="text-danger fw-bold">{errors.password}</p>}
                    </div>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Confirm : </p><input type="password" name="confirm" value={input.confirm || ''} className='w-100' onChange={handleChange} required /></h5>
                        {errors.confirm && <p className="text-danger fw-bold">{errors.confirm}</p>}
                    </div>
                </div>

                {/* --------------------- Phone & Degree ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Mobile (10 digits) : </p><input type="tel" name="phone" value={input.phone || ''} className='w-100' onChange={handleChange} autoComplete='off' required pattern='[0-9]{10}' /></h5>
                        {errors.phone && <p className="text-danger fw-bold">{errors.phone}</p>}
                    </div>
                    <div className='col-lg-6'>
                        <h5 className='text-start'>
                            <p className='text-dark'>Degree : </p>
                            <select name="degree" value={input.degree || ''} className='w-100' required onChange={handleChange}>
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
                    <div className='col-lg-6'>
                        <h5 className='text-start'>
                            <p className='text-dark'>Select State & City : </p>
                            <div className='d-flex'>
                                <div className="w-50 pe-3">
                                    <select name="state" value={input.state || ''} className='w-100' required onChange={handleStateChange}>
                                        <option value="">Select Your State</option>
                                        {stateList.map((state, idx) =>
                                            (<option value={state} key={idx}>{state}</option>)
                                        )}
                                    </select>
                                </div>
                                <div className="w-50">
                                    <select name="city" value={input.city || ''} className='w-100' required onChange={handleChange} disabled={!isSelected}>
                                        <option value="">Select Your City</option>
                                        {cities.map((city, idx) =>
                                            (<option value={city} key={idx}>{city}</option>)
                                        )}
                                    </select>
                                </div>
                            </div>
                        </h5>
                    </div>

                    <div className="col-lg-6">
                        <h5 className='text-start'>
                            <p className='text-dark'>Gender : </p>
                            <input type="radio" name="gender" checked={selectedGender === 'male'} value="male" onChange={(e) => {
                                setSelectedGender(e.target.value)
                                input.gender = e.target.value
                            }} required />
                            <label className='mx-3' htmlFor="gender">Male</label>
                            <input type="radio" name="gender" checked={selectedGender === 'female'} value="female" onChange={(e) => {
                                setSelectedGender(e.target.value)
                                input.gender = e.target.value
                            }} required />
                            <label className='mx-3' htmlFor="gender">Female</label>
                            <input type="radio" name="gender" checked={selectedGender === 'other'} value="other" onChange={(e) => {
                                setSelectedGender(e.target.value)
                                input.gender = e.target.value
                            }} required />
                            <label className='mx-3' htmlFor="gender">Other</label>
                        </h5>
                    </div>
                </div>

                {/* --------------------- Address & Hobbie ----------------------- */}
                <div className='form-name row mt-2 align-items-top'>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Address : </p> <textarea name="address" value={input.address || ''} className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.address && <p className="text-danger fw-bold">{errors.address}</p>}
                    </div>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Hobbies : </p> <input type="text" name="hobbies" value={input.hobbies || ''} className='w-100' onChange={handleChange} required autoComplete='off' /></h5>
                        {errors.hobbies && <p className="text-danger fw-bold">{errors.hobbies}</p>}
                    </div>
                </div>


                <button className='btn btn-primary background-primary mt-5' type='submit'>{"Submit"}</button>

                {/* <div className="col-12 overflow-x-scroll mt-4 data-table">
                    {
                        data.length > 0 ? <DataTable data={data} handleEdit={handleEdit} isEdit={isEdit} handleDelete={handleDelete} /> : <h3 className='color-primary'>No Data Available</h3>
                    }
                </div> */}
            </form>
        </center>
    )
}