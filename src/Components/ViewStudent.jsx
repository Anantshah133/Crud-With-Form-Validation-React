import React from 'react'
import { useParams } from 'react-router-dom'
import "./view-student.css"

export default function ViewStudent() {
    const urlParam = useParams();
    const idx = urlParam.id;
    let storedData = localStorage.getItem("Student-Data");
    const studentData = JSON.parse(storedData) ? JSON.parse(storedData) : [];
    const student = studentData[idx]

    console.log(student)
    return (
        <div className='bg-normal wrapper-of-view'>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="col-6">
                    <div className="card dashboard-card-ten pb-0">
                        <div className="card-body">
                            <div className="heading-layout1">
                                <div className="item-title">
                                    <h3 className='color-primary mb-4 fw-bold'>About The Student : -</h3>
                                </div>
                            </div>
                            <div className="student-info">
                                <div className="media media-none--xs mb-4">
                                    <div className="item-img">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1154/1154987.png" className="media-img-auto" alt="student" />
                                    </div>
                                    <div className="media-body">
                                        <h3 className="item-title color-secondary">{student.name}</h3>
                                        <p>Aliquam erat volutpat. Curabiene natis massa
                                            sedde lacustiquen sodale word moun taiery.</p>
                                    </div>
                                </div>
                                <div className="table-responsive info-table">
                                    <table className="table text-nowrap">
                                        <tbody>
                                            <tr>
                                                <td className='color-primary fs-5'>Name : </td>
                                                <td className="font-medium text-dark-medium">{student.name}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Gender : </td>
                                                <td className="font-medium text-dark-medium">{student.gender.toUpperCase()}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Date Of Birth : </td>
                                                <td className="font-medium text-dark-medium">{student.date}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>E-Mail : </td>
                                                <td className="font-medium text-dark-medium">{student.email}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Adress : </td>
                                                <td className="font-medium text-dark-medium">{student.address}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Course : </td>
                                                <td className="font-medium text-dark-medium">{student.degree}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Marks : </td>
                                                <td className="font-medium text-dark-medium">{student.marks}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>Phone : </td>
                                                <td className="font-medium text-dark-medium">{student.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>City : </td>
                                                <td className="font-medium text-dark-medium">{student.city}</td>
                                            </tr>
                                            <tr>
                                                <td className='color-primary fs-5'>State : </td>
                                                <td className="font-medium text-dark-medium">{student.state}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
