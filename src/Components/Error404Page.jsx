import React from 'react';
import "./error.css"
import { Link } from 'react-router-dom'

export default function Error404Page() {
    return (
        <section class="page_404">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 ">
                        <div class="text-center">
                            <h1 class="text-center mb-5">404 Page Not Found !!! 🥴🤪🧐</h1>
                            <div class="four_zero_four_bg mb-5">
                            </div>
                            <div class="contant_box_404">
                                <h3 class="h2">
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
