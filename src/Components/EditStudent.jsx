import React, { useEffect, useState, useRef } from 'react';
import cityData from './cityData';
import "../Components/style.css";
import { useNavigate, useParams } from 'react-router-dom';


export default function EditStudent() {
    const urlParam = useParams();
    const idx = urlParam.id;
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        try {
            let storedData = localStorage.getItem("Student-Data");
            return JSON.parse(storedData) ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error("Error While Parsing data from Local storage ...");
            return [];
        }
    });
    const [isSelected, setIsSelected] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedGender, setSelectedGender] = useState('')
    const [cities, setCities] = useState([])
    const [errors, setErrors] = useState({});
    const formRef = useRef(null);
    const [input, setInput] = useState({
        name: '', email: '', date: '', marks: '', phone: '', degree: '',
        state: '', city: '', gender: '', address: '', hobbies: '',
    });


    useEffect(() => {
        const editStudent = data.find((student, index) => index === parseInt(idx));
        if (editStudent) {
            setInput({ ...editStudent });
            setSelectedGender(editStudent.gender);
            setSelectedState(editStudent.state);
            setIsSelected(true);
        }
    }, [idx, data])

    useEffect(() => {
        setCities(cityData[selectedState] || [])
        setInput((prevInput) => ({ ...prevInput, state: selectedState }));
    }, [selectedState]);

    const handleReset = () => {
        setInput({
            name: '', email: '', date: '', marks: '', phone: '', degree: '',
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

    const validateDateOfBirth = () => {
        const birthDate = new Date(input.date);
        const currentDate = new Date();
        console.log(birthDate, currentDate);
        if (birthDate >= currentDate) {
            setErrors({ ...errors, date: "Date of birth should be before the current date." });
            return false;
        } else {
            setErrors({ ...errors, date: '' });
            return true;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!input.name.trim()) {
            validationErrors.name = "Name is required !!!!";
        }
        if (!input.address.trim()) {
            validationErrors.address = "Please Enter Your Address !!!";
        }
        if (!input.hobbies.trim()) {
            validationErrors.hobbies = "Please Enter your Hobbies !!!";
        }
        if (!validateDateOfBirth()) {
            return;
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const newData = [...data];
        newData[idx] = input;
        setData(newData);
        localStorage.setItem("Student-Data", JSON.stringify(newData));
        handleReset();
        formRef.current.reset();
        navigate('/students');
    }

    const stateList = Object.keys(cityData);
    return (
        <center>
            <h1 className='my-3 color-primary'>Edit Student Data</h1>
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

                {/* --------------------- date & marks date ----------------------- */}
                <div className='form-name row mt-2'>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Date of Birth : </p><input type="date" name="date" value={input.date || ''} className='w-100' onChange={handleChange} onBlur={validateDateOfBirth} required /></h5>
                        {errors.date && <p className="text-danger fw-bold">{errors.date}</p>}
                    </div>
                    <div className='col-lg-6'>
                        <h5 className='text-start'><p className='text-dark'>Marks : </p><input type="number" name="marks" value={input.marks || ''} className='w-100' onChange={handleChange} required min={0} max={100} /></h5>
                        {errors.marks && <p className="text-danger fw-bold">{errors.marks}</p>}
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


                <button className='btn btn-primary background-primary mt-5' type='submit'>{"Update"}</button>
            </form>
        </center>
    )
}