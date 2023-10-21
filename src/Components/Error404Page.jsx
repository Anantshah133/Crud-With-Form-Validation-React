import React from 'react';
import "./error.css"
import { Link } from 'react-router-dom'

export default function Error404Page() {
    return (
        <section className="page_404">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 ">
                        <div className="text-center">
                            <h1 className="text-center mb-5">404 Page Not Found !!! 🥴🤪🧐</h1>
                            <div className="four_zero_four_bg mb-5">
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>
                                <p>The page you are looking for is not avaible!</p>

                                <Link to={'/add-data'} className='link_404'>Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
