
import React from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";

const Transfer = () => {
    return (
        <>
        <Sidebar/>
        <div className="compaign-right-content-main p-3">
        <Header/>
        {/*<!-- Transfer Section -->*/}
			<section className="campaign-wizard-step-main compaign-list-box-transfer p-md-3 mt-3">
            <div className="container-fluid">
                <div className="py-5 mx-3">
                    <h3 className="fs-4 text-center mt-5">Your campaigns are being added to your portal.</h3>
                    <div className="row py-5">
                        <div className="col-xl-4 col-lg-3 col-12">
                        </div>
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="d-flex">
                                <div className="campaign-img">
                                    <img src="image/hubspot.png" width="108" height="120" alt="Hubspot"/>
                                </div>
                                <div className="campaign-img pt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg>
                                </div>
                                <div className="campaign-img">
                                    <img src="image/hubspot.png" width="108" height="120" alt="Hubspot"/>
                                </div>
                            </div>
                            <div className="progress">
                                  <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>      
        </>
    )
}

export default Transfer
