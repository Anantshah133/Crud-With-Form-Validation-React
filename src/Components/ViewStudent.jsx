import React from 'react'
import { useParams } from 'react-router-dom'

export default function ViewStudent() {
    const urlParam = useParams();
    console.log(urlParam)
    return (
        <div>
            <h1>Hello Student</h1>
        </div>
    )
}
