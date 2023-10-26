import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
    navigate('/')
    return (
        <h1>Home</h1>
    )
}