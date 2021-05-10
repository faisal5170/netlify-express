import React, { useEffect } from 'react'
import Sidebar from "./Sidebar";
import Header from "./Header";
import { hideLoader } from '../_helpers';

const Pricing = () => {
	useEffect(() => {
		hideLoader();
	}, [])
	return (
		<>
			<Sidebar />
			<div className="compaign-right-content-main p-3">
				<Header />
				<section className="campaign-wizard-step-main p-3 mt-3">
					<div className="row px-md-5 pb-3 pt-md-5">
						<div className="col-12">
							<h3 className="pb-2 ind-4-sec-page-title">Pricing details.</h3>
							<p className="ind-5-text-left">
								Please see the pricing information below for the two current Campaign Wizard options. FREE: Check out our Welcome Series Campaign for FREE
								You Choose: PIck and choose campaigns for a price of $49/each

					</p>
						</div>
					</div>
					<div className="row px-sm-5">
						<div className="col-12 col-lg-6 col-xl-5 pb-4">
							<div className="pricing-box-boder h-100">
								<div className="pricing-box-title text-center text-white py-3">
									<h3>Our Gift</h3>
								</div>
								<div className="pb-4 bg-white">
									<h3 className="py-4">Free</h3>
									<p className="px-4">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
											<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
											<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 	1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
										</svg>
								Welcome Series Campaign
							</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-lg-6 col-xl-5 pb-4">
							<div className="pricing-box-boder">
								<div className="pricing-box-title text-center text-white py-3">
									<h3>You Choose</h3>
								</div>
								<div className="pb-4 bg-white">
									<h3 className="py-4">$49.99<sub className="sub1">/campaign</sub></h3>
									<p className="px-4">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle pe-2 icon-size" viewBox="0 0 16 16">
											<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
											<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 	1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
										</svg>
								Choose as many campaigns youd like
							</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

export default Pricing
