import React from 'react'
import "./style.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "salmon" }}>
            <div class="container-fluid">
                <a class="navbar-brand fw-bold" href="/">UMS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to={'/add-data'}>Jathu</Link>
                        </li>
                        <li class="nav-item">
                            <Link href='/' class="nav-link">Link</Link>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}
