import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import "./style.css"

export default function SignUpPage() {
    const [input, setInput] = useState({
        email: '', password: '', confirm: ''
    });
    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState(() => {
        try {
            let storedData = localStorage.getItem("User-Data");
            return JSON.parse(storedData) || [];
        } catch (err) {
            console.error("Error While Parsing data from Local storage ...", err);
            return [];
        }
    })
    useEffect(() => {
        localStorage.setItem("User-Data", JSON.stringify(userData));
    }, [userData])
    const navigate = useNavigate();

    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.id]: '' })
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!input.email.trim()) {
            validationErrors.email = "Please Enter Your Email !!!";
        }
        if (!input.password.trim()) {
            validationErrors.password = "Please Enter Your Password !!!";
        }
        if (input.password !== input.confirm) {
            validationErrors.confirm = "Please Confirm Your Password !!!";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setUserData([...userData, input])
            setInput({ email: '', password: '', confirm: '' })
            Swal.fire({
                title: 'User Registered Successfully !',
                text: 'Click OK to Log-In!',
                icon: 'success',
                customClass: {
                    confirmButton: 'swal-button',
                },
                confirmButtonText: 'OK',
                allowOutsideClick: false,
            }).then((result) => {
                console.log(result)
                if(result.isConfirmed){
                    navigate('/login')
                }
            })
        }
    }
    console.log(userData)
    return (
        <div className="container-fluid h-100">
            <div className="row">
                <div className="col-4 ps-0">
                    <div className="student-aside text-center d-flex flex-column align-items-center">
                        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
                            <h3 className="mb-3 display-5 fw-semibold text-white">Welcome Back User !</h3>
                            <p className="mb-4 fs-6" style={{ color: "rgba(255, 255, 255, 0.7)" }}>User Experience &amp; Interface Design <br />Strategy SaaS Solutions</p>
                        </div>
                        <div className="aside-image position-relative">
                            <img className="img1 move-1" src="https://akademi.dexignlab.com/xhtml/images/background/pic3.png" alt="" />
                            <img className="img2 move-2" src="https://akademi.dexignlab.com/xhtml/images/background/pic4.png" alt="" />
                            <img className="img3 move-3" src="https://akademi.dexignlab.com/xhtml/images/background/pic5.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-8" style={{ backgroundColor: "#f0f0f0" }}>
                    <div className="signup-wrapper d-flex align-items-center justify-content-center h-100">
                        <div className="right col-6">
                            <form className="sign-up" onSubmit={handleSubmit}>
                                <h2 className='mb-5 d-flex align-items-center'><i className="fa-solid fa-key me-2 key"></i> Sign-In To See Student's Details</h2>
                                <div>
                                    <label htmlFor="email" className="form-label">Email :- </label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} value={input.email || ''} />
                                    <p className='text-danger'>{errors.email || ""}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="form-label">Password :- </label>
                                    <input type="password" className="form-control" id="password" placeholder="Create a password" onChange={handleChange} value={input.password || ''} />
                                    <p className='text-danger'>{errors.password || ""}</p>
                                </div>
                                <div>
                                    <label htmlFor="confirm" className="form-label">Confirm Password :- </label>
                                    <input type="password" className="form-control" id="confirm" placeholder="Confirm a password" onChange={handleChange} value={input.confirm || ''} />
                                    <p className='text-danger'>{errors.confirm || ""}</p>
                                </div>
                                <button type="submit" className="btn submit-btn">Create account</button>
                            </form>
                            <p className="hr-lines"> OR </p>
                            <div className="social-sign-up">
                                <button className="btn social" type='submit'><i className="fa-brands fa-google"></i> Sign up with Google</button>
                            </div>
                            <div className="sign-in">
                                <p>Already have an account? <Link to={'/login'}>Log-In</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}