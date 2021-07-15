import React from 'react'

const Contact = () => {
    return (
        <div className="contact-info">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Phone</h5>
                                <p className="card-text"><a href="tel:+919461291573" style={{color:"inherit"}}>+91 9461291573</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Email</h5>
                                <p className="card-text"><a href="mailto:anshumanjf@gmail.com" style={{ color: "inherit" }}>anshumanjf@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card text-dark bg-light mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Website</h5>
                                <p className="card-text"><a href="http://ansh8na7.github.io/portfolio-react/" style={{ color: "inherit" }}>http://ansh8na7.github.io/portfolio-react/</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
