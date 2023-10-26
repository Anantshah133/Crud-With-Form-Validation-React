import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function LoginPage({ handleLogin }) {
    const [input, setInput] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        setErrors({ ...errors, [e.target.id]: '' })
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("User-Data")) || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        // get Localstorage here 
        let validationErrors = {};
        if (!input.email.trim()) {
            validationErrors.email = "Please Enter Your Email !!!";
        }
        if (!input.password.trim()) {
            validationErrors.password = "Please Enter Your Password !!!";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const user = userData.find((u) => u.email === input.email && u.password === input.password)
            if (user) {
                console.log("User : ", user);
                let timerInterval
                Swal.fire({
                    icon: 'success',
                    title: 'User Logged In Successfully !',
                    html: 'You will Shortly Redirected To the Home Page',
                    timer: 1500,
                    timerProgressBar: false,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => { }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    navigate('/')
                    handleLogin()
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: `
                        Invalid Credentials <br>
                        Check <b>Email</b> or <b>Password</b> Properly
                    `,
                    customClass: {
                        confirmButton: 'swal-button',
                    },
                    confirmButtonText: 'OK',
                    footer: `Dont Have An Account <a href='/sign-up'>Sign-up</a>`
                })
            }
        }
    }
    return (
        <form className="login-wrapper" onSubmit={handleSubmit}>
            <div className="wrapper">
                <div className="heading">
                    <h2>Welcome!</h2>
                    <p>Log In to your account</p>
                </div>
                <div className="input-group">
                    <h6>Email :- </h6>
                    <input type="text" id="email" className="input-field mb-3" placeholder="Enter Email" onChange={handleChange} value={input.email || ''} />
                    <span className='text-danger mb-3'>{errors.email || ''}</span>
                </div>
                <div className="input-group">
                    <h6>Password :- </h6>
                    <input type="password" id="password" className="input-field mb-3" placeholder="Enter Password" onChange={handleChange} value={input.password || ''} />
                    <span className='text-danger mb-3'>{errors.password || ''}</span>
                </div>
                <div className="input-group row">
                    <div className="row">
                        <Link to={'/login'}>Forgot Password</Link>
                    </div>
                </div>
                <div className="input-group">
                    <button type='submit'>Login <i className="fa-solid fa-arrow-right ms-2"></i></button>
                </div>

                <div className="sign-in">
                    <p>Don't have an account? <Link to={'/sign-up'}>Sign-Up</Link></p>
                </div>
            </div>
        </form>
    )
}